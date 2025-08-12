"use client";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { toast } from "sonner";

const productSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(3, "Product name must be at least 3 characters"),
    slug: z
      .string()
      .min(3, "Slug must be at least 3 characters")
      .regex(
        /^[a-z0-9-]+$/,
        "Slug can only contain lowercase letters, numbers, and hyphens"
      ),
    regularPrice: z.number().min(0.01, "Regular price must be greater than 0"),
    purchasePrice: z
      .number()
      .min(0.01, "Purchase price must be greater than 0"),
    discountPrice: z.number().optional(),
    minPurchase: z
      .number()
      .min(1, "Minimum purchase must be at least 1")
      .default(1),
    maxPurchase: z.number().min(1, "Maximum purchase must be at least 1"),
    clubPoints: z.number().min(0, "Club points cannot be negative").default(0),
    shortDescription: z
      .string()
      .min(10, "Short description must be at least 10 characters"),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters"),
    status: z.enum(["Draft", "Active", "Inactive", "Archived"]),
    todaysDeal: z.boolean().default(false),
    category: z.string().min(1, "Category is required"),
    subcategory: z.string().optional(),
    brand: z.string().min(1, "Brand is required"),
    weight: z.number().min(0.01, "Weight must be greater than 0"),
    shippingCarrier: z.string().min(1, "Shipping carrier is required"),
    shippingFee: z.number().min(0, "Shipping fee cannot be negative"),
    multiplyShipping: z.boolean().default(false),
    thumbnail: z.string().min(1, "Thumbnail image is required"),
    gallery: z
      .array(z.string())
      .min(1, "At least one gallery image is required"),
    attributes: z.array(z.string()).optional(),
    taxRate: z
      .number()
      .min(0, "Tax rate cannot be negative")
      .max(100, "Tax rate cannot exceed 100%")
      .optional(),
    metaTitle: z.string().min(3, "Meta title must be at least 3 characters"),
    metaKeywords: z
      .string()
      .min(3, "Meta keywords must be at least 3 characters"),
    metaDescription: z
      .string()
      .min(10, "Meta description must be at least 10 characters"),
  })
  .refine((data) => data.maxPurchase >= data.minPurchase, {
    message:
      "Maximum purchase must be greater than or equal to minimum purchase",
    path: ["maxPurchase"],
  })
  .refine(
    (data) => !data.discountPrice || data.discountPrice <= data.regularPrice,
    {
      message: "Discount price cannot be higher than regular price",
      path: ["discountPrice"],
    }
  );

