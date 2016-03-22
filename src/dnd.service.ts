// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable, ElementRef, EventEmitter} from 'angular2/core';
import {isPresent} from 'angular2/src/facade/lang';

import {DragDropConfig} from './dnd.config';

@Injectable()
export class DragImage {
    constructor(
        public imageElement: HTMLElement,
        public x_offset: number = 0,
        public y_offset: number = 0) { }
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
export class DragDropService {
    dragImage: DragImage;
    dragEffect: DataTransferEffect = DataTransferEffect.MOVE;
    dropEffect: DataTransferEffect = DataTransferEffect.MOVE;
    dragCursor: string = "move";

    allowedDropZones: Array<string> = [];

    onDragSuccessCallback: EventEmitter<any>;
    dragData: any;
}

@Injectable()
export class DragDropSortableService {
    index: number;
    sortableData: Array<any>;

    _elem: HTMLElement;

    constructor(private _config:DragDropConfig) {}

    element(elem: HTMLElement) {
        if (isPresent(this._elem)) {
            this._elem.classList.remove(this._config.onSortableDragClass);
        }
        if (isPresent(elem)) {
            this._elem = elem;
            this._elem.classList.add(this._config.onSortableDragClass);
        }
    }
}