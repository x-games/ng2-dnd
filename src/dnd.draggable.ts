// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable, ChangeDetectorRef} from '@angular/core';
import {Directive, Input, Output, EventEmitter, ElementRef} from '@angular/core';

import {AbstractComponent} from './dnd.component';
import {DragDropConfig} from './dnd.config';
import {DragDropService} from './dnd.service';

@Directive({ selector: '[dnd-draggable]' })
export class DraggableComponent extends AbstractComponent {

    @Input("dragEnabled") set draggable(value:boolean) {
        this.dragEnabled = !!value;
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

    @Input("dropZones") set dropzones(value:Array<string>) {
        this.dropZones = value;
    }

    /**
     * Drag allowed effect
     */
    @Input("effectAllowed") set effectallowed(value: string) {
        this.effectAllowed = value;
    }

    /**
     * Drag effect cursor
     */
    @Input("effectCursor") set effectcursor(value: string) {
        this.effectCursor = value;
    }

    constructor(elemRef: ElementRef, dragDropService: DragDropService, config:DragDropConfig,
        cdr:ChangeDetectorRef) {

        super(elemRef, dragDropService, config, cdr);
        this._defaultCursor = this._elem.style.cursor;
        this.dragEnabled = true;
    }

    _onDragStartCallback(event: Event) {
        this._dragDropService.isDragged = true;
        this._dragDropService.dragData = this.dragData;
        this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
        this._elem.classList.add(this._config.onDragStartClass);
    }

    _onDragEndCallback(event: Event) {
        this._dragDropService.isDragged = false;
        this._dragDropService.dragData = null;
        this._dragDropService.onDragSuccessCallback = null;
        this._elem.classList.remove(this._config.onDragStartClass);
    }
}