export const ProductForm = ({ initialData, onSubmit }) => {
  const router = useRouter();
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      regularPrice: 0,
      purchasePrice: 0,
      discountPrice: 0,
      minPurchase: 1,
      maxPurchase: 10,
      clubPoints: 0,
      shortDescription: "",
      description: "",
      status: "Draft",
      todaysDeal: false,
      category: "",
      subcategory: "",
      brand: "",
      weight: 0.5,
      shippingCarrier: "",
      shippingFee: 0,
      multiplyShipping: false,
      thumbnail: "",
      gallery: [],
      attributes: [],
      taxRate: 0,
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
    },
  });

  // Handle thumbnail upload
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
        setValue("thumbnail", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle gallery upload
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.warning("Maximum 3 images allowed in gallery");
      return;
    }

    const newFiles = [...galleryFiles, ...files].slice(0, 3);
    setGalleryFiles(newFiles);

    // Create preview URLs
    const newPreviews = [];
    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === newFiles.length) {
          setGalleryPreviews(newPreviews);
          setValue("gallery", newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove gallery image
  const removeGalleryImage = (index) => {
    const newFiles = [...galleryFiles];
    newFiles.splice(index, 1);
    setGalleryFiles(newFiles);

    const newPreviews = [...galleryPreviews];
    newPreviews.splice(index, 1);
    setGalleryPreviews(newPreviews);
    setValue("gallery", newPreviews);
  };

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setThumbnailPreview(initialData.thumbnail);
      setGalleryPreviews(initialData.gallery || []);
    } else {
      reset({
        name: "",
        slug: "",
        regularPrice: 0,
        purchasePrice: 0,
        discountPrice: 0,
        minPurchase: 1,
        maxPurchase: 10,
        clubPoints: 0,
        shortDescription: "",
        description: "",
        status: "Draft",
        todaysDeal: false,
        category: "",
        subcategory: "",
        brand: "",
        weight: 0.5,
        shippingCarrier: "",
        shippingFee: 0,
        multiplyShipping: false,
        thumbnail: "",
        gallery: [],
        attributes: [],
        taxRate: 0,
        metaTitle: "",
        metaKeywords: "",
        metaDescription: "",
      });
      setThumbnailPreview("");
      setThumbnailFile(null);
      setGalleryPreviews([]);
      setGalleryFiles([]);
    }
  }, [initialData, reset]);

  // Submit handler
  const onSubmitHandler = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      toast.success(
        `Product ${initialData ? "updated" : "created"} successfully`
      );
      router.push("/admin/products");
    } catch (error) {
      toast.error(
        `Failed to ${initialData ? "update" : "create"} product: ${error.message}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock data for dropdowns
  const categories = [
    "Brake Fluid",
    "Engine Oil",
    "Filters",
    "Spark Plugs",
    "Belts",
    "Batteries",
    "Tires",
    "Lighting",
    "Suspension",
  ];

  const subcategories = {
    "Brake Fluid": ["DOT 3", "DOT 4", "DOT 5", "DOT 5.1"],
    "Engine Oil": [
      "5W-30",
      "10W-40",
      "5W-40",
      "0W-20",
      "Synthetic",
      "Conventional",
    ],
    Filters: ["Air Filter", "Oil Filter", "Cabin Filter", "Fuel Filter"],
    "Spark Plugs": ["Iridium", "Platinum", "Copper", "Double Platinum"],
    Belts: ["Timing Belt", "Serpentine Belt", "V-Belt"],
    Batteries: ["Lead Acid", "AGM", "Gel", "Lithium"],
    Tires: ["All Season", "Summer", "Winter", "Performance"],
    Lighting: ["Halogen", "LED", "HID", "Fog Lights"],
    Suspension: ["Shocks", "Struts", "Coil Springs", "Control Arms"],
  };

  const brands = [
    "MOBIL",
    "TOTOTA",
    "CASTROL",
    "BOSCH",
    "VALVOLINE",
    "SHELL",
    "MICHELIN",
    "BRIDGESTONE",
    "ACDELCO",
    "NGK",
    "DENSO",
    "MANN FILTER",
  ];

  const shippingCarriers = [
    "Standard Shipping",
    "Express Shipping",
    "Overnight",
    "Local Delivery",
    "Pickup Only",
    "Freight",
    "International",
  ];

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-bold">
          {initialData ? "Edit Product" : "Create New Product"}
        </h1>
        <p className="text-muted-foreground">
          {initialData
            ? "Update product details"
            : "Add a new product to your inventory"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        {/* Basic Information Section */}
        <div className="bg-card p-6 border">
          <h3 className="text-xl font-semibold mb-6">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Title *</Label>
              <Input
                id="name"
                placeholder="Enter product title"
                {...register("name")}
                error={errors.name?.message}
              />
              {errors.name && (
                <p className="text-sm text-primary">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                placeholder="product-slug"
                {...register("slug")}
                error={errors.slug?.message}
              />
              {errors.slug && (
                <p className="text-sm text-primary">{errors.slug.message}</p>
              )}
            </div>

            <div className="flex w-full gap-6">
              <div className="space-y-2 w-full">
                <Label htmlFor="category">Category *</Label>
                <Select
                  onValueChange={(value) => {
                    setValue("category", value);
                    setValue("subcategory", "");
                  }}
                  defaultValue={watch("category")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-primary">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select
                  onValueChange={(value) => setValue("subcategory", value)}
                  defaultValue={watch("subcategory")}
                  disabled={!watch("category")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {watch("category") &&
                      subcategories[watch("category")]?.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex w-full gap-6">
              <div className="space-y-2 w-full">
                <Label htmlFor="brand">Brand *</Label>
                <Select
                  onValueChange={(value) => setValue("brand", value)}
                  defaultValue={watch("brand")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.brand && (
                  <p className="text-sm text-primary">{errors.brand.message}</p>
                )}
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="status">Product Status *</Label>
                <Select
                  onValueChange={(value) => setValue("status", value)}
                  defaultValue={watch("status")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-sm text-primary">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="todaysDeal"
                checked={watch("todaysDeal")}
                onCheckedChange={(checked) => setValue("todaysDeal", checked)}
              />
              <Label htmlFor="todaysDeal">Today's Deal</Label>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-card p-6 border">
          <h3 className="text-xl font-semibold mb-6">Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="regularPrice">Regular Price ($) *</Label>
              <Input
                id="regularPrice"
                type="number"
                step="0.01"
                min="0"
                {...register("regularPrice", { valueAsNumber: true })}
                error={errors.regularPrice?.message}
              />
              {errors.regularPrice && (
                <p className="text-sm text-primary">
                  {errors.regularPrice.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Purchase Price ($) *</Label>
              <Input
                id="purchasePrice"
                type="number"
                step="0.01"
                min="0"
                {...register("purchasePrice", { valueAsNumber: true })}
                error={errors.purchasePrice?.message}
              />
              {errors.purchasePrice && (
                <p className="text-sm text-primary">
                  {errors.purchasePrice.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountPrice">Discount Price ($)</Label>
              <Input
                id="discountPrice"
                type="number"
                step="0.01"
                min="0"
                {...register("discountPrice", { valueAsNumber: true })}
                error={errors.discountPrice?.message}
              />
              {errors.discountPrice && (
                <p className="text-sm text-primary">
                  {errors.discountPrice.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="minPurchase">Min Purchase Quantity *</Label>
              <Input
                id="minPurchase"
                type="number"
                min="1"
                {...register("minPurchase", { valueAsNumber: true })}
                error={errors.minPurchase?.message}
              />
              {errors.minPurchase && (
                <p className="text-sm text-primary">
                  {errors.minPurchase.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPurchase">Max Purchase Quantity *</Label>
              <Input
                id="maxPurchase"
                type="number"
                min="1"
                {...register("maxPurchase", { valueAsNumber: true })}
                error={errors.maxPurchase?.message}
              />
              {errors.maxPurchase && (
                <p className="text-sm text-primary">
                  {errors.maxPurchase.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="clubPoints">Club Points</Label>
              <Input
                id="clubPoints"
                type="number"
                min="0"
                {...register("clubPoints", { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* Descriptions Section */}
        <div className="bg-card p-6 border">
          <h3 className="text-xl font-semibold mb-6">Descriptions</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description *</Label>
              <Textarea
                id="shortDescription"
                placeholder="Brief description of the product"
                {...register("shortDescription")}
                className="min-h-[100px]"
                error={errors.shortDescription?.message}
              />
              {errors.shortDescription && (
                <p className="text-sm text-primary">
                  {errors.shortDescription.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Product Description *</Label>
              <Textarea
                id="description"
                placeholder="Detailed description of the product"
                {...register("description")}
                className="min-h-[200px]"
                error={errors.description?.message}
              />
              {errors.description && (
                <p className="text-sm text-primary">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Shipping Section */}
        <div className="bg-card p-6 border">
          <h3 className="text-xl font-semibold mb-6">Shipping Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (KG) *</Label>
              <Input
                id="weight"
                type="number"
                step="0.01"
                min="0.01"
                {...register("weight", { valueAsNumber: true })}
                error={errors.weight?.message}
              />
              {errors.weight && (
                <p className="text-sm text-primary">{errors.weight.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="shippingCarrier">Shipping Carrier *</Label>
              <Select
                onValueChange={(value) => setValue("shippingCarrier", value)}
                defaultValue={watch("shippingCarrier")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select carrier" />
                </SelectTrigger>
                <SelectContent>
                  {shippingCarriers.map((carrier) => (
                    <SelectItem key={carrier} value={carrier}>
                      {carrier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.shippingCarrier && (
                <p className="text-sm text-primary">
                  {errors.shippingCarrier.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="shippingFee">Flat Shipping Fee ($)</Label>
              <Input
                id="shippingFee"
                type="number"
                step="0.01"
                min="0"
                {...register("shippingFee", { valueAsNumber: true })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="multiplyShipping"
                checked={watch("multiplyShipping")}
                onCheckedChange={(checked) =>
                  setValue("multiplyShipping", checked)
                }
              />
              <Label htmlFor="multiplyShipping">
                Multiply shipping fee by quantity
              </Label>
            </div>
          </div>
        </div>

        {/* Media Section */}
        <div className="bg-card p-6 border">
          <h3 className="text-xl font-semibold mb-6">Product Media</h3>
          <div className="flex gap-10 items-end">
            {/* Thumbnail */}
            <div className="space-y-4">
              <Label>Thumbnail Image *</Label>
              <div className="flex flex-col gap-4">
                {thumbnailPreview ? (
                  <div className="relative">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-64 h-64 object-contain border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setThumbnailPreview("");
                        setThumbnailFile(null);
                        setValue("thumbnail", "");
                      }}
                      className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="bg-muted border-2 border-dashed rounded-lg w-64 h-64 flex flex-col items-center justify-center">
                    <span className="text-muted-foreground mb-2">
                      No thumbnail selected
                    </span>
                    <span className="text-4xl text-muted-foreground">+</span>
                  </div>
                )}

                <div>
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbnailChange}
                  />
                  <Label
                    htmlFor="thumbnail"
                    className="cursor-pointer w-64 bg-card border border-input rounded-md px-4 py-2 hover:bg-muted-foreground/20"
                  >
                    Choose Thumbnail
                  </Label>
                  <p className="text-xs text-primary mt-1">
                    Image Size Should Be 800×650
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="space-y-4">
              <Label>Gallery Images * (Max 3)</Label>
              <div className="flex flex-wrap gap-4">
                {galleryPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Gallery preview ${index + 1}`}
                      className="w-40 h-40 object-cover border rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-1 right-1 bg-red-500 rounded-full p-1"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}

                {galleryPreviews.length < 3 && (
                  <div className="bg-muted border-2 border-dashed rounded-lg w-40 h-40 flex flex-col items-center justify-center">
                    <span className="text-muted-foreground text-4xl">+</span>
                  </div>
                )}
              </div>

              <div>
                <input
                  type="file"
                  id="gallery"
                  accept="image/*"
                  className="hidden"
                  onChange={handleGalleryChange}
                  multiple
                />
                <Label
                  htmlFor="gallery"
                  className="cursor-pointer w-64 bg-card border border-input rounded-md px-4 py-2 hover:bg-muted-foreground/20"
                >
                  Choose Gallery Images
                </Label>
                <p className="text-xs text-primary mt-1">
                  Image Size Should Be 800×650
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Attributes and Tax */}
        <div className="bg-card p-6 border">
          <h3 className="text-xl font-semibold mb-6">Attributes & Tax</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Attributes</Label>
              <div className="border rounded-md p-4 min-h-[100px]">
                <p className="text-sm text-muted-foreground">
                  Attributes selection will be added later
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                min="0"
                max="100"
                {...register("taxRate", { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className="bg-card p-6 border">
          <h3 className="text-xl font-semibold mb-6">SEO Configuration</h3>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title *</Label>
                <Input
                  id="metaTitle"
                  placeholder="Enter meta title for SEO"
                  {...register("metaTitle")}
                  error={errors.metaTitle?.message}
                />
                {errors.metaTitle && (
                  <p className="text-sm text-primary">
                    {errors.metaTitle.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaKeywords">Meta Keywords *</Label>
                <Input
                  id="metaKeywords"
                  placeholder="comma, separated, keywords"
                  {...register("metaKeywords")}
                  error={errors.metaKeywords?.message}
                />
                {errors.metaKeywords && (
                  <p className="text-sm text-primary">
                    {errors.metaKeywords.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description *</Label>
              <Textarea
                id="metaDescription"
                placeholder="Enter meta description for SEO"
                {...register("metaDescription")}
                className="min-h-[100px]"
                error={errors.metaDescription?.message}
              />
              {errors.metaDescription && (
                <p className="text-sm text-primary">
                  {errors.metaDescription.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.push("/admin/products")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span>Processing...</span>
            ) : initialData ? (
              "Update Product"
            ) : (
              "Create Product"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
