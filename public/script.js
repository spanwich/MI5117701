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

function submit_read() {
	var form=$("#readForm");
	$.ajax({
	    url: '/book/',
	    type: 'GET',
		data:form.serialize(),
		success: function(response){
			alert(JSON.stringify(response));
			console.log(response);  
		}
	});
};

function submit_detail() {
	var form=$("#readForm");
	$.ajax({
	    url: '/book/' + $('input[name ="id"]'),
	    type: 'GET',
		data:form.serialize(),
		success: function(response){
			alert(JSON.stringify(response));
			console.log(response);  
		}
	});
};

function submit_update() {
	var form=$("#updateForm");
	$.ajax({
	    url: '/book/' + $('input[name ="id"]'),
	    type: 'PUT',
		data:form.serialize(),
		success: function(response){
			alert(JSON.stringify(response));
			console.log(response);  
		}
	});
};

function submit_delete() {
	var form=$("#deleteForm");
	$.ajax({
	    url: '/book/' + $('input[name ="id"]'),
	    type: 'DELETE',
		data:form.serialize(),
		success: function(response){
			alert(JSON.stringify(response));
			console.log(response);  
		}
	});
};



$(document).ready(function() {

	// Edit record
    //$('#bookTable').on('click', 'a.editor_edit', function (e) {
    //    e.preventDefault();
	//	var delete_id = $(this).closest('tr')[0].firstChild.innerText;
	//	$.ajax({
	//		url: '/book/' + delete_id,
	//		type: 'PUT',
	//		success: function(response){
	//			alert(JSON.stringify(response));
	//			console.log(response);  
	//		}
	//	});
    //});
 
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
