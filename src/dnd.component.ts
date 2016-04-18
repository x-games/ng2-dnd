// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable, ChangeDetectorRef} from 'angular2/core';
import {Directive, Input, Output, EventEmitter, ElementRef} from 'angular2/core';

import {DragDropConfig, DragImage} from './dnd.config';
import {DragDropService} from './dnd.service';
import {MobileService} from './dnd.mobile';

@Injectable()
export abstract class AbstractComponent {
    _elem: HTMLElement;
    _defaultCursor: string;

    /**
     * Whether the object is draggable. Default is true.
     */
    private _dragEnabled: boolean = false;
    set dragEnabled(enabled: boolean) {
        this._dragEnabled = !!enabled;
        //
        this._elem.draggable = this._dragEnabled;
        if (this._config.dragCursor != null) {
            this._elem.style.cursor = this._dragEnabled ? this._config.dragCursor : this._defaultCursor;
        }
    }
    get dragEnabled(): boolean {
        return this._dragEnabled
    }

    dropEnabled: boolean = false;

    /**
    * Array of Strings. It permits to specify the drop zones associated with this component.
    * By default, if the drop-zones attribute is not specified, the droppable component accepts
    * drop operations by all the draggable components that do not specify the allowed-drop-zones
    */
    dropZones: string[] = [];

    constructor(elemRef: ElementRef, public _dragDropService: DragDropService, public _config: DragDropConfig,
        private _cdr: ChangeDetectorRef, private mobileService: MobileService) {

        this._elem = elemRef.nativeElement;
        this.dragEnabled = true;
        //drop events
        this._elem.ondragenter = (event: Event) => {
            this._onDragEnter(event);
        };
        this._elem.ondragover = (event: DragEvent) => {
            this._onDragOver(event);
            //
            if (event.dataTransfer != null) {
                event.dataTransfer.dropEffect = this._config.dropEffect.name;
            }

            return false;
        };
        this._elem.ondragleave = (event: Event) => {
            this._onDragLeave(event);
        };
        this._elem.ondrop = (event: Event) => {
            this._onDrop(event);
        };

        //drag events
        this._elem.ondragstart = (event: DragEvent) => {
            // console.log('ondragstart', event.target);
            this._onDragStart(event);
            //
            if (event.dataTransfer != null) {
                event.dataTransfer.effectAllowed = this._config.dragEffect.name;
                event.dataTransfer.setData('text', '');

                if (this._config.dragImage != null) {
                    let dragImage: DragImage = this._config.dragImage;
                    (<any>event.dataTransfer).setDragImage(dragImage.imageElement, dragImage.x_offset, dragImage.y_offset);
                }
            }
        };
        this._elem.ondragend = (event: Event) => {
            // console.log('ondragend', event.target);
            this._onDragEnd(event);
        };
        
        // touch events
        this._elem.ontouchstart = (event: TouchEvent) => {
            this.mobileService.onTouchStart(event);
        };
        this._elem.ontouchend = (event: TouchEvent) => {
            this.mobileService.onTouchEnd(event);
        };
        this._elem.ontouchmove = (event: TouchEvent) => {
            this.mobileService.onTouchMove(event);
        };
        this._elem.ontouchcancel = (event: TouchEvent) => {
            this.mobileService.onTouchCancel(event);
        };
    }

    /******* Change detection ******/

    detectChanges() {
        // Programmatically run change detection to fix issue in Safari
        setTimeout(() => {
            this._cdr.detectChanges();
        }, 250);
    }

    //****** Droppable *******//
    private _onDragEnter(event: Event): void {
        // console.log('ondragenter._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed) {
            // event.preventDefault();
            this._onDragEnterCallback(event);
        }
    }

    private _onDragOver(event: Event) {
        // // console.log('ondragover._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed) {
            // The element is over the same source element - do nothing
            if (event.preventDefault) {
                // Necessary. Allows us to drop.
                event.preventDefault();
            }

            this._onDragOverCallback(event);
        }
    }

    private _onDragLeave(event: Event): void {
        // console.log('ondragleave._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed) {
            // event.preventDefault();
            this._onDragLeaveCallback(event);
        }
    }

    private _onDrop(event: Event): void {
        // console.log('ondrop._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed) {
            if (event.preventDefault) {
                // Necessary. Allows us to drop.
                event.preventDefault();
            }

            if (event.stopPropagation) {
                // Necessary. Allows us to drop.
                event.stopPropagation();
            }

            this._onDropCallback(event);

            this.detectChanges();
        }
    }

    private get _isDropAllowed(): boolean {
        if (this.dropEnabled) {
            if (this.dropZones.length === 0 && this._dragDropService.allowedDropZones.length === 0) {
                return true;
            }
            for (let i: number = 0; i < this._dragDropService.allowedDropZones.length; i++) {
                let dragZone: string = this._dragDropService.allowedDropZones[i];
                if (this.dropZones.indexOf(dragZone) !== -1) {
                    return true;
                }
            }
        }
        return false;
    }

    //*********** Draggable **********//

    private _onDragStart(event: Event): void {
        // console.log('ondragstart.dragEnabled', this._dragEnabled);
        if (this._dragEnabled) {
            this._dragDropService.allowedDropZones = this.dropZones;
            // console.log('ondragstart.allowedDropZones', this._dragDropService.allowedDropZones);
            this._onDragStartCallback(event);
        }
    }

    private _onDragEnd(event: Event): void {
        this._dragDropService.allowedDropZones = [];
        // console.log('ondragend.allowedDropZones', this._dragDropService.allowedDropZones);
        this._onDragEndCallback(event);
    }

    //**** Drop Callbacks ****//
    _onDragEnterCallback(event: Event) { }
    _onDragOverCallback(event: Event) { }
    _onDragLeaveCallback(event: Event) { }
    _onDropCallback(event: Event) { }

    //**** Drag Callbacks ****//
    _onDragStartCallback(event: Event) { }
    _onDragEndCallback(event: Event) { }
}
