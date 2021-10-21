$().ready(() => {


  // $("#modal").hide();

// $("#modal").click(function() {

//   alert("modal clicked");
//   // $("#modal").show();

//   const displayModal = function(itemObject) {


//   }
// })

$("#create-new-listing").submit(function(event) {
event.preventDefault();
console.log("IT WORKS");

const serializedData = $(this).serialize();
console.log(`Serialized data ${serializedData}`);
$.post(
  "/api/items",
  serializedData,
)

console.log("Hello");
});
});
