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

  // Delete Button Coding

  $(".scrolling-box").on('click','.item-delete',function(e) {
    e.preventDefault();
    const dataId = $(this).attr("data-id");
    console.log("This works when pressing delete", dataId);
    $.ajax({
      url: "http://localhost:8080/api/items/"+dataId,
      method: "POST",
      success: function(result) {
        alert("Item Deleted");
        $(".scrolling-box").empty();
        loadItems();
      },
      error: function(error) {
      }
    });
  });

  // Buy Button Coding

  $(".scrolling-box").on('click','.item-buy',function(e) {
    e.preventDefault();
    const receipt = Math.floor(100000 + Math.random() * 900000);
    const dataId = $(this).attr("data-id");
    console.log("This works when pressing buy", dataId);
    $.ajax({
      url: "http://localhost:8080/api/items/"+dataId,
      method: "POST",
      success: function(result) {
        alert(`You have purchased this item! Your receipt number is ${receipt}`);
        $(".scrolling-box").empty();
        loadItems();
      },
      error: function(error) {
      }
    });
  });
});
