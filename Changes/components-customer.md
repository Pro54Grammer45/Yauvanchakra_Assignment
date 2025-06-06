#Error at src\components\customer\CustomerOrderTable.tsx

- SelectStatus at line 96
```
interface OrderItem {
  //Existing Code
  status: "Delivered" | "Pending" | "Processing" | "Cancel";
}
```

## Error at src\components\customer\CustomerTable.tsx

- ToggleDrawerHook at line 46
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