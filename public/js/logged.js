document.cookie = getToken(); //set the cookie equal to access token - this sets a global cookie with accesstoken available everywhere

function getToken() {
  let q = window.location.search;
  let token = q.slice(14);
  console.log(token);
  return token;
}

(function ($){

  $(".find-all-comments").click(function() {
    let classes = $(this).parents()
    let buttonParentID = classes[1].id //finds the id of the parent class where button was clicked
    let findDatabaseId =  $(`#${buttonParentID}`).find("input#id_placeholder").val() //gets database reference id
     // console.log(buttonParentID);
  //  console.log(findDatabaseId)

  $.ajax({
    type: "Post", 
    url: "/songs/comments",
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({dataBaseID: findDatabaseId}),
    dataType: "json",
    success: function(body) {
      //THE DATABASE NEEDS TO RETURN A JSON 
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


