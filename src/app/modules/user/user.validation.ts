import { z } from 'zod';

const roleEnum = z.enum(['user', 'admin']);

const userProfileValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string(),
    address: z.string(),
  }),
});

const userRoleUpdateSchema = z.object({
  body: z.object({
    role: z.enum(['admin', 'user'], {
      message: "Role must be either 'admin' or 'user'",
    }),
  }),
});

export const userValidation = {
  userRoleUpdateSchema,
  userProfileValidation,
};
