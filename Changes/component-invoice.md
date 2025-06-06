## Error at src\components\invoice\InvoiceForDownload.tsx

- display at line 96
```
table: {
  flexDirection: "column",
  width: "100%",
}
```

- whiteSapce at line 238
```
whiteSpace: "nowrap",   
```

- classname at lines 355, 357
```
<Text style={{
                    fontFamily: "Open Sans",
                    fontWeight: "bold",
                    fontSize: 10,
                    textTransform: "capitalize",
                    marginTop: 2
                  }}>

<Text style={{ color: "#10b981"  }}>
```

- Image at line 374
```
<Image
                  src={logoDark.src}
                  debug={true}
                  style={{
                    width: 90,
                    marginLeft: "auto",
                    alignSelf: "flex-end",
                  }}
                />
```

- float at lines 445, 451, 671
```
// Before
float: "right"

// After
alignSelf: "flex-end"
```