import {z} from 'zod';
import { personalCreateSchema } from '../schemas/personalCreateSchema.js';
import { personalResponseSchema } from '../schemas/personalResponseSchema.js';

export type PersonalCreateDto = z.infer<typeof personalCreateSchema>;

export type PersonalResponseDto = z.infer<typeof personalResponseSchema>;
