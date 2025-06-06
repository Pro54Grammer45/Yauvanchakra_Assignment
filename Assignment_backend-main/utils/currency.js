// F:\Internship_Assignment_Sample\Assignment_backend-main\utils\currency.js

const currency = [
  {
    // Added 'title' as an object, assuming it contains display names for different languages
    title: { en: "Euro" }, // REQUIRED: Matches schema 'title: { type: Object, required: true }'
    // Added 'code' for the currency (e.g., ISO 4217 codes)
    code: "EUR",           // REQUIRED: Matches schema 'code: { type: String, required: true }'
    symbol: "€",           // Already present and correct
    // Corrected 'status' to match enum
    status: "Active",      // REQUIRED ENUM VALUE: Matches schema 'status: { enum: ["Active", "Inactive"] }'
    // 'name' field is not in schema but can be kept if not causing issues (Mongoose will ignore it)
    name: "Euro",
  },
  {
    title: { en: "Dollar" },
    code: "USD",
    symbol: "$",
    status: "Active",
    name: "Dollar",
  },
  {
    title: { en: "Pound" },
    code: "GBP",
    symbol: "£",
    status: "Active",
    name: "Pound",
  },
];

export default currency;