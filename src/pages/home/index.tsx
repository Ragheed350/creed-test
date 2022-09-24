import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../core/hooks";
import { DeleteUserAsync, FetchUsersAsync, UpdateUserAsync } from "../../core/redux/user";
import { Card, Table, Tooltip, TableBody, IconButton, TableContainer } from "@mui/material";
import useTable, { emptyRows } from "../../utils/hooks/useTable";
import TableSelectedActions from "../../components/TableSelectedActions";
import Iconify from "../../components/Iconify";
import TableHeadCustom from "../../components/TableHeadCustom";
import { UserTableRow } from "../user";
import TableEmptyRows from "../../components/TableEmptyRows";
import TableNoData from "../../components/TableNoData";

const TABLE_HEAD = [
  { id: "userId", label: "ID", align: "left" },
  { id: "username", label: "User Name", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "birthdate", label: "Birthdate", align: "left" },
  { id: "company", label: "Company", align: "left" },
  { id: "" },
];

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.Users);

  useEffect(() => {
    dispatch(FetchUsersAsync());
    console.log(users);
  }, []);

  const {
    page,
    order,
    rowsPerPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
  } = useTable();

  return (
    <Card>
      <TableContainer sx={{ minWidth: 800, position: "relative" }}>
        {selected.length > 0 && (
          <TableSelectedActions
            numSelected={selected.length}
            rowCount={users.length}
            onSelectAllRows={(checked) =>
              onSelectAllRows(
                checked,
                users.map((row) => row.userId)
              )
            }
            actions={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={() => dispatch(DeleteUserAsync(selected))}>
                  <Iconify icon={"eva:trash-2-outline"} />
                </IconButton>
              </Tooltip>
            }
          />
        )}

        <Table size={"medium"}>
          <TableHeadCustom
            order={order}
            headLabel={TABLE_HEAD}
            rowCount={users.length}
            numSelected={selected.length}
            onSort={onSort}
            onSelectAllRows={(checked) =>
              onSelectAllRows(
                checked,
                users.map((row) => row.userId)
              )
            }
          />

          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <UserTableRow
                key={row.userId}
                row={row}
                selected={selected.includes(row.userId)}
                onSelectRow={() => onSelectRow(row.userId)}
                onDeleteRow={() => dispatch(DeleteUserAsync(row.userId))}
                onEditRow={() => dispatch(UpdateUserAsync(row.username))}
              />
            ))}

            <TableEmptyRows height={52} emptyRows={emptyRows(page, rowsPerPage, users.length)} />

            <TableNoData isNotFound={users.length === 0} />
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
