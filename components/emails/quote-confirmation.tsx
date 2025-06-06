import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from "@react-email/components"

interface QuoteConfirmationEmailProps {
  name: string
  destination: string
  startDate?: string
  duration?: string
  travelers?: string
}

export const QuoteConfirmationEmail = ({
  name = "Valued Customer",
  destination = "Sri Lanka",
  startDate = "Not specified",
  duration = "Not specified",
  travelers = "Not specified",
}: QuoteConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Sri Lanka Tour Quote Request Confirmation</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://via.placeholder.com/150x50.png?text=Sri+Lanka+Travels"
            width="150"
            height="50"
            alt="Sri Lanka Travels"
            style={logo}
          />
          <Heading style={heading}>Tour Quote Request Received</Heading>
          <Text style={paragraph}>Hello {name},</Text>
          <Text style={paragraph}>
            Thank you for your interest in visiting beautiful Sri Lanka! We have received your tour quote request and
            our team of local experts is already working on creating a personalized itinerary for you.
          </Text>
          <Section style={quoteDetails}>
            <Heading as="h2" style={subheading}>
              Your Request Details:
            </Heading>
            <Text style={detailItem}>
              <strong>Destination:</strong> {destination}
            </Text>
            <Text style={detailItem}>
              <strong>Preferred Start Date:</strong> {startDate}
            </Text>
            <Text style={detailItem}>
              <strong>Duration:</strong> {duration}
            </Text>
            <Text style={detailItem}>
              <strong>Number of Travelers:</strong> {travelers}
            </Text>
          </Section>
          <Text style={paragraph}>
            One of our destination experts will contact you within 24 hours with a customized quote based on your
            preferences. If you have any questions in the meantime, please don't hesitate to contact us.
          </Text>
          <Text style={paragraph}>We look forward to helping you plan an unforgettable Sri Lankan adventure!</Text>
          <Text style={paragraph}>Warm regards,</Text>
          <Text style={paragraph}>The Sri Lanka Travels Team</Text>
          <Text style={footer}>
            © 2024 Sri Lanka Travels. All rights reserved.
            <br />
            <Link href="https://srilankatravels.com" style={link}>
              srilankatravels.com
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
}

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  backgroundColor: "#ffffff",
  maxWidth: "600px",
}

const logo = {
  margin: "0 auto 20px",
  display: "block",
}

const heading = {
  fontSize: "24px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#10b981",
  textAlign: "center" as const,
  margin: "30px 0",
}

const subheading = {
  fontSize: "18px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#333",
  margin: "20px 0 10px",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#333",
  margin: "16px 0",
}

const quoteDetails = {
  backgroundColor: "#f9fafb",
  padding: "20px",
  borderRadius: "5px",
  margin: "20px 0",
}

const detailItem = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#333",
  margin: "8px 0",
}

const footer = {
  fontSize: "14px",
  lineHeight: "1.5",
  color: "#666",
  textAlign: "center" as const,
  margin: "40px 0 0",
}

const link = {
  color: "#10b981",
  textDecoration: "underline",
}

export default QuoteConfirmationEmail
