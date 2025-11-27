"use client"

import { ChevronLeft, CheckCircle2, Circle } from "lucide-react"
import { useState, useEffect } from "react"
import { QuestCompletionProgress } from "./quest-completion-progress"

export const stepsData = {
  soil_scout: [
    { icon: "🥄", title: "Collect Soil", instruction: "Dig 6 inches deep and collect a small soil sample." },
    { icon: "✋", title: "Texture Test", instruction: "Rub soil between fingers to check sand/silt/clay ratio." },
    { icon: "💧", title: "Moisture Check", instruction: "Observe if soil feels dry, moist, or sticky." },
    { icon: "👃", title: "Smell Test", instruction: "Healthy soil has an earthy smell with no foul odor." }
  ],

  crop_quest: [
    { icon: "👀", title: "Explore Crops", instruction: "Browse suggested crops based on your region." },
    { icon: "🌾", title: "Pick Your 3 Crops", instruction: "Select crops that fit your climate & land." },
    { icon: "📅", title: "Check Season", instruction: "Match each crop with the correct planting season." },
    { icon: "💧", title: "Water Needs", instruction: "Confirm whether crops require low, medium, or high water." }
  ],

  compost_kickoff: [
    { icon: "📍", title: "Choose Spot", instruction: "Select a shaded spot with good airflow." },
    { icon: "🥬", title: "Add Greens", instruction: "Include kitchen waste like peels & scraps." },
    { icon: "🍂", title: "Add Browns", instruction: "Mix dry leaves, cardboard, or straw." },
    { icon: "🔄", title: "Mix Weekly", instruction: "Turn compost every 7 days to speed decomposition." }
  ],

  zero_waste: [
    { icon: "♻️", title: "Segregate Waste", instruction: "Separate organic & non-organic waste at home." },
    { icon: "🍂", title: "Collect Dry Leaves", instruction: "Store leaves for mulching your plants." },
    { icon: "🗑️", title: "Mini Waste Station", instruction: "Set up 2–3 labeled bins for easy segregation." }
  ],

  mini_garden: [
    { icon: "🌱", title: "Pick 5 Plants", instruction: "Choose beginner-friendly herbs/veggies." },
    { icon: "🪴", title: "Prepare Patch", instruction: "Loosen top soil in a 1×1m area." },
    { icon: "🌾", title: "Plant Seeds", instruction: "Sow seeds or plant small saplings." },
    { icon: "💧", title: "Water & Mulch", instruction: "Keep soil moist and apply mulch on top." }
  ],

  mulch_master: [
    { icon: "🍂", title: "Collect Mulch", instruction: "Gather dry leaves, straw, or grass clippings." },
    { icon: "🌿", title: "Spread Mulch", instruction: "Create a 2–3 inch thick layer around the plant." },
    { icon: "💦", title: "Settle Mulch", instruction: "Water lightly to keep mulch in place." }
  ],

  boll_keeper: [
    { icon: "🔍", title: "Inspect Bolls", instruction: "Check for early shedding & pest marks." },
    { icon: "🧪", title: "Nutrient Spray", instruction: "Apply balanced micronutrient foliar spray." },
    { icon: "✂️", title: "Remove Damage", instruction: "Cut off pest-affected bolls to prevent spread." }
  ],

  coconut_basin: [
    { icon: "📏", title: "Mark Radius", instruction: "Draw a 1–1.5m circle around the tree." },
    { icon: "⛏️", title: "Dig Basin", instruction: "Create a shallow circular trench." },
    { icon: "📐", title: "Level Soil", instruction: "Flatten inner area for even watering." },
    { icon: "🍂", title: "Add Mulch", instruction: "Fill with dry leaves or coconut husk." },
    { icon: "💧", title: "Water", instruction: "Water gently to help basin settle." }
  ],

  coconut_bioenzyme: [
    { icon: "🥥", title: "Collect Water", instruction: "Use leftover coconut water as base." },
    { icon: "🍯", title: "Add Jaggery", instruction: "Mix jaggery to feed microbes." },
    { icon: "🧪", title: "Ferment 7 Days", instruction: "Store sealed and allow natural fermentation." },
    { icon: "💧", title: "Dilute & Apply", instruction: "Mix with water (1:20) and pour around root zone." }
  ],

  rust_shield: [
    { icon: "🔍", title: "Spot Symptoms", instruction: "Look for yellow/orange rust patches on leaves." },
    { icon: "✂️", title: "Remove Infected Leaves", instruction: "Cut and discard affected parts safely." },
    { icon: "🌬️", title: "Improve Airflow", instruction: "Ensure proper spacing between plants." },
    { icon: "🧴", title: "Organic Spray", instruction: "Apply safe fungicidal solution weekly." }
  ],

  biodiversity_strip: [
    { icon: "🌼", title: "Select Flowers", instruction: "Choose 5 pollinator-friendly plants." },
    { icon: "📏", title: "Mark 1m Strip", instruction: "Prepare a 1-meter planting strip." },
    { icon: "🌱", title: "Cluster Planting", instruction: "Plant flowers in small clusters." },
    { icon: "🍂", title: "Mulch & Water", instruction: "Mulch lightly and water regularly." }
  ],

  rainwater_hero: [
    { icon: "🛢️", title: "Place Barrel", instruction: "Set container under roof edge to collect runoff." },
    { icon: "🧵", title: "Add Mesh Filter", instruction: "Install mesh to block debris and insects." },
    { icon: "🚰", title: "Fit Tap", instruction: "Attach outlet tap near bottom of barrel." },
    { icon: "💧", title: "Use Saved Water", instruction: "Water plants using collected rainwater." }
  ],

  biochar_maker: [
    { icon: "🪵", title: "Gather Waste Wood", instruction: "Collect dry sticks, branches, and husk pieces." },
    { icon: "🔥", title: "Burn Low-Oxygen", instruction: "Slow-burn in pit while limiting airflow." },
    { icon: "🪨", title: "Crush Charcoal", instruction: "Break cooled biochar into smaller pieces." },
    { icon: "🌱", title: "Mix with Compost", instruction: "Blend biochar into compost before application." }
  ],

  jeevamrutham: [
    { icon: "🐄", title: "Mix Dung & Urine", instruction: "Combine fresh cow dung and urine in a drum." },
    { icon: "🍯", title: "Add Jaggery + Flour", instruction: "Add jaggery & gram flour to feed microbes." },
    { icon: "🧪", title: "Ferment 5–7 Days", instruction: "Stir daily and allow microbial growth." },
    { icon: "🌾", title: "Apply to Soil", instruction: "Pour near root zone for microbial boost." }
  ]
};

