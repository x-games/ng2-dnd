System.registerDynamic("src/dnd.draggable", ["angular2/core", "./dnd.service"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var dnd_service_1 = $__require('./dnd.service');
  var DraggableComponent = (function() {
    function DraggableComponent(elemRef, _dragDropService) {
      var _this = this;
      this.elemRef = elemRef;
      this._dragDropService = _dragDropService;
      this._dragEnabled = true;
      this.onDragSuccessCallback = new core_1.EventEmitter();
      this.dropZones = [];
      this._elem = elemRef.nativeElement;
      this._defaultCursor = this._elem.style.cursor;
      this._elem.ondragstart = function(event) {
        _this._onDragStart(event);
        if (event.dataTransfer != null) {
          event.dataTransfer.effectAllowed = _this._dragDropService.dragEffect.name;
          event.dataTransfer.setData('text/html', '');
          if (_this._dragDropService.dragImage != null) {
            var dragImage = _this._dragDropService.dragImage;
            event.dataTransfer.setDragImage(dragImage.imageElement, dragImage.x_offset, dragImage.y_offset);
          }
        }
      };
      this._elem.ondragend = function(event) {
        _this._onDragEnd(event);
      };
      this._elem.ontouchstart = function(event) {
        _this._onDragStart(event);
      };
      this._elem.ontouchend = function(event) {
        _this._onDragEnd(event);
      };
    }
    Object.defineProperty(DraggableComponent.prototype, "dragEnabled", {
      get: function() {
        return this._dragEnabled;
      },
      set: function(enabled) {
        this._dragEnabled = enabled;
        this._elem.draggable = this.dragEnabled;
        if (this._dragDropService.dragCursor != null) {
          this._elem.style.cursor = this.dragEnabled ? this._dragDropService.dragCursor : this._defaultCursor;
        }
      },
      enumerable: true,
      configurable: true
    });
    DraggableComponent.prototype._onDragStart = function(event) {
      if (this.dragEnabled) {
        this._dragDropService.allowedDropZones = this.dropZones;
        this._onDragStartCallback(event);
      }
    };
    DraggableComponent.prototype._onDragEnd = function(event) {
      this._dragDropService.allowedDropZones = [];
      this._onDragEndCallback(event);
    };
    DraggableComponent.prototype._onDragStartCallback = function(event) {
      this._dragDropService.draggableData = this.draggableData;
      this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
      var dragTarget = event.target;
      dragTarget.classList.add(this._dragDropService.onDragStartClass);
    };
    DraggableComponent.prototype._onDragEndCallback = function(event) {
      this._dragDropService.draggableData = null;
      this._dragDropService.onDragSuccessCallback = null;
      var dragTarget = event.target;
      dragTarget.classList.remove(this._dragDropService.onDragStartClass);
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], DraggableComponent.prototype, "dragEnabled", null);
    __decorate([core_1.Input(), __metadata('design:type', Object)], DraggableComponent.prototype, "draggableData", void 0);
    __decorate([core_1.Output("onDragSuccess"), __metadata('design:type', core_1.EventEmitter)], DraggableComponent.prototype, "onDragSuccessCallback", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Array)], DraggableComponent.prototype, "dropZones", void 0);
    DraggableComponent = __decorate([core_1.Directive({selector: '[dnd-draggable]'}), __metadata('design:paramtypes', [core_1.ElementRef, dnd_service_1.DragDropService])], DraggableComponent);
    return DraggableComponent;
  })();
  exports.DraggableComponent = DraggableComponent;
  return module.exports;
});

System.registerDynamic("src/dnd.service", ["angular2/core"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var DragImage = (function() {
    function DragImage(imageElement, x_offset, y_offset) {
      if (x_offset === void 0) {
        x_offset = 0;
      }
      if (y_offset === void 0) {
        y_offset = 0;
      }
      this.imageElement = imageElement;
      this.x_offset = x_offset;
      this.y_offset = y_offset;
    }
    DragImage = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [HTMLElement, Number, Number])], DragImage);
    return DragImage;
  })();
  exports.DragImage = DragImage;
  var DataTransferEffect = (function() {
    function DataTransferEffect(name) {
      this.name = name;
    }
    DataTransferEffect.COPY = new DataTransferEffect('copy');
    DataTransferEffect.LINK = new DataTransferEffect('link');
    DataTransferEffect.MOVE = new DataTransferEffect('move');
    DataTransferEffect.NONE = new DataTransferEffect('none');
    DataTransferEffect = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [String])], DataTransferEffect);
    return DataTransferEffect;
  })();
  exports.DataTransferEffect = DataTransferEffect;
  var DragDropService = (function() {
    function DragDropService() {
      this.dragEffect = DataTransferEffect.MOVE;
      this.dropEffect = DataTransferEffect.MOVE;
      this.dragCursor = "move";
      this.allowedDropZones = [];
      this.onDragStartClass = "dnd-drag-start";
      this.onDragEnterClass = "dnd-drag-enter";
      this.onDragOverClass = "dnd-drag-over";
    }
    DragDropService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], DragDropService);
    return DragDropService;
  })();
  exports.DragDropService = DragDropService;
  return module.exports;
});

