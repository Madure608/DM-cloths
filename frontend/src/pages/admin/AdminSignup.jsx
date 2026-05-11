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
    <main className="min-h-screen bg-sand px-6 py-12 text-ink">
      <section className="mx-auto w-full max-w-md rounded-3xl border border-stone/40 bg-white/80 p-8 shadow-sm">
        <h1 className="font-display text-3xl">Admin Signup</h1>
        <p className="mt-2 text-sm text-clay">
          Create the first admin account for DM CLOTHS.
        </p>
        <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm">
            <span className="text-clay">Username</span>
            <input
              className="h-11 rounded-2xl border border-stone/40 bg-white px-4 text-sm"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
              autoComplete="username"
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-clay">Email</span>
            <input
              className="h-11 rounded-2xl border border-stone/40 bg-white px-4 text-sm"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
              type="email"
              required
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-clay">Password</span>
            <input
              className="h-11 rounded-2xl border border-stone/40 bg-white px-4 text-sm"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              type="password"
              autoComplete="new-password"
              required
            />
          </label>
          {status.error && (
            <p className="rounded-2xl border border-ember/40 bg-ember/10 px-4 py-2 text-sm text-ember">
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
            className="h-11 rounded-full bg-ink text-sm font-semibold uppercase tracking-[0.2em] text-sand"
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
