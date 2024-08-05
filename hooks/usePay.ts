// hooks/usePay.ts
"use client"; 
import { useCart } from '../context/cart-context';
import { useRouter } from 'next/navigation';

const usePay = () => {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const handlePay = async () => {
    const bookIds = cart.flatMap(book => Array(book.cantidad).fill(book.id));

    try {
      const response = await fetch('https://localhost:7085/api/CarritoCompras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ProductoLista: bookIds, FechaCreacionSesion: new Date() }),
      });

      if (!response.ok) {
        throw new Error('Error al procesar el pago');
      }

      const data = await response.json();
      const carritoId = data.idCarrito;

      // Clear the cart after successful payment
      clearCart();
      
      // Redirect to payment page with carritoId
      router.push(`/pago?id=${carritoId}`);
      return true; // Indicate success
    } catch (err) {
      //@ts-ignore
      console.error(err.message);
      return false; // Indicate failure
    }
  };

  const subtotal = cart.reduce((acc, book) => acc + book.precio * book.cantidad, 0);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  return { handlePay, subtotal, iva, total };
};

export default usePay;