import MockAdapter from 'axios-mock-adapter';
import api from './axiosClient';
import { ENDPOINTS } from './endpoints';
import { mockMenu, mockBranches, mockCustomer, mockBuilderOptions } from './mockData';

const mock = new MockAdapter(api, { delayResponse: 400 });

// Menu
mock.onGet(ENDPOINTS.menu(1)).reply(200, mockMenu);

// Branches
mock.onGet(ENDPOINTS.branches).reply(200, mockBranches);

// Customer login
mock.onPost(ENDPOINTS.customerLogin).reply((config) => {
  const { phone, password } = JSON.parse(config.data);
  if (phone === mockCustomer.phone && password === mockCustomer.password) {
    return [
      200,
      {
        customerId: mockCustomer.customerId,
        fullName: mockCustomer.fullName,
        accessToken: 'mock-token-abc123',
        refreshToken: 'mock-refresh-abc123',
        expiresInSeconds: 3600,
      },
    ];
  }
  return [401, { title: 'Invalid credentials', errorCode: 'INVALID_CREDENTIALS' }];
});

// Customer signup — always succeeds for now
mock.onPost(ENDPOINTS.customerSignup).reply((config) => {
  const { fullName } = JSON.parse(config.data);
  return [
    201,
    {
      customerId: 'mock-customer-new',
      fullName,
      accessToken: 'mock-token-new123',
      refreshToken: 'mock-refresh-new123',
      expiresInSeconds: 3600,
    },
  ];
});

mock.onGet(ENDPOINTS.builderOptions).reply(200, mockBuilderOptions);

mock.onPost(ENDPOINTS.orders).reply((config) => {
  const body = JSON.parse(config.data);
  return [
    201,
    {
      orderId: crypto.randomUUID(),
      orderNumber: Math.floor(1000 + Math.random() * 9000),
      stage: 0,
      subtotal: body.subtotal,
      deliveryFee: body.deliveryFee,
      total: body.total,
      payment: { status: 'pending', method: body.paymentMethod },
      createdAt: new Date().toISOString(),
    },
  ];
});

// Customer confirms receipt
mock.onPost(new RegExp('/orders/.*/customer-received')).reply((config) => {
  return [200, { customerReceivedAt: new Date().toISOString() }];
});

// Submit review
mock.onPost(new RegExp('/orders/.*/review')).reply((config) => {
  const { rating, comment } = JSON.parse(config.data);
  return [
    201,
    {
      reviewId: crypto.randomUUID(),
      rating,
      comment,
      createdAt: new Date().toISOString(),
    },
  ];
});
export default mock;