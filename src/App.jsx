import { useState } from "react";
import { summarizeBlog } from "./lib/api";
import BlogForm from "./components/BlogForm";

function App() {
  const [summary, setSummary] = useState("");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBlogSubmit = async (url) => {
    try {
      setLoading(true);
      const data = await summarizeBlog(url);
      setSummary(data.summary);
      setTranslated(data.urdu);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">📝 Blog Summariser</h1>
      <BlogForm onSubmit={handleBlogSubmit} />

      {loading && <p className="mt-4">⏳ Summarizing...</p>}

      {summary && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold">English Summary:</h2>
            <p>{summary}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold">Urdu Translation:</h2>
            <p className="font-noto">{translated}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
