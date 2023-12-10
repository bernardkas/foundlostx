import Modal from '@/components/ui/modal';
import React from 'react';

interface MobileFilterProps {
  openModal: boolean;
  setOpenModal: (a: boolean) => void;
}

const MobileFilter = ({ openModal, setOpenModal }: MobileFilterProps) => {
  return (
    <div>
      <Modal
        className=' w-[450px]'
        isOpen={openModal}
        onClose={() => setOpenModal(false)}>
        FilterMobile
      </Modal>
    </div>
  );
};

export default MobileFilter;
