import { Button, Input, TextInput } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSessionSchema } from "schemas/src/session.schema";
import { logIn } from "../../api/auth";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setErrorText("");
  }, [email, password]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      createSessionSchema.parse(body);
      const data = await logIn(body);
      console.log(data);
      if (data.user) {
        setUser(data.user);
        window.localStorage.setItem("jwt", data.jwt);
        navigate("/");
      }
    } catch (error) {
      // If zod error
      if (error.issues) {
        setErrorText(error.issues[0].message);
        console.log(error?.issues[0]?.message);
      }
      console.log(error);
    }
  };

  return (
    <div className="h-[90vh] grid place-items-center">
      <div className="bg-slate-800 p-8 shadow rounded border border-slate-500">
        <h2 className="font-bold text-center mb-3 text-xl">Log In</h2>
        <form className="flex flex-col gap-2" onSubmit={submit}>
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {errorText && <div className="text-red-500">{errorText}</div>}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}
