import { useState } from "react";
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem } from "@mui/material";
import TableMoreMenu from "../../components/TableMoreMenu";
import Iconify from "../../components/Iconify";
import { User } from "../../core/models";
import { substringLongText } from "../../utils/helpers/substringLongText";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "../../utils/helpers/ToastConfigurator";

// ----------------------------------------------------------------------

type Props = {
  row: User;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }: Props) {
  const { userId, username, avatar, email, company } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Text Copied");
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left">
        <Tooltip title="Press to copy" placement="top-start">
          <Typography sx={{ cursor: "pointer" }} onClick={() => handleCopy(userId)}>
            {substringLongText({ text: userId })}
          </Typography>
        </Tooltip>
      </TableCell>

      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <Avatar alt={username} src={avatar} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {username}
        </Typography>
      </TableCell>

      <TableCell align="left">{email}</TableCell>

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
