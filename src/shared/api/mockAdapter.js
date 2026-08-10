import MockAdapter from 'axios-mock-adapter';
import api from './axiosClient';
import { ENDPOINTS, DRIVER_ENDPOINTS } from './endpoints';
import { mockMenu, mockBranches, mockCustomer, mockDriver, mockBuilderOptions } from './mockData';

const mock = new MockAdapter(api, { delayResponse: 400 });

// Menu
mock.onGet(ENDPOINTS.menu(1)).reply(200, mockMenu);

// Branches
mock.onGet(ENDPOINTS.branches).reply(200, mockBranches);

// Customer login — customer accounts only
mock.onPost(ENDPOINTS.customerLogin).reply((config) => {
  const { phone, password } = JSON.parse(config.data);

  if (phone === mockCustomer.phone && password === mockCustomer.password) {
    return [200, {
      customerId: mockCustomer.customerId,
      fullName: mockCustomer.fullName,
      role: 'customer',
      accessToken: 'mock-token-customer',
      refreshToken: 'mock-refresh-customer',
      expiresInSeconds: 3600,
    }];
  }

  return [401, { title: 'Invalid credentials', errorCode: 'INVALID_CREDENTIALS' }];
});

// Driver login — driver accounts only, separate endpoint per §7.2
mock.onPost(DRIVER_ENDPOINTS.driverLogin).reply((config) => {
  const { phone, password } = JSON.parse(config.data);

  if (phone === mockDriver.phone && password === mockDriver.password) {
    return [200, {
      customerId: mockDriver.driverId,
      fullName: mockDriver.fullName,
      role: 'driver',
      accessToken: 'mock-token-driver',
      refreshToken: 'mock-refresh-driver',
      expiresInSeconds: 3600,
    }];
  }

  return [401, { title: 'Invalid credentials', errorCode: 'INVALID_CREDENTIALS' }];
});

// Signup دايمًا بيسجل عميل بس — مطابق للدوكيومنتيشن، مفيش سجل درايفر ذاتي
// متغير بيحفظ بيانات آخر عميل سجل (محاكاة لقاعدة بيانات بسيطة)
let registeredCustomer = null;

mock.onPost(ENDPOINTS.customerSignup).reply((config) => {
  const { fullName, phone, address } = JSON.parse(config.data);

  // نحفظ البيانات الحقيقية اللي اليوزر كتبها
  registeredCustomer = {
    customerId: crypto.randomUUID(),
    fullName,
    phone,
    address: address || '',
  };

  return [201, {
    customerId: registeredCustomer.customerId,
    fullName: registeredCustomer.fullName,
    role: 'customer',
    accessToken: 'mock-token-new123',
    refreshToken: 'mock-refresh-new123',
    expiresInSeconds: 3600,
  }];
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

mock.onGet(ENDPOINTS.customerMe).reply(() => {
  // لو فيه حد عمل Signup في الجلسة دي، رجعي بياناته الحقيقية
  if (registeredCustomer) {
    return [200, registeredCustomer];
  }

  // غير كده، رجعي بيانات العميل التجريبي (لو دخل بـ Login العادي)
  return [200, {
    customerId: mockCustomer.customerId,
    fullName: mockCustomer.fullName,
    phone: mockCustomer.phone,
    address: mockCustomer.address,
  }];
});

export default mock;