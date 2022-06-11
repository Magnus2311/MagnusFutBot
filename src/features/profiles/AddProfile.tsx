import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Alert } from "../common/Alert";
import { Button } from "../common/Button";
import TextBox from "../common/TextBox";
import { addProfile, selectProfiles } from "./profileActions";

export const AddProfile = () => {
  const navigate = useNavigate();
  const profilesState = useAppSelector(selectProfiles);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("iavor.orlyov1@gmail.com");
  const [password, setPassword] = useState("A123123123a");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      addProfile({
        email: email,
        password: password,
      })
    );

    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit}>
      {profilesState.status === "wrong-credentials" && (
        <Alert content="Wrong credentials" type="danger" />
      )}
      <TextBox
        handleChange={(e) => setEmail(e.target.value)}
        value={email}
        label="E-mail"
        name="email"
        placeholder="Enter your e-mail"
        type="text"
        autoFocus
      />
      <TextBox
        handleChange={(e) => setPassword(e.target.value)}
        value={password}
        label="Password"
        name="password"
        placeholder="Enter your password"
        type="password"
      />
      <Button>Add EA Profile</Button>
    </form>
  );
};
