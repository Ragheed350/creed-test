import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const DeleteUserConfirm: React.FC = () => {
  return (
    <Box sx={{ minWidth: 360 }}>
      <Typography variant="subtitle2" noWrap>
        Are you sure you want to delete this user
      </Typography>
    </Box>
  );
};
