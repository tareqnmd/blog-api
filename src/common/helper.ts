export const makeSixDigitRandomCodeFromTime = () => {
  const timestamp = Date.now().toString();
  const randomLetters = Array(3)
    .fill(0)
    .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
    .join('');
  return randomLetters + timestamp.slice(-3);
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
