import { z } from "zod";

export const emailSchema = z.string().email("Email tidak valid").min(1, "Email wajib diisi");

export const passwordSchema = z.string().min(8, "Password minimal 8 karakter");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password wajib diisi"),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Nama minimal 2 karakter").max(100),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export const weddingSchema = z.object({
  brideName: z.string().min(2, "Nama pengantin wanita wajib diisi"),
  groomName: z.string().min(2, "Nama pengantin pria wajib diisi"),
  weddingDate: z.string().min(1, "Tanggal pernikahan wajib diisi"),
  venue: z.string().optional(),
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh mengandung huruf kecil, angka, dan tanda hubung"),
});

export const guestSchema = z.object({
  name: z.string().min(2, "Nama tamu wajib diisi"),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type WeddingInput = z.infer<typeof weddingSchema>;
export type GuestInput = z.infer<typeof guestSchema>;
