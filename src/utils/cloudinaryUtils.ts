import { CloudinaryImage } from '@cloudinary/url-gen';
import { scale } from '@cloudinary/url-gen/actions/resize';
import cld from '../configs/cloudinaryConfig';

interface CloudinaryImageOptions {
  width?: number;
  height?: number;
  defaultImage?: string;
  folder?: string; // Optional folder prefix
  asBackground?: boolean;
}

export const getCloudinaryImage = (
  imageSource: string | undefined,
  options: CloudinaryImageOptions = {}
): CloudinaryImage | string => {
  const {
    width = 800,
    defaultImage = 'grass-road_hkxcu7',
    asBackground = true,
  } = options;

  const publicId = imageSource?.includes('cloudinary.com')
    ? imageSource.split('/').pop()?.split('.')[0]
    : imageSource || defaultImage;

  // Create and configure the Cloudinary image
  const image: CloudinaryImage = cld.image(publicId);
  image
    .resize(scale().width(width)) // Apply width and optional height
    .format('auto')
    .quality('auto');

  // console.log('Generated URL:', image.toURL()); // Debug: Check the URL
  return asBackground ? image.toURL() : image;
};
