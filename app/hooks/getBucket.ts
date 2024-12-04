import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});



export const getBucket = async (bucketName: string) => {
  try {
    const bucket = storage.bucket(bucketName);
    return bucket;
  } catch (error) {
    console.error('Error getting bucket:', error);
    throw error;
  }
};

export const getSignedUrl = async (bucketName: string, fileName: string) => {
  try {
    const cleanFileName = fileName.replace(/^https?:\/\/[^\/]+\/[^\/]+\//, '');
    
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(cleanFileName);
    
    // Generate a signed URL that expires in 15 minutes (900 seconds)
    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    });
    
    return url;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
};

export const listFiles = async (bucketName: string) => {
  try {
    const [files] = await storage.bucket(bucketName).getFiles();
    console.log('Files:');
    files.forEach(file => console.log(file.name));
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};

