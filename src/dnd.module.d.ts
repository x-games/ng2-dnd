import { ModuleWithProviders } from "@angular/core";
import { DragDropConfig } from './dnd.config';
import { DragDropService, DragDropSortableService, dragDropServiceFactory, dragDropSortableServiceFactory } from './dnd.service';
import * as i0 from "@angular/core";
import * as i1 from "./draggable.component";
import * as i2 from "./droppable.component";
import * as i3 from "./sortable.component";
export * from './abstract.component';
export * from './dnd.config';
export * from './dnd.service';
export * from './draggable.component';
export * from './droppable.component';
export * from './sortable.component';
export declare let providers: (typeof DragDropConfig | {
    provide: typeof DragDropService;
    useFactory: typeof dragDropServiceFactory;
    deps?: undefined;
} | {
    provide: typeof DragDropSortableService;
    useFactory: typeof dragDropSortableServiceFactory;
    deps: (typeof DragDropConfig)[];
})[];
export declare class DndModule {
    static forRoot(): ModuleWithProviders<DndModule>;
    static ɵmod: i0.ɵɵNgModuleDefWithMeta<DndModule, [typeof i1.DraggableComponent, typeof i1.DraggableHandleComponent, typeof i2.DroppableComponent, typeof i3.SortableContainer, typeof i3.SortableComponent, typeof i3.SortableHandleComponent], never, [typeof i1.DraggableComponent, typeof i1.DraggableHandleComponent, typeof i2.DroppableComponent, typeof i3.SortableContainer, typeof i3.SortableComponent, typeof i3.SortableHandleComponent]>;
    static ɵinj: i0.ɵɵInjectorDef<DndModule>;
}
