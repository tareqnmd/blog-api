export const makeSixDigitRandomCodeFromTime = () => {
  const timestamp = Date.now().toString();
  const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const randomDigits = Math.floor(100 + Math.random() * 900).toString();
  return randomLetter + randomDigits + timestamp.slice(-3);
};

export const generateSlugText = (title: string) => {
  const randomCode = makeSixDigitRandomCodeFromTime();
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') + `-${randomCode}`
  );
};
