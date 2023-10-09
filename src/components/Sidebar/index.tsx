import { Logo } from "@/assets"
import Image from "next/image"
import { NavLink } from "../Navigation/NavLink"
import { Binoculars, ChartLineUp, SignIn } from "phosphor-react"
import { Link } from "../Navigation/Link"

export function Sidebar() {
  return (
    <div className="relative flex max-h-[61.75rem] w-full max-w-[14.5rem] flex-col items-center gap-16 overflow-hidden rounded-xl bg-gray-800 py-12">
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
      </nav>

      <Link href="/login" className="mt-auto">
        Fazer login
        <SignIn className="text-green-100" />
      </Link>
    </div>
  )
}
