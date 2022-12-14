import TextField from "@mui/material/TextField";
import { Button, Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { UsersFormProps } from "./UserProps";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMemo } from "react";

const formFields: { label: string; name: string; validation: any }[] = [
  {
    label: "First name",
    name: "firstName",
    validation: yup.string().required(),
  },
  { label: "Last name", name: "lastName", validation: yup.string().required() },
  {
    label: "Street name",
    name: "streetName",
    validation: yup.string().required(),
  },
  {
    label: "house Number",
    name: "houseNumber",
    validation: yup.string().required(),
  },
  { label: "Apartment number", name: "apartmentNumber", validation: yup.number() },
  {
    label: "Postal code",
    name: "postalCode",
    validation: yup.string().required(),
  },
  { label: "Town", name: "town", validation: yup.string().required() },
  {
    label: "Phone number",
    name: "phoneNumber",
    validation: yup.number().required(),
  },
  {
    label: "Date of birth",
    name: "dateOfBirth",
    validation: yup.date().required(),
  },
];

const FormWrap = styled.form`
  display: grid;
  grid-template-columns: 350px 350px;
  grid-gap: 20px;
`;

const UserForm = ({ handleSend, title, buttonText, user }: UsersFormProps) => {
  const schema = useMemo(
    () =>
      formFields.reduce(
        (acc, cur) => ({ ...acc, [cur.name]: cur.validation }),
        {}
      ),
    []
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(yup.object(schema)),
  });

  return (
    <>
      <Typography variant="h4">{title}</Typography>
      <FormWrap
        autoComplete="off"
        onSubmit={handleSubmit((data: any) => handleSend(data))}
      >
        {formFields.map((formfield) =>
          formfield.name !== "dateOfBirth" ? (
            <Controller
              name={formfield.name}
              control={control}
              rules={{ required: true }}
              defaultValue={(user as any)?.[formfield.name] ?? ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={formfield.label}
                  error={!!errors?.[formfield.name]}
                  helperText={errors?.[formfield.name]?.message?.toString()}
                />
              )}
            />
          ) : (
            <Controller
              name={formfield.name}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={formfield.label}
                  type="date"
                  error={!!errors?.[formfield.name]}
                  helperText={errors?.[formfield.name]?.message?.toString()}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          )
        )}
        <Button type="submit">{buttonText}</Button>
      </FormWrap>
    </>
  );
};

export default UserForm;
