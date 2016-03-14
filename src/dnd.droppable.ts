// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable} from 'angular2/core';
import {Directive, Input, Output, EventEmitter, ElementRef} from 'angular2/core';

import {DragDropService} from './dnd.service';

@Directive({ selector: '[dnd-droppable]' })
export class DroppableComponent {

    _elem: HTMLElement;

    @Input() dropEnabled: boolean = true;

    /**
     * Callback function called when the drop action completes correctly.
     * It is activated before the on-drag-success callback.
     */
    @Output("onDropSuccess") onDropSuccessCallback: EventEmitter<any> = new EventEmitter<any>();

    /**
     * Array of Strings. It permits to specify the drop zones associated with this component.
     * By default, if the drop-zones attribute is not specified, the droppable component accepts
     * drop operations by all the draggable components that do not specify the allowed-drop-zones
     */
    @Input() dropZones: string[] = [];

    constructor(private elemRef: ElementRef, private _dragDropService: DragDropService) {
        this._elem = elemRef.nativeElement;
        //
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
        this._elem.ondragleave = (event: Event) => {
            this._onDragLeave(event);
        };
        this._elem.ontouchstart = (event: Event) => {
            this._onDragEnter(event);
        };
        this._elem.ontouchend = (event: Event) => {
            this._onDragLeave(event);
        };
        this._elem.ondrop = (event: Event) => {
            this._onDrop(event);
        };
    }

    private _onDragEnter(event: Event): void {
        if (this._isDropAllowed()) {
            event.preventDefault();
            this._onDragEnterCallback(event);
        }
    }

    private _onDragOver(event: Event): void {
        if (this._isDropAllowed()) {
            event.preventDefault();
            this._onDragOverCallback(event);
        }
    }

    private _onDragLeave(event: Event): void {
        if (this._isDropAllowed()) {
            event.preventDefault();
            this._onDragLeaveCallback(event);
        }
    }

    private _onDrop(event: Event): void {
        if (this._isDropAllowed()) {
            event.preventDefault();
            this._onDropCallback(event);
        }
    }


    private _onDragEnterCallback(event: Event) {
        this._elem.classList.add(this._dragDropService.onDragEnterClass);
    }

    private _onDragLeaveCallback (event: Event) {
        this._elem.classList.remove(this._dragDropService.onDragOverClass);
        this._elem.classList.remove(this._dragDropService.onDragEnterClass);
    };

    private _onDragOverCallback (event: Event) {
        this._elem.classList.add(this._dragDropService.onDragOverClass);
    };

    private _onDropCallback (event: Event) {
        if (this.onDropSuccessCallback) {
            this.onDropSuccessCallback.emit(this._dragDropService.dragData);
        }
        if (this._dragDropService.onDragSuccessCallback) {
            this._dragDropService.onDragSuccessCallback.emit(this._dragDropService.dragData);
        }
        this._elem.classList.remove(this._dragDropService.onDragOverClass);
        this._elem.classList.remove(this._dragDropService.onDragEnterClass);
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