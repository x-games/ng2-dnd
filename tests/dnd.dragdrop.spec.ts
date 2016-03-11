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

import {DragDropDataService, DragDropConfigService} from '../src/dnd.draggable';

export function main() {
    describe('Drag and Drop', () => {

        let componentFixture:ComponentFixture;
        let ddDataService: DragDropDataService;
        let ddConfig: DragDropConfigService;

        beforeEachProviders(() => {
            return [TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS, DragDropDataService, DragDropConfigService];
        });

        //  beforeEach(injectAsync([TestComponentBuilder, DragDropDataService], (tcb:TestComponentBuilder, dd:DragDropDataService, dc: DragDropConfigService) => {
        //     return tcb.createAsync(Toast).then((cf:ComponentFixture) => {
        //         componentFixture = cf;
        //         componentFixture.componentInstance.toast = toast;
        //         componentFixture.detectChanges();
        //     });
        // }));

        it('should be defined', () => {
            //expect(true).not.
        });
    });
}
