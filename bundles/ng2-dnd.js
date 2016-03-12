System.registerDynamic("src/dnd.draggable", ["angular2/core", "./dnd.common"], true, function($__require, exports, module) {
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
  var core_2 = $__require('angular2/core');
  var dnd_common_1 = $__require('./dnd.common');
  var DraggableElementHandler = (function() {
    function DraggableElementHandler(draggableComponent) {
      this.draggableComponent = draggableComponent;
      this.defaultCursor = draggableComponent.elem.style.cursor;
    }
    DraggableElementHandler.prototype.refresh = function() {
      this.draggableComponent.elem.draggable = this.draggableComponent.dragEnabled;
      if (this.draggableComponent.config.dragCursor != null) {
        this.draggableComponent.elem.style.cursor = this.draggableComponent.dragEnabled ? this.draggableComponent.config.dragCursor : this.defaultCursor;
      }
    };
    DraggableElementHandler = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [DraggableComponent])], DraggableElementHandler);
    return DraggableElementHandler;
  })();
  exports.DraggableElementHandler = DraggableElementHandler;
  var DraggableComponent = (function() {
    function DraggableComponent(elemRef, ddZonesService, dragDropService, dragDropConfigService) {
      var _this = this;
      this.ddZonesService = ddZonesService;
      this.dragDropService = dragDropService;
      this._dragEnabled = false;
      this.onDragSuccessCallback = new core_2.EventEmitter();
      this._dropZoneNames = [Math.random().toString()];
      this.onDragStartCallback = function(event) {
        _this.dragDropService.draggableData = _this.draggableData;
        _this.dragDropService.onDragSuccessCallback = _this.onDragSuccessCallback;
        var dragTarget = event.target;
        dragTarget.classList.add(_this.config.onDragStartClass);
      };
      this.onDragEndCallback = function(event) {
        _this.dragDropService.draggableData = null;
        _this.dragDropService.onDragSuccessCallback = null;
        var dragTarget = event.target;
        dragTarget.classList.remove(_this.config.onDragStartClass);
      };
      this.elem = elemRef.nativeElement;
      this._draggableHandler = new DraggableElementHandler(this);
      this.dragdropConfig = dragDropConfigService.dragDropConfig;
      this.dragEnabled = true;
      this.config = dragDropConfigService.dragDropConfig;
      this.elem.ondragstart = function(event) {
        _this._onDragStart(event);
        if (event.dataTransfer != null) {
          event.dataTransfer.effectAllowed = _this.config.dragEffect.name;
          event.dataTransfer.setData('text/html', '');
          if (_this.config.dragImage != null) {
            var dragImage = _this.config.dragImage;
            event.dataTransfer.setDragImage(dragImage.imageElement, dragImage.x_offset, dragImage.y_offset);
          }
        }
      };
      this.elem.ondragend = function(event) {
        _this._onDragEnd(event);
      };
      this.elem.ontouchstart = function(event) {
        _this._onDragStart(event);
      };
      this.elem.ontouchend = function(event) {
        _this._onDragEnd(event);
      };
    }
    Object.defineProperty(DraggableComponent.prototype, "dragEnabled", {
      get: function() {
        return this._dragEnabled;
      },
      set: function(enabled) {
        this._dragEnabled = enabled;
        this._draggableHandler.refresh();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DraggableComponent.prototype, "config", {
      get: function() {
        return this._config;
      },
      set: function(config) {
        this._config = config;
        this._draggableHandler.refresh();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DraggableComponent.prototype, "dragdropConfig", {
      set: function(value) {
        this.config = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DraggableComponent.prototype, "dropZones", {
      set: function(value) {
        this.dropZoneNames = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DraggableComponent.prototype, "dropZoneNames", {
      get: function() {
        return this._dropZoneNames;
      },
      set: function(names) {
        this._dropZoneNames = names;
      },
      enumerable: true,
      configurable: true
    });
    DraggableComponent.prototype._onDragStart = function(event) {
      if (!this.dragEnabled) {
        return;
      }
      this.ddZonesService.allowedDropZones = this.dropZoneNames;
      this.onDragStartCallback(event);
    };
    DraggableComponent.prototype._onDragEnd = function(event) {
      this.ddZonesService.allowedDropZones = [];
      this.onDragEndCallback(event);
    };
    __decorate([core_2.Input(), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], DraggableComponent.prototype, "dragEnabled", null);
    __decorate([core_2.Input(), __metadata('design:type', Object)], DraggableComponent.prototype, "draggableData", void 0);
    __decorate([core_2.Input(), __metadata('design:type', dnd_common_1.DragDropConfig), __metadata('design:paramtypes', [dnd_common_1.DragDropConfig])], DraggableComponent.prototype, "dragdropConfig", null);
    __decorate([core_2.Output("onDragSuccess"), __metadata('design:type', core_2.EventEmitter)], DraggableComponent.prototype, "onDragSuccessCallback", void 0);
    __decorate([core_2.Input(), __metadata('design:type', Array), __metadata('design:paramtypes', [Array])], DraggableComponent.prototype, "dropZones", null);
    DraggableComponent = __decorate([core_2.Directive({selector: '[dnd-draggable]'}), __metadata('design:paramtypes', [core_2.ElementRef, dnd_common_1.DragDropZonesService, dnd_common_1.DragDropDataService, dnd_common_1.DragDropConfigService])], DraggableComponent);
    return DraggableComponent;
  })();
  exports.DraggableComponent = DraggableComponent;
  return module.exports;
});

System.registerDynamic("src/dnd.common", ["angular2/core"], true, function($__require, exports, module) {
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
  var DragDropZonesService = (function() {
    function DragDropZonesService() {
      this.allowedDropZones = [];
    }
    DragDropZonesService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], DragDropZonesService);
    return DragDropZonesService;
  })();
  exports.DragDropZonesService = DragDropZonesService;
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
  var DragDropConfig = (function() {
    function DragDropConfig() {
      this.dragEffect = DataTransferEffect.MOVE;
      this.dropEffect = DataTransferEffect.MOVE;
      this.dragCursor = "move";
      this.onDragStartClass = "ui-drag-start";
      this.onDragEnterClass = "ui-drag-enter";
      this.onDragOverClass = "ui-drag-over";
      this.onSortableDragClass = "ui-sortable-drag";
    }
    DragDropConfig = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], DragDropConfig);
    return DragDropConfig;
  })();
  exports.DragDropConfig = DragDropConfig;
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
  var DragDropDataService = (function() {
    function DragDropDataService() {}
    DragDropDataService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], DragDropDataService);
    return DragDropDataService;
  })();
  exports.DragDropDataService = DragDropDataService;
  var DragDropConfigService = (function() {
    function DragDropConfigService() {
      this.dragDropConfig = new DragDropConfig();
      this.sortableConfig = new DragDropConfig();
    }
    DragDropConfigService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], DragDropConfigService);
    return DragDropConfigService;
  })();
  exports.DragDropConfigService = DragDropConfigService;
  return module.exports;
});

