import { Storage } from '@google-cloud/storage';
import { NextResponse } from 'next/server';


export const storage = new Storage({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
});

// Define caches
declare const caches: CacheStorage;

const bucketName = process.env.BUCKET_NAME;

export async function downloadBucket() {
  try {
    const [files] = await storage.bucket(bucketName).getFiles();

    for (const file of files) {
      const [content] = await file.download();
      // console.log(`File ${file.name} downloaded.`);

      // Save PDF file contents into browser cache
      const blob : Blob = new Blob([content], { type: 'application/pdf' });

      // Save BLOB to local storage
      localStorage.setItem("blob", 'Blob')
      // console.log(blob)

    }

    
    
  } catch (error) {
    console.error('Error downloading bucket:', error);
  }
}

downloadBucket().catch(console.error);