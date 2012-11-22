define([

  'sandbox',

  'text!./templates/edit.html'

],

function(sandbox, editTemplate) {

  var Module = {};

  Module.Model = sandbox.mvc.Model({

  	idAttribute: "_id",

    url: function(){
    	return '/api/results/' + this.id
    }

  });

  Module.Collection = sandbox.mvc.Collection({

    model: Module.Model,

    url: '/api/results'

  });

  Module.View = sandbox.mvc.View({

		template: editTemplate,

		events: {
			'change .resultSelect': 'changeModel',
			'click .edit-result': 'editResult'//,
			// 'keydown #leagueNameEdit': 'key'
		},

		changeModel: function(e){
			var resultName = e.target.value;
			this.model = this.collection.where({name: resultName})[0];
			// this.$el.find('#leagueNameEdit').val(this.model.get('name'));
			// this.$el.find('.countrySelect').val(this.model.get('country_code'));
			// this.$el.find('#leaguePlayableEdit').val((+this.model.get('playable')).toString());
		},

		key: function(e) {
			if (e.which === 13) {
				this.postResult();
			}
		},

		editResult: function() {
			var resultView = this;

			var result = this.model;

			result.save({
				name: resultView.$el.find('#countryNameEdit').val()//,
				// country_code: resultView.$el.find('.countrySelect').val(),
				// playable: !!parseInt(resultView.$el.find('#leaguePlayableEdit').val())
			}, {
				success: function(){
					resultView.$el.find('input').each(function(){
						resultView.$el.find(this).val('');
					});
					// resultView.$el.find('#countryNameEdit').focus();
					sandbox.pub('postCountry');
				}
			})
		}

  });

  return Module;

});
