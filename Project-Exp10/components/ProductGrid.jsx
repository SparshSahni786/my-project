import React from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const ProductGrid = ({ category }) => {
  const displayedProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  const title = category ? category : 'Our Products';

  return (
    <div className="py-12 bg-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-white mb-8">{title}</h2>
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
