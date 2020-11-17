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