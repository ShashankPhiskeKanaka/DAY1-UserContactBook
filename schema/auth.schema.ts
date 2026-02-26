import z from "zod"
const authSchema = z.object({
    cookies : z.object({
        token : z.string({ error : "Please login" }).trim(),
        refreshToken : z.string({ error : "Please login" })
    })
})

const loginSchema = z.object({
    body : z.object({
        name : z.string({ error : "Please provide a name" }).trim(),
        password : z.string({ error : "Please provide a password" }).trim().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { error : "Please provide a valid password" })
    })
})

const forgetSchema = z.object({
    body : z.object({
        name : z.string({ error : "Please provide a name" }).trim()
    })
})

const changePassSchema = z.object({
    body : z.object({
        password : z.string({ error : "Please provide a password" }).trim().regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { error : "Please provide a valid password" })
    }),
    params : z.object({
        token : z.string({ error : "Invalid action" })
    })
})

export { authSchema, loginSchema, forgetSchema, changePassSchema }