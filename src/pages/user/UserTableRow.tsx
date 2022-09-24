import { useState } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem } from "@mui/material";
// @types
// components
import Label from "../../components/Label";
import Iconify from "../../components/Iconify";
import TableMoreMenu from "../../components/TableMoreMenu";
import { User } from "../../core/models";
import moment from "moment";

// ----------------------------------------------------------------------

type Props = {
  row: User;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }: Props) {
  const theme = useTheme();

  const { userId, username, avatar, email, birthdate, company } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left">{userId}</TableCell>

      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <Avatar alt={username} src={avatar} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {username}
        </Typography>
      </TableCell>

      <TableCell align="left">{email}</TableCell>

      <TableCell align="left">{moment(birthdate).format("YYYY-MM-DD")}</TableCell>

      <TableCell align="left">{company}</TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: "error.main" }}>
                <Iconify icon={"eva:trash-2-outline"} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}>
                <Iconify icon={"eva:edit-fill"} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
