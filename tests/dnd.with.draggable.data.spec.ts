import {
    describe,
    expect,
    beforeEach,
    it,
    inject,
    injectAsync,
    beforeEachProviders,
    TestComponentBuilder,
    ComponentFixture,
    fakeAsync,
    tick
} from 'angular2/testing';

import {TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS}
from 'angular2/platform/testing/browser';

import {Observable} from 'rxjs/Observable';

import {DragDropConfig} from '../src/dnd.config';
import {DraggableComponent} from '../src/dnd.draggable';
import {DragDropService} from '../src/dnd.service';

import {Container2, triggerEvent} from './dnd.component.factory';

export function main() {
    describe('Drag and Drop without draggable data', () => {

        let componentFixture: ComponentFixture;
        let dragdropService: DragDropService;
        let config: DragDropConfig;
        let container:Container2;

        beforeEachProviders(() => {
            return [TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS, DragDropConfig, DragDropService];
        });

        beforeEach(injectAsync([TestComponentBuilder, DragDropConfig, DragDropService], (tcb: TestComponentBuilder, c: DragDropConfig, dd: DragDropService) => {
            dragdropService = dd;
            config = c;
            return tcb.createAsync(Container2).then((cf: ComponentFixture) => {
                componentFixture = cf;
                componentFixture.detectChanges();
                container = <Container2>componentFixture.componentInstance;
            });
        }));

        it('should be defined', () => {
            expect(componentFixture).toBeDefined();
        });

        it('It should add the "draggable" attribute', (done:any) => {
            let dragElem:HTMLElement = componentFixture.nativeElement.querySelector('#dragId');

            expect(dragElem).toBeDefined();
            expect(dragElem.attributes[<any>'draggable']).toBeTruthy();

            done();
        });

        it('Drag events should add/remove the draggable data to/from the DragDropService', (done:any) => {
            let dragElem:HTMLElement = componentFixture.nativeElement.querySelector('#dragId');

            expect(dragdropService.dragData).not.toBeDefined();

            triggerEvent(dragElem, 'dragstart', 'MouseEvent');
            componentFixture.detectChanges();
            expect(dragdropService.dragData).toBeDefined();

            triggerEvent(dragElem, 'dragend', 'MouseEvent');
            componentFixture.detectChanges();
            expect(dragdropService.dragData).toBeNull();

            done();
        });

        it('Drag events should add/remove the expected classes to the target element', (done:any) => {
            let dragElem:HTMLElement = componentFixture.nativeElement.querySelector('#dragId');

            expect(dragElem).not.toHaveCssClass(config.onDragStartClass);

            triggerEvent(dragElem, 'dragstart', 'MouseEvent');
            componentFixture.detectChanges();
            expect(dragElem).toHaveCssClass(config.onDragStartClass);

            triggerEvent(dragElem, 'dragend', 'MouseEvent');
            componentFixture.detectChanges();
            expect(dragElem).not.toHaveCssClass(config.onDragStartClass);

            done();
        });

        it('Drag start event should not be activated if drag is not enabled', (done:any) => {
            container.dragEnabled = false;
            componentFixture.detectChanges();

            let dragElem:HTMLElement = componentFixture.nativeElement.querySelector('#dragId');

            expect(dragdropService.dragData).not.toBeDefined();
            expect(dragElem).not.toHaveCssClass(config.onDragStartClass);

            triggerEvent(dragElem, 'dragstart', 'MouseEvent');
            componentFixture.detectChanges();
            expect(dragdropService.dragData).not.toBeDefined();
            expect(dragElem).not.toHaveCssClass(config.onDragStartClass);

            done();
        });

        it('Drop events should add/remove the expected classes to the target element', (done:any) => {
            let dragElem:HTMLElement = componentFixture.nativeElement.querySelector('#dragId');
            let dropElem:HTMLElement = componentFixture.nativeElement.querySelector('#dropId');

            expect(dropElem).not.toHaveCssClass(config.onDragEnterClass);
            expect(dropElem).not.toHaveCssClass(config.onDragOverClass);

             // The drop events should not work before a drag is started on an element with the correct drop-zone
            triggerEvent(dropElem, 'dragenter', 'MouseEvent');
            componentFixture.detectChanges();
            expect(dropElem).not.toHaveCssClass(config.onDragEnterClass);

            triggerEvent(dragElem, 'dragstart', 'MouseEvent');
            triggerEvent(dropElem, 'dragenter', 'MouseEvent');
            componentFixture.detectChanges();
            expect(dropElem).toHaveCssClass(config.onDragEnterClass);
            expect(dropElem).not.toHaveCssClass(config.onDragOverClass);

            triggerEvent(dropElem, 'dragover', 'MouseEvent');
            componentFixture.detectChanges();
            expect(dropElem).toHaveCssClass(config.onDragEnterClass);
            expect(dropElem).toHaveCssClass(config.onDragOverClass);

            triggerEvent(dropElem, 'dragleave', 'MouseEvent');
            componentFixture.detectChanges();
            expect(dropElem).not.toHaveCssClass(config.onDragEnterClass);
            expect(dropElem).not.toHaveCssClass(config.onDragOverClass);

            triggerEvent(dropElem, 'dragover', 'MouseEvent');
            triggerEvent(dropElem, 'dragenter', 'MouseEvent');
            triggerEvent(dropElem, 'drop', 'MouseEvent');
            componentFixture.detectChanges();
            expect(dropElem).not.toHaveCssClass(config.onDragEnterClass);
            expect(dropElem).not.toHaveCssClass(config.onDragOverClass);

            done();
        });

        it('Drop event should activate the onDropSuccess and onDragSuccess callbacks', (done:any) => {
            let dragElem:HTMLElement = componentFixture.nativeElement.querySelector('#dragId');
            let dropElem:HTMLElement = componentFixture.nativeElement.querySelector('#dropId');

            let dragCount:number = 0, dropCount:number = 0;
            container.drag.subscribe(($event:any) => {
               dragCount++;
            }, (error:any) => {}, () => {
               // Here is a function called when stream is complete
               expect(dragCount).toBe(0);
            });

            container.drop.subscribe(($event:any) => {
               dropCount++;
            }, (error:any) => {}, () => {
               // Here is a function called when stream is complete
               expect(dropCount).toBe(0);
            });

            triggerEvent(dragElem, 'dragstart', 'MouseEvent');
            triggerEvent(dragElem, 'dragend', 'MouseEvent');
            triggerEvent(dragElem, 'dragstart', 'MouseEvent');
            triggerEvent(dropElem, 'drop', 'MouseEvent');
            componentFixture.detectChanges();

            done();
        });

        it('The onDropSuccess callback should receive the dragged data as paramenter', (done:any) => {
            let dragData = {id: 1, name:'Hello'};

            container.dragData = dragData;
            componentFixture.detectChanges();

            let dragElem:HTMLElement = componentFixture.nativeElement.querySelector('#dragId');
            let dropElem:HTMLElement = componentFixture.nativeElement.querySelector('#dropId');

            container.drag.subscribe(($event:any) => {
               expect($event).toBe(dragData);
            });
            container.drop.subscribe(($event:any) => {
               expect($event).toBe(dragData);
            });

            triggerEvent(dragElem, 'dragstart', 'MouseEvent');
            triggerEvent(dropElem, 'drop', 'MouseEvent');
            componentFixture.detectChanges();

            done();
        });
    });
}