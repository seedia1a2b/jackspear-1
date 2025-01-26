import { products } from "../data/products.js";
import { addToCart, cartQuantity, saveToStorage } from "../data/cart.js";
import { formatCurrency } from "./money.js";
let html = '';
products.forEach((productItem) => {


  let {id, image, name, priceCents} = productItem;
  html += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${productItem.rating.stars  * 10}.png">
        <div class="product-rating-count link-primary">
          ${productItem.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(priceCents)}
      </div>

      <div class="product-quantity-container ">
        <select class="js-select-option option-selected-id-${id}"  >
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${id}">
        Add to Cart
      </button>
    </div>
    
  `
})

updateCart();
document.querySelector('.js-product-grid')
  .innerHTML = html;

document.querySelectorAll('.js-add-to-cart')
  .forEach((buttonElement)=>{
    buttonElement.addEventListener('click',()=>{
      addToCart(buttonElement);
      updateCart();
    })
  });

function updateCart(){
  const quantity = cartQuantity();
  const buttonElement = document.querySelector('.js-cart-quantity');
  buttonElement.innerHTML = quantity;
  saveToStorage();
}









