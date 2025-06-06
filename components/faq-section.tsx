"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, HelpCircle, Mail } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What is the best time to visit Sri Lanka?",
    answer:
      "Sri Lanka has a tropical climate with distinct wet and dry seasons that vary by region. The best time to visit the west and south coasts is from December to March, while the east coast is best from April to September. The central highlands are pleasant year-round but can be chilly in the evenings.",
  },
  {
    question: "Do I need a visa to visit Sri Lanka?",
    answer:
      "Most visitors to Sri Lanka need an Electronic Travel Authorization (ETA) before arrival. This can be obtained online through the official Sri Lanka ETA website. Some nationalities may be eligible for visa on arrival, but we recommend checking the latest requirements before your trip.",
  },
  {
    question: "What currency is used in Sri Lanka?",
    answer:
      "The Sri Lankan Rupee (LKR) is the official currency. ATMs are widely available in cities and tourist areas, and major credit cards are accepted at hotels and larger establishments. We recommend carrying some cash for smaller vendors and rural areas.",
  },
  {
    question: "Is Sri Lanka safe for tourists?",
    answer:
      "Sri Lanka is generally a safe destination for tourists. As with any travel, we recommend taking standard precautions with your belongings, being aware of your surroundings, and respecting local customs and traditions. Our guides are always available to provide advice and assistance.",
  },
  {
    question: "What languages are spoken in Sri Lanka?",
    answer:
      "Sinhala and Tamil are the official languages of Sri Lanka. English is widely spoken in tourist areas, hotels, and by our guides. Learning a few basic Sinhala phrases is appreciated by locals and can enhance your experience.",
  },
  {
    question: "Can you accommodate dietary restrictions?",
    answer:
      "Yes, we can accommodate various dietary requirements including vegetarian, vegan, gluten-free, and religious restrictions. Please inform us of any dietary needs when booking so we can make appropriate arrangements with restaurants and accommodations.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Find answers to common questions about traveling in Sri Lanka
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                <motion.div
                  className="p-4 flex justify-between items-center cursor-pointer bg-white"
                  onClick={() => toggleFAQ(index)}
                  whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <h3 className="font-medium text-slate-800">{item.question}</h3>
                  </div>
                  <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5 text-slate-500" />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-0 pb-4 px-4 border-t border-slate-100">
                        <div className="pl-8">
                          <p className="text-slate-600">{item.answer}</p>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-emerald-50 to-blue-50 border-none shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Still have questions?</h3>
              <p className="text-slate-600 mb-6">
                Our team is ready to assist you with any other questions you might have about traveling in Sri Lanka.
              </p>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
