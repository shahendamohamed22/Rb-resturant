// Centralized route constants for the Customer Web App only.
// Matches §7.1, §7.3, §7.4, §7.7 of the documentation.

export const ENDPOINTS = {
  // §7.1 Auth — Customer
  customerSignup: '/auth/customer/signup',
  customerLogin: '/auth/customer/login',
  refreshToken: '/auth/refresh',
  customerMe: '/customers/me',

  // §7.3 Menu & Branches (public, read-only)
  branches: '/branches',
  menu: (branchId) => `/menu?branchId=${branchId}`,
  builderOptions: '/builder/options',

  // §7.4 Orders — Customer
  orders: '/orders',
  myOrders: '/orders/mine',
  orderById: (orderId) => `/orders/${orderId}`,
  customerReceived: (orderId) => `/orders/${orderId}/customer-received`,
  submitReview: (orderId) => `/orders/${orderId}/review`,

  // §7.7 Payments
  paymentCharge: (orderId) => `/payments/${orderId}/charge`,
};