import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { FormArray } from '@angular/forms';
import { AbstractComponent, AbstractHandleComponent } from './abstract.component';
import * as i0 from "@angular/core";
import * as i1 from "./dnd.service";
import * as i2 from "./dnd.config";
export class SortableContainer extends AbstractComponent {
    constructor(elemRef, dragDropService, config, cdr, _sortableDataService) {
        super(elemRef, dragDropService, config, cdr);
        this._sortableDataService = _sortableDataService;
        this._sortableData = [];
        this.dragEnabled = false;
    }
    set draggable(value) {
        this.dragEnabled = !!value;
    }
    set sortableData(sortableData) {
        this._sortableData = sortableData;
        if (sortableData instanceof FormArray) {
            this.sortableHandler = new SortableFormArrayHandler();
        }
        else {
            this.sortableHandler = new SortableArrayHandler();
        }
        //
        this.dropEnabled = !!this._sortableData;
        // console.log("collection is changed, drop enabled: " + this.dropEnabled);
    }
    get sortableData() {
        return this._sortableData;
    }
    set dropzones(value) {
        this.dropZones = value;
    }
    _onDragEnterCallback(event) {
        if (this._sortableDataService.isDragged) {
            let item = this._sortableDataService.sortableContainer.getItemAt(this._sortableDataService.index);
            // Check does element exist in sortableData of this Container
            if (this.indexOf(item) === -1) {
                // Let's add it
                // console.log('Container._onDragEnterCallback. drag node [' + this._sortableDataService.index.toString() + '] over parent node');
                // Remove item from previouse list
                this._sortableDataService.sortableContainer.removeItemAt(this._sortableDataService.index);
                if (this._sortableDataService.sortableContainer._sortableData.length === 0) {
                    this._sortableDataService.sortableContainer.dropEnabled = true;
                }
                // Add item to new list
                this.insertItemAt(item, 0);
                this._sortableDataService.sortableContainer = this;
                this._sortableDataService.index = 0;
            }
            // Refresh changes in properties of container component
            this.detectChanges();
        }
    }
    getItemAt(index) {
        return this.sortableHandler.getItemAt(this._sortableData, index);
    }
    indexOf(item) {
        return this.sortableHandler.indexOf(this._sortableData, item);
    }
    removeItemAt(index) {
        this.sortableHandler.removeItemAt(this._sortableData, index);
    }
    insertItemAt(item, index) {
        this.sortableHandler.insertItemAt(this._sortableData, item, index);
    }
}
SortableContainer.ɵfac = function SortableContainer_Factory(t) { return new (t || SortableContainer)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.DragDropService), i0.ɵɵdirectiveInject(i2.DragDropConfig), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.DragDropSortableService)); };
SortableContainer.ɵdir = i0.ɵɵdefineDirective({ type: SortableContainer, selectors: [["", "dnd-sortable-container", ""]], inputs: { draggable: ["dragEnabled", "draggable"], sortableData: "sortableData", dropzones: ["dropZones", "dropzones"] }, features: [i0.ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SortableContainer, [{
        type: Directive,
        args: [{ selector: '[dnd-sortable-container]' }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.DragDropService }, { type: i2.DragDropConfig }, { type: i0.ChangeDetectorRef }, { type: i1.DragDropSortableService }]; }, { draggable: [{
            type: Input,
            args: ["dragEnabled"]
        }], sortableData: [{
            type: Input
        }], dropzones: [{
            type: Input,
            args: ["dropZones"]
        }] }); })();
