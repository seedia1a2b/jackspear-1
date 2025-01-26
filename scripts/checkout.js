import { cart, removeFromCart, updateCartQuantity, cartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./money.js";
import { paymentSummary, updatePaymentCart } from "./payment.js";
import { deleveryOption, setDeliveryDate } from "./deliveryOptions.js";
import  dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

let today = dayjs();
export let deliveryDate1 = today.add(0, 'days');
export let deliveryDate2 = today.add(3, 'days');
export let deliveryDate3 = today.add(7, 'days');

paymentSummary();
orderSummary();
deleveryOption();
setDeliveryDate();
function orderSummary(){
  let html = '';
  cart.forEach((cartItem) =>{
    let cartElement;
    products.forEach((product)=>{
      if(cartItem.productId === product.id){
        cartElement = product;
      }
    })
    
    cartItem.deliveryOption
    html += `
      <div class="cart-item-container js-item-container-${cartItem.productId}">
        <div class="delivery-date js-delivery-date-${cartItem.productId}" data-delivery-date="${cartItem.productId}">
        </div>
  
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${cartElement.image}">
  
          <div class="cart-item-details">
            <div class="product-name">
              ${cartElement.name}
            </div>
            <div class="product-price">
              $${formatCurrency(cartElement.priceCents)}
            </div>
            <div class="product-quantity js-product-quantity-${cartElement.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${cartItem.productId}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${cartItem.productId}">
                Update
              </span>

              <input class="js-update-link-quantity js-quantity-input-${cartItem.productId}" data-input-product-id="${cartItem.productId}">
              <span class="link-primary js-save-quantity" data-save-product-id="${cartItem.productId}">save</span>
              <span class="delete-quantity-link link-primary js-delete-button" data-deleted-product-id="${cartItem.productId}">
                Delete
              </span>
            </div>
          </div>
  
          <div class="delivery-options">

            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" ${cartItem.deliveryOption === 1 ? "checked" : ''}
                class="delivery-option-input delivery-option-input-1"
                data-cart-delivery-option-id="${cartItem.productId}"
                name="delivery-option-${cartElement.id}">
              <div>
                <div class="delivery-option-date js-delivery-option-first"></div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio" ${cartItem.deliveryOption === 2 ? "checked" : ''}
                class="delivery-option-input delivery-option-input-2"
                data-cart-delivery-option-id="${cartItem.productId}"
                name="delivery-option-${cartElement.id}">
              <div>
                <div class="delivery-option-date js-delivery-option-second"></div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio" ${cartItem.deliveryOption === 3 ? "checked" : ''}
                class="delivery-option-input delivery-option-input-3"
                data-cart-delivery-option-id="${cartItem.productId}"
                name="delivery-option-${cartElement.id}">
              <div>
                <div class="delivery-option-date js-delivery-option-last"></div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    `
  })

  document.querySelector('.js-order-summary')
    .innerHTML = html;
  paymentSummary();
  setDeliveryDate();
}

setDeliveryOptionSelectors();

function setDeliveryOptionSelectors(){
  document.querySelectorAll('.js-delivery-option-first')
    .forEach((delivery) =>{
      delivery.innerHTML = deliveryDate1.format('dddd, MMMM D');
    })

  document.querySelectorAll('.js-delivery-option-second')
    .forEach((delivery) =>{
      delivery.innerHTML = deliveryDate2.format('dddd, MMMM D');
    })

  document.querySelectorAll('.js-delivery-option-last')
    .forEach((delivery) =>{
      delivery.innerHTML = deliveryDate3.format('dddd, MMMM D');
    })
}
  

document.querySelectorAll('.js-delete-button')
  .forEach((button) =>{
    const id = button.dataset.deletedProductId
    button.addEventListener('click', ()=>{
      removeFromCart(id);
      updateItemCount();
      const itemContainer = document.querySelector(`.js-item-container-${id}`)
      itemContainer.remove();
      paymentSummary();
    })
  })
  
  
function updateItemCount(){
  const itemCount = document.querySelector('.js-items-count-banner')
  itemCount.innerHTML = `${cartQuantity()} items`;
}
updateItemCount();


document.querySelectorAll('.js-update-link')
  .forEach((updateLink)=>{
    updateLink.addEventListener('click', ()=>{
      const updateLinkId = updateLink.dataset.productId;
      addClass(updateLinkId); 
    });
  })

document.querySelectorAll('.js-save-quantity')
  .forEach((saveLink)=>{
    saveLink.addEventListener('click', ()=>{
      const saveProductId = saveLink.dataset.saveProductId
      removeClass(saveProductId);
    })
  })

document.querySelectorAll('.js-update-link-quantity')
  .forEach((updateInput)=>{
    updateInput.addEventListener('keydown', (event)=>{
      const id = updateInput.dataset.inputProductId
      if(event.key === 'Enter'){
        removeClass(id);
      }
    })
  })

function removeClass(saveProductId){
  const quantityLabel = document.querySelector(`.js-quantity-label-${saveProductId}`);
  const container = document.querySelector(`.js-product-quantity-${saveProductId}`).classList;
  const newValue = Number(document.querySelector(`.js-quantity-input-${saveProductId}`).value);
  
  let isValid = validation(newValue);
  if(isValid){
    quantityLabel.innerHTML = newValue;
    cartQuantity(newValue);
    updateCartQuantity(saveProductId,newValue);
    updateItemCount();
    paymentSummary();
  }else{
    alert('Quantity most be greater than 0 and less than 1000')
    quantityLabel.innerHTML = 1;

  }
  container.remove('is-editing-quantity');
}

function validation(newValue){
  if(newValue <= 0 || newValue >1000){
    return false;
  }
  return true;
}

function addClass(updateLinkId){
  const container = document.querySelector(`.js-product-quantity-${updateLinkId}`).classList;
  container.add('is-editing-quantity')
}