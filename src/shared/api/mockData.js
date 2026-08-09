import burger from "../../../attached_assets/cheese-Burger.jpg"
import chicken from "../../../attached_assets/crispychickensandwich.webp"
export const mockMenu = [
  {
    categoryKey: 'burgers',
    labelAr: 'البرجر',
    labelEn: 'Burgers',
    items: [
      { id: 1, nameAr: 'أورجينال', nameEn: 'Original', descriptionAr: 'قطعة برجر محشية جبنة', descriptionEn: 'Cheese-stuffed beef patty', price: 90, imageUrl: burger },
      { id: 2, nameAr: 'ريبابلك', nameEn: 'Republic', descriptionAr: 'قطعة برجر محشية جبنة، صوص شيدر', descriptionEn: 'Cheese-stuffed beef patty, cheddar sauce', price: 95, imageUrl: burger },
    ],
  },
  {
    categoryKey: 'chicken',
    labelAr: 'الفراخ',
    labelEn: 'Chicken',
    items: [
      { id: 3, nameAr: 'تشاكي تشكن', nameEn: 'Chucky Chicken', descriptionAr: 'قطع كريسبي تتيلا', descriptionEn: 'Crispy tortilla chicken bites', price: 95, imageUrl: chicken },
    ],
  },
];

export const mockBranches = [
  { id: 1, nameAr: 'سوهاج', nameEn: 'Sohag', hotLine: "010-8023-4407 / 010-8022-4405", etaMinMinutes: 25, etaMaxMinutes: 35 },
  { id: 2, nameAr: 'جرجا', nameEn: 'Girga', hotLine: "010-8022-4406", etaMinMinutes: 30, etaMaxMinutes: 45 },
];

// fake registered customer, for testing login
export const mockCustomer = {
  phone: '12345',
  password: '12345',
  customerId: 'mock-customer-1',
  fullName: 'Ahmed Sami',
};

export const mockDriver = {
  phone: '123456',
  password: '123456',
  driverId: 'mock-driver-1',
  fullName: 'Karim Adel',
};

export const mockBuilderOptions = [
  {
    groupKey: 'bun',
    isSingleSelect: true,
    options: [
      { id: 1, nameAr: 'كلاسيك بن', nameEn: 'Classic Bun', extraPrice: 0 },
      { id: 2, nameAr: 'بن بريوش', nameEn: 'Brioche Bun', extraPrice: 5 },
    ],
  },
  {
    groupKey: 'patty',
    isSingleSelect: true,
    options: [
      { id: 3, nameAr: 'بيف سنجل', nameEn: 'Beef Single', extraPrice: 0 },
      { id: 4, nameAr: 'بيف دبل', nameEn: 'Beef Double', extraPrice: 25 },
    ],
  },
  {
    groupKey: 'cheese',
    isSingleSelect: true,
    options: [
      { id: 5, nameAr: 'من غير جبنة', nameEn: 'No Cheese', extraPrice: 0 },
      { id: 6, nameAr: 'شيدر', nameEn: 'Cheddar', extraPrice: 8 },
    ],
  },
  {
    groupKey: 'sauce',
    isSingleSelect: true,
    options: [
      { id: 7, nameAr: 'باربكيو', nameEn: 'BBQ', extraPrice: 0 },
      { id: 8, nameAr: 'رانش', nameEn: 'Ranch', extraPrice: 0 },
    ],
  },
  {
    groupKey: 'toppings',
    isSingleSelect: false,
    options: [
      { id: 9, nameAr: 'بصل', nameEn: 'Onion', extraPrice: 3 },
      { id: 10, nameAr: 'مشروم', nameEn: 'Mushroom', extraPrice: 6 },
      { id: 11, nameAr: 'مخلل', nameEn: 'Pickles', extraPrice: 0 },
    ],
  },
];

