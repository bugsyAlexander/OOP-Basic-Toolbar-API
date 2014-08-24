var oojs = (function (oojs) {

	var createToolbarItems = function (itemElms){
		var items = [];

		[].forEach.call(itemElms, function (el, index, array){

			var item = {
				el : el,
				disable : function (){
					this.el.classList.add("disabled"); 
				}, // disable

				enable : function () {
					this.el.classList.remove("disabled");
				}, // enable

				isDisabled : function (){
					return this.el.classList.contains("disabled");
				}, // isDisabled

				activate : function (){
					if(this.isDisabled()) {
						return;
					} else {
						this.el.classList.add("active");
					} // if/else
				}, // activate

				deactivate : function (){
					if(this.isDisabled()) {
						return;
					} else {
						this.el.classList.remove("active");
					} // if/else
				}, // deactivate 
				isActive : function (){
					return this.el.classList.containts("active");
				}, // isActive 

				toggleActiveState : function () {
					if(this.isActive) {
						this.deactivate();
					} else {
						this.activate();
					}
				} // toggleActiveState
 
			}; // item

			items.push(item);

		}); // forEach 

		return items;
	}; // createToolbarItems

	oojs.createToolbar = function (elementId){
		var elm = document.getElementById(elementId),
			items = elm.querySelectorAll(".toolbar-item");

		return {
			items : createToolbarItems(items)
		}; // return


	}; // createToolbar

	return oojs; 

}(oojs || {})); // oojs