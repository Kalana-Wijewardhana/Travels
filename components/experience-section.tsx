"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Loader2, RefreshCw, MapPin } from "lucide-react";
import { submitExperience, getExperiences } from "@/actions/experience-actions";
import { toast } from "@/components/ui/use-toast";

interface Experience {
  id: string;
  name: string;
  location: string;
  rating: number;
  experience: string;
  createdAt: string;
}

export function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newExperience, setNewExperience] = useState({
    name: "",
    location: "",
    rating: 5,
    experience: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const experiencesPerPage = 8;

  // Load experiences on component mount
  useEffect(() => {
    loadExperiences(true);
  }, []);

  const loadExperiences = async (reset = false) => {
    if (reset) {
      setIsLoading(true);
      setCurrentPage(1);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const page = reset ? 1 : currentPage + 1; // Fix: increment page before API call
      const result = await getExperiences(page, experiencesPerPage);

      if (result.success && result.experiences) {
        const typedExperiences = result.experiences.map((exp) => ({
          id: exp.id,
          name: exp.name || "",
          location: exp.location || "",
          rating: exp.rating || 5,
          experience: exp.experience || "",
          createdAt: exp.createdAt || new Date().toISOString(),
        })) as Experience[];

        if (reset) {
          setExperiences(typedExperiences);
          setCurrentPage(1); // Set to 1 for reset
        } else {
          setExperiences((prev) => [...prev, ...typedExperiences]);
          setCurrentPage(page); // Update to the new page number
        }

        setHasMore(typedExperiences.length === experiencesPerPage);
      } else {
        console.error("Failed to load experiences:", result.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load experiences. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error loading experiences:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

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
        // Reset form
        setNewExperience({
          name: "",
          location: "",
          rating: 5,
          experience: "",
        });
        setShowForm(false);

        // Reload experiences to show the new one
        await loadExperiences(true);

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
    } catch (err: any) {
      console.error("Error submitting experience:", err);
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8,
      },
    },
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

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-emerald-600 hover:bg-emerald-700"
              size="lg"
            >
              Share Your Experience
            </Button>
          </div>
        </motion.div>

        {/* Experience Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="mb-12"
            >
              <Card className="max-w-2xl mx-auto shadow-xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">
                      Share Your Experience
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your Name *"
                        value={newExperience.name}
                        onChange={(e) =>
                          setNewExperience({
                            ...newExperience,
                            name: e.target.value,
                          })
                        }
                        required
                        className="h-12"
                      />
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          placeholder="Location Visited *"
                          value={newExperience.location}
                          onChange={(e) =>
                            setNewExperience({
                              ...newExperience,
                              location: e.target.value,
                            })
                          }
                          required
                          className="h-12 pl-10"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Rating:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          onClick={() =>
                            setNewExperience({ ...newExperience, rating: star })
                          }
                          className="focus:outline-none"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              star <= newExperience.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>

                    <Textarea
                      placeholder="Share your experience... *"
                      value={newExperience.experience}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          experience: e.target.value,
                        })
                      }
                      rows={6}
                      required
                      className="resize-none"
                    />

                    {error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-red-500 bg-red-50 p-3 rounded-lg"
                      >
                        {error}
                      </motion.p>
                    )}

                    <div className="flex space-x-4 pt-4">
                      <Button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3"
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
                        className="px-8 py-3"
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

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-12"
          >
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
            <span className="ml-2 text-slate-600">Loading experiences...</span>
          </motion.div>
        )}

        {/* No Experiences State */}
        {!isLoading && experiences.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-slate-600 text-lg">
              No experiences shared yet. Be the first to share your story!
            </p>
          </motion.div>
        )}

        {/* Experiences Grid */}
        {!isLoading && experiences.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {experiences.map((experience) => (
              <motion.div
                key={experience.id}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  rotateY: 3,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className="h-full"
              >
                <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col">
                  <motion.div
                    className="aspect-video relative overflow-hidden bg-gradient-to-br from-emerald-400 to-blue-500"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>
                    <Badge className="absolute top-3 left-3 bg-emerald-600 group-hover:scale-110 transition-transform duration-300 text-xs">
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

                  <CardContent className="p-4 flex-1 flex flex-col">
                    <motion.div
                      className="flex items-center space-x-3 mb-3"
                      whileHover={{ x: 2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32`}
                          />
                          <AvatarFallback className="text-xs">
                            {experience.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <motion.h3
                          className="font-semibold text-slate-800 text-sm truncate"
                          whileHover={{ scale: 1.02 }}
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
                                className={`w-3 h-3 ${i < experience.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <motion.p
                      className="text-slate-600 text-sm line-clamp-4 flex-1 mb-3"
                      whileHover={{ scale: 1.01 }}
                    >
                      {experience.experience}
                    </motion.p>

                    <div className="text-xs text-slate-500 mt-auto">
                      {formatDate(experience.createdAt)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
        {!isLoading && experiences.length > 0 && hasMore && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => loadExperiences()}
              variant="outline"
              disabled={isLoadingMore}
              className="px-8"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading more...
                </>
              ) : (
                "Load More Experiences"
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
