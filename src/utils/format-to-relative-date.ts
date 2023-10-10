import dayjs from "dayjs"

export function formatToRelativeDate(date: Date) {
  const relativeDate = dayjs(date).fromNow()
  return relativeDate
    .substring(0, 1)
    .toUpperCase()
    .concat(relativeDate.substring(1))
}
