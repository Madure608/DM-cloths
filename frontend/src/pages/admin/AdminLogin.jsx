import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAdminStatus, loginAdmin } from "../../api/admin";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: "" });
  const [hasAdmin, setHasAdmin] = useState(true);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadStatus = async () => {
      try {
        const data = await fetchAdminStatus();
        if (isMounted) {
          setHasAdmin(Boolean(data?.hasAdmin));
        }
      } catch (err) {
        if (isMounted) {
          setHasAdmin(true);
        }
      } finally {
        if (isMounted) {
          setChecking(false);
        }
      }
    };

    loadStatus();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });

    try {
      const data = await loginAdmin({ email, password });
      localStorage.setItem("dm_admin_token", data.token);
      navigate("/admin");
    } catch (err) {
      setStatus({ loading: false, error: err.message });
    }
  };

  return (
    <main className="min-h-screen bg-mist px-6 py-12 text-ink">
      <section className="mx-auto w-full max-w-md rounded-3xl border border-borderSoft bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-brandOrange">
          Admin access
        </p>
        <h1 className="mt-3 font-display text-3xl">Admin Login</h1>
        <p className="mt-2 text-sm text-slate">
          Secure access for DM CLOTHS inventory.
        </p>
        <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
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
              autoComplete="current-password"
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
            className="h-11 rounded-full bg-brandOrange text-sm font-semibold uppercase tracking-[0.25em] text-white"
            disabled={status.loading}
          >
            {status.loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="mt-5 flex items-center justify-center text-sm text-slate">
          <span>New here?</span>
          <Link
            className="ml-2 font-semibold text-brandOrange underline-offset-4 hover:underline"
            to="/admin/signup"
          >
            Create an admin account
          </Link>
        </div>
        {!checking && !hasAdmin && (
          <div className="mt-6 rounded-2xl border border-borderSoft bg-cream px-4 py-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate">
              No admin found
            </p>
            <p className="mt-2 text-sm text-slate">
              Create the first admin account to start managing inventory.
            </p>
            <Link
              className="mt-4 inline-flex h-10 items-center rounded-full bg-brandOrange px-5 text-xs font-semibold uppercase tracking-[0.25em] text-white"
              to="/admin/signup"
            >
              Create admin account
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminLogin;
