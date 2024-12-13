import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ImagePlus } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

const AddProduct = ({
  isOpen,
  onClose,
  currentProduct,
  setCurrentProduct,
  onSubmit,
  onImageUpload,
  imagePreview,
}) => {
  const [categories, setCategories] = useState([]);

  const {
    id,
    name,
    description,
    price,
    discounted_price,
    quantity,
    size,
    is_available,
    category,
  } = currentProduct;




  const SIZE_CHOICES = [
    { value: "S", label: "Small" },
    { value: "M", label: "Medium" },
    { value: "L", label: "Large" },
    { value: "XL", label: "Extra Large" },
  ];

  const { fetchCategories } = useProducts();

  useEffect(function () {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    getCategories();
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6 rounded-lg shadow-lg bg-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {id ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-1">
            {id
              ? "Edit the details of the selected product."
              : "Provide details for the new product you want to add."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={onSubmit}
          className="grid gap-6 py-4"
          encType="multipart/form-data"
        >
          {/* Image Upload */}
          <div className="flex justify-center">
            <div className="relative">
              <Input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Label htmlFor="image-upload" className="cursor-pointer">
                <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition-colors duration-300 bg-gray-50">
                  {imagePreview ? (
                    // Display the preview image
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <ImagePlus className="text-gray-400" size={32} />
                      <span className="text-gray-500 mt-2">Upload Image</span>
                    </>
                  )}
                </div>
              </Label>
            </div>
          </div>

          {/* Form Fields in Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="font-medium text-gray-700">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label
                htmlFor="description"
                className="font-medium text-gray-700"
              >
                Description
              </Label>
              <Input
                id="description"
                value={description}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="price" className="font-medium text-gray-700">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    price: e.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <Label
                htmlFor="discounted_price"
                className="font-medium text-gray-700"
              >
                Discounted Price
              </Label>
              <Input
                id="discounted_price"
                type="number"
                step="0.01"
                value={discounted_price} 
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    discounted_price: e.target.value, 
                  })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="stock" className="font-medium text-gray-700">
                Stock
              </Label>
              <Input
                id="stock"
                type="number"
                value={quantity}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    quantity: e.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="size" className="font-medium text-gray-700">
                Size
              </Label>
              <Select
                value={size}
                onValueChange={(value) =>
                  setCurrentProduct({ ...currentProduct, size: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  {SIZE_CHOICES.map((size) => {
                    return (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="available" className="font-medium text-gray-700">
                Availability
              </Label>
              <Select
                value={is_available}
                onValueChange={(value) =>
                  setCurrentProduct({ ...currentProduct, is_available: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Available</SelectItem>
                  <SelectItem value="false">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category" className="font-medium text-gray-700">
                Category
              </Label>
              <Select
                value={category}
                onValueChange={(value) =>
                  setCurrentProduct({ ...currentProduct, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => {
                    return (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="px-4 py-2 text-gray-700 border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              {id ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

AddProduct.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentProduct: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.object,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    discounted_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.string,
    is_available: PropTypes.bool,
    category: PropTypes.string,
  }).isRequired,
  setCurrentProduct: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onImageUpload: PropTypes.func.isRequired,
  imagePreview: PropTypes.string,
};

export default AddProduct;