export function QuestStepsScreen({ quest, onContinue, onBack }) {
  const steps = stepsData[quest.id] || []

  const storageKey = `quest_steps_${quest.id}`
  const [completedSteps, setCompletedSteps] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem(storageKey)
      return saved ? JSON.parse(saved) : new Array(steps.length).fill(false)
    }
    return new Array(steps.length).fill(false)
  })

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(completedSteps))
  }, [completedSteps, storageKey])

  const toggleStep = (index) => {
    const newCompleted = [...completedSteps]
    newCompleted[index] = !newCompleted[index]
    setCompletedSteps(newCompleted)
  }

  const completedCount = completedSteps.filter(Boolean).length

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Quest Steps</h1>
        <div className="w-9"></div>
      </div>

      <div className="px-6 pt-6 pb-4">
        <QuestCompletionProgress steps={steps.map((s) => s.title)} completedSteps={completedCount} />
      </div>

      {/* Steps List */}
      <div className="flex-1 overflow-auto px-6 pb-6 space-y-3">
        {steps.map((step, idx) => (
          <div
            key={idx}
            onClick={() => toggleStep(idx)}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              completedSteps[idx] ? "bg-accent/10 border-accent" : "bg-card border-border hover:border-primary"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl mt-1">{step.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{step.instruction}</p>
              </div>
              <div className="flex-shrink-0 mt-1">
                {completedSteps[idx] ? (
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="px-6 pb-6">
        <button
          onClick={onContinue}
          disabled={completedCount < steps.length}
          className={`w-full font-bold py-3 rounded-xl transition-all ${
            completedCount === steps.length
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {completedCount === steps.length
            ? "Continue to Proof"
            : `Complete ${steps.length - completedCount} more steps`}
        </button>
      </div>
    </div>
  )
}
