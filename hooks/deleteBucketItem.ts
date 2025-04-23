import { Storage } from '@google-cloud/storage';

export const deleteBucketItem = async (bucketName: string, filename: string) => {
    try {
        const storage = new Storage({
            projectId: process.env.GOOGLE_PROJECT_ID,
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
            }
        });

        const bucket = storage.bucket(bucketName);
        const file = bucket.file(filename);

        await file.delete();
        
        return true;
    } catch (error) {
        console.error('Error deleting file from bucket:', error);
        throw error;
    }
};
