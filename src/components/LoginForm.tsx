"use client";
import { useState } from "react";
import { useContext } from "react";
import { UserContext, UserContextType } from "../context/UserContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { profile, setProfile } =
    useContext<UserContextType | undefined>(UserContext) || {};

  function login() {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (setProfile) {
          setProfile(data);
        }
        console.log(data);
      });
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <form action={login}>
      <input
        type="email"
        name="email"
        onChange={handleEmailChange}
        value={email}
      />
      <input
        type="password"
        name="password"
        onChange={handlePasswordChange}
        value={password}
      />
      <button type="submit">Login</button>
    </form>
  );
}
