// Copyright (C) 2016-2020 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
import { NgModule } from "@angular/core";
import { DragDropConfig } from './dnd.config';
import { DragDropService, DragDropSortableService, dragDropServiceFactory, dragDropSortableServiceFactory } from './dnd.service';
import { DraggableComponent, DraggableHandleComponent } from './draggable.component';
import { DroppableComponent } from './droppable.component';
import { SortableContainer, SortableComponent, SortableHandleComponent } from './sortable.component';
import * as i0 from "@angular/core";
export * from './abstract.component';
export * from './dnd.config';
export * from './dnd.service';
export * from './draggable.component';
export * from './droppable.component';
export * from './sortable.component';
export let providers = [
    DragDropConfig,
    { provide: DragDropService, useFactory: dragDropServiceFactory },
    { provide: DragDropSortableService, useFactory: dragDropSortableServiceFactory, deps: [DragDropConfig] }
];
export class DndModule {
    static forRoot() {
        return {
            ngModule: DndModule,
            providers: providers
        };
    }
}
DndModule.ɵmod = i0.ɵɵdefineNgModule({ type: DndModule });
DndModule.ɵinj = i0.ɵɵdefineInjector({ factory: function DndModule_Factory(t) { return new (t || DndModule)(); } });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(DndModule, { declarations: [DraggableComponent, DraggableHandleComponent, DroppableComponent, SortableContainer, SortableComponent, SortableHandleComponent], exports: [DraggableComponent, DraggableHandleComponent, DroppableComponent, SortableContainer, SortableComponent, SortableHandleComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DndModule, [{
        type: NgModule,
        args: [{
                declarations: [DraggableComponent, DraggableHandleComponent, DroppableComponent, SortableContainer, SortableComponent, SortableHandleComponent],
                exports: [DraggableComponent, DraggableHandleComponent, DroppableComponent, SortableContainer, SortableComponent, SortableHandleComponent],
            }]
    }], null, null); })();
