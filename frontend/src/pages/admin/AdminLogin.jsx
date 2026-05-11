import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAdmin } from "../../api/admin";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      const data = await loginAdmin({ username, password });
      localStorage.setItem("dm_admin_token", data.token);
      navigate("/admin");
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    }
  };

  return (
    <main className="min-h-screen bg-sand px-6 py-12 text-ink">
      <section className="mx-auto w-full max-w-md rounded-3xl border border-stone/40 bg-white/80 p-8 shadow-sm">
        <h1 className="font-display text-3xl">Admin Login</h1>
        <p className="mt-2 text-sm text-clay">
          Secure access for DM CLOTHS inventory.
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
            <span className="text-clay">Password</span>
            <input
              className="h-11 rounded-2xl border border-stone/40 bg-white px-4 text-sm"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              required
            />
          </label>
          {status.error && (
            <p className="rounded-2xl border border-ember/40 bg-ember/10 px-4 py-2 text-sm text-ember">
              {status.error}
            </p>
          )}
          <button
            type="submit"
            className="h-11 rounded-full bg-ink text-sm font-semibold uppercase tracking-[0.2em] text-sand"
            disabled={status.loading}
          >
            {status.loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-xs text-clay">
          Need to create the first admin?{" "}
          <Link className="text-ink underline" to="/admin/signup">
            Bootstrap admin
          </Link>
        </p>
      </section>
    </main>
  );
};

export default AdminLogin;
