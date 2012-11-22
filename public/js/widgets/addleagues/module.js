define([

  'sandbox',

  'text!./templates/add.html'

],

function(sandbox, addTemplate) {

  var Module = {};

  Module.Model = sandbox.mvc.Model({

  	idAttribute: "_id",

    url: '/api/leagues'

  });

  Module.View = sandbox.mvc.View({

		template: addTemplate,

		events: {
			'click .post-league': 'postLeague',
			'keydown #leagueNameAdd': 'key'
		},

		key: function(e) {
			if (e.which === 13) {
				this.postLeague();
			}
		},

		postLeague: function() {
			var leagueView = this;

			var league = new Module.Model();

			console.log()

			league.save({
				name: $('#leagueNameAdd').val(),
				tier: $('#leagueTierAdd').val(),
				country_code: $('.countrySelect').val()
			}, {
				success: function(){
					sandbox.dom.find('input').each(function(){
						sandbox.dom.find(this).val('');
					});
					sandbox.dom.find('#leagueNameAdd').focus();
					sandbox.pub('postLeague');
				}
			})
		}

  });

  return Module;

});
