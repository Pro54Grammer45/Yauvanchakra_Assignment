## Error at src\components\form\others\PrintReceipt.tsx

- content at line 61
```
remove the line
```

- getOrderById at line 68
```

const res = await OrderServices.getOrderById(id, {});

```

- InvoiceForPrint data and globalSetting at line 80
```
const [orderData, setOrderData] = useState<InvoiceData | null>(null); 


export interface GlobalSetting {
    receipt_size?: 'A4' | '3-1/8' | '2-1/4' | string;
    logo?: string;
    company_name?: string;
    address?: string;
    contact?: string;
    web_site?: string;
    email?: string;
    vat_number?: string;
    default_currency?: string;
  }

import { GlobalSetting } from "@/interfaces/GlobalSettings";
```

## Error at src\components\form\others\TextAreaCom.tsx

- TextArea at line 25
```
<Textarea
      //Existing Code
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      css={undefined}
    />
```