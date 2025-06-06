'use client';
import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

//internal import
import AttributeTable from "@/components/attribute/AttributeTable";
import UploadMany from "@/components/common/UploadMany";
import AttributeDrawer from "@/components/drawer/AttributeDrawer";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import MainDrawer from "@/components/drawer/MainDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import AttributeServices from "@/services/AttributeServices";
import AnimatedContent from "@/components/common/AnimatedContent";

// Type definitions (adjust as needed for your codebase)
type Attribute = {
  _id: string;
  [key: string]: any;
  title: string;
  name: string;
  option: string;
  status: string;
};

type DataTableType = Attribute[];

type AttributeRefType = React.RefObject<HTMLInputElement>;

const Attributes: React.FC = () => {
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const { data = [], loading, error } = useAsync<Attribute[]>(() =>
    AttributeServices.getAllAttributes({
      type: "attribute",
      option: "Dropdown",
      option1: "Radio",
    })
  );

  const { handleDeleteMany, allId, handleUpdateMany } = useToggleDrawer();

  const { t } = useTranslation();

  const {
    filename,
    isDisabled,
    dataTable,
    serviceData,
    totalResults,
    attributeRef,
    resultsPerPage,
    handleSelectFile,
    handleChangePage,
    setAttributeTitle,
    handleSubmitAttribute,
    handleUploadMultiple,
    handleRemoveSelectFile,
  }: {
    filename: string;
    isDisabled: boolean;
    dataTable: DataTableType;
    serviceData: DataTableType;
    totalResults: number;
    attributeRef: AttributeRefType;
    resultsPerPage: number;
    handleSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleChangePage: (page: number) => void;
    setAttributeTitle: (title: string) => void;
    handleSubmitAttribute: (e: React.FormEvent<HTMLFormElement>) => void;
    handleUploadMultiple: (files: File[]) => void;
    handleRemoveSelectFile: (file: File) => void;
  } = useFilter(data);

  // react hooks
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data.map((value) => value._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };
  // handle reset field function
  const handleResetField = () => {
    setAttributeTitle("");
    if (attributeRef.current) attributeRef.current.value = "";
  };

  return (
    <>
      <PageTitle>{t("AttributeTitle")}</PageTitle>
      <DeleteModal
        ids={allId}
        setIsCheck={setIsCheck}
        title="Selected Attributes"
      />
      <BulkActionDrawer ids={allId} title="Attributes" lang={lang} data={serviceData} />
      <MainDrawer>
        <AttributeDrawer />
      </MainDrawer>

      <AnimatedContent>
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <form
              onSubmit={handleSubmitAttribute}
              className="py-3  grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
            >
              <div className="flex justify-start xl:w-1/2  md:w-full">
                <UploadMany
                  title="Attribute"
                  exportData={data}
                  filename={filename}
                  isDisabled={isDisabled}
                  handleSelectFile={handleSelectFile}
                  handleUploadMultiple={handleUploadMultiple}
                  handleRemoveSelectFile={handleRemoveSelectFile}
                  totalDoc={serviceData?.length || 0}
                />
              </div>

              <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
                <div className="w-full md:w-40 lg:w-40 xl:w-40 mr-3 mb-3 lg:mb-0">
                  <Button
                    disabled={isCheck.length < 1}
                    onClick={() => handleUpdateMany(isCheck)}
                    className="w-full rounded-md h-12 btn-gray text-gray-600"
                  >
                    <span className="mr-2">
                      <FiEdit />
                    </span>

                    {t("BulkAction")}
                  </Button>
                </div>
                <div className="w-full md:w-32 lg:w-32 xl:w-32 mr-3 mb-3 lg:mb-0">
                  <Button
                    disabled={isCheck.length < 1}
                    onClick={() => handleDeleteMany(isCheck,allId)}
                    className="w-full rounded-md h-12 bg-red-500 btn-red"
                  >
                    <span className="mr-2">
                      <FiTrash2 />
                    </span>
                    {t("Delete")}
                  </Button>
                </div>
                <div className="w-full md:w-48 lg:w-48 xl:w-48">
                  <Button
                    onClick={toggleDrawer}
                    className="w-full rounded-md h-12 "
                  >
                    <span className="mr-2">
                      <FiPlus />
                    </span>
                    {t("CouponsAddAttributeBtn")}
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <form
              onSubmit={handleSubmitAttribute}
              className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
            >
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input
                  ref={attributeRef}
                  valid={undefined}
                  type="search"
                  placeholder={t("SearchAttributePlaceholder")}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  css={undefined}
                  crossOrigin={undefined}
                />
              </div>
              <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <div className="w-full mx-1">
                  <Button type="submit" className="h-12 w-full bg-emerald-700">
                    Filter
                  </Button>
                </div>

                <div className="w-full mx-1">
                  <Button
                    layout="outline"
                    onClick={handleResetField}
                    type="reset"
                    className="px-4 md:py-1 py-2 h-12 text-sm dark:bg-gray-700"
                  >
                    <span className="text-black dark:text-gray-200">Reset</span>
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </AnimatedContent>

      {loading ? (
        <TableLoading row={12} col={6} width={180} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    handleClick={handleSelectAll}
                    isChecked={isCheckAll}
                  />
                </TableCell>
                <TableCell> {t("Id")} </TableCell>
                <TableCell> {t("AName")}</TableCell>
                <TableCell> {t("ADisplayName")}</TableCell>
                <TableCell>{t("AOption")}</TableCell>

                <TableCell className="text-center">
                  {t("catPublishedTbl")}
                </TableCell>

                <TableCell className="text-center">{t("Avalues")}</TableCell>

                <TableCell className="text-right">{t("AAction")}</TableCell>
              </tr>
            </TableHeader>

            <AttributeTable
              lang={lang}
              isCheck={isCheck}
              setIsCheck={setIsCheck}
              attributes={dataTable}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no attributes right now." />
      )}
    </>
  );
};

export default Attributes;
