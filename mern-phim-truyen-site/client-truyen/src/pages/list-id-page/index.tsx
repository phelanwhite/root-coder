import ComicList from "@/components/ComicList";
import {
  getCategoriesApi,
  getListApi,
  getSearchApi,
} from "@/services/otruyen.api";
import { converComicData } from "@/utils/data";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const ListIdPage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSearchParams = useCallback(
    (name: string, value: any) => {
      setSearchParams((prev) => {
        prev.set(name, value as unknown as string);
        return prev;
      });
    },
    [searchParams]
  );

  const getDataResult = useQuery({
    queryKey: ["list", slug, searchParams.toString()],
    queryFn: async () => {
      return await getListApi(slug as string, searchParams.toString());
    },
    enabled: !!slug,
  });

  const makeDatas = useMemo(() => {
    return (
      getDataResult.data?.data?.items?.map((item: any) =>
        converComicData(item)
      ) || []
    );
  }, [getDataResult.data]);

  return (
    <div className="space-y-8">
      {/* Head */}
      <div className="bg-white p-4 rounded space-y-2">
        <h4>{getDataResult?.data?.data?.seoOnPage?.titleHead}</h4>
        <p className="text-sm">
          {getDataResult?.data?.data?.seoOnPage?.descriptionHead}
        </p>
      </div>
      {/* list  */}
      <div className="bg-white p-4 rounded">
        <ComicList
          datas={makeDatas}
          isLoading={getDataResult.isLoading}
          currentPage={
            Number(getDataResult.data?.data?.params?.pagination?.currentPage) -
            1
          }
          totalPages={Math.ceil(
            getDataResult?.data?.data?.params?.pagination?.totalItems /
              getDataResult?.data?.data?.params?.pagination?.totalItemsPerPage
          )}
          onPageChange={(e) =>
            handleSearchParams(`page`, String(e.selected + 1))
          }
        />
      </div>
    </div>
  );
};

export default ListIdPage;
