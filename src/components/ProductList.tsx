"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  image: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get('https://www.giovankov.com/api/product.json');
        console.log("productResponse.data", productResponse.data);
        const imageResponse = await axios.get('https://www.giovankov.com/api/image.json');
        console.log("imageResponse.data", imageResponse.data);

        if (Array.isArray(productResponse.data.data) && Array.isArray(imageResponse.data.data)) {
          // Create a map from product ID to image URL
          const imageMap = new Map<string, string>();
          imageResponse.data.data.forEach((imageGroup: any) => {
            imageGroup.id.forEach((id: string) => {
              imageMap.set(id, imageGroup.image);
            });
          });

          // Map products to include their corresponding image
          const products = productResponse.data.data.map((product: any) => ({
            ...product,
            image: imageMap.get(product.id.toString()) || '',
          }));

          setProducts(products);
        } else {
          console.error("Expected arrays but got:", productResponse.data, imageResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  const openModal = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
            <p>ID: {product.id}</p>
            <h3 className="text-xl font-semibold mb-4 text-center">{product.name}</h3>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 cursor-pointer rounded-lg"
              onClick={() => openModal(product.image)}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white p-4 rounded-lg shadow-lg transform transition-all duration-300">
            <img src={selectedImage} alt="Product Image" className="w-full h-auto" />
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductList;
