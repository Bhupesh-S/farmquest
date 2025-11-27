"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function ErrorScreen({ error, onRetry }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50 p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="w-16 h-16 bg-destructive/10 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Oops! Something went wrong</h2>
        <p className="text-sm text-muted-foreground mb-6">{error || "An unexpected error occurred"}</p>
        <Button onClick={onRetry} className="w-full">
          Try Again
        </Button>
      </Card>
    </div>
  )
}
