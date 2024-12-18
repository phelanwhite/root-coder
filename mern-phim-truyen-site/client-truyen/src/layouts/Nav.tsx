import { listStatusData } from "@/constants/links";
import { getCategoriesApi } from "@/services/otruyen.api";
import { useQuery } from "@tanstack/react-query";
import React, { memo } from "react";
import { FaCaretDown, FaHome, FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const getCategories = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return await getCategoriesApi();
    },
  });

  return (
    <div className="sticky top-0 left-0 right-0 z-10 bg-neutral-200">
      <div className="max-w-[1232px] w-full mx-auto flex items-stretch px-4 ">
        <NavLink
          to={`/`}
          className={`flex items-center justify-center p-2 px-4 cursor-pointer hover:bg-white`}
        >
          <FaHome />
        </NavLink>
        <div className="group relative p-2 cursor-pointer hover:bg-white">
          <div className="flex items-center gap-1">
            Thể loại
            <FaCaretDown />
          </div>
          <ul className="pb-2 shadow z-10 absolute top-full left-0 w-[600px] bg-white hidden group-hover:grid grid-cols-4 text-sm">
            {getCategories.data?.data?.items?.map((item: any) => (
              <li key={item?._id}>
                <NavLink
                  to={`/the-loai/` + item?.slug}
                  className={`p-1.5 px-4 inline-block hover:bg-gray-200 w-full`}
                >
                  {item?.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="group relative p-2 px-4 cursor-pointer hover:bg-white">
          <div className="flex items-center gap-1">
            Trạng thái
            <FaCaretDown />
          </div>
          <ul className="pb-2 shadow z-10 absolute top-full left-0 w-[300px] bg-white hidden group-hover:grid grid-cols-2 text-sm">
            {listStatusData?.map((item) => (
              <li key={item?.name}>
                <NavLink
                  to={`/list/` + item?.type}
                  className={`p-1.5 px-4 inline-block hover:bg-gray-200 w-full`}
                >
                  {item?.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <NavLink
          to={`/search`}
          className={`flex items-center justify-center p-2 px-4 cursor-pointer hover:bg-white`}
        >
          <span>Tìm truyện</span>
        </NavLink>
      </div>
    </div>
  );
};

export default memo(Nav);
