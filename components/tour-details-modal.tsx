"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Clock,
  Users,
  Star,
  Calendar,
  DollarSign,
  CheckCircle,
  X,
  Camera,
  Utensils,
  Bed,
  MessageCircle,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Phone,
} from "lucide-react";
import { QuoteModal } from "@/components/quote-modal";
import { openWhatsApp, whatsappMessages } from "@/lib/whatsapp";
// import { openWhatsApp, whatsappMessages } from "@/lib/whatsapp";

interface TourDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: {
    id: number;
    title: string;
    location: string;
    duration: string;
    groupSize: string;
    rating: number;
    images: string[];
    highlights: string[];
    price?: string;
    description?: string;
    itinerary?: Array<{
      day: number;
      title: string;
      description: string;
      activities: string[];
      meals: string[];
      accommodation?: string;
    }>;
    inclusions?: string[];
    exclusions?: string[];
    bestTime?: string;
    difficulty?: string;
  };
}

export function TourDetailsModal({
  isOpen,
  onClose,
  tour,
}: TourDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  if (!tour) return null;

  // Enhanced tour data with detailed information
  const tourDetails = {
    ...tour,
    price: tour.price || "From $299",
    description:
      tour.description ||
      `Embark on an unforgettable ${tour.duration.toLowerCase()} journey through ${tour.location}. This carefully crafted tour combines cultural immersion, natural beauty, and authentic local experiences. Perfect for travelers seeking adventure and cultural discovery in Sri Lanka's most iconic destinations.`,
    itinerary: tour.itinerary || [
      {
        day: 1,
        title: "Arrival & Cultural Exploration",
        description:
          "Begin your adventure with a warm welcome and cultural orientation",
        activities: [
          "Airport pickup",
          "Hotel check-in",
          "Welcome dinner",
          "Cultural briefing",
        ],
        meals: ["Dinner"],
        accommodation: "4-star hotel with traditional Sri Lankan architecture",
      },
      {
        day: 2,
        title: "Historical Sites & Local Experiences",
        description: "Discover ancient wonders and immerse in local traditions",
        activities: [
          "Ancient temple visits",
          "Local market tour",
          "Traditional cooking class",
          "Sunset viewing",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Heritage hotel with modern amenities",
      },
      {
        day: 3,
        title: "Nature & Adventure",
        description: "Experience the natural beauty and wildlife of Sri Lanka",
        activities: [
          "Nature walk",
          "Wildlife spotting",
          "Photography session",
          "Departure transfer",
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "Check-out and departure",
      },
    ],
    inclusions: tour.inclusions || [
      "Professional English-speaking guide",
      // "All accommodation (twin sharing basis)",
      // "All meals as mentioned in itinerary",
      "Transportation in air-conditioned vehicle",
      // "All entrance fees and permits",
      "Bottled water during tours",
      "Government taxes and service charges",
    ],
    exclusions: tour.exclusions || [
      "International airfare",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Tips and gratuities",
      "Alcoholic beverages",
      "Optional activities not mentioned",
    ],
    bestTime: tour.bestTime || "December to March (dry season)",
    difficulty: tour.difficulty || "Easy to Moderate",
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tour.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + tour.images.length) % tour.images.length
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
          <div className="relative">
            {/* Header Image Gallery */}
            <div className="relative h-80 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${tour.images[currentImageIndex]})`,
                  }}
                />
              </AnimatePresence>

              {/* Image Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white rounded-lg px-3 py-1">
                <span className="text-sm font-medium">
                  {currentImageIndex + 1} / {tour.images.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Price Badge */}
              {/* <div className="absolute top-4 left-4 bg-emerald-600 text-white rounded-lg px-4 py-2">
                <span className="text-lg font-bold">{tourDetails.price}</span>
                <span className="text-sm opacity-90"> per person</span>
              </div> */}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Header Info */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                      {tour.title}
                    </h1>
                    <div className="flex items-center text-slate-600 mb-2">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-lg">{tour.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                      <Heart className="w-5 h-5 text-slate-600" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                      <Share2 className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <div>
                      <div className="text-sm text-slate-600">Duration</div>
                      <div className="font-semibold">{tour.duration}</div>
                    </div>
                  </div>

                  {/* <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    <div>
                      <div className="text-sm text-slate-600">Group Size</div>
                      <div className="font-semibold">{tour.groupSize}</div>
                    </div>
                  </div> */}

                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <div>
                      <div className="text-sm text-slate-600">Rating</div>
                      <div className="font-semibold">{tour.rating}/5</div>
                    </div>
                  </div>

                  {/* <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <div>
                      <div className="text-sm text-slate-600">Best Time</div>
                      <div className="font-semibold text-sm">
                        {tourDetails.bestTime}
                      </div>
                    </div>
                  </div> */}
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {tour.highlights.map((highlight, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-emerald-50 text-emerald-700"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">
                        Tour Description
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {tourDetails.description}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-3 flex items-center">
                            <Camera className="w-5 h-5 mr-2 text-emerald-600" />
                            Tour Highlights
                          </h4>
                          <ul className="space-y-2">
                            {tour.highlights.map((highlight, index) => (
                              <li
                                key={index}
                                className="flex items-center text-sm"
                              >
                                <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      {/* <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-3">
                            Tour Information
                          </h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">
                                Difficulty Level:
                              </span>
                              <span className="font-medium">
                                {tourDetails.difficulty}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">
                                Best Time to Visit:
                              </span>
                              <span className="font-medium">
                                {tourDetails.bestTime}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">
                                Group Size:
                              </span>
                              <span className="font-medium">
                                {tour.groupSize}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Duration:</span>
                              <span className="font-medium">
                                {tour.duration}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card> */}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="itinerary" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      Day by Day Itinerary
                    </h3>
                    {tourDetails.itinerary.map((day, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                              {day.day}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold mb-2">
                                {day.title}
                              </h4>
                              <p className="text-slate-600 mb-4">
                                {day.description}
                              </p>

                              <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                  <h5 className="font-medium mb-2 flex items-center">
                                    <Camera className="w-4 h-4 mr-1 text-emerald-600" />
                                    Activities
                                  </h5>
                                  <ul className="text-sm space-y-1">
                                    {day.activities.map((activity, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-center"
                                      >
                                        <CheckCircle className="w-3 h-3 mr-2 text-emerald-600" />
                                        {activity}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* <div>
                                  <h5 className="font-medium mb-2 flex items-center">
                                    <Utensils className="w-4 h-4 mr-1 text-emerald-600" />
                                    Meals
                                  </h5>
                                  <ul className="text-sm space-y-1">
                                    {day.meals.map((meal, idx) => (
                                      <li
                                        key={idx}
                                        className="flex items-center"
                                      >
                                        <CheckCircle className="w-3 h-3 mr-2 text-emerald-600" />
                                        {meal}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {day.accommodation && (
                                  <div>
                                    <h5 className="font-medium mb-2 flex items-center">
                                      <Bed className="w-4 h-4 mr-1 text-emerald-600" />
                                      Accommodation
                                    </h5>
                                    <p className="text-sm text-slate-600">
                                      {day.accommodation}
                                    </p>
                                  </div>
                                )} */}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="inclusions" className="mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4 text-emerald-600">
                          ✓ Included
                        </h3>
                        <ul className="space-y-2">
                          {tourDetails.inclusions.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-5 h-5 mr-3 text-emerald-600 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4 text-red-600">
                          ✗ Not Included
                        </h3>
                        <ul className="space-y-2">
                          {tourDetails.exclusions.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <X className="w-5 h-5 mr-3 text-red-500 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-600">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="gallery" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {tour.images.map((image, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="aspect-video bg-cover bg-center rounded-lg overflow-hidden cursor-pointer"
                        style={{ backgroundImage: `url(${image})` }}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-lg py-6"
                  onClick={() => setShowQuoteModal(true)}
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  Get Custom Quote
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 border-green-200 text-green-600 hover:bg-green-50 text-lg py-6"
                  onClick={() =>
                    openWhatsApp(whatsappMessages.inquiry(tour.location))
                  }
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Inquiry
                </Button>
              </div>

              {/* Contact Info */}
              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      Need Help Planning?
                    </h4>
                    <p className="text-sm text-slate-600">
                      Our travel experts are available 24/7 to assist you
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Phone className="w-4 h-4" />
                    <span>+94 77 123 4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
      />
    </>
  );
}
