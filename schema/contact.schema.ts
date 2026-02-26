import z from "zod"
import { errorMessages } from "../constants/errorMessages.constants";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+[1-9]\d{0,2} \d{6,14}$/;

const createContactSchema = z.object({
    body : z.object({
        email : z.string({ error : errorMessages.VALIDATION.message }).trim().lowercase({ error : errorMessages.VALIDATION.message }).regex(emailRegex, { error : errorMessages.VALIDATION.message }),
        name : z.string().optional(),
        phoneNumber: z.string({ error : errorMessages.VALIDATION.message }).trim().regex(phoneRegex, { error : errorMessages.VALIDATION.message}),
        address : z.string({ error : errorMessages.VALIDATION.message }).optional(),
    })
})

const contactSchema = z.object({
    body : z.object({
        id : z.string({ error : "Please provide an id" }).trim(),
        email : z.string({ error : "Email is required" }).trim().lowercase({ error : errorMessages.VALIDATION.message }).regex(emailRegex, { error : errorMessages.VALIDATION.message }).optional(),
        name : z.string({ error : "Please provide a name" }).optional(),
        phoneNumber: z.string({ error: "Phone number is required" }).trim().regex(phoneRegex, { error : errorMessages.VALIDATION.message }).optional(),
        address : z.string({ error : "Please provide an address" }).optional()
    })
})

const contactFetchSchema = z.object({
    params : z.object({
        id : z.string({ error : "Id is required" }).trim()
    })
})

const contactsFetchSchema = z.object({
    query : z.object({
        cursor : z.string({ error : "Please provide a cursor value" }).trim().optional(),
        limit : z.string({ error : "Please provide a limit" }).trim().optional(),
        search : z.string({ error : "Please provide a searching field" }).trim().optional(),
        email : z.string({ error : "Please provide an email" }).trim().optional(),
        sort : z.string({ error : "Please provide a sorting value" })
    })
})

export { createContactSchema, contactSchema, contactFetchSchema, contactsFetchSchema }