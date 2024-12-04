import { v2 as cloudinary } from 'cloudinary';

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || !process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary credentials are not set');
}

const cloudinaryConfig = {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
};

cloudinary.config(cloudinaryConfig);

export const uploadImageToCloudinary = async (imageData: string) => {
    try {
        const result = await cloudinary.uploader.upload(imageData, {
            folder: 'leadership',
            resource_type: 'auto'
        });
        return { url: result.secure_url };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return { error: 'Failed to upload image to Cloudinary' };
    }
};

export { cloudinaryConfig };
export default cloudinary;
