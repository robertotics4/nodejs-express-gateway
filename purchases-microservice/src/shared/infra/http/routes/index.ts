import { Router } from 'express';
import crypto from 'node:crypto';

const router = Router();

const purchases = [
  {
    id: crypto.randomUUID(),
    user: {
      id: crypto.randomUUID(),
      name: 'Roberto',
    },
    products: [
      {
        id: 'd2ca708e-fcae-4602-9dee-7d29e3fdad2c',
        name: 'SSD Kingston',
      },
      {
        id: '82d343ef-66b4-4911-92fc-886f491c9948',
        name: 'Mouse Gamger Logitech',
      },
    ],
    date: new Date(),
  },
  {
    id: crypto.randomUUID(),
    user: {
      id: crypto.randomUUID(),
      name: 'Thiago',
    },
    products: [
      {
        id: '4a401161-b3fe-43e5-8a32-ee5c57793fc5',
        name: 'Playstation 4',
      },
      {
        id: '9de00a35-fa83-40fc-a2a4-3d7134ef4508',
        name: 'Monitor LG 29',
      },
    ],
    date: new Date(),
  },
];

router.get('/purchases', (request, response) => {
  const { username } = request.query;

  if (!username) {
    return response.json(purchases);
  }

  const filteredPurchases = username
    ? purchases.filter(purchase => purchase.user.name === username)
    : [];

  return response.json(filteredPurchases);
});

router.get('/purchases/:purchaseId', (request, response) => {
  const { purchaseId } = request.params;

  const purchase = purchases.find(purchase => purchase.id === purchaseId);

  if (!purchase) {
    return response.status(400).json({ message: 'Purchase not found.' });
  }

  return response.json(purchase);
});

export default router;
