import React from "react";
import InputField from "../InputField";
import Button from "../Button";
import { Link } from "@remix-run/react";
import Toast from "../Toast";

interface LoginFormPropss {
  credential: {
    email: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  message?: string;
}
const LoginForm: React.FC<LoginFormPropss> = ({
  credential,
  handleChange,
  error,
  message,
}) => {
  return (
    <section className="max-w-xl w-full text-primary    h-full flex flex-col px-16 justify-center">
      <div className="space-y-3 mb-6">
        {error && <Toast message={error} type="error" />}
        {message && <Toast message={message} type="success" />}
        <h2 className="text-4xl font-bold">Login</h2>
        <small>
          {" "}
          Masuk untuk terhubung dan berbagi pemikiran Anda dengan dunia.
        </small>
      </div>

      <form method="post" className="bg-white ">
        <InputField
          label="Email"
          type="email"
          name="email"
          id="email"
          value={credential.email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          type="password"
          id="password"
          name="password"
          value={credential.password}
          onChange={handleChange}
        />
        <Button width="w-full" type="submit" variant="default">
          Login
        </Button>
        <Link
          to={"/auth/register"}
          className="underline-offset-1 underline  text-sm"
        >
          Belum punya akun? register
        </Link>
      </form>
    </section>
  );
};

export default LoginForm;
