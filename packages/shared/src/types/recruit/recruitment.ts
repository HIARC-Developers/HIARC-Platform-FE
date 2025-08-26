export interface Recruitment {
  isRecruit: boolean;
  startDate: string;
  endDate: string;
  generalDescription: string;
  militaryDescription: string;
  greetingDescription: string;
}

export const Recruitment = {
  fromJson(json: unknown): Recruitment {
    const data = (json || {}) as Record<string, unknown>;
    return {
      isRecruit: (data.isRecruit as boolean) || false,
      startDate: (data.startDate as string) || '',
      endDate: (data.endDate as string) || '',
      generalDescription: (data.generalDescription as string) || '',
      militaryDescription: (data.militaryDescription as string) || '',
      greetingDescription: (data.greetingDescription as string) || '',
    };
  },
};
