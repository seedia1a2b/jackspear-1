import { cart,saveToStorage } from "../data/cart.js"
import { deliveryDate1, deliveryDate2, deliveryDate3 } from "./checkout.js";
import { paymentSummary } from "./payment.js";

//export let deliveryOption = JSON.parse(localStorage.getItem('deliveryOption')) || defaultDelivery();
export function deleveryOption(){
  document.querySelectorAll('.delivery-option-input')
    .forEach((deliveryOptionInput)=>{
      deliveryOptionInput.addEventListener('click', ()=>{
        const cartId = deliveryOptionInput.dataset.cartDeliveryOptionId;
        if(deliveryOptionInput.classList.contains('delivery-option-input-1')){
          const option1 = 1;
          updateDelivery(cartId, option1);
        }else if(deliveryOptionInput.classList.contains('delivery-option-input-2')){
          const option2 = 2;
          updateDelivery( cartId,option2);
        }else if(deliveryOptionInput.classList.contains('delivery-option-input-3')){
          const option3 = 3;
          updateDelivery(cartId, option3);
        }
        paymentSummary();
      })
    })
}

export function setDeliveryDate(){
  cart.forEach((cartItem) => {
    const cartId = cartItem.productId;
    if(cartItem.deliveryOption === 1){
      console.log('in set date optioin 1')
      console.log(deliveryDate1);
      document.querySelector(`.js-delivery-date-${cartId}`)
        .innerHTML = `Delivery date: ${deliveryDate1.format('dddd, MMMM D')}`
    }else if(cartItem.deliveryOption === 2){
      console.log('in set date optioin 2')
      document.querySelector(`.js-delivery-date-${cartId}`)
        .innerHTML = `Delivery date: ${deliveryDate2.format('dddd, MMMM D')}`
    }else if(cartItem.deliveryOption === 3){
      console.log('in set date optioin 3')
      document.querySelector(`.js-delivery-date-${cartId}`)
        .innerHTML = `Delivery date: ${deliveryDate3.format('dddd, MMMM D')}`
    }

  })
}

function updateDelivery(cartId, option){
  console.log(option)
  if(option === 1){
    const cartItem = getCart(cartId);
    console.log(cartItem)
    cartItem.deliveryOption = 1;
  }else if(option === 2){
    const cartItem = getCart(cartId);
    cartItem.deliveryOption = 2;
  }else if(option === 3){
    const cartItem = getCart(cartId);
    cartItem.deliveryOption = 3;
  }
  saveToStorage();
  setDeliveryDate();
    //if it those not exist go ahead and push the cartId and the deliveryOption.
}


function getCart(cartId){
  let cartProduct;
  cart.forEach((cartItem) => {
    if(cartItem.productId === cartId){
      cartProduct = cartItem;
    }
  })
  return cartProduct;
}
