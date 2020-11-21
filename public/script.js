function page_create() {
	location.href = "/create"
};
function page_read() {
	location.href = "/read"
};
function page_update() {
	location.href = "/update"
};
function page_delete() {
	location.href = "/delete"
};

function submit_create() {
	var form=$("#createForm");
	$.ajax({
	    url: '/api/book/',
	    type: 'POST',
		headers: {"Authorization": getCookie('jwt')},
		data:form.serialize(),
		success: function(response){
			alert(JSON.stringify(response));
			console.log(response);  
			document.location.href="/";
		},
		error: function(response){
			window.alert("Session Expired!");
			document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			localStorage.removeItem('jwt');
			sessionStorage.removeItem('jwt');
			document.location.href="/";
		}
	});
};

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

$(document).ready(function() {
	var ck = getCookie('jwt');
	//console.log(ck);
    $('#edit_submit').on('click', function (e) {
        e.preventDefault();
		console.log($('#editModal'))
		//$('#editModal').modal("show");
		var book = new Object();  
        book.title = $('#title').val();  
        book.author = $('#author').val();  
		book.isbn = $('#isbn').val();
		book.publisher = $('#publisher').val();
		book.publication_year = $('#publication_year').val();
		book.last_modified_date = $('#last_modified_date').val();
		book.created_date = $('#created_date').val();

		console.log('editing' + $('#edit_id').val());
		$.ajax({
			url: '/api/book/' + $('#edit_id').val(),
			type: 'PUT',
			data: book,
			headers: {"Authorization": getCookie('jwt')},
			success: function(response){
				alert(JSON.stringify(response));
				console.log(response);  
				location.reload()
			},
			error: function(response){
				document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
				localStorage.removeItem('jwt')
				sessionStorage.removeItem('jwt')
				document.location.href="/login";
			}
		});
    });

	// Edit record
    $('#bookTable').on('click', 'a.editor_edit', function (e) {
        e.preventDefault();
		console.log($('#editModal'))
		//$('#editModal').modal("show");
		console.log($(this).closest('tr')[0].childNodes);
		$('#edit_id').val($(this).closest('tr')[0].childNodes[0].innerText);
		$('#title').val($(this).closest('tr')[0].childNodes[1].innerText);
		$('#author').val($(this).closest('tr')[0].childNodes[2].innerText);
		$('#isbn').val($(this).closest('tr')[0].childNodes[3].innerText);
		$('#publisher').val($(this).closest('tr')[0].childNodes[4].innerText);
		$('#publication_year').val($(this).closest('tr')[0].childNodes[5].innerText);
		$('#last_modified_date').val($(this).closest('tr')[0].childNodes[6].innerText);
		$('#created_date').val($(this).closest('tr')[0].childNodes[7].innerText);

    });
 
    // Delete a record
    $('#bookTable').on('click', 'a.editor_remove', function (e) {
        e.preventDefault();
		console.log('deleting' + $(this).closest('tr')[0].firstChild.innerText);
		var delete_id = $(this).closest('tr')[0].firstChild.innerText;
		$.ajax({
			url: '/api/book/' + delete_id,
			type: 'DELETE',
			headers: {"Authorization": getCookie('jwt')},
			success: function(response){
				alert(JSON.stringify(response));
				console.log(response);  
				location.reload();
			},
			error: function(response){
				document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
				localStorage.removeItem('jwt')
				sessionStorage.removeItem('jwt')
				document.location.href="/login";
			}
		});
    });

	table = $('#bookTable').DataTable({
		"ajax": {
			"type": "GET",
			"headers": {"Authorization": getCookie('jwt')},
			"url": '/api/book',
			"dataSrc": "",
			"error": function (xhr, error, code)
            {
                console.log(xhr);
                console.log(code);
				window.alert("Session Expired!");
				document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
				localStorage.removeItem('jwt')
				sessionStorage.removeItem('jwt')
				document.location.href="/login";
            }
		},
		columns: [
			{ data: "id" },
			{ data: "title" },
			{ data: "author" },
			{ data: "isbn" },
			{ data: "publisher" },
			{ data: "publication_year" },
			{ data: "last_modified_date" },
			{ data: "created_date" },
			{
                data: null,
                className: "center",
                defaultContent: '<a href="" class="editor_edit btn btn-warning" data-toggle="modal" data-target="#editModal">Edit</a><a href="" class="editor_remove btn btn-danger">Delete</a>'
            }
		]
	});
});
