import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export const AppBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node | null;
      if (menuRef.current && target && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  function handleSignOut() {
    try {
      localStorage.removeItem("token");
    } catch {
      /* ignore errors clearing token */
    }
    setOpen(false);
    navigate("/signin");
  }

  return (
    <div className="py-3 border-b border-gray-300 flex justify-between items-center px-5 lg:px-10">
      <div className="font-extrabold text-3xl">
        <Link to={"/blogs"}>Medium</Link>
      </div>
      <div className="flex items-center">
        <div className="pr-5">
          <Link to="/post">
            <button
              type="button"
              className="cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-extrabold rounded-full text-sm px-5 py-2.5 text-center"
            >
              Post Blog
            </button>
          </Link>
        </div>
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
            title="Account menu"
          >
            <AvatarAppBar />
          </button>

          {open ? (
            <div
              role="menu"
              className="absolute -right-4 top-12 w-max rounded-md border border-gray-200 bg-white shadow-md py-1 z-50"
            >
              <button
                type="button"
                onClick={handleSignOut}
                className="cursor-pointer text-left px-2 py-1.5 text-sm font-extrabold text-gray-800 hover:bg-gray-50"
                role="menuitem"
              >
                Sign out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export function AvatarAppBar() {
  return (
    <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <svg
        className="absolute w-12 h-12 text-gray-400 -left-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
  );
}
