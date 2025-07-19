export const categories = [
  "Car Parts & Accessories",
  "Bike Parts & Accessories",
  "Electrical & Electronics",
  "Industrial Equipment & Components",
  "Heavy Vehicle",
  "Hybrid Car Battery",
  "Tools & Hardware",
  "Electronics Devices & Accessories",
  "Health & Medicine",
  "Agriculture & Food",
  "Agricultural Machinery",
  "Wholesale Products",
];

export const getCategorySlug = (category) => {
  return category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

export const categoryIcons = {
  "Car Parts & Accessories": "🚗",
  "Bike Parts & Accessories": "🚲",
  "Electrical & Electronics": "🔌",
  "Industrial Equipment & Components": "🏭",
  "Heavy Vehicle": "🚚",
  "Hybrid Car Battery": "🔋",
  "Tools & Hardware": "🛠️",
  "Electronics Devices & Accessories": "📱",
  "Health & Medicine": "💊",
  "Agriculture & Food": "🌾",
  "Agricultural Machinery": "🚜",
  "Wholesale Products": "📦",
};
