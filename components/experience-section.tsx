"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Loader2,
} from "lucide-react";
import { submitExperience, likeExperience } from "@/actions/experience-actions";
import { toast } from "@/components/ui/use-toast";

interface Experience {
  id: string;
  name: string;
  location: string;
  rating: number;
  experience: string;
  image: string;
  likes: number;
  comments: number;
  date: string;
}

const initialExperiences: Experience[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "Sigiriya",
    rating: 5,
    experience:
      "Climbing Sigiriya Rock was absolutely breathtaking! The ancient fortress and the panoramic views from the top made it an unforgettable experience. Our guide was knowledgeable and made the history come alive.",
    image: "/images/Sigiriya.jpg",
    likes: 24,
    comments: 8,
    date: "2 days ago",
  },
  {
    id: "2",
    name: "Michael Chen",
    location: "Kandy",
    rating: 5,
    experience:
      "The Temple of the Tooth in Kandy is a spiritual marvel. The evening ceremony was mesmerizing, and the cultural richness of the city is incredible. Highly recommend staying for the traditional dance performance!",
    image: "/images/kandy.jpg",
    likes: 18,
    comments: 5,
    date: "1 week ago",
  },
  {
    id: "3",
    name: "Emma Wilson",
    location: "Ella",
    rating: 5,
    experience:
      "Nine Arch Bridge and Little Adams Peak in Ella exceeded all expectations! The train ride through tea plantations was magical. Perfect spot for nature lovers and photographers.",
    image: "/images/nine-arch.jpg",
    likes: 31,
    comments: 12,
    date: "2 weeks ago",
  },
];

export function ExperienceSection() {
  const [experiences, setExperiences] =
    useState<Experience[]>(initialExperiences);
  const [showForm, setShowForm] = useState(false);
  const [newExperience, setNewExperience] = useState({
    name: "",
    location: "",
    rating: 5,
    experience: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (
        !newExperience.name ||
        !newExperience.location ||
        !newExperience.experience
      ) {
        setError("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      const result = await submitExperience({
        name: newExperience.name,
        location: newExperience.location,
        rating: newExperience.rating,
        experience: newExperience.experience,
      });

      if (result.success) {
        // Add to local state for immediate feedback
        const experience: Experience = {
          id: Date.now().toString(),
          ...newExperience,
          image: "/placeholder.svg?height=400&width=600",
          likes: 0,
          comments: 0,
          date: "Just now",
        };
        setExperiences([experience, ...experiences]);
        setNewExperience({ name: "", location: "", rating: 5, experience: "" });
        setShowForm(false);
        toast({
          title: "Experience Shared",
          description: "Thank you for sharing your experience!",
        });
      } else {
        setError(result.message || "Something went wrong. Please try again.");
        toast({
          variant: "destructive",
          title: "Error",
          description:
            result.message ||
            "Failed to share your experience. Please try again.",
        });
      }
    } catch (err) {
      console.error("Error submitting experience:", err);
      setError("An unexpected error occurred. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (id: string) => {
    try {
      // Optimistically update UI
      setExperiences(
        experiences.map((exp) =>
          exp.id === id ? { ...exp, likes: exp.likes + 1 } : exp
        )
      );

      // Send to server
      await likeExperience(id);
    } catch (error) {
      console.error("Error liking experience:", error);
      // Revert on error
      setExperiences(
        experiences.map((exp) =>
          exp.id === id ? { ...exp, likes: exp.likes - 1 } : exp
        )
      );
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to like the experience. Please try again.",
      });
    }
  };

  return (
    <section
      id="experiences"
      className="py-20 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Traveler <span className="text-emerald-600">Experiences</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Discover Sri Lanka through the eyes of fellow travelers and share
            your own adventures
          </p>

          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-emerald-600 hover:bg-emerald-700"
            size="lg"
          >
            Share Your Experience
          </Button>
        </motion.div>

        {/* Experience Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Card className="max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your Name"
                        value={newExperience.name}
                        onChange={(e) =>
                          setNewExperience({
                            ...newExperience,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                      <Input
                        placeholder="Location Visited"
                        value={newExperience.location}
                        onChange={(e) =>
                          setNewExperience({
                            ...newExperience,
                            location: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Rating:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setNewExperience({ ...newExperience, rating: star })
                          }
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-5 h-5 ${star <= newExperience.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        </button>
                      ))}
                    </div>

                    <Textarea
                      placeholder="Share your experience..."
                      value={newExperience.experience}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          experience: e.target.value,
                        })
                      }
                      rows={4}
                      required
                    />

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <div className="flex space-x-4">
                      <Button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sharing...
                          </>
                        ) : (
                          "Share Experience"
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Experiences Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateY: 2,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                <motion.div
                  className="aspect-video bg-gradient-to-br from-emerald-100 to-blue-100 relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <MapPin className="w-12 h-12 text-emerald-600" />
                  </motion.div>
                  <Badge className="absolute top-4 left-4 bg-emerald-600 group-hover:scale-110 transition-transform duration-300">
                    {experience.location}
                  </Badge>

                  {/* Animated background particles */}
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 bg-white/50 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0.5,
                    }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-white/40 rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 1,
                    }}
                  />
                </motion.div>

                <CardContent className="p-6">
                  <motion.div
                    className="flex items-center space-x-3 mb-4"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                      <Avatar>
                        <AvatarImage
                          src={`/placeholder.svg?height=40&width=40`}
                        />
                        <AvatarFallback>
                          {experience.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div className="flex-1">
                      <motion.h3
                        className="font-semibold text-slate-800"
                        whileHover={{ scale: 1.05 }}
                      >
                        {experience.name}
                      </motion.h3>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Star
                              className={`w-4 h-4 ${i < experience.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          </motion.div>
                        ))}
                        <span className="text-sm text-slate-500 ml-2">
                          {experience.date}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.p
                    className="text-slate-600 mb-4 line-clamp-4"
                    whileHover={{ scale: 1.01 }}
                  >
                    {experience.experience}
                  </motion.p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => handleLike(experience.id)}
                        className="flex items-center space-x-1 text-slate-500 hover:text-red-500 transition-colors"
                      >
                        <motion.div
                          animate={
                            experience.likes > 0 ? { scale: [1, 1.3, 1] } : {}
                          }
                          transition={{ duration: 0.3 }}
                        >
                          <Heart className="w-4 h-4" />
                        </motion.div>
                        <span className="text-sm">{experience.likes}</span>
                      </motion.button>

                      <motion.button
                        className="flex items-center space-x-1 text-slate-500 hover:text-blue-500 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{experience.comments}</span>
                      </motion.button>
                    </div>

                    <motion.button
                      className="text-slate-500 hover:text-emerald-600 transition-colors"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      <Share2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
