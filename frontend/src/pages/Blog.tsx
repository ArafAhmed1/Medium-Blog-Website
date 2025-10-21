import { AppBar } from "../components/AppBar";
import { FullBlog, FullBlogSkeleton } from "../components/FullBlog";
import { useBlog } from "../hooks/index";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  if (loading) {
    return (
      <div>
        <AppBar />
        <FullBlogSkeleton />
      </div>
    );
  }
  if (!blog) {
    return <div>Blog not found!</div>;
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};
