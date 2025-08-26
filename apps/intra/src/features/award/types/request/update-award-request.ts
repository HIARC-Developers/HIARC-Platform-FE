import { z } from 'zod';

export const UpdateAwardRequestSchema = z.object({
  organization: z.string().min(1, '기관명을 입력해주세요.'),
  awardName: z.string().min(1, '수상명을 입력해주세요.'),
  awardDetail: z.string().optional().nullable(),
  awardDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: '유효한 날짜를 입력해주세요.',
  }),
});

export type UpdateAwardRequest = z.infer<typeof UpdateAwardRequestSchema>;
