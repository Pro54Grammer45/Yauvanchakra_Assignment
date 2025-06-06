## Error at src\components\image-uploader\Uploader.tsx

- setImageUrl at line 152
```
setImageUrl: React.Dispatch<React.SetStateAction<string | string[]>>;
```

- setImageurl at line 221

- imageurl at line 222

- handleRemoveImage at line 223

## Error at src\components\image-uploader\Container.tsx

- image at line 44
```
interface CardProps {
  id: string;
  image: CardItem;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  handleRemoveImage: (image: CardItem) => void;
}
```

- handleRemoveImage at line 45
```
in src\components\image-uploader\Card.tsx

interface CardItem {
  id: string;
  url: string;
}

interface CardProps {
  id: string;
  image: CardItem;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  handleRemoveImage: (image: CardItem) => void;
}
```