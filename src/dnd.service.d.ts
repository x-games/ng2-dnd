import { EventEmitter } from '@angular/core';
import { DragDropConfig } from './dnd.config';
import { SortableContainer } from './sortable.component';
import * as i0 from "@angular/core";
export declare class DragDropData {
    dragData: any;
    mouseEvent: MouseEvent;
}
export declare function dragDropServiceFactory(): DragDropService;
export declare class DragDropService {
    allowedDropZones: Array<string>;
    onDragSuccessCallback: EventEmitter<DragDropData>;
    dragData: any;
    isDragged: boolean;
    static ɵfac: i0.ɵɵFactoryDef<DragDropService, never>;
    static ɵprov: i0.ɵɵInjectableDef<DragDropService>;
}
export declare function dragDropSortableServiceFactory(config: DragDropConfig): DragDropSortableService;
export declare class DragDropSortableService {
    private _config;
    index: number;
    sortableContainer: SortableContainer;
    isDragged: boolean;
    private _elem;
    get elem(): HTMLElement;
    constructor(_config: DragDropConfig);
    markSortable(elem: HTMLElement): void;
    static ɵfac: i0.ɵɵFactoryDef<DragDropSortableService, never>;
    static ɵprov: i0.ɵɵInjectableDef<DragDropSortableService>;
}
