"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/layout/navbar"
import { Footer } from "@/components/features/footer/Footer"

// Hat Collection Data
const hatCollection = [
  {
    id: 1,
    name: 'Шапка "It is"',
    price: "$29.99",
    image: "/images/hat-it-is.png",
    tags: ["Ново", "Лимитирано"]
  },
  {
    id: 2,
    name: 'Шапка "Mama orange"',
    price: "$34.99", 
    image: "/images/hat-mama-orange.png",
    tags: ["Лимитирано"]
  },
  {
    id: 3,
    name: 'Шапка "Indecisive red"',
    price: "$39.99",
    image: "/images/hat-indecisive-red.png",
    tags: ["Ново", "Лимитирано"]
  },
  {
    id: 4,
    name: 'Шапка "Dirty cash"',
    price: "$29.99",
    image: "/images/hat-dirty-cash.png",
    tags: ["Ново"]
  },
  {
    id: 5,
    name: 'Шапка "No money"',
    price: "$34.99",
    image: "/images/hat-no-money.png",
    tags: ["КЛАСИКА"]
  },
  {
    id: 6,
    name: 'Шапка "Indecisive Purple"',
    price: "$39.99",
    image: "/images/hat-indecisive-purple.png",
    tags: ["Ново"]
  }
];

// T-Shirt Collection Data (placeholder mockups)
const tshirtCollection = [
  {
    id: 1,
    name: 'Тениска "Tshirt no mon..."',
    price: "$24.99",
    image: "/placeholder.svg", // We'll create these mockups
    tags: ["Ново", "Лимитирано"]
  },
  {
    id: 2,
    name: 'Тениска "Tshirt mama r..."',
    price: "$24.99",
    image: "/placeholder.svg",
    tags: ["Лимитирано"]
  },
  {
    id: 3,
    name: 'Тениска "Tshirt daddy c..."',
    price: "$39.99",
    image: "/placeholder.svg",
    tags: ["Ново", "Лимитирано"]
  },
  {
    id: 4,
    name: 'Тениска "Tshirt indeci..."',
    price: "$39.99",
    image: "/placeholder.svg",
    tags: ["Ново"]
  },
  {
    id: 5,
    name: 'Тениска "Tshirt mama ..."',
    price: "$44.99",
    image: "/placeholder.svg",
    tags: ["ПРЕМИУМ"]
  },
  {
    id: 6,
    name: 'Тениска "..."',
    price: "$49.99",
    image: "/placeholder.svg",
    tags: ["Ново"]
  }
];

// Collection Carousel Component
interface CollectionCarouselProps {
  title: string;
  subtitle: string;
  items: any[];
  bgColor: string;
  textColor: string;
}

function CollectionCarousel({ title, subtitle, items, bgColor, textColor }: CollectionCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 5;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= items.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, items.length - itemsPerView) : prev - 1
    );
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Ново":
        return "bg-green-500 text-white";
      case "Лимитирано": 
        return "bg-gray-800 text-white";
      case "КЛАСИКА":
        return "bg-gray-600 text-white";
      case "ПРЕМИУМ":
        return "bg-purple-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="w-full mb-8">
      {/* Section Header */}
      <div className={`${bgColor} ${textColor} p-4 mb-6 rounded-t-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium">{subtitle}</span>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="flex overflow-hidden gap-4 px-4">
          {items.slice(currentIndex, currentIndex + itemsPerView).map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-none w-48"
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Tags */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {item.tags.map((tag: string, index: number) => (
                      <Badge
                        key={index}
                        className={`text-xs px-2 py-1 ${getTagColor(tag)}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-medium text-sm mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-lg font-bold text-gray-900">
                    {item.price}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg"
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon" 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg"
          onClick={nextSlide}
          disabled={currentIndex + itemsPerView >= items.length}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            INDECISIVE WEAR
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Coming Soon - Premium Streetwear Collection
          </motion.p>
        </div>

        {/* Hat Collection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <CollectionCarousel
            title="КОЛЕКЦИЯ ШАПКИ"
            subtitle="КЛАСИКА"
            items={hatCollection}
            bgColor="bg-gray-900"
            textColor="text-white"
          />
        </motion.div>

        {/* T-Shirt Collection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CollectionCarousel
            title="КОЛЕКЦИЯ ТЕНИСКИ"
            subtitle="ПРЕМИУМ"
            items={tshirtCollection}
            bgColor="bg-pink-500"
            textColor="text-white"
          />
        </motion.div>

        {/* Coming Soon CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 mb-8"
        >
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Скоро в продажба!
            </h2>
            <p className="text-gray-600 mb-6">
              Получете ранен достъп до нашата колекция и специални отстъпки.
            </p>
            <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3">
              Присъединете се към списъка за изчакване
            </Button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
} 