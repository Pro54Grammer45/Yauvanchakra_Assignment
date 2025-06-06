'use client';

import { FC, useState } from 'react';
import { FiX, FiZoomIn } from 'react-icons/fi';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Link from 'next/link';

import Tooltip from '@/components/tooltip/Tooltip';

interface AttributeVariant {
  _id: string;
  name: string;
}

interface Attribute {
  _id: string;
  variants: AttributeVariant[];
}

interface ViewAttributeProps {
  attribute: Attribute;
}

const ViewAttribute: FC<ViewAttributeProps> = ({ attribute }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* -------- modal -------- */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        center
        closeIcon={
          <div className="absolute top-0 right-0 text-red-500 text-xl">
            <FiX className="text-3xl" />
          </div>
        }
      >
        <div className="px-8 py-4">
          {attribute.variants.map((att, i) => (
            <ul key={att._id}>
              <li className="text-sm">
                {i + 1}) <span className="ml-2 hover:text-emerald-500">{att.name}</span>
              </li>
            </ul>
          ))}
        </div>

        <div className="flex justify-end">
          <Link
            href={`/attributes/${attribute._id}`}
            className="absolute bottom-0 right-0 text-sm py-1 px-2 rounded-sm bg-emerald-500 text-gray-100 hover:bg-emerald-600"
          >
            View
          </Link>
        </div>
      </Modal>

      {/* -------- trigger -------- */}
      <div
        onClick={() => setOpenModal(true)}
        className="flex justify-center cursor-pointer text-gray-400 hover:text-emerald-600"
      >
        <Tooltip id="view" Icon={FiZoomIn} title="View Attribute" bgColor="#34D399" />
      </div>
    </>
  );
};

export default ViewAttribute;
