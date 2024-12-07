import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCloudUploadAlt, FaImage, FaTimes, FaUser } from 'react-icons/fa';

interface PhotoUploadProps {
  onPhotoChange: (file: File) => void;
  photoFile?: File;
}

const PhotoUpload = ({ onPhotoChange, photoFile }: PhotoUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (photoFile) {
      const url = URL.createObjectURL(photoFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [photoFile]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    onPhotoChange(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {!preview ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`relative border-2 border-dashed rounded-2xl p-8 text-center ${
              isDragging 
                ? 'border-primary bg-primary/10' 
                : 'border-primary/20 hover:border-primary/40'
            } transition-colors`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{ minHeight: '400px' }}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              accept="image/*"
              className="hidden"
            />
            <div className="space-y-6 flex flex-col items-center justify-center h-full">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center border-2 border-dashed border-primary/20">
                <FaUser className="text-6xl text-primary/50" />
              </div>
              <div>
                <p className="text-xl font-semibold text-light mb-2">
                  Upload Your Headshot
                </p>
                <p className="text-light/70 mb-4">
                  Add a professional photo of yourself
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-primary/10 rounded-full text-primary hover:bg-primary/20 transition-colors inline-flex items-center gap-2"
                >
                  <FaCloudUploadAlt className="text-xl" />
                  Choose Photo
                </button>
              </div>
              <div className="text-sm text-light/50 space-y-2">
                <p>Drag and drop your photo here or click the button above</p>
                <p>Recommended: Square image, at least 400x400 pixels</p>
                <p>Supported formats: JPG, PNG (Max size: 5MB)</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative"
          >
            <div className="relative overflow-hidden border border-primary/20 group rounded-2xl" style={{ height: '400px' }}>
              <div className="w-full h-full flex items-center justify-center bg-dark/40">
                {photoFile && (
                  <img 
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="flex items-center text-light">
                    <FaImage className="mr-2" />
                    <span>Profile Photo</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 bg-primary/20 rounded-full text-light hover:bg-primary/40 transition-colors"
                      title="Change Photo"
                    >
                      <FaCloudUploadAlt />
                    </button>
                    <button
                      onClick={removePhoto}
                      className="p-2 bg-dark/80 rounded-full text-light/70 hover:text-red-500 transition-colors"
                      title="Remove Photo"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoUpload;