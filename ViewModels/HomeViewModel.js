HomeViewModel = function() {
	var self = this;
		
	this.postList = ko.observableArray([]);
	this.postsShown = ko.observable(0);
	
	this.posts = ko.observableArray([]);
	
	this.canLoadMore = true;
}

HomeViewModel.prototype.loadPosts = function() {
	var self = this;
	
	$.get('http://www.reddit.com/r/PokemonMasters/new.json?sort=new').success(function(data) {
		self.postList($.map(data.data.children, function(post) {
			return {
				type: post.data.is_self,
				author: post.data.author + ' (' + (post.data.author_flair_text || 'No Flair') + ')',
				post: post.data.selftext || '',
				partialPost: post.data.selftext.slice(0, 60) == post.data.selftext ? post.data.selftext : post.data.selftext.slice(0, 60).trim() + '...' || '',
				url: post.data.url,
				date: timeToHuman(post.data.created_utc),
				title: post.data.title
			}
		}));
		self.postsShown(10);
	});
}

HomeViewModel.prototype.expandPost = function(data, event) {	
	var post = $(event.target).parent();
	var postPartial = post.find('.partialPost');
	var postFull = post.find('.expandedPost');
	
	//If the post already is the full text, skip the animation.
	if(postPartial.text().contains(postFull.text())) {
		return;
	}
	
	if($(event.target).hasClass('expandedPost')) {
		postPartial.show(405);
		postFull.slideUp();
	}
	else {
		postPartial.hide(405);
		postFull.slideDown();
	}
}

HomeViewModel.prototype.loadMorePosts = function() {
	var self = this;
	
	if(self.postsShown() < self.postList().length+1) {
		self.postsShown(self.postsShown() + 2)
	}
	else {
		self.canLoadMore = false;
	}
}