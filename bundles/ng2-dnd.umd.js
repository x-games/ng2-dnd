(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('ng2-dnd', ['exports', '@angular/core', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ng2-dnd'] = {}, global.ng.core, global.ng.forms));
}(this, (function (exports, core, forms) { 'use strict';

    // Copyright (C) 2016-2020 Sergey Akopkokhyants
    // This project is licensed under the terms of the MIT license.
    // https://github.com/akserg/ng2-dnd
    /**
     * Check and return true if an object is type of string
     */
    function isString(obj) {
        return typeof obj === "string";
    }
    /**
     * Check and return true if an object not undefined or null
     */
    function isPresent(obj) {
        return obj !== undefined && obj !== null;
    }
    /**
     * Check and return true if an object is type of Function
     */
    function isFunction(obj) {
        return typeof obj === "function";
    }
    /**
     * Create Image element with specified url string
     */
    function createImage(src) {
        var img = new HTMLImageElement();
        img.src = src;
        return img;
    }
    /**
     * Call the function
     */
    function callFun(fun) {
        return fun();
    }

    // Copyright (C) 2016-2020 Sergey Akopkokhyants
    var DataTransferEffect = /** @class */ (function () {
        function DataTransferEffect(name) {
            this.name = name;
        }
        return DataTransferEffect;
    }());
    DataTransferEffect.COPY = new DataTransferEffect('copy');
    DataTransferEffect.LINK = new DataTransferEffect('link');
    DataTransferEffect.MOVE = new DataTransferEffect('move');
    DataTransferEffect.NONE = new DataTransferEffect('none');
    var DragImage = /** @class */ (function () {
        function DragImage(imageElement, x_offset, y_offset) {
            if (x_offset === void 0) { x_offset = 0; }
            if (y_offset === void 0) { y_offset = 0; }
            this.imageElement = imageElement;
            this.x_offset = x_offset;
            this.y_offset = y_offset;
            if (isString(this.imageElement)) {
                // Create real image from string source
                var imgScr = this.imageElement;
                this.imageElement = new HTMLImageElement();
                this.imageElement.src = imgScr;
            }
        }
        return DragImage;
    }());
    var DragDropConfig = /** @class */ (function () {
        function DragDropConfig() {
            this.onDragStartClass = "dnd-drag-start";
            this.onDragEnterClass = "dnd-drag-enter";
            this.onDragOverClass = "dnd-drag-over";
            this.onSortableDragClass = "dnd-sortable-drag";
            this.dragEffect = DataTransferEffect.MOVE;
            this.dropEffect = DataTransferEffect.MOVE;
            this.dragCursor = "move";
            this.defaultCursor = "pointer";
        }
        return DragDropConfig;
    }());

    // Copyright (C) 2016-2020 Sergey Akopkokhyants
    var DragDropData = /** @class */ (function () {
        function DragDropData() {
        }
        return DragDropData;
    }());
    function dragDropServiceFactory() {
        return new DragDropService();
    }
    var DragDropService = /** @class */ (function () {
        function DragDropService() {
            this.allowedDropZones = [];
        }
        return DragDropService;
    }());
    DragDropService.decorators = [
        { type: core.Injectable }
    ];
    function dragDropSortableServiceFactory(config) {
        return new DragDropSortableService(config);
    }
    var DragDropSortableService = /** @class */ (function () {
        function DragDropSortableService(_config) {
            this._config = _config;
        }
        Object.defineProperty(DragDropSortableService.prototype, "elem", {
            get: function () {
                return this._elem;
            },
            enumerable: false,
            configurable: true
        });
        DragDropSortableService.prototype.markSortable = function (elem) {
            if (isPresent(this._elem)) {
                this._elem.classList.remove(this._config.onSortableDragClass);
            }
            if (isPresent(elem)) {
                this._elem = elem;
                this._elem.classList.add(this._config.onSortableDragClass);
            }
        };
        return DragDropSortableService;
    }());
    DragDropSortableService.decorators = [
        { type: core.Injectable }
    ];
    DragDropSortableService.ctorParameters = function () { return [
        { type: DragDropConfig }
    ]; };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __createBinding(o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                exports[p] = m[p];
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    result[k] = mod[k];
        result.default = mod;
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    // Copyright (C) 2016-2020 Sergey Akopkokhyants
    var AbstractComponent = /** @class */ (function () {
        function AbstractComponent(elemRef, _dragDropService, _config, _cdr) {
            var _this = this;
            this.elemRef = elemRef;
            this._dragDropService = _dragDropService;
            this._config = _config;
            this._cdr = _cdr;
            /**
             * Whether the object is draggable. Default is true.
             */
            this._dragEnabled = false;
            /**
             * Allows drop on this element
             */
            this.dropEnabled = false;
            this.dropZones = [];
            this.cloneItem = false;
            // Assign default cursor unless overridden
            this._defaultCursor = _config.defaultCursor;
            this._elem = this.elemRef.nativeElement;
            this._elem.style.cursor = this._defaultCursor; // set default cursor on our element
            //
            // DROP events
            //
            this._elem.ondragenter = function (event) {
                _this._onDragEnter(event);
            };
            this._elem.ondragover = function (event) {
                _this._onDragOver(event);
                //
                if (event.dataTransfer != null) {
                    event.dataTransfer.dropEffect = _this._config.dropEffect.name;
                }
                return false;
            };
            this._elem.ondragleave = function (event) {
                _this._onDragLeave(event);
            };
            this._elem.ondrop = function (event) {
                _this._onDrop(event);
            };
            //
            // Drag events
            //
            this._elem.onmousedown = function (event) {
                _this._target = event.target;
            };
            this._elem.ondragstart = function (event) {
                if (_this._dragHandle) {
                    if (!_this._dragHandle.contains(_this._target)) {
                        event.preventDefault();
                        return;
                    }
                }
                _this._onDragStart(event);
                //
                if (event.dataTransfer != null) {
                    event.dataTransfer.setData('text', '');
                    // Change drag effect
                    event.dataTransfer.effectAllowed = _this.effectAllowed || _this._config.dragEffect.name;
                    // Change drag image
                    if (isPresent(_this.dragImage)) {
                        if (isString(_this.dragImage)) {
                            event.dataTransfer.setDragImage(createImage(_this.dragImage));
                        }
                        else if (isFunction(_this.dragImage)) {
                            event.dataTransfer.setDragImage(callFun(_this.dragImage));
                        }
                        else {
                            var img = _this.dragImage;
                            event.dataTransfer.setDragImage(img.imageElement, img.x_offset, img.y_offset);
                        }
                    }
                    else if (isPresent(_this._config.dragImage)) {
                        var dragImage = _this._config.dragImage;
                        event.dataTransfer.setDragImage(dragImage.imageElement, dragImage.x_offset, dragImage.y_offset);
                    }
                    else if (_this.cloneItem) {
                        _this._dragHelper = _this._elem.cloneNode(true);
                        _this._dragHelper.classList.add('dnd-drag-item');
                        _this._dragHelper.style.position = "absolute";
                        _this._dragHelper.style.top = "0px";
                        _this._dragHelper.style.left = "-1000px";
                        _this._elem.parentElement.appendChild(_this._dragHelper);
                        event.dataTransfer.setDragImage(_this._dragHelper, event.offsetX, event.offsetY);
                    }
                    // Change drag cursor
                    var cursorelem = (_this._dragHandle) ? _this._dragHandle : _this._elem;
                    if (_this._dragEnabled) {
                        cursorelem.style.cursor = _this.effectCursor ? _this.effectCursor : _this._config.dragCursor;
                    }
                    else {
                        cursorelem.style.cursor = _this._defaultCursor;
                    }
                }
            };
            this._elem.ondragend = function (event) {
                if (_this._elem.parentElement && _this._dragHelper) {
                    _this._elem.parentElement.removeChild(_this._dragHelper);
                }
                // console.log('ondragend', event.target);
                _this._onDragEnd(event);
                // Restore style of dragged element
                var cursorelem = (_this._dragHandle) ? _this._dragHandle : _this._elem;
                cursorelem.style.cursor = _this._defaultCursor;
            };
        }
        Object.defineProperty(AbstractComponent.prototype, "dragEnabled", {
            get: function () {
                return this._dragEnabled;
            },
            set: function (enabled) {
                this._dragEnabled = !!enabled;
                this._elem.draggable = this._dragEnabled;
            },
            enumerable: false,
            configurable: true
        });
        AbstractComponent.prototype.setDragHandle = function (elem) {
            this._dragHandle = elem;
        };
        /******* Change detection ******/
        AbstractComponent.prototype.detectChanges = function () {
            var _this = this;
            // Programmatically run change detection to fix issue in Safari
            setTimeout(function () {
                if (_this._cdr && !_this._cdr.destroyed) {
                    _this._cdr.detectChanges();
                }
            }, 250);
        };
        //****** Droppable *******//
        AbstractComponent.prototype._onDragEnter = function (event) {
            // console.log('ondragenter._isDropAllowed', this._isDropAllowed);
            if (this._isDropAllowed(event)) {
                // event.preventDefault();
                this._onDragEnterCallback(event);
            }
        };
        AbstractComponent.prototype._onDragOver = function (event) {
            // // console.log('ondragover._isDropAllowed', this._isDropAllowed);
            if (this._isDropAllowed(event)) {
                // The element is over the same source element - do nothing
                if (event.preventDefault) {
                    // Necessary. Allows us to drop.
                    event.preventDefault();
                }
                this._onDragOverCallback(event);
            }
        };
        AbstractComponent.prototype._onDragLeave = function (event) {
            // console.log('ondragleave._isDropAllowed', this._isDropAllowed);
            if (this._isDropAllowed(event)) {
                // event.preventDefault();
                this._onDragLeaveCallback(event);
            }
        };
        AbstractComponent.prototype._onDrop = function (event) {
            // console.log('ondrop._isDropAllowed', this._isDropAllowed);
            if (this._isDropAllowed(event)) {
                // Necessary. Allows us to drop.
                this._preventAndStop(event);
                this._onDropCallback(event);
                this.detectChanges();
            }
        };
        AbstractComponent.prototype._isDropAllowed = function (event) {
            if ((this._dragDropService.isDragged || (event.dataTransfer && event.dataTransfer.files)) && this.dropEnabled) {
                // First, if `allowDrop` is set, call it to determine whether the
                // dragged element can be dropped here.
                if (this.allowDrop) {
                    return this.allowDrop(this._dragDropService.dragData);
                }
                // Otherwise, use dropZones if they are set.
                if (this.dropZones.length === 0 && this._dragDropService.allowedDropZones.length === 0) {
                    return true;
                }
                for (var i = 0; i < this._dragDropService.allowedDropZones.length; i++) {
                    var dragZone = this._dragDropService.allowedDropZones[i];
                    if (this.dropZones.indexOf(dragZone) !== -1) {
                        return true;
                    }
                }
            }
            return false;
        };
        AbstractComponent.prototype._preventAndStop = function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (event.stopPropagation) {
                event.stopPropagation();
            }
        };
        //*********** Draggable **********//
        AbstractComponent.prototype._onDragStart = function (event) {
            //console.log('ondragstart.dragEnabled', this._dragEnabled);
            if (this._dragEnabled) {
                this._dragDropService.allowedDropZones = this.dropZones;
                // console.log('ondragstart.allowedDropZones', this._dragDropService.allowedDropZones);
                this._onDragStartCallback(event);
            }
        };
        AbstractComponent.prototype._onDragEnd = function (event) {
            this._dragDropService.allowedDropZones = [];
            // console.log('ondragend.allowedDropZones', this._dragDropService.allowedDropZones);
            this._onDragEndCallback(event);
        };
        //**** Drop Callbacks ****//
        AbstractComponent.prototype._onDragEnterCallback = function (event) { };
        AbstractComponent.prototype._onDragOverCallback = function (event) { };
        AbstractComponent.prototype._onDragLeaveCallback = function (event) { };
        AbstractComponent.prototype._onDropCallback = function (event) { };
        //**** Drag Callbacks ****//
        AbstractComponent.prototype._onDragStartCallback = function (event) { };
        AbstractComponent.prototype._onDragEndCallback = function (event) { };
        return AbstractComponent;
    }());
    AbstractComponent.decorators = [
        { type: core.Directive }
    ];
    AbstractComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: DragDropService },
        { type: DragDropConfig },
        { type: core.ChangeDetectorRef }
    ]; };
    var AbstractHandleComponent = /** @class */ (function () {
        function AbstractHandleComponent(elemRef, _dragDropService, _config, _Component, _cdr) {
            this.elemRef = elemRef;
            this._dragDropService = _dragDropService;
            this._config = _config;
            this._Component = _Component;
            this._cdr = _cdr;
            this._Component.setDragHandle(this.elemRef.nativeElement);
        }
        return AbstractHandleComponent;
    }());
    AbstractHandleComponent.decorators = [
        { type: core.Directive }
    ];
    AbstractHandleComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: DragDropService },
        { type: DragDropConfig },
        { type: AbstractComponent },
        { type: core.ChangeDetectorRef }
    ]; };

    var DraggableComponent = /** @class */ (function (_super) {
        __extends(DraggableComponent, _super);
        function DraggableComponent(elemRef, dragDropService, config, cdr) {
            var _this = _super.call(this, elemRef, dragDropService, config, cdr) || this;
            /**
             * Callback function called when the drag actions happened.
             */
            _this.onDragStart = new core.EventEmitter();
            _this.onDragEnd = new core.EventEmitter();
            /**
             * Callback function called when the drag action ends with a valid drop action.
             * It is activated after the on-drop-success callback
             */
            _this.onDragSuccessCallback = new core.EventEmitter();
            _this._defaultCursor = _this._elem.style.cursor;
            _this.dragEnabled = true;
            return _this;
        }
        Object.defineProperty(DraggableComponent.prototype, "draggable", {
            set: function (value) {
                this.dragEnabled = !!value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DraggableComponent.prototype, "dropzones", {
            set: function (value) {
                this.dropZones = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DraggableComponent.prototype, "effectallowed", {
            /**
             * Drag allowed effect
             */
            set: function (value) {
                this.effectAllowed = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DraggableComponent.prototype, "effectcursor", {
            /**
             * Drag effect cursor
             */
            set: function (value) {
                this.effectCursor = value;
            },
            enumerable: false,
            configurable: true
        });
        DraggableComponent.prototype._onDragStartCallback = function (event) {
            this._dragDropService.isDragged = true;
            this._dragDropService.dragData = this.dragData;
            this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
            this._elem.classList.add(this._config.onDragStartClass);
            //
            this.onDragStart.emit({ dragData: this.dragData, mouseEvent: event });
        };
        DraggableComponent.prototype._onDragEndCallback = function (event) {
            this._dragDropService.isDragged = false;
            this._dragDropService.dragData = null;
            this._dragDropService.onDragSuccessCallback = null;
            this._elem.classList.remove(this._config.onDragStartClass);
            //
            this.onDragEnd.emit({ dragData: this.dragData, mouseEvent: event });
        };
        return DraggableComponent;
    }(AbstractComponent));
    DraggableComponent.decorators = [
        { type: core.Directive, args: [{ selector: '[dnd-draggable]' },] }
    ];
    DraggableComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: DragDropService },
        { type: DragDropConfig },
        { type: core.ChangeDetectorRef }
    ]; };
    DraggableComponent.propDecorators = {
        draggable: [{ type: core.Input, args: ["dragEnabled",] }],
        onDragStart: [{ type: core.Output }],
        onDragEnd: [{ type: core.Output }],
        dragData: [{ type: core.Input }],
        onDragSuccessCallback: [{ type: core.Output, args: ["onDragSuccess",] }],
        dropzones: [{ type: core.Input, args: ["dropZones",] }],
        effectallowed: [{ type: core.Input, args: ["effectAllowed",] }],
        effectcursor: [{ type: core.Input, args: ["effectCursor",] }],
        dragImage: [{ type: core.Input }],
        cloneItem: [{ type: core.Input }]
    };
    var DraggableHandleComponent = /** @class */ (function (_super) {
        __extends(DraggableHandleComponent, _super);
        function DraggableHandleComponent(elemRef, dragDropService, config, _Component, cdr) {
            return _super.call(this, elemRef, dragDropService, config, _Component, cdr) || this;
        }
        return DraggableHandleComponent;
    }(AbstractHandleComponent));
    DraggableHandleComponent.decorators = [
        { type: core.Directive, args: [{ selector: '[dnd-draggable-handle]' },] }
    ];
    DraggableHandleComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: DragDropService },
        { type: DragDropConfig },
        { type: DraggableComponent },
        { type: core.ChangeDetectorRef }
    ]; };

    var DroppableComponent = /** @class */ (function (_super) {
        __extends(DroppableComponent, _super);
        function DroppableComponent(elemRef, dragDropService, config, cdr) {
            var _this = _super.call(this, elemRef, dragDropService, config, cdr) || this;
            /**
             * Callback function called when the drop action completes correctly.
             * It is activated before the on-drag-success callback.
             */
            _this.onDropSuccess = new core.EventEmitter();
            _this.onDragEnter = new core.EventEmitter();
            _this.onDragOver = new core.EventEmitter();
            _this.onDragLeave = new core.EventEmitter();
            _this.dropEnabled = true;
            return _this;
        }
        Object.defineProperty(DroppableComponent.prototype, "droppable", {
            set: function (value) {
                this.dropEnabled = !!value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DroppableComponent.prototype, "allowdrop", {
            set: function (value) {
                this.allowDrop = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DroppableComponent.prototype, "dropzones", {
            set: function (value) {
                this.dropZones = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DroppableComponent.prototype, "effectallowed", {
            /**
             * Drag allowed effect
             */
            set: function (value) {
                this.effectAllowed = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DroppableComponent.prototype, "effectcursor", {
            /**
             * Drag effect cursor
             */
            set: function (value) {
                this.effectCursor = value;
            },
            enumerable: false,
            configurable: true
        });
        DroppableComponent.prototype._onDragEnterCallback = function (event) {
            if (this._dragDropService.isDragged) {
                this._elem.classList.add(this._config.onDragEnterClass);
                this.onDragEnter.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
            }
        };
        DroppableComponent.prototype._onDragOverCallback = function (event) {
            if (this._dragDropService.isDragged) {
                this._elem.classList.add(this._config.onDragOverClass);
                this.onDragOver.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
            }
        };
        ;
        DroppableComponent.prototype._onDragLeaveCallback = function (event) {
            if (this._dragDropService.isDragged) {
                this._elem.classList.remove(this._config.onDragOverClass);
                this._elem.classList.remove(this._config.onDragEnterClass);
                this.onDragLeave.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
            }
        };
        ;
        DroppableComponent.prototype._onDropCallback = function (event) {
            var dataTransfer = event.dataTransfer;
            if (this._dragDropService.isDragged || (dataTransfer && dataTransfer.files)) {
                this.onDropSuccess.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
                if (this._dragDropService.onDragSuccessCallback) {
                    this._dragDropService.onDragSuccessCallback.emit({ dragData: this._dragDropService.dragData, mouseEvent: event });
                }
                this._elem.classList.remove(this._config.onDragOverClass);
                this._elem.classList.remove(this._config.onDragEnterClass);
            }
        };
        return DroppableComponent;
    }(AbstractComponent));
    DroppableComponent.decorators = [
        { type: core.Directive, args: [{ selector: '[dnd-droppable]' },] }
    ];
    DroppableComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: DragDropService },
        { type: DragDropConfig },
        { type: core.ChangeDetectorRef }
    ]; };
    DroppableComponent.propDecorators = {
        droppable: [{ type: core.Input, args: ["dropEnabled",] }],
        onDropSuccess: [{ type: core.Output }],
        onDragEnter: [{ type: core.Output }],
        onDragOver: [{ type: core.Output }],
        onDragLeave: [{ type: core.Output }],
        allowdrop: [{ type: core.Input, args: ["allowDrop",] }],
        dropzones: [{ type: core.Input, args: ["dropZones",] }],
        effectallowed: [{ type: core.Input, args: ["effectAllowed",] }],
        effectcursor: [{ type: core.Input, args: ["effectCursor",] }]
    };

    var SortableContainer = /** @class */ (function (_super) {
        __extends(SortableContainer, _super);
        function SortableContainer(elemRef, dragDropService, config, cdr, _sortableDataService) {
            var _this = _super.call(this, elemRef, dragDropService, config, cdr) || this;
            _this._sortableDataService = _sortableDataService;
            _this._sortableData = [];
            _this.dragEnabled = false;
            return _this;
        }
        Object.defineProperty(SortableContainer.prototype, "draggable", {
            set: function (value) {
                this.dragEnabled = !!value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SortableContainer.prototype, "sortableData", {
            get: function () {
                return this._sortableData;
            },
            set: function (sortableData) {
                this._sortableData = sortableData;
                if (sortableData instanceof forms.FormArray) {
                    this.sortableHandler = new SortableFormArrayHandler();
                }
                else {
                    this.sortableHandler = new SortableArrayHandler();
                }
                //
                this.dropEnabled = !!this._sortableData;
                // console.log("collection is changed, drop enabled: " + this.dropEnabled);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SortableContainer.prototype, "dropzones", {
            set: function (value) {
                this.dropZones = value;
            },
            enumerable: false,
            configurable: true
        });
        SortableContainer.prototype._onDragEnterCallback = function (event) {
            if (this._sortableDataService.isDragged) {
                var item = this._sortableDataService.sortableContainer.getItemAt(this._sortableDataService.index);
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
        };
        SortableContainer.prototype.getItemAt = function (index) {
            return this.sortableHandler.getItemAt(this._sortableData, index);
        };
        SortableContainer.prototype.indexOf = function (item) {
            return this.sortableHandler.indexOf(this._sortableData, item);
        };
        SortableContainer.prototype.removeItemAt = function (index) {
            this.sortableHandler.removeItemAt(this._sortableData, index);
        };
        SortableContainer.prototype.insertItemAt = function (item, index) {
            this.sortableHandler.insertItemAt(this._sortableData, item, index);
        };
        return SortableContainer;
    }(AbstractComponent));
    SortableContainer.decorators = [
        { type: core.Directive, args: [{ selector: '[dnd-sortable-container]' },] }
    ];
    SortableContainer.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: DragDropService },
        { type: DragDropConfig },
        { type: core.ChangeDetectorRef },
        { type: DragDropSortableService }
    ]; };
    SortableContainer.propDecorators = {
        draggable: [{ type: core.Input, args: ["dragEnabled",] }],
        sortableData: [{ type: core.Input }],
        dropzones: [{ type: core.Input, args: ["dropZones",] }]
    };
    var SortableArrayHandler = /** @class */ (function () {
        function SortableArrayHandler() {
        }
        SortableArrayHandler.prototype.getItemAt = function (sortableData, index) {
            return sortableData[index];
        };
        SortableArrayHandler.prototype.indexOf = function (sortableData, item) {
            return sortableData.indexOf(item);
        };
        SortableArrayHandler.prototype.removeItemAt = function (sortableData, index) {
            sortableData.splice(index, 1);
        };
        SortableArrayHandler.prototype.insertItemAt = function (sortableData, item, index) {
            sortableData.splice(index, 0, item);
        };
        return SortableArrayHandler;
    }());
    var SortableFormArrayHandler = /** @class */ (function () {
        function SortableFormArrayHandler() {
        }
        SortableFormArrayHandler.prototype.getItemAt = function (sortableData, index) {
            return sortableData.at(index);
        };
        SortableFormArrayHandler.prototype.indexOf = function (sortableData, item) {
            return sortableData.controls.indexOf(item);
        };
        SortableFormArrayHandler.prototype.removeItemAt = function (sortableData, index) {
            sortableData.removeAt(index);
        };
        SortableFormArrayHandler.prototype.insertItemAt = function (sortableData, item, index) {
            sortableData.insert(index, item);
        };
        return SortableFormArrayHandler;
    }());
    var SortableComponent = /** @class */ (function (_super) {
        __extends(SortableComponent, _super);
        function SortableComponent(elemRef, dragDropService, config, _sortableContainer, _sortableDataService, cdr) {
            var _this = _super.call(this, elemRef, dragDropService, config, cdr) || this;
            _this._sortableContainer = _sortableContainer;
            _this._sortableDataService = _sortableDataService;
            /**
             * Callback function called when the drag action ends with a valid drop action.
             * It is activated after the on-drop-success callback
             */
            _this.onDragSuccessCallback = new core.EventEmitter();
            _this.onDragStartCallback = new core.EventEmitter();
            _this.onDragOverCallback = new core.EventEmitter();
            _this.onDragEndCallback = new core.EventEmitter();
            _this.onDropSuccessCallback = new core.EventEmitter();
            _this.dropZones = _this._sortableContainer.dropZones;
            _this.dragEnabled = true;
            _this.dropEnabled = true;
            return _this;
        }
        Object.defineProperty(SortableComponent.prototype, "draggable", {
            set: function (value) {
                this.dragEnabled = !!value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SortableComponent.prototype, "droppable", {
            set: function (value) {
                this.dropEnabled = !!value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SortableComponent.prototype, "effectallowed", {
            /**
             * Drag allowed effect
             */
            set: function (value) {
                this.effectAllowed = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SortableComponent.prototype, "effectcursor", {
            /**
             * Drag effect cursor
             */
            set: function (value) {
                this.effectCursor = value;
            },
            enumerable: false,
            configurable: true
        });
        SortableComponent.prototype._onDragStartCallback = function (event) {
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
        };
        SortableComponent.prototype._onDragOverCallback = function (event) {
            if (this._sortableDataService.isDragged && this._elem !== this._sortableDataService.elem) {
                // console.log('_onDragOverCallback. dragging elem with index ' + this.index);
                this._sortableDataService.sortableContainer = this._sortableContainer;
                this._sortableDataService.index = this.index;
                this._sortableDataService.markSortable(this._elem);
                this.onDragOverCallback.emit(this._dragDropService.dragData);
            }
        };
        SortableComponent.prototype._onDragEndCallback = function (event) {
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
        };
        SortableComponent.prototype._onDragEnterCallback = function (event) {
            if (this._sortableDataService.isDragged) {
                this._sortableDataService.markSortable(this._elem);
                if ((this.index !== this._sortableDataService.index) ||
                    (this._sortableDataService.sortableContainer.sortableData !== this._sortableContainer.sortableData)) {
                    // console.log('Component._onDragEnterCallback. drag node [' + this.index + '] over node [' + this._sortableDataService.index + ']');
                    // Get item
                    var item = this._sortableDataService.sortableContainer.getItemAt(this._sortableDataService.index);
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
        };
        SortableComponent.prototype._onDropCallback = function (event) {
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
        };
        return SortableComponent;
    }(AbstractComponent));
    SortableComponent.decorators = [
        { type: core.Directive, args: [{ selector: '[dnd-sortable]' },] }
    ];
    SortableComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: DragDropService },
        { type: DragDropConfig },
        { type: SortableContainer },
        { type: DragDropSortableService },
        { type: core.ChangeDetectorRef }
    ]; };
    SortableComponent.propDecorators = {
        index: [{ type: core.Input, args: ['sortableIndex',] }],
        draggable: [{ type: core.Input, args: ["dragEnabled",] }],
        droppable: [{ type: core.Input, args: ["dropEnabled",] }],
        dragData: [{ type: core.Input }],
        effectallowed: [{ type: core.Input, args: ["effectAllowed",] }],
        effectcursor: [{ type: core.Input, args: ["effectCursor",] }],
        onDragSuccessCallback: [{ type: core.Output, args: ["onDragSuccess",] }],
        onDragStartCallback: [{ type: core.Output, args: ["onDragStart",] }],
        onDragOverCallback: [{ type: core.Output, args: ["onDragOver",] }],
        onDragEndCallback: [{ type: core.Output, args: ["onDragEnd",] }],
        onDropSuccessCallback: [{ type: core.Output, args: ["onDropSuccess",] }]
    };
    var SortableHandleComponent = /** @class */ (function (_super) {
        __extends(SortableHandleComponent, _super);
        function SortableHandleComponent(elemRef, dragDropService, config, _Component, cdr) {
            return _super.call(this, elemRef, dragDropService, config, _Component, cdr) || this;
        }
        return SortableHandleComponent;
    }(AbstractHandleComponent));
    SortableHandleComponent.decorators = [
        { type: core.Directive, args: [{ selector: '[dnd-sortable-handle]' },] }
    ];
    SortableHandleComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: DragDropService },
        { type: DragDropConfig },
        { type: SortableComponent },
        { type: core.ChangeDetectorRef }
    ]; };

    // Copyright (C) 2016-2020 Sergey Akopkokhyants
    var ɵ0 = dragDropServiceFactory, ɵ1 = dragDropSortableServiceFactory;
    var providers = [
        DragDropConfig,
        { provide: DragDropService, useFactory: ɵ0 },
        { provide: DragDropSortableService, useFactory: ɵ1, deps: [DragDropConfig] }
    ];
    var DndModule = /** @class */ (function () {
        function DndModule() {
        }
        DndModule.forRoot = function () {
            return {
                ngModule: DndModule,
                providers: providers
            };
        };
        return DndModule;
    }());
    DndModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [DraggableComponent, DraggableHandleComponent, DroppableComponent, SortableContainer, SortableComponent, SortableHandleComponent],
                    exports: [DraggableComponent, DraggableHandleComponent, DroppableComponent, SortableContainer, SortableComponent, SortableHandleComponent],
                },] }
    ];

    // Copyright (C) 2016-2020 Sergey Akopkokhyants

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AbstractComponent = AbstractComponent;
    exports.AbstractHandleComponent = AbstractHandleComponent;
    exports.DataTransferEffect = DataTransferEffect;
    exports.DndModule = DndModule;
    exports.DragDropConfig = DragDropConfig;
    exports.DragDropData = DragDropData;
    exports.DragDropService = DragDropService;
    exports.DragDropSortableService = DragDropSortableService;
    exports.DragImage = DragImage;
    exports.DraggableComponent = DraggableComponent;
    exports.DraggableHandleComponent = DraggableHandleComponent;
    exports.DroppableComponent = DroppableComponent;
    exports.SortableComponent = SortableComponent;
    exports.SortableContainer = SortableContainer;
    exports.SortableHandleComponent = SortableHandleComponent;
    exports.dragDropServiceFactory = dragDropServiceFactory;
    exports.dragDropSortableServiceFactory = dragDropSortableServiceFactory;
    exports.providers = providers;
    exports.ɵ0 = ɵ0;
    exports.ɵ1 = ɵ1;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng2-dnd.umd.js.map
