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
import bolsaAnimation from '../../public/icons/arrow.json';
import { useCart } from '../../context/cart-context';
import usePay from "@/hooks/usePay";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";



export const ReturnBar = () => {
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
            className="mx-36 ml-[22rem] my-3"
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
        
            
                <div
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"
                />
              </div>
            </NavigationMenuLink>
            <NavigationMenuLink href="/" >
              <div
                onMouseEnter={() => setHoverCarrito(true)}
                onMouseLeave={() => setHoverCarrito(false)}
                className="text-base px-2 relative group flex items-center cursor-pointer bg-primary p-2 rounded-lg"
              >
                <button className="text-base px-2 relative group flex items-center cursor-pointer">
                <LottieIcon
                  animationData={bolsaAnimation}
                  style={{ width: 22, height: 22 }}
                  play={hoverCarrito}
                />
              <span className="ml-2 mt-[0.5px]">Regresar a la tienda</span>
              </button>
                <div
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary scale-x-0 hover:scale-x-100 origin-left transition-transform duration-300"
                />
              </div>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

    </header>
  );
};
