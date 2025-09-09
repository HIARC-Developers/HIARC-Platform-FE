export interface Assignment {
  requiredProblemUrl: string;
  practiceProblemUrl: string;
  minProblemCount: number;
  isUpdatable: boolean;
}

export const Assignment = {
  fromJson(json: unknown): Assignment {
    const data = (json || {}) as Record<string, unknown>;
    return {
      requiredProblemUrl: (data.requiredProblemUrl as string) || '',
      practiceProblemUrl: (data.practiceProblemUrl as string) || '',
      minProblemCount: (data.minProblemCount as number) || 0,
      isUpdatable: (data.isUpdatable as boolean) || false,
    };
  },
};
