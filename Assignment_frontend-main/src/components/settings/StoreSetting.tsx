"use client";

import { FC, ChangeEvent } from "react";
import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

// internal imports
import Error from "@/components/form/others/Error";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import InputAreaTwo from "@/components/form/input/InputAreaTwo";
import SwitchToggle from "@/components/form/switch/SwitchToggle";

/* -------------------------------------------------------------------------- */
/*                              Form value types                              */
/* -------------------------------------------------------------------------- */
interface StoreSettingFormValues {
  stripe_key: string;
  stripe_secret: string;
  google_client_id: string;
  google_analytic_key: string;
  tawk_chat_property_id: string;
  tawk_chat_widget_id: string;
  // Add others if / when you un-comment the pixel section
  // fb_pixel_key: string;
}

/* -------------------------------------------------------------------------- */
/*                             Component prop types                           */
/* -------------------------------------------------------------------------- */
interface StoreSettingProps {
  isSave: boolean;
  errors: FieldErrors<StoreSettingFormValues>;
  register: UseFormRegister<StoreSettingFormValues>;
  isSubmitting: boolean;

  enabledCOD: boolean;
  setEnabledCOD: (v: boolean) => void;

  enabledStripe: boolean;
  setEnabledStripe: (v: boolean) => void;

  enabledFbPixel: boolean;
  setEnableFbPixel: (v: boolean) => void;

  enabledTawkChat: boolean;
  setEnabledTawkChat: (v: boolean) => void;

  enabledGoogleLogin: boolean;
  setEnabledGoogleLogin: (v: boolean) => void;

  enabledGoogleAnalytics: boolean;
  setEnabledGoogleAnalytics: (v: boolean) => void;
}

