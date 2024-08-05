"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from '@nextui-org/react';
import { CancelBar } from '@/components/layout/cancel';
import { useConfettiStore } from '@/hooks/useConffetti';

const PagoPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [originalTotal, setOriginalTotal] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [couponMessageColor, setCouponMessageColor] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [ccv, setCcv] = useState('');
  const [address, setAddress] = useState('');
  const confetti = useConfettiStore();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetch(`https://localhost:7085/api/CarritoCompras/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al obtener el carrito');
          }
          return response.json();
        })
        .then((data) => {
          setCarrito(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (carrito) {
      //@ts-ignore
      const subtotal = carrito.listaDeProductos.reduce((acc, producto) => acc + producto.precio, 0);
      const iva = subtotal * 0.16;
      const total = subtotal + iva;
      setTotal(total);
      setOriginalTotal(total);
    }
  }, [carrito]);

  console.log('carrito:', carrito); 

  const handleFinalPay = () => {
    if (!carrito) {
      return;
    }

    console.log('carrito:', carrito); 
     //@ts-ignore
    const orderItems = carrito.listaDeProductos.map(producto => ({
      bookId: producto.tituloLibro, // Enviar como string
      quantity: 1, // Ajusta según tu lógica
      unitPrice: producto.precio,
      totalPrice: producto.precio
    }));

    const lastFourDigits = cardNumber.slice(-4);

    if (lastFourDigits.length !== 4) {
      setCouponMessage('El número de tarjeta es inválido');
      setCouponMessageColor('text-red-500');
      return;
    }

    const orderData = {
      orderDate: new Date().toISOString(),
      totalAmount: originalTotal,
      discountAmount: discount,
      finalAmount: total,
      couponId: "100OFF",
      paymentType: 'tarjeta',
      CardLast4Digits: lastFourDigits,
      address: address,
      orderItems: orderItems
    };

    console.log('Enviando orden:', orderData);

    fetch('https://localhost:7061/api/Order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al guardar la orden');
        }
        return response.json();
      })
      .then(data => {
        console.log('Orden guardada exitosamente:', data);
        confetti.onOpen(); // Mostrar confetti al guardar la orden exitosamente
        router.push(`/confirmacion?id=${data}`); // Redirigir a la página de confirmación con el ID de la orden
      })
      .catch(error => {
        console.error('Error al guardar la orden:', error);
      });
  };

  const handleApplyCoupon = () => {
    if (!coupon) {
      setCouponMessage('Introduce un cupón');
      setCouponMessageColor('text-red-500');
      return;
    }

    fetch(`https://localhost:7162/api/Cupones/getbycode/${coupon}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess && data.result) {
          const currentDate = new Date();
          const expirationDate = new Date(data.result.fechaExpiracion);

          if (expirationDate < currentDate) {
            setCouponMessage('El cupón ha expirado');
            setCouponMessageColor('text-red-500');
            return;
          }

          const descuento = data.result.porcentajeDescuento / 100;
          let descuentoAplicado = total * descuento;
          if (descuentoAplicado > data.result.topeDescuento) {
            descuentoAplicado = data.result.topeDescuento;
          }
          setDiscount(descuentoAplicado);
          setTotal(total - descuentoAplicado);
          confetti.onOpen();
          setCouponMessage('Cupón aplicado con éxito');
          setCouponMessageColor('text-green-500');
          setAppliedCoupon(data.result);
        } else {
          setCouponMessage('Cupón no válido');
          setCouponMessageColor('text-red-500');
        }
      })
      .catch((error) => {
        console.error('Error al aplicar el cupón:', error);
        setCouponMessage('Error al aplicar el cupón');
        setCouponMessageColor('text-red-500');
      });
  };

  const handleRemoveCoupon = () => {
    setTotal(originalTotal);
    setDiscount(0);
    setCoupon('');
    setAppliedCoupon(null);
    setCouponMessage('');
    setCouponMessageColor('');
  };

  if (loading) {
    return (
      <>
      <CancelBar/>
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8 mt-20">
        <div className="w-full lg:w-2/3">
          <Card className="bg-muted/50 dark:bg-card">
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-32 h-8 rounded-lg" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 space-y-2">
                <Skeleton className="h-6 w-1/2 rounded-lg" />
                <Skeleton className="h-6 w-3/4 rounded-lg" />
                <Skeleton className="h-6 w-1/4 rounded-lg" />
              </div>
              <div className="mb-4">
                <Skeleton className="h-6 w-full rounded-lg mb-6" />
                <Skeleton className="h-6 w-full rounded-lg mb-6" />
                <Skeleton className="h-6 w-full rounded-lg mb-6" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card className="bg-muted/50 dark:bg-card">
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-48 h-8 rounded-lg" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 space-y-2">
                <Skeleton className="h-6 w-full rounded-lg" />
                <Skeleton className="h-6 w-full rounded-lg mb-6" />
                <Skeleton className="h-6 w-full rounded-lg mb-6" />
                <Skeleton className="h-6 w-full rounded-lg mb-6" />
                <Skeleton className="h-6 w-full rounded-lg mb-6" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-12 w-full rounded-lg" />
            </CardFooter>
          </Card>
        </div>
      </div>
      </>
    );
  }
  if (error) {
    return <p>{error}</p>;
  }

  if (!carrito) {
    return <p>Carrito no encontrado</p>;
  }

  return (
    <>
    <CancelBar/>
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8 mt-20">
      <div className="w-full h-80 lg:w-2/3">
        <Card className="bg-muted/50 dark:bg-card h-[502px] shadow-2xl">
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              { 
              //@ts-ignore
              carrito.listaDeProductos.map((producto, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold">{producto.tituloLibro}</p>
                    <p className="text-gray-500">{producto.autorLibro}</p>
                  </div>
                  <p>${producto.precio.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <hr className="mb-6" />
            <div className="mb-4">
              <div className="flex justify-between mb-6">
                <span>Subtotal:</span>
                <span>${(total / 1.16).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-6">
                <span>IVA (16%):</span>
                <span>${(total - total / 1.16).toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-bold mb-6">
                  <span>Descuento aplicado:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold mb-6">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
             
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full lg:w-1/3">
        <Card className="bg-muted/50 dark:bg-card h-[502px] shadow-2xl">
          <CardHeader>
            <CardTitle>Información de Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <label className="block mb-2">Número de tarjeta</label>
              <input
                type="text"
                className="border p-2 w-full mb-2"
                placeholder="Introduce el número de tarjeta"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <label className="block mb-2">Fecha de caducidad</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="border p-2 w-full"
                  placeholder="MM/AA"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                <input
                  type="text"
                  className="border p-2 w-full"
                  placeholder="CCV"
                  value={ccv}
                  onChange={(e) => setCcv(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Dirección</label>
              <input
                type="text"
                className="border p-2 w-full"
                placeholder="Introduce tu dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="text"
                className="border p-2 w-full"
                placeholder="Introduce tu cupón"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                disabled={!!appliedCoupon}
              />
              {appliedCoupon ? (
                <button
                  onClick={handleRemoveCoupon}
                  className="bg-red-500 text-white py-2 px-4 rounded ml-2"
                >
                  Eliminar
                </button>
              ) : (
                <button
                  onClick={handleApplyCoupon}
                  className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
                >
                  Aplicar
                </button>
              )}
            </div>
            {couponMessage && (
              <p className={`mt-2 ${couponMessageColor}`}>{couponMessage}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleFinalPay}
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
              Pagar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
    </>
  );
};

export default PagoPage;
