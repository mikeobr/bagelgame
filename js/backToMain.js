var backToMainState = {
	create: function() {
		var host = window.location.hostname;
		window.location.href = 'http://' + host + ':8080';
	}
}