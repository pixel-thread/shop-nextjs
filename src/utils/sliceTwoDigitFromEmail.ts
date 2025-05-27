export function sliceTwoDigitFromEmail(email: string) {
  // slice two digits from email
  if (email === undefined) return "N/A";
  // return just two letter only
  return email.slice(0, 1).toUpperCase();
}
