// 'use client';
// import React from "react";
// import { Button, Modal, ModalBody, ModalFooter } from "@windmill/react-ui";
// import { useContext } from "react";
// import { FiTrash2 } from "react-icons/fi";
// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { usePathname } from "next/navigation";

// //internal import
// import spinnerLoadingImage from "@/assets/img/spinner.gif";
// import { SidebarContext } from "@/context/SidebarContext";
// import AdminServices from "@/services/AdminServices";
// import CategoryServices from "@/services/CategoryServices";
// import CouponServices from "@/services/CouponServices";
// import CustomerServices from "@/services/CustomerServices";
// import LanguageServices from "@/services/LanguageServices";
// import ProductServices from "@/services/ProductServices";
// import useToggleDrawer from "@/hooks/useToggleDrawer";
// import AttributeServices from "@/services/AttributeServices";
// import CurrencyServices from "@/services/CurrencyServices";
// import { notifyError, notifySuccess } from "@/utils/toast";
// import useDisableForDemo from "@/hooks/useDisableForDemo";

// const DeleteModal = ({ id, ids, setIsCheck, category, title, useParamId }) => {
//   const { isModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
//   const { setServiceId } = useToggleDrawer();
//   const pathname = usePathname();

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { handleDisableForDemo } = useDisableForDemo();

//   const handleDelete = async () => {
//     if (handleDisableForDemo()) {
//       return; // Exit the function if the feature is disabled
//     }
//     try {
//       setIsSubmitting(true);
//       if (pathname === "/products") {
//         if (ids) {
//           const res = await ProductServices.deleteManyProducts({
//             ids: ids,
//           });
//           setIsUpdate(true);
//           notifySuccess(res.message);
//           setIsCheck([]);
//           setServiceId();
//           closeModal();
//           setIsSubmitting(false);
//         } else {
//           const res = await ProductServices.deleteProduct(id);
//           setIsUpdate(true);
//           notifySuccess(res.message);
//           setServiceId();
//           closeModal();
//           setIsSubmitting(false);
//         }
//       }

//       if (pathname === "/coupons") {
//         if (ids) {
//           const res = await CouponServices.deleteManyCoupons({
//             ids: ids,
//           });
//           setIsUpdate(true);
//           notifySuccess(res.message);
//           setIsCheck([]);
//           setServiceId();
//           closeModal();
//           setIsSubmitting(false);
//         } else {
//           const res = await CouponServices.deleteCoupon(id);
//           setIsUpdate(true);
//           notifySuccess(res.message);
//           setServiceId();
//           closeModal();
//           setIsSubmitting(false);
//         }
//       }

//       if (pathname === "/categories" || category) {
//         if (ids) {
//           //  console.log('delete modal categorices',ids)
//           const res = await CategoryServices.deleteManyCategory({
//             ids: ids,
//           });
//           //  console.log('delete many category res',res)
//           setIsUpdate(true);
//           notifySuccess(res.message);
//           setIsCheck([]);
//           setServiceId();
//           closeModal();
//           setIsSubmitting(false);
//         } else {
//           if (id === undefined || !id) {
//             notifyError("Please select a category first!");
//             setIsSubmitting(false);
//             return closeModal();
//           }
//           // console.log('delete modal open',id)
//           const res = await CategoryServices.deleteCategory(id);
//           setIsUpdate(true);
//           notifySuccess(res.message);
//           closeModal();
//           setServiceId();
//           setIsSubmitting(false);
//         }
//       } else if (
//         pathname === `/categories/${useParamId}` ||
//         category
//       ) {
//         // console.log('delete modal ')
//         if (id === undefined || !id) {
//           notifyError("Please select a category first!");
//           setIsSubmitting(false);
//           return closeModal();
//         }

//         const res = await CategoryServices.deleteCategory(id);
//         setIsUpdate(true);
//         notifySuccess(res.message);
//         closeModal();
//         setServiceId();
//         setIsSubmitting(false);
//       }

