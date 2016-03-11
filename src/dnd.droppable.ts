// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable} from 'angular2/core';
import {Directive, Input, Output, EventEmitter, ElementRef} from 'angular2/core';

import {BaseDDConfig, AbstractDraggableDroppableComponent, DragDropZonesService} from './dnd.common';
import {DragDropConfig, DragDropDataService, DragDropConfigService} from './dnd.draggable';

@Directive({ selector: '[ui-droppable]' })
export class DroppableComponent extends AbstractDraggableDroppableComponent {

    /**
     * Callback function called when the drop action completes correctly.
     * It is activated before the on-drag-success callback.
     */
    @Output("onDropSuccess") onDropSuccessCallback: EventEmitter<any> = new EventEmitter<any>();

    ddConfig: DragDropConfig;

    /**
     * An instance of DragDropConfig class. It permits to configure how the drag&drop look&feel
     * (cursor, drag image, custom classes to add on drag/drop events)
     */
    @Input("ui-droppable") set dragdropConfig(config: DragDropConfig) {
        if (config) {
            this.config = this.ddConfig = config;
        }
    }

    /**
     * Array of Strings. It permits to specify the drop zones associated with this component.
     * By default, if the drop-zones attribute is not specified, the droppable component accepts
     * drop operations by all the draggable components that do not specify the allowed-drop-zones
     */
    @Input("drop-zones") set dropZones(dropZoneNames: Array<string>) {
        this.dropZoneNames = dropZoneNames;
    }

    constructor(elemRef: ElementRef, ddZonesService: DragDropZonesService, public dragDropService: DragDropDataService, dragDropConfigService: DragDropConfigService) {
        super(elemRef, ddZonesService, dragDropConfigService.dragDropConfig);
        this.dragdropConfig = dragDropConfigService.dragDropConfig;
        this.dropEnabled = true;
    }

    onDragEnterCallback = (event: Event) => {
        this.elem.classList.add(this.ddConfig.onDragEnterClass);
    };

    onDragLeaveCallback = (event: Event) => {
        this.elem.classList.remove(this.ddConfig.onDragOverClass);
        this.elem.classList.remove(this.ddConfig.onDragEnterClass);
    };

    onDragOverCallback = (event: Event) => {
        this.elem.classList.add(this.ddConfig.onDragOverClass);
    };

    onDropCallback = (event: Event) => {
        if (this.onDropSuccessCallback) {
            this.onDropSuccessCallback.emit(this.dragDropService.draggableData);
        }
        if (this.dragDropService.onDragSuccessCallback) {
            this.dragDropService.onDragSuccessCallback.emit(this.dragDropService.draggableData);
        }
        this.elem.classList.remove(this.ddConfig.onDragOverClass);
        this.elem.classList.remove(this.ddConfig.onDragEnterClass);
    }

}