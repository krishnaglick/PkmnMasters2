ApplyViewModel = function() {
	var self = this;
	
	this.firstName = ko.observable();
	this.lastName = ko.observable();
	
	
	
	this.realmList = ko.observable(['Loading Realms...']);
	
	this.character = ko.observable('');
	this.selectedRealm = ko.observable();
	this.characterNameChanged = ko.observable('');
	this.characterName = ko.observable('').extend({
		rateLimit: { timeout: 500, method: "notifyWhenChangesStop" }
	});
	
	this.typeOfCharacter = ko.computed(function() {
		if(self.character() == '')
			return;
			
		var activeSpec = self.character().talents[1] ? (self.character().talents[1].selected ? self.character().talents[1] : self.character().talents[0]) : self.character().talents[0];
		
		return activeSpec.spec.name;
	});
	
	this.characterProgression = ko.computed(function() {
		if(self.character() == '')
			return;
		
		var raidTier = self.character().progression.raids[currentRaidTier];
		
		var progression = {
			mBosses : 0,
			hBosses : 0,
			nBosses : 0,
			mKills : 0,
			hKills : 0,
			nKills : 0
		};
		$.map(raidTier.bosses, function (boss) {
			progression['mBosses'] += boss.mythicKills ? 1 : 0;
			progression['mKills'] += boss.mythicKills ? (boss.mythicKills > 0 ? 1 : 0 ): 0;
			progression['hBosses'] += boss.heroicKills ? 1 : 0;
			progression['hKills'] += boss.heroicKills ? (boss.heroicKills > 0 ? 1 : 0 ): 0;
			progression['nBosses'] += boss.normalKills ? 1 : 0;
			progression['nKills'] += boss.normalKills ? (boss.normalKills > 0 ? 1 : 0 ): 0;
		});
		
		if(progression['mKills'] > 0)
			return raidTier.name + ' Mythic: ' + progression['mKills'] + '/' + progression['mBosses'];
		else if(progression['hKills'] > 0)
			return raidTier.name + ' Heroic: ' + progression['hKills'] + '/' + progression['hBosses'];
		else if(progression['nKills'] > 0)
			return raidTier.name + ' Normal: ' + progression['nKills'] + '/' + progression['nBosses'];
		
		return '';
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