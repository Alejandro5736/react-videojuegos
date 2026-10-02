import React from 'react';

function ProductList({ products, cart, onAddToCart }) {
  // Función para verificar si un videojuego ya está en el carrito
  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <div className="product-grid">
      {products.map((game) => {
        const inCart = isProductInCart(game.id);

        return (
          <div key={game.id} className="product-card">
            <img src={game.image} alt={game.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-title">{game.name}</h3>
              <p className="product-description">{game.description}</p>
              {game.genre && <span className="game-badge">{game.genre}</span>}

              <div className="product-pricing">
                {game.price && (
                  <span className="original-price">${game.price.toLocaleString('es-CL')}</span>
                )}
                <span className="offer-price">
                  ${(game.offerPrice || game.price || 0).toLocaleString('es-CL')}
                </span>
              </div>

              {/* Renderizado Condicional: Cambia texto y estilo si el juego ya fue agregado */}
              <button
                className={`btn-add-cart ${inCart ? 'in-cart' : ''}`}
                onClick={() => onAddToCart(game)}
              >
                {inCart ? 'En el Carrito ✓' : 'Agregar al Carrito'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;