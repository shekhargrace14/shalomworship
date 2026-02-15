"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X } from "lucide-react"

export function AutoPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem("welcome-popup")

    if (!seen) {
      setOpen(true)
      localStorage.setItem("welcome-popup", "true")

      const timer = setTimeout(() => {
        setOpen(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="max-w-md px-4">
        {/* Manual close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <DialogHeader>
          <DialogTitle>Welcome 👋</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Discover worship songs, lyrics, chords and meanings.
        </p>
      </DialogContent>
    </Dialog>
  )
}
