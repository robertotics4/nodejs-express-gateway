import { Router } from 'express';
import crypto from 'node:crypto';

const router = Router();

const products = [
  {
    id: crypto.randomUUID(),
    name: 'SSD Kingston',
    slug: 'ssd-kingston',
    price: 249.99,
  },
  {
    id: crypto.randomUUID(),
    name: 'Mouse Gamger Logitech',
    slug: 'mouse-gamer-logitech',
    price: 189.5,
  },
  {
    id: crypto.randomUUID(),
    name: 'Playstation 4',
    slug: 'playstation-4',
    price: 3999.99,
  },
  {
    id: crypto.randomUUID(),
    name: 'Monitor LG 29',
    slug: 'monitor-lg-29',
    price: 1499.9,
  },
];

router.get('/products', (request, response) => {
  const { name } = request.query;

  if (!name) {
    return response.json(products);
  }

  const filteredProducts = name
    ? products.filter(product => product.name === name)
    : [];

  return response.json(filteredProducts);
});

router.get('/products/:productId', (request, response) => {
  const { productId } = request.params;

  const product = products.find(product => product.id === productId);

  if (!product) {
    return response.status(400).json({ message: 'Product not found.' });
  }

  return response.json(product);
});

export default router;
