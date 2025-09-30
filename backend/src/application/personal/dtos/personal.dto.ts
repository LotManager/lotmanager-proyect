import {z} from 'zod';
import { personalCreateSchema } from '../schemas/personalCreateSchema';
import { personalResponseSchema } from '../schemas/personalResponseSchema';
import { personalUpdateSchema } from '../schemas/personalUpdateSchema';

export type PersonalCreateDto = z.infer<typeof personalCreateSchema>;

export type PersonalResponseDto = z.infer<typeof personalResponseSchema>;

export type PersonalUpdateDto = z.infer<typeof personalUpdateSchema>;