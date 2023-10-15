import { Link } from "@/components/Navigation/Link"
import { Text, TextProps } from "@/components/Typography/Text"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

interface ReadMoreProps extends Omit<TextProps, "children"> {
  text: string
}

const MAX_LENGTH_CHARACTERS = 256

export function ReadMore({ text, ...props }: ReadMoreProps) {
  const [isReadMore, setIsReadMore] = useState(true)

  return (
    <Text
      {...props}
      className={twMerge(`whitespace-pre-wrap`, props.className)}
    >
      {isReadMore && text.length > MAX_LENGTH_CHARACTERS
        ? `${text.replaceAll("\n", "").slice(0, MAX_LENGTH_CHARACTERS)}...`
        : text}

      {text.length > MAX_LENGTH_CHARACTERS && (
        <Link
          href=""
          as="button"
          variant="secondary"
          size="sm"
          className="inline"
          onClick={(e) => {
            e.stopPropagation()
            setIsReadMore((state) => !state)
          }}
        >
          {isReadMore ? "ver mais" : "ver menos"}
        </Link>
      )}
    </Text>
  )
}
