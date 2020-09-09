import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { AbstractComponent } from './abstract.component';
import * as i0 from "@angular/core";
import * as i1 from "./dnd.service";
import * as i2 from "./dnd.config";
export class DroppableComponent extends AbstractComponent {
    constructor(elemRef, dragDropService, config, cdr) {
        super(elemRef, dragDropService, config, cdr);
        /**
         * Callback function called when the drop action completes correctly.
         * It is activated before the on-drag-success callback.
         */
        this.onDropSuccess = new EventEmitter();
        this.onDragEnter = new EventEmitter();
        this.onDragOver = new EventEmitter();
        this.onDragLeave = new EventEmitter();
        this.dropEnabled = true;
    }
    set droppable(value) {
        this.dropEnabled = !!value;
    }
    set allowdrop(value) {
        this.allowDrop = value;
    }
    set dropzones(value) {
        this.dropZones = value;
    }
    /**
     * Drag allowed effect
     */
    set effectallowed(value) {
        this.effectAllowed = value;
    }
    /**
     * Drag effect cursor
     */
    set effectcursor(value) {
        this.effectCursor = value;
    }
    _onDragEnterCallback(event) {
        if (this._dragDropService.isDragged) {
            this._elem.classList.add(this._config.onDragEnterClass);
            this.onDragEnter.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
        }
    }
    _onDragOverCallback(event) {
        if (this._dragDropService.isDragged) {
            this._elem.classList.add(this._config.onDragOverClass);
            this.onDragOver.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
        }
    }
    ;
    _onDragLeaveCallback(event) {
        if (this._dragDropService.isDragged) {
            this._elem.classList.remove(this._config.onDragOverClass);
            this._elem.classList.remove(this._config.onDragEnterClass);
            this.onDragLeave.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
        }
    }
    ;
    _onDropCallback(event) {
        let dataTransfer = event.dataTransfer;
        if (this._dragDropService.isDragged || (dataTransfer && dataTransfer.files)) {
            this.onDropSuccess.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
            if (this._dragDropService.onDragSuccessCallback) {
                this._dragDropService.onDragSuccessCallback.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
            }
            this._elem.classList.remove(this._config.onDragOverClass);
            this._elem.classList.remove(this._config.onDragEnterClass);
        }
    }
}
DroppableComponent.ɵfac = function DroppableComponent_Factory(t) { return new (t || DroppableComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.DragDropService), i0.ɵɵdirectiveInject(i2.DragDropConfig), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
DroppableComponent.ɵdir = i0.ɵɵdefineDirective({ type: DroppableComponent, selectors: [["", "dnd-droppable", ""]], inputs: { droppable: ["dropEnabled", "droppable"], allowdrop: ["allowDrop", "allowdrop"], dropzones: ["dropZones", "dropzones"], effectallowed: ["effectAllowed", "effectallowed"], effectcursor: ["effectCursor", "effectcursor"] }, outputs: { onDropSuccess: "onDropSuccess", onDragEnter: "onDragEnter", onDragOver: "onDragOver", onDragLeave: "onDragLeave" }, features: [i0.ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DroppableComponent, [{
        type: Directive,
        args: [{ selector: '[dnd-droppable]' }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.DragDropService }, { type: i2.DragDropConfig }, { type: i0.ChangeDetectorRef }]; }, { droppable: [{
            type: Input,
            args: ["dropEnabled"]
        }], onDropSuccess: [{
            type: Output
        }], onDragEnter: [{
            type: Output
        }], onDragOver: [{
            type: Output
        }], onDragLeave: [{
            type: Output
        }], allowdrop: [{
            type: Input,
            args: ["allowDrop"]
        }], dropzones: [{
            type: Input,
            args: ["dropZones"]
        }], effectallowed: [{
            type: Input,
            args: ["effectAllowed"]
        }], effectcursor: [{
            type: Input,
            args: ["effectCursor"]
        }] }); })();
