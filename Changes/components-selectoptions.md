## Error at src\components\form\selectOption\SelectStatus.tsx

- updateOrder at line 32
```
updateOrder: async (id: any, body: any, headers?: any): Promise<any> => {
```

- Select at line 42
```
<Select
        // Existing Code
        placeholder="Select status"
        onPointerEnterCapture={undefined}  
        onPointerLeaveCapture={undefined}
        css={undefined}
      >
```

- defaultValue at line 48,51,54,58,63
```
<Select
        // Existing Code
        defaultValue={order?.status || "status"}
>
    <option value="status" hidden>
          {order?.status}
        </option>
    //Similarly rest of the code
```