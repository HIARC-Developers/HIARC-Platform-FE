interface Winner {
  handle: string;
  awardDetail: string;
}

export interface CreateAwardRequest {
  organization: string;
  awardName: string;
  awardDate: string;
  winners: Winner[];
}
