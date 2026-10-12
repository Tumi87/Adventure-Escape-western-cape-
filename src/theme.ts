export const C = {
  green: '#2E5B3C',
  cream: '#F3EBDC',
  card: '#FBF7EE',
  orange: '#B9531F',
  text: '#2A2A26',
  muted: '#7B7466',
  border: '#E1D6C2',
  mint: '#E6EBDD',
  white: '#FFFFFF',
};

export const money = (n: number) =>
  'R' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');