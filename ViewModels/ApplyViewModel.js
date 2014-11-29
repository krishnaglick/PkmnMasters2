ApplyViewModel = function() {
	var self = this;
	
	this.firstName = ko.observable();
	this.middleName = ko.observable();
	this.lastName = ko.observable();
	
	this.realmList = ko.observable();
	
	this.character = ko.observable('');
	this.selectedRealm = ko.observable();
	this.characterNameChanged = ko.observable('');
	this.characterName = ko.observable('').extend({
		rateLimit: { timeout: 500, method: "notifyWhenChangesStop" }
	});
}

ApplyViewModel.prototype.loadRealms = function() {
	var self = this;
	$.ajax({
		type: "GET",
		url: 'https://us.battle.net/api/wow/realm/status',
		dataType: "jsonp",
		jsonp: 'jsonp'
	}).done(function(data) {
		self.realmList($.map(data.realms, function(realm) {
			return realm.name;
		})
	)});
}

ApplyViewModel.prototype.loadCharacter = function() {
	if(this.characterName() == '')
		return;
	
	var self = this;
	
	$.ajax({
		type: "GET",
		url: 'https://us.battle.net/api/wow/character/' + self.selectedRealm() + '/' + self.characterName() + '?fields=items,talents,professions,progression,stats',
		dataType: "jsonp",
		jsonp: 'jsonp'
	}).done(function(player) {
		self.character(player);
		$('.characterInfo').slideDown();
	});
}