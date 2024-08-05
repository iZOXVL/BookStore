// components/BooksSection.tsx
"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from 'next/image';
import useFetchBooks from '../../../hooks/useGetBooks';
import useAddToCart from '../../../hooks/useAddToCart';
import { Skeleton } from "@nextui-org/react";
import { useToast } from '@chakra-ui/react'

const BooksSection = () => {
  const toast = useToast()
  const { books, loading, error } = useFetchBooks();
  const { addBookToCart } = useAddToCart();


  if (loading) {
    return (
      <section id="books" className="container lg:w-[82%] py-24 sm:py-24">
        <div className="text-center mb-8">
          <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
            Libros
          </h2>
          <h2 className="text-3xl md:text-4xl text-center font-bold">
            Nuestra Colección
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="flex flex-col gap-3">
              <Skeleton className="w-full aspect-square rounded-lg" />
              <Skeleton className="h-6 w-3/5 rounded-lg" />
              <Skeleton className="h-6 w-2/5 rounded-lg" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="books" className="container lg:w-[75%] py-24 sm:py-24">
        <div className="text-center mb-8">
          <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
            Libros
          </h2>
          <h2 className="text-3xl md:text-4xl text-center font-bold">
          Explora y descubre tu próxima aventura
        </h2>
        </div>
        <div className="flex justify-center">
          <Card className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg w-full">
            <CardHeader className="p-0 gap-0">
              <div className="h-full overflow-hidden">
              </div>
              <CardTitle className="py-6 pb-4 px-6">
                Ups, ocurrió un error al obtener los libros.
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-0 text-muted-foreground mb-6">
              <div>Por favor, intenta de nuevo más tarde.</div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="books" className="container lg:w-[75%] py-24 sm:py-24">
      <div className="text-center mb-12">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Libros
        </h2>
        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Explora y descubre tu próxima aventura
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {books.map((book) => (
          <Card key={book.libreriaMaterialId} className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg">
            <CardHeader className="p-0 gap-0">
              <div className="h-full overflow-hidden">
                <Image
                  src={`data:image/jpeg;base64,${book.portadaBase64}`}
                  alt={book.titulo}
                  width={300}
                  height={300}
                  className="w-full aspect-square object-cover saturate-0 transition-all duration-200 ease-linear size-full group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-[1.01]"
                />
              </div>
              <CardTitle className="py-6 pb-4 px-6">
                {book.titulo}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-0 text-muted-foreground mb-6">
              <div>Precio: ${book.precio.toFixed(2)}</div>
            </CardContent>
            <CardFooter className="space-x-4 mt-auto">
              
            <button
                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-all"
                onClick={() => {
                  addBookToCart({ 
                    id: book.libreriaMaterialId, 
                    titulo: book.titulo, 
                    precio: book.precio, 
                    portadaBase64: book.portadaBase64 
                  });
                }}                
               >
                Agregar al Carrito
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BooksSection;
