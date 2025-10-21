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
    <div className="py-3 border-b border-gray-300 flex justify-between px-5 lg:px-10">
      <div className="font-extrabold text-3xl">
        <Link to={"/blogs"}>Medium</Link>
      </div>
      <div className="flex">
        <div className="pr-2 flex justify-center flex-col">
          <Link to="/post">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-extrabold rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Post Blog
            </button>
          </Link>
        </div>
        <div className="flex justify-center flex-col relative">
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
            title="Account menu"
          >
            <AvatarAppBar name="Araf" />
          </button>

          {open ? (
            <div
              role="menu"
              className="absolute -right-4 top-12 w-max rounded-md border border-gray-200 bg-white shadow-md py-1 z-50"
            >
              <button
                type="button"
                onClick={handleSignOut}
                className="text-left px-2 py-1.5 text-sm font-extrabold text-gray-800 hover:bg-gray-50"
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

export function AvatarAppBar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="text-white text-xl font-extrabold dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}
