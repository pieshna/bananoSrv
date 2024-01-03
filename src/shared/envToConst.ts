import dotenv from 'dotenv'
dotenv.config()

const validateEnv = (ToValidate: string): string => {
  if (!process.env[ToValidate]) {
    throw new Error(`La variable de entorno ${ToValidate} no existe`)
  }
  return process.env[ToValidate] as string
}

const validateEnvToArray = (ToValidate: string, spaces?: boolean): string[] => {
  if (!process.env[ToValidate]) {
    throw new Error(`La variable de entorno ${ToValidate} no existe`)
  }
  if (spaces) {
    process.env[ToValidate] = process.env[ToValidate]?.replace(/\s/g, '')
  }
  return process.env[ToValidate]?.split(',') || [ToValidate]
}

export const envToConst = {
  DB_USER: validateEnv('DB_USER'),
  DB_PASSWORD: validateEnv('DB_PASSWORD'),
  DB_HOST: validateEnv('DB_HOST'),
  DB_PORT: validateEnv('DB_PORT'),
  DB_NAME: validateEnv('DB_NAME'),
  SALTOS: validateEnv('SALTOS'),
  JWT_SECRET: validateEnv('JWT_SECRET'),
  RESEND_KEY: validateEnv('RESEND_KEY'),
  CORS_ALLOWED: validateEnvToArray('CORS_ALLOWED', true)
}
