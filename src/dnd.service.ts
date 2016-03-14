// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable, ElementRef, EventEmitter} from 'angular2/core';

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

    onDragStartClass: string = "dnd-drag-start";
    onDragEnterClass: string = "dnd-drag-enter";
    onDragOverClass: string = "dnd-drag-over";
}