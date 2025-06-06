'use client';

import { Select } from "@windmill/react-ui";
import { UseFormRegister } from "react-hook-form";

interface SelectISOCodeProps {
  name: string;
  register: UseFormRegister<any>;
  required?: boolean;
  label: string;
}

const data = [
  "ab",
  "aa",
  "af",
  "sq",
  "am",
  "ar",
  "hy",
  "as",
  "ay",
  "az",
  "ba",
  "eu",
  "bn",
  "dz",
  "bh",
  "bi",
  "br",
  "bg",
  "my",
  "be",
  "km",
  "ca",
  "zh",
  "co",
  "hr",
  "cs",
  "da",
  "nl",
  "en",
  "eo",
  "et",
  "fo",
  "fa",
  "fj",
  "fi",
  "fr",
  "fy",
  "gl",
  "gd",
  "gv",
  "ka",
  "de",
  "el",
  "kl",
  "gn",
  "gu",
  "ha",
  "he",
  "hi",
  "hu",
  "is",
  "id",
  "ia",
  "ie",
  "iu",
  "ik",
  "ga",
  "it",
  "ja",
  "kn",
  "ks",
  "kk",
  "rw",
  "ky",
  "ru",
  "ko",
  "ku",
  "lo",
  "la",
  "lv",
  "li",
  "ln",
  "lt",
  "mk",
  "mg",
  "ms",
  "ml",
  "mt",
  "mi",
  "mr",
  "mo",
  "mn",
  "na",
  "ne",
  "no",
  "oc",
  "or",
  "om",
  "ps",
  "pl",
  "pt",
  "pa",
  "qu",
  "rm",
  "ro",
  "ru",
  "sg",
  "sa",
  "sr",
  "sh",
  "st",
  "tn",
  "sn",
  "sd",
  "si",
  "ss",
  "sk",
  "sl",
  "so",
  "es",
  "su",
  "sw",
  "sv",
  "tl",
  "tg",
  "ta",
  "tt",
  "te",
  "th",
  "bo",
  "ti",
  "to",
  "ts",
  "tr",
  "tk",
  "tw",
  "ug",
  "uk",
  "ur",
  "uz",
  "vi",
  "vo",
  "cy",
  "wo",
  "xh",
  "yi",
  "yo",
  "zu",
];

const SelectISOCode: React.FC<SelectISOCodeProps> = ({ 
  name, 
  register, 
  required = false, 
  label 
}) => {
  return (
    <Select
      name={name}
      {...register(name, {
        required: required ? `${label} is required!` : false,
      })}
      placeholder="Select status"
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      css={undefined}
      defaultValue=""
    >
      <option value=""  hidden>
        Default Iso Code
      </option>
      {data?.map((value, i) => (
        <option key={`${value}-${i}`} value={value}>
          {value}
        </option>
      ))}
    </Select>
  );
};

export default SelectISOCode;