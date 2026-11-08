import { createClient } from "@/lib/supabase/server";
import { ProductActions } from "@/components/ProductActions";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type AvailableVariant = {
  id: string;
  size: string;
  color: string | null;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      price,
      description,
      image_url,
      product_variants (
        id,
        size,
        color,
        is_active
      )
    `)
    .eq("slug", slug)
    .eq("is_active", true)
    .eq("product_variants.is_active", true)
    .maybeSingle();

  if (error) {
    console.error("Error fetching product:", error);
  }

  if (!product) {
    return <h1>Product not found</h1>;
  }

  const sizes = [
    ...new Set(
      (product.product_variants ?? []).map(
        (variant) => variant.size
      )
    ),
  ];

  const { data: availableVariantRows, error: availabilityError } =
    await supabase.rpc("get_available_variants", {
      product_uuid: product.id,
    });

  if (availabilityError) {
    console.error(
      "Error fetching available variants:",
      availabilityError
    );
  }

  const availableVariants: AvailableVariant[] =
    (availableVariantRows ?? []) as AvailableVariant[];

  const availableSizes = [
    ...new Set(
      availableVariants.map((variant) => variant.size)
    ),
  ];

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(product.price));

  const cartProduct = {
    name: product.name,
    slug: product.slug,
    price: formattedPrice,
    image: product.image_url ?? "",
  };

  return (
    <main className="product-page">
      <div className="product-page-image">
        <img
          src={product.image_url ?? ""}
          alt={product.name}
        />
      </div>

      <div className="product-page-info">
        <p className="eyebrow">DAGA&apos;YI — ESSENTIALS</p>

        <h1>{product.name}</h1>

        <p className="product-page-price">{formattedPrice}</p>

        <p className="product-page-description">
          {product.description}
        </p>

        <ProductActions
          sizes={sizes}
          availableSizes={availableSizes}
          variants={availableVariants}
          product={cartProduct}
        />
      </div>
    </main>
  );
}