import dayjs from "dayjs"
import "dayjs/locale/pt-br"
import { default as relativeTime } from "dayjs/plugin/relativeTime"

dayjs.locale("pt-br")
dayjs.extend(relativeTime)
