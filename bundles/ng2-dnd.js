System.registerDynamic("src/dnd.droppable", ["angular2/core", "./dnd.config", "./dnd.service"], true, function($__require, exports, module) {
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
  var dnd_config_1 = $__require('./dnd.config');
  var dnd_service_1 = $__require('./dnd.service');
  var DroppableComponent = (function() {
    function DroppableComponent(elemRef, _dragDropService, _config) {
      var _this = this;
      this.elemRef = elemRef;
      this._dragDropService = _dragDropService;
      this._config = _config;
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
      this._elem.classList.add(this._config.onDragEnterClass);
    };
    DroppableComponent.prototype._onDragLeaveCallback = function(event) {
      this._elem.classList.remove(this._config.onDragOverClass);
      this._elem.classList.remove(this._config.onDragEnterClass);
    };
    ;
    DroppableComponent.prototype._onDragOverCallback = function(event) {
      this._elem.classList.add(this._config.onDragOverClass);
    };
    ;
    DroppableComponent.prototype._onDropCallback = function(event) {
      if (this.onDropSuccessCallback) {
        this.onDropSuccessCallback.emit(this._dragDropService.dragData);
      }
      if (this._dragDropService.onDragSuccessCallback) {
        this._dragDropService.onDragSuccessCallback.emit(this._dragDropService.dragData);
      }
      this._elem.classList.remove(this._config.onDragOverClass);
      this._elem.classList.remove(this._config.onDragEnterClass);
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
    DroppableComponent = __decorate([core_1.Directive({selector: '[dnd-droppable]'}), __metadata('design:paramtypes', [core_1.ElementRef, dnd_service_1.DragDropService, dnd_config_1.DragDropConfig])], DroppableComponent);
    return DroppableComponent;
  })();
  exports.DroppableComponent = DroppableComponent;
  return module.exports;
});

System.registerDynamic("src/dnd.draggable", ["angular2/core", "./dnd.config", "./dnd.service"], true, function($__require, exports, module) {
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
  var dnd_config_1 = $__require('./dnd.config');
  var dnd_service_1 = $__require('./dnd.service');
  var DraggableComponent = (function() {
    function DraggableComponent(elemRef, _dragDropService, _config) {
      var _this = this;
      this._dragDropService = _dragDropService;
      this._config = _config;
      this.onDragSuccessCallback = new core_1.EventEmitter();
      this.dropZones = [];
      this._elem = elemRef.nativeElement;
      this._defaultCursor = this._elem.style.cursor;
      this.dragEnabled = true;
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
        this._dragEnabled = !!enabled;
        this._elem.draggable = this._dragEnabled;
        if (this._dragDropService.dragCursor != null) {
          this._elem.style.cursor = this._dragEnabled ? this._dragDropService.dragCursor : this._defaultCursor;
        }
      },
      enumerable: true,
      configurable: true
    });
    DraggableComponent.prototype._onDragStart = function(event) {
      if (this._dragEnabled) {
        this._dragDropService.allowedDropZones = this.dropZones;
        this._onDragStartCallback(event);
      }
    };
    DraggableComponent.prototype._onDragEnd = function(event) {
      this._dragDropService.allowedDropZones = [];
      this._onDragEndCallback(event);
    };
    DraggableComponent.prototype._onDragStartCallback = function(event) {
      this._dragDropService.dragData = this.dragData;
      this._dragDropService.onDragSuccessCallback = this.onDragSuccessCallback;
      this._elem.classList.add(this._config.onDragStartClass);
    };
    DraggableComponent.prototype._onDragEndCallback = function(event) {
      this._dragDropService.dragData = null;
      this._dragDropService.onDragSuccessCallback = null;
      this._elem.classList.remove(this._config.onDragStartClass);
    };
    __decorate([core_1.Input(), __metadata('design:type', Boolean), __metadata('design:paramtypes', [Boolean])], DraggableComponent.prototype, "dragEnabled", null);
    __decorate([core_1.Input(), __metadata('design:type', Object)], DraggableComponent.prototype, "dragData", void 0);
    __decorate([core_1.Output("onDragSuccess"), __metadata('design:type', core_1.EventEmitter)], DraggableComponent.prototype, "onDragSuccessCallback", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Array)], DraggableComponent.prototype, "dropZones", void 0);
    DraggableComponent = __decorate([core_1.Directive({selector: '[dnd-draggable]'}), __metadata('design:paramtypes', [core_1.ElementRef, dnd_service_1.DragDropService, dnd_config_1.DragDropConfig])], DraggableComponent);
    return DraggableComponent;
  })();
  exports.DraggableComponent = DraggableComponent;
  return module.exports;
});

