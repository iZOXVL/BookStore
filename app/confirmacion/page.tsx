"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from '@nextui-org/react';
import { CancelBar } from '@/components/layout/cancel';
import useOrder from '@/hooks/useOrder';
import LottieIcon from '@/components/lotties';
import checkAnimation from '../../public/icons/check.json';
import { ReturnBar } from '@/components/layout/return';
import { useConfettiStore } from '@/hooks/useConffetti';

const ConfirmacionPage = () => {
  const [hoverCarrito, setHoverCarrito] = useState(true);
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const confetti = useConfettiStore();
  //@ts-ignore
  const { order, loading, error } = useOrder(orderId);

  const formatDate = (dateString: string) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    //@ts-ignore
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  useEffect(() => {
    if (order) {
      confetti.onOpen();
    }
  }, [order]);

  if (loading) {
    return (
      <>
        <ReturnBar/>
        <div className="container mx-auto p-4 flex justify-center mt-20">
          <Card className="bg-muted/50 dark:bg-card w-full max-w-lg">
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
      </>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!order) {
    return <p>Orden no encontrada</p>;
  }

  return (
    <>
      <ReturnBar/>
      <div className="container mx-auto p-4 flex justify-center mt-5">
        <Card className="bg-muted/50 dark:bg-card w-full max-w-lg shadow-2xl">
          <CardHeader className="flex flex-col items-center">
            <LottieIcon
              animationData={checkAnimation}
              style={{ width: 80, height: 80 }}
              play={hoverCarrito}
            />
            <CardTitle>Confirmación de Compra</CardTitle>
            <CardDescription>
              Tu orden ha sido procesada exitosamente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">Fecha de Orden:</p>
                  <p>{
                  //@ts-ignore
                  formatDate(order.orderDate)}</p>
                </div>
                <div>
                  <p className="font-semibold">ID de Orden:</p>
                  <p>{
                  //@ts-ignore
                  order.orderId}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">Monto Total:</p>
                  <p>${
                  //@ts-ignore
                  order.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="font-semibold">Monto de Descuento:</p>
                  <p>${
                  //@ts-ignore
                  order.discountAmount.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">Monto Final:</p>
                  <p>${
                  //@ts-ignore
                  order.finalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="font-semibold">Cupón:</p>
                  <p>{
                  //@ts-ignore
                  order.couponId}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">Tipo de Pago:</p>
                  <p>{
                  //@ts-ignore
                  order.paymentType}</p>
                </div>
                <div>
                  <p className="font-semibold">Últimos 4 dígitos:</p>
                  <p>{
                  //@ts-ignore
                  order.cardLast4Digits}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">Dirección:</p>
                  <p>{
                  //@ts-ignore
                  order.address}</p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Items de la Orden:</h3>
                {
                //@ts-ignore
                order.orderItems.map((item, index) => (
                  <Card key={index} className="mb-2">
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{item.bookId}</p>
                        </div>
                        <div className='mt-3'>
                          <p  className='mt-3'>Cantidad: {item.quantity}</p>
                          <p className='mt-3'>Precio Unitario: ${item.unitPrice.toFixed(2)}</p>
                          <p className='mt-3'>Precio Total: ${item.totalPrice.toFixed(2)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ConfirmacionPage;
