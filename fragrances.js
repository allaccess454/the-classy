const productImages = [
  'item_1.png',
  'item_2.png',
  'item_3.png',
  'item_4.png',
  'item_5.png',
  'item_6.png'
];

document.querySelectorAll('.product-grid .card img').forEach((image, index) => {
  if (productImages[index]) {
    image.src = productImages[index];
  }
});
