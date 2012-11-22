define([

  'sandbox',

  'text!./templates/base.html'

],

function(sandbox, baseTemplate) {

  var Module = {};

  Module.Model = sandbox.mvc.Model({

  	idAttribute: "_id",

    url: function(){
    	return '/api/user/' + this.get('displayname')
    }

  });

  Module.View = sandbox.mvc.View({

		template: baseTemplate

  });

  return Module;

});
