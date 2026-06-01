"use client"

import { useEffect, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { X } from "lucide-react"

import EventSection from "./event/EventSection"
import Social from "./ui/Social"

type Props = {
  data?: any[]
}

export function AutoPopup() {

  const [open, setOpen] = useState(false)

  useEffect(() => {

    // if (!data?.length) return

    const seen =
      sessionStorage.getItem("welcome-popup")

    if (!seen) {

      setOpen(true)

      sessionStorage.setItem(
        "welcome-popup",
        "true"
      )

      const timer = setTimeout(() => {
        setOpen(false)
      }, 5000)

      return () => clearTimeout(timer)
    }

  }, [])

  // console.log(data)

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="max-w-md px-4">

        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogHeader>
          <DialogTitle>
            Join Our Community 
          </DialogTitle>
        </DialogHeader>

        <Social />

      </DialogContent>
    </Dialog>
  )
}