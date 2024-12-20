import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import AddProduct from "@/components/AddProduct";
import { apiUrl } from "@/api";
import toast from "react-hot-toast";

const ProductManagement = () => {
  const { products, productMeta, fetchProducts, addProduct, updateProduct, deleteProduct } = useProducts();

  useEffect(()=> {
    fetchProducts()
  },[])

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    discounted_price: "",
    category: "",
    size: "",
    is_available: true,
    quantity: "",
    image: null,
  });

  const handleAddProduct = () => {
    // Reset the form and preview when adding a new product
    setCurrentProduct({
      id: null,
      name: "",
      description: "",
      price: "",
      discounted_price: "",
      category: "",
      size: "",
      is_available: true,
      quantity: "",
      image: null,
    });
    setImagePreview(null);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    const updatedProduct = {
      ...product,
      discounted_price: product.discounted_price
    };
    setCurrentProduct(updatedProduct);
    // If the product has an existing image, set the preview 
    setImagePreview(product.image ? `${apiUrl}${product.image}` : null);
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = async (productSlug) => {
    try {
      await deleteProduct(productSlug);
      // Refetch products to maintain correct pagination
      await fetchProducts(productMeta.currentPage);
    } catch (error) {
      toast.error("Failed to delete product");
      console.error("Delete product error:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    try {
      fetchProducts(pageNumber);
    } catch (error) {
      toast.error("Failed to load page");
      console.error("Page change error:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update currentProduct with the selected image file
      setCurrentProduct(prev => ({
        ...prev,
        image: file,
      }));

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Append all non-null fields
    Object.keys(currentProduct).forEach(key => {
      if (currentProduct[key] !== null && currentProduct[key] !== '') {
        if (key === 'available') {
          formData.append(key, currentProduct[key].toString());
        } else if (key === 'image') {
          if (currentProduct[key] instanceof File) {
            formData.append('image', currentProduct[key]);
          }
        } else if (key === 'discountPrice') {
          formData.append('discounted_price', currentProduct[key]);
        } else if (key !== 'id') {
          formData.append(key, currentProduct[key]);
        }
      }
    })

    try {
      //  logic for update product
      if (currentProduct.id) {
        await updateProduct(currentProduct.slug, formData);
      } else {
        // logic for add product
        await addProduct(formData);
      }

      // Reset image preview and close dialog
      setImagePreview(null);
      setIsDialogOpen(false);

      // Refetch products to ensure latest data
      await fetchProducts(productMeta.currentPage);
    } catch (error) {
      console.error('Product submission error:', error);
      toast.error('Failed to submit product');
    }
  };

  return (
    <div>
      <Card className="w-full shadow-none rounded-sm">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="md:text-2xl md:font-bold text-sm">
            Product Management
          </CardTitle>
          <Button onClick={handleAddProduct} className='text-sm md:text-base'>
            <Plus className="md:mr-2" size={20} />
            Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => handlePageChange(productMeta.currentPage - 1)}
              disabled={!productMeta.previous}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            {[...Array(Math.ceil(productMeta.count / 10))].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 ${
                  productMeta.currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                } rounded`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(productMeta.currentPage + 1)}
              disabled={!productMeta.next}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Product Dialog */}
      <AddProduct
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setImagePreview(null);
        }}
        currentProduct={currentProduct}
        setCurrentProduct={setCurrentProduct}
        onSubmit={handleSubmit}
        onImageUpload={handleImageUpload}
        imagePreview={imagePreview}
      />
    </div>
  );
};

export default ProductManagement;