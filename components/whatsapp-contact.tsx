// components/whatsapp-contact.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Phone, Clock, Users, MapPin, X } from "lucide-react";
import { openWhatsApp, whatsappMessages } from "@/lib/whatsapp";

interface WhatsAppContactProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsAppContact({ isOpen, onClose }: WhatsAppContactProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const contactOptions = [
    {
      id: "general",
      title: "General Inquiry",
      description: "Ask about tours, destinations, and travel tips",
      icon: MessageCircle,
      color: "bg-blue-500",
      message: whatsappMessages.general,
    },
    {
      id: "quote",
      title: "Custom Quote",
      description: "Get a personalized quote for your trip",
      icon: MapPin,
      color: "bg-emerald-500",
      message: whatsappMessages.quote,
    },
    {
      id: "booking",
      title: "Book a Tour",
      description: "Ready to book? Let's finalize your trip",
      icon: Users,
      color: "bg-purple-500",
      message: whatsappMessages.booking,
    },
    {
      id: "emergency",
      title: "Emergency Support",
      description: "Urgent assistance while traveling",
      icon: Phone,
      color: "bg-red-500",
      message: whatsappMessages.emergency,
    },
  ];

  const handleOptionClick = (option: (typeof contactOptions)[0]) => {
    setSelectedOption(option.id);
    setTimeout(() => {
      openWhatsApp(option.message);
      onClose();
      setSelectedOption(null);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md"
        >
          <Card className="overflow-hidden border-none shadow-2xl">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <MessageCircle className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold">WhatsApp Support</h3>
                  <p className="text-green-100">Instant assistance available</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>24/7 Available</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-none"
                >
                  Usually replies instantly
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <p className="text-slate-600 mb-6 text-center">
                Choose how we can help you today:
              </p>

              <div className="space-y-3">
                {contactOptions.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionClick(option)}
                    disabled={selectedOption === option.id}
                    className="w-full p-4 rounded-lg border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300 text-left group disabled:opacity-50"
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className={`w-10 h-10 ${option.color} rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform`}
                        animate={
                          selectedOption === option.id ? { rotate: 360 } : {}
                        }
                        transition={{ duration: 0.5 }}
                      >
                        <option.icon className="w-5 h-5" />
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 group-hover:text-green-700 transition-colors">
                          {option.title}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {option.description}
                        </p>
                      </div>
                      {selectedOption === option.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <MessageCircle className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <span>
                    You'll be redirected to WhatsApp with a pre-filled message.
                    Our team will respond immediately!
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
