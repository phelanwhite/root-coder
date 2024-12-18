import { ComicCardRow } from "@/components/ComicCard";
import { getListApi } from "@/services/otruyen.api";
import { converComicData, getIdChapter } from "@/utils/data";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const Right = () => {
  const getHistoryResult = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      //   return await getListApi(`hoan-thanh`);
    },
  });
  const getCompleteResult = useQuery({
    queryKey: ["list", `complete`],
    queryFn: async () => {
      return await getListApi(`hoan-thanh`);
    },
  });
  const makeCompleteDatas = useMemo(() => {
    return (
      getCompleteResult.data?.data?.items?.map((item: any) =>
        converComicData(item)
      ) || []
    );
  }, [getCompleteResult.data]);

  return (
    <div className="space-y-10">
      {/* history read */}
      <div>
        <h4 className="mb-4">Lịch sử đọc truyện</h4>
        <ul className="space-y-2">
          {makeCompleteDatas?.map((item: any) => (
            <li key={item?._id}>
              <ComicCardRow data={item} />
            </li>
          ))}
        </ul>
      </div>
      {/* comics done  */}
      <div>
        <h4 className="mb-4">Truyện hoàn thành</h4>
        <ul className="space-y-2">
          {makeCompleteDatas?.map((item: any) => (
            <li key={item?._id}>
              <ComicCardRow data={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Right;