System.registerDynamic("src/dnd.droppable", ["angular2/core", "./dnd.common"], true, function($__require, exports, module) {
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
  var dnd_common_1 = $__require('./dnd.common');
  var DroppableComponent = (function() {
    function DroppableComponent(elemRef, ddZonesService, dragDropService, dragDropConfigService) {
      var _this = this;
      this.ddZonesService = ddZonesService;
      this.dragDropService = dragDropService;
      this.dropEnabled = false;
      this.onDropSuccessCallback = new core_1.EventEmitter();
      this._dropZoneNames = [Math.random().toString()];
      this.onDragEnterCallback = function(event) {
        _this.elem.classList.add(_this.config.onDragEnterClass);
      };
      this.onDragLeaveCallback = function(event) {
        _this.elem.classList.remove(_this.config.onDragOverClass);
        _this.elem.classList.remove(_this.config.onDragEnterClass);
      };
      this.onDragOverCallback = function(event) {
        _this.elem.classList.add(_this.config.onDragOverClass);
      };
      this.onDropCallback = function(event) {
        if (_this.onDropSuccessCallback) {
          _this.onDropSuccessCallback.emit(_this.dragDropService.draggableData);
        }
        if (_this.dragDropService.onDragSuccessCallback) {
          _this.dragDropService.onDragSuccessCallback.emit(_this.dragDropService.draggableData);
        }
        _this.elem.classList.remove(_this.config.onDragOverClass);
        _this.elem.classList.remove(_this.config.onDragEnterClass);
      };
      this.elem = elemRef.nativeElement;
      this.dragdropConfig = dragDropConfigService.dragDropConfig;
      this.dropEnabled = true;
      this.config = dragDropConfigService.dragDropConfig;
      this.elem.ondragenter = function(event) {
        _this._onDragEnter(event);
      };
      this.elem.ondragover = function(event) {
        _this._onDragOver(event);
        if (event.dataTransfer != null) {
          event.dataTransfer.dropEffect = _this.config.dropEffect.name;
        }
      };
      this.elem.ondragleave = function(event) {
        _this._onDragLeave(event);
      };
      this.elem.ontouchstart = function(event) {
        _this._onDragEnter(event);
      };
      this.elem.ontouchend = function(event) {
        _this._onDragLeave(event);
      };
      this.elem.ondrop = function(event) {
        _this._onDrop(event);
      };
    }
    Object.defineProperty(DroppableComponent.prototype, "config", {
      get: function() {
        return this._config;
      },
      set: function(config) {
        this._config = config;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DroppableComponent.prototype, "dragdropConfig", {
      set: function(value) {
        this.config = value;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DroppableComponent.prototype, "dropZones", {
      set: function(dropZoneNames) {
        this.dropZoneNames = dropZoneNames;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DroppableComponent.prototype, "dropZoneNames", {
      get: function() {
        return this._dropZoneNames;
      },
      set: function(names) {
        this._dropZoneNames = names;
      },
      enumerable: true,
      configurable: true
    });
    DroppableComponent.prototype._onDragEnter = function(event) {
      if (this.isDropAllowed()) {
        event.preventDefault();
        this.onDragEnterCallback(event);
      }
    };
    DroppableComponent.prototype._onDragOver = function(event) {
      if (this.isDropAllowed()) {
        event.preventDefault();
        this.onDragOverCallback(event);
      }
    };
    DroppableComponent.prototype._onDragLeave = function(event) {
      if (this.isDropAllowed()) {
        event.preventDefault();
        this.onDragLeaveCallback(event);
      }
    };
    DroppableComponent.prototype._onDrop = function(event) {
      if (this.isDropAllowed()) {
        event.preventDefault();
        this.onDropCallback(event);
      }
    };
    DroppableComponent.prototype.isDropAllowed = function() {
      if (this.dropEnabled) {
        if (this.dropZoneNames.length === 0 && this.ddZonesService.allowedDropZones.length === 0) {
          return true;
        }
        for (var i = 0; i < this.ddZonesService.allowedDropZones.length; i++) {
          var dragZone = this.ddZonesService.allowedDropZones[i];
          if (this.dropZoneNames.indexOf(dragZone) !== -1) {
            return true;
          }
        }
      }
      return false;
    };
    __decorate([core_1.Output("onDropSuccess"), __metadata('design:type', core_1.EventEmitter)], DroppableComponent.prototype, "onDropSuccessCallback", void 0);
    __decorate([core_1.Input(), __metadata('design:type', dnd_common_1.DragDropConfig), __metadata('design:paramtypes', [dnd_common_1.DragDropConfig])], DroppableComponent.prototype, "dragdropConfig", null);
    __decorate([core_1.Input(), __metadata('design:type', Array), __metadata('design:paramtypes', [Array])], DroppableComponent.prototype, "dropZones", null);
    DroppableComponent = __decorate([core_1.Directive({selector: '[dnd-droppable]'}), __metadata('design:paramtypes', [core_1.ElementRef, dnd_common_1.DragDropZonesService, dnd_common_1.DragDropDataService, dnd_common_1.DragDropConfigService])], DroppableComponent);
    return DroppableComponent;
  })();
  exports.DroppableComponent = DroppableComponent;
  return module.exports;
});

System.registerDynamic("ng2-dnd", ["./src/dnd.common", "./src/dnd.draggable", "./src/dnd.droppable"], true, function($__require, exports, module) {
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
  var dnd_common_1 = $__require('./src/dnd.common');
  var dnd_draggable_1 = $__require('./src/dnd.draggable');
  var dnd_droppable_1 = $__require('./src/dnd.droppable');
  __export($__require('./src/dnd.common'));
  __export($__require('./src/dnd.draggable'));
  __export($__require('./src/dnd.droppable'));
  exports.DND_PROVIDERS = [dnd_common_1.DragDropZonesService, dnd_common_1.DragDropDataService, dnd_common_1.DragDropConfigService];
  exports.DND_DIRECTIVES = [dnd_draggable_1.DraggableComponent, dnd_droppable_1.DroppableComponent];
  return module.exports;
});
