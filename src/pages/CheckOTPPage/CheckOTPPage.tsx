import { useState } from "react";
import { Button } from "@components/Button";
import { useRouter } from "../../routes/hooks";
import { RegisterStore } from "../../store/registerStore";
import axiosInstance from "../../libs";

export default function CheckOTPPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { email, password, firstName, lastName } = RegisterStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!/^\d{6}$/.test(otp)) {
      setError("OTP must be a 6-digit number.");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("register/otp", {
        otp,
        email,
        profile:{
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password
        },
        temporary: false
      });

      if (response.status === 202) {
        router.push("/auth");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Something went wrong.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center">
      <section className="bg-grey border-4 border-gold rounded-xl flex flex-col p-8 items-center w-80">
        <h1 className="text-gold font-bold text-3xl mb-4">Enter OTP</h1>
        <p className="text-sm text-white mb-4 text-center">
          An OTP has been sent to <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <input
            type="text"
            inputMode="numeric"
            pattern="\d{6}"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            className="bg-grey border-2 border-gold rounded-md text-white p-2 m-2 w-full text-center tracking-widest text-lg"
            required
          />

          <Button type="submit" disp={loading ? "Verifying..." : "Verify OTP"} />
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </form>
      </section>
    </main>
  );
}

