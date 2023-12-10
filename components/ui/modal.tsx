// components/Modal.tsx

import { cn } from '@/lib/utils';
import { ReactNode, useCallback, useEffect, useRef } from 'react';

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
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose, handleOutsideClick]);

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50'>
          <div
            ref={modalRef}
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
