### Changes made in FrontEnd

- src\app\attributes\page.tsx 'handleDeleteMany'

```
 - in AttributeTable Props 
 ```
 interface AttributeTableProps {
  // Existing Code
  lang: string;
}
 ```


- src\components\attribute\AttributeTable.tsx 
    - 'ShowHideButton'

```
From 

    <ShowHideButton id={attribute._id} status={attribute.status} />


To

    <ShowHideButton id={attribute._id} status={attribute.status} category={attribute.option} />
```

- 'setIsCheck'

```
In EditDeleteButton.tsx added

interface EditDeleteButtonProps {
  // Existing Code
  setIsCheck?: (ids: string[]) => void; 
}

