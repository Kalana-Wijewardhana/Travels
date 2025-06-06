"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

const stories = [
  {
    id: 1,
    name: "Jennifer Martinez",
    location: "From USA",
    tour: "Cultural Triangle",
    rating: 5,
    story:
      "An absolutely magical experience! The ancient ruins of Polonnaruwa and the breathtaking climb up Sigiriya Rock were unforgettable. Our guide was incredibly knowledgeable and made the history come alive.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "David Thompson",
    location: "From UK",
    tour: "Hill Country Explorer",
    rating: 5,
    story:
      "The train journey through the tea plantations was like something out of a fairy tale. Ella's natural beauty and the warmth of the local people made this trip truly special.",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    location: "From Spain",
    tour: "Coastal Paradise",
    rating: 5,
    story:
      "Whale watching in Mirissa was the highlight of our trip! The beaches were pristine and the sunset at Galle Fort was absolutely stunning. Can't wait to return!",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function StoriesSection() {
  return (
    <section id="stories" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Success <span className="text-emerald-600">Stories</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real experiences from travelers who discovered the magic of Sri Lanka
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
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
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 relative overflow-hidden group">
                <motion.div
                  className="absolute top-4 right-4 text-emerald-600/20 group-hover:text-emerald-600/40 transition-colors"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                >
                  <Quote className="w-8 h-8" />
                </motion.div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={story.image || "/placeholder.svg"} />
                          <AvatarFallback>
                            {story.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div>
                        <h3 className="font-bold text-slate-800">{story.name}</h3>
                        <p className="text-sm text-slate-600">{story.location}</p>
                        <Badge variant="secondary" className="mt-1">
                          {story.tour}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        </motion.div>
                      ))}
                    </div>

                    <motion.p className="text-slate-600 leading-relaxed italic" whileHover={{ scale: 1.01 }}>
                      "{story.story}"
                    </motion.p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
