import { ComponentProps, useState } from "react"
import { twMerge } from "tailwind-merge"

export interface TextAreaProps extends ComponentProps<"textarea"> {}

export function TextArea(props: TextAreaProps) {
  const [active, setActive] = useState(false)

  return (
    <div
      className={`relative rounded border bg-gray-800 px-5 py-3.5 ${
        active ? "border-green-200" : "border-gray-500"
      }`}
    >
      <textarea
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        {...props}
        className={twMerge(
          `peer flex-1 resize-none bg-transparent font-sans text-sm/relaxed text-gray-200 caret-green-100 outline-none placeholder:text-gray-400`,
          props.className,
        )}
      />
    </div>
  )
}
