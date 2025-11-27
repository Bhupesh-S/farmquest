"use client"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Animated growing plant */}
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="w-2 bg-primary rounded-t-full animate-grow" style={{ height: "60%" }}></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-primary animate-spin-slow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
              />
            </svg>
          </div>
        </div>
        <p className="text-lg font-medium text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  )
}
