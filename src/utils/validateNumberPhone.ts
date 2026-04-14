export const validatePhone = (number: string) => {
  // Remove non-digit characters to count actual digits
  const digits = number.replace(/\D/g, '')
  // Accept phone numbers with 10-15 digits
  return digits.length >= 10 && digits.length <= 15
}
