import { getComicApi } from "@/services/otruyen.api";
import { converComicData, getIdChapter } from "@/utils/data";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { FaTags, FaUser } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";
import { RiFileListLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";

const ComicIdPage = () => {
  const { slug } = useParams();
  const getDataResult = useQuery({
    queryKey: ["comic", slug],
    queryFn: async () => {
      return await getComicApi(slug as string);
    },
    enabled: !!slug,
  });
  const makeData = useMemo(() => {
    return converComicData(getDataResult.data?.data?.item);
  }, [getDataResult.data]);

  const chapterLastLink = useMemo(() => {
    return getIdChapter(
      makeData?.chapters?.[0]?.server_data?.[0]?.chapter_api_data
    );
  }, [makeData]);

  const chapterFirstLink = useMemo(() => {
    return getIdChapter(
      makeData?.chapters?.[0]?.server_data?.[
        makeData?.chapters?.[0]?.server_data?.length - 1
      ]?.chapter_api_data
    );
  }, [makeData]);

  return (
    <div className="space-y-6 bg-white p-4 rounded">
      {/* header  */}
      <div className="text-center">
        <h1>{makeData?.name}</h1>
        <div className="italic text-13">
          [Cập nhật lúc: {new Date(makeData?.updatedAt).toDateString()}]
        </div>
      </div>
      {/* comic info */}
      <div className="flex items-start flex-col md:flex-row  gap-8">
        <div className="aspect-thumbnail md:w-52 mx-auto">
          <img src={makeData?.thumb_url} loading="lazy" alt="" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <FaUser />
            <span>Tác giả: </span>
            <span>{makeData?.author?.join(`, `)}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <FaUser />
            <span>Tình trạng: </span>
            <span>{makeData?.status}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <FaTags />
            <span>Thể loại: </span>
            {makeData?.category?.map?.((item: any) => (
              <Link key={item?.slug} to={`/the-loai/${item?.slug}`}>
                {item?.name}
              </Link>
            ))}
          </div>
          <div className="flex gap-2">
            <Link
              to={`chapter/${chapterFirstLink}`}
              className="bg-orange-400 hover:bg-orange-500 leading-none text-white text-sm px-3 py-2 rounded"
            >
              Đọc từ đầu
            </Link>
            <Link
              to={`chapter/${chapterLastLink}`}
              className="bg-orange-400 hover:bg-orange-500 leading-none text-white text-sm px-3 py-2 rounded"
            >
              Đọc mới nhất
            </Link>
          </div>
        </div>
      </div>
      {/* comic content */}
      <div>
        <h4 className="flex items-center gap-2 border-b-2 border-b-blue-500 pb-1 text-blue-500">
          <RiFileListLine size={24} />
          <span>Nội dung</span>
        </h4>
        <div
          className="py-2"
          dangerouslySetInnerHTML={{ __html: makeData?.content }}
        ></div>
      </div>
      {/* comic chapters */}
      <div>
        <h4 className="flex items-center gap-2 border-b-2 border-b-blue-500 pb-1 text-blue-500">
          <MdFormatListBulleted size={24} />
          <span>Danh sách chương</span>
        </h4>
        <div className="py-2 max-h-[500px] overflow-x-hidden overflow-y-auto">
          {makeData?.chapters?.[0]?.server_data
            ?.sort((a: any, b: any) => b.chapter_name - a.chapter_name)
            ?.map((item: any) => (
              <Link
                className="block py-1 border-b"
                to={`chapter/${getIdChapter(item?.chapter_api_data)}`}
                key={item?.chapter_name}
              >
                Chapter {item?.chapter_name}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ComicIdPage;
