import { Logo } from "@/assets"
import Image from "next/image"
import { NavLink } from "../Navigation/NavLink"
import {
  Binoculars,
  ChartLineUp,
  List,
  SignIn,
  SignOut,
  User,
  X,
} from "phosphor-react"
import { Link } from "../Navigation/Link"
import { signOut, useSession } from "next-auth/react"
import { Avatar } from "../Data-Display/Avatar"

import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react"

export function Sidebar() {
  const session = useSession()
  const [open, setOpen] = useState(false)

  async function handleSignOut() {
    await signOut()
  }

  return (
    <>
      <div className="fixed bottom-4 left-5 top-5 hidden w-full max-w-[14.5rem] flex-col items-center gap-16 overflow-hidden rounded-xl bg-gray-800 py-12 xl:flex">
        <div
          aria-hidden
          className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-green-200 opacity-50 blur-[94px]"
        />
        <div
          aria-hidden
          className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-200 opacity-50 blur-[94px]"
        />
        <div
          aria-hidden
          className="absolute left-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-purple-200 opacity-80 blur-[226px]"
        />
        <div
          aria-hidden
          className="absolute -bottom-12 -left-28 h-72 w-72 rounded-full bg-green-200 opacity-80 blur-[262px]"
        />

        <Image
          src={Logo}
          alt="Logo do BookWise"
          quality={100}
          className="h-8 w-32"
        />

        <nav className="flex flex-col gap-4">
          <NavLink href="/" icon={ChartLineUp}>
            Início
          </NavLink>

          <NavLink href="/explore" icon={Binoculars}>
            Explorar
          </NavLink>

          {session.status === "authenticated" && (
            <NavLink href={`/profile/${session.data?.user.id}`} icon={User}>
              Perfil
            </NavLink>
          )}
        </nav>

        {session.status === "unauthenticated" ? (
          <Link href="/login" className="relative z-10 mt-auto">
            Fazer login
            <SignIn className="text-green-100" />
          </Link>
        ) : (
          <Link
            href=""
            as="button"
            onClick={handleSignOut}
            className="relative z-10 mt-auto"
          >
            <Avatar src={session.data?.user.avatar_url} alt="" size="sm" />
            <span title={session.data?.user.name}>
              {session.data?.user.name.split(" ")[0]}
            </span>
            <SignOut className="text-[#F75A68]" />
          </Link>
        )}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger className="fixed left-4 top-6 text-green-100 md:left-6 xl:hidden">
          <List className="h-7 w-7" />
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 grid overflow-y-auto bg-black/60">
            <Dialog.Content className="relative mr-auto flex h-full w-full max-w-[18rem] flex-col  items-center overflow-hidden bg-gray-800 px-12 py-16 pt-20 shadow-[-4px_0px_30px_0px_rgba(0,0,0,0.50)]">
              <Dialog.Close className="absolute right-6 top-6 z-10 text-gray-400 transition-colors hover:text-gray-200">
                <X className="h-6 w-6" />
              </Dialog.Close>

              <div
                aria-hidden
                className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-green-200 opacity-50 blur-[94px]"
              />
              <div
                aria-hidden
                className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-200 opacity-50 blur-[94px]"
              />
              <div
                aria-hidden
                className="absolute left-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-purple-200 opacity-80 blur-[226px]"
              />
              <div
                aria-hidden
                className="absolute -bottom-12 -left-28 h-72 w-72 rounded-full bg-green-200 opacity-80 blur-[262px]"
              />

              <Image
                src={Logo}
                alt="Logo do BookWise"
                quality={100}
                className="h-8 w-32"
              />

              <nav className="mt-16 flex flex-col gap-4">
                <NavLink
                  onClick={() => setOpen(false)}
                  href="/"
                  icon={ChartLineUp}
                >
                  Início
                </NavLink>

                <NavLink
                  onClick={() => setOpen(false)}
                  href="/explore"
                  icon={Binoculars}
                >
                  Explorar
                </NavLink>

                {session.status === "authenticated" && (
                  <NavLink
                    onClick={() => setOpen(false)}
                    href={`/profile/${session.data?.user.id}`}
                    icon={User}
                  >
                    Perfil
                  </NavLink>
                )}
              </nav>

              {session.status === "unauthenticated" ? (
                <Link href="/login" className="relative z-10 mt-auto">
                  Fazer login
                  <SignIn className="text-green-100" />
                </Link>
              ) : (
                <Link
                  href=""
                  as="button"
                  onClick={handleSignOut}
                  className="relative z-10 mt-auto"
                >
                  <Avatar
                    src={session.data?.user.avatar_url}
                    alt=""
                    size="sm"
                  />
                  <span title={session.data?.user.name}>
                    {session.data?.user.name.split(" ")[0]}
                  </span>
                  <SignOut className="text-[#F75A68]" />
                </Link>
              )}
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
