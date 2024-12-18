export type LinkType = {
  title: string;
  path: string;
  icon?: React.ReactNode;
  subMenu?: LinkType[];
};