System.registerDynamic("src/dnd.config", ["angular2/core"], true, function($__require, exports, module) {
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
  var DragDropConfig = (function() {
    function DragDropConfig() {
      this.onDragStartClass = "dnd-drag-start";
      this.onDragEnterClass = "dnd-drag-enter";
      this.onDragOverClass = "dnd-drag-over";
      this.onSortableDragClass = "dnd-sortable-drag";
    }
    DragDropConfig = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], DragDropConfig);
    return DragDropConfig;
  })();
  exports.DragDropConfig = DragDropConfig;
  return module.exports;
});

System.registerDynamic("src/dnd.service", ["angular2/core", "angular2/src/facade/lang", "./dnd.config"], true, function($__require, exports, module) {
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
  var lang_1 = $__require('angular2/src/facade/lang');
  var dnd_config_1 = $__require('./dnd.config');
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
    }
    DragDropService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], DragDropService);
    return DragDropService;
  })();
  exports.DragDropService = DragDropService;
  var DragDropSortableService = (function() {
    function DragDropSortableService(_config) {
      this._config = _config;
    }
    DragDropSortableService.prototype.element = function(elem) {
      if (lang_1.isPresent(this._elem)) {
        this._elem.classList.remove(this._config.onSortableDragClass);
      }
      if (lang_1.isPresent(elem)) {
        this._elem = elem;
        this._elem.classList.add(this._config.onSortableDragClass);
      }
    };
    DragDropSortableService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [dnd_config_1.DragDropConfig])], DragDropSortableService);
    return DragDropSortableService;
  })();
  exports.DragDropSortableService = DragDropSortableService;
  return module.exports;
});

