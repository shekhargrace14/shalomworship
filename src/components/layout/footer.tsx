import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-4 md:flex-row">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="Shalom Worship"
            width={36}
            height={36}
            className="h-10 w-auto"
          />

          <span className="font-semibold">
            Shalom Worship
          </span>
        </Link>

        {/* Email */}
        <a
          href="mailto:connect@shalomworship.com"
          className="
            text-sm
            text-muted-foreground
            transition-colors
            hover:text-foreground
          "
        >
          connect@shalomworship.com
        </a>

        {/* CTA */}
        <Link
          href="/submission"
          className="
            text-sm
            font-medium
            transition-colors
            hover:text-primary
          "
        >
          <Button variant="outline">
            Contact Us
          </Button>
        </Link>
      </div>
    </footer>
  )
}