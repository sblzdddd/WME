import { z } from 'zod'

export const ROLES = ['user', 'uploader', 'admin'] as const
export const roleSchema = z.enum(ROLES)
export type Role = z.infer<typeof roleSchema>

export const API_ERROR_CODES = [
  'unauthorized',
  'forbidden',
  'not_found',
  'validation_error',
  'conflict',
  'rate_limited',
  'payload_too_large',
  'unsupported_media',
  'quota_exceeded',
  'gone',
  'internal_error',
] as const
export const apiErrorCodeSchema = z.enum(API_ERROR_CODES)
export type ApiErrorCode = z.infer<typeof apiErrorCodeSchema>

export const apiErrorSchema = z
  .object({
    error: z
      .object({
        code: apiErrorCodeSchema,
        message: z.string(),
      })
      .strict(),
  })
  .strict()
export type ApiError = z.infer<typeof apiErrorSchema>

export const MAX_UPLOAD_BYTES = 50 * 1024 * 1024
export const MIN_DURATION_MS = 5 * 1000
export const MAX_DURATION_MS = 20 * 60 * 1000
export const UPLOADER_QUOTA_BYTES = 2 * 1024 * 1024 * 1024
export const MAX_AVG_BITRATE_KBPS = 330
export const MAX_MP3_BITRATE_KBPS = 320
export const MAX_SAMPLE_RATE_HZ = 48_000
export const MAX_CHANNELS = 2

export const ACCEPTED_CODECS = [
  { container: 'ogg', codec: 'opus', preferred: true },
  { container: 'ogg', codec: 'vorbis', preferred: true },
  { container: 'mp4', codec: 'aac', preferred: false },
  { container: 'mp3', codec: 'mp3', preferred: false },
] as const

export const meSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    email: z.email(),
    emailVerified: z.boolean(),
    role: roleSchema,
    uploadQuotaBytes: z.number().int().nonnegative().nullable(),
    usedBytes: z.number().int().nonnegative(),
  })
  .strict()
export type Me = z.infer<typeof meSchema>
