export interface StartTime {
  hour?: number | null;
  minute?: number | null;
  second?: number | null;
  nano?: number | null;
}

export const StartTime = {
  fromJson(json: unknown): StartTime {
    const data = (json || {}) as Record<string, unknown>;
    return {
      hour: (data.hour as number) || 0,
      minute: (data.minute as number) || 0,
      second: (data.second as number) || 0,
      nano: (data.nano as number) || 0,
    };
  },

  toJson(startTime: StartTime): unknown {
    return {
      hour: startTime.hour ?? 0,
      minute: startTime.minute ?? 0,
      second: startTime.second ?? 0,
      nano: startTime.nano ?? 0,
    };
  },
};
