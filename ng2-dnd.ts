// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

'use strict';

import {DataTransferEffect, DragImage, DragDropService} from './src/dnd.service';
import {DraggableComponent} from './src/dnd.draggable';
import {DroppableComponent} from './src/dnd.droppable';

export * from './src/dnd.service';
export * from './src/dnd.draggable';
export * from './src/dnd.droppable';

export const DND_PROVIDERS: any[] = [DragDropService];
export const DND_DIRECTIVES: any[] = [DraggableComponent, DroppableComponent];