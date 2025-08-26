import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    headAlign?: 'left' | 'center' | 'right';
    bodyAlign?: 'left' | 'center' | 'right';
  }
}
