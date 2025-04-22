import { SvgIcon } from "@mui/material";

function AllAgeIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <rect x="0" y="0" width="32" height="32" rx="6" fill="#388e3c" />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
        fill="white"
        dy=".3em"
      >
        ALL
      </text>
    </SvgIcon>
  );
}

export default AllAgeIcon;
