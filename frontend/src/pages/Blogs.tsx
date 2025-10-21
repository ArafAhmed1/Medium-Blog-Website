import { BlogCard, BlogCardSkeleton } from "../components/BlogCard";
import { AppBar } from "../components/AppBar";
import { useBlogs } from "../hooks/index";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center mt-10">
          <div className="max-w-3xl px-5 lg:px-0 min-w-2xl">
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <AppBar />
      <div className="flex justify-center mt-10">
        <div className="max-w-3xl px-5 lg:px-0">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              key={blog.title}
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate={"20 Oct 2025"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