//       if (pathname === "/customers") {
//         const res = await CustomerServices.deleteCustomer(id);
//         setIsUpdate(true);
//         notifySuccess(res.message);
//         setServiceId();
//         closeModal();
//         setIsSubmitting(false);
//       }

//       if (pathname === "/attributes") {
//         if (ids) {
//           const res = await AttributeServices.deleteManyAttribute({
//             ids: ids,
//           });
//           setIsUpdate(true);
//           notifySuccess(res.message);
//           setIsCheck([]);
//           setServiceId();
//           closeModal();
//           setIsSubmitting(false);
//         } else {
//           const res = await AttributeServices.deleteAttribute(id);
//           setIsUpdate(true);
//           notifySuccess(res.message);
//           setServiceId();
//           closeModal();
//           setIsSubmitting(false);
//         }
//       }

//       if (
//         pathname === `/attributes/${pathname.split("/")[2]}`
//       ) {
//         if (ids) {
//           const res = await AttributeServices.deleteManyChildAttribute({
//             id: pathname.split("/")[2],
//             ids: ids,
//           });
//           setIsUpdate(true);
//           notifySuccess(res.message);
//           setServiceId();
//           setIsCheck([]);
//           closeModal();
//           setIsSubmitting(false);
//         } else {
//           // console.log("att value delete", id, pathname.split("/")[2]);

//           const res = await AttributeServices.deleteChildAttribute({
//             id: id,
//             ids: pathname.split("/")[2],
//           });
//           setIsUpdate(true);
//           notifySuccess(res.message);
//           setServiceId();
//           closeModal();
//           setIsSubmitting(false);
//         }
//       }

//       if (pathname === "/our-staff") {
//         const res = await AdminServices.deleteStaff(id);
//         setIsUpdate(true);
//         notifySuccess(res.message);
//         setServiceId();
//         closeModal();
//         setIsSubmitting(false);
//       }

//       if (pathname === "/languages") {
//         if (ids) {
//           const res = await LanguageServices.deleteManyLanguage({
//             ids: ids,
//           });
//           setIsUpdate(true);
//           notifySuccess(res.message);
//           setIsCheck([]);
//           closeModal();
//           setIsSubmitting(false);
//         } else {
//           const res = await LanguageServices.deleteLanguage(id);
//           setIsUpdate(true);
//           notifySuccess(res.message);
//           setServiceId();
//           closeModal();
//           setIsSubmitting(false);
//         }
//       }

//       if (pathname === "/currencies") {
//         if (ids) {
//           const res = await CurrencyServices.deleteManyCurrency({
//             ids: ids,
//           });
//           setIsUpdate(true);
//           notifySuccess(res.message);
//           setIsCheck([]);
//           closeModal();
//           setIsSubmitting(false);
//         } else {
//           const res = await CurrencyServices.deleteCurrency(id);
//           setIsUpdate(true);
//           notifySuccess(res.message);
//           setServiceId();
//           closeModal();
//           setIsSubmitting(false);
//         }
//       }
//     } catch (err) {
//       notifyError(err ? err?.response?.data?.message : err?.message);
//       setServiceId();
//       setIsCheck([]);
//       closeModal();
//       setIsSubmitting(false);
//     }
//   };

//   const { t } = useTranslation();

//   return (
//     <>
//       <Modal isOpen={isModalOpen} onClose={closeModal}>
//         <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
//           <span className="flex justify-center text-3xl mb-6 text-red-500">
//             <FiTrash2 />
//           </span>
//           {/* <h2 className="text-xl font-medium mb-1">{t('DeleteModalH2')}</h2> */}
//           <h2 className="text-xl font-medium mb-2">
//             {t("DeleteModalH2")} <span className="text-red-500">{title}</span>?
//           </h2>
//           <p>{t("DeleteModalPtag")}</p>
//         </ModalBody>

