import { AppBar } from "./AppBar";
import type { Blog } from "../hooks/index";
export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-4 px-4 lg:px-20 mt-10 lg:mt-20 w-full gap-8">
          <div className="lg:col-span-3">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="py-3 font-thin text-black flex justify-center flex-col">
              Posted on 21 Oct 2025
            </div>
            <div className="mt-2">{blog.content}</div>
          </div>
          <div className="lg:col-span-1">
            <div className="my-5 text-xl font-bold text-slate-500">Author</div>
            <div className="flex">
              <Avatar name={blog.author.name || "Anonymous"} />
              <div className="flex justify-center flex-col font-bold text-xl pl-5">
                {blog.author.name || "Anonymous"}
              </div>
            </div>
            <div className="px-2 py-5">
              Random info about the author where he tries to present himself to
              the readers in a quirky way.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function FullBlogSkeleton() {
  return (
    <div>
      <div className="flex justify-center flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-4 px-4 lg:px-20 mt-20 w-full gap-8">
          <div className="col-span-3 pr-30">
            <div className="h-16 w-2/3 bg-gray-200 rounded mb-4 animate-pulse" />{" "}
            {/* Title */}
            <div className="py-3 font-thin text-black flex justify-center flex-col">
              <div className="h-5 w-32 bg-gray-200 rounded mb-2 animate-pulse" />{" "}
              {/* Date */}
            </div>
            <div className="space-y-4 mt-2">
              <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-5/6 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-4/6 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-3/6 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="col-span-1">
            <div className="my-5 text-xl font-bold text-slate-500">
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />{" "}
              {/* Author label */}
            </div>
            <div className="flex items-center">
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full mr-3 animate-pulse" />{" "}
              {/* Avatar */}
              <div className="flex justify-center flex-col font-bold text-xl pl-5">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />{" "}
                {/* Author name */}
              </div>
            </div>
            <div className="px-2 py-5">
              <div className="h-4 w-full bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-4 w-5/6 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="text-white text-xl font-extrabold dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}
