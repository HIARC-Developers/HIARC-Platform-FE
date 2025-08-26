'use client';

import { flexRender, Row, Table } from '@tanstack/react-table';
import { ReactElement } from 'react';
import { cn } from '../../lib/utils';
import '../../types/table.d.ts';

interface TbodyProps<T> {
  table: Table<T>;
  onClick(row: Row<T>): void;
  emptyMessage?: string;
  gapPx?: number;
}

export function CommonTableBody<T>({
  table,
  onClick,
  emptyMessage,
  gapPx = 16,
}: TbodyProps<T>): ReactElement {
  const rows = table.getRowModel().rows;

  if (rows.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-gray-500">
        {emptyMessage ?? '검색 결과가 없습니다.'}
      </div>
    );
  }

  return (
    <>
      {rows.map((row) => (
        <div
          key={row.id}
          className="flex cursor-pointer items-center border-b border-gray-200 transition-colors hover:bg-gray-100"
          onClick={() => onClick(row)}
        >
          {row.getVisibleCells().map((cell, idx, arr) => {
            // 정렬
            const bodyAlign = cell.column.columnDef.meta?.bodyAlign ?? 'center';
            const alignCls =
              bodyAlign === 'left'
                ? 'text-left'
                : bodyAlign === 'right'
                  ? 'text-right'
                  : 'text-center';

            // 고정 폭 or 유동 폭
            const size = cell.column.columnDef.size as number | undefined;
            const widthStyle: React.CSSProperties | undefined = size
              ? { width: `${size}px`, minWidth: `${size}px`, maxWidth: `${size}px` }
              : undefined;

            // 간격(gap). 마지막 셀은 마진 없음
            const gapStyle = idx < arr.length - 1 ? { marginRight: `${gapPx}px` } : undefined;

            return (
              <div
                key={cell.id}
                style={{ ...widthStyle, ...gapStyle }}
                className={cn(
                  size ? 'shrink-0 grow-0' : 'min-w-0 flex-1',
                  'truncate px-2 py-3',
                  alignCls
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}
