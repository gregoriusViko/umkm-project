const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

const ratingFormatter = new Intl.NumberFormat('id-ID', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

const soldFormatter = new Intl.NumberFormat('id-ID', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

export const formatCurrency = (value: number) => currencyFormatter.format(value)
export const formatRating = (value: number) => ratingFormatter.format(value)
export const formatSold = (value: number) => `${soldFormatter.format(value)} terjual`
