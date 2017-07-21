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
	var $payload = $(".payload").clone();

	$(".comment-reply-link").on("click", function(event) {

		event.preventDefault();
		event.stopPropagation();

		// var dataId = $(this).parents(".comment-payload.col-md-12").data("commentId");
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
		// console.log(dataId);
	})

	$(document).on("click", "#commentSubmit", function(e){

		e.preventDefault();
		e.stopPropagation();

		var articleId 		 = $("article").data("id");
		var commentContainer = $(".comment-container");
		var commentRow 	 	 = $(this).parents(".row.comments-row");
		// var divParent 		 = $(this).closest(".comment-payload");
		// var commentId = divParent.data("commentId");

		$.ajax({
			 url: "/gags/" + articleId,
			 // dataType: "json",
			 type: "POST",
			 contentType: "application/json; charset=utf-8",
			 data: JSON.stringify({ text: $("#comment-text").val() })
			 }).done(function(result){
			 	// console.log(JSON.parse(result));
			 	console.log(result);
			 	addComment(result);
			 })
			 .fail(function(err) {
			 	console.log(err);
			 })
		

		var addComment = function (comment) {
			// var comments = JSON.parse(comment);
			var payload = "<div>" + comment.text + "</div>";
			commentRow.append(payload);			     
		}

		// // console.log($("#comment-text").val())

	})



})



