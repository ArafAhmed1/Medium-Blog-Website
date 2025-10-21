import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorName?: string;
  title: string;
  content: string;
  publishedDate: string;
  key: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="py-5">
        <div className="flex">
          <div className="">
            <AvatarBlog name={authorName} />
          </div>
          <div className="flex pt-0.5">
            <div className="font-bold pl-2 flex justify-center flex-col">
              {authorName}
            </div>
            <div className="pl-2 text-xs text-gray-400 flex justify-center flex-col">
              &#9679;
            </div>
            <div className="pl-2 font-thin text-black flex justify-center flex-col">
              {publishedDate}
            </div>
          </div>
        </div>
        <div className="text-2xl font-bold mt-2">{title}</div>
        <div className="text-md mt-1">{content.slice(0, 500) + "..."}</div>
        <div className="text-slate-600 text-sm mt-2">{`${Math.ceil(
          content.length / 100
        )} minute(s) read`}</div>
        <div className="bg-slate-200 h-1 w-full mt-4"></div>
      </div>
    </Link>
  );
};

export function AvatarBlog({ name }: { name?: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="text-white dark:text-gray-300">
        {name ? name[0] : "X"}
      </span>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="py-5 animate-pulse">
      <div className="flex">
        <div>
          <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-200 rounded-full" />
        </div>
        <div className="flex pt-0.5">
          <div className="font-bold pl-2 flex justify-center flex-col">
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>
          <div className="pl-2 text-xs text-gray-400 flex justify-center flex-col">
            <div className="h-3 w-3 bg-gray-200 rounded-full" />
          </div>
          <div className="pl-2 font-thin text-black flex justify-center flex-col">
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
      <div className="h-7 w-2/3 bg-gray-200 rounded mt-2" /> {/* Title */}
      <div className="h-5 w-full bg-gray-200 rounded mt-1" /> {/* Content */}
      <div className="h-4 w-24 bg-gray-200 rounded mt-2" /> {/* Read time */}
      <div className="bg-slate-200 h-1 w-full mt-4" />
    </div>
  );
}
