'use client';

import { Modal, ModalBody, ModalFooter, Button } from "@windmill/react-ui";

interface Staff {
  name: string;
  access_list?: string[];
}

interface AccessListModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff?: Staff;
  showingTranslateValue: (value: string) => string;
}

const AccessListModal = ({ 
  isOpen, 
  onClose, 
  staff, 
  showingTranslateValue 
}: AccessListModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-xl font-medium text-center pb-6 dark:text-gray-300">
        List of route access for{" "}
        <span className="text-emerald-600">
          {showingTranslateValue(staff?.name || '')}
        </span>
      </h1>
      <ModalBody>
        {staff?.access_list?.length ? (
          <ol className="list-disc pl-5">
            {staff.access_list.map((route, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 dark:text-gray-300 capitalize"
              >
                {route}
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-orange-500 py-10 text-lg text-center">
            This staff not have any route access!
          </p>
        )}
      </ModalBody>
      <ModalFooter className="justify-end">
        <Button
          className="w-full sm:w-auto bg-red-400 text-white hover:bg-red-500"
          layout="primary"
          onClick={onClose}
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AccessListModal;