## ## Errors resolved in src\components\common\UploadMany.tsx

- handleClickOutside at Line 113 and Line 114
```
remove MouseEvent from react

import React from 'react'

handleUploadMultiple: (e: React.MouseEvent<HTMLButtonElement>) => void;
```



- Input at Line 179
```
    <Input
                //Existing code
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                css={undefined}
                crossOrigin={undefined}
              />
```

- img->src at Line 211

```
<img
                  src={spinnerLoadingImage.src}
                  //Existing code
                />
```