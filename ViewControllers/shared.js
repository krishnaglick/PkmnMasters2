$(function() {
	window.shared_view_model = ko.mapping.fromJS(new SharedViewModel());
	
	ko.applyBindings(shared_view_model, $('.navigation')[0]);
	$(document).foundation();
})