System.registerDynamic("src/dnd.droppable", ["angular2/core", "./dnd.service"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('angular2/core');
  var dnd_service_1 = $__require('./dnd.service');
  var DroppableComponent = (function() {
    function DroppableComponent(elemRef, _dragDropService) {
      var _this = this;
      this.elemRef = elemRef;
      this._dragDropService = _dragDropService;
      this.dropEnabled = true;
      this.onDropSuccessCallback = new core_1.EventEmitter();
      this.dropZones = [];
      this._elem = elemRef.nativeElement;
      this._elem.ondragenter = function(event) {
        _this._onDragEnter(event);
      };
      this._elem.ondragover = function(event) {
        _this._onDragOver(event);
        if (event.dataTransfer != null) {
          event.dataTransfer.dropEffect = _this._dragDropService.dropEffect.name;
        }
      };
      this._elem.ondragleave = function(event) {
        _this._onDragLeave(event);
      };
      this._elem.ontouchstart = function(event) {
        _this._onDragEnter(event);
      };
      this._elem.ontouchend = function(event) {
        _this._onDragLeave(event);
      };
      this._elem.ondrop = function(event) {
        _this._onDrop(event);
      };
    }
    DroppableComponent.prototype._onDragEnter = function(event) {
      if (this._isDropAllowed()) {
        event.preventDefault();
        this._onDragEnterCallback(event);
      }
    };
    DroppableComponent.prototype._onDragOver = function(event) {
      if (this._isDropAllowed()) {
        event.preventDefault();
        this._onDragOverCallback(event);
      }
    };
    DroppableComponent.prototype._onDragLeave = function(event) {
      if (this._isDropAllowed()) {
        event.preventDefault();
        this._onDragLeaveCallback(event);
      }
    };
    DroppableComponent.prototype._onDrop = function(event) {
      if (this._isDropAllowed()) {
        event.preventDefault();
        this._onDropCallback(event);
      }
    };
    DroppableComponent.prototype._onDragEnterCallback = function(event) {
      this._elem.classList.add(this._dragDropService.onDragEnterClass);
    };
    DroppableComponent.prototype._onDragLeaveCallback = function(event) {
      this._elem.classList.remove(this._dragDropService.onDragOverClass);
      this._elem.classList.remove(this._dragDropService.onDragEnterClass);
    };
    ;
    DroppableComponent.prototype._onDragOverCallback = function(event) {
      this._elem.classList.add(this._dragDropService.onDragOverClass);
    };
    ;
    DroppableComponent.prototype._onDropCallback = function(event) {
      if (this.onDropSuccessCallback) {
        this.onDropSuccessCallback.emit(this._dragDropService.draggableData);
      }
      if (this._dragDropService.onDragSuccessCallback) {
        this._dragDropService.onDragSuccessCallback.emit(this._dragDropService.draggableData);
      }
      this._elem.classList.remove(this._dragDropService.onDragOverClass);
      this._elem.classList.remove(this._dragDropService.onDragEnterClass);
    };
    DroppableComponent.prototype._isDropAllowed = function() {
      if (this.dropEnabled) {
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
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], DroppableComponent.prototype, "dropEnabled", void 0);
    __decorate([core_1.Output("onDropSuccess"), __metadata('design:type', core_1.EventEmitter)], DroppableComponent.prototype, "onDropSuccessCallback", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Array)], DroppableComponent.prototype, "dropZones", void 0);
    DroppableComponent = __decorate([core_1.Directive({selector: '[dnd-droppable]'}), __metadata('design:paramtypes', [core_1.ElementRef, dnd_service_1.DragDropService])], DroppableComponent);
    return DroppableComponent;
  })();
  exports.DroppableComponent = DroppableComponent;
  return module.exports;
});

System.registerDynamic("ng2-dnd", ["./src/dnd.service", "./src/dnd.draggable", "./src/dnd.droppable"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var dnd_service_1 = $__require('./src/dnd.service');
  var dnd_draggable_1 = $__require('./src/dnd.draggable');
  var dnd_droppable_1 = $__require('./src/dnd.droppable');
  __export($__require('./src/dnd.service'));
  __export($__require('./src/dnd.draggable'));
  __export($__require('./src/dnd.droppable'));
  exports.DND_PROVIDERS = [dnd_service_1.DragDropService];
  exports.DND_DIRECTIVES = [dnd_draggable_1.DraggableComponent, dnd_droppable_1.DroppableComponent];
  return module.exports;
});
