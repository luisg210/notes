import z from "zod";

/***
 * @description Main schema for user validation
 * @private
 * */
const userSchema = z.object({
    name: z.string().nonempty({ error: 'El campo nombre es requerido' }),
    user: z.string().nonempty({ error: 'El campo uaurio es requerido' }),
    password: z.string().min(4, { error: 'Debes ingresar una contraseña de al menos 4 caracteres' }),
    repeatPassword: z.string().min(4, { error: 'Debes ingresar una contraseña de al menos 4 caracteres' }),
    currentPassword: z.string().min(4, { error: 'Debes ingresar una contraseña de al menos 4 caracteres' }),
    newPassword: z.string().min(4, { error: 'Debes ingresar una contraseña de al menos 4 caracteres' }),
});

/***
 * @description Schema for user registration validation
 **/
export const registerSchema = userSchema.pick({
    name: true,
    user: true,
    password: true,
    repeatPassword: true
}).refine((data) => data.password === data.repeatPassword, {
    error: 'Las contraseñas no coinciden',
})

/***
 * @description Schema for user update validation
 **/
export const updateUserSchema = userSchema.pick({
    name: true,
    user: true
});

/***
 * @description Schema for user change password validation
 **/
export const userChangePasswordSchema = userSchema.pick({
    currentPassword: true,
    newPassword: true,
}).refine((data) => data.currentPassword !== data.newPassword, {
    message: 'Las contraseñas no deben de ser las mismas',
});

/***
 * @description Schema for delete current user validation
 **/
export const userDeleteSchema = userSchema.pick({
    password: true,
})

//Export types for forms
export type RegisterFormData = z.infer<typeof registerSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
export type UserChangePasswordFormData = z.infer<typeof userChangePasswordSchema>;
export type UserDeleteFormData = z.infer<typeof userDeleteSchema>;
