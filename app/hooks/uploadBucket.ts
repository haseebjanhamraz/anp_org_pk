import { Storage } from '@google-cloud/storage';

// Initialize Google Cloud Storage client with credentials
const storage = new Storage({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // Convert \n strings to actual newlines
  },
  projectId: process.env.GOOGLE_PROJECT_ID,
});
const bucketName = process.env.BUCKET_NAME || 'your-unique-bucket-name';

/**
 * Uploads a PDF file to Google Cloud Storage
 * @param buffer - The PDF file buffer to upload
 * @param filename - The destination filename in the bucket
 * @returns The public URL of the uploaded file
 */
export async function uploadToGCS(buffer: Buffer, filename: string): Promise<string> {
  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filename);

    // Upload buffer to GCS
    await file.save(buffer, {
      contentType: 'application/pdf',
      metadata: {
        cacheControl: 'public, max-age=31536000', // Cache for 1 year
      },
    });

    // Return the public URL (works if bucket is public)
    return `https://storage.googleapis.com/${bucketName}/${filename}`;

  } catch (error) {
    console.error('Error uploading to Google Cloud Storage:', error);
    throw error;
  }
}