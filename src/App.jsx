import React, { useState } from "react";
import BlogForm from "./components/BlogForm";
import { summarizeBlog } from "./services/api";
import SummaryCard from "./components/SummaryCard";

const App = () => {
  const [summary, setSummary] = useState("");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBlogSubmit = async (url) => {
    setLoading(true);
    try {
      const data = await summarizeBlog(url);
      setSummary(data.summary);
      setTranslated(data.urdu);
    } catch (err) {
      console.log(err.data);
      alert("Error summarizing blog");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">📝 Blog Summariser</h1>

      <BlogForm onSubmit={handleBlogSubmit} />

      {loading && <p className="mt-4">⏳ Summarizing...</p>}

      {summary && (
        <div className="mt-6 space-y-4">
          <SummaryCard title="English Summary" text={summary} />
          <SummaryCard title="Urdu Translation" text={translated} />
        </div>
      )}
    </div>
  );
};

export default App;
