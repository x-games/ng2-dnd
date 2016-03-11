// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable} from 'angular2/core';
import {Directive, Input, Output, EventEmitter, ElementRef} from 'angular2/core';

import {BaseDDConfig, AbstractDraggableDroppableComponent, DragDropZonesService, SortableConfig} from './dnd.common';

@Injectable()
export class DragDropConfig extends BaseDDConfig {
    onDragStartClass: string = "ui-drag-start";
    onDragEnterClass: string = "ui-drag-enter";
    onDragOverClass: string = "ui-drag-over";
}

@Injectable()
export class DragDropDataService {
    onDragSuccessCallback: Function;
    draggableData: any;
}

@Injectable()
export class DragDropConfigService {
    dragDropConfig: DragDropConfig = new DragDropConfig();
    sortableConfig: SortableConfig = new SortableConfig();
}

@Directive({ selector: '[ui-draggable]' })
export class DraggableComponent extends AbstractDraggableDroppableComponent {

    /**
     * Whether the object is draggable. Default is true.
     */
    @Input("draggable-enabled") set draggable(value: boolean) {
        if (value !== null) {
            this.dragEnabled = value;
        }
    }

    /**
     * The data that has to be dragged. It can be any JS object
     */
    @Input("draggable-data") draggableData: any;

    ddConfig: DragDropConfig;

    /**
     * An instance of DragDropConfig class. It permits to configure how the drag&drop look&feel
     * (cursor, drag image, custom classes to add on drag/drop events)
     */
    @Input("ui-draggable") set dragdropConfig(config: DragDropConfig) {
        if (config) {
            this.config = this.ddConfig = config as DragDropConfig;
        }
    }

    /**
     * Callback function called when the drag action ends with a valid drop action.
     * It is activated after the on-drop-success callback
     */
    @Input("on-drag-success") onDragSuccessCallback: Function;

    /**
     * Array of Strings. Specify the drop-zones to which this component can drop.
     */
    @Input("allowed-drop-zones") set dropZones(dropZones: Array<string>) {
        this.dropZoneNames = dropZones;
    }

    constructor(elemRef: ElementRef, ddZonesService: DragDropZonesService, public dragDropService: DragDropDataService, dragDropConfigService: DragDropConfigService) {
        super(elemRef, ddZonesService, dragDropConfigService.dragDropConfig);
        this.dragdropConfig = dragDropConfigService.dragDropConfig;
        this.dragEnabled = true;
    }

    onDragEndCallback = (event: Event) => {
        this.dragDropService.draggableData = null;
        this.dragDropService.onDragSuccessCallback = null;
        let dragTarget: HTMLElement = <HTMLElement>event.target;
        dragTarget.classList.remove(this.ddConfig.onDragStartClass);
    }

    onDragStartCallback = (event: Event) => {
        this.dragDropService.draggableData = this.draggableData;
        this.dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
        let dragTarget: HTMLElement = <HTMLElement>event.target;
        dragTarget.classList.add(this.ddConfig.onDragStartClass);
    };
}