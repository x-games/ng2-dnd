// Copyright (C) 2016-2020 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd
import { ChangeDetectorRef } from '@angular/core';
import { Directive, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormArray } from '@angular/forms';
import { AbstractComponent, AbstractHandleComponent } from './abstract.component';
import { DragDropConfig } from './dnd.config';
import { DragDropService, DragDropSortableService } from './dnd.service';
export class SortableContainer extends AbstractComponent {
    constructor(elemRef, dragDropService, config, cdr, _sortableDataService) {
        super(elemRef, dragDropService, config, cdr);
        this._sortableDataService = _sortableDataService;
        this._sortableData = [];
        this.dragEnabled = false;
    }
    set draggable(value) {
        this.dragEnabled = !!value;
    }
    set sortableData(sortableData) {
        this._sortableData = sortableData;
        if (sortableData instanceof FormArray) {
            this.sortableHandler = new SortableFormArrayHandler();
        }
        else {
            this.sortableHandler = new SortableArrayHandler();
        }
        //
        this.dropEnabled = !!this._sortableData;
        // console.log("collection is changed, drop enabled: " + this.dropEnabled);
    }
    get sortableData() {
        return this._sortableData;
    }
    set dropzones(value) {
        this.dropZones = value;
    }
    _onDragEnterCallback(event) {
        if (this._sortableDataService.isDragged) {
            let item = this._sortableDataService.sortableContainer.getItemAt(this._sortableDataService.index);
            // Check does element exist in sortableData of this Container
            if (this.indexOf(item) === -1) {
                // Let's add it
                // console.log('Container._onDragEnterCallback. drag node [' + this._sortableDataService.index.toString() + '] over parent node');
                // Remove item from previouse list
                this._sortableDataService.sortableContainer.removeItemAt(this._sortableDataService.index);
                if (this._sortableDataService.sortableContainer._sortableData.length === 0) {
                    this._sortableDataService.sortableContainer.dropEnabled = true;
                }
                // Add item to new list
                this.insertItemAt(item, 0);
                this._sortableDataService.sortableContainer = this;
                this._sortableDataService.index = 0;
            }
            // Refresh changes in properties of container component
            this.detectChanges();
        }
    }
    getItemAt(index) {
        return this.sortableHandler.getItemAt(this._sortableData, index);
    }
    indexOf(item) {
        return this.sortableHandler.indexOf(this._sortableData, item);
    }
    removeItemAt(index) {
        this.sortableHandler.removeItemAt(this._sortableData, index);
    }
    insertItemAt(item, index) {
        this.sortableHandler.insertItemAt(this._sortableData, item, index);
    }
}
SortableContainer.decorators = [
    { type: Directive, args: [{ selector: '[dnd-sortable-container]' },] }
];
SortableContainer.ctorParameters = () => [
    { type: ElementRef },
    { type: DragDropService },
    { type: DragDropConfig },
    { type: ChangeDetectorRef },
    { type: DragDropSortableService }
];
SortableContainer.propDecorators = {
    draggable: [{ type: Input, args: ["dragEnabled",] }],
    sortableData: [{ type: Input }],
    dropzones: [{ type: Input, args: ["dropZones",] }]
};
class SortableArrayHandler {
    getItemAt(sortableData, index) {
        return sortableData[index];
    }
    indexOf(sortableData, item) {
        return sortableData.indexOf(item);
    }
    removeItemAt(sortableData, index) {
        sortableData.splice(index, 1);
    }
    insertItemAt(sortableData, item, index) {
        sortableData.splice(index, 0, item);
    }
}
class SortableFormArrayHandler {
    getItemAt(sortableData, index) {
        return sortableData.at(index);
    }
    indexOf(sortableData, item) {
        return sortableData.controls.indexOf(item);
    }
    removeItemAt(sortableData, index) {
        sortableData.removeAt(index);
    }
    insertItemAt(sortableData, item, index) {
        sortableData.insert(index, item);
    }
}
export class SortableComponent extends AbstractComponent {
    constructor(elemRef, dragDropService, config, _sortableContainer, _sortableDataService, cdr) {
        super(elemRef, dragDropService, config, cdr);
        this._sortableContainer = _sortableContainer;
        this._sortableDataService = _sortableDataService;
        /**
         * Callback function called when the drag action ends with a valid drop action.
         * It is activated after the on-drop-success callback
         */
        this.onDragSuccessCallback = new EventEmitter();
        this.onDragStartCallback = new EventEmitter();
        this.onDragOverCallback = new EventEmitter();
        this.onDragEndCallback = new EventEmitter();
        this.onDropSuccessCallback = new EventEmitter();
        this.dropZones = this._sortableContainer.dropZones;
        this.dragEnabled = true;
        this.dropEnabled = true;
    }
    set draggable(value) {
        this.dragEnabled = !!value;
    }
    set droppable(value) {
        this.dropEnabled = !!value;
    }
    /**
     * Drag allowed effect
     */
    set effectallowed(value) {
        this.effectAllowed = value;
    }
    /**
     * Drag effect cursor
     */
    set effectcursor(value) {
        this.effectCursor = value;
    }
    _onDragStartCallback(event) {
        // console.log('_onDragStartCallback. dragging elem with index ' + this.index);
        this._sortableDataService.isDragged = true;
        this._sortableDataService.sortableContainer = this._sortableContainer;
        this._sortableDataService.index = this.index;
        this._sortableDataService.markSortable(this._elem);
        // Add dragData
        this._dragDropService.isDragged = true;
        this._dragDropService.dragData = this.dragData;
        this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
        //
        this.onDragStartCallback.emit(this._dragDropService.dragData);
    }
    _onDragOverCallback(event) {
        if (this._sortableDataService.isDragged && this._elem !== this._sortableDataService.elem) {
            // console.log('_onDragOverCallback. dragging elem with index ' + this.index);
            this._sortableDataService.sortableContainer = this._sortableContainer;
            this._sortableDataService.index = this.index;
            this._sortableDataService.markSortable(this._elem);
            this.onDragOverCallback.emit(this._dragDropService.dragData);
        }
    }
    _onDragEndCallback(event) {
        // console.log('_onDragEndCallback. end dragging elem with index ' + this.index);
        this._sortableDataService.isDragged = false;
        this._sortableDataService.sortableContainer = null;
        this._sortableDataService.index = null;
        this._sortableDataService.markSortable(null);
        // Add dragGata
        this._dragDropService.isDragged = false;
        this._dragDropService.dragData = null;
        this._dragDropService.onDragSuccessCallback = null;
        //
        this.onDragEndCallback.emit(this._dragDropService.dragData);
    }
    _onDragEnterCallback(event) {
        if (this._sortableDataService.isDragged) {
            this._sortableDataService.markSortable(this._elem);
            if ((this.index !== this._sortableDataService.index) ||
                (this._sortableDataService.sortableContainer.sortableData !== this._sortableContainer.sortableData)) {
                // console.log('Component._onDragEnterCallback. drag node [' + this.index + '] over node [' + this._sortableDataService.index + ']');
                // Get item
                let item = this._sortableDataService.sortableContainer.getItemAt(this._sortableDataService.index);
                // Remove item from previouse list
                this._sortableDataService.sortableContainer.removeItemAt(this._sortableDataService.index);
                if (this._sortableDataService.sortableContainer.sortableData.length === 0) {
                    this._sortableDataService.sortableContainer.dropEnabled = true;
                }
                // Add item to new list
                this._sortableContainer.insertItemAt(item, this.index);
                if (this._sortableContainer.dropEnabled) {
                    this._sortableContainer.dropEnabled = false;
                }
                this._sortableDataService.sortableContainer = this._sortableContainer;
                this._sortableDataService.index = this.index;
                this.detectChanges();
            }
        }
    }
    _onDropCallback(event) {
        if (this._sortableDataService.isDragged) {
            // console.log('onDropCallback.onDropSuccessCallback.dragData', this._dragDropService.dragData);
            this.onDropSuccessCallback.emit(this._dragDropService.dragData);
            if (this._dragDropService.onDragSuccessCallback) {
                // console.log('onDropCallback.onDragSuccessCallback.dragData', this._dragDropService.dragData);
                this._dragDropService.onDragSuccessCallback.emit(this._dragDropService.dragData);
            }
            // Refresh changes in properties of container component
            this._sortableContainer.detectChanges();
        }
    }
}
SortableComponent.decorators = [
    { type: Directive, args: [{ selector: '[dnd-sortable]' },] }
];
SortableComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: DragDropService },
    { type: DragDropConfig },
    { type: SortableContainer },
    { type: DragDropSortableService },
    { type: ChangeDetectorRef }
];
SortableComponent.propDecorators = {
    index: [{ type: Input, args: ['sortableIndex',] }],
    draggable: [{ type: Input, args: ["dragEnabled",] }],
    droppable: [{ type: Input, args: ["dropEnabled",] }],
    dragData: [{ type: Input }],
    effectallowed: [{ type: Input, args: ["effectAllowed",] }],
    effectcursor: [{ type: Input, args: ["effectCursor",] }],
    onDragSuccessCallback: [{ type: Output, args: ["onDragSuccess",] }],
    onDragStartCallback: [{ type: Output, args: ["onDragStart",] }],
    onDragOverCallback: [{ type: Output, args: ["onDragOver",] }],
    onDragEndCallback: [{ type: Output, args: ["onDragEnd",] }],
    onDropSuccessCallback: [{ type: Output, args: ["onDropSuccess",] }]
};
export class SortableHandleComponent extends AbstractHandleComponent {
    constructor(elemRef, dragDropService, config, _Component, cdr) {
        super(elemRef, dragDropService, config, _Component, cdr);
    }
}
SortableHandleComponent.decorators = [
    { type: Directive, args: [{ selector: '[dnd-sortable-handle]' },] }
];
SortableHandleComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: DragDropService },
    { type: DragDropConfig },
    { type: SortableComponent },
    { type: ChangeDetectorRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NvcnRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQ0FBK0M7QUFDL0MsK0RBQStEO0FBQy9ELG9DQUFvQztBQUVwQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakYsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXpDLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSx1QkFBdUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hGLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDNUMsT0FBTyxFQUFDLGVBQWUsRUFBRSx1QkFBdUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUd2RSxNQUFNLE9BQU8saUJBQWtCLFNBQVEsaUJBQWlCO0lBNEJwRCxZQUFZLE9BQW1CLEVBQUUsZUFBZ0MsRUFBRSxNQUFxQixFQUFFLEdBQXFCLEVBQ25HLG9CQUE2QztRQUVyRCxLQUFLLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFGckMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF5QjtRQXZCakQsa0JBQWEsR0FBeUIsRUFBRSxDQUFDO1FBMEI3QyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBL0JELElBQTBCLFNBQVMsQ0FBQyxLQUFhO1FBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBS0QsSUFBYSxZQUFZLENBQUMsWUFBa0M7UUFDeEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENB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VUFBVTtZQUtsRCxlQUFlO1lBRGYsY0FBYztZQThKYyxpQkFBaUI7WUE3SjVCLHVCQUF1QjtZQU54QyxpQkFBaUI7OztvQkEwSHBCLEtBQUssU0FBQyxlQUFlO3dCQUVyQixLQUFLLFNBQUMsYUFBYTt3QkFJbkIsS0FBSyxTQUFDLGFBQWE7dUJBT25CLEtBQUs7NEJBS0wsS0FBSyxTQUFDLGVBQWU7MkJBT3JCLEtBQUssU0FBQyxjQUFjO29DQVFwQixNQUFNLFNBQUMsZUFBZTtrQ0FFdEIsTUFBTSxTQUFDLGFBQWE7aUNBQ3BCLE1BQU0sU0FBQyxZQUFZO2dDQUNuQixNQUFNLFNBQUMsV0FBVztvQ0FDbEIsTUFBTSxTQUFDLGVBQWU7O0FBMEYzQixNQUFNLE9BQU8sdUJBQXdCLFNBQVEsdUJBQXVCO0lBQ2hFLFlBQVksT0FBbUIsRUFBRSxlQUFnQyxFQUFFLE1BQXFCLEVBQUUsVUFBNkIsRUFDbkgsR0FBcUI7UUFFckIsS0FBSyxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7WUFOSixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUU7OztZQXhQQSxVQUFVO1lBS2xELGVBQWU7WUFEZixjQUFjO1lBc1BvRixpQkFBaUI7WUEzUG5ILGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoQykgMjAxNi0yMDIwIFNlcmdleSBBa29wa29raHlhbnRzXHJcbi8vIFRoaXMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1JVCBsaWNlbnNlLlxyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vYWtzZXJnL25nMi1kbmRcclxuXHJcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0RpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBFbGVtZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtGb3JtQXJyYXl9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7QWJzdHJhY3RDb21wb25lbnQsIEFic3RyYWN0SGFuZGxlQ29tcG9uZW50fSBmcm9tICcuL2Fic3RyYWN0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7RHJhZ0Ryb3BDb25maWd9IGZyb20gJy4vZG5kLmNvbmZpZyc7XHJcbmltcG9ydCB7RHJhZ0Ryb3BTZXJ2aWNlLCBEcmFnRHJvcFNvcnRhYmxlU2VydmljZX0gZnJvbSAnLi9kbmQuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbZG5kLXNvcnRhYmxlLWNvbnRhaW5lcl0nIH0pXHJcbmV4cG9ydCBjbGFzcyBTb3J0YWJsZUNvbnRhaW5lciBleHRlbmRzIEFic3RyYWN0Q29tcG9uZW50IHtcclxuXHJcbiAgICBASW5wdXQoXCJkcmFnRW5hYmxlZFwiKSBzZXQgZHJhZ2dhYmxlKHZhbHVlOmJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmRyYWdFbmFibGVkID0gISF2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9zb3J0YWJsZURhdGE6IEFycmF5PGFueT58Rm9ybUFycmF5ID0gW107XHJcbiAgICBwcml2YXRlIHNvcnRhYmxlSGFuZGxlcjogU29ydGFibGVGb3JtQXJyYXlIYW5kbGVyfFNvcnRhYmxlQXJyYXlIYW5kbGVyO1xyXG5cclxuICAgIEBJbnB1dCgpIHNldCBzb3J0YWJsZURhdGEoc29ydGFibGVEYXRhOiBBcnJheTxhbnk+fEZvcm1BcnJheSkge1xyXG4gICAgICAgIHRoaXMuX3NvcnRhYmxlRGF0YSA9IHNvcnRhYmxlRGF0YTtcclxuICAgICAgICBpZiAoc29ydGFibGVEYXRhIGluc3RhbmNlb2YgRm9ybUFycmF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGFibGVIYW5kbGVyID0gbmV3IFNvcnRhYmxlRm9ybUFycmF5SGFuZGxlcigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ydGFibGVIYW5kbGVyID0gbmV3IFNvcnRhYmxlQXJyYXlIYW5kbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgdGhpcy5kcm9wRW5hYmxlZCA9ICEhdGhpcy5fc29ydGFibGVEYXRhO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY29sbGVjdGlvbiBpcyBjaGFuZ2VkLCBkcm9wIGVuYWJsZWQ6IFwiICsgdGhpcy5kcm9wRW5hYmxlZCk7XHJcbiAgICB9XHJcbiAgICBnZXQgc29ydGFibGVEYXRhKCk6IEFycmF5PGFueT58Rm9ybUFycmF5IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc29ydGFibGVEYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dChcImRyb3Bab25lc1wiKSBzZXQgZHJvcHpvbmVzKHZhbHVlOkFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICB0aGlzLmRyb3Bab25lcyA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGVsZW1SZWY6IEVsZW1lbnRSZWYsIGRyYWdEcm9wU2VydmljZTogRHJhZ0Ryb3BTZXJ2aWNlLCBjb25maWc6RHJhZ0Ryb3BDb25maWcsIGNkcjpDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICBwcml2YXRlIF9zb3J0YWJsZURhdGFTZXJ2aWNlOiBEcmFnRHJvcFNvcnRhYmxlU2VydmljZSkge1xyXG5cclxuICAgICAgICBzdXBlcihlbGVtUmVmLCBkcmFnRHJvcFNlcnZpY2UsIGNvbmZpZywgY2RyKTtcclxuICAgICAgICB0aGlzLmRyYWdFbmFibGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgX29uRHJhZ0VudGVyQ2FsbGJhY2soZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NvcnRhYmxlRGF0YVNlcnZpY2UuaXNEcmFnZ2VkKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtOmFueSA9IHRoaXMuX3NvcnRhYmxlRGF0YVNlcnZpY2Uuc29ydGFibGVDb250YWluZXIuZ2V0SXRlbUF0KHRoaXMuX3NvcnRhYmxlRGF0YVNlcnZpY2UuaW5kZXgpO1xyXG4gICAgICAgICAgICAvLyBDaGVjayBkb2VzIGVsZW1lbnQgZXhpc3QgaW4gc29ydGFibGVEYXRhIG9mIHRoaXMgQ29udGFpbmVyXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmluZGV4T2YoaXRlbSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBMZXQncyBhZGQgaXRcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdDb250YWluZXIuX29uRHJhZ0VudGVyQ2FsbGJhY2suIGRyYWcgbm9kZSBbJyArIHRoaXMuX3NvcnRhYmxlRGF0YVNlcnZpY2UuaW5kZXgudG9TdHJpbmcoKSArICddIG92ZXIgcGFyZW50IG5vZGUnKTtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBpdGVtIGZyb20gcHJldmlvdXNlIGxpc3RcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NvcnRhYmxlRGF0YVNlcnZpY2Uuc29ydGFibGVDb250YWluZXIucmVtb3ZlSXRlbUF0KHRoaXMuX3NvcnRhYmxlRGF0YVNlcnZpY2UuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NvcnRhYmxlRGF0YVNlcnZpY2Uuc29ydGFibGVDb250YWluZXIuX3NvcnRhYmxlRGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3J0YWJsZURhdGFTZXJ2aWNlLnNvcnRhYmxlQ29udGFpbmVyLmRyb3BFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEFkZCBpdGVtIHRvIG5ldyBsaXN0XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc2VydEl0ZW1BdChpdGVtLCAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NvcnRhYmxlRGF0YVNlcnZpY2Uuc29ydGFibGVDb250YWluZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc29ydGFibGVEYXRhU2VydmljZS5pbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gUmVmcmVzaCBjaGFuZ2VzIGluIHByb3BlcnRpZXMgb2YgY29udGFpbmVyIGNvbXBvbmVudFxyXG4gICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbUF0KGluZGV4OiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvcnRhYmxlSGFuZGxlci5nZXRJdGVtQXQodGhpcy5fc29ydGFibGVEYXRhLCBpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5kZXhPZihpdGVtOiBhbnkpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvcnRhYmxlSGFuZGxlci5pbmRleE9mKHRoaXMuX3NvcnRhYmxlRGF0YSwgaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlSXRlbUF0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNvcnRhYmxlSGFuZGxlci5yZW1vdmVJdGVtQXQodGhpcy5fc29ydGFibGVEYXRhLCBpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5zZXJ0SXRlbUF0KGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc29ydGFibGVIYW5kbGVyLmluc2VydEl0ZW1BdCh0aGlzLl9zb3J0YWJsZURhdGEsIGl0ZW0sIGluZGV4KTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU29ydGFibGVBcnJheUhhbmRsZXIge1xyXG4gICAgZ2V0SXRlbUF0KHNvcnRhYmxlRGF0YTogYW55LCBpbmRleDogbnVtYmVyKTogYW55IHtcclxuICAgICAgICByZXR1cm4gc29ydGFibGVEYXRhW2luZGV4XTtcclxuICAgIH1cclxuXHJcbiAgICBpbmRleE9mKHNvcnRhYmxlRGF0YTogYW55LCBpdGVtOiBhbnkpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBzb3J0YWJsZURhdGEuaW5kZXhPZihpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVJdGVtQXQoc29ydGFibGVEYXRhOiBhbnksIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBzb3J0YWJsZURhdGEuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBpbnNlcnRJdGVtQXQoc29ydGFibGVEYXRhOiBhbnksIGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHNvcnRhYmxlRGF0YS5zcGxpY2UoaW5kZXgsIDAsIGl0ZW0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTb3J0YWJsZUZvcm1BcnJheUhhbmRsZXIge1xyXG4gICAgZ2V0SXRlbUF0KHNvcnRhYmxlRGF0YTogYW55LCBpbmRleDogbnVtYmVyKTogYW55IHtcclxuICAgICAgICByZXR1cm4gc29ydGFibGVEYXRhLmF0KGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBpbmRleE9mKHNvcnRhYmxlRGF0YTogYW55LCBpdGVtOiBhbnkpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBzb3J0YWJsZURhdGEuY29udHJvbHMuaW5kZXhPZihpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVJdGVtQXQoc29ydGFibGVEYXRhOiBhbnksIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICBzb3J0YWJsZURhdGEucmVtb3ZlQXQoaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluc2VydEl0ZW1BdChzb3J0YWJsZURhdGE6IGFueSwgaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgc29ydGFibGVEYXRhLmluc2VydChpbmRleCwgaXRlbSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tkbmQtc29ydGFibGVdJyB9KVxyXG5leHBvcnQgY2xhc3MgU29ydGFibGVDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdENvbXBvbmVudCB7XHJcblxyXG4gICAgQElucHV0KCdzb3J0YWJsZUluZGV4JykgaW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBASW5wdXQoXCJkcmFnRW5hYmxlZFwiKSBzZXQgZHJhZ2dhYmxlKHZhbHVlOmJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmRyYWdFbmFibGVkID0gISF2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoXCJkcm9wRW5hYmxlZFwiKSBzZXQgZHJvcHBhYmxlKHZhbHVlOmJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmRyb3BFbmFibGVkID0gISF2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBkYXRhIHRoYXQgaGFzIHRvIGJlIGRyYWdnZWQuIEl0IGNhbiBiZSBhbnkgSlMgb2JqZWN0XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIGRyYWdEYXRhOiBhbnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmFnIGFsbG93ZWQgZWZmZWN0XHJcbiAgICAgKi9cclxuICAgIEBJbnB1dChcImVmZmVjdEFsbG93ZWRcIikgc2V0IGVmZmVjdGFsbG93ZWQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuZWZmZWN0QWxsb3dlZCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJhZyBlZmZlY3QgY3Vyc29yXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dChcImVmZmVjdEN1cnNvclwiKSBzZXQgZWZmZWN0Y3Vyc29yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmVmZmVjdEN1cnNvciA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbGJhY2sgZnVuY3Rpb24gY2FsbGVkIHdoZW4gdGhlIGRyYWcgYWN0aW9uIGVuZHMgd2l0aCBhIHZhbGlkIGRyb3AgYWN0aW9uLlxyXG4gICAgICogSXQgaXMgYWN0aXZhdGVkIGFmdGVyIHRoZSBvbi1kcm9wLXN1Y2Nlc3MgY2FsbGJhY2tcclxuICAgICAqL1xyXG4gICAgQE91dHB1dChcIm9uRHJhZ1N1Y2Nlc3NcIikgb25EcmFnU3VjY2Vzc0NhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIEBPdXRwdXQoXCJvbkRyYWdTdGFydFwiKSBvbkRyYWdTdGFydENhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dChcIm9uRHJhZ092ZXJcIikgb25EcmFnT3ZlckNhbGxiYWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dChcIm9uRHJhZ0VuZFwiKSBvbkRyYWdFbmRDYWxsYmFjazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBPdXRwdXQoXCJvbkRyb3BTdWNjZXNzXCIpIG9uRHJvcFN1Y2Nlc3NDYWxsYmFjazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtUmVmOiBFbGVtZW50UmVmLCBkcmFnRHJvcFNlcnZpY2U6IERyYWdEcm9wU2VydmljZSwgY29uZmlnOkRyYWdEcm9wQ29uZmlnLFxyXG4gICAgICAgIHByaXZhdGUgX3NvcnRhYmxlQ29udGFpbmVyOiBTb3J0YWJsZUNvbnRhaW5lcixcclxuICAgICAgICBwcml2YXRlIF9zb3J0YWJsZURhdGFTZXJ2aWNlOiBEcmFnRHJvcFNvcnRhYmxlU2VydmljZSxcclxuICAgICAgICBjZHI6Q2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuICAgICAgICBzdXBlcihlbGVtUmVmLCBkcmFnRHJvcFNlcnZpY2UsIGNvbmZpZywgY2RyKTtcclxuICAgICAgICB0aGlzLmRyb3Bab25lcyA9IHRoaXMuX3NvcnRhYmxlQ29udGFpbmVyLmRyb3Bab25lcztcclxuICAgICAgICB0aGlzLmRyYWdFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmRyb3BFbmFibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBfb25EcmFnU3RhcnRDYWxsYmFjayhldmVudDogRXZlbnQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnX29uRHJhZ1N0YXJ0Q2FsbGJhY2suIGRyYWdnaW5nIGVsZW0gd2l0aCBpbmRleCAnICsgdGhpcy5pbmRleCk7XHJcbiAgICAgICAgdGhpcy5fc29ydGFibGVEYXRhU2VydmljZS5pc0RyYWdnZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3NvcnRhYmxlRGF0YVNlcnZpY2Uuc29ydGFibGVDb250YWluZXIgPSB0aGlzLl9zb3J0YWJsZUNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLl9zb3J0YWJsZURhdGFTZXJ2aWNlLmluZGV4ID0gdGhpcy5pbmRleDtcclxuICAgICAgICB0aGlzLl9zb3J0YWJsZURhdGFTZXJ2aWNlLm1hcmtTb3J0YWJsZSh0aGlzLl9lbGVtKTtcclxuICAgICAgICAvLyBBZGQgZHJhZ0RhdGFcclxuICAgICAgICB0aGlzLl9kcmFnRHJvcFNlcnZpY2UuaXNEcmFnZ2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9kcmFnRHJvcFNlcnZpY2UuZHJhZ0RhdGEgPSB0aGlzLmRyYWdEYXRhO1xyXG4gICAgICAgIHRoaXMuX2RyYWdEcm9wU2VydmljZS5vbkRyYWdTdWNjZXNzQ2FsbGJhY2sgPSB0aGlzLm9uRHJhZ1N1Y2Nlc3NDYWxsYmFjaztcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMub25EcmFnU3RhcnRDYWxsYmFjay5lbWl0KHRoaXMuX2RyYWdEcm9wU2VydmljZS5kcmFnRGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgX29uRHJhZ092ZXJDYWxsYmFjayhldmVudDogRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5fc29ydGFibGVEYXRhU2VydmljZS5pc0RyYWdnZWQgJiYgdGhpcy5fZWxlbSAhPT0gdGhpcy5fc29ydGFibGVEYXRhU2VydmljZS5lbGVtKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdfb25EcmFnT3ZlckNhbGxiYWNrLiBkcmFnZ2luZyBlbGVtIHdpdGggaW5kZXggJyArIHRoaXMuaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLl9zb3J0YWJsZURhdGFTZXJ2aWNlLnNvcnRhYmxlQ29udGFpbmVyID0gdGhpcy5fc29ydGFibGVDb250YWluZXI7XHJcbiAgICAgICAgICAgIHRoaXMuX3NvcnRhYmxlRGF0YVNlcnZpY2UuaW5kZXggPSB0aGlzLmluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLl9zb3J0YWJsZURhdGFTZXJ2aWNlLm1hcmtTb3J0YWJsZSh0aGlzLl9lbGVtKTtcclxuICAgICAgICAgICAgdGhpcy5vbkRyYWdPdmVyQ2FsbGJhY2suZW1pdCh0aGlzLl9kcmFnRHJvcFNlcnZpY2UuZHJhZ0RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfb25EcmFnRW5kQ2FsbGJhY2soZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ19vbkRyYWdFbmRDYWxsYmFjay4gZW5kIGRyYWdnaW5nIGVsZW0gd2l0aCBpbmRleCAnICsgdGhpcy5pbmRleCk7XHJcbiAgICAgICAgdGhpcy5fc29ydGFibGVEYXRhU2VydmljZS5pc0RyYWdnZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zb3J0YWJsZURhdGFTZXJ2aWNlLnNvcnRhYmxlQ29udGFpbmVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9zb3J0YWJsZURhdGFTZXJ2aWNlLmluZGV4ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9zb3J0YWJsZURhdGFTZXJ2aWNlLm1hcmtTb3J0YWJsZShudWxsKTtcclxuICAgICAgICAvLyBBZGQgZHJhZ0dhdGFcclxuICAgICAgICB0aGlzLl9kcmFnRHJvcFNlcnZpY2UuaXNEcmFnZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fZHJhZ0Ryb3BTZXJ2aWNlLmRyYWdEYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9kcmFnRHJvcFNlcnZpY2Uub25EcmFnU3VjY2Vzc0NhbGxiYWNrID0gbnVsbDtcclxuICAgICAgICAvL1xyXG4gICAgICAgIHRoaXMub25EcmFnRW5kQ2FsbGJhY2suZW1pdCh0aGlzLl9kcmFnRHJvcFNlcnZpY2UuZHJhZ0RhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIF9vbkRyYWdFbnRlckNhbGxiYWNrKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zb3J0YWJsZURhdGFTZXJ2aWNlLmlzRHJhZ2dlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zb3J0YWJsZURhdGFTZXJ2aWNlLm1hcmtTb3J0YWJsZSh0aGlzLl9lbGVtKTtcclxuICAgICAgICAgICAgaWYgKCh0aGlzLmluZGV4ICE9PSB0aGlzLl9zb3J0YWJsZURhdGFTZXJ2aWNlLmluZGV4KSB8fFxyXG4gICAgICAgICAgICAgICAgKHRoaXMuX3NvcnRhYmxlRGF0YVNlcnZpY2Uuc29ydGFibGVDb250YWluZXIuc29ydGFibGVEYXRhICE9PSB0aGlzLl9zb3J0YWJsZUNvbnRhaW5lci5zb3J0YWJsZURhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnQ29tcG9uZW50Ll9vbkRyYWdFbnRlckNhbGxiYWNrLiBkcmFnIG5vZGUgWycgKyB0aGlzLmluZGV4ICsgJ10gb3ZlciBub2RlIFsnICsgdGhpcy5fc29ydGFibGVEYXRhU2VydmljZS5pbmRleCArICddJyk7XHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgaXRlbVxyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW06YW55ID0gdGhpcy5fc29ydGFibGVEYXRhU2VydmljZS5zb3J0YWJsZUNvbnRhaW5lci5nZXRJdGVtQXQodGhpcy5fc29ydGFibGVEYXRhU2VydmljZS5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgaXRlbSBmcm9tIHByZXZpb3VzZSBsaXN0XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3J0YWJsZURhdGFTZXJ2aWNlLnNvcnRhYmxlQ29udGFpbmVyLnJlbW92ZUl0ZW1BdCh0aGlzLl9zb3J0YWJsZURhdGFTZXJ2aWNlLmluZGV4KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zb3J0YWJsZURhdGFTZXJ2aWNlLnNvcnRhYmxlQ29udGFpbmVyLnNvcnRhYmxlRGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3J0YWJsZURhdGFTZXJ2aWNlLnNvcnRhYmxlQ29udGFpbmVyLmRyb3BFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEFkZCBpdGVtIHRvIG5ldyBsaXN0XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3J0YWJsZUNvbnRhaW5lci5pbnNlcnRJdGVtQXQoaXRlbSwgdGhpcy5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc29ydGFibGVDb250YWluZXIuZHJvcEVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3J0YWJsZUNvbnRhaW5lci5kcm9wRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc29ydGFibGVEYXRhU2VydmljZS5zb3J0YWJsZUNvbnRhaW5lciA9IHRoaXMuX3NvcnRhYmxlQ29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc29ydGFibGVEYXRhU2VydmljZS5pbmRleCA9IHRoaXMuaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfb25Ecm9wQ2FsbGJhY2sgKGV2ZW50OiBFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zb3J0YWJsZURhdGFTZXJ2aWNlLmlzRHJhZ2dlZCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnb25Ecm9wQ2FsbGJhY2sub25Ecm9wU3VjY2Vzc0NhbGxiYWNrLmRyYWdEYXRhJywgdGhpcy5fZHJhZ0Ryb3BTZXJ2aWNlLmRyYWdEYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5vbkRyb3BTdWNjZXNzQ2FsbGJhY2suZW1pdCh0aGlzLl9kcmFnRHJvcFNlcnZpY2UuZHJhZ0RhdGEpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZHJhZ0Ryb3BTZXJ2aWNlLm9uRHJhZ1N1Y2Nlc3NDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ29uRHJvcENhbGxiYWNrLm9uRHJhZ1N1Y2Nlc3NDYWxsYmFjay5kcmFnRGF0YScsIHRoaXMuX2RyYWdEcm9wU2VydmljZS5kcmFnRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kcmFnRHJvcFNlcnZpY2Uub25EcmFnU3VjY2Vzc0NhbGxiYWNrLmVtaXQodGhpcy5fZHJhZ0Ryb3BTZXJ2aWNlLmRyYWdEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBSZWZyZXNoIGNoYW5nZXMgaW4gcHJvcGVydGllcyBvZiBjb250YWluZXIgY29tcG9uZW50XHJcbiAgICAgICAgICAgIHRoaXMuX3NvcnRhYmxlQ29udGFpbmVyLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tkbmQtc29ydGFibGUtaGFuZGxlXScgfSlcclxuZXhwb3J0IGNsYXNzIFNvcnRhYmxlSGFuZGxlQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RIYW5kbGVDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IoZWxlbVJlZjogRWxlbWVudFJlZiwgZHJhZ0Ryb3BTZXJ2aWNlOiBEcmFnRHJvcFNlcnZpY2UsIGNvbmZpZzpEcmFnRHJvcENvbmZpZywgX0NvbXBvbmVudDogU29ydGFibGVDb21wb25lbnQsXHJcbiAgICAgICAgY2RyOkNoYW5nZURldGVjdG9yUmVmKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKGVsZW1SZWYsIGRyYWdEcm9wU2VydmljZSwgY29uZmlnLCBfQ29tcG9uZW50LCBjZHIpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==