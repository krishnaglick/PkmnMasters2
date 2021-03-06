GuildRosterViewModel = function() {
	var self = this;
	
	this.guildMembers = ko.observableArray([]);
	this.guildMember = ko.observable('');
	
	this.progression = ko.observableArray([]);
	this.selectedRaid = ko.observable('');
	this.selectedRaidProgression = ko.computed(function() {
		if(self.selectedRaid() == '')
			return;
	
		var progression = {
			mBosses : 0,
			hBosses : 0,
			nBosses : 0,
			mKills : 0,
			hKills : 0,
			nKills : 0
		};
		var raidTier = self.selectedRaid();
		
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
	
	this.activeSpec = ko.observable(0);
	
	this.playerStats = ko.computed(function() {
		if(self.guildMember() == '')
			return;
		
		var player = self.guildMember();
		var stats = {};
		var activeSpec = self.activeSpec();
		stats.mainSpec = player.talents[0] || '';
		stats.offSpec = player.talents[1] || '';
		
		var role = player.talents[activeSpec].spec.role;
		
		stats.glyphs = {
			major : [player.talents[activeSpec].glyphs.major[0] || '',
					 player.talents[activeSpec].glyphs.major[1] || '',
					 player.talents[activeSpec].glyphs.major[2] || ''],
			minor : [player.talents[activeSpec].glyphs.minor[0] || '',
					 player.talents[activeSpec].glyphs.minor[1] || '',
					 player.talents[activeSpec].glyphs.minor[2] || '']
		};
		
		stats.ilvl = player.items.averageItemLevelEquipped;
		stats.ilvlMax = player.items.averageItemLevel;
		
		var bigStat = player.stats.agi > player.stats.int ? (player.stats.agi > player.stats.str ? 'agi' : 'str') : (player.stats.int > player.stats.str ? 'int' : 'str');
		var huntard = player.stats.rangedDps > -1;
		
		if(role == "DPS") {
			if(bigStat == 'str') {
				stats.priStatName = 'Strength';
				stats.priStatVal = player.stats.str;
				stats.secStatOneName = 'MH DPS';
				stats.secStatOneVal = player.stats.mainHandDps;
				stats.secStatTwoName = 'OH DPS';
				stats.secStatTwoVal = player.stats.offHandDps;
				stats.secStatThreeName = 'Atk Power';
				stats.secStatThreeVal = player.stats.attackPower;
			}
			else if(bigStat == 'int') {
				stats.priStatName = 'Intelligence';
				stats.priStatVal = player.stats.int;
				stats.secStatOneName = 'Spell Power';
				stats.secStatOneVal = player.stats.spellPower;
				stats.secStatTwoName = 'Spirit';
				stats.secStatTwoVal = player.stats.spa;
				stats.secStatThreeName = 'Mana';
				stats.secStatThreeVal = player.stats.power;
			}
			else if(bigStat == 'agi' && !huntard) {
				stats.priStatName = 'Agility';
				stats.priStatVal = player.stats.agi;
				stats.secStatOneName = 'MH DPS';
				stats.secStatOneVal = player.stats.mainHandDps;
				stats.secStatTwoName = 'OH DPS';
				stats.secStatTwoVal = player.stats.offHandDps;
				stats.secStatThreeName = 'Atk Power';
				stats.secStatThreeVal = player.stats.attackPower;
			}
			else if(bigStat == 'agi' && huntard) {
				stats.priStatName = 'Agility';
				stats.priStatVal = player.stats.agi;
				stats.secStatOneName = 'Ranged DPS';
				stats.secStatOneVal = player.stats.rangedDPS;
				stats.secStatTwoName = '';
				stats.secStatTwoVal = '';
				stats.secStatThreeName = 'Atk Power';
				stats.secStatThreeVal = player.stats.attackPower;
			}
			else {
				console.log("What the fuck");
			}
		}
		else if(role == "TANK") {
			stats.priStatName = 'Stamina';
			stats.priStatVal = player.stats.sta;
			stats.secStatOneName = 'Bonus Armor';
			stats.secStatOneVal = player.stats.bonusArmor;
			stats.secStatTwoName = 'Dodge + Parry';
			stats.secStatTwoVal = (player.stats.parry + player.stats.dodge).toFixed(2) + '%';
			stats.secStatThreeName = 'Block';
			stats.secStatThreeVal = player.stats.block + '%';
		}
		else if(role == "HEALING") {
			stats.priStatName = 'Intelligence';
			stats.priStatVal = player.stats.int;
			stats.secStatOneName = 'Spell Power';
			stats.secStatOneVal = player.stats.spellPower;
			stats.secStatTwoName = 'Spirit';
			stats.secStatTwoVal = player.stats.spa;
			stats.secStatThreeName = 'Mana';
			stats.secStatThreeVal = player.stats.power;
		}
		else {
			console.log("What the fuck");
		}
		stats.crit = player.stats.crit.toFixed(2);
		stats.haste = player.stats.haste.toFixed(2);
		stats.mastery = player.stats.mastery.toFixed(2);
		stats.multistrike = player.stats.multistrike.toFixed(2);
		stats.leech = player.stats.leech;
		stats.versatility = player.stats.versatility;
		stats.health = player.stats.health;
		
		return stats;
	});
}

GuildRosterViewModel.prototype.loadGuildMembers = function() {
	var self = this;
	  
   $.ajax({
		type: "GET",
		url: 'https://us.battle.net/api/wow/guild/Blackrock/Pokemon%20Masters?fields=members',
		dataType: "jsonp",
		jsonp: 'jsonp'
	}).done(function(data) {
		self.guildMembers.push.apply(self.guildMembers, data.members.sort(function(a, b) {
			return a.rank - b.rank;
			})
		)
	});
}

GuildRosterViewModel.prototype.showPlayer = function(viewmodel, data) {
   $.ajax({
		type: "GET",
		url: 'https://us.battle.net/api/wow/character/Blackrock/' + data.character.name + '?fields=items,talents,professions,progression,stats',
		dataType: "jsonp",
		jsonp: 'jsonp'
	}).done(function(data) {
		viewmodel.guildMember(data);
		viewmodel.progression(data.progression.raids.reverse());
		viewmodel.activeSpec(viewmodel.guildMember().talents[0].selected != null ? 0 : 1);
		
		if(!ko.dataFor($('#playerModal')[0])) {
			ko.applyBindings(viewmodel, $('#playerModal')[0]);
		}
		$('#playerModal').foundation('reveal', 'open');
	});
}