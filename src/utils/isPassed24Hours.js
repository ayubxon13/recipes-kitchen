export function isPassed24Hours(itemCreatedDate) {
  const now = new Date().getTime()
  const validCreatedDate = new Date(itemCreatedDate)
  const timeDifference = now - validCreatedDate.getTime()
  const hours24 = 24 * 60 * 60 * 1000
  return timeDifference >= hours24
}
