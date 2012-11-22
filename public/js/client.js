window.onload = function(){

	var socket = io.connect('/');
	socket.on('onconnected', function(data){
		console.log(data);
		console.log( 'Connected successfully to the socket.io server. My server side ID is ' + data.id );

		socket.emit('my other event', { my: data });
	});
}
