// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import {DragDropConfig} from './src/dnd.config';
import {DragDropService, DragDropSortableService} from './src/dnd.service';
import {DraggableComponent} from './src/draggable.component';
import {DroppableComponent} from './src/droppable.component';
import {SortableContainer, SortableComponent} from './src/sortable.component';

export * from './src/abstract.component';
export * from './src/dnd.config';
export * from './src/dnd.service';
export * from './src/draggable.component';
export * from './src/droppable.component';
export * from './src/sortable.component';

export const DND_PROVIDERS: any[] = [DragDropConfig, DragDropService, DragDropSortableService];
export const DND_DIRECTIVES: any[] = [DraggableComponent, DroppableComponent, SortableContainer, SortableComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [DraggableComponent, DroppableComponent, SortableContainer, SortableComponent],
  exports : [DraggableComponent, DroppableComponent, SortableContainer, SortableComponent]
})
export class DndModule {
  static forRoot(): ModuleWithProviders {
        return {
            ngModule: DndModule,
            providers: [DragDropConfig, DragDropService, DragDropSortableService]
        };
    }
}