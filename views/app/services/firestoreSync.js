import firestore from '@react-native-firebase/firestore';
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

// Sync Firestore data to Typesense when any document is added, modified, or removed
export const syncFirestoreToTypesense = () => {
  firestore()
    .collection('pdffiles')  // Your Firestore collection
    .onSnapshot(async (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const doc = change.doc.data();
        const docId = change.doc.id;

        try {
          if (change.type === 'added' || change.type === 'modified') {
            // Upsert document in Typesense
            await typesenseClient.collections('pdffiles').documents().upsert({
              id: docId,
              fileId: doc.fileId,
              fileName: doc.fileName,
              uploadedAt: new Date(doc.uploadedAt).getTime(),
              webContentLink: doc.webContentLink,
              webViewLink: doc.webViewLink,
            });
            console.log(`Synced document ${docId} to Typesense.`);
          } else if (change.type === 'removed') {
            // Delete document from Typesense
            await typesenseClient.collections('pdffiles').documents(docId).delete();
            console.log(`Deleted document ${docId} from Typesense.`);
          }
        } catch (error) {
          console.error(`Error syncing document ${docId}:`, error);
        }
      });
    });
};
