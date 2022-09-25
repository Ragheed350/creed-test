import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../core/hooks";
import { CreateUserAsync, DeleteUserAsync, FetchUsersAsync, ShowUserAsync, UpdateUserAsync } from "../../core/redux/user";
import { Card, Table, Tooltip, TableBody, IconButton, TableContainer, TablePagination, Box } from "@mui/material";
import useTable, { emptyRows } from "../../utils/hooks/useTable";
import TableSelectedActions from "../../components/TableSelectedActions";
import Iconify from "../../components/Iconify";
import TableHeadCustom from "../../components/TableHeadCustom";
import { UserTableRow } from "../../widgets/user";
import TableEmptyRows from "../../components/TableEmptyRows";
import TableNoData from "../../components/TableNoData";
import { ModalC } from "../../components/modal";
import { User } from "../../core/models";
import { DeleteUserConfirm } from "../../widgets/user/actions/DeleteUserConfirm";
import { NewEditUserForm } from "../../widgets/user/actions/NewEditUserForm";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const boxShadow = "rgb(145 158 171) 0px 0px 2px 0px, rgb(145 158 171 / 45%) 0px 12px 24px -4px";

const TABLE_HEAD = [
  { id: "userId", label: "ID", align: "left" },
  { id: "username", label: "User Name", align: "left" },
  { id: "email", label: "Email", align: "left" },
  { id: "company", label: "Company", align: "left" },
  { id: "" },
];

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, user, status } = useAppSelector((state) => state.Users);

  //modal
  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const [openEditModal, setopenEditModal] = useState(false);
  const [openAddModal, setopenAddModal] = useState(false);

  //actions
  const handleDeleteRow = (row: User) => {
    dispatch(ShowUserAsync(row));
    setopenDeleteModal(true);
  };
  const handleEditRow = (row: User) => {
    dispatch(ShowUserAsync(row));
    setopenEditModal(true);
  };
  const handleAddRow = () => {
    setopenAddModal(true);
  };
  const handleRefresh = () => {
    dispatch(FetchUsersAsync());
  };
  //......

  useEffect(() => {
    dispatch(FetchUsersAsync());
  }, [dispatch]);

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
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  return (
    <Card sx={{ boxShadow, m: 2, borderRadius: 3 }}>
      <ModalC
        title="Delete Confirm"
        open={openDeleteModal}
        handleClose={() => setopenDeleteModal(false)}
        handleOk={() => {
          user && dispatch(DeleteUserAsync([user.userId]));
          setopenDeleteModal(false);
        }}>
        <DeleteUserConfirm />
      </ModalC>

      <ModalC
        title="Edit User"
        open={openEditModal}
        footer={false}
        handleClose={() => setopenEditModal(false)}
        handleOk={() => user && dispatch(UpdateUserAsync(user))}>
        <NewEditUserForm
          isEdit
          user={user}
          onCancle={() => setopenEditModal(false)}
          onSubmit={(user) => {
            dispatch(UpdateUserAsync(user));
            setopenEditModal(false);
          }}
        />
      </ModalC>

      <ModalC title="Add User" open={openAddModal} footer={false}>
        <NewEditUserForm
          onCancle={() => setopenAddModal(false)}
          onSubmit={(user) => {
            dispatch(CreateUserAsync(user));
            setopenAddModal(false);
          }}
        />
      </ModalC>

      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ p: 1, m: 1, mt: 0 }}>
        <Button
          disabled={selected.length !== 0}
          sx={{ boxShadow, m: 1, borderRadius: 2 }}
          onClick={handleRefresh}
          variant="contained"
          startIcon={<Iconify icon={"eva:refresh-fill"} />}>
          Refresh
        </Button>
        <Button
          disabled={selected.length !== 0}
          sx={{ boxShadow, m: 1, borderRadius: 2 }}
          onClick={handleAddRow}
          variant="contained"
          startIcon={<Iconify icon={"eva:plus-fill"} />}>
          New User
        </Button>
      </Stack>

      <Box sx={{ position: "relative" }}>
        <Backdrop
          sx={{ color: "#fff", position: "absolute", top: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={status === "loading"}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <TableContainer sx={{ minWidth: "100%" }}>
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
                  onDeleteRow={() => handleDeleteRow(row)}
                  onEditRow={() => handleEditRow(row)}
                />
              ))}

              <TableEmptyRows height={52} emptyRows={emptyRows(page, rowsPerPage, users.length)} />

              <TableNoData isNotFound={users.length === 0 && status !== "loading"} />
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ position: "relative" }}>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Box>
      </Box>
    </Card>
  );
};
