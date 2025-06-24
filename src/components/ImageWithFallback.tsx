
import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
}

const convertGoogleDriveLink = (driveUrl: string): string => {
  // Check if it's a Google Drive link
  if (!driveUrl.includes('drive.google.com')) {
    return driveUrl;
  }

  // Extract file ID from various Google Drive URL formats
  const fileIdMatch = 
    driveUrl.match(/\/d\/(.+?)\//)?.[1] || 
    driveUrl.match(/id=(.+?)&/)?.[1] ||
    driveUrl.match(/id=(.+?)$/)?.[1];
  
  if (fileIdMatch) {
    return `https://drive.google.com/uc?export=view&id=${fileIdMatch}`;
  }
  
  return driveUrl; // Return original if conversion fails
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  fallback = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face", 
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(convertGoogleDriveLink(src));
  const [hasError, setHasError] = useState(false);
  
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };
  
  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback;
