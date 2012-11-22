define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'addteams', function(position) {

    var addTeam = new module.View({

			el: sandbox.dom.find('.team-add-container')

    }).render();


	});

});