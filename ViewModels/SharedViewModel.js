SharedViewModel = function() {
	var self = this;
	
	this.username = ko.observable();
	this.password = ko.observable();
	this.authToken = ko.observable();
	
	this.loggedIn = ko.computed(function() {
		 if(self.authToken() == ''){
			return false;
		 }
		 return true;
	});
}

SharedViewModel.prototype.login = function() {
	//Hit backend, return datas.
	debugger;
	var self = this;
	self.username("loginTest");
	self.authToken("123-456");
	docCookies.setItem('authToken', self.authToken(), '/');
	docCookies.setItem('user', self.username(), '/');
}

SharedViewModel.prototype.register = function() {
	//Hit backend, return datas.
	debugger
	var self = this;
	self.username("regTest");
	self.authToken("123-456");
	docCookies.setItem('authToken', self.authToken(), '/');
	docCookies.setItem('user', self.username(), '/');
}