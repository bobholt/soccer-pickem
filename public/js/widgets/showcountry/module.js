define([

  'sandbox',

  'text!./templates/base.html'

],

function(sandbox, baseTemplate) {

  var Module = {};

  Module.Model = sandbox.mvc.Model({

  	idAttribute: "_id",

    initialize: function(){
			this.url = '/api/country/' + this.get('name');
    }

  });

  Module.View = sandbox.mvc.View({

		template: baseTemplate

  });

  return Module;

});
