// src/components/ImageDisplay.tsx
import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import cld from '../../../configs/cloudinaryConfig';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { scale } from '@cloudinary/url-gen/actions/resize';

// Define props interface if you want to pass dynamic image IDs
interface ImageDisplayProps {
  publicId?: string; // Optional prop for dynamic image IDs
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  publicId = 'your_image_name',
}) => {
  // Create the Cloudinary image instance
  const myImage: CloudinaryImage = cld.image(publicId);

  // Apply transformations (type-safe chaining)
  myImage
    .resize(scale().width(500)) // Resize to 500px width
    .format('auto') // Auto-select best format
    .quality('auto'); // Auto-optimize quality

  return (
    <div>
      <h1>My Cloudinary Image</h1>
      <AdvancedImage cldImg={myImage} alt='Cloudinary Hosted Image' />
    </div>
  );
};

export default ImageDisplay;
