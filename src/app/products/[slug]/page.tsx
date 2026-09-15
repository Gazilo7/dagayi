import { products } from "@/lib/products";


type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return <h1>Product not found </h1>;
  }
  
  return (
  <main className="product-page">
    <div className="product-page-image">
      <img src={product.image} alt={product.name} />
    </div>

    <div className="product-page-info">
      <p className="eyebrow">DAGA&apos;YI — ESSENTIALS</p>

      <h1>{product.name}</h1>

      <p className="product-page-price">{product.price}</p>

      <p className="product-page-description">
        {product.description}
      </p>

      <div className="size-selector">
        <p>SELECT SIZE</p>

      <div className="size-options">
        {product.sizes.map((size) =>(
          <button key={size}>{size}</button>
        ))}
      </div>
      </div>

      <button className="add-to-cart">
        ADD TO CART
      </button>
    </div>
  </main>
);
}