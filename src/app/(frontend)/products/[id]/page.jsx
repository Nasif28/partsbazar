"use client";
import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { shippingInfo } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";
import {
  clearProductDetails,
  fetchProductById,
  fetchRelatedProducts,
} from "@/redux/features/productSlice";
import ProductNavigation from "@/components/Products/ProductDetails/ProductNavigation";
import ProductGallery from "@/components/Products/ProductDetails/ProductGallery";
import ProductInfo from "@/components/Products/ProductDetails/ProductInfo";
import ProductTabs from "@/components/Products/ProductDetails/ProductTabs";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "@/components/Global/Breadcrumbs";
import ProductGrid from "@/components/Global/GlobalProduct/ProductGrid";
import { ArrowRight } from "lucide-react";

const ProductDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    productDetails,
    relatedProducts,
    detailsLoading,
    relatedLoading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch]);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductById(params.id));
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (productDetails?.id && productDetails?.category) {
      dispatch(
        fetchRelatedProducts({
          category: productDetails.category,
          excludeId: productDetails.id,
        })
      );
    }
  }, [productDetails, dispatch]);

  // Get all products from Redux store
  const { allProducts } = useSelector((state) => state.products);

  // Compute adjacent products
  const [prevProduct, nextProduct] = useMemo(() => {
    if (!productDetails.id || allProducts.length === 0) return [null, null];

    const currentIndex = allProducts.findIndex(
      (p) => p.id === productDetails.id
    );
    if (currentIndex === -1) return [null, null];

    return [
      currentIndex > 0 ? allProducts[currentIndex - 1] : null,
      currentIndex < allProducts.length - 1
        ? allProducts[currentIndex + 1]
        : null,
    ];
  }, [productDetails.id, allProducts]);

  useEffect(() => {
    if (error) {
      console.error("Product Error:", error);
      router.push("/404");
    }
  }, [error, router]);

  if (detailsLoading || !productDetails.id) {
    return (
      <div className="myContainer">
        <div className="container mx-auto py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="h-[500px] w-full rounded-xl" />
              <div className="flex gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-20 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <div className="flex gap-4 pt-4">
                <Skeleton className="h-12 w-32 rounded-full" />
                <Skeleton className="h-12 w-32 rounded-full" />
              </div>
              <div className="pt-8 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="myContainer">
      <div className="pt-2 flex justify-between">
        <div>
          <Breadcrumbs textColor="forground" />
        </div>

        <div>
          <ProductNavigation
            prevProduct={prevProduct}
            nextProduct={nextProduct}
          />
        </div>
      </div>

      <div className="container mx-auto pt-4 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductGallery product={productDetails} />
          <ProductInfo product={productDetails} />
        </div>

        {/* Tabs Section */}
        <div className="mt-10">
          <ProductTabs product={productDetails} shippingInfo={shippingInfo} />
        </div>

        {/* Related Products */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Related Products</h2>
            <button className="text-primary hover:text-primary-dark font-medium flex items-center">
              View Al <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
          <ProductGrid products={relatedProducts} />
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
