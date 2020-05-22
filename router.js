var router = (function(){
				
	return {
		redirect: function(url){
			window.location.replace(config('BASE_URL') + url);
		}
	};

})();