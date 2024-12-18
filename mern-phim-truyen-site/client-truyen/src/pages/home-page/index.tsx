import ComicCard from "@/components/ComicCard";
import ComicList from "@/components/ComicList";
import ComicSide from "@/components/ComicSide";
import { getHomeApi, getListApi } from "@/services/otruyen.api";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import Right from "./Right";
import { converComicData } from "@/utils/data";

const HomePage = () => {
  const getData = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      return await getHomeApi();
    },
  });
  const makeDatas = useMemo(() => {
    return (
      getData.data?.data?.items?.map((item: any) => converComicData(item)) || []
    );
  }, [getData.data]);

  const getComingSoonResult = useQuery({
    queryKey: ["list", `sap-ra-mat`],
    queryFn: async () => {
      return await getListApi(`sap-ra-mat`);
    },
  });
  const makeComingSoonDatas = useMemo(() => {
    return (
      getComingSoonResult.data?.data?.items?.map((item: any) =>
        converComicData(item)
      ) || []
    );
  }, [getComingSoonResult.data]);

  return (
    <div className="space-y-8">
      {/* Head */}
      <div className="text-center space-y-2">
        <h4>{getData?.data?.data?.seoOnPage?.titleHead}</h4>
        <p className="text-sm">
          {getData?.data?.data?.seoOnPage?.descriptionHead}
        </p>
      </div>
      {/* slide  */}
      <div className="bg-white p-4 rounded">
        <h3 className="mb-4">Truyện đề cử</h3>
        <ComicSide data={makeDatas} />
      </div>
      {/* list  */}
      <div className="bg-white p-4 rounded flex items-start gap-10">
        {/* left  */}
        <div className="flex-1 space-y-8">
          <div>
            <h3 className="mb-4">Truyện mới cập nhật</h3>
            <ComicList datas={makeDatas} />
          </div>
          <div>
            <h3 className="mb-4">Truyện sắp ra mắt</h3>
            <ComicList datas={makeComingSoonDatas} />
          </div>
        </div>
        {/* right  */}
        <div className="hidden md:block max-w-[256px] xl:max-w-[332px] w-full px-4">
          <Right />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
