"use client"

import { ChevronLeft, Zap, Trophy } from "lucide-react"

export function QuestIntroScreen({ quest, onStart, onBack }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Quest Details</h1>
        <div className="w-9"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6 space-y-6">
        {/* Title & Description */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2 text-balance">{quest.title}</h2>
          <p className="text-foreground text-sm leading-relaxed">{quest.description}</p>
        </div>

        {/* Difficulty Badge */}
        <div className="inline-block">
          <span className="text-xs bg-accent/20 text-primary px-3 py-1 rounded-full font-bold">{quest.difficulty}</span>
        </div>

        {/* Activities */}
        <div>
          <h3 className="font-bold text-foreground mb-3">What You'll Do</h3>
          <div className="space-y-2">
            {quest.activities.map((activity, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-secondary/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">{idx + 1}</span>
                </div>
                <p className="text-sm text-foreground">{activity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div>
          <h3 className="font-bold text-foreground mb-3">What You'll Learn</h3>
          <div className="space-y-2">
            {quest.outcomes.map((outcome, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="text-accent mt-0.5">✓</div>
                <p className="text-sm text-foreground">{outcome}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards Preview */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <h3 className="font-bold text-foreground mb-4">Rewards</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="bg-accent/10 rounded-xl p-3 inline-flex mb-2">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <p className="text-2xl font-bold text-accent">{quest.xpReward}</p>
              <p className="text-xs text-muted-foreground mt-1">XP Points</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 rounded-xl p-3 inline-flex mb-2">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
              <p className="text-lg font-bold text-foreground">{quest.badgeName}</p>
              <p className="text-xs text-muted-foreground mt-1">Badge</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="px-6 pb-6 space-y-3">
        <button
          onClick={onStart}
          className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors"
        >
          Start Quest
        </button>
        <button
          onClick={onBack}
          className="w-full border border-border text-foreground font-bold py-3 rounded-xl hover:bg-muted transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
