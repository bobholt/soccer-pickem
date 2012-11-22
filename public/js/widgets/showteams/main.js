define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'showteams', function(position) {


		var teams = new module.Collection();
		var showTeams;


		teams.on('reset', function(){

	    showTeams = new module.View({

				el: sandbox.dom.find('.team-show-container'),
				collection: teams

	    }).render();

		});

		teams.fetch();

    sandbox.sub('postTeam', function(){

    	showTeams.$el.empty();

    	teams.fetch();

    });

	});

});