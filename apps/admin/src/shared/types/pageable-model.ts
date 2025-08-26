import { z } from 'zod';
import { BaseModel } from '../base/base-model';

export interface SortInfo {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface PageableInfo {
  sort: SortInfo;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PageableProps<T> {
  content: T[];
  pageable: PageableInfo;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: SortInfo;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export class PageableModel<T extends BaseModel<object>> extends BaseModel<PageableProps<T>> {
  static createSchema<U extends BaseModel<object>>(
    itemSchema: z.ZodType<U>
  ): z.ZodType<PageableProps<U>> {
    const sortSchema = z.object({
      sorted: z.boolean(),
      unsorted: z.boolean(),
      empty: z.boolean(),
    });

    const pageableSchema = z.object({
      sort: sortSchema,
      offset: z.number(),
      pageSize: z.number(),
      pageNumber: z.number(),
      paged: z.boolean(),
      unpaged: z.boolean(),
    });

    return z.object({
      content: z.array(itemSchema),
      pageable: pageableSchema,
      last: z.boolean(),
      totalPages: z.number(),
      totalElements: z.number(),
      size: z.number(),
      number: z.number(),
      sort: sortSchema,
      first: z.boolean(),
      numberOfElements: z.number(),
      empty: z.boolean(),
    });
  }

  // 팩토리 메서드를 통한 생성
  static create<T extends BaseModel<object>>(
    responseData: unknown,
    itemClass: { fromJson(json: unknown): T }
  ): PageableModel<T> {
    // 1. 기본 구조 검증
    const baseSchema = z.object({
      content: z.array(z.unknown()),
      pageable: z.object({
        sort: z.object({
          sorted: z.boolean(),
          unsorted: z.boolean(),
          empty: z.boolean(),
        }),
        offset: z.number(),
        pageSize: z.number(),
        pageNumber: z.number(),
        paged: z.boolean(),
        unpaged: z.boolean(),
      }),
      last: z.boolean(),
      totalPages: z.number(),
      totalElements: z.number(),
      size: z.number(),
      number: z.number(),
      sort: z.object({
        sorted: z.boolean(),
        unsorted: z.boolean(),
        empty: z.boolean(),
      }),
      first: z.boolean(),
      numberOfElements: z.number(),
      empty: z.boolean(),
    });

    const parsedResponse = baseSchema.parse(responseData);

    // 2. content 배열의 각 항목을 itemClass로 변환
    const content = parsedResponse.content.map((item) => itemClass.fromJson(item));

    // 3. 변환된 데이터로 PageableModel 생성
    const pageableProps: PageableProps<T> = {
      content,
      pageable: parsedResponse.pageable,
      last: parsedResponse.last,
      totalPages: parsedResponse.totalPages,
      totalElements: parsedResponse.totalElements,
      size: parsedResponse.size,
      number: parsedResponse.number,
      sort: parsedResponse.sort,
      first: parsedResponse.first,
      numberOfElements: parsedResponse.numberOfElements,
      empty: parsedResponse.empty,
    };

    return new PageableModel(pageableProps);
  }

  get content(): T[] {
    return this.props.content;
  }

  get pageable(): PageableInfo {
    return this.props.pageable;
  }

  get totalPages(): number {
    return this.props.totalPages;
  }

  get totalElements(): number {
    return this.props.totalElements;
  }

  get size(): number {
    return this.props.size;
  }

  get number(): number {
    return this.props.number;
  }

  get first(): boolean {
    return this.props.first;
  }

  get last(): boolean {
    return this.props.last;
  }

  get hasNext(): boolean {
    return !this.props.last;
  }

  get hasPrevious(): boolean {
    return !this.props.first;
  }

  get numberOfElements(): number {
    return this.props.numberOfElements;
  }

  get empty(): boolean {
    return this.props.empty;
  }

  get sort(): SortInfo {
    return this.props.sort;
  }

  // 페이지네이션 유틸리티 메서드들
  getCurrentPage(): number {
    return this.number + 1; // 0-based index를 1-based로 변환
  }

  getPageRange(visiblePages: number = 5): number[] {
    const totalPages = this.totalPages;
    const currentPage = this.getCurrentPage();

    if (totalPages <= visiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(visiblePages / 2);
    let start = Math.max(1, currentPage - halfVisible);
    const end = Math.min(totalPages, start + visiblePages - 1);

    if (end - start + 1 < visiblePages) {
      start = Math.max(1, end - visiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  hasContent(): boolean {
    return !this.empty && this.content.length > 0;
  }

  // 타입 안전한 map 메서드
  mapContent<U>(mapper: (item: T, index: number) => U): U[] {
    return this.content.map(mapper);
  }

  // 타입 안전한 filter 메서드
  filterContent(predicate: (item: T, index: number) => boolean): T[] {
    return this.content.filter(predicate);
  }

  // 타입 안전한 find 메서드
  findContent(predicate: (item: T, index: number) => boolean): T | undefined {
    return this.content.find(predicate);
  }

  equals(other?: PageableModel<T>): boolean {
    if (!other) {
      return false;
    }

    return (
      this.totalElements === other.totalElements &&
      this.size === other.size &&
      this.number === other.number &&
      this.content.length === other.content.length &&
      this.content.every((item, index) => item.equals(other.content[index]))
    );
  }

  compareTo(other: PageableModel<T>): number {
    // 페이지 번호로 비교
    if (this.number !== other.number) {
      return this.number - other.number;
    }

    // 페이지 번호가 같으면 총 요소 수로 비교
    return this.totalElements - other.totalElements;
  }
}