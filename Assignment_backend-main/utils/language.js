const language = [
  {
    // These two fields are required by the schema
    title: { en: "Bangla", bn: "বাংলা" }, // Matches schema: required, type: Object
    code: "bn",                           // Matches schema: required, type: String

    // This field must be one of the enum values
    status: "Active",                     // Matches schema: enum ("Active" or "Inactive")

    // These fields are present in your data but NOT in the schema.
    // Mongoose will ignore them during insertion. This is fine.
    name: "Bangla",
    flag: "BD",
  },
  {
    title: { en: "English" },
    code: "en",
    status: "Active",
    name: "English",
    flag: "US",
  },
  {
    title: { en: "German", de: "Deutsch" },
    code: "de",
    status: "Active",
    name: "German",
    flag: "DE",
  },
  {
    title: { en: "Arabic", ar: "العربية" },
    code: "ar",
    status: "Active",
    name: "Arabic",
    flag: "SA",
  },
  {
    title: { en: "Hindi", hi: "हिन्दी" },
    code: "hi",
    status: "Active",
    name: "Hindi",
    flag: "IN",
  },
  {
    title: { en: "Urdu", ur: "اردو" },
    code: "ur",
    status: "Active",
    name: "Urdu",
    flag: "PK",
  },
];

export default language;