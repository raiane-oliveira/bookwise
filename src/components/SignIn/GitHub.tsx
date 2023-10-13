import { Icon } from "@iconify/react/dist/iconify.js"
import { Box } from "../Data-Display/Box"
import { Text } from "../Typography/Text"
import { signIn } from "next-auth/react"

export function GitHub() {
  return (
    <Box
      as="button"
      hasHover
      className="gap-5"
      onClick={() => signIn("github")}
    >
      <Icon icon="akar-icons:github-fill" className="h-8 w-8 text-white" />
      <Text className="text-lg/relaxed font-bold text-gray-200">
        Entrar com GitHub
      </Text>
    </Box>
  )
}
