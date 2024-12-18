import ButtonToggleTheme from "@/components/ButtonToggleTheme";
import InputSearch from "@/components/InputSearch";
import { IMAGE_FORMAT } from "@/constants/images";
import React, { memo } from "react";
import { PiBookOpenLight } from "react-icons/pi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      style={{
        background: `url(${IMAGE_FORMAT.bg_header}) no-repeat center/cover`,
      }}
    >
      <div className="max-w-[1232px] w-full mx-auto flex items-center gap-8 px-4 py-2">
        <Link
          to={`/`}
          className="flex items-center gap-1 text-base font-bold text-white"
        >
          <PiBookOpenLight size={32} />
          <span>FLTRUYENFULL</span>
        </Link>
        <InputSearch />
        <div>
          <ButtonToggleTheme />
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
