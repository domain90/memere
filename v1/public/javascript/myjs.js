$(function() {

	$(".comment-reply-link").on("click", function(event) {

		event.preventDefault();
		event.stopPropagation();

		var $payload = $(".payload");	
		var $commentPayload = $(this).parents(".comment-payload.col-md-12");
		var $toggled = false;

		$commentPayload.siblings().find(".payload").remove();
		$payload.appendTo($commentPayload);
		$toggled = true;

	})



	//AJAX Reply
	$(".commentSubmit").on("click", function(event){

		event.preventDefault();
		event.stopPropagation();

		var articleId = $("article").data("id");
		var divParent = $(this).closest(".comment-payload");
		var commentId = divParent.data("commentId");

		$.ajax({
			 url: "/gags/" + articleId,
			 type: "POST",
			 contentType: "application/json"
			 }).done(function(result){
			 	console.log(result);
			 })
			 .fail(function(err) {
			 	console.log(err);
			 })
		

		var addComment = function (comment) {
			var div = $(".payload").closest("div");
			var payload = "<div class='row comments-row'>
          <div class='comment-payload col-md-12' data-comment-id='<%= comment._id %>'>
            <div class='comment-user-container'>
              <img src='<%= comment.author.avatar %>' alt=' class='user_avatar'>
            </div>
            <div class='comment-input-area'>
              <div class='comment-meta'>
                <strong><%= comment.author.username %></strong>
                <span class='gag-votes'><%= comment.votes %> Votes</span>
              </div>
              <p class='comment-main'><%= comment.text %></p>
              <div class='comment-cta'>
                <a href=' class='comment-reply-link'>Reply</a>
                <a href='><span class='glyphicon glyphicon-arrow-up'></a>
                <a href='><span class='glyphicon glyphicon-arrow-down'></a>
              </div>
            </div>
          </div>
        </div>"
		}

		console.log(commentId);


	})

})



