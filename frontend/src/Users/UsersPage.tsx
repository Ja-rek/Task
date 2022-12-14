import * as React from "react";
import styled from "@emotion/styled";
import UsersGrid from "./UsersGrid";
import { Dispatch, useState } from "react";
import { User } from "./UserProps";
import UserAdd from "./UsersAdd";
import { Popover } from "@mui/material";
import UserEdit from "./UsersEdit";
import { seteuid } from "process";

export interface User2 {
  id: number;
  firstName: string;
  lastName: string;
  streetName: string;
  houseNumber: string;
  apartmentNumber: number | null;
  postalCode: string;
  town: string;
  phoneNumber: number;
  dateOfBirth: Date;
}
const StyledContainer = styled.div`
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const fetchUsers = (
  setLoading: Dispatch<React.SetStateAction<boolean>>, 
  setError: Dispatch<React.SetStateAction<boolean>>, 
  setUsers: Dispatch<React.SetStateAction<User[]>> ) => {
  setLoading(true);
  fetch("https://localhost:7192/user")
    .then((res) => res.json())
    .then(
      (result) => {
        setUsers(result);
        setError(false);
      },
      (error) => {
        setError(true);
      }
    );
  setLoading(false);
};

export default function UserPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [user, setUser] = useState<User | undefined>(undefined);


  React.useEffect(() => {
    fetchUsers(setLoading, 
      setError, 
      setUsers);
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleOpenEdit = (
    event: React.MouseEvent<HTMLButtonElement>,
    user: User
  ) => {
    setUser(user);
    setAnchorEl(event.currentTarget);
  };

  const handleEdit = (userData: User) => {
    setAnchorEl(null);
    const putMethod = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    fetch("https://localhost:7192/user/" + user?.id, putMethod)
      .then((response) => response.json())
      .then(
        (result) => {},
        (error) => {
          setError(true);
        }
      );
    fetchUsers(setLoading, 
      setError, 
      setUsers);
  };

  const handleDelete = (id: number) => {
    setAnchorEl(null);
    const deleteMethod = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("https://localhost:7192/user/" + id, deleteMethod)
      .then((response) => response.json())
      .then(
        (result) => {},
        (error) => {
          setError(true);
        }
      );

    fetchUsers(setLoading, 
      setError, 
      setUsers);
  };

  const handleSave = () => {
    setAnchorEl(null);
    users
      .filter((x) => x.isUnSaved)
      .forEach((dataUser) => {
        const putMethod = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: dataUser.id,
            firstName: dataUser.firstName,
            lastName: dataUser.lastName,
            streetName: dataUser.streetName,
            houseNumber: dataUser.houseNumber,
            postalCode: dataUser.postalCode,
            town: dataUser.town,
            phoneNumber: dataUser.phoneNumber,
            apartmentNumber: dataUser.apartmentNumber,
            dateOfBirth: dataUser.dateOfBirth,
          } as User2),
        };
        fetch("https://localhost:7192/user", putMethod)
          .then((response) => response.json())
          .then(
            (result) => {},
            (error) => {
              setError(true);
            }
          );
      });
    fetchUsers(setLoading, 
      setError, 
      setUsers);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCancel = () => {
    fetchUsers(setLoading, 
      setError, 
      setUsers);
  };

  return (
    <StyledContainer>
      <UsersGrid
        loading={loading}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleOpenEdit={handleOpenEdit}
        handleDelete={handleDelete}
        users={users}
        error={error}
      />
      <UserAdd
        user={undefined}
        handleSend={(user: User) =>
          setUsers((x) => [
            ...x,
            {
              ...user,
              isUnSaved: true,
              id: x.length > 0 ? Math.max(...x.map((y) => y.id)) + 1 : 1,
            },
          ])
        }
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <UserEdit user={user} handleSend={handleEdit} />
      </Popover>
    </StyledContainer>
  );
}
