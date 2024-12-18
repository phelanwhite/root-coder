import InputSearch from "@/components/form/input-search";
import { ICONS_DEFAULT, LogoSVG } from "@/constants/images-constant";
import AuthButtonMenu from "@/features/authentication/components/AuthButtonMenu";
import { useAuthStore } from "@/features/authentication/stores/auth-store";
import { memo } from "react";
import { FaBell, FaRegBell } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { Link, NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  return (
    <>
      <div className="z-[999] bg-bg-color sticky top-0 left-0 right-0 p-4 border-b flex items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <Link to={`/`} className="flex items-center gap-1">
            <div className="w-10 fill">
              {/* <LogoSVG /> */}
              <img src={ICONS_DEFAULT.LogoSVG} alt="" />
            </div>
            <span className="hidden sm:block font-medium text-xl tracking-tighter">
              Phelan White
            </span>
          </Link>
        </div>

        <InputSearch className="flex-1 hidden sm:block max-w-[500px]" />

        <div className="flex items-center gap-4">
          <NavLink to={`/search`} className="sm:hidden">
            <MdSearch size={24} />
          </NavLink>
          {isLoggedIn && (
            <>
              <NavLink to={`/me/notification`}>
                {location.pathname.includes("/notification") ? (
                  <FaBell size={20} />
                ) : (
                  <FaRegBell size={20} />
                )}
              </NavLink>
            </>
          )}
          <AuthButtonMenu />
        </div>
      </div>
    </>
  );
};

export default memo(Header);
