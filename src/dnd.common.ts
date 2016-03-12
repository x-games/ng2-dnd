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
