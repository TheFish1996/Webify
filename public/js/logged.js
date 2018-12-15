document.cookie = getToken(); //set the cookie equal to access token - this sets a global cookie with accesstoken available everywhere

function getToken() {
  let q = window.location.search;
  let token = q.slice(14);
  console.log(token);
  return token;
}

const checker = phrase => {                         //checks if a comment was even provided or not
  if(!phrase) return false;
  if (!phrase.replace(/\s/g, '').length) return false;
  return true;
}



(function($) {

  $(".USTop50SongFeed").attr('style','display: none');      //when page loads in the regular state, it hides all other categories data excep main feed
  $(".GlobaTop50SongFeed").attr('style','display: none');   //when page loads in the regular state, it hides all other categories data excep main feed
  $(".GlobaViral50SongFeed").attr('style','display: none');  //when page loads in the regular state, it hides all other categories data excep main feed
  $(".USViral50SongFeed").attr('style','display: none');  //when page loads in the regular state, it hides all other categories data excep main feed

  $(".user-added-comment").click(function(event) {
    event.preventDefault();
    let classes = $(this).parents();
    let UserPostingNewComment = $("#Name")
      .text()
      .slice(5);
    let buttonParentID = classes[4].id; //finds the id of the parent class where button was clicked
    console.log(buttonParentID)
    let findDatabaseId = $(`#${buttonParentID}`)
      .find("input#id_placeholder")
      .val(); //gets database reference id

    let formData = $(`#${buttonParentID}`)
      .find("form#addingNewComment")
      .serializeArray();
    let newlyAddedComment = formData[0].value; //gets new comment posated by user

    let validComment = checker(newlyAddedComment)

    // console.log(findDatabaseId)
    // console.log(UserPostingNewComment)
    //  console.log(newlyAddedComment)

    if(validComment){

      $("#newlyMadeComment").css({"border-color": "transparent", 
             "border-width":"3px", 
             "border-style":"solid"});

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

    } else {

      console.log("Valid comment wasnt provided")
      $("#newlyMadeComment").css({"border-color": "#FF0000", 
             "border-width":"3px", 
             "border-style":"solid"});

      $("input#newlyMadeComment").attr("placeholder", "Comment Was not provided")
    }

  });

  $("#UsTop50Category").click(function(event) {           //upon click of category it hides all other content and only displays USTop50 data
      $(".GlobaTop50SongFeed").attr('style','display: none');
      $(".GlobaViral50SongFeed").attr('style','display: none');
      $(".USViral50SongFeed").attr('style','display: none');
      $(".RegularSongFeed").attr('style','display: none');
      $(".USTop50SongFeed").removeAttr("style");
     });

  $("#GlobalTop50Category").click(function(event) {  //upon click of category it hides all other content and only displays GlobalTop50 data
      $(".GlobaTop50SongFeed").removeAttr("style");
      $(".GlobaViral50SongFeed").attr('style','display: none');
      $(".USViral50SongFeed").attr('style','display: none');
      $(".RegularSongFeed").attr('style','display: none');
      $(".USTop50SongFeed").attr('style','display: none');
     });

  $("#GlobalViral50Category").click(function(event) {        //upon click of category it hides all other content and only displays GlobalViral50 data
      $(".GlobaTop50SongFeed").attr('style','display: none');
      $(".GlobaViral50SongFeed").removeAttr("style");
      $(".USViral50SongFeed").attr('style','display: none');
      $(".RegularSongFeed").attr('style','display: none');
      $(".USTop50SongFeed").attr('style','display: none');
     });

  $("#UsViral50Category").click(function(event) {                   //upon click of category it hides all other content and only displays USViral50 data
      $(".GlobaTop50SongFeed").attr('style','display: none');
      $(".GlobaViral50SongFeed").attr('style','display: none');
      $(".USViral50SongFeed").removeAttr("style");
      $(".RegularSongFeed").attr('style','display: none');
      $(".USTop50SongFeed").attr('style','display: none');
     });

  $("#RegularCategory").click(function(event) {                      //upon click of category it hides all other content and only displays Whole song feed data
      $(".GlobaTop50SongFeed").attr('style','display: none');
      $(".GlobaViral50SongFeed").attr('style','display: none');
      $(".USViral50SongFeed").attr('style','display: none');
      $(".RegularSongFeed").removeAttr("style");
      $(".USTop50SongFeed").attr('style','display: none');
     });



  // $(".user-added-comment").click(function() {
  //   console.log("yes this works")
  // });
})(jQuery);
