import z from "zod";

export const noteSchema = z.object({
    title: z.string().nonempty({ error: 'Este campo es obligatorio' }).max(25, { error: 'Maximo 25 caracteres' }),
    content: z.string().nonempty({ error: 'Este campo es obligatorio' })
})

export type NoteFormData = z.infer<typeof noteSchema>; 
