import { ComicType } from "@/assets/types";
import { getIdChapter } from "@/utils/data";
import React, { memo } from "react";
import { Link } from "react-router-dom";

const ComicCard = ({ data }: ComicType) => {
  return (
    <div className="space-y-2 leading-none">
      <Link to={`/truyen-tranh/${data?.slug}`}>
        <div className="aspect-thumbnail overflow-hidden">
          <img src={data?.thumb_url} loading="lazy" alt="" />
        </div>
      </Link>
      <div className="flex-1 space-y-1">
        <h5>
          <Link
            to={`/truyen-tranh/${data?.slug}`}
            className="hover:text-blue-500 line-clamp-1"
          >
            {data?.name}
          </Link>
        </h5>
        <p>
          <Link
            className="text-13 hover:text-blue-500"
            to={`/truyen-tranh/${data?.slug}/chapter/${getIdChapter(
              data?.chaptersLatest?.[0]?.chapter_api_data
            )}`}
          >
            Chapter {data?.chaptersLatest?.[0]?.chapter_name}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default memo(ComicCard);

export const ComicCardRow = ({ data }: ComicType) => {
  return (
    <div className="flex gap-4 items-start">
      <Link to={`/truyen-tranh/${data?.slug}`}>
        <div className="aspect-thumbnail w-10">
          <img src={data?.thumb_url} loading="lazy" alt="" />
        </div>
      </Link>
      <div className="flex-1 space-y-1">
        <h5>
          <Link
            to={`/truyen-tranh/${data?.slug}`}
            className="hover:text-blue-500 line-clamp-1"
          >
            {data?.name}
          </Link>
        </h5>
        <p>
          <Link
            className="text-13 hover:text-blue-500"
            to={`/truyen-tranh/${data?.slug}/chapter/${getIdChapter(
              data?.chaptersLatest?.[0]?.chapter_api_data
            )}`}
          >
            Chapter {data?.chaptersLatest?.[0]?.chapter_name}
          </Link>
        </p>
      </div>
    </div>
  );
};
