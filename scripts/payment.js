import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./money.js";

let html = '';
export function paymentSummary(){
 
  html = `  
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div class="js-payment-items"></div>
      <div class="payment-summary-money js-payment-summary-money">0</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(updateShipment())}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money js-total-before-tax"></div>
    </div>
    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money js-estimated-tax"></div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-order-total-summary"></div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>      
  `
  updatePayment();
  updatePaymentCart();
} 

function updatePayment(){
  document.querySelector('.js-payment-summary')
  .innerHTML = html;
}


export function updatePaymentCart(){
  let cartItems = 0;
  let totalPriceCents = 0 
  cart.forEach((cartItem)=>{
    products.forEach((product)=>{
      if(cartItem.productId === product.id){
        cartItems += cartItem.quantity;
        totalPriceCents += (product.priceCents * cartItem.quantity);
      }
    })
  })
  updateTotalAmount(totalPriceCents);
  updateCartItems(cartItems);
  amountBeforeTax(totalPriceCents);
}

function updateShipment(){
  let shipment = 0;
  if(cart.length !== 0){
    cart.forEach((delivery)=>{
      if(delivery.deliveryOption === 2){
        shipment += 499;
      }else if(delivery.deliveryOption === 3){
        shipment += 999;
      }else if(delivery.deliveryOption === 1){
        shipment += 0;
      }
    })
    console.log(`shipment: ${shipment}`)
    return shipment;
  }

  return shipment;
}


function amountBeforeTax(totalPriceCents){
  const shipment = updateShipment();
  console.log(shipment);
  totalPriceCents = totalPriceCents + shipment;
  document.querySelector('.js-total-before-tax')
    .innerHTML = `$${formatCurrency(totalPriceCents)}`;
  
  const totalTax = (totalPriceCents * 0.1)

  document.querySelector('.js-estimated-tax')
    .innerHTML = `$${formatCurrency(totalTax)}`;

  calculateOrderTotal(totalPriceCents, totalTax)
}

function calculateOrderTotal(totalPriceCents, totalTax){
  const orderTotal = totalPriceCents + totalTax;

  document.querySelector('.js-order-total-summary')
    .innerHTML = `$${formatCurrency(orderTotal)}`
}

function updateTotalAmount(totalPriceCents){
  const amount = formatCurrency(totalPriceCents);
  document.querySelector('.js-payment-summary-money')
    .innerHTML = `$${amount}`;
}

function updateCartItems(cartItems){
  document.querySelector('.js-payment-items')
    .innerHTML = `Items (${cartItems}):`;

}


