// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable} from 'angular2/core';
import {Directive, Input, Output, EventEmitter, ElementRef} from 'angular2/core';

import {BaseDDConfig, AbstractDraggableDroppableComponent, DragDropZonesService, SortableConfig} from './dnd.common';
import {DragDropConfig, DragDropDataService, DragDropConfigService} from './dnd.draggable';

@Injectable()
export class DragDropSortableDataService {
    index: number;
    sortableData: any[];

    _elem: HTMLElement;
    _config: SortableConfig;

    element(elem: HTMLElement, config: SortableConfig) {
        if (this._elem != null) {
            this._elem.classList.remove(this._config.onSortableDragClass);
        }
        if (elem != null) {
            this._elem = elem;
            this._config = config;
            this._elem.classList.add(this._config.onSortableDragClass);
        }
    }
}

@Directive({ selector: '[ui-sortable]' })
export class SortableComponent extends AbstractDraggableDroppableComponent {

    _sortableData: any[] = [];
    @Input("ui-sortable-data") set sortableData(sortableData: any[]) {
        this._sortableData = sortableData;
        this.onSortableDataChange();
    }
    get sortableData(): any[] {
        return this._sortableData;
    }

    _sortableConfig: SortableConfig;
    @Input("ui-sortable") set sortableConfig(config: SortableConfig) {
        if (config) {
            this.config = this._sortableConfig = config;
        }
    }

    @Input("ui-sortable-zones") set sortableZones(dropZones: string[]) {
        this.dropZoneNames = dropZones;
    }
    get sortableZones(): string[] {
        return this.dropZoneNames;
    }

    constructor(elemRef: ElementRef, ddZonesService: DragDropZonesService, dragDropConfigService: DragDropConfigService,
        public sortableDataService: DragDropSortableDataService) {
        super(elemRef, ddZonesService, new BaseDDConfig());
        this.sortableConfig = dragDropConfigService.sortableConfig;
    }

    onDragEnterCallback = (event: Event) => {
        console.log('drag node [' + this.sortableDataService.index.toString() + '] over parent node');
        this._sortableData.push(this.sortableDataService.sortableData.splice(this.sortableDataService.index, 1));
        this.sortableDataService.sortableData = this._sortableData;
        this.sortableDataService.index = 0;
    };

    onSortableDataChange = () => {
        this.dropEnabled = this._sortableData.length === 0;
        console.log("collection is changed, drop enabled: " + this.dropEnabled.toString());
    };
}

@Directive({ selector: '[ui-sortable-item]' })
export class SortableItemComponent extends AbstractDraggableDroppableComponent {

    @Input('ui-sortable-item') index: number;

    constructor(public sortableComponent: SortableComponent, public sortableDataService: DragDropSortableDataService, elemRef: ElementRef,
        ddZonesService: DragDropZonesService, ddcService: DragDropConfigService) {
        super(elemRef, ddZonesService, ddcService.sortableConfig);
        this.dropZoneNames = this.sortableComponent.dropZoneNames;
        this.dragEnabled = true;
        this.dropEnabled = true;
    }

    onDragStartCallback = (event: Event) => {
        console.log('dragging elem with index ' + this.index.toString());
        this.sortableDataService.sortableData = this.sortableComponent._sortableData;
        this.sortableDataService.index = this.index;
        this.sortableDataService.element(this.elem, this.sortableComponent._sortableConfig);
    };

    onDragOverCallback = (event: Event) => {
        //This is needed to make it working on Firefox. Probably the order the events are triggered is not the same in FF
        //and Chrome.
        if (this.elem != this.sortableDataService._elem) {
            this.sortableDataService.sortableData = this.sortableComponent._sortableData;
            this.sortableDataService.index = this.index;
            this.sortableDataService.element(this.elem, this.sortableComponent._sortableConfig);
        }
    };

    onDragEndCallback = (event: Event) => {
        this.sortableDataService.sortableData = null;
        this.sortableDataService.index = null;
        this.sortableDataService.element(null, this.sortableComponent._sortableConfig);
    };

    onDragEnterCallback = (event: Event) => {
        this.sortableDataService.element(this.elem, this.sortableComponent._sortableConfig);
        if ((this.index != this.sortableDataService.index) || (this.sortableDataService.sortableData != this.sortableComponent._sortableData)) {
            console.log('drag node [' + this.index.toString() + '] over node [' + this.sortableDataService.index.toString() + ']');
            this.sortableComponent._sortableData.splice(this.index, 0, this.sortableDataService.sortableData.splice(this.sortableDataService.index, 1));
            this.sortableDataService.sortableData = this.sortableComponent._sortableData;
            this.sortableDataService.index = this.index;
        }
    }
}