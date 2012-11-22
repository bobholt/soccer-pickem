define([

  'sandbox',

  'text!./templates/add.html'

],

function(sandbox, addTemplate) {

  var Module = {};

  Module.Model = sandbox.mvc.Model({

  	idAttribute: "_id",

    url: '/api/countries'

  });

  Module.View = sandbox.mvc.View({

		template: addTemplate,

		events: {
			'click .post-country': 'postCountry',
			'keydown #countryCode': 'key'
		},

		key: function(e) {
			if (e.which === 13) {
				this.postCountry();
			}
		},

		postCountry: function() {
			var countryView = this;

			var country = new Module.Model();

			country.save({
				name: $('#countryName').val(),
				code: $('#countryCode').val()
			}, {
				success: function(){
					sandbox.dom.find('input').each(function(){
						sandbox.dom.find(this).val('');
					});
					sandbox.dom.find('#countryName').focus();
					sandbox.pub('postCountry');
				}
			})
		}

  });

  return Module;

});
