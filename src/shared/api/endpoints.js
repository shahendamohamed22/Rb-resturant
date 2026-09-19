
export const ENDPOINTS = {
  // Auth
  customerSignup: '/auth/customer/signup',
  customerLogin: '/auth/customer/login',
  driverLogin: '/auth/driver/login',
  refreshToken: '/auth/refresh',
  logout: '/auth/logout',

  // Customer profile
  customerMe: '/customers/me',

  // Public data
  branches: '/branches',
  menu: (branchId) => `/menu?branchId=${branchId}`,
  builderOptions: '/builder/options',

  // Orders — Customer
  orders: '/orders',
  myOrders: (page = 1, pageSize = 20) => `/orders/mine?page=${page}&pageSize=${pageSize}`,
  orderById: (orderId) => `/orders/${orderId}`,
  customerReceived: (orderId) => `/orders/${orderId}/customer-received`,
  submitReview: (orderId) => `/orders/${orderId}/review`,

  // Orders — Driver
  driverNewOrders: '/driver/orders/new',
  driverMyOrders: (status) => `/driver/orders/mine?status=${status}`,
  driverReceive: (orderId) => `/driver/orders/${orderId}/receive`,
  driverShip: (orderId) => `/driver/orders/${orderId}/ship`,
  driverDeliver: (orderId) => `/driver/orders/${orderId}/deliver`,

  // Payments
  paymentCharge: (orderId) => `/payments/${orderId}/charge`,
};