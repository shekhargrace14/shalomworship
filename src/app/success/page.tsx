"use client";

import { CheckCircle2, ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function page() {
  const router = useRouter();

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <Card className="w-full max-w-lg border-0 shadow-xl">
        <CardContent className="flex flex-col items-center p-8 text-center">
          
          {/* Success Icon */}
          <div className="mb-6 animate-bounce">
            <CheckCircle2
              size={80}
              className="text-green-500"
            />
          </div>

          {/* Heading */}
          <h1 className="mb-2 text-3xl font-bold">
            Submission Successful
          </h1>

          {/* Description */}
          <p className="mb-8 max-w-md text-muted-foreground">
            Thank you for reaching out. We have received your submission
            and will review it shortly.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>

            <Button
              onClick={() => router.push("/")}
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}