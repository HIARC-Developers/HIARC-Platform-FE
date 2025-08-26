export enum Grade {
  FRESHMAN = 'FRESHMAN',
  SOPHOMORE = 'SOPHOMORE',
  JUNIOR = 'JUNIOR',
  SENIOR = 'SENIOR',
  OVER = 'OVER',
}

export enum AbsenceStatus {
  ENROLLED = 'ENROLLED',
  ON_LEAVE = 'ON_LEAVE',
  MILITARY_LEAVE = 'MILITARY_LEAVE',
}

export interface SignupRequest {
  name: string;
  phoneAddress: string;
  studentId: string;
  department: string;
  isDoubleMajor: boolean;
  grade: Grade;
  absenceStatus: AbsenceStatus;
  bojHandle: string;
  languages: string[];
  languageLevel?: string;
  motivations: string[];
  expectedActivity: string;
}
