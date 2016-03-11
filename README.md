Angular 2 Drag-and-Drop
=======================

Angular 2 Drag-and-Drop without dependencies.


## Installation
```bash
npm install ng2-dnd --save`
```

## Demo

To be aavailable soon...

## Usage

Using Webpack or Browserify:

```js
var Angular = require('angular');

var mod = Angular.module('yourModule', [
  require('angular-drag-drop'),
]);

// Now use `drag-container`, `drop-container` and `drop-target` in your templates
```

### `drag-container`

Define a DOM element that will become draggable and determines what the data associated with the drag event is.

**Example**

```html
<div drag-container="model"
  on-drag-start="ctl.handleDragStart($event, $dragData)"
  on-drag-end="ctl.handleDragEnd($event, $dragData)"
></div>
```

Attribute | Required? | Description
----------|-----------|------------
`drag-container` | No | Bind the data to be associated with dragging this element. When not specified the jqLite element on which the directive is placed will be used as the $dragData.

The following callbacks are optional.
Each can allow you to inject two special objects, `$event` and `$dragData`.
`$event` is the original browser event.
This can be helpful for setting the browser-level drag data using `$event.dataTransfer.setData('mime/type', data)`)
or for setting the drag image / drop effect like `$event.dataTransfer.dropEffect = 'copy'`.
`$dragData` is the data associated with dragging this element.
It is optionally set by providing a reference via the `drag-container` attribute.

* `on-drag-start`
* `on-drag-end`



### `drop-container`

Define a DOM element that will accept draggable elements that match pass an optional acceptance callback.

**Example**

```html
<div drop-container
  drop-accepts="ctl.checkDragData($dragData)"
  on-drag-enter="onDragStartEnter($event, $dragData)"
  on-drag-over="onDragOver($event, $dragData)"
  on-drag-leave="onDragLeave($event, $dragData)"
  on-drop="onDrop($event, $dragData)"
></div>
```

Attribute | Required? | Description
----------|-----------|------------
`drop-accepts` | No | Define a call to check if the data being dragged is allowed

The following callbacks are optional.
Each can allow you to inject two special objects, `$event` and `$dragData`.
`$event` is the original browser event.
`$dragData` is the data associated with dragging this element.

* `on-drag-enter`
* `on-drag-over`
* `on-drag-leave`
* `on-drop`



### `drop-target`

Define a region of the parent `drop-container` that can independently accept drag and drop events in a logical region.

This module will only consider those logical regions that have `drop-targets` bound in determining which region
should receive events at any point in time. The algorithm to determine which logical region is active is based
on the proximity of the cursor to the virtual center-point of each logical region.

**Must be a child of a `drop-container`**

**Example**

```html
<div drop-target="top-right"
  on-drag-enter="onDragStartEnter($event, $dragData)"
  on-drag-over="onDragOver($event, $dragData)"
  on-drag-leave="onDragLeave($event, $dragData)"
  on-drop="onDrop($event, $dragData)"
></div>
```

Attribute | Required? | Description
----------|-----------|------------
`drop-target` | Yes | Defines the logical region of the parent `drop-container` that will accept events. Can be one of: `center`, `top`, `top-right`, `right`, `bottom-right`, `bottom`, `bottom-left`, `left`, `top-left`

The following callbacks are optional.
Each can allow you to inject two special objects, `$event` and `$dragData`.
`$event` is the original browser event.
`$dragData` is the data associated with dragging this element.

* `on-drag-enter`
* `on-drag-over`
* `on-drag-leave`
* `on-drop`

# License
 [MIT](/LICENSE)
