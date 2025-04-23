import { Storage } from "@google-cloud/storage";
const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

export const getBucket = async (bucketName: string) => {
  try {
    const bucket = storage.bucket(bucketName).makePublic();
    return bucket;
  } catch (error) {
    console.error("Error getting bucket:", error);
    throw error;
  }
};

export const getSignedUrl = async (bucketName: string, fileName: string) => {
  try {
    const cleanFileName = fileName.replace(/^https?:\/\/[^\/]+\/[^\/]+\//, "");

    const bucket = storage.bucket(bucketName);
    const file = bucket.file(cleanFileName);

    // Generate a signed URL that expires in 15 minutes
    const [url] = await file.getSignedUrl({
      version: "v4",
      action: "read",
      // Corrected: expires must be a Date object in the future
      expires: new Date(Date.now() + 15 * 60 * 1000),
      queryParams: { 'response-content-disposition': 'inline' }
    });

    return url;
  } catch (error) {
    console.error("Error generating signed URL:", error);
    throw error;
  }
};

export const listFiles = async (bucketName: string) => {
  try {
    const [files] = await storage.bucket(bucketName).getFiles();
    console.log(`File: ${files}`);
    // files.forEach((file) => console.log(file.name));
  } catch (error) {
    console.error("Error listing files:", error);
    throw error;
  }
};

// NOTE: If you encounter OpenSSL errors (ERR_OSSL_UNSUPPORTED), ensure your GOOGLE_PRIVATE_KEY is not encrypted and formatted correctly.
// If using Node.js 17+ with OpenSSL 3.x, you may need to set NODE_OPTIONS=--openssl-legacy-provider in your environment.