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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-extrabold mb-8 text-center">
          📝 Blog Summariser
        </h1>

        <BlogForm onSubmit={handleBlogSubmit} />

        {loading && (
          <div className="mt-6 text-center animate-pulse text-blue-600 dark:text-blue-400">
            ⏳ Summarizing blog content...
          </div>
        )}

        {summary && (
          <div className="mt-10 space-y-6">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-400">
                📘 English Summary
              </h2>
              <p className="leading-relaxed">{summary}</p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-400">
                🌐 Urdu Translation
              </h2>
              <p className="leading-relaxed font-noto">{translated}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
