import { Link } from "react-router-dom";
import { memo } from "react";
import { getTmdbImage } from "@/services/tmdb-servies";

const CharacterCard = ({ data }: { data: any }) => {
  return (
    <Link to={`/person/${data?.id}`} className="">
      <div className="rounded-lg overflow-hidden aspect-thumbnail">
        <img src={getTmdbImage(data?.profile_path)} alt="" loading="lazy" />
      </div>
      <div className="p-3">
        <div className="font-semibold line-clamp-1">{data?.character}</div>
        <div className="text-xs">{data?.name || data?.original_name}</div>
      </div>
    </Link>
  );
};

export default memo(CharacterCard);
