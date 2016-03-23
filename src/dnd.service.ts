// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable, ElementRef, EventEmitter} from 'angular2/core';
import {isPresent} from 'angular2/src/facade/lang';

import {DragDropConfig} from './dnd.config';

@Injectable()
export class DragDropService {
    allowedDropZones: Array<string> = [];
    onDragSuccessCallback: EventEmitter<any>;
    dragData: any;
}

@Injectable()
export class DragDropSortableService {
    index: number;
    sortableData: Array<any>;

    private _elem: HTMLElement;
    public get elem(): HTMLElement {
        return this._elem;
    }

    constructor(private _config:DragDropConfig) {}

    markSortable(elem: HTMLElement) {
        if (isPresent(this._elem)) {
            this._elem.classList.remove(this._config.onSortableDragClass);
        }
        if (isPresent(elem)) {
            this._elem = elem;
            this._elem.classList.add(this._config.onSortableDragClass);
        }
    }
}