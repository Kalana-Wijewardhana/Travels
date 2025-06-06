"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Users, Award, Heart } from "lucide-react"

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Travelers" },
  { icon: Globe, value: "100+", label: "Destinations" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Heart, value: "98%", label: "Satisfaction Rate" },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      type: "spring",
      stiffness: 100,
    },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            About <span className="text-emerald-600">Us</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover the story behind Sri Lanka Travels and our passion for authentic experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Our Story */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <motion.h3 variants={fadeInUp} className="text-2xl font-bold text-slate-800">
              Our Story
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-slate-600 leading-relaxed">
              Founded in 2015, Sri Lanka Travels began with a simple mission: to share the authentic beauty and culture
              of Sri Lanka with travelers from around the world. What started as a small team of passionate local guides
              has grown into a leading tour operator, but our core values remain unchanged.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-slate-600 leading-relaxed">
              We believe in sustainable tourism that benefits local communities while providing unforgettable
              experiences for our guests. Our team of expert guides are all locals with deep knowledge of Sri Lanka's
              history, culture, and hidden gems.
            </motion.p>
            <motion.div variants={fadeInUp} className="pt-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Meet Our Team</Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>

            <Card className="relative z-10 overflow-hidden border-none shadow-xl bg-gradient-to-br from-white to-slate-50">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      className="text-center"
                    >
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="w-12 h-12 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
                      >
                        <stat.icon className="w-6 h-6" />
                      </motion.div>
                      <h4 className="text-2xl font-bold text-slate-800">{stat.value}</h4>
                      <p className="text-sm text-slate-600">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-slate-800 text-center mb-10">Our Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Authentic Experiences",
                description:
                  "We go beyond tourist attractions to provide genuine cultural immersion and local connections.",
                icon: Heart,
                color: "bg-red-100 text-red-600",
              },
              {
                title: "Sustainable Tourism",
                description:
                  "We're committed to environmentally responsible practices and supporting local communities.",
                icon: Globe,
                color: "bg-emerald-100 text-emerald-600",
              },
              {
                title: "Expert Local Guides",
                description: "Our guides are passionate locals with deep knowledge and authentic stories to share.",
                icon: Users,
                color: "bg-blue-100 text-blue-600",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 ${value.color} rounded-full flex items-center justify-center mb-4`}>
                  <value.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-2">{value.title}</h4>
                <p className="text-slate-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
