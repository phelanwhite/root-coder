import { getChapterApi, getComicApi } from "@/services/otruyen.api";
import { converComicData, getIdChapter } from "@/utils/data";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaHome } from "react-icons/fa";
import { IoIosList } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";

const ChapterIdPage = () => {
  const { slug } = useParams();
  const getDataComicResult = useQuery({
    queryKey: ["comic", slug],
    queryFn: async () => {
      return await getComicApi(slug as string);
    },
    enabled: !!slug,
  });
  const makeDataComic = useMemo(() => {
    return converComicData(getDataComicResult.data?.data?.item);
  }, [getDataComicResult.data]);
  console.log({
    makeDataComic,
  });

  const { id } = useParams();
  const getDataChapterResult = useQuery({
    queryKey: ["chapter", id],
    queryFn: async () => {
      return await getChapterApi(id as string);
    },
    enabled: !!id,
  });

  const navigate = useNavigate();
  // const current_chapter = useMemo(() => {
  //   return makeDataComic?.chapters?.[0]?.server_data?.find(
  //     (item: any) => getIdChapter(item?.chapter_api_data) === id
  //   );
  // }, [makeDataComic]);
  // const handlePreviousChapter = () => {
  //   const current_chapter = console.log({
  //     current_chapter,
  //   });

  //   if (getDataChapterResult.data?.data?.prev_chapter) {
  //     navigate(
  //       `/chapter/${getIdChapter(
  //         getDataChapterResult.data?.data?.prev_chapter
  //       )}`
  //     );
  //   }
  // };
  // handlePreviousChapter();

  const [indexChapter, setIndexChapter] = useState(0);
  useEffect(() => {}, [indexChapter]);

  return (
    <div className="space-y-4">
      {/* nav */}
      <div className="">
        <div className=" flex items-center gap-4 max-w-[400px] w-full mx-auto">
          <Link to={`/`} className="text-orange-500 hover:text-orange-600">
            <FaHome size={20} />
          </Link>
          <Link
            className="text-orange-500 hover:text-orange-600"
            to={`/truyen-tranh/${makeDataComic?.slug}`}
          >
            <IoIosList size={20} />
          </Link>
          {/* button chapter */}
          <div className="flex items-stretch justify-center gap-2 flex-1">
            <button
              disabled={indexChapter === 0}
              className="bg-orange-500 hover:bg-orange-600 text-white text-base rounded inline-block p-2"
            >
              <FaAngleLeft />
            </button>
            <select
              className="border px-4 py-1.5 bg-white text-black flex-1 text-center"
              value={id}
              onChange={(e) => {
                const url = `/truyen-tranh/${makeDataComic?.slug}/chapter/${e.target.value}`;

                navigate(url);
              }}
            >
              {makeDataComic?.chapters?.[0]?.server_data
                ?.sort((a: any, b: any) => b.chapter_name - a.chapter_name)
                ?.map((item: any) => (
                  <option
                    // className="block py-1 border-b"
                    // to={`chapter/${getIdChapter(item?.chapter_api_data)}`}
                    value={getIdChapter(item?.chapter_api_data)}
                    key={item?.chapter_name}
                  >
                    Chapter {item?.chapter_name}
                  </option>
                ))}
            </select>
            <button
              disabled={indexChapter === 1136}
              className="bg-orange-500 hover:bg-orange-600 text-white text-base rounded inline-block p-2"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
      {/* images  */}
      <div className="max-w-[700px] w-full mx-auto">
        {getDataChapterResult?.data?.data?.item?.chapter_image?.map(
          (item: any) => (
            <div key={item?.image_page} className="w-full pb-2">
              <img
                src={
                  getDataChapterResult?.data?.data?.domain_cdn +
                  "/" +
                  getDataChapterResult?.data?.data?.item?.chapter_path +
                  "/" +
                  item?.image_file
                }
                loading="lazy"
                alt=""
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ChapterIdPage;
