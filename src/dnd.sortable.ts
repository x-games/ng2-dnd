// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable} from 'angular2/core';
import {Directive, Input, Output, EventEmitter, ElementRef} from 'angular2/core';

import {DragDropConfig} from './dnd.config';
import {DroppableComponent} from './dnd.droppable';
import {DraggableComponent} from './dnd.draggable';
import {DragDropService, DragImage, DragDropSortableService} from './dnd.service';

@Directive({ selector: '[dnd-sortable-container]' })
export class SortableContainer extends DroppableComponent {

    private _sortableData: Array<any> = [];

    @Input() set sortableData(sortableData: Array<any>) {
        this._sortableData = sortableData;
        //
        this.dropEnabled = this._sortableData.length == 0;
        // console.log("collection is changed, drop enabled: " + this.dropEnabled);
    }
    get sortableData(): Array<any> {
        return this._sortableData;
    }

    @Input() sortableZones: string[] = [];


    constructor(elemRef: ElementRef, _dragDropService: DragDropService, _config:DragDropConfig, private _sortableDataService: DragDropSortableService) {
        super(elemRef, _dragDropService, _config);
    }

    //@override
    _onDragEnterCallback(event: Event) {
        // console.log('drag node [' + this._sortableDataService.index.toString() + '] over parent node');
        this._sortableData.push(this._sortableDataService.sortableData.splice(this._sortableDataService.index, 1));
        this._sortableDataService.sortableData = this._sortableData;
        this._sortableDataService.index = 0;
    }
}

@Directive({ selector: '[dnd-sortable]' })
export class SortableComponent extends DraggableComponent {

    @Input('sortableIndex') index: number;
    @Input() dropEnabled: boolean;

    sortableZones: string[];

    constructor(elemRef: ElementRef, _dragDropService: DragDropService, _config:DragDropConfig, private _sortableContainer: SortableContainer, private _sortableDataService: DragDropSortableService) {
        super(elemRef, _dragDropService, _config);

        this.sortableZones = this._sortableContainer.sortableZones;
        this.dragEnabled = true;
        this.dropEnabled = true;
        //drop events
        this._elem.ondragenter = (event: Event) => {
            this._onDragEnter(event);
        };
        this._elem.ondragover = (event: DragEvent) => {
            this._onDragOver(event);
            //
            if (event.dataTransfer != null) {
                event.dataTransfer.dropEffect = this._dragDropService.dropEffect.name;
            }
        };
    }

    private _onDragEnter(event: Event): void {
        // console.log('ondragenter._isDropAllowed', this._isDropAllowed());
        if (this._isDropAllowed()) {
            event.preventDefault();
            this._onDragEnterCallback(event);
        }
    }

    private _onDragOver(event: Event): void {
        // console.log('ondragover._isDropAllowed', this._isDropAllowed());
        if (this._isDropAllowed()) {
            event.preventDefault();
            this._onDragOverCallback(event);
        }
    }

    _onDragStartCallback(event: Event) {
        // console.log('dragging elem with index ' + this.index);
        this._sortableDataService.sortableData = this._sortableContainer.sortableData;
        this._sortableDataService.index = this.index;
        this._sortableDataService.element(this._elem);
    }

    private _onDragOverCallback(event: Event) {
        //This is needed to make it working on Firefox. Probably the order the events are triggered is not the same in FF and Chrome.
        if (this._elem != this._sortableDataService._elem) {
            this._sortableDataService.sortableData = this._sortableContainer.sortableData;
            this._sortableDataService.index = this.index;
            this._sortableDataService.element(this._elem);
        }
    }

    _onDragEndCallback(event: Event) {
        this._sortableDataService.sortableData = null;
        this._sortableDataService.index = null;
        this._sortableDataService.element(null);
    }

    private _onDragEnterCallback(event: Event) {
        this._sortableDataService.element(this._elem);
        if ((this.index !== this._sortableDataService.index) ||
            (this._sortableDataService.sortableData != this._sortableContainer.sortableData)) {
            // console.log('drag node [' + this.index + '] over node [' + this._sortableDataService.index + ']');
            this._sortableContainer.sortableData.splice(this.index, 0, this._sortableDataService.sortableData.splice(this._sortableDataService.index, 1));
            this._sortableDataService.sortableData = this._sortableContainer.sortableData;
            this._sortableDataService.index = this.index;
        }
    }

    private _isDropAllowed(): boolean {
        if (this.dropEnabled) {
            if (this.dropZones.length === 0 && this._dragDropService.allowedDropZones.length === 0) {
                return true;
            }
            for (let i:number = 0; i < this._dragDropService.allowedDropZones.length; i++) {
                let dragZone:string = this._dragDropService.allowedDropZones[i];
                if (this.dropZones.indexOf(dragZone) !== -1) {
                    return true;
                }
            }
        }
        return false;
    }
}