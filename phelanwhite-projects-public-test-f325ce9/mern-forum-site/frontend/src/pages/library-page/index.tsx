import { Link, NavLink, Outlet, useResolvedPath } from "react-router-dom";

const links = [
  {
    title: `Your list`,
    to: ``,
  },
  {
    title: `Saved lists`,
    to: `/saved-list`,
  },
  {
    title: `History`,
    to: `/history`,
  },
];
const LibraryPage = () => {
  const resolvedPath = useResolvedPath(``);

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-2xl">Your library</div>
          <Link
            to={`/list-create`}
            className="px-4 py-1.5 rounded-full hover:bg-green-700 bg-green-600 text-white"
          >
            New list
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={resolvedPath.pathname + link.to}
              className={() =>
                [
                  `font-semibold `,
                  window.location.pathname === resolvedPath.pathname + link.to
                    ? `text-black`
                    : `text-secondary`,
                ].join(" ")
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LibraryPage;