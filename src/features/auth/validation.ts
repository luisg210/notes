import { z } from 'zod'

export const authSchema = z.object({
    user: z.string().min(1, { error: 'El usuario es obligatorio' }),
    password: z.string().nonempty({ error: 'La contraseña es onligatorio' }),
});

export type AuthFormData = z.infer<typeof authSchema>;
