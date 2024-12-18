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
  return (
    <div className="relative" ref={menuRef}>
      <button className="block" onClick={() => setIsOpen(!isOpen)}>
        {icon ? icon : <HiOutlineDotsHorizontal />}
      </button>
      {isOpen && (
        <div className="button-show-menu absolute top-10 right-0 z-[999] bg-white shadow-lg border py-2 rounded-lg w-[230px] max-h-[500px] overflow-y-auto text-sm">
          {children}
        </div>
      )}
    </div>
  );
};

export default memo(ButtonMenu);
