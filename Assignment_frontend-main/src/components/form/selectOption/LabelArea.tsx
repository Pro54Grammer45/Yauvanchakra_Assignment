'use client';

import { Label } from "@windmill/react-ui";

interface LabelAreaProps {
  label: string;
}

const LabelArea: React.FC<LabelAreaProps> = ({ label }) => {
  return (
    <Label className="col-span-4 sm:col-span-2 font-medium text-sm">
      {label}
    </Label>
  );
};

export default LabelArea;