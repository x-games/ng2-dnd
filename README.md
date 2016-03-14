Angular 2 Drag-and-Drop [![Build Status](https://travis-ci.org/akserg/ng2-dnd.svg?branch=master)](https://travis-ci.org/akserg/ng2-dnd) [![npm version](https://img.shields.io/npm/v/ng2-dnd.svg)](https://www.npmjs.com/package/ng2-dnd) [![npm monthly downloads](https://img.shields.io/npm/dm/ng2-dnd.svg?style=flat-square)](https://www.npmjs.com/package/ng2-dnd)[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
=======================

# ng2-dnd

Angular 2 Drag-and-Drop without dependencies.


## Installation
```bash
npm install ng2-dnd --save
```

## Demo

To be available soon...

## Usage

If you use SystemJS to load your files, you might have to update your config with this if you don't use `defaultJSExtensions: true`:
```js
System.config({
    packages: {
        "/ng2-dnd": {"defaultExtension": "js"}
    }
});
```

Finally, you can use *ng2-dnd* in your Angular 2 project:
- Import `DND_PROVIDERS, DND_DIRECTIVES` from `ng2-toasty/ng2-toasty`;
- Use `DND_PROVIDERS` in the bootstrap of your application;
- Add `DND_DIRECTIVES` to the `directives` property of your application component;
- Use `dnd-draggable` and `dnd-droppable` properties in template of your components.

```js
import {Component} from 'angular2/core';
import {DND_PROVIDERS, DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {bootstrap} from 'angular2/platform/browser';

bootstrap(AppComponent, [
    DND_PROVIDERS // It is required to have 1 unique instance of your service
]);

@Component({
    selector: 'app',
    directives: [DND_DIRECTIVES],
    template: `
<h4>Simple Drag-and-Drop</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-success">
            <div class="panel-heading">Available to drag</div>
            <div class="panel-body">
                <div class="panel panel-default" dnd-draggable [dragEnabled]="true">
                    <div class="panel-body">
                        <div>Drag Me</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable class="panel panel-info">
            <div class="panel-heading">Place to drop</div>
            <div class="panel-body">
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable class="panel panel-warning">
            <div class="panel-heading">Restricted to drop</div>
            <div class="panel-body">
            </div>
        </div>
    </div>
</div>
`
})
export class AppComponent {

    constructor() { }

}
```

Result of simple Drag-and-Drop operation:

![alt text](https://github.com/akserg/ng2-dnd/blob/master/img/dnd1.png "Simple Drag-and-Drop operation")


# Restriction Drag-and-Drop operations with drop zones
You can use property *dropZones* (actually an array) to specify in which place you would like to drop the draggable element:

```js
import {Component} from 'angular2/core';
import {DND_PROVIDERS, DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {bootstrap} from 'angular2/platform/browser';

bootstrap(AppComponent, [
    DND_PROVIDERS // It is required to have 1 unique instance of your service
]);

@Component({
    selector: 'app',
    directives: [DND_DIRECTIVES],
    template: `
<h4>Restricting Drag-and-Drop with zones</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-primary">
            <div class="panel-heading">Available to drag</div>
            <div class="panel-body">
                <div class="panel panel-default" dnd-draggable [dragEnabled]="true"
                    [dropZones]="['zone1']">
                    <div class="panel-body">
                        <div>Drag Me</div>
                        <div>Zone 1 only</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-success">
            <div class="panel-heading">Available to drag</div>
            <div class="panel-body">
                <div class="panel panel-default" dnd-draggable [dragEnabled]="true"
                    [dropZones]="['zone1', 'zone2']">
                    <div class="panel-body">
                        <div>Drag Me</div>
                        <div>Zone 1 & 2</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable class="panel panel-info" [dropZones]="['zone1']">
            <div class="panel-heading">Zone 1</div>
            <div class="panel-body">
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable class="panel panel-warning" [dropZones]="['zone2']">
            <div class="panel-heading">Zone 2</div>
            <div class="panel-body">
            </div>
        </div>
    </div>
</div>
`
})
export class AppComponent {

    constructor() { }

}
```

Result of restricted Drag-and-Drop operation:

![alt text](https://github.com/akserg/ng2-dnd/blob/master/img/dnd2.png "Restricted DnD operation")

# Transfer custom data via Drag-and-Drop
You can transfer data from draggable to droppable component via *dragData* property of Draggable component:

```js
import {Component} from 'angular2/core';
import {DND_PROVIDERS, DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {bootstrap} from 'angular2/platform/browser';

bootstrap(AppComponent, [
    DND_PROVIDERS // It is required to have 1 unique instance of your service
]);

@Component({
    selector: 'app',
    directives: [DND_DIRECTIVES],
    template: `
<h4>Transfer custom data in Drag-and-Drop</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-success">
            <div class="panel-heading">Available to drag</div>
            <div class="panel-body">
                <div class="panel panel-default" dnd-draggable [dragEnabled]="true"
                    [dragData]="transferData">
                    <div class="panel-body">
                        <div>Drag Me</div>
                        <div>{{transferData | json}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable class="panel panel-info"
            (onDropSuccess)="transferDataSuccess($event)">
            <div class="panel-heading">Place to drop (Items:{{receivedData.length}})</div>
            <div class="panel-body">
                <div [hidden]="!receivedData.length > 0"
                    *ngFor="#data of receivedData">{{data | json}}</div>
            </div>
        </div>
    </div>
</div>
`
})
export class AppComponent {

    transferData:Object = {id:1, msg: 'Hello'};
    receivedData:Array<any> = [];

    constructor() { }

    transferDataSuccess($event) {
        this.receivedData.push($event);
    }

}
```

Result of transfer cudtom data in Drag-and-Drop operation:

![alt text](https://github.com/akserg/ng2-dnd/blob/master/img/dnd3.png "Transfer cudtom data in Drag-and-Drop operation")

# Complex example (includes all shown above) with Drag-and-Drop
Here is an example of shopping backet with products adding via drag and drop operation:

```js
import {Component} from 'angular2/core';
import {DND_PROVIDERS, DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {bootstrap} from 'angular2/platform/browser';

bootstrap(AppComponent, [
    DND_PROVIDERS // It is required to have 1 unique instance of your service
]);

@Component({
    selector: 'app',
    directives: [DND_DIRECTIVES],
    template: `
<h4>Shopping basket</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-success">
            <div class="panel-heading">Available products</div>
            <div class="panel-body">
                <div *ngFor="#product of availableProducts" class="panel panel-default"
                    dnd-draggable [dragEnabled]="product.quantity>0" [dragData]="product"
                    (onDragSuccess)="orderedProduct($event)" [dropZones]="['demo1']">
                    <div class="panel-body">
                        <div [hidden]="product.quantity===0">{{product.name}} - \${{product.cost}}
                        <br>(available: {{product.quantity}})</div>
                        <div [hidden]="product.quantity>0"><del>{{product.name}}</del>
                        <br>(NOT available)</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable (onDropSuccess)="addToBasket($event)" [dropZones]="['demo1']"
            class="panel panel-info">
            <div class="panel-heading">Shopping Basket<br>(to pay: \${{totalCost()}})</div>
            <div class="panel-body">
                <div *ngFor="#product of shoppingBasket" class="panel panel-default">
                    <div class="panel-body">
                    {{product.name}}<br>(ordered: {{product.quantity}}
                        <br>cost: \${{product.cost * product.quantity}})
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
})
export class AppComponent {

    availableProducts: Array<Product> = [];
    shoppingBasket: Array<Product> = [];

    constructor() {
        this.availableProducts.push(new Product("Blue Shoes", 3, 35));
        this.availableProducts.push(new Product("Good Jacket", 1, 90));
        this.availableProducts.push(new Product("Red Shirt", 5, 12));
        this.availableProducts.push(new Product("Blue Jeans", 4, 60));
     }

    orderedProduct(orderedProduct: Product) {
        orderedProduct.quantity--;
    }

    addToBasket(newProduct: Product) {
        for (let indx in this.shoppingBasket) {
            let product:Product = this.shoppingBasket[indx];
            if (product.name === newProduct.name) {
                product.quantity++;
                return;
            }
        }
        this.shoppingBasket.push(new Product(newProduct.name, 1, newProduct.cost));
    }

    totalCost():number {
        let cost:number = 0;
        for (let indx in this.shoppingBasket) {
            let product:Product = this.shoppingBasket[indx];
            cost += (product.cost * product.quantity);
        }
        return cost;
    }

}
```

Result of complex example with Drag-and-Drop operation:

![alt text](https://github.com/akserg/ng2-dnd/blob/master/img/dnd4.png "Complex example with Drag-and-Drop operation")

# License
 [MIT](/LICENSE)
