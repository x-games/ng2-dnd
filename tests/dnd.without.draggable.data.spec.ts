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

import {Container, triggerEvent} from './dnd.component.factory';

export function main() {
    describe('Drag and Drop without draggable data', () => {

        let componentFixture: ComponentFixture;
        let dragdropService: DragDropService;
        let config: DragDropConfig;
        let container:Container;

        beforeEachProviders(() => {
            return [TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS, DragDropConfig, DragDropService];
        });

        beforeEach(injectAsync([TestComponentBuilder, DragDropConfig, DragDropService], (tcb: TestComponentBuilder, c: DragDropConfig, dd: DragDropService) => {
            dragdropService = dd;
            config = c;
            return tcb.createAsync(Container).then((cf: ComponentFixture) => {
                componentFixture = cf;
                componentFixture.detectChanges();
                container = <Container>componentFixture.componentInstance;
            });
        }));

        it('should be defined', () => {
            expect(componentFixture).toBeDefined();
        });

        it('Drop events should not be activated on the wrong drop-zone', (done:any) => {
           let dragElemOne:HTMLElement = componentFixture.nativeElement.querySelector('#dragIdOne');
           let dropElemTwo:HTMLElement = componentFixture.nativeElement.querySelector('#dropIdTwo');

           triggerEvent(dragElemOne, 'dragstart', 'MouseEvent');
           triggerEvent(dropElemTwo, 'dragenter', 'MouseEvent');
           componentFixture.detectChanges();
           expect(dropElemTwo).not.toHaveCssClass(config.onDragEnterClass);

           triggerEvent(dropElemTwo, 'dragover', 'MouseEvent');
           componentFixture.detectChanges();
           expect(dropElemTwo).not.toHaveCssClass(config.onDragOverClass);

           let dragCount:number = 0, dropCount:number = 0;
           container.dragOne.subscribe(($event:any) => {
               dragCount++;
           }, (error:any) => {}, () => {
               // Here is a function called when stream is complete
               expect(dragCount).toBe(0);
           });

           container.dropTwo.subscribe(($event:any) => {
               dropCount++;
           }, (error:any) => {}, () => {
               // Here is a function called when stream is complete
               expect(dropCount).toBe(0);
           });
           triggerEvent(dropElemTwo, 'drop', 'MouseEvent');
           componentFixture.detectChanges();

           done();
        });

        it('Drop events should be activated on the same drop-zone', (done:any) => {
           let dragElemOne:HTMLElement = componentFixture.nativeElement.querySelector('#dragIdOne');
           let dropElemOne:HTMLElement = componentFixture.nativeElement.querySelector('#dropIdOne');

           triggerEvent(dragElemOne, 'dragstart', 'MouseEvent');
           triggerEvent(dropElemOne, 'dragenter', 'MouseEvent');
           componentFixture.detectChanges();
           expect(dropElemOne).toHaveCssClass(config.onDragEnterClass);

           triggerEvent(dropElemOne, 'dragover', 'MouseEvent');
           componentFixture.detectChanges();
           expect(dropElemOne).toHaveCssClass(config.onDragOverClass);

           let dragCount:number = 0, dropCount:number = 0;
           container.dragOne.subscribe(($event:any) => {
               dragCount++;
           }, (error:any) => {}, () => {
               // Here is a function called when stream is complete
               expect(dragCount).toBe(1);
           });

           container.dropOne.subscribe(($event:any) => {
               dropCount++;
           }, (error:any) => {}, () => {
               // Here is a function called when stream is complete
               expect(dropCount).toBe(1);
           });
           triggerEvent(dropElemOne, 'drop', 'MouseEvent');
           componentFixture.detectChanges();

           done();
        });

        it('Drop events on multiple drop-zone', (done:any) => {
           let dragElemOneTwo:HTMLElement = componentFixture.nativeElement.querySelector('#dragIdOneTwo');
           let dropElemOneTwo:HTMLElement = componentFixture.nativeElement.querySelector('#dropIdOneTwo');

           triggerEvent(dragElemOneTwo, 'dragstart', 'MouseEvent');
           triggerEvent(dropElemOneTwo, 'dragenter', 'MouseEvent');
           componentFixture.detectChanges();
           expect(dropElemOneTwo).toHaveCssClass(config.onDragEnterClass);

           triggerEvent(dropElemOneTwo, 'dragover', 'MouseEvent');
           componentFixture.detectChanges();
           expect(dropElemOneTwo).toHaveCssClass(config.onDragOverClass);

           let dragCount:number = 0, dropCount:number = 0;
           container.dragOne.subscribe(($event:any) => {
               dragCount++;
           }, (error:any) => {}, () => {
               // Here is a function called when stream is complete
               expect(dragCount).toBe(1);
           });

           container.dropOne.subscribe(($event:any) => {
               dropCount++;
           }, (error:any) => {}, () => {
               // Here is a function called when stream is complete
               expect(dropCount).toBe(1);
           });
           triggerEvent(dropElemOneTwo, 'drop', 'MouseEvent');
           componentFixture.detectChanges();

           done();
        });

    });
}