//         <ModalFooter className="justify-center">
//           <Button
//             className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
//             layout="outline"
//             onClick={closeModal}
//           >
//             {t("modalKeepBtn")}
//           </Button>
//           <div className="flex justify-end">
//             {isSubmitting ? (
//               <Button
//                 disabled={true}
//                 type="button"
//                 className="w-full h-12 sm:w-auto"
//               >
//                 <img
//                   src={spinnerLoadingImage}
//                   alt="Loading"
//                   width={20}
//                   height={10}
//                 />{" "}
//                 <span className="font-serif ml-2 font-light">
//                   {t("Processing")}
//                 </span>
//               </Button>
//             ) : (
//               <Button onClick={handleDelete} className="w-full h-12 sm:w-auto">
//                 {t("modalDeletBtn")}
//               </Button>
//               // <button
//               //   type="submit"
//               //   className="text-sm mt-6 leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none text-white px-4 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white bg-emerald-400 hover:bg-emerald-500 h-10"
//               // >
//               //   Park Order
//               // </button>
//             )}
//           </div>
//         </ModalFooter>
//       </Modal>
//     </>
//   );
// };

// export default React.memo(DeleteModal);



'use client';

import { FC, useContext, useState } from 'react';
import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from '@windmill/react-ui';
import { FiTrash2 } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';

import spinnerLoadingImage from '@/assets/img/spinner.gif';
import { SidebarContext } from '@/context/SidebarContext';
import AdminServices from '@/services/AdminServices';
import CategoryServices from '@/services/CategoryServices';
import CouponServices from '@/services/CouponServices';
import CustomerServices from '@/services/CustomerServices';
import LanguageServices from '@/services/LanguageServices';
import ProductServices from '@/services/ProductServices';
import AttributeServices from '@/services/AttributeServices';
import CurrencyServices from '@/services/CurrencyServices';
import useToggleDrawer from '@/hooks/useToggleDrawer';
import useDisableForDemo from '@/hooks/useDisableForDemo';
import { notifyError, notifySuccess } from '@/utils/toast';

interface DeleteModalProps {
  id?: string;
  ids?: string[];
  /** Setter from parent table for bulk‐selection checkboxes */
  setIsCheck?: (v: string[]) => void;
  category?: boolean;
  /** Item name in the confirmation sentence */
  title?: string;
  /** Used on child-category routes (`/categories/[id]`) */
  useParamId?: string;
}

