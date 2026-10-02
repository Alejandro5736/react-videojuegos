import React from 'react';

function CartTotal({ cart }) {
  // Cálculo dinámico del monto total sumando los precios de los juegos agregados
  const totalAmount = cart.reduce((sum, item) => {
    const itemPrice = item.offerPrice || item.price || 0;
    return sum + itemPrice;
  }, 0);

  return (
    <div className="cart-total-container">
      <h4>Total a pagar:</h4>
      <p className="total-price">${totalAmount.toLocaleString('es-CL')}</p>
    </div>
  );
}

export default CartTotal;