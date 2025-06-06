'use client';

import {
  ChangeEvent,
  FC,
  FocusEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '@windmill/react-ui';
import exportFromJSON from 'export-from-json';
import {
  FiDownload,
  FiPlus,
  FiUpload,
  FiUploadCloud,
  FiXCircle,
} from 'react-icons/fi';
import { BsFileEarmarkCode, BsFileEarmarkMedical } from 'react-icons/bs';

import spinnerLoadingImage from '@/assets/img/spinner.gif';
import { SidebarContext } from '@/context/SidebarContext';
import ProductServices from '@/services/ProductServices';
import { on } from 'events';

interface UploadManyProps {
  title: string;
  totalDoc: number;
  filename: string | null;
  exportData: unknown[];
  isDisabled: boolean;
  handleSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveSelectFile: (file: File) => void;
  handleUploadMultiple: (files: File[]) => void;
}

const UploadMany: FC<UploadManyProps> = ({
  title,
  totalDoc,
  filename,
  exportData,
  isDisabled,
  handleSelectFile,
  handleRemoveSelectFile,
  handleUploadMultiple,
}) => {

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles(files);
    handleSelectFile(e); // if you want to keep this
  };

  const pathname = usePathname();
  const { t } = useTranslation();
  const dRef = useRef<HTMLDivElement>(null);
  const [dropDown, setDropDown] = useState(false);
  const [isImportBoxShown, setIsImportBoxShown] = useState(false);
  const { loading } = useContext(SidebarContext);
  const [loadingExport, setLoadingExport] = useState<{
    name: 'csv' | 'json' | '';
    status: boolean;
  }>({ name: '', status: false });

  /* ------------------------------------------------------------------ */
  /*                     CSV / JSON export helpers                      */
  /* ------------------------------------------------------------------ */
  const exportAs = async (type: 'csv' | 'json') => {
    const exportType =
      type === 'csv'
        ? exportFromJSON.types.csv
        : exportFromJSON.types.json;

    const doExport = (data: unknown[], fileName: string) =>
      exportFromJSON({ data, fileName, exportType });

    if (pathname === '/products') {
      setLoadingExport({ name: type, status: true });
      try {
        const res = await ProductServices.getAllProducts({
          page: 1,
          limit: totalDoc,
          category: null,
          title: null,
          price: 0,
        });
        doExport(res.products, 'products');
      } catch {
        /* silent */
      } finally {
        setLoadingExport({ name: '', status: false });
        setDropDown(false);
      }
      return;
    }

    const mapping: Record<string, string> = {
      '/categories': 'categories',
      '/attributes': 'attributes',
      '/coupons': 'coupons',
      '/customers': 'customers',
    };

    const fileName = mapping[pathname] as string | undefined;
    if (fileName) doExport(exportData, fileName);
    setDropDown(false);
  };

  /* ------------------------------------------------------------------ */
  /*                     Click-outside handler for menu                 */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dRef.current?.contains(e.target as Node)) setDropDown(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ------------------------------------------------------------------ */
  return (
    <div className="lg:flex md:flex flex-grow-0">
      {/* ---------- Export button & dropdown ---------- */}
      <div className="flex">
        <div ref={dRef} className="lg:flex-1 md:flex-1 mr-3 sm:flex-none">
          {['Products', 'Attribute', 'Extra', 'Coupon', 'Customers', 'Categories'].includes(title) && (
            <button
              onClick={() => setDropDown(!dropDown)}
              className="border flex justify-center items-center border-gray-300 hover:border-emerald-400 hover:text-emerald-400 dark:text-gray-300 cursor-pointer h-10 w-20 rounded-md focus:outline-none"
            >
              <FiUpload className="mr-2" />
              <span className="text-xs">{t('Export')}</span>
            </button>
          )}

          {dropDown && (
            <ul className="origin-top-left absolute w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 z-40">
              <li className="font-serif font-medium py-2 pl-4 hover:bg-gray-100 text-gray-500 hover:text-emerald-500 dark:text-gray-400 dark:hover:bg-gray-800">
                <button
                  type="button"
                  onClick={() => exportAs('csv')}
                  className="flex items-center text-sm focus:outline-none"
                >
                  <BsFileEarmarkMedical className="w-4 h-4 mr-3" />
                  Export to CSV
                  {loadingExport.name === 'csv' && loadingExport.status && '…'}
                </button>
              </li>

              <li className="font-serif font-medium py-2 pl-4 hover:bg-gray-100 text-gray-500 hover:text-emerald-500 dark:text-gray-400 dark:hover:bg-gray-800">
                <button
                  type="button"
                  onClick={() => exportAs('json')}
                  className="flex items-center text-sm focus:outline-none"
                >
                  <BsFileEarmarkCode className="w-4 h-4 mr-3" />
                  Export to JSON
                  {loadingExport.name === 'json' && loadingExport.status && '…'}
                </button>
              </li>
            </ul>
          )}
        </div>

        {/* ---------- Import button ---------- */}
        <div className="lg:flex-1 md:flex-1 mr-3 sm:flex-none">
          <button
            onClick={() => setIsImportBoxShown(!isImportBoxShown)}
            className="border flex justify-center items-center h-10 w-20 hover:text-yellow-400 border-gray-300 dark:text-gray-300 cursor-pointer py-2 hover:border-yellow-400 rounded-md focus:outline-none"
          >
            <FiDownload className="mr-2" />
            <span className="text-xs">Import</span>
          </button>
        </div>
      </div>

      {/* ---------- Import input row ---------- */}
      {isImportBoxShown && (
        <div className="w-full my-2 lg:my-0 md:my-0 flex">
          <div className="h-10 border border-dashed border-emerald-500 rounded-md">
            <label className="w-full h-10 flex justify-center items-center text-xs dark:text-gray-400 cursor-pointer">
              <Input
                disabled={isDisabled}
                type="file"
                accept=".csv,.xls,.json"
                onChange={onFileChange}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                css={undefined}
                crossOrigin={undefined}
              />

              {filename ? (
                filename
              ) : (
                <>
                  <FiUploadCloud className="mx-2 text-emerald-500 text-lg" />
                  {t('SelectYourJSON')} {title} {t('File')}
                </>
              )}

              {selectedFiles.length > 0 && (
                <span
                  onClick={() => handleRemoveSelectFile(selectedFiles[0])}
                  className="text-red-500 mx-4 text-lg cursor-pointer"
                >
                  <FiXCircle />
                </span>
              )}

            </label>
          </div>

          {/* Upload button / spinner */}
          <div className="flex">
            {loading ? (
              <Button className="ml-2 h-10">
                <img
                  src={spinnerLoadingImage.src}
                  alt="Loading"
                  width={20}
                  height={10}
                />
                <span className="font-serif ml-2 font-light">Processing</span>
              </Button>
            ) : (
              <Button
                onClick={() =>handleUploadMultiple(selectedFiles)}
                className="h-10 ml-2 px-2"
              >
                <FiPlus />
                <span className="text-xs ml-1">{t('ImportNow')}</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadMany;
