import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bootstrapAdmin } from "../../api/admin";

const AdminSignup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "", ok: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "", ok: "" });

    try {
      await bootstrapAdmin({ username, email, password });
      setStatus({
        loading: false,
        error: "",
        ok: "Admin created. Please sign in.",
      });
      setTimeout(() => navigate("/admin/login"), 700);
    } catch (err) {
      setStatus({ loading: false, error: err.message, ok: "" });
    }
  };

  return (
    <main className="min-h-screen bg-mist px-6 py-12 text-ink">
      <section className="mx-auto w-full max-w-md rounded-3xl border border-borderSoft bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-brandOrange">
          Admin setup
        </p>
        <h1 className="mt-3 font-display text-3xl">Admin Signup</h1>
        <p className="mt-2 text-sm text-slate">
          Create the first admin account for DM CLOTHS.
        </p>
        <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm">
            <span className="text-slate">Username</span>
            <input
              className="h-11 rounded-2xl border border-borderSoft bg-white px-4 text-sm"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              autoComplete="username"
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-slate">Email</span>
            <input
              className="h-11 rounded-2xl border border-borderSoft bg-white px-4 text-sm"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
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
          {status.ok && (
            <p className="rounded-2xl border border-emerald/40 bg-emerald/10 px-4 py-2 text-sm text-emerald">
              {status.ok}
            </p>
          )}
          <button
            type="submit"
            className="h-11 rounded-full bg-brandOrange text-sm font-semibold uppercase tracking-[0.25em] text-white"
            disabled={status.loading}
          >
            {status.loading ? "Creating..." : "Create admin"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default AdminSignup;
