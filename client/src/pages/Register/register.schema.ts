import { z } from "zod"

export interface FormData {
  email: string
  password: string
  confirmPassword: string
}

export const invoiceSchema = z.object({
  email: z
    .email({ message: "El formato del correo electrónico no es válido" })
    .nonempty({ message: "El correo electrónico es obligatorio" }),

  password: z
    .string()
    .nonempty({ message: "La contraseña es obligatoria" })
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(20, { message: "La contraseña no puede tener más de 20 caracteres" })
    .regex(/[A-Z]/, {
      message: "La contraseña debe contener al menos una letra mayúscula",
    })
    .regex(/[a-z]/, {
      message: "La contraseña debe contener al menos una letra minúscula",
    })
    .regex(/[0-9]/, {
      message: "La contraseña debe contener al menos un número",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "La contraseña debe contener al menos un carácter especial",
    }),

  confirmPassword: z.string().nonempty("La contraseña es obligatoria")
}).superRefine((items, ctx) => {
  if (items.password != items.confirmPassword) {
    ctx.addIssue({
      code: 'custom',
      message: 'La contraseñas deben ser iguales',
      path: ['confirmPassword']
    })
  }
})

export type RegisterFormValues = z.infer<typeof invoiceSchema>