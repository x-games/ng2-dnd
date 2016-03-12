// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable} from 'angular2/core';
import {Directive, Input, Output, EventEmitter, ElementRef} from 'angular2/core';
// import {ObservableWrapper} from 'angular2/src/facade/async';

import {DragDropConfig, DragDropZonesService} from './dnd.common';
import {DragDropDataService, DragDropConfigService} from './dnd.draggable';

@Directive({ selector: '[dnd-droppable]' })
export class DroppableComponent {

    elem: HTMLElement;
    
    dropEnabled: boolean = false;
    
    private _config: DragDropConfig;
    get config(): DragDropConfig {
        return this._config
    }
    set config(config: DragDropConfig) {
        this._config = config;
        // this._draggableHandler.refresh();
    }
    
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
    
    private _dropZoneNames: Array<string> = [Math.random().toString()];
    get dropZoneNames(): Array<string> {
        return this._dropZoneNames;
    }
    set dropZoneNames(names: Array<string>) {
        this._dropZoneNames = names;
    }

    constructor(elemRef: ElementRef, private ddZonesService: DragDropZonesService, public dragDropService: DragDropDataService, dragDropConfigService: DragDropConfigService) {
        this.elem = elemRef.nativeElement;
        this.dragdropConfig = dragDropConfigService.dragDropConfig;
        this.dropEnabled = true;
        this.config = dragDropConfigService.dragDropConfig;
        //
        //drop events
        this.elem.ondragenter = (event: Event) => {
            this._onDragEnter(event);
        };
        this.elem.ondragover = (event: DragEvent) => {
            this._onDragOver(event);
            //workaround to avoid NullPointerException during unit testing
            if (event.dataTransfer != null) {
                event.dataTransfer.dropEffect = this.config.dropEffect.name;
            }
        };
        this.elem.ondragleave = (event: Event) => {
            this._onDragLeave(event);
        };
        this.elem.ontouchstart = (event: Event) => {
            this._onDragEnter(event);
        };
        this.elem.ontouchend = (event: Event) => {
            this._onDragLeave(event);
        };
        this.elem.ondrop = (event: Event) => {
            this._onDrop(event);
        };
    }

    private _onDragEnter(event: Event): void {
        if (!this.dropEnabled || !this.isDropAllowed()) {
            return;
        }
        console.log("'dragEnter' event");
        // This is necessary to allow us to drop.
        event.preventDefault();
        this.onDragEnterCallback(event);
    }

    private _onDragOver(event: Event): void {
        if (!this.dropEnabled || !this.isDropAllowed()) {
            return;
        }
        console.log("'dragOver' event");
        // This is necessary to allow us to drop.
        event.preventDefault();
        this.onDragOverCallback(event);
    }

    private _onDragLeave(event: Event): void {
        if (!this.dropEnabled || !this.isDropAllowed()) {
            return;
        }
        console.log("'dragLeave' event");
        this.onDragLeaveCallback(event);
    }

    private _onDrop(event: Event): void {
        if (!this.dropEnabled || !this.isDropAllowed()) {
            return;
        }
        console.log("'drop' event");
        this.onDropCallback(event);
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
            // ObservableWrapper.callEmit(this.onDropSuccessCallback, this.dragDropService.draggableData);
            this.onDropSuccessCallback.emit(this.dragDropService.draggableData);
        }
        if (this.dragDropService.onDragSuccessCallback) {
            this.dragDropService.onDragSuccessCallback.emit(this.dragDropService.draggableData);
            // ObservableWrapper.callEmit(this.dragDropService.onDragSuccessCallback, this.dragDropService.draggableData);
        }
        this.elem.classList.remove(this.config.onDragOverClass);
        this.elem.classList.remove(this.config.onDragEnterClass);
    }

    isDropAllowed(): boolean {
        if (this.dropZoneNames.length === 0 && this.ddZonesService.allowedDropZones.length === 0) {
            return true;
        }
        for (let i:number = 0; i < this.ddZonesService.allowedDropZones.length; i++) {
            let dragZone:string = this.ddZonesService.allowedDropZones[i];
            if (this.dropZoneNames.indexOf(dragZone) !== -1) {
                return true;
            }
        }
        return false;
    }
}