export interface SortInfo {
  sorted?: boolean | null;
  unsorted?: boolean | null;
  empty?: boolean | null;
}

export interface PageableInfo {
  sort?: SortInfo | null;
  offset?: number | null;
  pageSize?: number | null;
  pageNumber?: number | null;
  paged?: boolean | null;
  unpaged?: boolean | null;
}

export interface PageableProps<T> {
  content?: T[] | null;
  pageable?: PageableInfo | null;
  last?: boolean | null;
  totalPages?: number | null;
  totalElements?: number | null;
  size?: number | null;
  number?: number | null;
  sort?: SortInfo | null;
  first?: boolean | null;
  numberOfElements?: number | null;
  empty?: boolean | null;
}

interface ApiResponseData {
  content?: unknown[];
  pageable?: PageableInfo;
  last?: boolean;
  totalPages?: number;
  totalElements?: number;
  size?: number;
  number?: number;
  sort?: SortInfo;
  first?: boolean;
  numberOfElements?: number;
  empty?: boolean;
}

interface ToJsonCapable {
  toJson(): unknown;
}

export class PageableModel<T> {
  private readonly props: PageableProps<T>;

  constructor(props: PageableProps<T>) {
    this.props = props;
  }

  // 팩토리 메서드를 통한 생성
  static create<T>(
    responseData: unknown,
    itemClass: { fromJson(json: unknown): T }
  ): PageableModel<T> {
    // 빈 배열이나 null 응답 처리
    if (!responseData || (Array.isArray(responseData) && responseData.length === 0)) {
      return new PageableModel<T>({
        content: [],
        pageable: {
          sort: { sorted: false, unsorted: true, empty: true },
          offset: 0,
          pageSize: 20,
          pageNumber: 0,
          paged: true,
          unpaged: false,
        },
        last: true,
        totalPages: 0,
        totalElements: 0,
        size: 20,
        number: 0,
        sort: { sorted: false, unsorted: true, empty: true },
        first: true,
        numberOfElements: 0,
        empty: true,
      });
    }

    const data = responseData as ApiResponseData;

    // content 배열의 각 항목을 itemClass로 변환
    const content = data.content
      ? data.content.map((item: unknown) => itemClass.fromJson(item))
      : [];

    const pageableProps: PageableProps<T> = {
      content,
      pageable: data.pageable || null,
      last: data.last ?? null,
      totalPages: data.totalPages ?? null,
      totalElements: data.totalElements ?? null,
      size: data.size ?? null,
      number: data.number ?? null,
      sort: data.sort || null,
      first: data.first ?? null,
      numberOfElements: data.numberOfElements ?? null,
      empty: data.empty ?? null,
    };

    return new PageableModel(pageableProps);
  }

  get content(): T[] | null {
    return this.props.content ?? null;
  }

  get pageable(): PageableInfo | null {
    return this.props.pageable ?? null;
  }

  get totalPages(): number | null {
    return this.props.totalPages ?? null;
  }

  get totalElements(): number | null {
    return this.props.totalElements ?? null;
  }

  get size(): number | null {
    return this.props.size ?? null;
  }

  get number(): number | null {
    return this.props.number ?? null;
  }

  get first(): boolean | null {
    return this.props.first ?? null;
  }

  get last(): boolean | null {
    return this.props.last ?? null;
  }

  get hasNext(): boolean {
    return this.props.last ? !this.props.last : false;
  }

  get hasPrevious(): boolean {
    return this.props.first ? !this.props.first : false;
  }

  get numberOfElements(): number | null {
    return this.props.numberOfElements ?? null;
  }

  get empty(): boolean | null {
    return this.props.empty ?? null;
  }

  get sort(): SortInfo | null {
    return this.props.sort ?? null;
  }

  // 페이지네이션 유틸리티 메서드들
  getCurrentPage(): number {
    const number = this.number ?? 0;
    return number + 1; // 0-based index를 1-based로 변환
  }

  getPageRange(visiblePages: number = 5): number[] {
    const totalPages = this.totalPages ?? 0;
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
    const empty = this.empty ?? true;
    const content = this.content ?? [];
    return !empty && content.length > 0;
  }

  // 타입 안전한 map 메서드
  mapContent<U>(mapper: (item: T, index: number) => U): U[] {
    const content = this.content ?? [];
    return content.map(mapper);
  }

  // 타입 안전한 filter 메서드
  filterContent(predicate: (item: T, index: number) => boolean): T[] {
    const content = this.content ?? [];
    return content.filter(predicate);
  }

  // 타입 안전한 find 메서드
  findContent(predicate: (item: T, index: number) => boolean): T | undefined {
    const content = this.content ?? [];
    return content.find(predicate);
  }

  toJson(): unknown {
    return {
      content: this.props.content
        ? this.props.content.map((item: T) =>
            (item as unknown as ToJsonCapable)?.toJson
              ? (item as unknown as ToJsonCapable).toJson()
              : item
          )
        : null,
      pageable: this.props.pageable,
      last: this.props.last,
      totalPages: this.props.totalPages,
      totalElements: this.props.totalElements,
      size: this.props.size,
      number: this.props.number,
      sort: this.props.sort,
      first: this.props.first,
      numberOfElements: this.props.numberOfElements,
      empty: this.props.empty,
    };
  }

  static fromJson<T>(json: unknown, itemClass: { fromJson(json: unknown): T }): PageableModel<T> {
    return PageableModel.create(json, itemClass);
  }

  copyWith(updates: Partial<PageableProps<T>>): PageableModel<T> {
    return new PageableModel({
      ...this.props,
      ...updates,
    });
  }

  equals(other?: PageableModel<T>): boolean {
    if (!other) {
      return false;
    }

    const thisContent = this.content ?? [];
    const otherContent = other.content ?? [];

    return (
      this.totalElements === other.totalElements &&
      this.size === other.size &&
      this.number === other.number &&
      thisContent.length === otherContent.length &&
      thisContent.every((item, index) => {
        const otherItem = otherContent[index];
        if (
          item &&
          typeof (item as unknown as { equals?(other: T): boolean }).equals === 'function'
        ) {
          return (item as unknown as { equals(other: T): boolean }).equals(otherItem);
        }
        return item === otherItem;
      })
    );
  }

  compareTo(other: PageableModel<T>): number {
    const thisNumber = this.number ?? 0;
    const otherNumber = other.number ?? 0;
    const thisTotalElements = this.totalElements ?? 0;
    const otherTotalElements = other.totalElements ?? 0;

    // 페이지 번호로 비교
    if (thisNumber !== otherNumber) {
      return thisNumber - otherNumber;
    }

    // 페이지 번호가 같으면 총 요소 수로 비교
    return thisTotalElements - otherTotalElements;
  }
}
