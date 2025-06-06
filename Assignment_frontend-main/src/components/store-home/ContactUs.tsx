'use client';

import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiSettings } from "react-icons/fi";
import { UseFormRegister, FieldErrors } from "react-hook-form";

//internal import

import Error from "@/components/form/others/Error";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import InputAreaTwo from "@/components/form/input/InputAreaTwo";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import TextAreaCom from "@/components/form/others/TextAreaCom";
import Uploader from "@/components/image-uploader/Uploader";

interface ContactUsProps {
  isSave: boolean;
  errors: FieldErrors<any>;
  register: UseFormRegister<any>;
  setContactPageHeader: (checked: boolean) => void;
  contactPageHeader: boolean;
  setContactHeaderBg: (url: string) => void;
  contactHeaderBg: string;
  setEmailUsBox: (checked: boolean) => void;
  emailUsBox: boolean;
  setCallUsBox: (checked: boolean) => void;
  callUsBox: boolean;
  setAddressBox: (checked: boolean) => void;
  addressBox: boolean;
  setContactMidLeftColStatus: (checked: boolean) => void;
  contactMidLeftColStatus: boolean;
  setContactMidLeftColImage: (url: string) => void;
  contactMidLeftColImage: string;
  setContactFormStatus: (checked: boolean) => void;
  contactFormStatus: boolean;
  isSubmitting: boolean;
}

