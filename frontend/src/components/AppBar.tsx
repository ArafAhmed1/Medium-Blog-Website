import { Link } from "react-router-dom";

export const AppBar = () => {
  return (
    <div className="py-3 border-b border-gray-300 flex justify-between px-10">
      <div className="font-extrabold text-3xl">
        <Link to={"/blogs"}>Medium</Link>
      </div>
      <div className="flex">
        <div className="pr-5 flex justify-center flex-col">
          <Link to="/post">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-extrabold rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Post Blog
            </button>
          </Link>
        </div>
        <div className="flex justify-center flex-col">
          <AvatarAppBar name="Araf" />
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
