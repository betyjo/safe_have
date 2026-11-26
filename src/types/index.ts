export type AppRole = 'survivor' | 'caseworker' | 'provider' | 'volunteer' | 'admin'
export type ReportType = 'physical' | 'sexual' | 'emotional' | 'economic' | 'digital' | 'other'
export type ReportStatus = 'submitted' | 'under_review' | 'awaiting_safe_contact' | 'in_progress' | 'referred' | 'closed'
export type CaseStatus = 'open' | 'in_progress' | 'referred' | 'closed'
export type CasePriority = 'low' | 'medium' | 'high' | 'urgent'
export type ReferralStatus = 'pending' | 'accepted' | 'declined' | 'completed'
export type ConsentStatus = 'pending' | 'given' | 'withdrawn'
export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected'

export interface Profile {
  id: string
  full_name: string | null
  email: string | null
  created_at: string
}

export interface ServiceProvider {
  id: string
  name: string
  description: string | null
  category: string
  location: string | null
  contact_info: string | null
  operating_hours: string | null
  verification_status: VerificationStatus
  referral_available: boolean
}

export interface Report {
  id: string
  report_type: ReportType
  status: ReportStatus
  description: string | null
  created_at: string
  is_third_party: boolean
}

export interface Case {
  id: string
  status: CaseStatus
  priority: CasePriority
  created_at: string
  assigned_to: string | null
}
