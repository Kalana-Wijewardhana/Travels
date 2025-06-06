"use client"

import { motion } from "framer-motion"
import { MessageCircle, Calendar, Users, CheckCircle } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.8,
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
}

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
}

const steps = [
  {
    number: "01",
    title: "Contact Us",
    description: "Reach out to our travel experts through our platform",
    icon: MessageCircle,
    color: "bg-blue-500",
  },
  {
    number: "02",
    title: "Free Consultation",
    description: "Get personalized recommendations for your Sri Lanka adventure",
    icon: Calendar,
    color: "bg-emerald-500",
  },
  {
    number: "03",
    title: "Discuss Further",
    description: "Plan your itinerary with our local destination experts",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    number: "04",
    title: "Book & Enjoy",
    description: "Confirm your booking and start your amazing journey",
    icon: CheckCircle,
    color: "bg-orange-500",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            How It <span className="text-emerald-600">Works</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Simple steps to plan your perfect Sri Lankan adventure
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              whileHover={{
                y: -15,
                scale: 1.05,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="relative text-center group cursor-pointer"
            >
              {/* Enhanced Connection Line */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-emerald-200 to-transparent transform translate-x-4 z-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                  viewport={{ once: true }}
                />
              )}

              <div className="relative z-10">
                {/* Enhanced Step Number */}
                <motion.div
                  className="text-6xl font-bold text-slate-200 mb-4 group-hover:text-emerald-100 transition-all duration-500"
                  whileHover={{
                    scale: 1.2,
                    textShadow: "0px 0px 20px rgba(16, 185, 129, 0.3)",
                  }}
                >
                  {step.number}
                </motion.div>

                {/* Enhanced Icon */}
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    rotate: 360,
                    transition: { duration: 0.6 },
                  }}
                  animate={index === 0 ? pulseAnimation : {}}
                  className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300`}
                >
                  <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400 }}>
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>

                {/* Enhanced Content */}
                <motion.h3 className="text-xl font-bold text-slate-800 mb-3" whileHover={{ scale: 1.05 }}>
                  {step.title}
                </motion.h3>
                <motion.p className="text-slate-600 leading-relaxed" whileHover={{ scale: 1.02 }}>
                  {step.description}
                </motion.p>

                {/* Hover overlay effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-emerald-50/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  whileHover={{ scale: 1.05 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
