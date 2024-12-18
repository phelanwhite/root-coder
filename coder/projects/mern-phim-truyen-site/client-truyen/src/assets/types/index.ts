export type ComicType = {
  data: any;
};
export type ComicListType = {
  datas: any[];
  isLoading?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (e: { selected: number }) => void;
};
export type ComicSideType = {
  data: any[];
};
export type ComicSideItemType = {
  data: any;
};
export type ThemeType = {
  theme: boolean;
  toggle: () => void;
};
