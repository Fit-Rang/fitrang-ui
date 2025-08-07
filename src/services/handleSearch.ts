import axiosInstance from "../libs";

export default async function handleSearch(query: string) {
  try {
    const res = await axiosInstance.post(
      "elastic/profile/_search",
      {
        query: {
          query_string: {
            query: `*${query}*`,
            fields: ["id", "name"],
          },
        },
      }
    );

    console.log("Search Results:", res.data.hits.hits);
    return res.data.hits.hits;
  } catch (err) {
    console.error("Elasticsearch query failed:", err);
    throw err;
  }
}

