define([

	'sandbox',

	'./module'

],

function(sandbox, module){

	return sandbox.subscribe('bootstrap', 'addresults', function(position) {

    var addResult = new module.View({

			el: sandbox.dom.find('.result-add-container')

    }).render();


	});

});