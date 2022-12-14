import { Paper } from "@mui/material";
import { UsersFormProps } from "./UserProps";
import UserForm from "./UsersFormBase";

const UserAdd = (p: Omit<UsersFormProps, "title" | "buttonText">) => (
  <Paper style={{ margin: 60, padding: 60 }}>
    <UserForm title="Add user to table" buttonText="Add user" {...p} />
  </Paper>
);
export default UserAdd;
