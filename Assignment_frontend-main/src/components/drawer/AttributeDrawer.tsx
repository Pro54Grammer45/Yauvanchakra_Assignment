'use client';
import { FC } from 'react';
import { Select } from '@windmill/react-ui';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Error from '@/components/form/others/Error';
import Title from '@/components/form/others/Title';
import LabelArea from '@/components/form/selectOption/LabelArea';
import InputArea from '@/components/form/input/InputArea';
import DrawerButton from '@/components/form/button/DrawerButton';
import TagInputTwo from '@/components/common/TagInputTwo';
import useAttributeSubmit from '@/hooks/useAttributeSubmit';

interface AttributeDrawerProps { id?: string; }
const AttributeDrawer: FC<AttributeDrawerProps> = ({ id }) => {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    variants,
    addVariant,
    isSubmitting,
    removeVariant,
    handleSelectLanguage,
  } = useAttributeSubmit(id);

  const { t } = useTranslation();

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <Title
          register={register}
          handleSelectLanguage={handleSelectLanguage}
          title={id ? t('UpdateAttribute') : t('AddAttribute')}
          description={id ? t('UpdateAttributeDesc') : t('AddAttributeDesc')}
        />
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t('DrawerAttributeTitle')} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required
                  register={register}
                  label="Attribute Title"
                  name="title"
                  type="text"
                  placeholder="Color or Size or Dimension or Material or Fabric"
                />
                <Error errorName={errors.title} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
              <LabelArea label={t('DisplayName')} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required
                  register={register}
                  label="Display Name"
                  name="name"
                  type="text"
                  placeholder="Display Name"
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 relative">
              <LabelArea label={t('DrawerOptions')} />
              <div className="col-span-8 sm:col-span-4">
                <Select
                  {...register('option', { required: 'Option is required!' })}
                  name="option"
                  placeholder="Select option type" 
                  onPointerEnterCapture={undefined} // Add required props
                  onPointerLeaveCapture={undefined}
                  css={undefined} 
                >
                  <option value="" hidden>
                    {t('DrawerSelecttype')}
                  </option>
                  <option value="Dropdown">{t('Dropdown')}</option>
                  <option value="Radio">{t('Radio')}</option>
                </Select>
                <Error errorName={errors.option} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Attribute" isSubmitting={isSubmitting} />
        </form>

        {/* Variants */}
        {!id && (
          <div className="px-6 pt-8 pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
              <LabelArea label={t('Variants')} />
              <div className="col-span-8 sm:col-span-4">
                <TagInputTwo notes={variants} addNote={addVariant} removeNote={removeVariant} />
              </div>
            </div>
          </div>
        )}
      </Scrollbars>
    </>
  );
};
export default AttributeDrawer;