## Error at src\components\category\CategoryTable.tsx

- ToggleDrawerHook at line 73
```
interface ToggleDrawerHook {
  title: string;
  allId: string[];
  serviceId: string;
  setServiceId: React.Dispatch<React.SetStateAction<string>>;
  handleModalOpen: (id: string, title: string) => void; // Add title param
  handleDeleteMany: (ids: string[], products?: any) => void;
  handleUpdateMany: (ids: string[]) => void;
  handleUpdate: (id: string) => void;
}
```

- CategoryDrawer at line 97
```
in src\components\drawer\CategoryDrawer.tsx

export interface Category {
  _id: string;
  name: string | { [lang: string]: string | undefined };
  description?: string | { [lang: string]: string | undefined };
  icon?: string;
  status: 'active' | 'inactive' | boolean;
  children: Category[];
}

// Add type definitions for props
interface CategoryDrawerProps {
  id?: string;
  data: Category | undefined; 
  lang?: string; 
}
```

## Errors at src\components\category\ParentCategory.tsx

- setSelectedCategory at line 93
```
interface ParentCategoryProps {
  selectedCategory: SelectedCategory[];
  setSelectedCategory: Dispatch<SetStateAction<SelectedCategory[]>>;
  setDefaultCategory: Dispatch<SetStateAction<SelectedCategory[]>>;
}
```

- animation at line 138
```
const motion = {
    motionName: "slide-up",
    motionAppear: false,
    onAppearStart: (node: HTMLElement) => ({ height: 0 }),
    onAppearActive: (node: HTMLElement) => ({ height: node.scrollHeight }),
    onLeaveStart: (node: HTMLElement) => ({ height: node.offsetHeight }),
    onLeaveActive: () => ({ height: 0 }),
  };
```

## Error at src\components\form\selectOption\SelectCategory.tsx

- Select at line 24
```
<Select
        // Existing Code
        placeholder="Select status"
        onPointerEnterCapture={undefined}  
        onPointerLeaveCapture={undefined}
        css={undefined}
      >
```

- defaultValue at line 25
```
<Select  
      //Existing Code
      defaultValue="All"
  >
      <option value="All" hidden>
        {t("Category")}
      </option>
```

## Error at src\components\form\selectOption\SelectCurrency.tsx

- Select at line 34
```
<Select
        // Existing Code
        placeholder="Select status"
        onPointerEnterCapture={undefined}  
        onPointerLeaveCapture={undefined}
        css={undefined}
      >
```

## Error at src\components\form\selectOption\SelectISOCode.tsx

- Select at line 161
```
<Select
        // Existing Code
        placeholder="Select status"
        onPointerEnterCapture={undefined}  
        onPointerLeaveCapture={undefined}
        css={undefined}
      >
```

- defaultValue at line 167
```
<Select
      //Existing Code
      defaultValue=""
    >
      <option value=""  hidden>
        Default Iso Code
      </option>
```

## Error at src\components\form\selectOption\SelectLanguageThree.tsx

- Select at line 41
```
<Select
        // Existing Code
        placeholder="Select status"
        onPointerEnterCapture={undefined}  
        onPointerLeaveCapture={undefined}
        css={undefined}
      >
```

## Error at src\components\form\selectOption\SelectOption.tsx

- Select at line 14
```
<Select
        // Existing Code
        placeholder="Select status"
        onPointerEnterCapture={undefined}  
        onPointerLeaveCapture={undefined}
        css={undefined}
      >
```

- defaultValue at line 20
```
<Select
      //Existing Code
      defaultValue=""
    >
      <option value=""  hidden>
        Select type
      </option>
```

## Error at src\components\form\selectOption\SelectPrintSize.tsx

- Select at line 24
```
<Select
        // Existing Code
        placeholder="Select status"
        onPointerEnterCapture={undefined}  
        onPointerLeaveCapture={undefined}
        css={undefined}
      >
```

- defaultValue at line 32
```
<Select
      //Existing Code
      defaultValue="57-mm"
    >
      <option value="57-mm">
        57 mm
      </option>
```

## Error at src\components\form\selectOption\SelectProductLimit.tsx

- Select at line 20
```
<Select
        // Existing Code
        placeholder="Select status"
        onPointerEnterCapture={undefined}  
        onPointerLeaveCapture={undefined}
        css={undefined}
      >
```

- defaultValue at line 26
```
<Select
      //Existing Code
      defaultValue=""
    >
      <option value="" hidden>
        Select Products Limit
      </option>
```

## Error at src\components\form\selectOption\SelectRole.tsx

- Select at line 15
```
<Select
        // Existing Code
        placeholder="Select status"
        onPointerEnterCapture={undefined}  
        onPointerLeaveCapture={undefined}
        css={undefined}
      >
```

- defaultValue at line 22
```
<Select
      //Existing Code
      defaultValue=""
    >
      <option value="Staff role"  hidden>
        Staff role
      </option>
```

## Error at src\components\form\selectOption\SelectRole.tsx

- defaultValue at line 33
```
<Select
      //Existing Code
      defaultValue=""
    >
      <option value=""  hidden>
        Default Time Zone
      </option>
```