const ContactUs: React.FC<ContactUsProps> = ({
  isSave,
  errors,
  register,
  setContactPageHeader,
  contactPageHeader,
  setContactHeaderBg,
  contactHeaderBg,
  setEmailUsBox,
  emailUsBox,
  setCallUsBox,
  callUsBox,
  setAddressBox,
  addressBox,
  setContactMidLeftColStatus,
  contactMidLeftColStatus,
  setContactMidLeftColImage,
  contactMidLeftColImage,
  setContactFormStatus,
  contactFormStatus,
  isSubmitting,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="col-span-12 md:col-span-12 lg:col-span-12 pr-3">
        <div className="sticky top-0 z-20 flex justify-end">
          {isSubmitting ? (
            <Button disabled={true} type="button" className="h-10 px-6">
              <img
                src={typeof spinnerLoadingImage === 'string' ? spinnerLoadingImage : (spinnerLoadingImage as any).src}
                alt="Loading"
                width={20}
                height={10}
              />{" "}
              <span className="font-serif ml-2 font-light">
                {" "}
                {t("Processing")}
              </span>
            </Button>
          ) : (
            <Button type="submit" className="h-10 px-6 ">
              {" "}
              {isSave ? t("SaveBtn") : t("UpdateBtn")}
            </Button>
          )}
        </div>

        <div className="inline-flex md:text-lg text-md text-gray-800 font-semibold dark:text-gray-400 md:mb-3 mb-1">
          <FiSettings className="mt-1 mr-2" />
          {t("ContactUs")}
        </div>
        <hr className="md:mb-12 mb-3" />

        <div className="xl:px-10 flex-grow scrollbar-hide w-full max-h-full">
          <div className="inline-flex md:text-md text-sm mb-3 text-gray-500 dark:text-gray-400">
            <strong>{t("PageHeader")}</strong>
          </div>
          <hr className="md:mb-12 mb-3" />

          <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t("EnableThisBlock")}
            </label>
            <div className=" sm:col-span-4">
              <SwitchToggle
                title=""
                handleProcess={setContactPageHeader}
                processOption={contactPageHeader}
              />
            </div>
          </div>

          <div
            className="mb-height-0"
            style={{
              height: contactPageHeader ? "auto" : 0,
              transition: "all 0.5s",
              visibility: !contactPageHeader ? "hidden" : "visible",
              opacity: !contactPageHeader ? "0" : "1",
            }}
          >
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("PageHeaderBg")}
              </label>
              <div className=" sm:col-span-4">
                <Uploader
                  imageUrl={contactHeaderBg}
                  setImageUrl={setContactHeaderBg}
                  folder="contact"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("PageTitle")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="Page Title"
                  name="contact_page_title"
                  type="text"
                  placeholder={t("PageTitle")}
                />
                <Error errorName={typeof errors.contact_page_title?.message === 'string' ? { message: errors.contact_page_title.message } : undefined} />
              </div>
            </div>
          </div>

          <div className="inline-flex md:text-md text-sm mb-3 text-gray-500 dark:text-gray-400 relative">
            <strong>{t("EmailUs")}</strong>
          </div>
          <hr className="md:mb-12 mb-3" />
          <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t("EnableThisBlock")}
            </label>
            <div className=" sm:col-span-4">
              <SwitchToggle
                title=""
                handleProcess={setEmailUsBox}
                processOption={emailUsBox}
              />
            </div>
          </div>

          <div
            className="mb-height-0"
            style={{
              height: emailUsBox ? "auto" : 0,
              transition: "all 0.5s",
              visibility: !emailUsBox ? "hidden" : "visible",
              opacity: !emailUsBox ? "0" : "1",
            }}
          >
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("EboxTitle")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="Title"
                  name="email_box_title"
                  type="text"
                  placeholder={t("EboxTitle")}
                />
                <Error errorName={typeof errors.email_box_title?.message === 'string' ? { message: errors.email_box_title.message } : undefined} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("EboxEmail")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="Title"
                  name="email_box_email"
                  type="text"
                  placeholder={t("EboxEmail")}
                />
                <Error errorName={typeof errors.email_box_email?.message === 'string' ? { message: errors.email_box_email.message } : undefined} />
              </div>
            </div>
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("Eboxtext")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="Title"
                  name="email_box_text"
                  type="text"
                  placeholder={t("Eboxtext")}
                />
                <Error errorName={typeof errors.email_box_text?.message === 'string' ? { message: errors.email_box_text.message } : undefined} />
              </div>
            </div>
          </div>

          <div className="inline-flex md:text-md text-sm mb-3 text-gray-500 dark:text-gray-400 relative">
            <strong>{t("CallUs")}</strong>
          </div>
          <hr className="md:mb-12 mb-3" />

          <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t("EnableThisBlock")}
            </label>
            <div className=" sm:col-span-4">
              <SwitchToggle
                title=""
                handleProcess={setCallUsBox}
                processOption={callUsBox}
              />
            </div>
          </div>

          <div
            className="mb-height-0"
            style={{
              height: callUsBox ? "auto" : 0,
              transition: "all 0.5s",
              visibility: !callUsBox ? "hidden" : "visible",
              opacity: !callUsBox ? "0" : "1",
            }}
          >
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("CallusboxTitle")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="Title"
                  name="callUs_box_title"
                  type="text"
                  placeholder={t("CallusboxTitle")}
                />
                <Error errorName={typeof errors.callUs_box_title?.message === 'string' ? { message: errors.callUs_box_title.message } : undefined} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("CallUsboxPhone")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="Phone"
                  name="callUs_box_phone"
                  type="text"
                  placeholder={t("CallUsboxPhone")}
                />
                <Error errorName={typeof errors.callUs_box_phone?.message === 'string' ? { message: errors.callUs_box_phone.message } : undefined} />
              </div>
            </div>
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("CallUsboxText")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="Title"
                  name="callUs_box_text"
                  type="text"
                  placeholder={t("CallUsboxText")}
                />
                <Error errorName={typeof errors.callUs_box_text?.message === 'string' ? { message: errors.callUs_box_text.message } : undefined} />
              </div>
            </div>
          </div>

          <div className="inline-flex md:text-md text-sm mb-3 text-gray-500 dark:text-gray-400 relative">
            <strong>{t("Address")}</strong>
          </div>
          <hr className="md:mb-12 mb-3" />

          <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t("EnableThisBlock")}
            </label>
            <div className=" sm:col-span-4">
              <SwitchToggle
                title=""
                handleProcess={setAddressBox}
                processOption={addressBox}
              />
            </div>
          </div>

          <div
            className="mb-height-0"
            style={{
              height: addressBox ? "auto" : 0,
              transition: "all 0.5s",
              visibility: !addressBox ? "hidden" : "visible",
              opacity: !addressBox ? "0" : "1",
            }}
          >
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("AddressboxTitle")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="Title"
                  name="address_box_title"
                  type="text"
                  placeholder={t("AddressboxTitle")}
                />
                <Error errorName={typeof errors.address_box_title?.message === 'string' ? { message: errors.address_box_title.message } : undefined} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("AddressboxAddressOne")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="Title"
                  name="address_box_address_one"
                  type="text"
                  placeholder={t("AddressboxAddressOne")}
                />
                <Error errorName={typeof errors.address_box_address_one?.message === 'string' ? { message: errors.address_box_address_one.message } : undefined} />
              </div>
            </div>
          </div>

          <div className="inline-flex md:text-md text-sm mb-3 text-gray-500 dark:text-gray-400">
            <strong>{t("MidLeftCol")}</strong>
          </div>
          <hr className="md:mb-12 mb-3" />

          <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t("EnableThisBlock")}
            </label>
            <div className=" sm:col-span-4">
              <SwitchToggle
                title=""
                handleProcess={setContactMidLeftColStatus}
                processOption={contactMidLeftColStatus}
              />
            </div>
          </div>

          <div
            className="mb-height-0"
            style={{
              height: contactMidLeftColStatus ? "auto" : 0,
              transition: "all 0.5s",
              visibility: !contactMidLeftColStatus ? "hidden" : "visible",
              opacity: !contactMidLeftColStatus ? "0" : "1",
            }}
          >
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3 relative">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("MidLeftImage")}
              </label>
              <div className=" sm:col-span-4">
                <Uploader
                  imageUrl={contactMidLeftColImage}
                  setImageUrl={setContactMidLeftColImage}
                  folder="contact"
                  targetWidth={874}
                  targetHeight={877}
                />
              </div>
            </div>
          </div>

          <div className="inline-flex md:text-md text-sm mb-3 text-gray-500 dark:text-gray-400 relative">
            <strong>{t("ContactForm")}</strong>
          </div>
          <hr className="md:mb-12 mb-3" />

          <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
              {t("EnableThisBlock")}
            </label>
            <div className=" sm:col-span-4">
              <SwitchToggle
                title=""
                handleProcess={setContactFormStatus}
                processOption={contactFormStatus}
              />
            </div>
          </div>

          <div
            className="mb-height-0"
            style={{
              height: contactFormStatus ? "auto" : 0,
              transition: "all 0.5s",
              visibility: !contactFormStatus ? "hidden" : "visible",
              opacity: !contactFormStatus ? "0" : "1",
            }}
          >
            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("ContactFormTitle")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  register={register}
                  label="Title"
                  name="contact_form_title"
                  type="text"
                  placeholder={t("ContactFormTitle")}
                />
                <Error errorName={typeof errors.contact_form_title?.message === 'string' ? { message: errors.contact_form_title.message } : undefined} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 sm:grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 md:mb-1">
                {t("ContactFormDescription")}
              </label>
              <div className="sm:col-span-4">
                <TextAreaCom
                  register={register}
                  label="Description"
                  name="contact_form_description"
                  type="text"
                  placeholder={t("ContactFormDescription")}
                />
                <Error errorName={typeof errors.contact_form_description?.message === 'string' ? { message: errors.contact_form_description.message } : undefined} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
