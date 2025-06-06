'use client';

import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FC } from "react";

interface TooltipProps {
  id: string;
  Icon: FC;
  title: string;
  bgColor: string;
}

const Tooltip: React.FC<TooltipProps> = ({ id, Icon, title, bgColor }) => {
  return (
    <>
      <p data-tooltip-id={id} className="text-xl">
        <Icon />
      </p>
      <ReactTooltip id={id} style={{ backgroundColor: bgColor }}>
        <span className="text-sm font-medium">{title}</span>
      </ReactTooltip>
    </>
  );
};

export default Tooltip;
