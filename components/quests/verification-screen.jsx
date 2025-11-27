"use client"

import { CheckCircle2, Clock } from "lucide-react"

export function VerificationScreen({ quest, onContinue }) {
  const isAutoVerified = quest.id === "crops"

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center animate-pulse">
              {isAutoVerified ? (
                <CheckCircle2 className="w-12 h-12 text-accent" />
              ) : (
                <Clock className="w-12 h-12 text-primary" />
              )}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground mb-3 text-balance">
              {isAutoVerified ? "Verification Successful! ✓" : "Awaiting Mentor Review"}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {isAutoVerified
                ? `Your crop selections have been automatically verified. You're ready to claim your rewards!`
                : `Your submission has been received. Our community mentors will review your work within 24 hours. We appreciate your effort!`}
            </p>
          </div>

          {!isAutoVerified && (
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-left">
              <p className="text-xs text-muted-foreground">
                <strong>Did you know?</strong> Beginner quests are verified by our friendly mentors who provide helpful
                feedback.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-6">
        <button
          onClick={onContinue}
          className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
