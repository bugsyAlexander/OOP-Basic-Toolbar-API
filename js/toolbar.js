 var oojs = (function (oojs) {

    var ToolbarItem = function (itemElement) {
        EventTarget.call(this);

        Object.defineProperty(this, "_el", {
            value: itemElement
        }); // objDefine
    }; // ToolbarItem

    ToolbarItem.prototype = Object.create(EventTarget.prototype, {
        toggleActiveState: {
            value : function () {
                this.activated = !this.activated;
            },
            enumerable : true
        }, // toggleActiveState

        enabled: {
            get: function () {
                return !this._el.classList.contains("disabled");
            }, // get
            set: function (value) {
                var currentValue = this.enabled; // get

                if (currentValue === value) {
                    return;
                } // if

                if (value) {
                    this._el.classList.remove("disabled");
                } else {
                    this._el.classList.add("disabled");
                } // if/else
                this.__fire({
                    type : "enabledchanged",
                    value : value
                }); // this
            } // set
        }, // enabled

        activated: {
            get: function () {
                return this._el.classList.contains("active");
            }, // get
            set: function (value) {
                var currentValue = this.activated; // get

                if (currentValue === value) {
                    return;
                } // if

                if (value) {
                    this._el.classList.add("active");
                } else {
                    this._el.classList.remove("active");
                } // if/else
                this.__fire({
                    type : "activatedchanged",
                    value : value
                }); // this
            } // set
        } // activated 

    }); // objDefineProperties

    var createToolbarItems = function (itemElements) {
        var items = [];

        [].forEach.call(itemElements, function (el, index, array) {
            var item = new ToolbarItem(el);

            items.push(item);
        }); // [].forEach

        return items;
    }; // createToolbar Items

    var Toolbar = function (toolbarElement) {
        EventTarget.call(this);

        var items = toolbarElement.querySelectorAll(".toolbar-item");

        Object.defineProperties(this, {
            _el: {
                value: toolbarElement
            }, // el
            items: {
                value: createToolbarItems(items),
                enumerable: true
            } // items
        }); // objDefineProperties
    }; // Toolbar

    Toolbar.prototype = Object.create(EventTarget.prototype, {
        add: {
            value: function (options) {
                var span = document.createElement("SPAN");
                span.className = "toolbar-item";

                this._el.appendChild(span);

                var item = new ToolbarItem(span);

                this.items.push(item);

                this.__fire({
                    type : "itemadded",
                    item : item
                }); // thisFire
            }, // value
            enumerable : true
        }, // add

        remove: {
            value: function (index) {
                var len = this.items.length;

                if (index > len || index < 0) {
                    throw new Error("Index is out of range");
                } // if

                var item = this.items[index];
                this.items.splice(index, 1);
                this._el.removeChild(item._el);

                item = null;

                this.__fire({
                    type : "itemremoved",
                    index : index
                });

            }, // value
            enumerable : true
        }, // remove

        appendTo: {
            value: function (parentElement) {
                parentElement.appendChild(this._el);

                this.__fire({
                    type: "appended",
                    parentElement: parentElement
                }); // thisFire
            }, // value
            enumerable: true
        } // appendTo
    }); // objDefineProperties

    oojs.createToolbar = function (elementId) {
        var element = document.getElementById(elementId);

        if (!element) {
            element = document.createElement("DIV");
            element.id = elementId;
            element.className = "toolbar";
        } // if

        return new Toolbar(element);
    }; // createToolbar

    return oojs;

}(oojs || {})); // oojs