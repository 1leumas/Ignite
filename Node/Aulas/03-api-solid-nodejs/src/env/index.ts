import 'dotenv/config'
import { z } from 'zod'
//validar as nossas variaveis ambientes

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
    PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if(!_env.success) {
    console.error('enviroment validation failed', _env.error.format())

    throw new Error(_env.error.message)
}

export const env = _env.data