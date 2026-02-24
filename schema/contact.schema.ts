import z from "zod"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+[1-9]\d{0,2} \d{6,14}$/;

const createContactSchema = z.object({
    body : z.object({
        email : z.string({ error : "email is required" }).trim().lowercase({ error : "Please provide a valid email address" }).regex(emailRegex, { error : "Please provide a valid email" }),
        name : z.string().optional(),
        phonenumber: z.string({ error: "Phone number is required" }).trim().regex(phoneRegex, "Please provide a valid phone number"),
        address : z.string({ error : "Please provide an address" }).optional(),
    })
})

const contactSchema = z.object({
    body : z.object({
        email : z.string({ error : "Email is required" }).trim().lowercase({ error : "Please provide a valid email address" }).regex(emailRegex, { error : "Please provide a valid email" }),
        name : z.string({ error : "Please provide a name" }).optional(),
        phonenumber: z.string({ error: "Phone number is required" }).trim().regex(phoneRegex, "Please provide a valid phone number").optional(),
        address : z.string({ error : "Please provide an address" }).optional()
    })
})

const contactFetchSchema = z.object({
    params : z.object({
        email : z.string({ error : "Email is required" }).trim().lowercase({ error : "Please provide a valid email address" }).regex(emailRegex, { error : "Please provide a valid email" })
    })
})

export { createContactSchema, contactSchema, contactFetchSchema }