'use client';

import { FC, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { Modal, ModalBody, ModalFooter, Button } from '@windmill/react-ui';
import { FiTrash2 } from 'react-icons/fi';

import CustomerServices from '@/services/CustomerServices';
import AdminServices from '@/services/AdminServices';
import CouponServices from '@/services/CouponServices';
import ProductServices from '@/services/ProductServices';
import CategoryServices from '@/services/CategoryServices';
import { SidebarContext } from '@/context/SidebarContext';
import { notifySuccess, notifyError } from '@/utils/toast';
import useToggleDrawer from '@/hooks/useToggleDrawer';

interface MainModalProps {
  /** Single item id to delete */
  id: string;
  /** Display name in the confirmation sentence */
  title: string;
}

const MainModal: FC<MainModalProps> = ({ id, title }) => {
  const { isModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
  const { setServiceId } = useToggleDrawer();
  const pathname = usePathname();

  /* ------------------------------------------------------------------ */
  /*                              helpers                               */
  /* ------------------------------------------------------------------ */

  const run = async <T,>(fn: () => Promise<T>) => {
    try {
      const res: any = await fn();
      setIsUpdate(true);
      notifySuccess(res.message);
    } catch (err: any) {
      notifyError(err?.message);
    } finally {
      closeModal();
      setServiceId('');
    }
  };

  const handleDelete = (): void => {
    switch (pathname) {
      case '/products':
        run(() => ProductServices.deleteProduct(id));
        break;
      case '/category':
        run(() => CategoryServices.deleteCategory(id,{}));
        break;
      case '/customers':
        run(() => CustomerServices.deleteCustomer(id));
        break;
      case '/coupons':
        run(() => CouponServices.deleteCoupon(id));
        break;
      case '/our-staff':
        run(() => AdminServices.deleteStaff(id));
        break;
      default:
        closeModal();
    }
  };

  /* ------------------------------------------------------------------ */
  /*                                UI                                  */
  /* ------------------------------------------------------------------ */

  return (
    <Modal isOpen={!!isModalOpen} onClose={closeModal}>
      <ModalBody className="text-center px-8 pt-6 pb-4">
        <span className="flex justify-center text-3xl mb-6 text-red-500">
          <FiTrash2 />
        </span>

        <h2 className="text-xl font-medium mb-2">
          Are you sure you want to delete&nbsp;
          <span className="text-red-500">{title}</span>?
        </h2>
        <p>
          This action is irreversible – you won’t be able to view this record
          again once it’s deleted.
        </p>
      </ModalBody>

      <ModalFooter className="justify-center">
        <Button layout="outline" className="w-full sm:w-auto" onClick={closeModal}>
          No, Keep It
        </Button>
        <Button onClick={handleDelete} className="w-full sm:w-auto">
          Yes, Delete It
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default MainModal;
