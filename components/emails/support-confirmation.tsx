import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from "@react-email/components"

interface SupportConfirmationEmailProps {
  name: string
  subject: string
  priority: string
}

export const SupportConfirmationEmail = ({
  name = "Valued Customer",
  subject = "Support Request",
  priority = "Medium",
}: SupportConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Support Request Has Been Received</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://via.placeholder.com/150x50.png?text=Sri+Lanka+Travels"
            width="150"
            height="50"
            alt="Sri Lanka Travels"
            style={logo}
          />
          <Heading style={heading}>Support Request Received</Heading>
          <Text style={paragraph}>Hello {name},</Text>
          <Text style={paragraph}>
            Thank you for contacting Sri Lanka Travels support. We have received your request and our team will address
            it promptly.
          </Text>
          <Section style={requestDetails}>
            <Heading as="h2" style={subheading}>
              Request Details:
            </Heading>
            <Text style={detailItem}>
              <strong>Subject:</strong> {subject}
            </Text>
            <Text style={detailItem}>
              <strong>Priority:</strong> {priority}
            </Text>
            <Text style={detailItem}>
              <strong>Request ID:</strong> #
              {Math.floor(Math.random() * 1000000)
                .toString()
                .padStart(6, "0")}
            </Text>
          </Section>
          <Text style={paragraph}>
            {priority === "urgent" || priority === "high"
              ? "Due to the high priority of your request, our team will respond within 1-2 hours."
              : "Our support team will get back to you within 24 hours."}
          </Text>
          <Text style={paragraph}>
            If you have an urgent travel emergency, please call our 24/7 emergency support line at  +94 77 329 1468.
          </Text>
          <Text style={paragraph}>Thank you for your patience,</Text>
          <Text style={paragraph}>The Sri Lanka Travels Support Team</Text>
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

const requestDetails = {
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

export default SupportConfirmationEmail
