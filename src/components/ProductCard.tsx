type ProductCardProps = {
  name: string;
  slug: string;
  price: string;
  image: string;
};

export default function ProductCard({
  name,
  slug,
  price,
  image,
}: ProductCardProps) {
  return (
    <a
    href={`/products/${slug}`}
      className="product-card"
      >
      <div className="product-image">
        <img src={image} alt={name} />
        <button className="wishlist">♡</button>
      </div>

      <div className="product-info">
        <h3>{name}</h3>
        <p>{price}</p>
      </div>
      </a>
  );
}