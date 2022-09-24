// @mui
import { Checkbox, Typography, Stack, StackProps } from "@mui/material";

// ----------------------------------------------------------------------

interface Props extends StackProps {
  actions?: React.ReactNode;
  rowCount: number;
  numSelected: number;
  onSelectAllRows: (checked: boolean) => void;
}

export default function TableSelectedActions({ actions, rowCount, numSelected, onSelectAllRows, sx, ...other }: Props) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        px: 0.5,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9,
        height: 58,
        borderRadius: 0,
        position: "absolute",
        bgcolor: "#fff",
        ...sx,
      }}
      {...other}>
      <Checkbox
        indeterminate={numSelected > 0 && numSelected < rowCount}
        checked={rowCount > 0 && numSelected === rowCount}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectAllRows(event.target.checked)}
      />

      <Typography
        variant="subtitle1"
        sx={{
          ml: 2,
          flexGrow: 1,
          color: "primary.main",
        }}>
        {numSelected} selected
      </Typography>

      {actions && actions}
    </Stack>
  );
}
