"use client"; 
import { useState, useEffect } from 'react';

const useOrder = (orderId: string) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetch(`https://localhost:7061/api/Order/${orderId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al obtener la orden');
          }
          return response.json();
        })
        .then((data) => {
          setOrder(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [orderId]);

  return { order, loading, error };
};

export default useOrder;
