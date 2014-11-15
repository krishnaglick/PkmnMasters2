var guild_roster_view_model = ko.mapping.fromJS(new GuildRosterViewModel());
$(function() {

	guild_roster_view_model.loadGuildMembers();
	
	ko.applyBindings(guild_roster_view_model, $('table.center')[0]);
})