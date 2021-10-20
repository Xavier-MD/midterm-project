$(document).ready(() => {

  let scrollingBox = document.querySelector('.scrolling-box');

  $('.scroll-left').click(function() {
    scrollingBox.scrollLeft -= 400;
  });

  $('.scroll-right').click(function() {
    scrollingBox.scrollLeft += 400;
  });

});
