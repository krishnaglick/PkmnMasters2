$(function() {
	var guild_roster_view_model = ko.mapping.fromJS(new GuildRosterViewModel());
	var shared_view_model = ko.mapping.fromJS(new SharedViewModel());
	
	guild_roster_view_model.loadGuildMembers();
	
	$('.navigation').load('./_header.html');
	
	$(document).foundation();
	$('.guildroster').addClass('active');
	
	ko.applyBindings(guild_roster_view_model, $('table.center')[0]);
	ko.applyBindings(shared_view_model, $('.navigation')[0]);
})