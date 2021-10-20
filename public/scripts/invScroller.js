let images = [...document.querySelectorAll('.img')];
let slider = document.querySelector('.slider');
let sliderWidth;
let imageWidth;
let current = 0;
let target = 0;
let ease = 0.05;

/* Image Fetcher */
images.forEach((img, i) => {
  img.style.backgroundImage = `url(/images/${i + 1}.jpg)`;
});

/* Linear Interpolation Function: Start Value Gets Smaller As It Approaches End */
const linearInterpolation = function(start, end, t) {
  return start * (1 - t) + end * t;
};

/* Element Transformation Function */
const setTransform = function(element, transform) {
  element.style.transform = transform;
};

/* Function To Run On Page Load */
const init = function() {
  sliderWidth = slider.getBoundingClientRect().width;
  imageWidth = sliderWidth / images.length;
  document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`;
};

const animate = function() {
  current = parseFloat(linearInterpolation(current, target, ease)).toFixed(2);
  target = window.scrollY;
  setTransform(slider, `translateX(-${current}px)`);
  animateImages();
  requestAnimationFrame(animate);
};

const animateImages = function() {
  let ratio = current / imageWidth;
  let intersectionRatioValue;

  images.forEach((image, i) => {
    intersectionRatioValue = ratio - (i * 0.7);
    setTransform(image, `translateX(${intersectionRatioValue * 70}px)`);
  });
};

init();
animate();
