'use client';

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import AttributeServices from "@/services/AttributeServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useTranslationValue from "./useTranslationValue";

const useAttributeSubmit = (id: string | undefined) => {
  const pathname = usePathname();
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [variants, setVariants] = useState<string[]>([]);
  const [language, setLanguage] = useState<string>("en");
  const [resData, setResData] = useState<any>({});
  const [published, setPublished] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { setServiceId } = useToggleDrawer();
  const { handlerTextTranslateHandler } = useTranslationValue();

  let variantArrayOfObject: any[] = [];

  (async () => {
    for (let i = 0; i < variants.length; i++) {
      const variantsTranslates = await handlerTextTranslateHandler(
        variants[i],
        language
      );

      variantArrayOfObject = [
        ...variantArrayOfObject,
        {
          name: {
            [language]: variants[i],
            ...variantsTranslates,
          },
        },
      ];
    }
  })();

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = async ({ title, name, option }: any) => {
    try {
      setIsSubmitting(true);
      if (!id) {
        if (variants.length === 0) {
          notifyError("Minimum one value is required for add attribute!");
          return;
        }
      }

      const titleTranslates = await handlerTextTranslateHandler(
        title,
        language,
        resData?.title
      );
      const nameTranslates = await handlerTextTranslateHandler(
        name,
        language,
        resData?.name
      );

      const attributeData = {
        title: {
          ...titleTranslates,
          [language]: title,
        },
        name: {
          ...nameTranslates,
          [language]: name,
        },
        variants: variantArrayOfObject,
        option: option,
        type: "attribute",
        lang: language,
      };

      if (id) {
        const res = await AttributeServices.updateAttributes(id, attributeData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        setServiceId(res._id);
      } else {
        const res = await AttributeServices.addAttribute(attributeData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        setServiceId(res._id);
      }
    } catch (err) {
      notifyError(err ? err.response.data.message : err.message);
      closeDrawer();
      setIsSubmitting(false);
      setServiceId('');
    }
  };

  // child attribute
  const onSubmits = async ({ name }: any) => {
    try {
      setIsSubmitting(true);
      if (id) {
        const res = await AttributeServices.updateChildAttributes(
          { ids: pathname.split("/")[2], id },
          {
            name: {
              [language]: name,
            },
            status: published ? "show" : "hide",
          }
        );
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      } else {
        const res = await AttributeServices.addChildAttribute(
          pathname.split("/")[2],
          {
            name: {
              [language]: name,
            },
            status: published ? "show" : "hide",
          }
        );
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      notifyError(err ? err.response.data.message : err.message);
      closeDrawer();
      setIsSubmitting(false);
      setServiceId('');
    }
  };

  const handleSelectLanguage = (lang: string) => {
    setLanguage(lang);
    if (Object.keys(resData).length > 0) {
      setValue("title", resData.title[lang ? lang : "en"] || "");
      setValue("name", resData.name[lang ? lang : "en"] || "");
    }
  };

  const removeVariant = (indexToRemove: number) => {
    setVariants([...variants.filter((_, index) => index !== indexToRemove)]);
  };

  const addVariant = (e: any) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setVariants([...variants, e.target.value]);
      e.target.value = "";
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue("title", "");
      setValue("name", "");
      setValue("option", "");
      clearErrors("title");
      clearErrors("name");
      clearErrors("option");
      setVariants([]);
      setLanguage(lang);
      setValue("language", language || "");
      return;
    }

    if (pathname === "/attributes" && id) {
      (async () => {
        try {
          const res = await AttributeServices.getAttributeById(id);
          if (res) {
            setResData(res);
            setValue("title", res.title[language ? language : "en"] || "");
            setValue("name", res.name[language ? language : "en"] || "");
            setValue("option", res.option || "");
          }
        } catch (err) {
          notifyError(err?.response?.data?.message || err?.message);
        }
      })();
    } else if (
      pathname === `/attributes/${pathname.split("/")[2]}`
    ) {
      (async () => {
        try {
          const res = await AttributeServices.getChildAttributeById({
            id: pathname.split("/")[2],
            ids: id,
          });
          if (res) {
            setValue("name", res.name[language ? language : "en"] || "");
            setPublished(res.status === "show" ? true : false);
          }
        } catch (err) {
          notifyError(err?.response?.data?.message || err?.message);
        }
      })();
    }
  }, [clearErrors, id, isDrawerOpen, setValue, pathname, language, lang]);

  return {
    handleSubmit,
    onSubmits,
    onSubmit,
    register,
    errors,
    variants,
    setVariants,
    addVariant,
    removeVariant,
    published,
    setPublished,
    isSubmitting,
    handleSelectLanguage,
  };
};

export default useAttributeSubmit;