System.registerDynamic("src/dnd.sortable", ["angular2/core", "./dnd.config", "./dnd.droppable", "./dnd.draggable", "./dnd.service"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
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
  var dnd_config_1 = $__require('./dnd.config');
  var dnd_droppable_1 = $__require('./dnd.droppable');
  var dnd_draggable_1 = $__require('./dnd.draggable');
  var dnd_service_1 = $__require('./dnd.service');
  var SortableContainer = (function(_super) {
    __extends(SortableContainer, _super);
    function SortableContainer(elemRef, _dragDropService, _config, _sortableDataService) {
      _super.call(this, elemRef, _dragDropService, _config);
      this._sortableDataService = _sortableDataService;
      this._sortableData = [];
      this.sortableZones = [];
    }
    Object.defineProperty(SortableContainer.prototype, "sortableData", {
      get: function() {
        return this._sortableData;
      },
      set: function(sortableData) {
        this._sortableData = sortableData;
        this.dropEnabled = this._sortableData.length == 0;
      },
      enumerable: true,
      configurable: true
    });
    SortableContainer.prototype._onDragEnterCallback = function(event) {
      this._sortableData.push(this._sortableDataService.sortableData.splice(this._sortableDataService.index, 1));
      this._sortableDataService.sortableData = this._sortableData;
      this._sortableDataService.index = 0;
    };
    __decorate([core_1.Input(), __metadata('design:type', Array), __metadata('design:paramtypes', [Array])], SortableContainer.prototype, "sortableData", null);
    __decorate([core_1.Input(), __metadata('design:type', Array)], SortableContainer.prototype, "sortableZones", void 0);
    SortableContainer = __decorate([core_1.Directive({selector: '[dnd-sortable-container]'}), __metadata('design:paramtypes', [core_1.ElementRef, dnd_service_1.DragDropService, dnd_config_1.DragDropConfig, dnd_service_1.DragDropSortableService])], SortableContainer);
    return SortableContainer;
  })(dnd_droppable_1.DroppableComponent);
  exports.SortableContainer = SortableContainer;
  var SortableComponent = (function(_super) {
    __extends(SortableComponent, _super);
    function SortableComponent(elemRef, _dragDropService, _config, _sortableContainer, _sortableDataService) {
      var _this = this;
      _super.call(this, elemRef, _dragDropService, _config);
      this._sortableContainer = _sortableContainer;
      this._sortableDataService = _sortableDataService;
      this.sortableZones = this._sortableContainer.sortableZones;
      this.dragEnabled = true;
      this.dropEnabled = true;
      this._elem.ondragenter = function(event) {
        _this._onDragEnter(event);
      };
      this._elem.ondragover = function(event) {
        _this._onDragOver(event);
        if (event.dataTransfer != null) {
          event.dataTransfer.dropEffect = _this._dragDropService.dropEffect.name;
        }
      };
    }
    SortableComponent.prototype._onDragEnter = function(event) {
      if (this._isDropAllowed()) {
        event.preventDefault();
        this._onDragEnterCallback(event);
      }
    };
    SortableComponent.prototype._onDragOver = function(event) {
      if (this._isDropAllowed()) {
        event.preventDefault();
        this._onDragOverCallback(event);
      }
    };
    SortableComponent.prototype._onDragStartCallback = function(event) {
      this._sortableDataService.sortableData = this._sortableContainer.sortableData;
      this._sortableDataService.index = this.index;
      this._sortableDataService.element(this._elem);
    };
    SortableComponent.prototype._onDragOverCallback = function(event) {
      if (this._elem != this._sortableDataService._elem) {
        this._sortableDataService.sortableData = this._sortableContainer.sortableData;
        this._sortableDataService.index = this.index;
        this._sortableDataService.element(this._elem);
      }
    };
    SortableComponent.prototype._onDragEndCallback = function(event) {
      this._sortableDataService.sortableData = null;
      this._sortableDataService.index = null;
      this._sortableDataService.element(null);
    };
    SortableComponent.prototype._onDragEnterCallback = function(event) {
      this._sortableDataService.element(this._elem);
      if ((this.index !== this._sortableDataService.index) || (this._sortableDataService.sortableData != this._sortableContainer.sortableData)) {
        this._sortableContainer.sortableData.splice(this.index, 0, this._sortableDataService.sortableData.splice(this._sortableDataService.index, 1));
        this._sortableDataService.sortableData = this._sortableContainer.sortableData;
        this._sortableDataService.index = this.index;
      }
    };
    SortableComponent.prototype._isDropAllowed = function() {
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
    __decorate([core_1.Input('sortableIndex'), __metadata('design:type', Number)], SortableComponent.prototype, "index", void 0);
    __decorate([core_1.Input(), __metadata('design:type', Boolean)], SortableComponent.prototype, "dropEnabled", void 0);
    SortableComponent = __decorate([core_1.Directive({selector: '[dnd-sortable]'}), __metadata('design:paramtypes', [core_1.ElementRef, dnd_service_1.DragDropService, dnd_config_1.DragDropConfig, SortableContainer, dnd_service_1.DragDropSortableService])], SortableComponent);
    return SortableComponent;
  })(dnd_draggable_1.DraggableComponent);
  exports.SortableComponent = SortableComponent;
  return module.exports;
});

System.registerDynamic("ng2-dnd", ["./src/dnd.config", "./src/dnd.service", "./src/dnd.draggable", "./src/dnd.droppable", "./src/dnd.sortable"], true, function($__require, exports, module) {
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
  var dnd_config_1 = $__require('./src/dnd.config');
  var dnd_service_1 = $__require('./src/dnd.service');
  var dnd_draggable_1 = $__require('./src/dnd.draggable');
  var dnd_droppable_1 = $__require('./src/dnd.droppable');
  var dnd_sortable_1 = $__require('./src/dnd.sortable');
  __export($__require('./src/dnd.config'));
  __export($__require('./src/dnd.service'));
  __export($__require('./src/dnd.draggable'));
  __export($__require('./src/dnd.droppable'));
  __export($__require('./src/dnd.sortable'));
  exports.DND_PROVIDERS = [dnd_config_1.DragDropConfig, dnd_service_1.DragDropService, dnd_service_1.DragDropSortableService];
  exports.DND_DIRECTIVES = [dnd_draggable_1.DraggableComponent, dnd_droppable_1.DroppableComponent, dnd_sortable_1.SortableContainer, dnd_sortable_1.SortableComponent];
  return module.exports;
});
