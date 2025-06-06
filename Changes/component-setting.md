## Error at src\components\settings\CommonSetting.tsx

- Select at line 99
```
<Select
      //Existing Code
      placeholder="Select option type" 
      onPointerEnterCapture={undefined} // Add required props
      onPointerLeaveCapture={undefined}
      css={undefined} 
>
```

- defaultValue at line 104
```
<Select
        //Existing Code
        defaultValue=''
    >
                <option value=""  hidden>
                  {t("DefaultDateFormat")}
                </option>
```

- SelectReceiptSize at line 120
```
<SelectReceiptSize
                //Existing Code
                pos={true}
                setPosCustomer={(value: string) => {
                  set(register, "receipt_size", value);
                }} 
      />
```

- img src at line 259
```
src={spinnerLoadingImage.src}
```

## Error at src\components\settings\SeoSetting.tsx

- img src at line 66
```
src={spinnerLoadingImage.src}
```

- Uploader at line 93, 172
```
<Uploader folder={''} //other props />
```

## Error at src\components\settings\SettingContainer.tsx

- img src at line 40
```
src={spinnerLoadingImage.src}
```

## Error at src\components\settings\StoreSetting.tsx

- handleProcess at lines 112,126
```
    handleProcess={(checked) => handleEnableDisableMethod(checked, undefined, "cod")}

    handleProcess={(checked) => handleEnableDisableMethod(checked, undefined, "stripe")}
```

- SwitchToggle at lines 182, 224, 268
```
<SwitchToggle
                //Existing code
                title=''
              />
```

- img src at line 326
```
src={spinnerLoadingImage.src}
```