import { useState } from "react";
import { AppBar } from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Post = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const post = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/blog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    navigate(`/blog/${response.data.id}`);
  };
  return (
    <div className="">
      <AppBar />
      <div className="flex justify-center w-full mt-10">
        <div className="max-w-4xl w-full">
          <div>
            <textarea
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              id="title"
              rows={4}
              className="placeholder:text-2xl block px-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Title..."
            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full mt-5">
        <div className="max-w-4xl w-full">
          <div>
            <textarea
              onChange={(e) => {
                setContent(e.target.value);
              }}
              id="content"
              rows={4}
              className="placeholder:text-2xl block px-2.5 pb-70 w-full text-lg text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Content..."
            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full mt-10">
        <div className="max-w-4xl w-full">
          <button
            type="submit"
            onClick={post}
            className="flex justify-center w-40 rounded-xl bg-green-700 px-3 py-2.5 text-sm/6 font-semibold text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
