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
    height,
    defaultImage = 'road/grass-road_hkxcu7',
    asBackground = true,
  } = options;

  const publicId: string =
    imageSource && imageSource.trim() !== ''
      ? imageSource.includes('cloudinary.com')
        ? imageSource.split('/upload/')[1]?.split('.')[0] || defaultImage
        : imageSource
      : defaultImage;

  // Create and configure the Cloudinary image
  const image: CloudinaryImage = cld.image(publicId);

  // Apply resize only if width or height is provided and defined
  const resizeAction = scale();
  if (typeof width === 'number') {
    resizeAction.width(width); // Safe: width is a number
  }
  if (typeof height === 'number') {
    resizeAction.height(height); // Safe: height is a number
  }
  if (typeof width === 'number' || typeof height === 'number') {
    image.resize(resizeAction); // Apply resize only if at least one dimension is set
  }

  image.format('auto').quality('auto');

  // console.log('Generated URL:', image.toURL()); // Debug: Check the URL
  return asBackground ? image.toURL() : image;
};
