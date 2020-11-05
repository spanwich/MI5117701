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
	    url: '/book/',
	    type: 'POST',
		data:form.serialize(),
		success: function(response){
			alert(JSON.stringify(response));
			console.log(response);  
		}
	});
};



$(document).ready(function() {

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
			url: '/book/' + $('#edit_id').val(),
			type: 'PUT',
			data: book,
			success: function(response){
				alert(JSON.stringify(response));
				console.log(response);  
				location.reload();
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
			url: '/book/' + delete_id,
			type: 'DELETE',
			success: function(response){
				alert(JSON.stringify(response));
				console.log(response);  
				location.reload();
			}
		});
    });

	table = $('#bookTable').DataTable({
		"ajax": {
			"type": "GET",
			"url": '/book',
			"dataSrc": ""
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
                defaultContent: '<a href="" class="editor_edit btn btn-warning" data-toggle="modal" data-target="#editModal">Edit</a> / <a href="" class="editor_remove btn btn-danger">Delete</a>'
            }
		]
	});
});
