// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

'use strict';

import {DataTransferEffect, DragImage, DragDropConfig, DragDropZonesService} from './src/dnd.common';
import {DragDropDataService, DragDropConfigService, DraggableComponent, DraggableElementHandler} from './src/dnd.draggable';
import {DroppableComponent} from './src/dnd.droppable';

export * from './src/dnd.common';
export * from './src/dnd.draggable';
export * from './src/dnd.droppable';

export const DND_PROVIDERS: any[] = [DragDropZonesService, DragDropDataService, DragDropConfigService];
export const DND_DIRECTIVES: any[] = [DraggableComponent, DroppableComponent];