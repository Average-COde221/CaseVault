import Typesense from 'typesense';

// Initialize Typesense client
const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: 'your-typesense-server-host',  // Example: 'localhost'
      port: 443,                          // or 8108 for HTTP
      protocol: 'https',                   // or 'http'
    },
  ],
  apiKey: 'your-typesense-api-key',      // Replace with your Typesense API Key
  connectionTimeoutSeconds: 2,
});

// Function to search documents in Typesense
export const searchDocuments = async (query) => {
  try {
    const searchResult = await typesenseClient.collections('pdffiles').documents().search({
      q: query,
      query_by: 'fileName',  // Search by fileName (you can adjust this)
    });

    // Return the documents that match the query
    return searchResult.hits.map((hit) => hit.document);
  } catch (error) {
    console.error('Error during search:', error);
    return [];
  }
};
