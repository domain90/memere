$(function() {

	$(".comment-reply-link").on("click", function(event) {

		event.preventDefault();
		event.stopPropagation();

		var $payload = $(".payload");	
		var $commentPayload = $(this).parents(".comment-payload.col-md-12");
		var $toggled = false;

		$commentPayload.siblings().find(".payload").remove();
		$payload.clone().appendTo($commentPayload);
		$toggled = true;

	})



	//AJAX Reply
	$(".commentSubmit").on("click", function(event){

		event.preventDefault();
		event.stopPropagation();






	})

})



