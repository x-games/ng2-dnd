// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable, ElementRef} from 'angular2/core';

@Injectable()
export class DragDropZonesService {
    allowedDropZones: Array<string> = [];
}

@Injectable()
export class DragImage {

    constructor(
        public imageElement: HTMLElement,
        public x_offset: number = 0,
        public y_offset: number = 0) { }

}

@Injectable()
export class DragDropConfig {
    dragImage: DragImage;
    dragEffect: DataTransferEffect = DataTransferEffect.MOVE;
    dropEffect: DataTransferEffect = DataTransferEffect.MOVE;
    dragCursor: string = "move";
    
    onDragStartClass: string = "ui-drag-start";
    onDragEnterClass: string = "ui-drag-enter";
    onDragOverClass: string = "ui-drag-over";
    
    onSortableDragClass: string = "ui-sortable-drag";
}

@Injectable()
export class DataTransferEffect {

    static COPY = new DataTransferEffect('copy');
    static LINK = new DataTransferEffect('link');
    static MOVE = new DataTransferEffect('move');
    static NONE = new DataTransferEffect('none');

    constructor(public name: string) { }
}

@Injectable()
export class DraggableElementHandler {

    defaultCursor: string;

    constructor(private draggableComponent: AbstractDraggableDroppableComponent) {
        this.defaultCursor = draggableComponent.elem.style.cursor;
    }

    refresh(): void {
        this.draggableComponent.elem.draggable = this.draggableComponent.dragEnabled;
        if (this.draggableComponent.config.dragCursor != null) {
            this.draggableComponent.elem.style.cursor = this.draggableComponent.dragEnabled ? this.draggableComponent.config.dragCursor : this.defaultCursor;
        }
    }
}

@Injectable()
export abstract class AbstractDraggableDroppableComponent {

    elem: HTMLElement

    private _draggableHandler: DraggableElementHandler;

    private _dropZoneNames: Array<string> = [Math.random().toString()];
    get dropZoneNames(): Array<string> {
        return this._dropZoneNames;
    }
    set dropZoneNames(names: Array<string>) {
        this._dropZoneNames = names;
    }

    private _config: DragDropConfig;
    get config(): DragDropConfig {
        return this._config
    }
    set config(config: DragDropConfig) {
        this._config = config;
        this._draggableHandler.refresh();
    }

    private _dragEnabled: boolean = false;
    get dragEnabled(): boolean {
        return this._dragEnabled
    }
    set dragEnabled(enabled: boolean) {
        this._dragEnabled = enabled;
        this._draggableHandler.refresh();
    }

    dropEnabled: boolean = false;

    onDragEnterCallback = (event: Event): void => { };
    onDragOverCallback = (event: Event): void => { };
    onDragLeaveCallback = (event: Event): void => { };
    onDropCallback = (event: Event): void => { };
    onDragStartCallback = (event: Event): void => { };
    onDragEndCallback = (event: Event): void => { };

    constructor(elemRef: ElementRef, private ddZonesService: DragDropZonesService, config: DragDropConfig) {
        console.log('ddZonesService', this.ddZonesService);
        this.elem = elemRef.nativeElement;
        this._draggableHandler = new DraggableElementHandler(this);
        this.config = config;

        //drop events
        this.elem.ondragenter = (event: Event) => {
            this._onDragEnter(event);
        };
        this.elem.ondragover = (event: DragEvent) => {
            this._onDragOver(event);
            //workaround to avoid NullPointerException during unit testing
            if (event.dataTransfer != null) {
                event.dataTransfer.dropEffect = config.dropEffect.name;
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

        //drag events
        this.elem.ondragstart = (event: DragEvent) => {
            this._onDragStart(event);
            //workaround to avoid NullPointerException during unit testing
            if (event.dataTransfer != null) {
                event.dataTransfer.effectAllowed = this.config.dragEffect.name;
                event.dataTransfer.setData('text/html', '');

                if (this.config.dragImage != null) {
                    let dragImage: DragImage = this.config.dragImage;
                    (<any>event.dataTransfer).setDragImage(dragImage.imageElement, dragImage.x_offset, dragImage.y_offset);
                }

            }
        };
        this.elem.ondragend = (event: Event) => {
            this._onDragEnd(event);
        };
        this.elem.ontouchstart = (event: Event) => {
            this._onDragStart(event);
        };
        this.elem.ontouchend = (event: Event) => {
            this._onDragEnd(event);
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

    isDropAllowed(): boolean {
        if (this._dropZoneNames.length === 0 && this.ddZonesService.allowedDropZones.length === 0) {
            return true;
        }
        for (let dragZone in this.ddZonesService.allowedDropZones) {
            if (this._dropZoneNames.indexOf(dragZone) !== -1) {
                return true;
            }
        }
        return false;
    }

    private _onDragStart(event: Event): void {
        if (!this._dragEnabled) {
            return;
        }
        console.log("'dragStart' event");
        console.log('ddZonesService', this.ddZonesService);
        this.ddZonesService.allowedDropZones = this._dropZoneNames;
        this.onDragStartCallback(event);
    }

    private _onDragEnd(event: Event): void {
        console.log("'dragEnd' event");
        console.log('ddZonesService', this.ddZonesService);
        this.ddZonesService.allowedDropZones = [];
        this.onDragEndCallback(event);
    }
}
