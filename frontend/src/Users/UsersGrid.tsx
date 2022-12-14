import { DataGrid, GridColDef, GridSortModel, GridValueGetterParams } from "@mui/x-data-grid";
import { Button, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { UsersGridProps } from "./UserProps";
import { useMemo, useState } from "react";

const uColumns = ({handleDelete, handleOpenEdit}: Pick<UsersGridProps, "handleDelete" | "handleOpenEdit">): GridColDef[]  => [
  //{ field: 'id', headerName: 'ID', width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "streetName",
    headerName: "Street Name",
    width: 110,
  },
  {
    field: "houseNumber",
    headerName: "House Number",
    width: 110,
  },
  {
    field: "postalCode",
    headerName: "Postal Code",
    width: 110,
  },
  {
    field: "town",
    headerName: "Town",
    width: 110,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 110,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
  },
  {
    field: "apartmentNumber",
    headerName: "Apartment number",
    type: "number",
    width: 110,
  },
  {
    field: "dateOfBirth",
    headerName: "date of birth",
    type: "date",
    width: 110,
  },
  {
    field: "isUnSaved",
    headerName: "Status",
    sortable: true,
    width: 160,
    renderCell: (params) => {
      return (
        <>
          {params.value ? (
            <Typography variant="button" color="error">
              UnSaved
            </Typography>
          ) : (
            <Typography variant="button" color="secondary">
              Saved
            </Typography>
          )}
        </>
      );
    },
  },
  {
    field: "deleteButton",
    headerName: "Actions",
    description: "Actions column.",
    sortable: false,
    filterable: false,
    hideable: false,
    width: 160,
    renderCell: (params) => {
      return (
        <>
          <Button disabled={params.row.isUnSaved} onClick={(e) => handleOpenEdit(e, params.row)} size="small">
            Edit
          </Button>
          <Button disabled={params.row.isUnSaved} onClick={() => handleDelete(params.row.id)} size="small" color="error">
            Delete
          </Button>
        </>
      );
    },
  },
];

const UserBox = styled.div`
  height: 381px;
  width: 1300px;
`;

const UserGrid = ({ users, loading, error, handleCancel, handleOpenEdit, handleDelete, handleSave }: UsersGridProps) => {
   const [sortModel, setSortModel] = useState<GridSortModel | undefined>([
    {
      field: 'isUnSaved',
      sort: 'desc',
    },
  ]); 

  const columns = useMemo(() => uColumns({handleDelete, handleOpenEdit}), [handleOpenEdit, handleDelete])
  
  return (
    <Paper style={{ margin: 30, padding: 60 }}>
      <UserBox>
        <Typography variant="h4">User list</Typography>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          loading={loading}
          error={error}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </UserBox>
      <Button disabled={!users.some(x => x.isUnSaved)} onClick={handleSave} type="submit">Save</Button>
      <Button disabled={!users.some(x => x.isUnSaved)} onClick={handleCancel}>Cancel</Button>
    </Paper>
  );
};

export default UserGrid;
