$(function() {

	// $('.body-half a').click(function() {
	// 	var title = "Hello, the test worked!"
    //  $('.modal-title').html(title);
	// });

	/////////////////
	/////VOTING//////
	/////////////////
	$(".upvote").on("click", function(){
		$(this).toggleClass("upvoted");
		$(this).children().toggleClass("upvoted");
	})

	$(".downvote").on("click", function(){
		$(this).toggleClass("downvoted");
		$(this).children().toggleClass("downvoted");
	})

	///////////////////////
	/////COMMENT-REPLY/////
	//////////////////////
	var $payload = $(".payload:first").clone().addClass("col-md-12");

	$(".comment-reply-link").on("click", function(event) {

		event.preventDefault();
		event.stopPropagation();

		var $commentPayload = $(this).parents(".comment-payload.col-md-12");
		var $commentRow = $(this).parents(".row.comments-row");
		var commentOn = false;

		function addComment(){
			$payload.appendTo($commentPayload);
			// if(commentOn == false){
			// 	$payload.clone().appendTo($commentRow);
			// 	$commentOn = true;
			// } else {
			// 	$payload.appendTo($commentRow);
			// }
		}
		addComment();
	})

	// AJAX Reply
	// $(".commentSubmit").on("click", function(event){

	// 	event.preventDefault();
	// 	event.stopPropagation();

	// 	var articleId 		 = $("article").data("id");
	// 	var commentContainer = $(".comment-container");
	// 	var divParent 		 = $(this).closest(".comment-payload");
	// 	// var commentId = divParent.data("commentId");

	// 	$.ajax({
	// 		 url: "/gags/" + articleId,
	// 		 type: "POST",
	// 		 contentType: "application/json",
	// 		 data: JSON.stringify({ text: $("#comment-text").val() })
	// 		 }).done(function(result){
	// 		 	addComment(JSON.parse(result))
	// 		 })
	// 		 .fail(function(err) {c 
	// 		 	console.log(err);
	// 		 })
		

	// 	var addComment = function (comment) {
	// 		var payload = "<div>" + comment + "</div>";
	// 		commentContainer.append(payload);			     
	// 	}

	// 	console.log($("#comment-text").val())

	// })

})



