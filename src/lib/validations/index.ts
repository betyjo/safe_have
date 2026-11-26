import { z } from 'zod'

export const reportDirectSchema = z.object({
  report_type: z.enum(['physical', 'sexual', 'emotional', 'economic', 'digital', 'other']),
  description: z.string().min(10),
  incident_date: z.string().optional(),
  location: z.string().optional(),
  currently_in_danger: z.boolean(),
  consent_to_contact: z.boolean(),
  safe_contact_method: z.enum(['email', 'phone', 'none']).optional(),
})

export const reportThirdPartySchema = z.object({
  description: z.string().min(10),
  report_type: z.enum(['physical', 'sexual', 'emotional', 'economic', 'digital', 'other']),
  reporter_contact: z.string().optional(),
  acknowledge_disclaimer: z.literal(true),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string().min(1),
  role: z.enum(['survivor', 'caseworker', 'provider', 'volunteer', 'admin']),
})

export const serviceProviderSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  category: z.string().min(1),
  location: z.string().optional(),
  contact_info: z.string().optional(),
  operating_hours: z.string().optional(),
})
