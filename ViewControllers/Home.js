$(function() {
	var home_view_model = ko.mapping.fromJS(new HomeViewModel());
	var shared_view_model = ko.mapping.fromJS(new SharedViewModel());
	
	home_view_model.loadPosts();
	
	$('.navigation').load('./_header.html', function() {
		ko.applyBindings(shared_view_model, $('.navigation')[0]);
		$(document).foundation();
		$('.home').addClass('active');
	});
	
	ko.applyBindings(home_view_model, $('.homePage')[0]);
	
	home_view_model.postsShown.subscribe(function() {
		home_view_model.posts(home_view_model.postList.slice(0, Number(home_view_model.postsShown())));
	});
	
	$(window).scroll(function() {
		if(home_view_model.canLoadMore) {
			if($(window).scrollTop() > $(window).height() / 2) {
				home_view_model.loadMorePosts();
			}
		}
	});
})