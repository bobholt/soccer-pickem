define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'editteams', function(position) {

		var teams = new module.Collection();

		teams.on('reset', function(){

	    var editTeam = new module.View({

				el: sandbox.dom.find('.team-edit-container'),
				collection: teams

	    }).render();

		});

		teams.fetch();

	});

});