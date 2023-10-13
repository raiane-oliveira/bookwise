import { Icon } from "@iconify/react/dist/iconify.js"
import { Box } from "../Data-Display/Box"
import { Text } from "../Typography/Text"
import { signIn } from "next-auth/react"

export function Google() {
  return (
    <Box
      as="button"
      hasHover
      className="gap-5"
      onClick={() => signIn("google")}
    >
      <Icon icon="flat-color-icons:google" className="h-8 w-8" />
      <Text className="text-lg/relaxed font-bold text-gray-200">
        Entrar com Google
      </Text>
    </Box>
  )
}
