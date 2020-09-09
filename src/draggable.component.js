import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { AbstractComponent, AbstractHandleComponent } from './abstract.component';
import * as i0 from "@angular/core";
import * as i1 from "./dnd.service";
import * as i2 from "./dnd.config";
export class DraggableComponent extends AbstractComponent {
    constructor(elemRef, dragDropService, config, cdr) {
        super(elemRef, dragDropService, config, cdr);
        /**
         * Callback function called when the drag actions happened.
         */
        this.onDragStart = new EventEmitter();
        this.onDragEnd = new EventEmitter();
        /**
         * Callback function called when the drag action ends with a valid drop action.
         * It is activated after the on-drop-success callback
         */
        this.onDragSuccessCallback = new EventEmitter();
        this._defaultCursor = this._elem.style.cursor;
        this.dragEnabled = true;
    }
    set draggable(value) {
        this.dragEnabled = !!value;
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
    _onDragStartCallback(event) {
        this._dragDropService.isDragged = true;
        this._dragDropService.dragData = this.dragData;
        this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
        this._elem.classList.add(this._config.onDragStartClass);
        //
        this.onDragStart.emit({ dragData: this.dragData, mouseEvent: event });
    }
    _onDragEndCallback(event) {
        this._dragDropService.isDragged = false;
        this._dragDropService.dragData = null;
        this._dragDropService.onDragSuccessCallback = null;
        this._elem.classList.remove(this._config.onDragStartClass);
        //
        this.onDragEnd.emit({ dragData: this.dragData, mouseEvent: event });
    }
}
DraggableComponent.ɵfac = function DraggableComponent_Factory(t) { return new (t || DraggableComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.DragDropService), i0.ɵɵdirectiveInject(i2.DragDropConfig), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
DraggableComponent.ɵdir = i0.ɵɵdefineDirective({ type: DraggableComponent, selectors: [["", "dnd-draggable", ""]], inputs: { draggable: ["dragEnabled", "draggable"], dragData: "dragData", dropzones: ["dropZones", "dropzones"], effectallowed: ["effectAllowed", "effectallowed"], effectcursor: ["effectCursor", "effectcursor"], dragImage: "dragImage", cloneItem: "cloneItem" }, outputs: { onDragStart: "onDragStart", onDragEnd: "onDragEnd", onDragSuccessCallback: "onDragSuccess" }, features: [i0.ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DraggableComponent, [{
        type: Directive,
        args: [{ selector: '[dnd-draggable]' }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.DragDropService }, { type: i2.DragDropConfig }, { type: i0.ChangeDetectorRef }]; }, { draggable: [{
            type: Input,
            args: ["dragEnabled"]
        }], onDragStart: [{
            type: Output
        }], onDragEnd: [{
            type: Output
        }], dragData: [{
            type: Input
        }], onDragSuccessCallback: [{
            type: Output,
            args: ["onDragSuccess"]
        }], dropzones: [{
            type: Input,
            args: ["dropZones"]
        }], effectallowed: [{
            type: Input,
            args: ["effectAllowed"]
        }], effectcursor: [{
            type: Input,
            args: ["effectCursor"]
        }], dragImage: [{
            type: Input
        }], cloneItem: [{
            type: Input
        }] }); })();
export class DraggableHandleComponent extends AbstractHandleComponent {
    constructor(elemRef, dragDropService, config, _Component, cdr) {
        super(elemRef, dragDropService, config, _Component, cdr);
    }
}
DraggableHandleComponent.ɵfac = function DraggableHandleComponent_Factory(t) { return new (t || DraggableHandleComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.DragDropService), i0.ɵɵdirectiveInject(i2.DragDropConfig), i0.ɵɵdirectiveInject(DraggableComponent), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
DraggableHandleComponent.ɵdir = i0.ɵɵdefineDirective({ type: DraggableHandleComponent, selectors: [["", "dnd-draggable-handle", ""]], features: [i0.ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DraggableHandleComponent, [{
        type: Directive,
        args: [{ selector: '[dnd-draggable-handle]' }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.DragDropService }, { type: i2.DragDropConfig }, { type: DraggableComponent }, { type: i0.ChangeDetectorRef }]; }, null); })();
