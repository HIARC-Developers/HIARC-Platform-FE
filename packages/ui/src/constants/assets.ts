export const SHARED_ASSETS = {
  ARROW_LEFT: '/shared-assets/ArrowLeft.svg',
  CARET_DOWN: '/shared-assets/CaretDown.svg',
  CARET_UP: '/shared-assets/CaretUp.svg',
  USER: '/shared-assets/User.svg',
  ZOOM_IN: '/shared-assets/ZoomIn.svg',
} as const;

export type SharedAsset = typeof SHARED_ASSETS[keyof typeof SHARED_ASSETS];