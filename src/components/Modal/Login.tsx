import * as Dialog from "@radix-ui/react-dialog"
import { X } from "phosphor-react"
import { Text } from "../Typography/Text"
import { Google } from "../SignIn/Google"
import { GitHub } from "../SignIn/GitHub"

export function Login() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay
        className={`fixed inset-0 z-50 grid grid-cols-[32.25rem] place-content-center overflow-y-auto bg-black/30`}
      >
        <Dialog.Content className="relative grid w-full rounded-xl bg-gray-700 px-[4.5rem] py-14 shadow-[4px_16px_24px_0px_rgba(0,0,0,0.25)]">
          <Dialog.Close className="absolute right-4 top-4">
            <X className="h-6 w-6 text-gray-400" />
          </Dialog.Close>

          <Dialog.Title asChild>
            <Text
              size="md"
              className="text-center font-bold leading-base text-gray-200"
            >
              Faça login para deixar sua avaliação
            </Text>
          </Dialog.Title>

          <div className="mt-10 w-full space-y-4 [&_button]:w-full">
            <Google />
            <GitHub />
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}
