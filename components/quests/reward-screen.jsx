"use client"

import { Zap, Trophy } from "lucide-react"

export function RewardScreen({ quest, onContinue }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 space-y-8">
        {/* Celebration */}
        <div className="text-center space-y-4">
          <div className="flex justify-center text-6xl mb-4">🎉 🌟 🎉</div>
          <h2 className="text-4xl font-bold text-foreground text-balance">Quest Complete!</h2>
          <p className="text-muted-foreground">Amazing work! You've earned rewards for completing {quest.title}</p>
        </div>

        {/* XP Earned */}
        <div className="w-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-accent" />
            <span className="text-5xl font-bold text-accent">+{quest.xpReward}</span>
          </div>
          <p className="text-center text-muted-foreground text-sm">Experience Points</p>
        </div>

        {/* Badge Earned */}
        <div className="w-full bg-card rounded-2xl p-6 border border-border text-center">
          <div className="flex justify-center mb-3">
            <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary/80 rounded-full flex items-center justify-center">
              <Trophy className="w-10 h-10 text-accent-foreground" />
            </div>
          </div>
          <h3 className="font-bold text-foreground mb-1">New Badge Unlocked!</h3>
          <p className="text-2xl font-bold text-primary mb-2">{quest.badgeName}</p>
          <p className="text-xs text-muted-foreground">Added to your collection</p>
        </div>

        {/* Level Progress */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Level Progress</span>
            <span className="text-sm font-bold text-primary">455/600 XP</span>
          </div>
          <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-secondary h-full rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground text-center">Level up in 145 XP!</p>
        </div>
      </div>

      <div className="px-6 pb-6">
        <button
          onClick={onContinue}
          className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors"
        >
          Great! Continue
        </button>
      </div>
    </div>
  )
}
