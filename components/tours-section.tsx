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
  MessageCircle,
} from "lucide-react";
import { QuoteModal } from "@/components/quote-modal";
import { TourDetailsModal } from "@/components/tour-details-modal";
import { openWhatsApp, whatsappMessages } from "@/lib/whatsapp";
// import { openWhatsApp, whatsappMessages } from "@/lib/whatsapp";

const tours = [
  {
    id: 1,
    title: "Cultural Triangle Adventure",
    location: "Sigiriya, Dambulla, Polonnaruwa",
    duration: "3 Days",
    groupSize: "8-12 People",
    rating: 4.9,
    price: "From $299",
    images: [
      "/images/Sigiriya.jpg",
      "/images/dambulla.jpg",
      "/images/polonnaruwa.jpg",
    ],
    highlights: [
      "Ancient Kingdoms",
      "Rock Fortress",
      "Cave Temples",
      "UNESCO Sites",
    ],
    description:
      "Discover the ancient wonders of Sri Lanka's Cultural Triangle, where history comes alive through magnificent rock fortresses, sacred cave temples, and royal palaces. This 3-day adventure takes you through UNESCO World Heritage sites that showcase over 2,000 years of Sri Lankan civilization.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Sigiriya Rock Fortress",
        description:
          "Begin your cultural journey with the iconic Sigiriya Rock Fortress",
        activities: [
          "Airport/hotel pickup",
          "Sigiriya Rock climb",
          "Ancient palace ruins exploration",
          "Frescoes viewing",
        ],
        meals: ["Lunch", "Dinner"],
        accommodation: "Heritage hotel near Sigiriya",
      },
      {
        day: 2,
        title: "Dambulla Cave Temple & Polonnaruwa",
        description: "Explore sacred caves and ancient royal capital",
        activities: [
          "Dambulla Cave Temple visit",
          "Golden Buddha statues",
          "Polonnaruwa ancient city tour",
          "Royal palace ruins",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Boutique hotel in Polonnaruwa",
      },
      {
        day: 3,
        title: "Cultural Immersion & Departure",
        description: "Experience local culture and traditional crafts",
        activities: [
          "Village tour",
          "Traditional pottery making",
          "Local market visit",
          "Departure transfer",
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "Check-out and departure",
      },
    ],
    inclusions: [
      "Professional English-speaking guide",
      "All accommodation (twin sharing)",
      "All meals as mentioned",
      "Air-conditioned transportation",
      "All entrance fees",
      "Bottled water",
      "Government taxes",
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Tips and gratuities",
      "Alcoholic beverages",
    ],
    bestTime: "December to March",
    difficulty: "Moderate",
  },
  {
    id: 2,
    title: "Hill Country Explorer",
    location: "Kandy, Ella, Nuwara Eliya",
    duration: "4 Days",
    groupSize: "6-10 People",
    rating: 4.8,
    price: "From $399",
    images: [
      "/images/nine-arch.jpg",
      "/images/kandy.jpg",
      "/images/nuwaraeliya.png",
    ],
    highlights: [
      "Tea Plantations",
      "Train Rides",
      "Waterfalls",
      "Cool Climate",
    ],
    description:
      "Journey through Sri Lanka's breathtaking hill country, where emerald tea plantations carpet rolling hills and misty mountains create a magical landscape. Experience the famous blue train, visit sacred temples, and discover cascading waterfalls in this 4-day highland adventure.",
    itinerary: [
      {
        day: 1,
        title: "Kandy - Cultural Capital",
        description: "Explore the last kingdom of Sri Lanka",
        activities: [
          "Temple of the Tooth visit",
          "Kandy Lake walk",
          "Cultural dance show",
          "Royal Botanical Gardens",
        ],
        meals: ["Lunch", "Dinner"],
        accommodation: "Heritage hotel overlooking Kandy Lake",
      },
      {
        day: 2,
        title: "Scenic Train to Ella",
        description: "Experience the world's most beautiful train ride",
        activities: [
          "Blue train journey",
          "Tea plantation visit",
          "Tea factory tour",
          "Nine Arch Bridge",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Mountain view hotel in Ella",
      },
      {
        day: 3,
        title: "Ella Adventures",
        description: "Hiking and natural wonders",
        activities: [
          "Little Adam's Peak hike",
          "Ella Rock climbing",
          "Ravana Falls visit",
          "Local village tour",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Eco-lodge with valley views",
      },
      {
        day: 4,
        title: "Nuwara Eliya & Departure",
        description: "Little England of Sri Lanka",
        activities: [
          "Nuwara Eliya city tour",
          "Strawberry farm visit",
          "Lake Gregory boat ride",
          "Departure",
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "Check-out and departure",
      },
    ],
    bestTime: "December to March, July to September",
    difficulty: "Easy to Moderate",
  },
  {
    id: 3,
    title: "Coastal Paradise",
    location: "Galle, Mirissa, Unawatuna",
    duration: "5 Days",
    groupSize: "4-8 People",
    rating: 4.9,
    price: "From $499",
    images: [
      "/images/Mirissa.jpg",
      "/images/galle.jpg",
      "/images/unawatuna.jpg",
    ],
    highlights: [
      "Beach Relaxation",
      "Whale Watching",
      "Historic Forts",
      "Water Sports",
    ],
    description:
      "Discover Sri Lanka's stunning southern coast where golden beaches meet turquoise waters, historic Dutch forts tell colonial tales, and majestic whales dance in the ocean. This 5-day coastal journey combines relaxation, adventure, and cultural exploration.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Galle Fort",
        description: "Explore the historic Dutch colonial fort",
        activities: [
          "Galle Fort walking tour",
          "Lighthouse visit",
          "Colonial architecture",
          "Sunset at ramparts",
        ],
        meals: ["Lunch", "Dinner"],
        accommodation: "Boutique hotel within Galle Fort",
      },
      {
        day: 2,
        title: "Whale Watching in Mirissa",
        description: "Encounter giants of the ocean",
        activities: [
          "Early morning whale watching",
          "Blue whale spotting",
          "Dolphin encounters",
          "Beach relaxation",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Beachfront resort in Mirissa",
      },
      {
        day: 3,
        title: "Unawatuna Beach Day",
        description: "Paradise beach and water activities",
        activities: [
          "Snorkeling",
          "Beach games",
          "Coconut tree hill",
          "Jungle beach visit",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Beach villa in Unawatuna",
      },
      {
        day: 4,
        title: "Cultural & Adventure Mix",
        description: "Temples, turtles, and local experiences",
        activities: [
          "Turtle hatchery visit",
          "Snake Island temple",
          "Stilt fishing",
          "Local cooking class",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Eco-resort near beach",
      },
      {
        day: 5,
        title: "Relaxation & Departure",
        description: "Final beach moments and farewell",
        activities: [
          "Morning beach walk",
          "Souvenir shopping",
          "Spa treatment",
          "Departure transfer",
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "Check-out and departure",
      },
    ],
    bestTime: "November to April",
    difficulty: "Easy",
  },
];

export function ToursSection() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showTourDetails, setShowTourDetails] = useState(false);
  const [selectedTour, setSelectedTour] = useState<(typeof tours)[0] | null>(
    null
  );
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

  const handleBookNow = (tour: (typeof tours)[0]) => {
    setSelectedTour(tour);
    setShowTourDetails(true);
  };

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

                    {/* Price Badge */}
                    <Badge className="absolute top-4 left-4 bg-emerald-600 z-10">
                      {tour.price}
                    </Badge>

                    {/* Duration Badge */}
                    <Badge className="absolute top-4 right-4 bg-black/50 text-white z-10">
                      {tour.duration}
                    </Badge>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      <span className="text-xs text-white font-medium">
                        {(currentImageIndex[tour.id] || 0) + 1}/
                        {tour.images.length}
                      </span>
                    </div>
                  </div>

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
                      {tour.highlights.slice(0, 3).map((highlight, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {highlight}
                        </Badge>
                      ))}
                      {tour.highlights.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{tour.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => handleBookNow(tour)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-200 text-green-600 hover:bg-green-50"
                        onClick={() =>
                          openWhatsApp(whatsappMessages.inquiry(tour.location))
                        }
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
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

        {/* Tour Details Modal */}
        {selectedTour && (
          <TourDetailsModal
            isOpen={showTourDetails}
            onClose={() => {
              setShowTourDetails(false);
              setSelectedTour(null);
            }}
            tour={selectedTour}
          />
        )}
      </div>
    </section>
  );
}
