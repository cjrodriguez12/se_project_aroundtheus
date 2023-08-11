export default class Section {
    constructor ({renderer, items}, selector){
        this._renderer=renderer;
        this._items=items;
        this._container=document.querySelector(selector);
    }
    renderItems(){
        // this._render to render the data into this._elements
        this._items.forEach((item) => {
            this.addItems(this._renderer(item));
        });
    }
    addItems(element){
        this._container.prepend(element);
    }
}
