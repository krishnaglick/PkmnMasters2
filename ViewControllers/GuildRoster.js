$(function() {
	window.guild_roster_view_model = ko.mapping.fromJS(new GuildRosterViewModel());
	window.shared_view_model = ko.mapping.fromJS(new SharedViewModel());
	
	guild_roster_view_model.activeSpec.subscribe(function() {
		if(guild_roster_view_model.activeSpec() === 0) {
			$('#offSpec').addClass('secondary');
			$('#mainSpec').removeClass('secondary');
		}
		else if(guild_roster_view_model.activeSpec() === 1) {
			$('#mainSpec').addClass('secondary');
			$('#offSpec').removeClass('secondary');
		}
	});
	
	guild_roster_view_model.loadGuildMembers();
	
	$('.navigation').load('./_header.html', function() {
		ko.applyBindings(shared_view_model, $('.navigation')[0]);
		$(document).foundation();
		$('.guildroster').addClass('active');
	});
	
	ko.applyBindings(guild_roster_view_model, $('table.center')[0]);
	
	$('#mainSpec').click(function(){
		guild_roster_view_model.activeSpec(0);
	})
	
	$('#offSpec').click(function(){
		guild_roster_view_model.activeSpec(1);
	})
})