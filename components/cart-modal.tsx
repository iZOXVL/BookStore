// components/CartModal.tsx
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import useTempCart from '../hooks/useTempCart';

const CartModal = ({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (isOpen: boolean) => void }) => {
  const { cart, loading } = useTempCart();


  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Carrito de Compras</ModalHeader>
            <ModalBody>
              {cart.length === 0 ? (
                <p>No hay libros en el carrito.</p>
              ) : (
                <ul>
                  {cart.map((id, index) => (
                    <li key={index}>{id}</li>
                  ))}
                </ul>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
              <Button color="primary" disabled={loading}>
                Pagar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CartModal;
