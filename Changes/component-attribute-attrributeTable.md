## Errors resolved at src\components\attribute\AttributeListTable.tsx

- handleSkuBarcode at Line 172 and Line 181
```
 interface SkuBarcodeInputProps {
  id: string | number;
  value?: string;
  name: 'sku' | 'barcode';
  placeholder?: string;
  handleSkuBarcode: (
    index: number,
    name: 'sku' | 'barcode',
    value: string
  ) => void;
}
```

- id at line 188 ,200, 212
```
id={i.toString()}
```

- variant at line 191, 203, 215
```
variant={variant.toString()}
```

- value at line 194 and line 206
```
value={variant.originalPrice ?? 0}
```

- EditDeleteButtonTwo at Line 228
```
interface EditDeleteButtonTwoProps {
  extra: any;
  variant: any;
  handleRemoveVariant: (variant: any, extra: any) => void;
  attribute: any;
  setTapValue: (value: number) => void;
  deleteModalShow: (variant: Variant) => void;
  handleEditVariant: () => void;
}
```

## Errors resolved at src\components\attribute\ChildAttributeTable.tsx

- useToggleDrawer at Line 70
```
interface ToggleDrawerHook {
  title: string;
  allId: string[]; 
  serviceId: string;
  handleUpdate: (id: string) => void;
  setServiceId: React.Dispatch<React.SetStateAction<string>>;
  handleModalOpen: (id: string, title: string) => void; // Add title param
  handleDeleteMany: (ids: string[], products?: any) => void; 
  handleUpdateMany: (ids: string[]) => void; 
}
```

- ShowHideButton at Line 130

```
<ShowHideButton id={attribute._id} status={attribute.status} category={attribute.name} />

in ShowHideButton
interface ShowHideButtonProps {
  id: string | number;
  status: string | boolean;
  category: any;
  currencyStatusName?: string;
}
```