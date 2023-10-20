import { MagnifyingGlass } from "phosphor-react"
import { ComponentProps, forwardRef, useState } from "react"
import { twMerge } from "tailwind-merge"

export interface InputProps extends ComponentProps<"input"> {}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [active, setActive] = useState(false)

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded border bg-gray-800 px-5 py-3.5 ${
        active ? "border-green-200" : "border-gray-500"
      }`}
    >
      <input
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        {...props}
        className={twMerge(
          `peer flex-1 bg-transparent font-sans text-sm/relaxed text-gray-200 caret-green-100 outline-none placeholder:text-gray-400`,
          props.className,
        )}
        ref={ref}
      />
      <MagnifyingGlass
        weight="bold"
        className="h-5 w-5 text-gray-500 peer-focus:text-green-200"
      />
    </div>
  )
})
