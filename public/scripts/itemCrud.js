$().ready(() => {

  /* Function: Creates Markup For A Given Item */

  $("#create-new-listing").submit(function(event) {
    event.preventDefault();
    console.log("IT WORKS");
    const serializedData = $(this).serialize();
    console.log(`Serialized data ${serializedData}`);
    $.post(
      "/api/items",
      serializedData,
    );
    console.log("Hello");
  });

  //For the Delete button Coding

  $(".scrolling-box").on('click','.item-delete',function(e) {
    e.preventDefault();
    const dataId = $(this).attr("data-id");
    console.log("This works on pressing of delete", dataId);
    $.ajax({
      url: "http://localhost:8080/api/items/"+dataId,
      method: "POST",
      success: function(result) {
        alert("Item Deleted");
        $(".scrolling-box").empty();
        //call the functions to call the data again from the Database and render it on html.
        loadItems();
      },
      error: function(error) {
      }
    });
  });

});
