import React, { useState, ChangeEvent } from 'react';

interface PhotoUploadProps {
  onUpload: (files: File[]) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const updatedFiles = [...selectedFiles, ...files];

      setSelectedFiles(updatedFiles);

      onUpload(updatedFiles);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);

    setSelectedFiles(updatedFiles);

    onUpload(updatedFiles);
  };

  return (
    <div>
      <input
        type='file'
        accept='image/*'
        multiple
        onChange={handleFileChange}
      />

      {selectedFiles.length > 0 && (
        <div>
          <h4 className='text-slate-700 font-semibold mt-2'>Selected Files:</h4>
          <ul>
            {selectedFiles.map((file, index) => (
              <li
                className='flex flex-col gap-2 border-[1px] my-3 p-1 rounded-sm'
                key={index}>
                {file.name}{' '}
                <button
                  className='bg-slate-800 text-white p-[2px] rounded-md'
                  onClick={() => handleRemoveFile(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
