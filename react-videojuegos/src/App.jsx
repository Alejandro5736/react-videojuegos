import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import CartTotal from './components/CartTotal';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener la API Key desde las variables de entorno de Vite
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    // Si no hay API Key configurada en .env, detener y alertar
    if (!API_KEY) {
      console.warn('No se encontró VITE_RAWG_API_KEY en el archivo .env');
    }

    const fetchGamesFromAPI = async () => {
      try {
        setIsLoading(true);
        // Petición a RAWG solicitando 8 videojuegos populares
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${API_KEY}&page_size=8&ordering=-rating`
        );

        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }

        const data = await response.json();

        // Mapeo y transformación de los datos recibidos de RAWG
        const formattedGames = data.results.map((game, index) => {
          // Precios simulados basados en el rating del juego
          const basePrice = Math.round((game.rating * 10000) + 15000);
          const discountPrice = Math.round(basePrice * 0.7);

          return {
            id: game.id,
            name: game.name,
            description: `Fecha de lanzamiento: ${game.released || 'N/A'} • Rating: ⭐ ${game.rating}/5`,
            genre: game.genres.length > 0 ? game.genres[0].name : 'Acción',
            price: basePrice,
            offerPrice: discountPrice,
            image: game.background_image || 'https://via.placeholder.com/500x300?text=Sin+Imagen'
          };
        });

        setProducts(formattedGames);
        setError(null);
      } catch (err) {
        console.error('Error al conectar con RAWG API:', err);
        setError('No se pudo cargar el catálogo desde la API de RAWG.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGamesFromAPI();
  }, [API_KEY]);

  const handleAddToCart = (game) => {
    setCart((prevCart) => [...prevCart, game]);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Tienda Gamer React 🎮</h1>
        <p className="app-subtitle">Proyecto Sumativo Semana 8 - Integración RAWG API & Hooks</p>
      </header>

      <div className="main-content">
        <section className="catalog-section">
          <h2>Catálogo de Videojuegos (RAWG API)</h2>

          {/* Renderizado Condicional: Carga, Error o Lista de Productos */}
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Conectando con la API de RAWG...</p>
            </div>
          ) : error ? (
            <div className="error-message" style={{ color: '#ef4444', textAlign: 'center', padding: '20px' }}>
              <p>{error}</p>
            </div>
          ) : (
            <ProductList
              products={products}
              cart={cart}
              onAddToCart={handleAddToCart}
            />
          )}
        </section>

        <aside className="cart-section">
          <ShoppingCart
            cart={cart}
            onRemoveFromCart={handleRemoveFromCart}
          />
          <CartTotal cart={cart} />
        </aside>
      </div>
    </div>
  );
}

export default App;