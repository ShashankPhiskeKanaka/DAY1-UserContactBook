import z from "zod"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const createUserSchema = z.object({
    body : z.object({
        email : z.string({ error : "email is required" }).regex(emailRegex, { error : "Please provide a valid email" }),
        name : z.string().optional(),
        phonenumber : z.number({ error : "Phone number is required" }).int().gte(1000000000, { error : "Please provide a valid phone number" }).lte(9999999999, { error : "Please provide a valid phone number" })
    })
})

export { createUserSchema }