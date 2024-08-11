import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailVerificationProps {
  fullname?: string;
  token?: string;
}

export const EmailVerification = ({
  fullname,
  token,
}: EmailVerificationProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={text}>Hi {fullname},</Text>
            <Text style={text}>Thank you for signing up with MOOX!</Text>
            <Text style={text}>
              To complete your registration, please verify your email address by
              clicking the link below:
            </Text>
            <Link
              href={`${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`}
              target="_blank"
              style={{
                ...link,
                display: "block",
                marginBottom: "16px",
              }}
            >
              Click here to verify
            </Link>
            <Text style={text}>
              If you did not sign up for this account, please ignore this email.
            </Text>
            <Text style={text}>Thank you for joining us!</Text>
            <Text style={text}>Happy watching!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailVerification;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "400",
  color: "#404040",
  lineHeight: "26px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};
