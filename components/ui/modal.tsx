// components/Modal.tsx

import { cn } from '@/lib/utils';
import { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50'>
          <div
            className={cn(
              `relative z-50 w-96 p-4 bg-white rounded-md `,
              className
            )}>
            <button
              className='absolute top-2 right-2 text-gray-600 hover:text-gray-800'
              onClick={onClose}>
              &#10005;
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
