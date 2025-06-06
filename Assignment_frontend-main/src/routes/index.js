// Next.js 15 uses the /app or /pages directory for routing.
// The routes array and React.lazy imports are not needed.
// Only routeAccessList is kept for access control or sidebar usage.

const routeAccessList = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Products", value: "products" },
  { label: "Categories", value: "categories" },
  { label: "Attributes", value: "attributes" },
  { label: "Coupons", value: "coupons" },
  { label: "Customers", value: "customers" },
  { label: "Orders", value: "orders" },
  { label: "Staff", value: "our-staff" },
  { label: "Settings", value: "settings" },
  { label: "Languages", value: "languages" },
  { label: "Currencies", value: "currencies" },
  { label: "ViewStore", value: "store" },
  { label: "StoreCustomization", value: "customization" },
  { label: "StoreSettings", value: "store-settings" },
  { label: "Product Details", value: "product" },
  { label: "Order Invoice", value: "order" },
  { label: "Edit Profile", value: "edit-profile" },
  { label: "Customer Order", value: "customer-order" },
  { label: "Notification", value: "notifications" },
  { label: "Coming Soon", value: "coming-soon" },
];

export { routeAccessList };
