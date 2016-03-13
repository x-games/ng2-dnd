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

import {DraggableComponent} from '../src/dnd.draggable';
import {DragDropService} from '../src/dnd.service';

import {Container, triggerEvent} from './dnd.component.factory';

export function main() {
    describe('Drag and Drop', () => {

        let componentFixture: ComponentFixture;
        let dragdropService: DragDropService;
        
        beforeEachProviders(() => {
            return [TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS, DragDropService];
        });

        beforeEach(injectAsync([TestComponentBuilder, DragDropService], (tcb: TestComponentBuilder, dd: DragDropService) => {
            dragdropService = dd;
            return tcb.createAsync(Container).then((cf: ComponentFixture) => {
                componentFixture = cf;
                // componentFixture.componentInstance.draggableData = draggableData;
                componentFixture.detectChanges();
            });
        }));

        it('should be defined', () => {
            expect(componentFixture).toBeDefined();
            console.log(componentFixture.nativeElement);
        });
        
        it('Drop events should not be activated on the wrong drop-zone', (done:any) => {
           let dragElemOne:HTMLElement = componentFixture.nativeElement.querySelector('#dragIdOne'); 
           let dropElemTwo:HTMLElement = componentFixture.nativeElement.querySelector('#dropIdTwo');
           
           triggerEvent(dragElemOne, 'dragstart', 'MouseEvent');
           triggerEvent(dropElemTwo, 'dragenter', 'MouseEvent');
           componentFixture.detectChanges();
           expect(dropElemTwo).not.toHaveCssClass(dragdropService.onDragEnterClass);
           
           triggerEvent(dropElemTwo, 'dragover', 'MouseEvent');
           componentFixture.detectChanges();
           expect(dropElemTwo).not.toHaveCssClass(dragdropService.onDragOverClass);
           
           expect((<Container>componentFixture.componentInstance).dragOne.count).toBe(0);
        //    (<Container>componentFixture.componentInstance).
        //    triggerEvent(dragElemOne, 'drop', 'MouseEvent');
        //    expect(scope.context['dragOneSuccessCallback']).not.toHaveBeenCalled();
        //    expect(scope.context['dropTwoSuccessCallback']).not.toHaveBeenCalled();
           
           done();
        });
    });
}
