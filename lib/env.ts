export const env = {
  // NextAuth
  nextauth: {
    secret: process.env.NEXTAUTH_SECRET || "secret",
    url: process.env.NEXTAUTH_URL || "http://localhost:3366",
  },

  // BoxyHQ SAML Jackson
  jackson: {
    url:
      process.env.BOXYHQ_SAML_JACKSON_URL || "https://jackson-demo.boxyhq.com",
    apiKey: process.env.BOXYHQ_SAML_JACKSON_API_KEY || "secret",
    product: process.env.BOXYHQ_PRODUCT || "jackson-cerbos",
    redirectUrl: `${process.env.APP_URL}/login`,
    defaultRedirectUrl: `${process.env.APP_URL}/login`,
  },
};
