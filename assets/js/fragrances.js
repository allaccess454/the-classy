const productImages = [
  '../assets/images/item_1.png',
  '../assets/images/item_2.png',
  '../assets/images/item_3.png',
  '../assets/images/item_4.png',
  '../assets/images/item_5.png',
  '../assets/images/item_6.png'
];

document.querySelectorAll('.product-grid .card img').forEach((image, index) => {
  if (productImages[index]) {
    image.src = productImages[index];
  }
});
