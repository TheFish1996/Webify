(function($) {
  for (let i = 0; i <= 4; i++) {
    $(`#${i} .card-header`).html(i + 1);
  }

  for (let i = 10; i <= 14; i++) {
    let number = i - 4;
    $(`#${i} .card-header`).html(number);
  }

  for (let i = 20; i <= 24; i++) {
    let number = i - 9;
    $(`#${i} .card-header`).html(number);
  }

  for (let i = 30; i <= 34; i++) {
    let number = i - 14;
    $(`#${i} .card-header`).html(number);
  }

  for (let i = 40; i <= 44; i++) {
    let number = i - 19;
    $(`#${i} .card-header`).html(number);
  }

  for (let i = 50; i <= 54; i++) {
    let number = i - 24;
    $(`#${i} .card-header`).html(number);
  }

  for (let i = 60; i <= 64; i++) {
    let number = i - 29;
    $(`#${i} .card-header`).html(number);
  }

  for (let i = 70; i <= 74; i++) {
    let number = i - 34;
    $(`#${i} .card-header`).html(number);
  }

  for (let i = 80; i <= 84; i++) {
    let number = i - 39;
    $(`#${i} .card-header`).html(number);
  }

  for (let i = 90; i <= 94; i++) {
    let number = i - 44;
    $(`#${i} .card-header`).html(number);
  }

  $(".button-song").click(function() {
    let classes = $(this).parents();
    let buttonParentID = classes[2].id; //finds the id of the parent class where button was clicked
    let findAttribute = $(`#${buttonParentID}`).find("#Name"); //finds the attribute under this id
    let getNameOfSong = findAttribute[0].textContent; //gets text content
    $("#SongName").text("Sharing Song:  " + getNameOfSong); //adds the name of the song to the popup

    let findSongid = $(`#${buttonParentID}`)
      .find("input#songid")
      .val(); //finds song id for form to then send back for us to use\
    $("#passBackId").attr("value", findSongid); //sends the id to the input field in the form
  });

  $(".sharing-specific-song").click(function(event) {
    event.preventDefault();
    let formData = $("form#form-submit-comment").serializeArray();
    let SharingObject = {};
    for (let i = 0; i < formData.length; i++) {
      let variableName = formData[i].name;
      let variableData = formData[i].value;
      SharingObject[`${variableName}`] = variableData;
    }

    //   console.log(SharingObject)

    $.ajax({
      //ajax call to the songs route
      type: "Post",
      url: "/songs",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(SharingObject),
      success: function(data) {
        console.log("shared: ", data);
      },
      error: function() {
        console.log("Error hitting the post route for comments");
      }
    });

    $("#ModalCenter").modal("hide");
  });
})(jQuery);
function logOut() {
  document.cookie = "";
  location.href = "/";
  console.log("cookie?", document.cookie);
}