const DeleteModal: FC<DeleteModalProps> = ({
  id,
  ids,
  setIsCheck = () => undefined,
  category = false,
  title = '',
  useParamId,
}) => {
  const { isModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
  const { setServiceId } = useToggleDrawer();
  const pathname = usePathname();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleDisableForDemo } = useDisableForDemo();
  const { t } = useTranslation();

  /* ------------------------------------------------------------------ */
  /*                        delete dispatcher                           */
  /* ------------------------------------------------------------------ */
  const handleDelete = async (): Promise<void> => {
    if (handleDisableForDemo()) return;

    try {
      setIsSubmitting(true);

      /* -------- Products -------- */
      if (pathname === '/products') {
        if (ids?.length) {
          const res = await ProductServices.deleteManyProducts({ ids });
          notifySuccess(res.message);
          setIsCheck([]);
        } else {
          const res = await ProductServices.deleteProduct(String(id));
          notifySuccess(res.message);
        }
        setIsUpdate(true);
      }

      /* -------- Coupons -------- */
      else if (pathname === '/coupons') {
        if (ids?.length) {
          const res = await CouponServices.deleteManyCoupons({ ids });
          notifySuccess(res.message);
          setIsCheck([]);
        } else {
          const res = await CouponServices.deleteCoupon(String(id));
          notifySuccess(res.message);
        }
        setIsUpdate(true);
      }

      /* -------- Categories & Child categories -------- */
      else if (pathname === '/categories' || category) {
        if (ids?.length) {
          const res = await CategoryServices.deleteManyCategory({ ids });
          notifySuccess(res.message);
          setIsCheck([]);
        } else if (id) {
          const res = await CategoryServices.deleteCategory(id,{});
          notifySuccess(res.message);
        } else {
          notifyError('Please select a category first!');
        }
        setIsUpdate(true);
      } else if (pathname === `/categories/${useParamId}` || category) {
        if (!id) {
          notifyError('Please select a category first!');
        } else {
          const res = await CategoryServices.deleteCategory(id, {});
          notifySuccess(res.message);
          setIsUpdate(true);
        }
      }

      /* -------- Customers -------- */
      else if (pathname === '/customers') {
        const res = await CustomerServices.deleteCustomer(String(id));
        notifySuccess(res.message);
        setIsUpdate(true);
      }

      /* -------- Attributes & Child attributes -------- */
      else if (pathname === '/attributes') {
        if (ids?.length) {
          const res = await AttributeServices.deleteManyAttribute({ ids });
          notifySuccess(res.message);
          setIsCheck([]);
        } else {
          const res = await AttributeServices.deleteAttribute(String(id),{});
          notifySuccess(res.message);
        }
        setIsUpdate(true);
      } else if (pathname.startsWith('/attributes/') && pathname.split('/')[2]) {
        const parentId = pathname.split('/')[2];
        if (ids?.length) {
          const res = await AttributeServices.deleteManyChildAttribute({
            id: parentId,
            ids,
          });
          notifySuccess(res.message);
          setIsCheck([]);
        } else {
          const res = await AttributeServices.deleteChildAttribute({
            id: String(id),
            ids: parentId,
          },{});
          notifySuccess(res.message);
        }
        setIsUpdate(true);
      }

      /* -------- Staff -------- */
      else if (pathname === '/our-staff') {
        const res = await AdminServices.deleteStaff(String(id));
        notifySuccess(res.message);
        setIsUpdate(true);
      }

      /* -------- Languages -------- */
      else if (pathname === '/languages') {
        if (ids?.length) {
          const res = await LanguageServices.deleteManyLanguage({ ids });
          notifySuccess(res.message);
          setIsCheck([]);
        } else {
          const res = await LanguageServices.deleteLanguage(String(id),{});
          notifySuccess(res.message);
        }
        setIsUpdate(true);
      }

      /* -------- Currencies -------- */
      else if (pathname === '/currencies') {
        if (ids?.length) {
          const res = await CurrencyServices.deleteManyCurrency({ ids });
          notifySuccess(res.message);
          setIsCheck([]);
        } else {
          const res = await CurrencyServices.deleteCurrency(String(id),{});
          notifySuccess(res.message);
        }
        setIsUpdate(true);
      }

      /* -------- Clean-up -------- */
      setServiceId('');
      closeModal();
    } catch (err: any) {
      notifyError(err?.response?.data?.message ?? err?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /*                               UI                                   */
  /* ------------------------------------------------------------------ */
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalBody className="text-center px-8 pt-6 pb-4">
        <span className="flex justify-center text-3xl mb-6 text-red-500">
          <FiTrash2 />
        </span>
        <h2 className="text-xl font-medium mb-2">
          {t('DeleteModalH2')}{' '}
          <span className="text-red-500">{title}</span>?
        </h2>
        <p>{t('DeleteModalPtag')}</p>
      </ModalBody>

      <ModalFooter className="justify-center">
        <Button
          layout="outline"
          className="w-full sm:w-auto"
          onClick={closeModal}
        >
          {t('modalKeepBtn')}
        </Button>

        {isSubmitting ? (
          <Button disabled className="w-full h-12 sm:w-auto">
            <img
              src={spinnerLoadingImage.src}
              alt="Loading"
              width={20}
              height={10}
            />
            <span className="ml-2 font-light">{t('Processing')}</span>
          </Button>
        ) : (
          <Button onClick={handleDelete} className="w-full h-12 sm:w-auto">
            {t('modalDeletBtn')}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default React.memo(DeleteModal);
