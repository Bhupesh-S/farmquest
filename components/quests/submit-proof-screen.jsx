"use client"

import { ChevronLeft, Upload, MessageSquare, CheckCircle2, X } from "lucide-react"
import { useState } from "react"

export function SubmitProofScreen({ quest, onSubmit, onBack }) {
  const [checkedItems, setCheckedItems] = useState([false, false, false])
  const [notes, setNotes] = useState("")
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const showPhotoOption = quest.id !== "crops"

  const toggleCheck = (index) => {
    const newChecked = [...checkedItems]
    newChecked[index] = !newChecked[index]
    setCheckedItems(newChecked)
  }

  const canSubmit = quest.id === "crops" ? checkedItems.some(Boolean) : checkedItems.every(Boolean)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsUploading(true)
      const reader = new FileReader()
      reader.onloadend = () => {
        setTimeout(() => {
          setUploadedImage(reader.result)
          setIsUploading(false)
        }, 800) // Simulate upload delay for feedback
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onSubmit()
  }

  return (
    <div className="flex flex-col h-screen pb-safe">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-lg transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold">Submit Proof</h1>
        <div className="w-9"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6 space-y-6 pb-32">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Show Your Work</h2>
          <p className="text-sm text-muted-foreground">Submit evidence of quest completion</p>
        </div>

        {/* Upload Options */}
        {showPhotoOption && (
          <div className="space-y-3">
            <h3 className="font-bold text-foreground text-sm">Upload Media</h3>
            {uploadedImage ? (
              <div className="relative">
                <img
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded proof"
                  className="w-full h-64 object-cover rounded-2xl border-2 border-primary"
                />
                <button
                  onClick={() => setUploadedImage(null)}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                  aria-label="Remove photo"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-2 left-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Photo Ready!
                </div>
              </div>
            ) : (
              <label className="block w-full cursor-pointer">
                <div className="border-2 border-dashed border-border rounded-xl p-6 hover:border-primary hover:bg-primary/5 transition-all text-center">
                  {isUploading ? (
                    <>
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-sm font-medium text-primary">Uploading...</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">Tap to Upload Photo 📸</p>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 10MB</p>
                    </>
                  )}
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}
          </div>
        )}

        {/* Checklist */}
        <div className="space-y-3">
          <h3 className="font-bold text-foreground text-sm">Completion Checklist</h3>
          <div className="space-y-2">
            {["All steps completed", "Instructions followed correctly", "Quality of work is satisfactory"].map(
              (item, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checkedItems[idx]}
                    onChange={() => toggleCheck(idx)}
                    className="w-5 h-5 accent-primary rounded"
                  />
                  <span className="text-sm text-foreground">{item}</span>
                </label>
              ),
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-3">
          <h3 className="font-bold text-foreground text-sm">Additional Notes</h3>
          <div className="relative">
            <MessageSquare className="absolute top-3 left-3 w-5 h-5 text-muted-foreground pointer-events-none" />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Share any challenges, discoveries, or insights from this quest..."
              className="w-full pl-10 pt-3 pr-4 pb-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none"
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* Submit Button - Fixed at bottom for thumb reach */}
      <div className="fixed bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-background via-background to-transparent border-t border-border">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className={`w-full font-bold py-4 rounded-2xl transition-all shadow-lg ${
            canSubmit && !isSubmitting
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/30 active:scale-95"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span> Submitting...
            </span>
          ) : (
            "Submit for Review ✓"
          )}
        </button>
      </div>
    </div>
  )
}