class SortableArrayHandler {
    getItemAt(sortableData, index) {
        return sortableData[index];
    }
    indexOf(sortableData, item) {
        return sortableData.indexOf(item);
    }
    removeItemAt(sortableData, index) {
        sortableData.splice(index, 1);
    }
    insertItemAt(sortableData, item, index) {
        sortableData.splice(index, 0, item);
    }
}
class SortableFormArrayHandler {
    getItemAt(sortableData, index) {
        return sortableData.at(index);
    }
    indexOf(sortableData, item) {
        return sortableData.controls.indexOf(item);
    }
    removeItemAt(sortableData, index) {
        sortableData.removeAt(index);
    }
    insertItemAt(sortableData, item, index) {
        sortableData.insert(index, item);
    }
}
export class SortableComponent extends AbstractComponent {
    constructor(elemRef, dragDropService, config, _sortableContainer, _sortableDataService, cdr) {
        super(elemRef, dragDropService, config, cdr);
        this._sortableContainer = _sortableContainer;
        this._sortableDataService = _sortableDataService;
        /**
         * Callback function called when the drag action ends with a valid drop action.
         * It is activated after the on-drop-success callback
         */
        this.onDragSuccessCallback = new EventEmitter();
        this.onDragStartCallback = new EventEmitter();
        this.onDragOverCallback = new EventEmitter();
        this.onDragEndCallback = new EventEmitter();
        this.onDropSuccessCallback = new EventEmitter();
        this.dropZones = this._sortableContainer.dropZones;
        this.dragEnabled = true;
        this.dropEnabled = true;
    }
    set draggable(value) {
        this.dragEnabled = !!value;
    }
    set droppable(value) {
        this.dropEnabled = !!value;
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
        // console.log('_onDragStartCallback. dragging elem with index ' + this.index);
        this._sortableDataService.isDragged = true;
        this._sortableDataService.sortableContainer = this._sortableContainer;
        this._sortableDataService.index = this.index;
        this._sortableDataService.markSortable(this._elem);
        // Add dragData
        this._dragDropService.isDragged = true;
        this._dragDropService.dragData = this.dragData;
        this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
        //
        this.onDragStartCallback.emit(this._dragDropService.dragData);
    }
    _onDragOverCallback(event) {
        if (this._sortableDataService.isDragged && this._elem !== this._sortableDataService.elem) {
            // console.log('_onDragOverCallback. dragging elem with index ' + this.index);
            this._sortableDataService.sortableContainer = this._sortableContainer;
            this._sortableDataService.index = this.index;
            this._sortableDataService.markSortable(this._elem);
            this.onDragOverCallback.emit(this._dragDropService.dragData);
        }
    }
    _onDragEndCallback(event) {
        // console.log('_onDragEndCallback. end dragging elem with index ' + this.index);
        this._sortableDataService.isDragged = false;
        this._sortableDataService.sortableContainer = null;
        this._sortableDataService.index = null;
        this._sortableDataService.markSortable(null);
        // Add dragGata
        this._dragDropService.isDragged = false;
        this._dragDropService.dragData = null;
        this._dragDropService.onDragSuccessCallback = null;
        //
        this.onDragEndCallback.emit(this._dragDropService.dragData);
    }
    _onDragEnterCallback(event) {
        if (this._sortableDataService.isDragged) {
            this._sortableDataService.markSortable(this._elem);
            if ((this.index !== this._sortableDataService.index) ||
                (this._sortableDataService.sortableContainer.sortableData !== this._sortableContainer.sortableData)) {
                // console.log('Component._onDragEnterCallback. drag node [' + this.index + '] over node [' + this._sortableDataService.index + ']');
                // Get item
                let item = this._sortableDataService.sortableContainer.getItemAt(this._sortableDataService.index);
                // Remove item from previouse list
                this._sortableDataService.sortableContainer.removeItemAt(this._sortableDataService.index);
                if (this._sortableDataService.sortableContainer.sortableData.length === 0) {
                    this._sortableDataService.sortableContainer.dropEnabled = true;
                }
                // Add item to new list
                this._sortableContainer.insertItemAt(item, this.index);
                if (this._sortableContainer.dropEnabled) {
                    this._sortableContainer.dropEnabled = false;
                }
                this._sortableDataService.sortableContainer = this._sortableContainer;
                this._sortableDataService.index = this.index;
                this.detectChanges();
            }
        }
    }
    _onDropCallback(event) {
        if (this._sortableDataService.isDragged) {
            // console.log('onDropCallback.onDropSuccessCallback.dragData', this._dragDropService.dragData);
            this.onDropSuccessCallback.emit(this._dragDropService.dragData);
            if (this._dragDropService.onDragSuccessCallback) {
                // console.log('onDropCallback.onDragSuccessCallback.dragData', this._dragDropService.dragData);
                this._dragDropService.onDragSuccessCallback.emit(this._dragDropService.dragData);
            }
            // Refresh changes in properties of container component
            this._sortableContainer.detectChanges();
        }
    }
}
SortableComponent.ɵfac = function SortableComponent_Factory(t) { return new (t || SortableComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.DragDropService), i0.ɵɵdirectiveInject(i2.DragDropConfig), i0.ɵɵdirectiveInject(SortableContainer), i0.ɵɵdirectiveInject(i1.DragDropSortableService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
SortableComponent.ɵdir = i0.ɵɵdefineDirective({ type: SortableComponent, selectors: [["", "dnd-sortable", ""]], inputs: { index: ["sortableIndex", "index"], draggable: ["dragEnabled", "draggable"], droppable: ["dropEnabled", "droppable"], dragData: "dragData", effectallowed: ["effectAllowed", "effectallowed"], effectcursor: ["effectCursor", "effectcursor"] }, outputs: { onDragSuccessCallback: "onDragSuccess", onDragStartCallback: "onDragStart", onDragOverCallback: "onDragOver", onDragEndCallback: "onDragEnd", onDropSuccessCallback: "onDropSuccess" }, features: [i0.ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SortableComponent, [{
        type: Directive,
        args: [{ selector: '[dnd-sortable]' }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.DragDropService }, { type: i2.DragDropConfig }, { type: SortableContainer }, { type: i1.DragDropSortableService }, { type: i0.ChangeDetectorRef }]; }, { index: [{
            type: Input,
            args: ['sortableIndex']
        }], draggable: [{
            type: Input,
            args: ["dragEnabled"]
        }], droppable: [{
            type: Input,
            args: ["dropEnabled"]
        }], dragData: [{
            type: Input
        }], effectallowed: [{
            type: Input,
            args: ["effectAllowed"]
        }], effectcursor: [{
            type: Input,
            args: ["effectCursor"]
        }], onDragSuccessCallback: [{
            type: Output,
            args: ["onDragSuccess"]
        }], onDragStartCallback: [{
            type: Output,
            args: ["onDragStart"]
        }], onDragOverCallback: [{
            type: Output,
            args: ["onDragOver"]
        }], onDragEndCallback: [{
            type: Output,
            args: ["onDragEnd"]
        }], onDropSuccessCallback: [{
            type: Output,
            args: ["onDropSuccess"]
        }] }); })();
export class SortableHandleComponent extends AbstractHandleComponent {
    constructor(elemRef, dragDropService, config, _Component, cdr) {
        super(elemRef, dragDropService, config, _Component, cdr);
    }
}
SortableHandleComponent.ɵfac = function SortableHandleComponent_Factory(t) { return new (t || SortableHandleComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.DragDropService), i0.ɵɵdirectiveInject(i2.DragDropConfig), i0.ɵɵdirectiveInject(SortableComponent), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); };
SortableHandleComponent.ɵdir = i0.ɵɵdefineDirective({ type: SortableHandleComponent, selectors: [["", "dnd-sortable-handle", ""]], features: [i0.ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SortableHandleComponent, [{
        type: Directive,
        args: [{ selector: '[dnd-sortable-handle]' }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.DragDropService }, { type: i2.DragDropConfig }, { type: SortableComponent }, { type: i0.ChangeDetectorRef }]; }, null); })();
