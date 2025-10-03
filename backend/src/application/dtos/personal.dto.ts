import {z} from 'zod';
import { personalCreateSchema } from '../personal/schemas/personalCreateSchema';
import { personalResponseSchema } from '../personal/schemas/personalResponseSchema';
import { personalUpdateSchema } from '../personal/schemas/personalUpdateSchema';

export type PersonalCreateDto = z.infer<typeof personalCreateSchema>;

export type PersonalResponseDto = z.infer<typeof personalResponseSchema>;

export type PersonalUpdateDto = z.infer<typeof personalUpdateSchema>;