'use client';

import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiSettings } from "react-icons/fi";
import { UseFormRegister, FieldErrors } from "react-hook-form";

//internal import

import Error from "@/components/form/others/Error";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import InputAreaTwo from "@/components/form/input/InputAreaTwo";

interface DashboardSettingProps {
  isSave: boolean;
  errors: FieldErrors<any>;
  register: UseFormRegister<any>;
  isSubmitting: boolean;
}

const DashboardSetting: React.FC<DashboardSettingProps> = ({ isSave, errors, register, isSubmitting }) => {
  const { t } = useTranslation();

  return (
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
        {t("DashboardSetting")}
      </div>
      <hr className="md:mb-12 mb-3" />

      <div className="flex justify-between md:text-base text-sm mb-3  dark:text-gray-400 relative">
        <div className="w-full text-gray-500">
          <strong>{t("Dashboard")}</strong>
        </div>
      </div>

      <hr className="md:mb-8 mb-3" />
      <div className="grid grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("InvoiceMessage1st")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("InvoiceMessage1st")}
            name="invoice_message_first"
            type="text"
            placeholder={t("InvoiceMessage1st")}
          />
          <Error errorName={typeof errors.invoice_message_first?.message === 'string' ? { message: errors.invoice_message_first.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("InvoiceMessage2nd")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("InvoiceMessage2nd")}
            name="invoice_message_last"
            type="text"
            placeholder={t("InvoiceMessage2nd")}
          />
          <Error errorName={typeof errors.invoice_message_last?.message === 'string' ? { message: errors.invoice_message_last.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("PrintButton")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("PrintButton")}
            name="print_button"
            type="text"
            placeholder={t("PrintButton")}
          />
          <Error errorName={typeof errors.print_button?.message === 'string' ? { message: errors.print_button.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("DownloadButton")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("DownloadButton")}
            name="download_button"
            type="text"
            placeholder={t("DownloadButton")}
          />
          <Error errorName={typeof errors.download_button?.message === 'string' ? { message: errors.download_button.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("Dashboard")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("Dashboard")}
            name="dashboard_title"
            type="text"
            placeholder={t("Dashboard")}
          />
          <Error errorName={typeof errors.dashboard_title?.message === 'string' ? { message: errors.dashboard_title.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("TotalOrder")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("TotalOrder")}
            name="total_order"
            type="text"
            placeholder={t("TotalOrder")}
          />
          <Error errorName={typeof errors.total_order?.message === 'string' ? { message: errors.total_order.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("PendingOrder")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("PendingOrder")}
            name="pending_order"
            type="text"
            placeholder={t("PendingOrder")}
          />
          <Error errorName={typeof errors.pending_order?.message === 'string' ? { message: errors.pending_order.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("ProcessingOrder")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("ProcessingOrder")}
            name="processing_order"
            type="text"
            placeholder={t("ProcessingOrder")}
          />
          <Error errorName={typeof errors.processing_order?.message === 'string' ? { message: errors.processing_order.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("CompleteOrder")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("CompleteOrder")}
            name="complete_order"
            type="text"
            placeholder={t("CompleteOrder")}
          />
          <Error errorName={typeof errors.complete_order?.message === 'string' ? { message: errors.complete_order.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("RecentOrder")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("RecentOrder")}
            name="recent_order"
            type="text"
            placeholder={t("RecentOrder")}
          />
          <Error errorName={typeof errors.recent_order?.message === 'string' ? { message: errors.recent_order.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("MyOrder")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("MyOrder")}
            name="my_order"
            type="text"
            placeholder={t("MyOrder")}
          />
          <Error errorName={typeof errors.my_order?.message === 'string' ? { message: errors.my_order.message } : undefined} />
        </div>
      </div>

      <div className="flex justify-between md:text-base text-sm mb-3 mt-12 dark:text-gray-400 relative">
        <div className="w-full text-gray-500">
          <strong>{t("UpdateProfile")}</strong>
        </div>
        <div className="w-full">
          <InputAreaTwo
            register={register}
            label={t("UpdateProfile")}
            name="update_profile"
            type="text"
            placeholder={t("UpdateProfile")}
          />
          <Error errorName={typeof errors.update_profile?.message === 'string' ? { message: errors.update_profile.message } : undefined} />
        </div>
      </div>

      <hr className="md:mb-8 mb-3" />
      <div className="grid grid-cols-12 gap-3 md:gap-5 xl:gap-6 lg:gap-6 md:mb-6 mb-3">
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("FullName")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("FullName")}
            name="full_name"
            type="text"
            placeholder={t("FullName")}
          />
          <Error errorName={typeof errors.full_name?.message === 'string' ? { message: errors.full_name.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("UserAddress")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("UserAddress")}
            name="address"
            type="text"
            placeholder={t("UserAddress")}
          />
          <Error errorName={typeof errors.address?.message === 'string' ? { message: errors.address.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("PhoneMobile")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("PhoneMobile")}
            name="user_phone"
            type="text"
            placeholder={t("PhoneMobile")}
          />
          <Error errorName={typeof errors.user_phone?.message === 'string' ? { message: errors.user_phone.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("EmailAddress")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("EmailAddress")}
            name="user_email"
            type="text"
            placeholder={t("EmailAddress")}
          />
          <Error errorName={typeof errors.user_email?.message === 'string' ? { message: errors.user_email.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("UpdateButton")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("UpdateButton")}
            name="update_button"
            type="text"
            placeholder={t("UpdateButton")}
          />
          <Error errorName={typeof errors.update_button?.message === 'string' ? { message: errors.update_button.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("CurrentPassword")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("CurrentPassword")}
            name="current_password"
            type="text"
            placeholder={t("CurrentPassword")}
          />
          <Error errorName={typeof errors.current_password?.message === 'string' ? { message: errors.current_password.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("NewPassword")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("NewPassword")}
            name="new_password"
            type="text"
            placeholder={t("NewPassword")}
          />
          <Error errorName={typeof errors.new_password?.message === 'string' ? { message: errors.new_password.message } : undefined} />
        </div>
        <div className="col-span-4">
          <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
            {t("ChangePassword")}
          </label>
          <InputAreaTwo
            register={register}
            label={t("ChangePassword")}
            name="change_password"
            type="text"
            placeholder={t("ChangePassword")}
          />
          <Error errorName={typeof errors.change_password?.message === 'string' ? { message: errors.change_password.message } : undefined} />
        </div>
      </div>
    </div>
  );
};

export default DashboardSetting;
