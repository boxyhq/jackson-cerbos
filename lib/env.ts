export const env = {
  // NextAuth
  nextauth: {
    secret: process.env.NEXTAUTH_SECRET || "secret",
    url: process.env.NEXTAUTH_URL || "http://localhost:3366",
  },

  // BoxyHQ SAML Jackson
  jackson: {
    endpoint:
      process.env.BOXYHQ_SAML_JACKSON_URL || "https://jackson-demo.boxyhq.com",
    product: process.env.BOXYHQ_PRODUCT || "saml-demo.boxyhq.com",
  },
};
