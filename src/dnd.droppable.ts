// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable, ChangeDetectorRef} from 'angular2/core';
import {Directive, Input, Output, EventEmitter, ElementRef} from 'angular2/core';

import {AbstractComponent} from './dnd.component';
import {DragDropConfig} from './dnd.config';
import {DragDropService} from './dnd.service';

@Directive({ selector: '[dnd-droppable]' })
export class DroppableComponent extends AbstractComponent {

    @Input("dropEnabled") set droppable(value:boolean) {
        this.dropEnabled = !!value;
    }
    
    /**
     * Callback function called when the drop action completes correctly.
     * It is activated before the on-drag-success callback.
     */
    @Output("onDropSuccess") onDropSuccessCallback: EventEmitter<any> = new EventEmitter<any>();
    
    @Output("onDragEnter") onDragEnterCallback: EventEmitter<any> = new EventEmitter<any>();
    @Output("onDragOver") onDragOverCallback: EventEmitter<any> = new EventEmitter<any>();
    @Output("onDragLeave") onDragLeaveCallback: EventEmitter<any> = new EventEmitter<any>();
    
    @Input("dropZones") set dropzones(value:Array<string>) {
        this.dropZones = value;
    }

    constructor(elemRef: ElementRef, dragDropService: DragDropService, config:DragDropConfig, 
        cdr:ChangeDetectorRef) {
            
        super(elemRef, dragDropService, config, cdr);
        
        this.dropEnabled = true;
    }

    _onDragEnterCallback(event: Event) {
        this._elem.classList.add(this._config.onDragEnterClass);
        this.onDragEnterCallback.emit(this._dragDropService.dragData);
    }
    
    _onDragOverCallback (event: Event) {
        this._elem.classList.add(this._config.onDragOverClass);
        this.onDragOverCallback.emit(this._dragDropService.dragData);
    };

    _onDragLeaveCallback (event: Event) {
        this._elem.classList.remove(this._config.onDragOverClass);
        this._elem.classList.remove(this._config.onDragEnterClass);
        this.onDragLeaveCallback.emit(this._dragDropService.dragData);
    };

    _onDropCallback (event: Event) {
        // console.log('onDropCallback.onDropSuccessCallback.dragData', this._dragDropService.dragData);
        this.onDropSuccessCallback.emit(this._dragDropService.dragData);
        if (this._dragDropService.onDragSuccessCallback) {
            // console.log('onDropCallback.onDragSuccessCallback.dragData', this._dragDropService.dragData);
            this._dragDropService.onDragSuccessCallback.emit(this._dragDropService.dragData);
        }
        this._elem.classList.remove(this._config.onDragOverClass);
        this._elem.classList.remove(this._config.onDragEnterClass);
    }
}
