import React from 'react';

function ShoppingCart({ cart, onRemoveFromCart }) {
  return (
    <div className="shopping-cart-container">
      <h3>Carrito de Compras 🎮</h3>
      <p className="cart-count">Juegos seleccionados: <strong>{cart.length}</strong></p>

      {/* Renderizado Condicional: Mensaje dinámico si el carrito está vacío */}
      {cart.length === 0 ? (
        <div className="empty-cart-message">
          <p>🛒 El carrito de juegos está vacío.</p>
          <span>¡Explora el catálogo y agrega tus videojuegos favoritos!</span>
        </div>
      ) : (
        <ul className="cart-list">
          {cart.map((item, index) => {
            const itemPrice = item.offerPrice || item.price || 0;
            return (
              <li key={`${item.id}-${index}`} className="cart-item">
                <div className="cart-item-details">
                  <span className="cart-item-title">{item.name}</span>
                  <span className="cart-item-price">${itemPrice.toLocaleString('es-CL')}</span>
                </div>
                <button
                  className="btn-delete"
                  onClick={() => onRemoveFromCart(index)}
                  title="Eliminar videojuego"
                >
                  Eliminar
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ShoppingCart;