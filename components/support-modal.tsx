"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MessageCircle, Clock, CheckCircle, Loader2 } from "lucide-react"
import { submitSupportRequest, type SupportFormData } from "@/actions/support-actions"
import { toast } from "@/components/ui/use-toast"

interface SupportModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [activeTab, setActiveTab] = useState<"contact" | "form">("contact")
  const [formData, setFormData] = useState<SupportFormData>({
    name: "",
    email: "",
    subject: "",
    priority: "medium",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        setError("Please fill in all required fields")
        setIsSubmitting(false)
        return
      }

      const result = await submitSupportRequest(formData)

      if (result.success) {
        setIsSubmitted(true)
        toast({
          title: "Support Request Submitted",
          description: "We'll get back to you as soon as possible!",
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
            <h3 className="text-xl font-bold text-slate-800 mb-2">Support Request Sent!</h3>
            <p className="text-slate-600">
              Thank you for contacting us! Our support team will get back to you within{" "}
              {formData.priority === "urgent" || formData.priority === "high" ? "2 hours" : "24 hours"}. We've also sent
              a confirmation email to {formData.email}.
            </p>
          </motion.div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">24/7 Support</DialogTitle>
          <p className="text-slate-600">We're here to help you with any questions or concerns</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab("contact")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "contact" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Contact Info
            </button>
            <button
              onClick={() => setActiveTab("form")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === "form" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Send Message
            </button>
          </div>

          {activeTab === "contact" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Emergency Support</h3>
                <p className="text-red-700 text-sm mb-3">For urgent travel emergencies while in Sri Lanka</p>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  +94 77 329 1468
                </Button>
              </div>

              {/* Regular Support Options */}
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center"
                >
                  <Phone className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-2">Phone Support</h3>
                  <p className="text-slate-600 text-sm mb-3">Available 24/7</p>
                  <p className="font-medium text-emerald-600">+94 77 329 1468</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center"
                >
                  <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-2">Email Support</h3>
                  <p className="text-slate-600 text-sm mb-3">Response within 2 hours</p>
                  <p className="font-medium text-blue-600">anujatravelstoursdee@gmail.com</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center"
                >
                  <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-2">Live Chat</h3>
                  <p className="text-slate-600 text-sm mb-3">Instant responses</p>
                  <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    Start Chat
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center"
                >
                  <Clock className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-slate-800 mb-2">Office Hours</h3>
                  <p className="text-slate-600 text-sm mb-1">Mon-Fri: 8:00 AM - 8:00 PM</p>
                  <p className="text-slate-600 text-sm">Weekends: 9:00 AM - 6:00 PM</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === "form" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="support-name">Name *</Label>
                    <Input
                      id="support-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="support-email">Email *</Label>
                    <Input
                      id="support-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="support-subject">Subject *</Label>
                    <Input
                      id="support-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="support-message">Message *</Label>
                  <Textarea
                    id="support-message"
                    placeholder="Describe your issue or question..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Support Request"
                  )}
                </Button>
              </form>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
