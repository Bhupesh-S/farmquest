"use client"

import { useState, useEffect } from "react"
import { PhoneLoginScreen } from "@/components/auth/phone-login-screen"
import { OtpVerificationScreen } from "@/components/auth/otp-verification-screen"
import { FarmerTypeSelectionScreen } from "@/components/auth/farmer-type-selection-screen"
import { FarmDetailsScreen } from "@/components/auth/farm-details-screen"
import { PermissionsScreen } from "@/components/auth/permissions-screen"
import { AdminPasskeyLoginScreen } from "@/components/auth/admin-passkey-login-screen"
import { WelcomeScreen } from "@/components/welcome-screen"

import { QuestIntroScreen } from "@/components/quests/quest-intro-screen"
import { QuestStepsScreen } from "@/components/quests/quest-steps-screen"
import { SubmitProofScreen } from "@/components/quests/submit-proof-screen"
import { VerificationScreen } from "@/components/quests/verification-screen"
import { RewardScreen } from "@/components/quests/reward-screen"
import { LearningSummaryScreen } from "@/components/quests/learning-summary-screen"
import { QuestsListScreen } from "@/components/quests/quests-list-screen"

import { FarmerDashboardScreen } from "@/components/farmer/dashboard-screen"
import { CommunityScreen } from "@/components/farmer/community-screen"
import { RewardsScreen } from "@/components/farmer/rewards-screen"
import { FarmerProfileScreen } from "@/components/farmer/profile-screen"
import { SettingsScreen } from "@/components/farmer/settings-screen"
import { ImpactTrackerScreen } from "@/components/farmer/impact-tracker-screen"

import { AdminDashboardScreen } from "@/components/admin/dashboard-screen"
import { AdminFarmersScreen } from "@/components/admin/farmers-screen"
import { AdminQuestsScreen } from "@/components/admin/quests-screen"
import { AdminVerificationScreen } from "@/components/admin/verification-screen"
import { AdminRewardsScreen } from "@/components/admin/rewards-screen"

import { NavigationMenu } from "@/components/shared/navigation-menu"
import { LoadingScreen } from "@/components/shared/loading-screen"
import { ErrorScreen } from "@/components/shared/error-screen"

import { QUESTS_DATA } from "@/constants/quests"
import { SCREENS, USER_TYPES } from "@/constants/app"

