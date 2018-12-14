

(function ($){

    $(".button-song").click(function() {
        let classes = $(this).parents()
        let buttonParentID = classes[2].id //finds the id of the parent class where button was clicked
        console.log(buttonParentID)
        let findAttribute =  $(`#${buttonParentID}`).find("#Name")  //finds the attribute under this id
        let getNameOfSong = findAttribute[0].textContent  //gets text content
        $("#SongName").text("Sharing Song:  " + getNameOfSong) //adds the name of the song to the popup

        let findSongid = $(`#${buttonParentID}`).find("input#songid").val()  //finds song id for form to then send back for us to use\
        $("#passBackId").attr("value", findSongid)   //sends the id to the input field in the form

    }); 
    
    $(".sharing-specific-song").click(function(event) {
        event.preventDefault();
        let formData = $("form#form-submit-comment").serializeArray()
        let SharingObject = {}
        for(let i=0; i<formData.length; i++){
            let variableName = formData[i].name
            let variableData = formData[i].value
           SharingObject[`${variableName}`] = variableData;
        }

     //   console.log(SharingObject)

 
         $.ajax({                                                   //ajax call to the songs route
             type: "Post", 
             url: "/songs",
             contentType: 'application/json',
             processData: false,
             data: JSON.stringify(SharingObject),
             dataType: "json",
             success: function(body) {
             },
             error: function() {
              console.log("Error hitting the post route for comments");
             }
          });


    })
    

})(jQuery);
