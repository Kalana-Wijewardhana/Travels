"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, CheckCircle, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { submitQuoteRequest, type QuoteFormData } from "@/actions/quote-actions"
import { toast } from "@/components/ui/use-toast"

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone: "",
    destination: "",
    duration: "",
    travelers: "",
    startDate: undefined,
    budget: "",
    interests: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleNext = () => {
    if (step === 1) {
      // Validate first step
      if (!formData.name || !formData.email) {
        setError("Please fill in all required fields")
        return
      }
    } else if (step === 2) {
      // Validate second step
      if (!formData.destination) {
        setError("Please select a destination")
        return
      }
    }

    setError(null)
    if (step < 3) setStep(step + 1)
  }

  const handlePrev = () => {
    setError(null)
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const result = await submitQuoteRequest(formData)

      if (result.success) {
        setIsSubmitted(true)
        toast({
          title: "Quote Request Submitted",
          description: "We'll get back to you with a personalized quote soon!",
        })
      } else {
        setError(result.message || "Something went wrong. Please try again.")
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message || "Failed to submit your request. Please try again.",
        })
      }
    } catch (err) {
      console.error("Error submitting form:", err)
      setError("An unexpected error occurred. Please try again.")
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const destinations = [
    "Cultural Triangle (Sigiriya, Dambulla, Polonnaruwa)",
    "Hill Country (Kandy, Ella, Nuwara Eliya)",
    "Coastal Areas (Galle, Mirissa, Unawatuna)",
    "Wildlife Safari (Yala, Udawalawe)",
    "Complete Island Tour",
    "Custom Itinerary",
  ]

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </motion.div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Quote Request Sent!</h3>
            <p className="text-slate-600">
              Thank you for your interest! Our travel experts will contact you within 24 hours with a personalized
              quote. We've also sent a confirmation email to {formData.email}.
            </p>
          </motion.div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">Get Your Custom Quote</DialogTitle>
          <div className="flex items-center space-x-2 mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i <= step ? "bg-emerald-600" : "bg-slate-200"
                } transition-colors duration-300`}
              />
            ))}
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Trip Details</h3>
                <div>
                  <Label>Preferred Destination *</Label>
                  <Select
                    value={formData.destination}
                    onValueChange={(value) => setFormData({ ...formData, destination: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {destinations.map((dest) => (
                        <SelectItem key={dest} value={dest}>
                          {dest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Duration</Label>
                    <Select
                      value={formData.duration}
                      onValueChange={(value) => setFormData({ ...formData, duration: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Trip duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-3 days">1-3 days</SelectItem>
                        <SelectItem value="4-7 days">4-7 days</SelectItem>
                        <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                        <SelectItem value="2+ weeks">2+ weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Number of Travelers</Label>
                    <Select
                      value={formData.travelers}
                      onValueChange={(value) => setFormData({ ...formData, travelers: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="How many people?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 person</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="3-5">3-5 people</SelectItem>
                        <SelectItem value="6-10">6-10 people</SelectItem>
                        <SelectItem value="10+">10+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Preferred Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => setFormData({ ...formData, startDate: date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Preferences & Budget</h3>
                <div>
                  <Label>Budget Range (USD)</Label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) => setFormData({ ...formData, budget: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-500">Under $500</SelectItem>
                      <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                      <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                      <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                      <SelectItem value="5000+">$5,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="interests">Special Interests</Label>
                  <Input
                    id="interests"
                    placeholder="e.g., Wildlife, Culture, Adventure, Photography"
                    value={formData.interests}
                    onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your dream trip..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-between pt-6">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={handlePrev}>
                Previous
              </Button>
            )}
            <div className="ml-auto">
              {step < 3 ? (
                <Button type="button" onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700">
                  Next
                </Button>
              ) : (
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Quote Request"
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
