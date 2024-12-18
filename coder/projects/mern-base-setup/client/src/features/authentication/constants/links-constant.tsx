import { LinkType } from "@/constants/type-constant";
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard, MdSettings } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

export const user_links = {
  menu1: {
    title: `Top`,
    path: `/me`,
    icon: <FaUserCircle />,
    subMenu: [
      {
        title: `Dashboard`,
        path: `/`,
        icon: <MdDashboard />,
      },
      {
        title: `Profile`,
        path: `/profile`,
        icon: <FaUserCircle />,
      },
      {
        title: `Change Password`,
        path: `/change-password`,
        icon: <RiLockPasswordFill />,
      },
    ],
  } as LinkType,
  menu3: {
    title: `Bottom`,
    path: `/me`,
    icon: <FaUserCircle />,
    subMenu: [
      {
        title: `Settings`,
        path: `/setting`,
        icon: <MdSettings />,
      },
    ],
  } as LinkType,
};
