import { createContext, useState, useCallback } from "react";

export const CartContext = createContext();

const CART_STORAGE_KEY = "cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error parsing cart data from localStorage:", error);
      return [];
    }
  });

  // Вспомогательная функция для сохранения корзины в localStorage
  const saveCartToStorage = useCallback((updatedCart) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, []);

  const addToCart = useCallback(
    (product) => {
      if (!product || typeof product !== 'object' || !product.id) {
        console.error("Invalid product:", product);
        return;
      }

      setCart((prevCart) => {
        // Убедимся, что prevCart является массивом
        const safeCart = Array.isArray(prevCart) ? prevCart : [];
        const existingItem = safeCart.find((item) => item.id === product.id);

        // Безопасное копирование продукта, убеждаемся, что цена всегда число
        const safeProduct = {
          ...product,
          price: typeof product.price === 'number' ? product.price : Number(product.price) || 0
        };

        const updatedCart = existingItem
          ? safeCart.map((item) =>
              item.id === product.id
                ? { 
                    ...item, 
                    quantity: (item.quantity || 0) + 1 
                  }
                : item
            )
          : [...safeCart, { ...safeProduct, quantity: 1 }];

        saveCartToStorage(updatedCart);
        return updatedCart;
      });
    },
    [saveCartToStorage]
  );

  const removeFromCart = useCallback(
    (productId) => {
      if (!productId) return;

      setCart((prevCart) => {
        // Убедимся, что prevCart является массивом
        const safeCart = Array.isArray(prevCart) ? prevCart : [];
        
        const updatedCart = safeCart
          .map((item) =>
            item.id === productId && item.quantity > 0
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0);

        saveCartToStorage(updatedCart);
        return updatedCart;
      });
    },
    [saveCartToStorage]
  );

  const removeProductCompletely = useCallback(
    (productId) => {
      if (!productId) return;
      
      setCart((prevCart) => {
        // Убедимся, что prevCart является массивом
        const safeCart = Array.isArray(prevCart) ? prevCart : [];
        
        const updatedCart = safeCart.filter((item) => item.id !== productId);
        saveCartToStorage(updatedCart);
        return updatedCart;
      });
    },
    [saveCartToStorage]
  );

  const clearCart = useCallback(() => {
    setCart([]);
    saveCartToStorage([]);
  }, [saveCartToStorage]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        removeProductCompletely,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
