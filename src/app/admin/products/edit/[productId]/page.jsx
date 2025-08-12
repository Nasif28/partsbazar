"use client";
import { ProductForm } from "@/components/Admin/Product/ProductForm";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const mockProducts = [
  {
    id: "1",
    name: "MOBIL DOT 4 BRAKE FLUID",
    slug: "mobil-dot-4-brake-fluid",
    brand: "MOBIL",
    category: "Brake Fluid",
    subcategory: "DOT 4",
    regularPrice: 50.0,
    discountPrice: 45.0,
    purchasePrice: 30.0,
    status: "Active",
    stock: 120,
    sold: 25,
    bestSelling: false,
    suggested: true,
    createdAt: "2023-09-22",
    thumbnail: "/products/brake-fluid.jpg",
    gallery: ["/products/brake-fluid-1.jpg", "/products/brake-fluid-2.jpg"],
    minPurchase: 1,
    maxPurchase: 5,
    clubPoints: 10,
    shortDescription: "High-performance DOT 4 brake fluid for all vehicles",
    description:
      "Mobil DOT 4 Brake Fluid is a high-performance, glycol-based fluid designed for use in automotive disc, drum, and anti-lock braking systems. It has a high dry boiling point and excellent viscosity characteristics at low temperatures.",
    weight: 0.5,
    shippingCarrier: "Standard Shipping",
    shippingFee: 5.0,
    multiplyShipping: true,
    taxRate: 7.5,
    todaysDeal: false,
    metaTitle: "Mobil DOT 4 Brake Fluid | Premium Automotive Fluid",
    metaKeywords: "brake fluid, mobil, dot4, automotive",
    metaDescription:
      "High-quality DOT 4 brake fluid from Mobil for superior braking performance in all weather conditions.",
  },
];

const EditProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const foundProduct = mockProducts.find((p) => p.id === params.productId);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        router.push("/admin/products");
      }
      setLoading(false);
    }, 500);
  }, [params.productId, router]);

  const handleSubmit = async (productData) => {
    console.log("Updating product:", productData);
    return new Promise((resolve) => setTimeout(resolve, 1500));
  };

  if (loading) {
    return (
      <div>
        <div className="flex justify-center items-center h-64">
          <p>Loading product data...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <div className="flex justify-center items-center h-64">
          <p>Product not found</p>
        </div>
      </div>
    );
  }

  return <ProductForm initialData={product} onSubmit={handleSubmit} />;
};

export default EditProductPage;
