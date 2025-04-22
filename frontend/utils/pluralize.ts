export function pluralizeClicks(count: number): string {
  const absCount = Math.abs(count);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;

  let word: string;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    word = "нажатий";
  } else if (lastDigit === 1) {
    word = "нажатие";
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    word = "нажатия";
  } else {
    word = "нажатий";
  }

  return `${count} ${word}`;
}
