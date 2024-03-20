import React, { useState, ChangeEvent } from 'react';

interface PhotoUploadProps {
  onChange: (val: any) => void;
  photo: File[];
  handleRemovePhoto: (photo: number) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onChange,
  photo,
  handleRemovePhoto,
}) => {
  return (
    <div>
      <input
        className='border p-2 cursor-pointer'
        type='file'
        accept='image/*'
        multiple
        onChange={onChange}
      />
      {photo.length > 0 && (
        <div>
          <h4 className='text-slate-700 font-semibold mt-2'>Selected Files:</h4>
          <ul>
            {photo.map((file, index) => (
              <li
                className='flex flex-col gap-2 border-[1px] my-3 p-1 rounded-sm'
                key={index}>
                {file.name}{' '}
                <button
                  className='bg-slate-800 text-white p-[2px] rounded-md'
                  onClick={() => handleRemovePhoto(index)}>
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
