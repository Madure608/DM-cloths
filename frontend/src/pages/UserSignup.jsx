import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/user";

const UserSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      const data = await registerUser({ name, email, password });
      localStorage.setItem("dm_user_token", data.token);
      navigate("/");
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    }
  };

  return (
    <main className="min-h-screen bg-mist px-6 py-12 text-ink">
      <section className="mx-auto w-full max-w-md rounded-3xl border border-borderSoft bg-white p-8 shadow-sm">
        <h1 className="font-display text-4xl">Create account</h1>
        <p className="mt-2 text-sm text-slate">
          Save your details for faster checkouts.
        </p>
        <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm">
            <span className="text-slate">Name</span>
            <input
              className="h-11 rounded-2xl border border-borderSoft bg-white px-4 text-sm"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              autoComplete="name"
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-slate">Email</span>
            <input
              className="h-11 rounded-2xl border border-borderSoft bg-white px-4 text-sm"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              type="email"
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-slate">Password</span>
            <input
              className="h-11 rounded-2xl border border-borderSoft bg-white px-4 text-sm"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              type="password"
              autoComplete="new-password"
              required
            />
          </label>
          {status.error && (
            <p className="rounded-2xl border border-brandOrange/30 bg-brandOrangeSoft px-4 py-2 text-sm text-brandOrange">
              {status.error}
            </p>
          )}
          <button
            type="submit"
            className="h-11 rounded-full bg-brandOrange text-sm font-semibold uppercase tracking-[0.2em] text-white"
            disabled={status.loading}
          >
            {status.loading ? "Creating..." : "Create account"}
          </button>
        </form>
        <p className="mt-6 text-xs text-slate">
          Already have an account?{" "}
          <Link className="text-ink underline" to="/login">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default UserSignup;
