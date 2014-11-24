$(function() {
	window.home_view_model = ko.mapping.fromJS(new HomeViewModel());
	window.shared_view_model = ko.mapping.fromJS(new SharedViewModel());
	
	home_view_model.loadPosts();
	
	$('.navigation').load('./_header.html', function() {
		ko.applyBindings(shared_view_model, $('.navigation')[0]);
		$(document).foundation();
		$('.home').addClass('active');
	});
	
	ko.applyBindings(home_view_model, $('.homePage')[0]);
	
	$('.dsc-badge-header').remove();
})