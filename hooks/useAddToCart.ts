// hooks/useAddToCart.ts
import { useCart } from '../context/cart-context';



const useAddToCart = () => {
  const { addToCart } = useCart();

  const addBookToCart = (book: { id: string, titulo: string, precio: number, portadaBase64: string }) => {
    addToCart(book);
  };

  return { addBookToCart };
};

export default useAddToCart;
