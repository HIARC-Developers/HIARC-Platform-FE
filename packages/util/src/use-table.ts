import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type Table,
} from '@tanstack/react-table';

export const useTable = <TData = unknown>({
  columns,
  data,
  pageState,
  totalPages,
  globalFilterState,
}: {
  columns: Array<ColumnDef<TData, unknown>>;
  data: TData[];
  pageState: [number, React.Dispatch<React.SetStateAction<number>>];
  totalPages?: number;
  globalFilterState: [string, React.Dispatch<React.SetStateAction<string>>];
}): Table<TData> => {
  const [page, setPage] = pageState;
  const [globalFilter, setGlobalFilter] = globalFilterState;
  const table = useReactTable({
    columns,
    data: data,
    debugTable: true,
    manualPagination: true,
    pageCount: totalPages ?? -1,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      const nextPage =
        typeof updater === 'function' ? updater({ pageIndex: page, pageSize: 10 }) : updater;
      setPage(nextPage.pageIndex);
    },
    onGlobalFilterChange: setGlobalFilter,
    state: {
      pagination: {
        pageIndex: page,
        pageSize: 10,
      },
      globalFilter,
    },
  });

  return table;
};
