import useDebounce from "@/hooks/useDebounce";
import { getSearchApi } from "@/services/otruyen.api";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { converComicData } from "@/utils/data";
import { ComicType } from "@/assets/types";
import { Link, useNavigate } from "react-router-dom";

const InputSearch = () => {
  const [value, setValue] = useState("");
  const debounce = useDebounce(value, 500);
  const suggestResult = useQuery({
    queryKey: ["suggest", debounce],
    queryFn: async () => await getSearchApi(`keyword=${debounce}`),
    enabled: !!debounce,
  });

  const makeDatas = useMemo(() => {
    return (
      suggestResult.data?.data?.items?.map((item: any) =>
        converComicData(item)
      ) || []
    );
  }, [suggestResult.data]);

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative max-w-[424px] w-full">
      <div className="bg-white flex items-center px-2">
        <input
          onFocus={() => setShow(true)}
          onBlur={() => setTimeout(() => setShow(false), 100)}
          onKeyDown={(e) => {
            if (e.key === `Enter`) {
              navigate(`search?keyword=${debounce}`);
              setTimeout(() => setShow(false), 100);
            }
          }}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setShow(true);
          }}
          placeholder="Tìm truyện"
          type="text"
          className="flex-1 bg-transparent border-none outline-none py-1"
        />
        <FaSearch />
      </div>
      {show && (
        <ul className="z-20 bg-white max-h-[300px] overflow-y-auto absolute top-full left-0 right-0 border-t">
          {makeDatas?.map((item: any) => (
            <li key={item?.slug}>
              <ComicItem data={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputSearch;

const ComicItem = ({ data }: ComicType) => {
  return (
    <Link to={`/truyen-tranh/${data?.slug}`}>
      <div className="flex gap-4 items-start hover:bg-gray-100 px-2 py-1">
        <div className="aspect-thumbnail w-7">
          <img src={data?.thumb_url} loading="lazy" alt="" />
        </div>
        <div className="flex-1 space-y-1">
          <h6 className="line-clamp-1">{data?.name}</h6>
        </div>
      </div>
    </Link>
  );
};
