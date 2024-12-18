import ButtonMenu from "@/components/form/button-menu";
import { IMAGES_DEFAULT } from "@/constants/images-constant";
import clsx from "clsx";
import { memo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/auth-store";
import { user_links } from "../constants/links-constant";
import ThemeButton from "@/features/theme/components/ThemeButton";
import SignoutButton from "./SignoutButton";
import { FaMoon } from "react-icons/fa";
import { useThemeStore } from "@/features/theme/stores/theme-store";

const AuthButtonMenu = () => {
  const { isLoggedIn, user, changeRedirectUrl } = useAuthStore();
  const location = useLocation();
  const { theme } = useThemeStore();

  return (
    <>
      {isLoggedIn ? (
        <ButtonMenu
          icon={
            <div className="w-8 h-8 overflow-hidden rounded-full border">
              <img
                src={user?.avatar || IMAGES_DEFAULT.account_notfound}
                loading="lazy"
                alt=""
              />
            </div>
          }
        >
          <div className="pt-2 px-2 bg-auth-menu-bg-color">
            {/* top  */}
            <div className="px-4 pb-2">
              <div className="font-medium line-clamp-1 text-base">
                {user?.name}
              </div>
              <div className="text-sm line-clamp-1 break-words">
                {user?.email}
              </div>
            </div>
            {/* link  */}
            {Object.values(user_links).map((link) => (
              <div key={link.title}>
                <hr />
                <ul className="py-2">
                  {link?.subMenu?.map((item) => (
                    <li key={item.title}>
                      <NavLink
                        to={link.path + item.path}
                        className={({ isActive }) =>
                          clsx(
                            `w-full flex items-center gap-2 px-4 py-2 rounded`,
                            location.pathname === link.path + item.path &&
                              (theme ? `bg-gray-800` : `bg-gray-100`),
                            theme ? `hover:bg-gray-800` : `hover:bg-gray-100`
                          )
                        }
                      >
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* signout button  */}
            <ul className="py-2 border-t">
              <li>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded">
                    <FaMoon />
                    <span>Dark mode</span>
                  </div>
                  <ThemeButton />
                </div>
              </li>
              <li>
                <SignoutButton />
              </li>
            </ul>
          </div>
        </ButtonMenu>
      ) : (
        <Link
          to={`/signin`}
          onClick={() => changeRedirectUrl(location)}
          className="inline-block text-sm px-3 py-1.5 bg-black text-white rounded"
        >
          Signin
        </Link>
      )}
    </>
  );
};

export default memo(AuthButtonMenu);
