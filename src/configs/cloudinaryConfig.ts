// src/cloudinaryConfig.ts
import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'ds4idivei', // Replace with your Cloudinary cloud name
  },
});

export default cld;
