// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable} from 'angular2/core';
import {Directive, Input, Output, EventEmitter, ElementRef} from 'angular2/core';

import {DragDropConfig, DragDropZonesService, DragDropDataService, DragDropConfigService, DragImage} from './dnd.common';

@Injectable()
export class DraggableElementHandler {

    defaultCursor: string;

    constructor(private draggableComponent: DraggableComponent) {
        this.defaultCursor = draggableComponent.elem.style.cursor;
    }

    refresh(): void {
        this.draggableComponent.elem.draggable = this.draggableComponent.dragEnabled;
        if (this.draggableComponent.config.dragCursor != null) {
            this.draggableComponent.elem.style.cursor = this.draggableComponent.dragEnabled ? this.draggableComponent.config.dragCursor : this.defaultCursor;
        }
    }
}

@Directive({ selector: '[dnd-draggable]' })
export class DraggableComponent /*extends AbstractDraggableDroppableComponent */{

    elem: HTMLElement;
    private _draggableHandler: DraggableElementHandler;

    /**
     * Whether the object is draggable. Default is true.
     */
    // @Input() dragEnabled: boolean;
    private _dragEnabled: boolean = false;
    @Input() set dragEnabled(enabled: boolean) {
        this._dragEnabled = enabled;
        this._draggableHandler.refresh();
    }
    get dragEnabled(): boolean {
        return this._dragEnabled
    }

    /**
     * The data that has to be dragged. It can be any JS object
     */
    @Input() draggableData: any;

    //ddConfig: DragDropConfig;
    private _config: DragDropConfig;
    get config(): DragDropConfig {
        return this._config
    }
    set config(config: DragDropConfig) {
        this._config = config;
        this._draggableHandler.refresh();
    }

    /**
     * An instance of DragDropConfig class. It permits to configure how the drag&drop look&feel
     * (cursor, drag image, custom classes to add on drag/drop events)
     */
    @Input() set dragdropConfig(value: DragDropConfig) {
        this.config = value;
    }

    /**
     * Callback function called when the drag action ends with a valid drop action.
     * It is activated after the on-drop-success callback
     */
    @Output("onDragSuccess") onDragSuccessCallback: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Array of Strings. Specify the drop-zones to which this component can drop.
     */
    @Input() set dropZones(value: Array<string>) {
        this.dropZoneNames = value;
    }
    
    private _dropZoneNames: Array<string> = [Math.random().toString()];
    get dropZoneNames(): Array<string> {
        return this._dropZoneNames;
    }
    set dropZoneNames(names: Array<string>) {
        this._dropZoneNames = names;
    }

    constructor(elemRef: ElementRef, private ddZonesService: DragDropZonesService, public dragDropService: DragDropDataService, dragDropConfigService: DragDropConfigService) {
        // super(elemRef, ddZonesService, dragDropConfigService.dragDropConfig);
        this.elem = elemRef.nativeElement;
        this._draggableHandler = new DraggableElementHandler(this);
        this.dragdropConfig = dragDropConfigService.dragDropConfig;
        this.dragEnabled = true;
        this.config = dragDropConfigService.dragDropConfig;
        //
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

    onDragStartCallback = (event: Event) => {
        this.dragDropService.draggableData = this.draggableData;
        this.dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
        let dragTarget: HTMLElement = <HTMLElement>event.target;
        dragTarget.classList.add(this.config.onDragStartClass);
    };
    
    onDragEndCallback = (event: Event) => {
        this.dragDropService.draggableData = null;
        this.dragDropService.onDragSuccessCallback = null;
        let dragTarget: HTMLElement = <HTMLElement>event.target;
        dragTarget.classList.remove(this.config.onDragStartClass);
    }
    
    private _onDragStart(event: Event): void {
        if (!this.dragEnabled) {
            return;
        }
        this.ddZonesService.allowedDropZones = this.dropZoneNames;
        this.onDragStartCallback(event);
    }

    private _onDragEnd(event: Event): void {
        this.ddZonesService.allowedDropZones = [];
        this.onDragEndCallback(event);
    }
}