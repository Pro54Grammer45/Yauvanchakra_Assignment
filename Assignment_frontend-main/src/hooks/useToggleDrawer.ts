'use client';

import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/context/SidebarContext";

const useToggleDrawer = (): {
  title: string;
  allId: any[];
  serviceId: string;
  handleUpdate: (id: string) => void;
  setServiceId: React.Dispatch<React.SetStateAction<string>>;
  handleModalOpen: (id: string, title: string) => void;
  handleDeleteMany: (id: any, products: any) => void;
  handleUpdateMany: (id: any) => void;
} => {
  const [serviceId, setServiceId] = useState<string>("");
  const [allId, setAllId] = useState<any[]>([]);
  const [title, setTitle] = useState<string>("");
  const { toggleDrawer, isDrawerOpen, toggleModal, toggleBulkDrawer } =
    useContext(SidebarContext);

  const handleUpdate = (id) => {
    setServiceId(id);
    toggleDrawer();
  };

  const handleUpdateMany = (id) => {
    setAllId(id);
    toggleBulkDrawer();
  };

  const handleModalOpen = (id, title) => {
    setServiceId(id);
    toggleModal();
    setTitle(title);
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setServiceId("");
    }
  }, [isDrawerOpen]);

  const handleDeleteMany = async (id) => {
    setAllId(id);
    toggleModal();
    setTitle("Selected Products");
  };

  return {
    title,
    allId,
    serviceId,
    handleUpdate,
    setServiceId,
    handleModalOpen,
    handleDeleteMany,
    handleUpdateMany,
  };
};

export default useToggleDrawer;
