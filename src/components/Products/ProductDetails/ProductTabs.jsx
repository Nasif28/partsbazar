import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewForm from "./ReviewForm";
import { ShieldCheck } from "lucide-react";

const ProductTabs = ({ product, shippingInfo }) => {
  // Calculate star distribution
  const starCounts = [0, 0, 0, 0, 0];
  product.reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      starCounts[5 - review.rating]++;
    }
  });

  const totalReviews = product.reviews.length;

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="reviews">Reviews ({totalReviews})</TabsTrigger>
        <TabsTrigger value="warranty">Warranty Policy</TabsTrigger>
        <TabsTrigger value="shipping">Shipping Information</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="p-6 bg-card rounded-lg mt-2">
        <div className="prose max-w-none">
          <p className=" mb-4">{product.description}</p>

          <h3 className="text-lg font-medium  mb-3">Key Features:</h3>
          <ul className="space-y-2">
            {product.specifications.map((spec, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span className="text-muted-foreground">{spec}</span>
              </li>
            ))}
          </ul>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="p-6 bg-card rounded-lg mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className=" p-6 rounded-lg">
              <h3 className="text-xl font-bold text-center mb-4">
                Ratings & Reviews
              </h3>

              <div className="flex flex-col items-center mb-6">
                <div className="text-4xl font-bold ">{product.rating}</div>
                <div className="flex text-yellow-400 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(product.rating) ? "fill-current" : "stroke-current"}`}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <div className="mt-2">Out of 5</div>
                <div className="mt-4">Total {totalReviews} Reviews</div>
              </div>

              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-16">{stars} Star</div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2 overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{
                          width:
                            totalReviews > 0
                              ? `${(starCounts[5 - stars] / totalReviews) * 100}%`
                              : "0%",
                        }}
                      ></div>
                    </div>
                    <div className="w-12 text-right">
                      {starCounts[5 - stars]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">
                {totalReviews} Review{totalReviews !== 1 ? "s" : ""} for{" "}
                {product.title}
              </h3>

              {totalReviews === 0 ? (
                <div className="py-8 text-center">
                  No reviews yet. Be the first to review this product!
                </div>
              ) : (
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">{review.user}</div>
                        <div className="text-sm">
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex text-yellow-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-current" : "stroke-current"}`}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>

                      <p className="">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <ReviewForm productId={product.id} />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="warranty" className="p-6 bg-card rounded-lg mt-2">
        <h3 className="text-xl font-bold mb-4">Warranty Policy</h3>
        <div className="prose max-w-none">
          <p className="mb-4">
            We stand behind the quality of our products. All items come with a
            manufacturer's warranty as specified below:
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <ShieldCheck className="text-primary" />
              </div>
              <div className="ml-3">
                <h4 className="text-lg font-medium text-primary">
                  Warranty Coverage
                </h4>
                <p className="mt-2 text-primary">
                  This product comes with a {product.warranty} warranty against
                  manufacturing defects.
                </p>
              </div>
            </div>
          </div>

          <h4 className="font-medium mt-6 mb-2">What's Covered:</h4>

          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Manufacturing defects in materials and workmanship</li>
            <li>Functional failures under normal use conditions</li>
            <li>Parts that fail due to manufacturing issues</li>
          </ul>

          <h4 className="font-medium mt-6 mb-2">What's Not Covered:</h4>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Damage caused by misuse, abuse, or neglect</li>
            <li>Normal wear and tear</li>
            <li>
              Damage from accidents, modifications, or improper installation
            </li>
            <li>Products used in commercial applications</li>
          </ul>

          <p className="text-muted-foreground mt-6">
            If you experience any issues with your product during the warranty
            period, please contact our customer support team with your proof of
            purchase.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="shipping" className="p-6 bg-card rounded-lg mt-2">
        <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
        <div className="prose max-w-none">
          <p className="text-muted-foreground mb-6">
            We offer fast and reliable shipping options to get your products to
            you as quickly as possible. Below are our standard shipping rates
            and delivery times:
          </p>

          <div className="bg-gray-200 dark:bg-gray-950 rounded-lg overflow-hidden border border-gray-200 mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Delivery Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Cost
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {shippingInfo.map((info, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-900"
                        : "bg-gray-50 dark:bg-gray-700"
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {info.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {info.deliveryTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {info.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h4 className="font-medium mt-6 mb-2">Important Notes:</h4>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>
              Delivery times are estimates and may vary based on location and
              product availability
            </li>
            <li>
              Orders placed after 3 PM will be processed the next business day
            </li>
            <li>We currently do not ship internationally</li>
            <li>Tracking information will be provided once your order ships</li>
          </ul>

          <p className="text-muted-foreground mt-6">
            For expedited shipping options or any shipping inquiries, please
            contact our customer support team.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
