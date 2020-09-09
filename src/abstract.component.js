// Copyright (C) 2016-2020 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
import { Directive } from '@angular/core';
import { isString, isFunction, isPresent, createImage, callFun } from './dnd.utils';
import * as i0 from "@angular/core";
import * as i1 from "./dnd.service";
import * as i2 from "./dnd.config";
export class AbstractComponent {
    constructor(elemRef, _dragDropService, _config, _cdr) {
        this.elemRef = elemRef;
        this._dragDropService = _dragDropService;
        this._config = _config;
        this._cdr = _cdr;
        /**
         * Whether the object is draggable. Default is true.
         */
        this._dragEnabled = false;
        /**
         * Allows drop on this element
         */
        this.dropEnabled = false;
        this.dropZones = [];
        this.cloneItem = false;
        // Assign default cursor unless overridden
        this._defaultCursor = _config.defaultCursor;
        this._elem = this.elemRef.nativeElement;
        this._elem.style.cursor = this._defaultCursor; // set default cursor on our element
        //
        // DROP events
        //
        this._elem.ondragenter = (event) => {
            this._onDragEnter(event);
        };
        this._elem.ondragover = (event) => {
            this._onDragOver(event);
            //
            if (event.dataTransfer != null) {
                event.dataTransfer.dropEffect = this._config.dropEffect.name;
            }
            return false;
        };
        this._elem.ondragleave = (event) => {
            this._onDragLeave(event);
        };
        this._elem.ondrop = (event) => {
            this._onDrop(event);
        };
        //
        // Drag events
        //
        this._elem.onmousedown = (event) => {
            this._target = event.target;
        };
        this._elem.ondragstart = (event) => {
            if (this._dragHandle) {
                if (!this._dragHandle.contains(this._target)) {
                    event.preventDefault();
                    return;
                }
            }
            this._onDragStart(event);
            //
            if (event.dataTransfer != null) {
                event.dataTransfer.setData('text', '');
                // Change drag effect
                event.dataTransfer.effectAllowed = this.effectAllowed || this._config.dragEffect.name;
                // Change drag image
                if (isPresent(this.dragImage)) {
                    if (isString(this.dragImage)) {
                        event.dataTransfer.setDragImage(createImage(this.dragImage));
                    }
                    else if (isFunction(this.dragImage)) {
                        event.dataTransfer.setDragImage(callFun(this.dragImage));
                    }
                    else {
                        let img = this.dragImage;
                        event.dataTransfer.setDragImage(img.imageElement, img.x_offset, img.y_offset);
                    }
                }
                else if (isPresent(this._config.dragImage)) {
                    let dragImage = this._config.dragImage;
                    event.dataTransfer.setDragImage(dragImage.imageElement, dragImage.x_offset, dragImage.y_offset);
                }
                else if (this.cloneItem) {
                    this._dragHelper = this._elem.cloneNode(true);
                    this._dragHelper.classList.add('dnd-drag-item');
                    this._dragHelper.style.position = "absolute";
                    this._dragHelper.style.top = "0px";
                    this._dragHelper.style.left = "-1000px";
                    this._elem.parentElement.appendChild(this._dragHelper);
                    event.dataTransfer.setDragImage(this._dragHelper, event.offsetX, event.offsetY);
                }
                // Change drag cursor
                let cursorelem = (this._dragHandle) ? this._dragHandle : this._elem;
                if (this._dragEnabled) {
                    cursorelem.style.cursor = this.effectCursor ? this.effectCursor : this._config.dragCursor;
                }
                else {
                    cursorelem.style.cursor = this._defaultCursor;
                }
            }
        };
        this._elem.ondragend = (event) => {
            if (this._elem.parentElement && this._dragHelper) {
                this._elem.parentElement.removeChild(this._dragHelper);
            }
            // console.log('ondragend', event.target);
            this._onDragEnd(event);
            // Restore style of dragged element
            let cursorelem = (this._dragHandle) ? this._dragHandle : this._elem;
            cursorelem.style.cursor = this._defaultCursor;
        };
    }
    set dragEnabled(enabled) {
        this._dragEnabled = !!enabled;
        this._elem.draggable = this._dragEnabled;
    }
    get dragEnabled() {
        return this._dragEnabled;
    }
    setDragHandle(elem) {
        this._dragHandle = elem;
    }
    /******* Change detection ******/
    detectChanges() {
        // Programmatically run change detection to fix issue in Safari
        setTimeout(() => {
            if (this._cdr && !this._cdr.destroyed) {
                this._cdr.detectChanges();
            }
        }, 250);
    }
    //****** Droppable *******//
    _onDragEnter(event) {
        // console.log('ondragenter._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed(event)) {
            // event.preventDefault();
            this._onDragEnterCallback(event);
        }
    }
    _onDragOver(event) {
        // // console.log('ondragover._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed(event)) {
            // The element is over the same source element - do nothing
            if (event.preventDefault) {
                // Necessary. Allows us to drop.
                event.preventDefault();
            }
            this._onDragOverCallback(event);
        }
    }
    _onDragLeave(event) {
        // console.log('ondragleave._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed(event)) {
            // event.preventDefault();
            this._onDragLeaveCallback(event);
        }
    }
    _onDrop(event) {
        // console.log('ondrop._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed(event)) {
            // Necessary. Allows us to drop.
            this._preventAndStop(event);
            this._onDropCallback(event);
            this.detectChanges();
        }
    }
    _isDropAllowed(event) {
        if ((this._dragDropService.isDragged || (event.dataTransfer && event.dataTransfer.files)) && this.dropEnabled) {
            // First, if `allowDrop` is set, call it to determine whether the
            // dragged element can be dropped here.
            if (this.allowDrop) {
                return this.allowDrop(this._dragDropService.dragData);
            }
            // Otherwise, use dropZones if they are set.
            if (this.dropZones.length === 0 && this._dragDropService.allowedDropZones.length === 0) {
                return true;
            }
            for (let i = 0; i < this._dragDropService.allowedDropZones.length; i++) {
                let dragZone = this._dragDropService.allowedDropZones[i];
                if (this.dropZones.indexOf(dragZone) !== -1) {
                    return true;
                }
            }
        }
        return false;
    }
    _preventAndStop(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
    }
    //*********** Draggable **********//
    _onDragStart(event) {
        //console.log('ondragstart.dragEnabled', this._dragEnabled);
        if (this._dragEnabled) {
            this._dragDropService.allowedDropZones = this.dropZones;
            // console.log('ondragstart.allowedDropZones', this._dragDropService.allowedDropZones);
            this._onDragStartCallback(event);
        }
    }
    _onDragEnd(event) {
        this._dragDropService.allowedDropZones = [];
        // console.log('ondragend.allowedDropZones', this._dragDropService.allowedDropZones);
        this._onDragEndCallback(event);
    }
    //**** Drop Callbacks ****//
    _onDragEnterCallback(event) { }
    _onDragOverCallback(event) { }
    _onDragLeaveCallback(event) { }
    _onDropCallback(event) { }
    //**** Drag Callbacks ****//
    _onDragStartCallback(event) { }
    _onDragEndCallback(event) { }
}
AbstractComponent.ɵfac = function AbstractComponent_Factory(t) { return new (t || AbstractComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.DragDropService), i0.ɵɵdirectiveInject(i2.DragDropConfig), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
AbstractComponent.ɵdir = i0.ɵɵdefineDirective({ type: AbstractComponent });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AbstractComponent, [{
        type: Directive
    }], function () { return [{ type: i0.ElementRef }, { type: i1.DragDropService }, { type: i2.DragDropConfig }, { type: i0.ChangeDetectorRef }]; }, null); })();
export class AbstractHandleComponent {
    constructor(elemRef, _dragDropService, _config, _Component, _cdr) {
        this.elemRef = elemRef;
        this._dragDropService = _dragDropService;
        this._config = _config;
        this._Component = _Component;
        this._cdr = _cdr;
        this._Component.setDragHandle(this.elemRef.nativeElement);
    }
}
AbstractHandleComponent.ɵfac = function AbstractHandleComponent_Factory(t) { return new (t || AbstractHandleComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.DragDropService), i0.ɵɵdirectiveInject(i2.DragDropConfig), i0.ɵɵdirectiveInject(AbstractComponent), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
AbstractHandleComponent.ɵdir = i0.ɵɵdefineDirective({ type: AbstractHandleComponent });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AbstractHandleComponent, [{
        type: Directive
    }], function () { return [{ type: i0.ElementRef }, { type: i1.DragDropService }, { type: i2.DragDropConfig }, { type: AbstractComponent }, { type: i0.ChangeDetectorRef }]; }, null); })();
