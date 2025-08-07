import { useState } from "react";
import { Button } from "@components/Button";
import { Riple } from "react-loading-indicators";
import { handleLogin, handleSignUp } from "@services";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "../../routes/hooks";
import { RegisterStore } from "../../store/registerStore";

function validatePasswordPolicy(password: string): string | null {
  const errors = [];
  if (password.length < 8) errors.push("at least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("one uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("one lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("one number");
  if (!/[^A-Za-z0-9]/.test(password)) errors.push("one special character");

  return errors.length > 0
    ? "Password must contain " + errors.join(", ")
    : null;
}

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState("login");
  const { setAuthenticated } = useAuthStore();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setEmailAndPassword } = RegisterStore();

  const [formData, setFormData] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const switchMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setErrorMsg(null);
    setFormData({
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (mode === "login") {
        const error = await handleLogin({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          setErrorMsg(error);
        } else {
          router.push("/");
          setAuthenticated();
        }
      } else {
        if (formData.email !== formData.confirmEmail) {
          setErrorMsg("Emails do not match.");
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setErrorMsg("Passwords do not match.");
          return;
        }

        const passwordError = validatePasswordPolicy(formData.password);
        if (passwordError) {
          setErrorMsg(passwordError);
          return;
        }

        const error = await handleSignUp(formData.email);

        if (error) {
          setErrorMsg(error);
        } else {
          setEmailAndPassword(
            formData.email,
            formData.password,
            formData.firstName,
            formData.lastName
          );
          router.push("/otp");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center">
      <section className="bg-grey border-4 border-gold rounded-xl flex flex-col p-8 items-center w-80">
        <header>
          <h1 className="text-gold font-bold font-dancing text-5xl mb-5">
            {mode === "login" ? "Log In" : "Sign Up"}
          </h1>
        </header>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <label className="w-full">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="bg-grey border-2 border-gold rounded-md text-white p-1 m-2 w-full"
              required
            />
          </label>

          {mode === "signup" && (
            <>
              <label className="w-full">
                <input
                  type="email"
                  name="confirmEmail"
                  value={formData.confirmEmail}
                  onChange={handleChange}
                  placeholder="Confirm your email"
                  className="bg-grey border-2 border-gold rounded-md text-white p-1 m-2 w-full"
                  required
                />
              </label>

              <label className="w-full">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="bg-grey border-2 border-gold rounded-md text-white p-1 m-2 w-full"
                  required
                />
              </label>

              <label className="w-full">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="bg-grey border-2 border-gold rounded-md text-white p-1 m-2 w-full"
                  required
                />
              </label>
            </>
          )}

          <label className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="bg-grey border-2 border-gold rounded-md text-white p-1 m-2 w-full"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </label>

          {mode === "signup" && (
            <label className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="bg-grey border-2 border-gold rounded-md text-white p-1 m-2 w-full"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </label>
          )}

          {mode === "signup" && (
            <p className="text-xs text-gold mt-1 mb-2 text-left w-full">
              Password must contain:
              <br />– At least 8 characters
              <br />– One uppercase letter
              <br />– One lowercase letter
              <br />– One number
              <br />– One special character
            </p>
          )}

          {loading ? (
            <div className="mt-2 mb-4">
              <Riple color="#ECCB9A" size="large" text="" textColor="" />
            </div>
          ) : (
            <Button
              type="submit"
              disp={mode === "login" ? "Log In" : "Sign Up"}
            />
          )}

          {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}

          <button
            type="button"
            onClick={switchMode}
            className="mt-4 text-sm text-gold underline"
          >
            {mode === "login"
              ? "Don't have an account? Sign Up"
              : "Already have an account? Log In"}
          </button>
        </form>
      </section>
    </main>
  );
}




