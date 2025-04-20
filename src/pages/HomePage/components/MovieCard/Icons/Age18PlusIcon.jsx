import { SvgIcon } from "@mui/material";

function Age18PlusIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <rect x="0" y="0" width="32" height="32" rx="6" fill="#d32f2f" />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill="white"
        dy=".3em"
      >
        18+
      </text>
    </SvgIcon>
  );
}

export default Age18PlusIcon;
