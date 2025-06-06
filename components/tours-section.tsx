"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { QuoteModal } from "@/components/quote-modal";

const tours = [
  {
    id: 1,
    title: "Cultural Triangle Adventure",
    location: "Sigiriya, Dambulla, Polonnaruwa",
    duration: "3 Days",
    groupSize: "8-12 People",
    rating: 4.9,
    images: [
      "/images/Sigiriya.jpg",
      "/images/dambulla.jpg",
      "/images/polonnaruwa.jpg",
    ],
    highlights: ["Ancient Kingdoms", "Rock Fortress", "Cave Temples"],
  },
  {
    id: 2,
    title: "Hill Country Explorer",
    location: "Kandy, Ella, Nuwara Eliya",
    duration: "4 Days",
    groupSize: "6-10 People",
    rating: 4.8,
    images: [
      "/images/kandy.jpg",
      "/images/nine-arch.jpg",
      "/images/nuwaraeliya.png",
    ],
    highlights: ["Tea Plantations", "Train Rides", "Waterfalls"],
  },
  {
    id: 3,
    title: "Coastal Paradise",
    location: "Galle, Mirissa, Unawatuna",
    duration: "5 Days",
    groupSize: "4-8 People",
    rating: 4.9,
    images: [
      "/images/Mirissa.jpg",
      "/images/galle.jpg",
      "/images/unawatuna.jpg",
    ],
    highlights: ["Beach Relaxation", "Whale Watching", "Historic Forts"],
  },
];

export function ToursSection() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: number]: number;
  }>({});

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const newIndex = { ...prev };
        tours.forEach((tour) => {
          newIndex[tour.id] = ((prev[tour.id] || 0) + 1) % tour.images.length;
        });
        return newIndex;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="tours" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Popular <span className="text-emerald-600">Tours</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover Sri Lanka's most breathtaking destinations with our
            expertly crafted tours
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 50, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                <motion.div
                  className="aspect-video relative overflow-hidden group/image"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Image Carousel */}
                  <div className="relative w-full h-full">
                    {tour.images.map((image, imgIndex) => (
                      <motion.div
                        key={imgIndex}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${image})` }}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{
                          opacity:
                            (currentImageIndex[tour.id] || 0) === imgIndex
                              ? 1
                              : 0,
                          scale:
                            (currentImageIndex[tour.id] || 0) === imgIndex
                              ? 1
                              : 1.1,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut",
                        }}
                      />
                    ))}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover/image:bg-black/10 transition-colors duration-300"></div>

                    {/* Image Navigation Dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {tour.images.map((_, imgIndex) => (
                        <motion.button
                          key={imgIndex}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            (currentImageIndex[tour.id] || 0) === imgIndex
                              ? "bg-white scale-125"
                              : "bg-white/50 hover:bg-white/75"
                          }`}
                          onClick={() =>
                            setCurrentImageIndex((prev) => ({
                              ...prev,
                              [tour.id]: imgIndex,
                            }))
                          }
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        />
                      ))}
                    </div>

                    {/* Image Counter */}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      <span className="text-xs text-white font-medium">
                        {(currentImageIndex[tour.id] || 0) + 1}/
                        {tour.images.length}
                      </span>
                    </div>
                  </div>

                  <Badge className="absolute top-4 left-4 bg-emerald-600 z-10">
                    {tour.duration}
                  </Badge>

                  {/* Navigation Arrows */}
                  <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover/image:opacity-100 transition-all duration-300 z-10"
                    onClick={() =>
                      setCurrentImageIndex((prev) => ({
                        ...prev,
                        [tour.id]:
                          ((prev[tour.id] || 0) - 1 + tour.images.length) %
                          tour.images.length,
                      }))
                    }
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover/image:opacity-100 transition-all duration-300 z-10"
                    onClick={() =>
                      setCurrentImageIndex((prev) => ({
                        ...prev,
                        [tour.id]:
                          ((prev[tour.id] || 0) + 1) % tour.images.length,
                      }))
                    }
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {tour.title}
                      </h3>
                      <div className="flex items-center text-slate-600 text-sm mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {tour.location}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {tour.groupSize}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                        {tour.rating}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.map((highlight, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => setShowQuoteModal(true)}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {/* Quote Modal */}
        <QuoteModal
          isOpen={showQuoteModal}
          onClose={() => setShowQuoteModal(false)}
        />
      </div>
    </section>
  );
}
