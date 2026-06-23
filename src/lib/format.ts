export const formatPrice = (n: number) =>
  new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(n) + ' ₽';

export const formatPriceShort = (n: number) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1) + ' млн ₽';
  if (n >= 1_000) return Math.round(n / 1_000) + ' тыс ₽';
  return n + ' ₽';
};

export const formatArea = (n: number) => `${n} м²`;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
