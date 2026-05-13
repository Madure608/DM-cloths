import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/WhatsApp Image 2026-05-13 at 4.18.03 PM.jpeg";

const SiteLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userToken, setUserToken] = useState(() =>
    localStorage.getItem("dm_user_token")
  );

  useEffect(() => {
    setUserToken(localStorage.getItem("dm_user_token"));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("dm_user_token");
    setUserToken(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-sand text-ink">
      <header className="sticky top-0 z-20 border-b border-stone/40 bg-sand/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em]"
          >
            <img
              src={logo}
              alt="Glowy by DM"
              className="h-10 w-10 rounded-full border border-stone/40 object-cover"
            />
            DM CLOTHS
          </Link>
          <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.25em] text-clay md:flex">
            <Link to="/">Home</Link>
            <Link to="/customize">Customize</Link>
            <a href="/#faq">FAQ</a>
            <Link to="/admin/login">Admin</Link>
          </nav>
          <div className="flex items-center gap-3">
            {userToken ? (
              <>
                <Link
                  to="/account"
                  className="rounded-full border border-clay px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                >
                  Account
                </Link>
                <button
                  type="button"
                  className="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sand"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-full border border-clay px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-sand"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-rose/40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 translate-x-1/3 rounded-full bg-ember/20 blur-3xl" />
        <Outlet />
      </main>

      <footer className="border-t border-stone/40 bg-sand/80">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="grid gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-clay">
              DM CLOTHS
            </p>
            <p className="text-sm text-clay">
              Custom tees with a refined, minimal process. Designed in Colombo,
              shipped island-wide.
            </p>
          </div>
          <div className="grid gap-2 text-xs uppercase tracking-[0.25em] text-clay">
            <Link to="/customize">Customize</Link>
            <Link to="/login">Sign in</Link>
            <Link to="/signup">Create account</Link>
          </div>
          <div className="grid gap-2 text-xs uppercase tracking-[0.25em] text-clay">
            <a href="/#faq">FAQ</a>
            <Link to="/admin/login">Admin</Link>
            <span className="text-[11px] text-clay">hello@dmcloths.lk</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
