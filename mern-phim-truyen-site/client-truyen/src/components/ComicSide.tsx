// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import { Autoplay } from "swiper/modules";

import { ComicSideItemType, ComicSideType } from "@/assets/types";
import { Link } from "react-router-dom";
import { getIdChapter } from "@/utils/data";

const ComicSide = ({ data }: ComicSideType) => {
  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={2}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
      >
        {data.map((item: any) => (
          <SwiperSlide key={item?._id}>
            <ComicSideItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const ComicSideItem = ({ data }: ComicSideItemType) => {
  return (
    <div className="relative leading-none overflow-hidden">
      <div className="aspect-thumbnail">
        <img src={data?.thumb_url} loading="lazy" alt="" />
      </div>
      <div className="bg-black/60 text-white p-2 absolute bottom-0 left-0 right-0 space-y-2">
        <h5 className="line-clamp-1">
          <Link to={`/truyen-tranh/${data?.slug}`}>{data?.name}</Link>
        </h5>
        <p className="text-13">
          <Link
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

export default ComicSide;
