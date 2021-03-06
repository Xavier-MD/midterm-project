// NIKE ITEM HANDLER


/* Function: Creates Markup For A Given Item */
const createItemElement = function(itemObject) {
  console.log(itemObject);
  if (!itemObject.sold) {
    const $item = `
      <div class="item">
        <img class="item-image" src=${itemObject.product_photo_url}>
        <div class="item-details">
          <span class="item-name">${itemObject.name}</span>
          <span class="item-price">${itemObject.price}</span>
        </div>
        <span class="item-description">${itemObject.description}</span>
        <span class="item-post-time">${timeago.format(itemObject.created_at)}</span>
        <div class="item-buttons">
          <button type="button" class="btn btn-primary item-buy" name="send" data-id=${itemObject.id} value="delete">Buy</button>
          <button type="button" class="btn btn-danger item-delete" name="send" data-id=${itemObject.id} value="delete">Delete</button>
        </div>
      </div>
      `;
    return $item;
  }
};

/* Function: Combines Multiple Nike Items & Appends Them To '#nike .scrolling-box' In 'index.ejs' */
const renderNikeItems = function(items) {
  let nikeItemsToAdd = ``;
  for (let item of items) {
    if (item.collection_name === 'nike') {
      nikeItemsToAdd = `
      ${createItemElement(item)}
      ${nikeItemsToAdd}
      `;
    }
  }
  $('#nike .scrolling-box').append(nikeItemsToAdd);
};

/* Function: Combines Multiple Supreme Items & Appends Them To '#supreme .scrolling-box' In 'index.ejs' */
const renderSupremeItems = function(items) {
  let supremeItemsToAdd = ``;
  for (let item of items) {
    if (item.collection_name === 'supreme') {
      supremeItemsToAdd = `
      ${createItemElement(item)}
      ${supremeItemsToAdd}
      `;
    }
  }
  $('#supreme .scrolling-box').append(supremeItemsToAdd);
};

/* Function: Combines Multiple Chanel Items & Appends Them To '#chanel .scrolling-box' In 'index.ejs' */
const renderChanelItems = function(items) {
  let chanelItemsToAdd = ``;
  for (let item of items) {
    if (item.collection_name === 'chanel') {
      chanelItemsToAdd = `
      ${createItemElement(item)}
      ${chanelItemsToAdd}
      `;
    }
  }
  $('#chanel .scrolling-box').append(chanelItemsToAdd);
};

/* Submits An Ajax Get Request To /nike */
const loadItems = function() {
  const ItemsUrl = "http://localhost:8080/api/items";
  $.ajax({url: ItemsUrl, method: 'GET'})
    .then(function(response) {
      renderNikeItems(response);
      renderSupremeItems(response);
      renderChanelItems(response);
    });
};

/* Load All Nike Items Upon Realoading The Page */
$(document).ready(() => {
  loadItems();
});
