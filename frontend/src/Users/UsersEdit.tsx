import { UsersFormProps } from "./UserProps";
import UserForm from "./UsersFormBase";

const UserEdit = (p: Omit<UsersFormProps, "title" | "buttonText">) => (
  <div style={{ padding: 60 }}>
    <UserForm title="Edit Row" {...p} buttonText="Save" />
  </div>
);
export default UserEdit;
