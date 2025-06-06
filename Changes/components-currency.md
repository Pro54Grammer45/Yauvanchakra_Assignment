## Errors in src\components\currency\CurrencyTable.tsx

- ToggleDrawerHook at line 47
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

- ShowHideButton at line 95
```
<ShowHideButton
                // Existing Code
                category={undefined}
              />
```