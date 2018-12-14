document.cookie = getToken(); //set the cookie equal to access token - this sets a global cookie with accesstoken available everywhere

function getToken() {
  let q = window.location.search;
  let token = q.slice(14);
  console.log(token);
  return token;
}

(function($) {
  $(".user-added-comment").click(function(event) {
    event.preventDefault();
    let classes = $(this).parents();
    let UserPostingNewComment = $("#Name")
      .text()
      .slice(5);
    let buttonParentID = classes[4].id; //finds the id of the parent class where button was clicked
    let findDatabaseId = $(`#${buttonParentID}`)
      .find("input#id_placeholder")
      .val(); //gets database reference id

    let formData = $(`#${buttonParentID}`)
      .find("form#addingNewComment")
      .serializeArray();
    let newlyAddedComment = formData[0].value; //gets new comment posated by user

    // console.log(findDatabaseId)
    // console.log(UserPostingNewComment)
    //  console.log(newlyAddedComment)

    $.ajax({
      type: "Post",
      url: "/songs/comments",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify({
        dataBaseID: findDatabaseId,
        UserPostingNewComment: UserPostingNewComment,
        newlyAddedComment: newlyAddedComment
      }),
      dataType: "json",
      success: function(body) {
        //THE DATABASE NEEDS TO RETURN A JSON
        location.href = "/login";
      },
      error: function() {
        console.log("Error hitting the post route for comments");
      }
    });
  });

  // $(".user-added-comment").click(function() {
  //   console.log("yes this works")
  // });
})(jQuery);
