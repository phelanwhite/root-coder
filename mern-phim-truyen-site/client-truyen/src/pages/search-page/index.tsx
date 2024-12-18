import ComicList from "@/components/ComicList";
import { getSearchApi } from "@/services/otruyen.api";
import { converComicData } from "@/utils/data";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
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

  const getSearchResult = useQuery({
    queryKey: ["search", searchParams.toString()],
    queryFn: async () => {
      return await getSearchApi(searchParams.toString());
    },
  });
  const makeDatas = useMemo(() => {
    return (
      getSearchResult.data?.data?.items?.map((item: any) =>
        converComicData(item)
      ) || []
    );
  }, [getSearchResult.data]);

  return (
    <div className="space-y-8">
      {/* Head */}
      <div className="bg-white p-4 rounded space-y-2">
        <h4>{getSearchResult?.data?.data?.seoOnPage?.titleHead}</h4>
        <p className="text-sm">
          {getSearchResult?.data?.data?.seoOnPage?.descriptionHead}
        </p>
      </div>
      {/* list  */}
      <div className="bg-white p-4 rounded">
        <ComicList
          datas={makeDatas}
          isLoading={getSearchResult.isLoading}
          currentPage={
            Number(
              getSearchResult.data?.data?.params?.pagination?.currentPage
            ) - 1
          }
          totalPages={Math.ceil(
            getSearchResult?.data?.data?.params?.pagination?.totalItems /
              getSearchResult?.data?.data?.params?.pagination?.totalItemsPerPage
          )}
          onPageChange={(e) =>
            handleSearchParams(`page`, String(e.selected + 1))
          }
        />
      </div>
    </div>
  );
};

export default SearchPage;
