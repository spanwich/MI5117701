function submit_login() {
	var form=$("#loginForm");
	$.ajax({
	    url: '/login/',
	    type: 'POST',
		data:form.serialize(),
		success: function(response){
			//localStorage.setItem('jwt', response.jwt);
			console.log(response);  
			document.location.href="/";
		},
	    error : function(err) {
			window.alert("Wrong username or password!");
		    console.log('Error!', err)
	    }
	});
};

function onSuccess(googleUser) {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
  console.log(error);
}
function renderButton() {
  gapi.signin2.render('my-signin2', {
	'scope': 'profile email',
	'width': 240,
	'height': 50,
	'longtitle': true,
	'theme': 'dark',
	'onsuccess': onSuccess,
	'onfailure': onFailure
  });
}
