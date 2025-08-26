import { AnnnouncementType } from './announcement-type';
import { SelectOption } from '../select/select-option';

export interface AnnnouncementTypeInfo {
  label: string;
  bgColor: string;
  textColor: string;
}

const ANNOUNCEMENT_TYPE_INFO_MAP: Record<AnnnouncementType, AnnnouncementTypeInfo> = {
  [AnnnouncementType.STUDY]: {
    label: '스터디',
    bgColor: '#bg-category-study/20',
    textColor: 'text-category-study',
  },
  [AnnnouncementType.RATING]: {
    label: '하이팅',
    bgColor: 'bg-category-rating/20',
    textColor: 'text-category-rating',
  },
  [AnnnouncementType.GENERAL]: {
    label: '학회일정',
    bgColor: 'bg-category-general/20',
    textColor: 'text-category-general',
  },
  [AnnnouncementType.EXTERNAL]: {
    label: '외부',
    bgColor: 'bg-category-exteranl/20',
    textColor: 'text-category-external',
  },
  [AnnnouncementType.ETC]: {
    label: '기타',
    bgColor: 'bg-category-etc/20',
    textColor: 'text-category-etc',
  },
};

/**
 * Category enum을 SelectOption 배열로 변환
 */
export function announcementTypeSelectOption(): SelectOption[] {
  return Object.values(AnnnouncementType).map((category) => ({
    value: category,
    label: ANNOUNCEMENT_TYPE_INFO_MAP[category].label,
  }));
}

/**
 * Category 값으로 라벨과 색상 정보를 반환
 */
export function getAnnouncementTypeInfo(category: AnnnouncementType): AnnnouncementTypeInfo {
  return ANNOUNCEMENT_TYPE_INFO_MAP[category];
}

/**
 * Category 값으로 라벨만 반환
 */
export function getAnnouncementTypeLabel(category: AnnnouncementType): string {
  return ANNOUNCEMENT_TYPE_INFO_MAP[category].label;
}

/**
 * Category 값으로 색상만 반환
 */
export function getAnnouncementTypeColor(category: AnnnouncementType): string {
  return ANNOUNCEMENT_TYPE_INFO_MAP[category].bgColor;
}

/**
 * Category 값으로 색상만 반환
 */
export function getAnnouncementTypeTextColor(category: AnnnouncementType): string {
  return ANNOUNCEMENT_TYPE_INFO_MAP[category].textColor;
}

/**
 * Category 값으로 배경색만 반환
 */
export function getAnnouncementTypeBgColor(category: AnnnouncementType): string {
  return ANNOUNCEMENT_TYPE_INFO_MAP[category].bgColor;
}

/**
 * 문자열을 AnnouncementType으로 변환
 */
export function getAnnouncementTypeFromString(typeString: string): AnnnouncementType {
  const typeValues = Object.values(AnnnouncementType) as string[];
  return typeValues.includes(typeString)
    ? (typeString as AnnnouncementType)
    : AnnnouncementType.ETC;
}
