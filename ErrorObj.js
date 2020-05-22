var ErrorObj = (function(){

	function ErrorObj(responseJSON) {
		this.errors = [];
		if(responseJSON.hasOwnProperty('errors')){
			var keys = Object.keys(responseJSON.errors);
			for(var i=0;i<keys.length;i++){		
				this.addError({
					name: keys[i],
					value: responseJSON.errors[keys[i]] 
				});
			}
		}else{
			this.addError({name: 'general', value: responseJSON.message});
		}
	}

	ErrorObj.prototype.addError = function(errorMsg) {
		this.errors.push(errorMsg);
	};

	ErrorObj.prototype.getMessages = function() {
		var errArray = [];
		for(var i=0;i<this.errors.length;i++){
			errArray.push(this.errors[i].value);
		}
		return errArray;
	};

	return ErrorObj;

})();