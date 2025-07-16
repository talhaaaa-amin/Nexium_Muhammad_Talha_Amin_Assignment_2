import { useState } from "react";

function BlogForm({ onSubmit }) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) return;
    onSubmit(url);
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-x-2">
      <input
        type="text"
        placeholder="Enter blog URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="px-3 py-2 rounded border"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Summarize
      </button>
    </form>
  );
}

export default BlogForm;
