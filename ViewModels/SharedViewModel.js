SharedViewModel = function() {
	var self = this;
	
	this.error = ko.observable('');
	
	this.username = ko.observable(docCookies.getItem('username') || '');
	this.password = ko.observable();
	this.authToken = ko.observable(docCookies.getItem('authToken') || '');
	
	this.loggedIn = ko.computed(function() {
		 if(self.authToken() == ''){
			return false;
		 }
		 return true;
	});
}

SharedViewModel.prototype.login = function() {
	//Hit backend, return datas.
	var self = this;
	self.authToken("123-456");
	docCookies.setItem('authToken', self.authToken(), '/');
	docCookies.setItem('username', self.username(), '/');
	self.password('');
	$('#loginModal').foundation('reveal', 'close');
}

SharedViewModel.prototype.register = function() {
	//Hit backend, return datas.
	var self = this;
	self.authToken("456-123");
	docCookies.setItem('authToken', self.authToken(), '/');
	docCookies.setItem('username', self.username(), '/');
	self.password('');
	$('#registerModal').foundation('reveal', 'close');
}

SharedViewModel.prototype.logout = function() {
	docCookies.removeItem('authToken');
	docCookies.removeItem('username');
	this.username('');
	this.authToken('');
}

SharedViewModel.prototype.clearError = function() {
	this.error('');
}