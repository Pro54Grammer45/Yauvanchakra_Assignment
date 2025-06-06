## Error at src\hooks\useAsync.ts

- source at line 24
```
interface SidebarContextType {
  source:any;
  //Existing code
}
```

## Error at src\hooks\useAttributeSubmit.ts

- setServiceId at line 98, 105, 111, 152
```
setServiceId(res._id);
```

## Error at src\hooks\useLanguageSubmit.ts

- setValue at lines 63,64,65
```
setValue("name","");
setValue("iso_code","");
setValue("flag","");
```

## Error at src\hooks\useProductFilter.ts

- e.target.result at line 89
```
JSON.parse(e.target.result.toString());
```

- fromString(text); at line 119
```
csvToJson().fromString(text.toString());
```

## Error at src\hooks\useProductSubmit.ts

- return at lines 89, 93
```
if (!imageUrl) {
         notifyError("Image is required!");
         setIsSubmitting(false);
          return;
      };
```

- setValue at lines 257,258,259,260,261,262,263,264,265
```
setValue("title", "");
//Similarly the rest
```

- buttons at line 495, 532
```
buttons: ["Cancel", "Confirm"], 
```

- if (i === id) at line 614
```
(i === Number(id))
```

## Error at src\hooks\useStaffSubmit.ts

- setValue at line 184
```
setValue("password",res.password);
```

- setValue at line 214,215,216,217,218,219
```
setValue("role",'');
```

## Error at src\hooks\useStoreHomeSubmit.ts

- draft-js-import-html at line 4
```
npm i draft-js-import-html
```

- draftjs-to-html at line 5
```
npm i draftjs-to-html
```

- navbar 

```
interface StoreCustomizationSetting {
  home?: any;
  navbar?: any;
  about_us?: any;
  contact_us?: any;
  offers?: any;
  privacy_policy?: any;
  term_and_condition?: any;
  faq?: any;
  slider?: any;
  checkout?: any;
  slug?: any;
  footer?: any;
  dashboard?: any;
}

const [resData, setResData] = useState<StoreCustomizationSetting>({});
```

## Error at src\hooks\useTranslationValue.ts

- env at line 68
```
process.env.NEXT_PUBLIC_MYMEMORY_API_KEY;
```

- key at line 74
```
translateText: async (text: any, translateFrom: any, translateTo: any,key: any)
```

## Error at src\hooks\useUtilsFunction.ts

- value at line 54,58
```
(value.toString() || '0')
```