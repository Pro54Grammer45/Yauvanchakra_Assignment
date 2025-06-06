"use client"
import React, { useState, ChangeEvent } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Select,
  Input,
  Button,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

interface Product {
  _id: string;
  title: string;
  category: string;
  price: number;
  salePrice: number;
  stock: number;
  status: string;
  published: boolean;
}

// Dummy data
const dummyProducts: Product[] = [
  {
    _id: "1",
    title: "Product 1",
    category: "Electronics",
    price: 99.99,
    salePrice: 79.99,
    stock: 50,
    status: "In Stock",
    published: true,
  },
  {
    _id: "2",
    title: "Product 2",
    category: "Clothing",
    price: 49.99,
    salePrice: 39.99,
    stock: 100,
    status: "In Stock",
    published: true,
  },
  {
    _id: "3",
    title: "Product 3",
    category: "Books",
    price: 29.99,
    salePrice: 24.99,
    stock: 0,
    status: "Out of Stock",
    published: false,
  },
];

const Products: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sortedField, setSortedField] = useState<string>("");
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(dummyProducts.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleResetField = () => {
    setCategory("");
    setSortedField("");
    setSearchText("");
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Products</h1>
      
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Button
                disabled={isCheck.length < 1}
                className="w-full rounded-md h-12 btn-gray text-gray-600"
              >
                <span className="mr-2">
                  <FiEdit />
                </span>
                Bulk Action
              </Button>
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Button
                disabled={isCheck?.length < 1}
                className="w-full rounded-md h-12 bg-red-300 disabled btn-red"
              >
                <span className="mr-2">
                  <FiTrash2 />
                </span>
                Delete
              </Button>
              <Button type="button" style={{color:'blue', backgroundColor:'yellow'}}>
                Add Product
              </Button>
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Button className="w-full rounded-md h-12">
                <span className="mr-2">
                  <FiPlus />
                </span>
                Add Product
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                type="search"
                name="search"
                placeholder="Search Product"
                className="w-full"
                value={searchText}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                css={undefined}
                crossOrigin={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
            </div>

            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Select
                value={category}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value)}
                className="w-full"
                name="category"
                placeholder="Select Category"
                css={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
              </Select>
            </div>

            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Select
                value={sortedField}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortedField(e.target.value)}
                className="w-full"
                name="sortedField"
                placeholder="Price"
                css={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <option value="">Price</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
                <option value="published">Published</option>
                <option value="unPublished">Unpublished</option>
              </Select>
            </div>

            <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <div className="w-full mx-1">
                <Button type="submit" className="h-12 w-full bg-emerald-700">
                  Filter
                </Button>
              </div>

              <div className="w-full mx-1">
                <Button
                  layout="outline"
                  onClick={handleResetField}
                  type="reset"
                  className="px-4 md:py-1 py-2 h-12 text-sm dark:bg-gray-700"
                >
                  <span className="text-black dark:text-gray-200">Reset</span>
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      <TableContainer className="mb-8 rounded-b-lg">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>
                <input
                  type="checkbox"
                  checked={isCheckAll}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Sale Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Status</TableCell>
              <TableCell className="text-center">Details</TableCell>
              <TableCell className="text-center">Published</TableCell>
              <TableCell className="text-right">Actions</TableCell>
            </tr>
          </TableHeader>
          <tbody>
            {dummyProducts.map((product) => (
              <tr key={product._id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={isCheck.includes(product._id)}
                    onChange={() => {
                      if (isCheck.includes(product._id)) {
                        setIsCheck(isCheck.filter((id) => id !== product._id));
                      } else {
                        setIsCheck([...isCheck, product._id]);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>${product.salePrice}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell className="text-center">
                  <Button size="small">View</Button>
                </TableCell>
                <TableCell className="text-center">
                  {product.published ? "Yes" : "No"}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="small" className="mr-2">
                    <FiEdit />
                  </Button>
                  <Button size="small" className="text-red-500">
                    <FiTrash2 />
                  </Button>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={dummyProducts.length}
            resultsPerPage={10}
            onChange={setCurrentPage}
            label="Product Page Navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  );
};

export default Products;

