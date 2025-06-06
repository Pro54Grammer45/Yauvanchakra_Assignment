'use client';
import { useContext } from "react";
import { Select } from "@windmill/react-ui";
//internal import
import OrderServices from "@/services/OrderServices";
import { notifySuccess, notifyError } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";

import { Order } from "@/types/order";
// Type definitions
// interface Order {
//   status?: 'Delivered' | 'Pending' | 'Processing' | 'Cancel';
//   // Add other order properties as needed
//   [key: string]: any;
// }

interface SelectStatusProps {
  id: string | number;
  order: Order;
}

interface SidebarContextType {
  setIsUpdate: (value: boolean) => void;
  // Add other context properties as needed
}

const SelectStatus: React.FC<SelectStatusProps> = ({ id, order }) => {
  // console.log('id',id ,'order',order)
  const currentStatus = order.status || 'status';
  const { setIsUpdate } = useContext(SidebarContext) as SidebarContextType;

  const handleChangeStatus = (id: string | number, status: string): void => {
    // return notifyError("This option disabled for this option!");
    OrderServices.updateOrder(id, { status: status },{})
      .then((res: any) => {
        notifySuccess(res.message);
        setIsUpdate(true);
      })
      .catch((err: any) => notifyError(err.message));
  };

  return (
    <>
      <Select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
          handleChangeStatus(id, e.target.value)
        }
        className="h-8"
        placeholder="Select status"
        onPointerEnterCapture={undefined}  
        onPointerLeaveCapture={undefined}
        css={undefined}
        defaultValue={currentStatus}
      >
        <option value="status" hidden>
          {currentStatus}
        </option>
        <option value="Delivered">
          Delivered
        </option>
        <option value="Pending">
          Pending
        </option>
        <option
          value="Processing"
        >
          Processing
        </option>
        <option value="Cancel">
          Cancel
        </option>
      </Select>
    </>
  );
};

export default SelectStatus;