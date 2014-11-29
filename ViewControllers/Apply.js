$(function() {
	window.apply_view_model = ko.mapping.fromJS(new ApplyViewModel());
	window.shared_view_model = ko.mapping.fromJS(new SharedViewModel());
	
	$('.navigation').load('./_header.html', function() {
		ko.applyBindings(shared_view_model, $('.navigation')[0]);
		$(document).foundation();
		$('.apply').addClass('active');
	});
	
	ko.applyBindings(apply_view_model, $('.applyToGuild')[0]);
	
	apply_view_model.loadRealms();
	
	apply_view_model.characterName.subscribe(function() {
		apply_view_model.loadCharacter();
	});
	
	//Damn I'm good
	ko.applyBindingsToNode($('#characterNameInput')[0], {
		textInput: apply_view_model.characterNameChanged
	});
	
	apply_view_model.characterNameChanged.subscribe(function() {
		$('.characterInfo').slideUp();
	});
})