const StoreSetting: FC<StoreSettingProps> = ({
  isSave,
  errors,
  register,
  isSubmitting,
  enabledCOD,
  setEnabledCOD,
  enabledStripe,
  setEnabledStripe,
  enabledFbPixel,
  setEnableFbPixel,
  enabledTawkChat,
  setEnabledTawkChat,
  enabledGoogleLogin,
  setEnabledGoogleLogin,
  enabledGoogleAnalytics,
  setEnabledGoogleAnalytics,
}) => {
  const { t } = useTranslation();

  /* ---------------------------------------------------------------------- */
  /*                Toggle logic (COD & Stripe are mutually exclusive)      */
  /* ---------------------------------------------------------------------- */
  const handleEnableDisableMethod = (
    checked: boolean,
    _event: ChangeEvent<HTMLInputElement> | undefined,
    id: "stripe" | "cod"
  ) => {
    if (id === "stripe") {
      setEnabledStripe(!enabledStripe);
      if (!checked) setEnabledCOD(true);
    } else {
      setEnabledCOD(!enabledCOD);
      if (!checked) setEnabledStripe(true);
    }
  };

  return (
    <div className="grid grid-cols-12 font-sans">
      <div className="col-span-12 mr-3">
        <div className="lg:px-6 pt-4 lg:pl-40 lg:pr-40 md:pl-5 md:pr-5 flex-grow scrollbar-hide w-full max-h-full pb-0">
          {/* ---------------- COD ---------------------------------------- */}
          <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 mb-6">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("EnableCOD")} <br />
              <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
                ({t("EnabledByDefault") ?? "This is enabled by default"})
              </span>
            </label>
            <div className="sm:col-span-4">
              <SwitchToggle
                id="cod"
                processOption={enabledCOD}
                handleProcess={(checked) => handleEnableDisableMethod(checked, undefined, "cod")}
                title=""
              />
            </div>
          </div>

          {/* ---------------- Stripe ------------------------------------- */}
          <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 mb-6">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("EnableStripe")}
            </label>
            <div className="sm:col-span-4">
              <SwitchToggle
                id="stripe"
                processOption={enabledStripe}
                handleProcess={(checked) => handleEnableDisableMethod(checked, undefined, "stripe")}
                title=""
              />
            </div>
          </div>

          {/* Stripe keys (collapsible) */}
          <div
            style={{
              height: enabledStripe ? "auto" : 0,
              transition: "all .6s",
              visibility: enabledStripe ? "visible" : "hidden",
              opacity: enabledStripe ? 1 : 0,
            }}
            className={enabledStripe ? "mb-8" : "mb-2"}
          >
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 mb-6">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("StripeKey")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  required={enabledStripe}
                  register={register}
                  label={t("StripeKey")}
                  name="stripe_key"
                  type="text"
                  placeholder={t("StripeKey")}
                />
                <Error errorName={errors.stripe_key} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("StripeSecret")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  required={enabledStripe}
                  register={register}
                  label={t("StripeSecret")}
                  name="stripe_secret"
                  type="text"
                  placeholder={t("StripeSecret")}
                />
                <Error errorName={errors.stripe_secret} />
              </div>
            </div>
          </div>

          {/* ---------------- Google Login ------------------------------- */}
          <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 mb-6">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("EnableGoogleLogin")}
            </label>
            <div className="sm:col-span-4">
              <SwitchToggle
                id="google_login"
                processOption={enabledGoogleLogin}
                handleProcess={setEnabledGoogleLogin}
                title=''
              />
            </div>
          </div>

          {/* Google client ID (collapsible) */}
          <div
            style={{
              height: enabledGoogleLogin ? "auto" : 0,
              transition: "all .6s",
              visibility: enabledGoogleLogin ? "visible" : "hidden",
              opacity: enabledGoogleLogin ? 1 : 0,
            }}
            className={enabledGoogleLogin ? "mb-8" : "mb-2"}
          >
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 mb-6">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("GoogleClientId")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  required={enabledGoogleLogin}
                  register={register}
                  label={t("GoogleClientId")}
                  name="google_client_id"
                  type="text"
                  placeholder={t("GoogleClientId")}
                />
                <Error errorName={errors.google_client_id} />
              </div>
            </div>
          </div>

          {/* ---------------- Google Analytics --------------------------- */}
          <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 mb-6">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("EnableGoggleAnalytics")}
            </label>
            <div className="sm:col-span-4">
              <SwitchToggle
                id="google_analytics"
                processOption={enabledGoogleAnalytics}
                handleProcess={setEnabledGoogleAnalytics}
                title=''
              />
            </div>
          </div>

          {/* Analytics key (collapsible) */}
          <div
            style={{
              height: enabledGoogleAnalytics ? "auto" : 0,
              transition: "all .6s",
              visibility: enabledGoogleAnalytics ? "visible" : "hidden",
              opacity: enabledGoogleAnalytics ? 1 : 0,
            }}
            className={
              enabledGoogleAnalytics
                ? "grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 mb-6"
                : "mb-2"
            }
          >
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("GoogleAnalyticKey")}
            </label>
            <div className="sm:col-span-4">
              <InputAreaTwo
                required={enabledGoogleAnalytics}
                register={register}
                label={t("GoogleAnalyticKey")}
                name="google_analytic_key"
                type="text"
                placeholder={t("GoogleAnalyticKey")}
              />
              <Error errorName={errors.google_analytic_key} />
            </div>
          </div>

          {/* ---------------- Tawk Chat ---------------------------------- */}
          <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 mb-6">
            <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
              {t("EnableTawkChat")}
            </label>
            <div className="sm:col-span-4">
              <SwitchToggle
                id="tawk_chat"
                processOption={enabledTawkChat}
                handleProcess={setEnabledTawkChat}
                title=''
              />
            </div>
          </div>

          {/* Tawk IDs (collapsible) */}
          <div
            style={{
              height: enabledTawkChat ? "auto" : 0,
              transition: "all .6s",
              visibility: enabledTawkChat ? "visible" : "hidden",
              opacity: enabledTawkChat ? 1 : 0,
            }}
            className={enabledTawkChat ? "mb-8" : "mb-2"}
          >
            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3 mb-6">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("TawkChatPropertyID")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  required={enabledTawkChat}
                  register={register}
                  label={t("TawkChatPropertyID")}
                  name="tawk_chat_property_id"
                  type="text"
                  placeholder={t("TawkChatPropertyID")}
                />
                <Error errorName={errors.tawk_chat_property_id} />
              </div>
            </div>

            <div className="grid md:grid-cols-5 items-center sm:grid-cols-12 gap-3">
              <label className="block md:text-sm md:col-span-1 sm:col-span-2 text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                {t("TawkChatWidgetID")}
              </label>
              <div className="sm:col-span-4">
                <InputAreaTwo
                  required={enabledTawkChat}
                  register={register}
                  label={t("TawkChatWidgetID")}
                  name="tawk_chat_widget_id"
                  type="text"
                  placeholder={t("TawkChatWidgetID")}
                />
                <Error errorName={errors.tawk_chat_widget_id} />
              </div>
            </div>
          </div>

          {/* ---------------- Footer action buttons ---------------------- */}
          <div className="flex flex-row-reverse pb-6">
            {isSubmitting ? (
              <Button disabled type="button" className="h-12">
                <img
                  src={spinnerLoadingImage.src}
                  alt="Loading"
                  width={20}
                  height={10}
                />
                <span className="font-serif ml-2 font-light">
                  {t("Processing")}
                </span>
              </Button>
            ) : (
              <Button type="submit" className="h-12 px-8">
                {isSave ? t("SaveBtn") : t("UpdateBtn")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreSetting;
