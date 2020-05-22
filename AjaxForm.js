var AjaxForm = (function(){

	/*
	
		how to use AjaxForm

		mathod="POST"
		mathod="DELETE"

		can use any http verb in method for this

	*/

	function AjaxForm(options){
		this.form = $('#' + options.id);
		this.submitBtn = this.form.find('.submit-form');
		this.callback = options.callback;
		if(options.hasOwnProperty('token')){
			this.token = options.token;
		}
		var self = this;
		this.submitBtn.on('click', function(){
			var method = self.form.attr('method');
			self.send(function(errors, data){
				if(self.callback){
					self.callback(errors, data);
				}
			});
		});
	}
	AjaxForm.prototype.send = function(callback) {
		var self = this;
		this.form.addClass('ajax-form--loading');
		var obj = {
			url: this.getFormAction(),
			method: this.getFormMethod(),
			data: this.getFormData(),
			success: function(data){
				console.log('data ', data);
				self.form.removeClass('ajax-form--loading');
				callback(false, data);
			},
			error: function(a, b, c){
				var errorObj = new ErrorObj(a.responseJSON);
				self.form.removeClass('ajax-form--loading');
				callback(errorObj, a);
			}
		};
		if(this.token){
			obj.headers = {
				"Authorization": this.token
			};
		}
		$.ajax(obj);
	};
	AjaxForm.prototype.getFormMethod = function() {
		return this.form.attr('method').toUpperCase();
	};
	AjaxForm.prototype.getFormAction = function() {
		return this.form.attr('action');
	};
	AjaxForm.prototype.getFormData = function() {
		var data = {};
		if(this.getFormAction() === 'GET'){
			return data;
		}
		var fields = $(this.form).find('.ajax-form-input');
		fields.each(function(){
			data[ $(this).attr('name') ] = $(this).val();
		});
		return data;
	};

	return AjaxForm;

})();