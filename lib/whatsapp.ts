// lib/whatsapp.ts
export const WHATSAPP_NUMBER = "+94766034211"; // Replace with your actual WhatsApp number

export function createWhatsAppUrl(
  message: string,
  phoneNumber: string = WHATSAPP_NUMBER
): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodedMessage}`;
}

export function openWhatsApp(message: string, phoneNumber?: string) {
  const url = createWhatsAppUrl(message, phoneNumber);
  window.open(url, "_blank");
}

// Pre-defined message templates
export const whatsappMessages = {
  general:
    "Hi! I'm interested in Sri Lanka tours. Can you help me plan my trip?",
  quote:
    "Hi! I'd like to get a custom quote for a Sri Lanka tour. Can we discuss the details?",
  emergency:
    "Hi! I need urgent assistance with my Sri Lanka trip. Please help!",
  booking:
    "Hi! I'd like to book a tour to Sri Lanka. Can you assist me with the booking process?",
  inquiry: (destination: string) =>
    `Hi! I'm interested in visiting ${destination} in Sri Lanka. Can you provide more information about tours and packages?`,
  support: (issue: string) =>
    `Hi! I need support with: ${issue}. Can you please help me?`,
};
