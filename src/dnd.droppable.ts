// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable} from 'angular2/core';
import {Directive, Input, Output, EventEmitter, ElementRef} from 'angular2/core';
import {ObservableWrapper} from 'angular2/src/facade/async';

import {DragDropConfig, AbstractDraggableDroppableComponent, DragDropZonesService} from './dnd.common';
import {DragDropDataService, DragDropConfigService} from './dnd.draggable';

@Directive({ selector: '[dnd-droppable]' })
export class DroppableComponent extends AbstractDraggableDroppableComponent {

    /**
     * Callback function called when the drop action completes correctly.
     * It is activated before the on-drag-success callback.
     */
    @Output("onDropSuccess") onDropSuccessCallback: EventEmitter<any> = new EventEmitter<any>();

    //ddConfig: DragDropConfig;

    /**
     * An instance of DragDropConfig class. It permits to configure how the drag&drop look&feel
     * (cursor, drag image, custom classes to add on drag/drop events)
     */
    @Input() set dragdropConfig(value: DragDropConfig) {
        this.config = value;
    }

    /**
     * Array of Strings. It permits to specify the drop zones associated with this component.
     * By default, if the drop-zones attribute is not specified, the droppable component accepts
     * drop operations by all the draggable components that do not specify the allowed-drop-zones
     */
    @Input() set dropZones(dropZoneNames: Array<string>) {
        this.dropZoneNames = dropZoneNames;
    }

    constructor(elemRef: ElementRef, ddZonesService: DragDropZonesService, public dragDropService: DragDropDataService, dragDropConfigService: DragDropConfigService) {
        super(elemRef, ddZonesService, dragDropConfigService.dragDropConfig);
        this.dragdropConfig = dragDropConfigService.dragDropConfig;
        this.dropEnabled = true;
    }

    onDragEnterCallback = (event: Event) => {
        this.elem.classList.add(this.config.onDragEnterClass);
    };

    onDragLeaveCallback = (event: Event) => {
        this.elem.classList.remove(this.config.onDragOverClass);
        this.elem.classList.remove(this.config.onDragEnterClass);
    };

    onDragOverCallback = (event: Event) => {
        this.elem.classList.add(this.config.onDragOverClass);
    };

    onDropCallback = (event: Event) => {
        if (this.onDropSuccessCallback) {
            console.log('draggableData', this.dragDropService.draggableData);
            ObservableWrapper.callEmit(this.onDropSuccessCallback, this.dragDropService.draggableData);
            // this.onDropSuccessCallback.emit(this.dragDropService.draggableData);
        }
        if (this.dragDropService.onDragSuccessCallback) {
            // this.dragDropService.onDragSuccessCallback.emit(this.dragDropService.draggableData);
            ObservableWrapper.callEmit(this.dragDropService.onDragSuccessCallback, this.dragDropService.draggableData);
        }
        this.elem.classList.remove(this.config.onDragOverClass);
        this.elem.classList.remove(this.config.onDragEnterClass);
    }

}