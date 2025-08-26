import { z } from 'zod';

export const CreateAwardRequestSchema = z.object({
  awardName: z.string().min(1, '수상 이름을 입력해주세요'),
  awardDetail: z.string().min(1, '수상 상세 정보를 입력해주세요'),
  organization: z.string().min(1, '주최기관을 입력해주세요'),
  awardDate: z.string().min(1, '수상 날짜를 입력해주세요'),
});

export type CreateAwardRequest = z.infer<typeof CreateAwardRequestSchema>;
