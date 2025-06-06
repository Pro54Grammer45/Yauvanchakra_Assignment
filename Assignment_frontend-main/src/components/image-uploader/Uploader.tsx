'use client';

import { useEffect, useState } from "react";
import { t } from "i18next";
import axios from "axios";
import { useDropzone, FileRejection } from "react-dropzone";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";
import Pica from "pica";

// Internal imports
import useUtilsFunction from "@/hooks/useUtilsFunction";
import { notifyError, notifySuccess } from "@/utils/toast";
import Container from "@/components/image-uploader/Container"; 

export interface CardItem {
  id: string;
  fileName: string; 
  url: string;
}

// Custom File type to include the 'preview' property
interface FileWithPreview extends File {
  preview: string;
}

interface TemporaryFileForUpload extends FileWithPreview {
  id: string; 
  fileName: string; 
  url: string;  
}

type UploaderProps = {
  setImageUrl: React.Dispatch<React.SetStateAction<string | CardItem[]>>;
  imageUrl: string | CardItem[];
  product?: boolean;
  folder: string;
  targetWidth?: number;
  targetHeight?: number;
};

const Uploader = ({
  setImageUrl,
  imageUrl,
  product,
  folder,
  targetWidth = 800,
  targetHeight = 800,
}: UploaderProps) => {
  const [files, setFiles] = useState<TemporaryFileForUpload[]>([]); 
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setError] = useState<string>("");
  const pica = Pica();
  const { globalSetting } = useUtilsFunction();

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: product ? true : false,
    maxSize: 5242880, // 5MB
    maxFiles: globalSetting?.number_of_image_per_product || 2, 
    onDrop: async (acceptedFiles: File[]) => {
      const resizedFiles = await Promise.all(
        acceptedFiles.map((file) =>
          resizeImageToFixedDimensions(file, targetWidth, targetHeight)
        )
      );
      setFiles(
        resizedFiles.map((file) => {
          const previewUrl = URL.createObjectURL(file);
          return {
            ...file, // Spread properties of the original File object
            preview: previewUrl,
            // Assign temporary CardItem properties
            id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(7)}`, // More unique ID
            fileName: file.name, // Use file.name for display - Renamed from 'text'
            url: previewUrl, // Temporary URL for local display
          } as TemporaryFileForUpload; // Assert the combined type
        })
      );
    },
  });

  const resizeImageToFixedDimensions = async (
    file: File,
    width: number,
    height: number
  ): Promise<File> => {
    const img = new window.Image();
    img.src = URL.createObjectURL(file);

    await img.decode(); // Ensure image is loaded

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    return new Promise((resolve, reject) => {
      pica
        .resize(img, canvas, {
          unsharpAmount: 80,
          unsharpRadius: 0.6,
          unsharpThreshold: 2,
        })
        .then((result: HTMLCanvasElement) => pica.toBlob(result, file.type, 0.9))
        .then((blob: Blob | null) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, { type: file.type });
            resolve(resizedFile);
          } else {
            reject(new Error("Failed to create blob from resized image."));
          }
        })
        .catch((error: any) => {
          console.error("Image resize error:", error);
          reject(error);
        });
    });
  };

  // Effect for handling file rejections (errors from dropzone)
  useEffect(() => {
    if (fileRejections && fileRejections.length > 0) {
      fileRejections.forEach(({ file, errors }: FileRejection) => {
        errors.forEach((e) => {
          if (e.code === "too-many-files") {
            notifyError(
              `Maximum ${globalSetting?.number_of_image_per_product || 2} Image Can be Upload!`
            );
          } else {
            notifyError(e.message);
          }
        });
      });
    }
  }, [fileRejections, globalSetting?.number_of_image_per_product]);

  // Effect for handling file uploads
  useEffect(() => {
    if (files.length > 0) {
      files.forEach((file) => {
        // Check image count limit for product uploads
        if (
          product &&
          (Array.isArray(imageUrl) ? imageUrl.length : 0) + 1 > // +1 for the current file being uploaded
          (globalSetting?.number_of_image_per_product || 2)
        ) {
          notifyError(
            `Maximum ${globalSetting?.number_of_image_per_product || 2} Image Can be Upload!`
          );
          setFiles([]); // Clear files that exceed the limit
          return; // Stop processing this file
        }

        setLoading(true);
        setError("Uploading....");

        const name = file.name.replaceAll(/\s/g, "");
        const public_id = name?.substring(0, name.lastIndexOf("."));

        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
        );
        formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME || "");
        formData.append("folder", folder);
        formData.append("public_id", public_id);

        axios({
          url: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: formData,
        })
          .then((res) => {
            notifySuccess("Image Uploaded successfully!");
            setLoading(false);
            if (product) {
              // Create a CardItem object for the uploaded image
              const newCardItem: CardItem = {
                id: res.data.public_id || res.data.asset_id || res.data.url, // Use Cloudinary ID or asset_id or URL as ID
                fileName: res.data.original_filename || file.name, // Use original filename or local name - Renamed from 'text'
                url: res.data.secure_url,
              };
              setImageUrl((prev) =>
                Array.isArray(prev) // If previous is an array (product mode)
                  ? [...prev, newCardItem] // Add new CardItem
                  : [newCardItem] // If prev was a string (single image before product mode), make it an array
              );
            } else {
              // For single image, set as string
              setImageUrl(res.data.secure_url);
            }
          })
          .catch((err) => {
            console.error("Upload error:", err);
            notifyError(err.message || "Image upload failed!");
            setLoading(false);
          })
          .finally(() => {
            setFiles([]); // Clear the temporary files after upload attempt
          });
      });
    }
    // Add all dependencies for the useEffect hook
  }, [
    files,
    imageUrl,
    product,
    globalSetting?.number_of_image_per_product,
    setImageUrl,
    folder,
    notifySuccess,
    notifyError,
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    process.env.NEXT_PUBLIC_CLOUD_NAME,
    process.env.NEXT_PUBLIC_CLOUDINARY_URL,
  ]);

  // Thumbnails for currently selected files (before upload)
  const thumbs = files.map((file: TemporaryFileForUpload) => ( // Use the corrected type
    <div key={file.id}>
      <div>
        <img
          className="inline-flex border-2 border-gray-100 w-24 max-h-24"
          src={file.preview}
          alt={file.name}
        />
      </div>
    </div>
  ));

  // Clean up object URLs when component unmounts or files change
  useEffect(
    () => () => {
      files.forEach((file: FileWithPreview) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  // handleRemoveImage function, now accepting CardItem
  const handleRemoveImage = async (imgToRemove: CardItem) => {
    try {
      setLoading(true); 
      notifySuccess("Image deleted successfully!");
      if (product) {
        // Filter by id to remove the correct CardItem
        const result = (imageUrl as CardItem[])?.filter((i) => i.id !== imgToRemove.id);
        setImageUrl(result);
      } else {
        setImageUrl("");
      }
    } catch (err: any) {
      console.error("Deletion error:", err);
      notifyError(err.message || "Failed to delete image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-center">
      <div
        className="border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex justify-center">
          <FiUploadCloud className="text-3xl text-emerald-500" />
        </span>
        <p className="text-sm mt-2">{t("DragYourImage")}</p>
        <em className="text-xs text-gray-400">{t("imageFormat")}</em>
      </div>

      <div className="text-emerald-500">{loading && err}</div>
      <aside className="flex flex-row flex-wrap mt-4">
        {product ? (
          <DndProvider backend={HTML5Backend}>
            <Container
             
              setImageUrl={setImageUrl as React.Dispatch<React.SetStateAction<CardItem[]>>}
              imageUrl={imageUrl as CardItem[]}
              handleRemoveImage={handleRemoveImage}
            />
          </DndProvider>
        ) : !product && typeof imageUrl === 'string' && imageUrl ? ( // Check if it's a single string URL
          <div className="relative">
            <img
              className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2"
              src={imageUrl} // imageUrl is a string here
              alt="product"
            />
            <button
              type="button"
              className="absolute top-0 right-0 text-red-500 focus:outline-none"
              onClick={() => handleRemoveImage({ id: imageUrl, fileName: "Current Image", url: imageUrl })} // Create a dummy CardItem for removal - Renamed 'text' to 'fileName'
            >
              <FiXCircle />
            </button>
          </div>
        ) : (
          // Render temporary local files (thumbs) only if not in product mode AND no imageUrl yet
          !product && (!imageUrl || (Array.isArray(imageUrl) && imageUrl.length === 0)) && thumbs
        )}
      </aside>
    </div>
  );
};

export default Uploader;