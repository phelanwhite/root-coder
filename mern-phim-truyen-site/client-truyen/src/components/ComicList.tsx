import { ComicListType } from "@/assets/types";
import React, { memo } from "react";
import ComicCard from "./ComicCard";
import Paginate from "./paginate";

const ComicList = ({
  datas,
  isLoading,
  currentPage,
  onPageChange,
  totalPages,
}: ComicListType) => {
  console.log({
    datas,
  });

  return (
    <div className="space-y-8">
      {isLoading && <div>Loading...</div>}
      {datas?.length > 0 && !isLoading && (
        <>
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {datas.map((item) => (
              <ComicCard key={item?.slug} data={item} />
            ))}
          </div>
          {totalPages && totalPages > 0 && (
            <Paginate
              forcePage={currentPage}
              pageCount={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
      {datas?.length === 0 && !isLoading && (
        <div className="text-center text-gray-700">No comics found.</div>
      )}
    </div>
  );
};

export default memo(ComicList);
