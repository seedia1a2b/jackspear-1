
export let cart = JSON.parse(localStorage.getItem('cart')) || [];


export function cartQuantity(quantity=0){
  let cartQuantity = quantity;
  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity;
  })
  console.log(cartQuantity);
  return cartQuantity;
}

export function updateCartQuantity(id,value){
  cart.forEach((item)=>{
    if(item.productId === id){
      item.quantity = value
      console.log('Updated!!')
    }
  })
  saveToStorage(cart);
}

export function addToCart(button){
  let matchingItem;
  const productId = button.dataset.productId;
  cart.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  })

  const unitValue = selectedValue(productId);
  if(matchingItem){
    matchingItem.quantity += unitValue;
  }else{
    cart.push({
      productId: productId,
      quantity: unitValue,
      deliveryOption: 1
    })
  }
  cartQuantity();
  saveToStorage();
}

export function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

function selectedValue(productId){
  const select = document.querySelector(`.option-selected-id-${productId}`);
  let unitValue = Number(select.options[select.selectedIndex].value)
  return unitValue;
}

export function ItemsInCart(){
  let count = 0;
  cart.forEach(()=>{
    count++;
  })
  return count;
}

export function removeFromCart(productId){
  const newArray = [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      newArray.push(cartItem);
    }
  })
  cart = newArray;
  saveToStorage(cart)
}