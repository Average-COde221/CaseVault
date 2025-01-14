const Typesense = require('typesense');

const client = new Typesense.Client({
  nodes: [
    {
      host: 'your-typesense-server-host',
      port: 443,
      protocol: 'https',
    },
  ],
  apiKey: 'your-api-key',
  connectionTimeoutSeconds: 2,
});

const createCollection = async () => {
  try {
    const result = await client.collections().create({
      name: 'pdffiles',
      fields: [
        { name: 'id', type: 'string' },
        { name: 'fileId', type: 'string' },
        { name: 'fileName', type: 'string' },
        { name: 'uploadedAt', type: 'int64' },
        { name: 'webContentLink', type: 'string' },
        { name: 'webViewLink', type: 'string' },
      ],
      default_sorting_field: 'uploadedAt',
    });
    console.log('Collection created:', result);
  } catch (error) {
    console.error('Error creating collection:', error);
  }
};

createCollection();
