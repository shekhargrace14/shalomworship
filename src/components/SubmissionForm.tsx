"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { SubmissionType } from "@prisma/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { FieldError } from "./ui/field"
import { Loader2 } from "lucide-react"

const Type =
  Object.values(SubmissionType)

export default function SubmissionForm() {

  const router = useRouter();
  const [formData, setFormData] = useState({
    type: "CONTACT",
    name: "",
    email: "",
    title: "",
    message: "",
    subject: "",
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
const [loading, setLoading] = useState(false);
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    console.log(formData)

    // POST /api/submission
    const payload = formData
    try {
      setLoading(true);
      const res = await fetch(
        "https://dashboard.shalomworship.com/api/submission",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            formData
          ),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.message || "Failed to submit"
        )
      }

      toast.success("Message Sent")
      router.push("/success");

    } catch (error: any) {

      console.error(error)

      toast.error(
        error.message || "Failed to send"
      )

    }
    finally {
    setLoading(false);
  }
  }

  return (
    <Card className="max-w-full mx-auto m-4">
      <CardHeader>
        <CardTitle>
          Submit Request
        </CardTitle>

        <CardDescription>
          Send us your feedback,
          request, suggestion, or report.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* TYPE */}
          <div className="space-y-2">
            <Label>
              Submission Type
            </Label>

            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  type: value as SubmissionType,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {Type?.map((item) => (

                    <SelectItem key={item} value={item}>{item}</SelectItem>
                  ))}

                </SelectGroup>

              </SelectContent>
            </Select>
          </div>
          {/* Subject */}
          <div className="space-y-2">
            <Label>Subject  <span className="text-destructive">*</span></Label>

            <Input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject"
            />
            <FieldError></FieldError>
          </div>

          {/* NAME + EMAIL */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name  <span className="text-destructive">*</span></Label>

              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Email  <span className="text-destructive">*</span></Label>

              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required

              />
            </div>
          </div>

          {/* TITLE */}
          <div className="space-y-2">
            <Label>Title <span className="text-destructive">*</span></Label>

            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
            />
          </div>

          {/* MESSAGE */}
          <div className="space-y-2">
            <Label>Message  <span className="text-destructive">*</span></Label>

            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              placeholder="Describe your request..."
              required

            />
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Sending...
    </>
  ) : (
    "Send Reply"
  )}

          </Button>
        </form>
      </CardContent>
    </Card>
  )
}