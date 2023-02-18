export function addBasketsCartToCheckouts(baskets, checkouts) {
    const result = [];
    for(let i = 0;i < checkouts.length;i++) {
      const checkout = checkouts[i];
      const checkoutResult = { ...checkout, cart: [] };
      let totalPrice = 0;
      for(let j = 0;j < baskets.length;j++) {
        const basket = baskets[j];
        if(checkout.cart.includes(basket.id)) {
          if(!basket.product?.product?.USA_product) {
            totalPrice += (+basket.total);
            checkoutResult.cart.push(basket);
          }
        }
      }
      if(checkoutResult?.cart?.length > 0) {
        checkoutResult.totalPrice = totalPrice;
        totalPrice = 0;
        result.push(checkoutResult);
      }
    }
    return result;
}

export function addUSABasketsCartToCheckouts(baskets, checkouts) {
    const result = [];
    for(let i = 0;i < checkouts.length;i++) {
      const checkout = checkouts[i];
      const checkoutResult = { ...checkout, cart: [] };
      let totalPrice = 0;
      for(let j = 0;j < baskets.length;j++) {
        const basket = baskets[j];
        if(checkout.cart.includes(basket.id)) {
          if(basket.product?.product?.USA_product) {
            totalPrice += (+basket.total);
            checkoutResult.cart.push(basket);
          }
        }
      }
      if(checkoutResult?.cart?.length > 0) {
        checkoutResult.totalPrice = totalPrice;
        totalPrice = 0;
        result.push(checkoutResult);
      }
    }
    return result;
}