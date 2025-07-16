import React, { useState } from "react";
import BlogForm from "./components/BlogForm";
import { summarizeBlog } from "./services/api";
import SummaryCard from "./components/SummaryCard";

const App = () => {
  const [summary, setSummary] = useState("");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBlogSubmit = async (url) => {
    setSummary("");
    setTranslated("");
    setError(null);
    setLoading(true);

    try {
      const data = await summarizeBlog(url);
      setSummary(data.summary);
      setTranslated(data.urdu);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to summarize the blog. Please check the URL and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
            Blog Summarizer
          </h1>
          <p className="text-purple-200 text-lg">
            Paste a blog URL to get an AI-generated summary and Urdu translation
          </p>
        </header>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl p-6 mb-10 border border-white border-opacity-20">
          <BlogForm onSubmit={handleBlogSubmit} loading={loading} />
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div className="h-3 bg-blue-400 rounded w-3/4"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-3 bg-blue-400 rounded col-span-2"></div>
                    <div className="h-3 bg-blue-400 rounded col-span-1"></div>
                  </div>
                  <div className="h-3 bg-blue-400 rounded"></div>
                </div>
              </div>
            </div>
            <p className="mt-6 text-blue-200">Analyzing the blog content...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900 bg-opacity-30 backdrop-blur-sm border-l-4 border-red-400 p-4 mb-8 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-red-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-100">{error}</p>
              </div>
            </div>
          </div>
        )}

        {summary && (
          <div className="space-y-8 animate-fade-in">
            <SummaryCard
              title="English Summary"
              text={summary}
              gradient="from-cyan-500 to-blue-600"
            />

            <SummaryCard
              title="Urdu Translation"
              text={translated}
              dir="rtl"
              lang="ur"
              gradient="from-purple-500 to-pink-600"
            />
          </div>
        )}

        <footer className="mt-16 text-center text-sm text-purple-300 opacity-80">
          <p>
            © {new Date().getFullYear()} Blog Summarizer | AI-Powered Content
            Analysis
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
