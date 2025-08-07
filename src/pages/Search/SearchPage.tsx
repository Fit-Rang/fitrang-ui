import { useState } from "react";
import ProfileCard from "@components/ProfileCard";
import handleSearch from "../../services/handleSearch";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const profiles = await handleSearch(query);
      setResults(profiles);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <main className="h-full w-full px-6 py-10 text-white flex flex-col items-center">
      <h1 className="text-5xl font-dancing font-bold mb-8 text-white">
        Search Profiles
      </h1>

      <article className="flex flex-row items-center gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Name or ID"
          className="bg-gold text-black placeholder-black font-medium rounded-xl px-5 py-3 w-full sm:w-96 shadow-inner focus:outline-none focus:ring-2 focus:ring-gold transition"
        />
        <button
          onClick={onSearch}
          disabled={loading}
          className="bg-white text-black font-semibold rounded-xl px-6 py-3 shadow hover:bg-gray-200 transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </article>

      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.length > 0 ? (
          results.map((profile: any) => (
            <ProfileCard
              key={profile._id}
              profile={{
                id: profile._source.id,
                full_name: profile._source.name,
                createdAt: "", // Add if available
                updatedAt: ""
              }}
              url="profile"
            />
          ))
        ) : (
          <p className="text-gray-300 mt-10">
            {loading ? "Loading..." : "No profiles found."}
          </p>
        )}
      </section>
    </main>
  );
}


