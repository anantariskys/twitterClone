import { Link } from "@remix-run/react";
import Button from "~/components/Button";
import InputField from "~/components/InputField";
import Toast from "../Toast";

interface RegisterFormProps {
  credential: {
    email: string;
    password: string;
    username: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  message?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  credential,
  handleChange,
  error,
  message,
}) => {
  return (
    <section className="max-w-xl w-full text-primary h-full flex relative flex-col px-16 justify-center">
      <div className="space-y-3 mb-6">
        {error && <Toast message={error} type="error" />}
        {message && <Toast message={message} type="success" />}
        <h2 className="text-4xl font-bold">Register</h2>
        <small className="">
          Mari bergabung untuk terhubung dan berbagi pemikiran Anda dengan
          dunia.
        </small>
      </div>

      <form method="post" className="bg-white">
        <InputField
          label="Username"
          type="text"
          id="username"
          name="username"
          value={credential.username}
          onChange={handleChange}
        />
        <InputField
          label="Email"
          type="email"
          id="email"
          name="email"
          value={credential.email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          id="password"
          value={credential.password}
          onChange={handleChange}
        />
        <Button width="w-full" type="submit" variant="default">
          Register
        </Button>
        <Link
          to={"/auth/login"}
          className="underline-offset-1 text-sm underline"
        >
          Sudah punya akun? login
        </Link>
      </form>
    </section>
  );
};

export default RegisterForm;
