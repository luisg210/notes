import z, { string } from "zod";

export const registerSchema = z.object({
    name: z.string().nonempty({ error: 'El campo nombre es requerido' }),
    user: z.string().nonempty({ error: 'El campo uaurio es requerido' }),
    password: z.string().min(4, { error: 'Debes ingresar una contraseña de al menos 4 caracteres' }),
    repeatPassword: z.string().min(4, { error: 'Debes ingresar una contraseña de al menos 4 caracteres' }),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