export default function FarmQuestApp() {
  const [activeScreen, setActiveScreen] = useState(SCREENS.WELCOME)
  const [currentQuestId, setCurrentQuestId] = useState(null)
  const [authenticatedUserType, setAuthenticatedUserType] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isFirstLogin, setIsFirstLogin] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const [userData, setUserData] = useState({
    phone: "",
    farmerType: "",
    farmDetails: {},
    hasLand: true,
    permissions: {},
    xp: 0,
    level: 1,
    completedQuests: [],
    badges: [],
  })

  useEffect(() => {
    const savedAuth = localStorage.getItem("farmquest_auth")
    const savedUserData = localStorage.getItem("farmquest_userdata")

    if (savedAuth) {
      const { userType, screen } = JSON.parse(savedAuth)
      setAuthenticatedUserType(userType)
      setActiveScreen(screen)
    }

    if (savedUserData) {
      setUserData(JSON.parse(savedUserData))
    }

    // Debug: Log quest data to help troubleshoot
    console.log("[FarmQuestApp] Available quests:", Object.keys(QUESTS_DATA))
    console.log("[FarmQuestApp] Total quests:", Object.keys(QUESTS_DATA).length)
  }, [])

  useEffect(() => {
    const AUTHENTICATED_SCREENS = [
      SCREENS.FARMER_DASHBOARD,
      SCREENS.QUESTS_LIST,
      SCREENS.QUEST_INTRO,
      SCREENS.QUEST_STEPS,
      SCREENS.QUEST_SUBMIT_PROOF,
      SCREENS.QUEST_VERIFICATION,
      SCREENS.QUEST_REWARD,
      SCREENS.QUEST_SUMMARY,
      SCREENS.COMMUNITY,
      SCREENS.REWARDS,
      SCREENS.FARMER_PROFILE,
      SCREENS.SETTINGS,
      SCREENS.IMPACT_TRACKER,
      SCREENS.ADMIN_DASHBOARD,
      SCREENS.ADMIN_FARMERS,
      SCREENS.ADMIN_QUESTS,
      SCREENS.ADMIN_VERIFICATION,
      SCREENS.ADMIN_REWARDS,
    ]

    if (AUTHENTICATED_SCREENS.includes(activeScreen) && !authenticatedUserType) {
      console.log("[v0] Protected route accessed without auth - redirecting to welcome")
      setActiveScreen(SCREENS.WELCOME)
    }
  }, [activeScreen, authenticatedUserType])

  const handleNavigate = (screen, data = {}) => {
    const needsLoading = [SCREENS.OTP_VERIFICATION_LOGIN, SCREENS.OTP_VERIFICATION_SIGNUP].includes(screen)

    if (needsLoading) {
      setIsLoading(true)
    }

    setActiveScreen(screen)
    if (Object.keys(data).length > 0) {
      const newUserData = { ...userData, ...data }
      setUserData(newUserData)
      localStorage.setItem("farmquest_userdata", JSON.stringify(newUserData))
    }

    if (needsLoading) {
      setTimeout(() => setIsLoading(false), 500)
    }
  }

  const handleLoginSuccess = () => {
    const hasLoggedInBefore = localStorage.getItem("farmquest_has_logged_in")
    if (!hasLoggedInBefore) {
      setIsFirstLogin(true)
      localStorage.setItem("farmquest_has_logged_in", "true")
    }

    setAuthenticatedUserType(USER_TYPES.FARMER)
    localStorage.setItem(
      "farmquest_auth",
      JSON.stringify({
        userType: USER_TYPES.FARMER,
        screen: SCREENS.FARMER_DASHBOARD,
      }),
    )

    showSuccessToast(`🌻 Namaste ${userData.name || "Farmer"}! Welcome to your garden`)
    handleNavigate(SCREENS.FARMER_DASHBOARD)
  }

  const handleSignupSuccess = (phone) => {
    handleNavigate(SCREENS.FARMER_TYPE_SELECTION, { phone })
  }

  const handleQuestStart = (questId) => {
    setCurrentQuestId(questId)
    handleNavigate(SCREENS.QUEST_INTRO)
  }

  const handleQuestComplete = (quest) => {
    const newXP = userData.xp + quest.xpReward
    const newLevel = Math.floor(newXP / 100) + 1
    const leveledUp = newLevel > userData.level

    const updatedData = {
      ...userData,
      xp: newXP,
      level: newLevel,
      completedQuests: [...userData.completedQuests, quest.id],
      badges: [...userData.badges, quest.badgeName],
    }

    setUserData(updatedData)
    localStorage.setItem("farmquest_userdata", JSON.stringify(updatedData))

    return { leveledUp, newLevel }
  }

  const handleLogout = () => {
    localStorage.removeItem("farmquest_auth")
    localStorage.removeItem("farmquest_userdata")

    setActiveScreen(SCREENS.WELCOME)
    setCurrentQuestId(null)
    setAuthenticatedUserType(null)
    setUserData({
      phone: "",
      farmerType: "",
      farmDetails: {},
      hasLand: true,
      permissions: {},
      xp: 0,
      level: 1,
      completedQuests: [],
      badges: [],
    })
  }

  const currentQuestData = currentQuestId ? QUESTS_DATA[currentQuestId] : null

  const AUTHENTICATED_SCREENS = [
    SCREENS.FARMER_DASHBOARD,
    SCREENS.QUESTS_LIST,
    SCREENS.QUEST_INTRO,
    SCREENS.QUEST_STEPS,
    SCREENS.QUEST_SUBMIT_PROOF,
    SCREENS.QUEST_VERIFICATION,
    SCREENS.QUEST_REWARD,
    SCREENS.QUEST_SUMMARY,
    SCREENS.COMMUNITY,
    SCREENS.REWARDS,
    SCREENS.FARMER_PROFILE,
    SCREENS.SETTINGS,
    SCREENS.IMPACT_TRACKER,
    SCREENS.ADMIN_DASHBOARD,
    SCREENS.ADMIN_FARMERS,
    SCREENS.ADMIN_QUESTS,
    SCREENS.ADMIN_VERIFICATION,
    SCREENS.ADMIN_REWARDS,
  ]

  const shouldShowNavigation = AUTHENTICATED_SCREENS.includes(activeScreen)

  const showSuccessToast = (message) => {
    setToastMessage(message)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 4000)
  }

  if (isLoading && activeScreen !== SCREENS.WELCOME) {
    return <LoadingScreen />
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={() => setError(null)} />
  }

  return (
    <div className="min-h-screen bg-background">
      {shouldShowNavigation && (
        <NavigationMenu
          onLogout={handleLogout}
          currentScreen={activeScreen}
          onNavigate={handleNavigate}
          userType={authenticatedUserType}
          userData={{ name: userData.name || "Farmer", level: userData.level, xp: userData.xp }}
        />
      )}

      {/* AUTH FLOW */}
      {activeScreen === SCREENS.WELCOME && (
        <WelcomeScreen
          onFarmerLogin={() => handleNavigate(SCREENS.PHONE_LOGIN)}
          onSignup={() => handleNavigate(SCREENS.PHONE_SIGNUP)}
          onAdminLogin={() => handleNavigate(SCREENS.ADMIN_LOGIN)}
        />
      )}

      {activeScreen === SCREENS.PHONE_LOGIN && (
        <PhoneLoginScreen
          isSignup={false}
          onSuccess={(phone) => handleNavigate(SCREENS.OTP_VERIFICATION_LOGIN, { phone })}
          onBack={() => handleNavigate(SCREENS.WELCOME)}
        />
      )}

      {activeScreen === SCREENS.OTP_VERIFICATION_LOGIN && (
        <OtpVerificationScreen
          phone={userData.phone}
          onSuccess={handleLoginSuccess}
          onBack={() => handleNavigate(SCREENS.PHONE_LOGIN)}
        />
      )}

      {activeScreen === SCREENS.PHONE_SIGNUP && (
        <PhoneLoginScreen
          isSignup={true}
          onSuccess={(phone) => handleNavigate(SCREENS.OTP_VERIFICATION_SIGNUP, { phone })}
          onBack={() => handleNavigate(SCREENS.WELCOME)}
        />
      )}

      {activeScreen === SCREENS.OTP_VERIFICATION_SIGNUP && (
        <OtpVerificationScreen
          phone={userData.phone}
          onSuccess={handleSignupSuccess}
          onBack={() => handleNavigate(SCREENS.PHONE_SIGNUP)}
        />
      )}

      {activeScreen === SCREENS.FARMER_TYPE_SELECTION && (
        <FarmerTypeSelectionScreen
          onSuccess={(farmerType) => handleNavigate(SCREENS.FARM_DETAILS, { farmerType })}
          onBack={() => handleNavigate(SCREENS.OTP_VERIFICATION_SIGNUP)}
        />
      )}

      {activeScreen === SCREENS.FARM_DETAILS && (
        <FarmDetailsScreen
          onSuccess={(farmDetails) =>
            handleNavigate(SCREENS.PERMISSIONS, { farmDetails, hasLand: farmDetails.hasLand })
          }
          onBack={() => handleNavigate(SCREENS.FARMER_TYPE_SELECTION)}
        />
      )}

      {activeScreen === SCREENS.PERMISSIONS && (
        <PermissionsScreen
          onSuccess={(permissions) => {
            setAuthenticatedUserType(USER_TYPES.FARMER)
            handleNavigate(SCREENS.FARMER_DASHBOARD, { permissions })
          }}
          onSkip={() => {
            setAuthenticatedUserType(USER_TYPES.FARMER)
            handleNavigate(SCREENS.FARMER_DASHBOARD)
          }}
        />
      )}

      {activeScreen === SCREENS.ADMIN_LOGIN && (
        <AdminPasskeyLoginScreen
          onSuccess={() => {
            setAuthenticatedUserType(USER_TYPES.ADMIN)
            handleNavigate(SCREENS.ADMIN_DASHBOARD)
          }}
          onBack={() => handleNavigate(SCREENS.WELCOME)}
        />
      )}

      {/* FARMER SCREENS */}
      {activeScreen === SCREENS.FARMER_DASHBOARD && (
        <FarmerDashboardScreen
          userData={{ ...userData, isFirstLogin }}
          quests={QUESTS_DATA}
          onStartQuest={handleQuestStart}
          onNavigate={handleNavigate}
          onShowToast={showSuccessToast}
        />
      )}

      {activeScreen === SCREENS.QUESTS_LIST && (
        <QuestsListScreen
          quests={QUESTS_DATA}
          completedQuests={userData.completedQuests}
          farmerType={userData.farmerType}
          onStartQuest={handleQuestStart}
          onBack={() => handleNavigate(SCREENS.FARMER_DASHBOARD)}
        />
      )}

      {activeScreen === SCREENS.COMMUNITY && (
        <CommunityScreen userData={userData} onBack={() => handleNavigate(SCREENS.FARMER_DASHBOARD)} />
      )}

      {activeScreen === SCREENS.REWARDS && (
        <RewardsScreen userData={userData} onBack={() => handleNavigate(SCREENS.FARMER_DASHBOARD)} />
      )}

      {activeScreen === SCREENS.FARMER_PROFILE && (
        <FarmerProfileScreen
          userData={userData}
          onUpdate={(updatedData) => setUserData((prev) => ({ ...prev, ...updatedData }))}
          onBack={() => handleNavigate(SCREENS.FARMER_DASHBOARD)}
        />
      )}

      {activeScreen === SCREENS.SETTINGS && (
        <SettingsScreen
          userData={userData}
          onUpdate={(updatedData) => setUserData((prev) => ({ ...prev, ...updatedData }))}
          onBack={() => handleNavigate(SCREENS.FARMER_DASHBOARD)}
        />
      )}

      {activeScreen === SCREENS.IMPACT_TRACKER && (
        <ImpactTrackerScreen userData={userData} onBack={() => handleNavigate(SCREENS.FARMER_DASHBOARD)} />
      )}

      {/* QUEST FLOW */}
      {activeScreen === SCREENS.QUEST_INTRO && currentQuestData && (
        <QuestIntroScreen
          quest={currentQuestData}
          onStart={() => handleNavigate(SCREENS.QUEST_STEPS)}
          onBack={() => handleNavigate(SCREENS.QUESTS_LIST)}
        />
      )}

      {activeScreen === SCREENS.QUEST_STEPS && currentQuestData && (
        <QuestStepsScreen
          quest={currentQuestData}
          onContinue={() => handleNavigate(SCREENS.QUEST_SUBMIT_PROOF)}
          onBack={() => handleNavigate(SCREENS.QUEST_INTRO)}
        />
      )}

      {activeScreen === SCREENS.QUEST_SUBMIT_PROOF && currentQuestData && (
        <SubmitProofScreen
          quest={currentQuestData}
          onSubmit={() => {
            showSuccessToast("✅ Submitted! We'll review within 24 hours 🌱")
            handleNavigate(SCREENS.QUEST_VERIFICATION)
          }}
          onBack={() => handleNavigate(SCREENS.QUEST_STEPS)}
        />
      )}

      {activeScreen === SCREENS.QUEST_VERIFICATION && currentQuestData && (
        <VerificationScreen quest={currentQuestData} onContinue={() => handleNavigate(SCREENS.QUEST_REWARD)} />
      )}

      {activeScreen === SCREENS.QUEST_REWARD && currentQuestData && (
        <RewardScreen
          quest={currentQuestData}
          userData={userData}
          onComplete={handleQuestComplete}
          onContinue={() => handleNavigate(SCREENS.QUEST_SUMMARY)}
        />
      )}

      {activeScreen === SCREENS.QUEST_SUMMARY && currentQuestData && (
        <LearningSummaryScreen quest={currentQuestData} onContinue={() => handleNavigate(SCREENS.FARMER_DASHBOARD)} />
      )}

      {/* ADMIN SCREENS */}
      {activeScreen === SCREENS.ADMIN_DASHBOARD && <AdminDashboardScreen onNavigate={handleNavigate} />}

      {activeScreen === SCREENS.ADMIN_FARMERS && (
        <AdminFarmersScreen onBack={() => handleNavigate(SCREENS.ADMIN_DASHBOARD)} />
      )}

      {activeScreen === SCREENS.ADMIN_QUESTS && (
        <AdminQuestsScreen quests={QUESTS_DATA} onBack={() => handleNavigate(SCREENS.ADMIN_DASHBOARD)} />
      )}

      {activeScreen === SCREENS.ADMIN_VERIFICATION && (
        <AdminVerificationScreen onBack={() => handleNavigate(SCREENS.ADMIN_DASHBOARD)} />
      )}

      {activeScreen === SCREENS.ADMIN_REWARDS && (
        <AdminRewardsScreen onBack={() => handleNavigate(SCREENS.ADMIN_DASHBOARD)} />
      )}

      {/* User Win: Toast Notification Component - always visible feedback */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-slide-down">
          <div className="bg-accent text-accent-foreground px-6 py-3 rounded-2xl shadow-2xl border-2 border-accent/30 flex items-center gap-2 max-w-md">
            <span className="text-lg">✓</span>
            <p className="text-sm font-medium">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  )
}
