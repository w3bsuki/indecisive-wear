"use client";

import React, { useRef, useState, useEffect } from "react";
// import Image from "next/image"; // Unused
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

export const HeroParallax = ({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Determine screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Create different parallax speeds for different rows
  const fastParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const mediumParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const slowParallax = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  // Group products into columns
  const productColumns = () => {
    const columns: Product[][] = [[], [], []];
    
    // Distribute products among columns with more in the center
    products.forEach((product, i) => {
      const columnIndex = i % columns.length;
      columns[columnIndex]?.push(product);
    });
    
    return columns;
  };

  const columns = productColumns();

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-[100svh] w-full items-center justify-center overflow-hidden bg-white",
        className
      )}
    >
      <div className="absolute inset-0 bg-white/25 z-10" />

      <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden px-4 lg:mt-0">
        {/* Product grid with parallax effect */}
        <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mx-auto z-20">
          {columns.map((column, columnIndex) => (
            <motion.div
              key={`column-${columnIndex}-${column[0]?.title || columnIndex}`}
              className="flex flex-col gap-4 md:gap-6"
              style={{
                y: columnIndex === 0 
                  ? fastParallax 
                  : columnIndex === 1 
                  ? mediumParallax 
                  : slowParallax,
              }}
            >
              {column.map((product) => (
                <ProductCard 
                  key={`product-${product.title}-${product.thumbnail}`}
                  product={product}
                  isMobile={isMobile}
                  isTablet={isTablet}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ 
  product, 
  isMobile,
  isTablet
}: { 
  product: Product;
  isMobile: boolean;
  isTablet: boolean;
}) => {
  // Determine image size based on screen size
  const imageSize = isMobile 
    ? 140 
    : isTablet 
    ? 160 
    : 180;

  // Replace external thumbnails with local hat images
  const thumbnail = product.thumbnail.includes('aceternity.com') 
    ? `/images/hat${product.title === 'Moonbeam' ? '1' : 
        product.title === 'Cursor' ? '2' : 
        product.title === 'Rogue' ? '3' : 
        product.title === 'Editorially' ? '4' : 
        product.title === 'Editrix AI' ? '5' : 
        product.title === 'Pixel Perfect' ? '6' : 
        product.title === 'Algochurn' ? '7' : 
        product.title === 'Aceternity UI' ? '8' : 
        product.title === 'Tailwind Master Kit' ? '9' : 
        product.title === 'SmartBridge' ? '10' : 
        product.title === 'Renderwork Studio' ? 'hat-indecisive-purple' : 
        product.title === 'Creme Digital' ? 'hat-mama-black' : 
        product.title === 'Golden Bells Academy' ? 'hat-indecisive-red' : 
        product.title === 'Invoker Labs' ? 'hat-mama-orange' : 
        'hat-it-is'}.png` 
    : product.thumbnail;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.05 }}
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-white/5 backdrop-blur-md"
    >
      <div className="relative h-full w-full overflow-hidden rounded-lg ring-1 ring-black/5">
        <img
          src={thumbnail}
          alt={product.title}
          width={imageSize}
          height={imageSize}
          className="h-full w-full object-cover transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-black/5 to-black/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 z-20 p-4">
        <p className="font-medium text-white shadow-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {product.title}
        </p>
      </div>
    </motion.div>
  );
}; 