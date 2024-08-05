"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";


export const HeroSection = () => {
  const { theme } = useTheme();
  return (
    <section className="container w-full">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-20"
      >
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2 text-primary">
              <Badge>AVENTURA15</Badge>
            </span>
            <span> 15% DE DESCUENTO </span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
               Descubre tu próxima 
              <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
              aventura
              </span>
              literaria
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {`Únete a nuestra comunidad de lectores apasionados. Accede a una selección exclusiva de libros, reseñas y recomendaciones personalizadas.`}
          </p>

          <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }} className="space-y-4 md:space-y-0 md:space-x-4 gap-8">

              <Button className="w-5/6 md:w-1/4 font-bold group/arrow">
                Explorar Libros
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Button>
 
              <Button
                asChild
                variant="secondary"
                className="w-5/6 md:w-1/4 font-bold"
              >
                <Link
                  href="https://github.com/nobruf/shadcn-landing-page.git"
                  target="_blank"
                >
                  Destacados
                </Link>
              </Button>
            </motion.div>
        </div>

        <div className="relative group mt-14">
          <div className="absolute top-1 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-black/50 rounded-full blur-3xl"></div>
          <Image
            width={1200}
            height={1200}
            className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary  border-t-primary/30"
            src={
              theme === "light"
                ? "/hero/hero-img.png"
                : "/hero/hero-img.png"
            }
            alt="dashboard"
          />

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </motion.div>
    </section>
  );
};
