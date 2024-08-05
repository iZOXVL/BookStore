"use client";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Link from "next/link";
import Image from "next/image";
import LottieIcon from "../lotties";

// Importar los archivos de Lottie
import libroAnimation from '../../public/icons/book.json';
import destacadosAnimation from '../../public/icons/mark.json';
import ofertasAnimation from '../../public/icons/off.json';
import bolsaAnimation from '../../public/icons/bag.json';
import { useCart } from '../../context/cart-context';
import usePay from "@/hooks/usePay";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";



export const Navbar = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { handlePay, subtotal, iva, total } = usePay();

  const handlePayment = async () => {
    const success = await handlePay();
    if (success) {
      onOpenChange(); // Close the modal
    }
  };

  // Estados de hover para cada enlace
  const [hoverLibros, setHoverLibros] = useState(false);
  const [hoverDestacados, setHoverDestacados] = useState(false);
  const [hoverOfertas, setHoverOfertas] = useState(false);
  const [hoverCarrito, setHoverCarrito] = useState(false);

  return (
    
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-3xl flex justify-center items-center p-2 backdrop-blur-md bg-card">
      <div className="flex items-center w-full justify-center">
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex gap-24">
            <NavigationMenuLink href="#books">
              <div
                onMouseEnter={() => setHoverLibros(true)}
                onMouseLeave={() => setHoverLibros(false)}
                className="text-base px-2 relative group flex items-center cursor-pointer"
              >
                <LottieIcon
                  animationData={libroAnimation}
                  style={{ width: 22, height: 22 }}
                  play={hoverLibros}
                />
                <span className="ml-2 mt-[0.5px]">Libros</span>
                <div
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary scale-x-0 hover:scale-50 origin-left transition-transform duration-300"
                />
              </div>
            </NavigationMenuLink>
            <NavigationMenuLink >
              <div
                onMouseEnter={() => setHoverDestacados(true)}
                onMouseLeave={() => setHoverDestacados(false)}
                className="text-base px-2 relative group flex items-center cursor-pointer"
              >
                <LottieIcon
                  animationData={destacadosAnimation}
                  style={{ width: 22, height: 22 }}
                  play={hoverDestacados}
                />
                <span className="ml-2 mt-[0.5px]">Destacados</span>
                <div
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary scale-x-0 hover:scale-50 origin-left transition-transform duration-300"
                />
              </div>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>

        <Link href="/" className="font-bold text-lg flex items-center mx-4">
          <Image
            width={75}
            height={75}
            className="mx-24 my-3"
            alt="Aura logo"
            src="/logo.png"
          />
        </Link>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex gap-24">
            <NavigationMenuLink >
              <div
                onMouseEnter={() => setHoverOfertas(true)}
                onMouseLeave={() => setHoverOfertas(false)}
                className="text-base px-2 relative group flex items-center cursor-pointer"
              >
                <LottieIcon
                  animationData={ofertasAnimation}
                  style={{ width: 22, height: 22 }}
                  play={hoverOfertas}
                />
                <span className="ml-2 mt-[0.5px]">Ofertas</span>
                <div
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"
                />
              </div>
            </NavigationMenuLink>
            <NavigationMenuLink >
              <div
                onMouseEnter={() => setHoverCarrito(true)}
                onMouseLeave={() => setHoverCarrito(false)}
                className="text-base px-2 relative group flex items-center cursor-pointer bg-primary p-2 rounded-lg"
              >
                <button onClick={onOpen} className="text-base px-2 relative group flex items-center cursor-pointer">
                <LottieIcon
                  animationData={bolsaAnimation}
                  style={{ width: 22, height: 22 }}
                  play={hoverCarrito}
                />
              <span className="ml-2 mt-[0.5px]">Carrito</span>
              </button>
                <div
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"
                />
              </div>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" scrollBehavior={"inside"}>
      <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Carrito de Compras</ModalHeader>
              <ModalBody>
                {cart.length === 0 ? (
                  <p>No hay libros en el carrito.</p>
                ) : (
                  cart.map((book) => (
                    <div key={book.id} className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <Image
                          src={`data:image/jpeg;base64,${book.portadaBase64}`}
                          alt={book.titulo}
                          width={50}
                          height={50}
                          className="object-cover rounded-md"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg">{book.titulo}</h3>
                          <p className="text-gray-500">${book.precio.toFixed(2)}</p>
                          <p className="text-gray-500">Cantidad: {book.cantidad}</p>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(book.id)} className="text-red-500">
                        Eliminar
                      </button>
                    </div>
                  ))
                )}
                <div className="mt-4">
                  <div className="flex justify-between mb-6">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-6">
                    <span>IVA (16%):</span>
                    <span>${iva.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold mb-6" >
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="warning" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="danger" variant="flat" onPress={clearCart}>
                  Vaciar
                </Button> 
                <Button color="success" variant="flat" onPress={handlePayment}>
                  Pagar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </header>
  );
};
