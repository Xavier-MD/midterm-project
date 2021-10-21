// NIKE ITEM HANDLER

$(document).ready(() => {

  /* Function: Creates Markup For A Given Inventory Item */
  const createNikeElement = function(itemObject) {
    const $nikeItem = `
      <div class="item">
          <img class="item-image" src=${pullPicture}>
          <div class="item-details">
            <span class="item-name">${pullName}</span>
            <span class="item-price">${pullName}</span>
          </div>
          <span class="item-description">${pullDescription}</span>
          <span class="item-post-time">${timeago.format(itemObject.created_at)}</span>
        </div>
      `;
    return $nikeItem;
  };

  /* Function: Combines Multiple Nike Items & Appends Them To 'section.listings-nike scrolling-box' In 'index.ejs' */
  const renderNikeItems = function(items) {
    let nikeItemsToAdd = ``;
    for (let item of items) {
      nikeItemsToAdd = `
      ${createNikeElement(item)}
      ${nikeItemsToAdd}
      `;
    }
    $('section.listings-nike scrolling-box').prepend(nikeItemsToAdd);
  };

  /* Submits An Ajax Get Request To /nike */
  const loadNikeItems = function() {
    const nikeItemsUrl = "http://localhost:8080/nike";
    $.ajax({url: nikeItemsUrl, method: 'GET'})
      .then(function(response) {
        renderNikeItems(response);
      });
  };

  /* Load All Nike Items Upon Realoading The Page */
  loadNikeItems();

});
