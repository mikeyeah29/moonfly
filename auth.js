var auth = (function(){

	function login(access_token, redirectUrl) {
		document.cookie = 'tourmanager_access_token=' + access_token;
		router.redirect(redirectUrl);
	}

	function eraseCookie(name) {   
	    document.cookie = name+'=; Max-Age=-99999999;';  
	}

	function logout() {

		var token = getToken();

		$.ajax({
			url: config('API_URL') + 'auth/logout',
			method: 'GET',
			headers: {
				"Authorization": token
			},
			success: function(data){
				eraseCookie('tourmanager_access_token');
				router.redirect('');
			},
			error: function(a,b,c){
				console.log('error ', a, b, c);
			}
		});
	}

	function getToken() {
		var cname = 'tourmanager_access_token';
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return 'Bearer ' + c.substring(name.length, c.length);
			}
		}
		return "";
	}

	function isLoggedIn(callback){
		
		var cookie = getToken();
		
		if(cookie === ''){
			// cookie doesnt exists
			callback(false);
		}

		getUser(function(error, user){
			if(user){
				callback(true);
			}else{
				callback(false);
			}
		});
		
	}

	function getUser(callback){
		$.ajax({
			url: config('API_URL') + 'auth/user',
			method: 'GET',
			headers: {
				"Authorization": getToken()
			},
			success: function(data){
				console.log(data);
				callback(false, data);
			},
			error: function(a,b,c){
				console.log('error ', a, b, c);
				callback(true);
			}
		});
	}

	return {
		login: login,
		logout: logout,
		getToken: getToken,
		isLoggedIn: isLoggedIn,
		getUser: getUser,
	};

})();