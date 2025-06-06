'use client';

import useUtilsFunction from "@/hooks/useUtilsFunction";

interface Language {
  _id: string;
  flag: string;
  name: string;
  iso_code: string;
}

interface SelectLanguageProps {
  handleLanguageChange: (language: Language) => void;
}

const SelectLanguage: React.FC<SelectLanguageProps> = ({ handleLanguageChange }) => {
  const { languages, langError, langLoading } = useUtilsFunction();

  return (
    <ul className="dropdown-content w-full">
      {!langError &&
        !langLoading &&
        languages?.map((lang: Language) => (
          <li
            className="cursor-pointer flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            onClick={() => handleLanguageChange(lang)}
            key={lang._id}
          >
            <div
              className="flag bg-start"
              style={{
                backgroundImage: `url(https://flagcdn.com/w20/${lang.flag.toLowerCase()}.png)`,
              }}
            ></div>
            <span className="text-gray-900 dark:text-gray-600 pr-8 text-right">
              {lang?.name}
            </span>
          </li>
        ))}
    </ul>
  );
};

export default SelectLanguage;