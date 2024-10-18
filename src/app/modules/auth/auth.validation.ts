import { z } from 'zod';

const roleEnum = z.enum(['user', 'admin']);

const signUpValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: roleEnum,
    premium: z.boolean(),
    phone: z.string(),
    address: z.string(),
    followers: z.number().nonnegative(),
    following: z.number().nonnegative(),
  }),
});

const userRoleUpdateSchema = z.object({
  body: z.object({
    role: z.enum(['admin', 'user'], {
      message: "Role must be either 'admin' or 'user'",
    }),
  }),
});

export const authValidation = {
  signUpValidation,
  userRoleUpdateSchema,
};
