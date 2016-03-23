import {Component, Input, Output, EventEmitter, ElementRef} from 'angular2/core';

import {DraggableComponent} from '../src/dnd.draggable';
import {DroppableComponent} from '../src/dnd.droppable';
import {SortableContainer, SortableComponent} from '../src/dnd.sortable';

export function triggerEvent(elem:HTMLElement, eventName:string, eventType:string) {
    var event:Event = document.createEvent(eventType);
    event.initEvent(eventName, true, true);
    elem.dispatchEvent(event);
}

@Component({
  selector: 'container',
  template: `
<div id='dragIdOne' dnd-draggable [dropZones]="['zone-one']" (onDragSuccess)="dragOneSuccessCallback($event)"></div>
<div id='dragIdTwo' dnd-draggable [dropZones]="['zone-two']" (onDragSuccess)="dragTwoSuccessCallback($event)"></div>
<div id='dragIdOneTwo' dnd-draggable [dropZones]="['zone-one', 'zone-two']" (onDragSuccess)="dragOneTwoSuccessCallback($event)"></div>

<div id='dropIdOne' dnd-droppable [dropZones]="['zone-one']" (onDropSuccess)="dropOneSuccessCallback($event)"></div>
<div id='dropIdTwo' dnd-droppable [dropZones]="['zone-two']" (onDropSuccess)="dropTwoSuccessCallback($event)"></div>
<div id='dropIdOneTwo' dnd-droppable [dropZones]="['zone-one', 'zone-two']" (onDropSuccess)="dropOneTwoSuccessCallback($event)"></div>
`,
  directives: [DraggableComponent, DroppableComponent]
})
export class Container {
    @Output() dragOne:EventEmitter<any> = new EventEmitter<any>();
    @Output() dragTwo:EventEmitter<any> = new EventEmitter<any>();
    @Output() dragOneTwo:EventEmitter<any> = new EventEmitter<any>();

    @Output() dropOne:EventEmitter<any> = new EventEmitter<any>();
    @Output() dropTwo:EventEmitter<any> = new EventEmitter<any>();
    @Output() dropOneTwo:EventEmitter<any> = new EventEmitter<any>();

    private dragOneSuccessCallback($event:any) {
        this.dragOne.emit($event);
    }

    private dragTwoSuccessCallback($event:any) {
        this.dragOne.emit($event);
    }

    private dragOneTwoSuccessCallback($event:any) {
        this.dragOneTwo.emit($event);
    }

    private dropOneSuccessCallback($event:any) {
        this.dropOne.emit($event);
    }

    private dropTwoSuccessCallback($event:any) {
        this.dropTwo.emit($event);
    }

    private dropOneTwoSuccessCallback($event:any) {
        this.dropOneTwo.emit($event);
    }
}

@Component({
  selector: 'container2',
  template: `
<div id='dragId' dnd-draggable [dragEnabled]="dragEnabled" [dragData]="dragData" [dropZones]="['test1']" (onDragSuccess)="dragSuccessCallback()"></div>
<div id='dropId' dnd-droppable [dropZones]="['test1']" (onDropSuccess)="dropSuccessCallback(data)"></div>
`,
  directives: [DraggableComponent, DroppableComponent]
})
export class Container2 {
    @Input() dragEnabled:boolean = true;
    @Input() dragData:any = "Hello World at " + new Date().toString();

    @Output() drag:EventEmitter<any> = new EventEmitter<any>();
    @Output() drop:EventEmitter<any> = new EventEmitter<any>();

    private dragSuccessCallback($event:any) {
        this.drag.emit($event);
    }

    private dropSuccessCallback($event:any) {
        this.drop.emit($event);
    }
}

@Component({
  selector: 'container3',
  template: `
<div>
    <ul class="list-group" dnd-sortable-container [sortableData]="sortableList">
        <li *ngFor="#item of sortableList; #i = index" dnd-sortable [sortableIndex]="i">{{item}}</li>
    </ul>
</div>
`,
  directives: [SortableContainer, SortableComponent]
})
export class Container3 {
    @Input() sortableList:Array<string> = [];
}

@Component({
  selector: 'container4',
  template: `
<div>
    <div id='single'>
        <ul class="list-group" dnd-sortable-container [sortableData]="singleList">
            <li *ngFor="#item of singleList; #i = index" dnd-sortable [sortableIndex]="i">{{item}}</li>
        </ul>
    </div>
    <div id='multiOne' dnd-sortable-container [dropZones]="['multiList']" [sortableData]="multiOneList">
        <ul class="list-group" >
            <li *ngFor="#item of multiOneList; #i = index" dnd-sortable [sortableIndex]="i">{{item}}</li>
        </ul>
    </div>
    <div id='multiTwo' dnd-sortable-container [dropZones]="['multiList']" [sortableData]="multiTwoList">
        <ul class="list-group" >
            <li *ngFor="#item of multiTwoList; #i = index" dnd-sortable [sortableIndex]="i">{{item}}</li>
        </ul>
    </div>
</div>
`,
  directives: [SortableContainer, SortableComponent]
})
export class Container4 {
    @Input() singleList:Array<string> = [];
    @Input() multiOneList:Array<string> = [];
    @Input() multiTwoList:Array<string> = [];
}
