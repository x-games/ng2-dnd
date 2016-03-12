// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable} from 'angular2/core';
import {Directive, Input, Output, EventEmitter, ElementRef} from 'angular2/core';

import {DragDropService, DragImage} from './dnd.service';

@Directive({ selector: '[dnd-draggable]' })
export class DraggableComponent {

    _elem: HTMLElement;
    _defaultCursor: string;

    /**
     * Whether the object is draggable. Default is true.
     */
    private _dragEnabled: boolean = true;
    @Input() set dragEnabled(enabled: boolean) {
        this._dragEnabled = enabled;
        //
        this._elem.draggable = this.dragEnabled;
        if (this._dragDropService.dragCursor != null) {
            this._elem.style.cursor = this.dragEnabled ? this._dragDropService.dragCursor : this._defaultCursor;
        }
    }
    get dragEnabled(): boolean {
        return this._dragEnabled
    }

    /**
     * The data that has to be dragged. It can be any JS object
     */
    @Input() draggableData: any;

    /**
     * Callback function called when the drag action ends with a valid drop action.
     * It is activated after the on-drop-success callback
     */
    @Output("onDragSuccess") onDragSuccessCallback: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Array of Strings. Specify the drop-zones to which this component can drop.
     */
    @Input() dropZones: string[] = [];

    constructor(private elemRef: ElementRef, private _dragDropService: DragDropService) {
        this._elem = elemRef.nativeElement;
        this._defaultCursor = this._elem.style.cursor;
        //drag events
        this._elem.ondragstart = (event: DragEvent) => {
            this._onDragStart(event);
            // 
            if (event.dataTransfer != null) {
                event.dataTransfer.effectAllowed = this._dragDropService.dragEffect.name;
                event.dataTransfer.setData('text/html', '');

                if (this._dragDropService.dragImage != null) {
                    let dragImage: DragImage = this._dragDropService.dragImage;
                    (<any>event.dataTransfer).setDragImage(dragImage.imageElement, dragImage.x_offset, dragImage.y_offset);
                }

            }
        };
        this._elem.ondragend = (event: Event) => {
            this._onDragEnd(event);
        };
        this._elem.ontouchstart = (event: Event) => {
            this._onDragStart(event);
        };
        this._elem.ontouchend = (event: Event) => {
            this._onDragEnd(event);
        };
    }

    private _onDragStart(event: Event): void {
        if (this.dragEnabled) {
            this._dragDropService.allowedDropZones = this.dropZones;
            this._onDragStartCallback(event);
        }
    }

    private _onDragEnd(event: Event): void {
        this._dragDropService.allowedDropZones = [];
        this._onDragEndCallback(event);
    }
    
    private _onDragStartCallback(event: Event) {
        this._dragDropService.draggableData = this.draggableData;
        this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
        let dragTarget: HTMLElement = <HTMLElement>event.target;
        dragTarget.classList.add(this._dragDropService.onDragStartClass);
    }
    
    private _onDragEndCallback(event: Event) {
        this._dragDropService.draggableData = null;
        this._dragDropService.onDragSuccessCallback = null;
        let dragTarget: HTMLElement = <HTMLElement>event.target;
        dragTarget.classList.remove(this._dragDropService.onDragStartClass);
    }
}