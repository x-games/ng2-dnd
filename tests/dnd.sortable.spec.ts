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
import {SortableContainer, SortableComponent} from '../src/dnd.sortable';
import {DragDropService, DragDropSortableService} from '../src/dnd.service';

import {Container3, triggerEvent} from './dnd.component.factory';

export function main() {
    describe('Sortable Drag and Drop', () => {

        let componentFixture: ComponentFixture;
        let dragdropService: DragDropService;
        let config: DragDropConfig;
        let container:Container3;
        let sortableService:DragDropSortableService

        beforeEachProviders(() => {
            return [TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS, DragDropConfig, DragDropService, DragDropSortableService];
        });

        beforeEach(injectAsync([TestComponentBuilder, DragDropConfig, DragDropService, DragDropSortableService],
            (tcb: TestComponentBuilder, c: DragDropConfig, dd: DragDropService, ds: DragDropSortableService) => {
            dragdropService = dd;
            config = c;
            sortableService = ds;
            return tcb.createAsync(Container3).then((cf: ComponentFixture) => {
                componentFixture = cf;
                componentFixture.detectChanges();
                container = <Container3>componentFixture.componentInstance;
            });
        }));

        it('should be defined', () => {
            expect(componentFixture).toBeDefined();
        });

        it('The elements of the list should be draggable', () => {
            let sortableList:Array<string> = ['one', 'two', 'three', 'four', 'five', 'six'];

            container.sortableList = sortableList;
            componentFixture.detectChanges();

            let ulElem:HTMLElement = componentFixture.nativeElement.querySelector('ul');
            expect(ulElem).toBeDefined();
            expect(ulElem.children.length).toBe(sortableList.length);

            for (let i:number = 0; i < ulElem.children.length; i++) {
                let childElem:HTMLElement = <HTMLElement>ulElem.children[i];
                expect(childElem.attributes[<any>'draggable']).toBeTruthy();
            }
        });

        it('It should sort in the same list', () => {
            let sortableList:Array<string> = ['one','two','three','four'];

            container.sortableList = sortableList;
            componentFixture.detectChanges();

            let ulElem:HTMLElement = componentFixture.nativeElement.querySelector('ul');
            expect(ulElem).toBeDefined();
            expect(ulElem.children.length).toBe(sortableList.length);

            expect(sortableService.sortableData).not.toBeDefined();
            expect(sortableService.index).not.toBeDefined();
            triggerEvent(<HTMLElement>ulElem.children[0], 'dragstart', 'MouseEvent');
            expect(sortableService.sortableData).toBe(sortableList);
            expect(sortableService.index).toBe(0);

            // swap(ulElem.children, 0, 1);
            // expect(values[0]).toBe('two');
            // expect(ulElem.children[0].text).toEqual('two');
            // expect(values[1]).toBe('one');
            // expect(ulElem.children[1].text).toEqual('one');
        });
    });
}

function swap(nodes:Array<HTMLElement>, firstNodeId:number, secondNodeId:number) {
    swapMultiple(nodes, firstNodeId, nodes, secondNodeId);
}

function swapMultiple(nodesOne:Array<HTMLElement>, firstNodeId:number, nodesTwo:Array<HTMLElement>, secondNodeId:number) {
    triggerEvent(nodesOne[firstNodeId], 'dragstart', 'MouseEvent');
    triggerEvent(nodesTwo[secondNodeId], 'dragenter', 'MouseEvent');
}

