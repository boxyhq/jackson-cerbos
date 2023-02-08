const extractDomain = (email: string): string => {
  return email.split("@")[1];
};

export { extractDomain };
