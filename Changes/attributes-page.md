## Errors resolved in src\app\attributes\page.tsx 

- handleSelectFile at Line 133
```
handleSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
```

- handleUploadMultiple at Line 134

```
interface UploadManyProps {
  // ... other props
  handleSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveSelectFile: () => void;
  handleUploadMultiple: (files: File[]) => void; // changed!
}

const UploadMany: FC<UploadManyProps> = ({
  // ...props
  handleSelectFile,
  handleRemoveSelectFile,
  handleUploadMultiple,
  // ...rest
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles(files);
    handleSelectFile(e); // if you want to keep this
  };
```

- handleRemoveSelectFile at Line 135
```
in UploadMany.tsx 

handleRemoveSelectFile: (file: File) => void;
```

- handleDeleteMany at Line 157
```
in useToggleDrawer

handleDeleteMany: (id: any) => void;
```

- Input at line 188
```
<Input
    // Existing Code
    onPointerEnterCapture={undefined}
    onPointerLeaveCapture={undefined}
    css={undefined}
    crossOrigin={undefined}
 />
```

- AttributeTable at line 250
 ```
 interface AttributeTableProps {
  // Existing Code
  lang: string;
}
 ```
