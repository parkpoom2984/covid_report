function formatComma(text: number = 0): string {
  return text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const Formatter = {
  formatComma,
};
