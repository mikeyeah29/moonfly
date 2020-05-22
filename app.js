var app = (function(){

	return {
		stopLoading: function(){
			$('body').removeClass('page-loading');
		},
		loadPage: function(permissions, redirectUrl, callback){

			var self = this;

			switch(permissions){
				case 'loggedIn':

					// must be logged in too see these pages

					auth.isLoggedIn(function(loggedIn){

						if(loggedIn){
							self.stopLoading();
							callback();
						}else{
							router.redirect(redirectUrl);
						}

					});

					break;
				case 'loggedOut':

					// anyone can see these pages unless the user is logged in

					auth.isLoggedIn(function(loggedIn){

						if(loggedIn){
							router.redirect(redirectUrl);
						}else{
							self.stopLoading();
							callback();
						}

					});	

					break;
				case 'anyone':

					// anyone can see these pages

					self.stopLoading();
					callback();

					break;

			}
					
		}
	};

})();