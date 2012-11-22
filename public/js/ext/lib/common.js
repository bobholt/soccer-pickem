define(['jquery'],

function($){

	function addARIARole(strEl, strRole) {
    // Find the element to add a role property to
    var $objElement = $(strEl);

    if ($objElement.length > 0) {
      // Add the role property to the element
      $objElement.attr('role', strRole);
    }
	}

	function addMenuIDs() {
		// $('.main.menu li').each(function(){
		// 	var hook = $(this).find('a').text().replace(/ /g, '').toLowerCase();
		// 	console.log(hook);
		// 	$(this).attr('id', hook);
		// });
	}

	function attachLoginHover(){
		// $('#login').mouseenter(function(e){
		// 	e.stopPropagation();
		// 	$('.user.login').show();
		// });
		// $('body').mouseover(function(e){
		// 	$('.user.login').hide();
		// });
		// $('.user.login').mouseover(function(e){
		// 	e.stopPropagation();
		// });
	}

	addMenuIDs();
	attachLoginHover();

	return {
		addARIARole: addARIARole
	};

});