// Cache regex outside function for better performance (js-hoist-regexp)
const PHONE_REGEX = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/

export const validatePhone = (number: string) => {
  return PHONE_REGEX.test(number)
}
