define([

  'sandbox',

  'text!./templates/edit.html'

],

function(sandbox, editTemplate) {

  var Module = {};

  Module.Model = sandbox.mvc.Model({

  	idAttribute: "_id",

    url: function(){
    	return '/api/countries/' + this.id
    }

  });

  Module.Collection = sandbox.mvc.Collection({

    model: Module.Model,

    url: '/api/countries'

  });

  Module.View = sandbox.mvc.View({

		template: editTemplate,

		events: {
			'change .countrySelect': 'changeModel',
			'click .edit-country': 'editCountry',
			'keydown #countryCodeEdit': 'key'
		},

		changeModel: function(e){
			var countryCode = e.target.value;
			this.model = this.collection.where({code: countryCode})[0];
			this.$el.find('#countryNameEdit').val(this.model.get('name'));
			this.$el.find('#countryCodeEdit').val(this.model.get('code'));
		},

		key: function(e) {
			if (e.which === 13) {
				this.postCountry();
			}
		},

		editCountry: function() {
			var countryView = this;

			var country = this.model;

			country.save({
				name: countryView.$el.find('#countryNameEdit').val(),
				code: countryView.$el.find('#countryCodeEdit').val()
			}, {
				success: function(){
					countryView.$el.find('input').each(function(){
						countryView.$el.find(this).val('');
					});
					countryView.$el.find('#countryNameEdit').focus();
					sandbox.pub('postCountry');
				}
			})
		}

  });

  return Module;

});
