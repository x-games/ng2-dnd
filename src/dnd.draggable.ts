// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable} from 'angular2/core';
import {Directive, Input, Output, EventEmitter, ElementRef} from 'angular2/core';

import {DragDropConfig} from './dnd.config';
import {DragDropService, DragImage} from './dnd.service';

@Directive({ selector: '[dnd-draggable]' })
export class DraggableComponent {

    _elem: HTMLElement;
    _defaultCursor: string;

    /**
     * Whether the object is draggable. Default is true.
     */
    private _dragEnabled: boolean;
    @Input() set dragEnabled(enabled: boolean) {
        this._dragEnabled = !!enabled;
        //
        this._elem.draggable = this._dragEnabled;
        if (this._dragDropService.dragCursor != null) {
            this._elem.style.cursor = this._dragEnabled ? this._dragDropService.dragCursor : this._defaultCursor;
        }
    }
    get dragEnabled(): boolean {
        return this._dragEnabled
    }

    /**
     * The data that has to be dragged. It can be any JS object
     */
    @Input() dragData: any;

    /**
     * Callback function called when the drag action ends with a valid drop action.
     * It is activated after the on-drop-success callback
     */
    @Output("onDragSuccess") onDragSuccessCallback: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Array of Strings. Specify the drop-zones to which this component can drop.
     */
    @Input() dropZones: string[] = [];

    constructor(elemRef: ElementRef, public _dragDropService: DragDropService, private _config:DragDropConfig) {
        this._elem = elemRef.nativeElement;
        this._defaultCursor = this._elem.style.cursor;
        this.dragEnabled = true;
        //drag events
        this._elem.ondragstart = (event: DragEvent) => {
            // console.log('ondragstart', event.target);
            this._onDragStart(event);
            //
            if (event.dataTransfer != null) {
                event.dataTransfer.effectAllowed = this._dragDropService.dragEffect.name;
                event.dataTransfer.setData('text/html', '');

                if (this._dragDropService.dragImage != null) {
                    let dragImage: DragImage = this._dragDropService.dragImage;
                    (<any>event.dataTransfer).setDragImage(dragImage.imageElement, dragImage.x_offset, dragImage.y_offset);
                }

                // console.log('ondragstart.dataTransfer', event.dataTransfer);
            }
        };
        this._elem.ondragend = (event: Event) => {
            // console.log('ondragend', event.target);
            this._onDragEnd(event);
        };
        this._elem.ontouchstart = (event: Event) => {
            // console.log('ontouchstart', event.target);
            this._onDragStart(event);
        };
        this._elem.ontouchend = (event: Event) => {
            // console.log('ontouchend', event.target);
            this._onDragEnd(event);
        };
    }

    private _onDragStart(event: Event): void {
        // console.log('ondragstart.dragEnabled', this._dragEnabled);
        if (this._dragEnabled) {
            this._dragDropService.allowedDropZones = this.dropZones;
            // console.log('ondragstart.allowedDropZones', this._dragDropService.allowedDropZones);
            this._onDragStartCallback(event);
        }
    }

    private _onDragEnd(event: Event): void {
        this._dragDropService.allowedDropZones = [];
        // console.log('ondragend.allowedDropZones', this._dragDropService.allowedDropZones);
        this._onDragEndCallback(event);
    }

    _onDragStartCallback(event: Event) {
        this._dragDropService.dragData = this.dragData;
        this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
        this._elem.classList.add(this._config.onDragStartClass);
    }

    _onDragEndCallback(event: Event) {
        this._dragDropService.dragData = null;
        this._dragDropService.onDragSuccessCallback = null;
        this._elem.classList.remove(this._config.onDragStartClass);
    }
}