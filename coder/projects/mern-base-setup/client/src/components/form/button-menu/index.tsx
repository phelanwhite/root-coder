import { useThemeStore } from "@/features/theme/stores/theme-store";
import clsx from "clsx";
import React, { memo, useEffect, useRef, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

type Type = {
  icon?: React.ReactNode;
  children: React.ReactNode;
};

const ButtonMenu = ({ icon, children }: Type) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const { theme } = useThemeStore();
  return (
    <div className="relative" ref={menuRef}>
      <button className="block" onClick={() => setIsOpen(!isOpen)}>
        {icon ? icon : <HiOutlineDotsHorizontal />}
      </button>
      {isOpen && (
        <div
          className={clsx(
            `absolute top-10 right-0 z-[999] bg-button-box-color shadow-xl rounded-lg w-[230px] max-h-[500px] overflow-y-auto text-sm`,
            theme ? `border-none` : `border`
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default memo(ButtonMenu);
