import { Types } from 'mongoose';
import { z } from 'zod';

export const postCheck = z.object({
  body: z.object({
    user: z.string().refine((value) => Types.ObjectId.isValid(value), {
      message: 'Invalid user ObjectId',
    }),
    id: z.string().refine((value) => Types.ObjectId.isValid(value), {
      message: 'Invalid id ObjectId',
    }),
    premium: z.boolean().optional().default(false),
    category: z.enum(['Tip', 'Story']).optional().default('Story'),
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    comments: z
      .array(
        z.object({
          author: z.string().refine((value) => Types.ObjectId.isValid(value), {
            message: 'Invalid author ObjectId',
          }),
          comment: z.string().min(1, 'Comment is required'),
        }),
      )
      .optional()
      .default([]),
  }),
});

export const postValidation = {
  postCheck,
};
