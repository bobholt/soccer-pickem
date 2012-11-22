define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'addleagues', function(position) {

    var addLeague = new module.View({

			el: sandbox.dom.find('.league-add-container')

    }).render();


	});

});