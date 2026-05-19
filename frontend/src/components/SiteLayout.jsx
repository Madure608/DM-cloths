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
    <div className="min-h-screen bg-mist text-ink">
      <header className="sticky top-0 z-30 shadow-sm">
        <div className="bg-ink text-white">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-2 text-[11px] uppercase tracking-[0.3em]">
            <span>Delivering across Sri Lanka</span>
            <div className="flex flex-wrap items-center gap-4">
              <span>Hotline: 076-364-9510</span>
              <Link to="/admin/login" className="underline">
                Sell on DM
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-ink text-white">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-4 px-6 py-4">
            <Link to="/" className="flex items-center gap-3">
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-brandOrangeSoft">
                <img
                  src={logo}
                  alt="DM Cloths"
                  className="h-10 w-10 rounded-xl object-cover"
                />
              </span>
              <span className="font-display text-3xl tracking-[0.2em]">
                DM CLOTHS
              </span>
            </Link>

            <div className="flex min-w-[220px] flex-1 items-center gap-3 rounded-full border border-borderSoft bg-white px-4 py-2 shadow-sm">
              <input
                className="w-full border-none bg-transparent text-sm outline-none"
                placeholder="Search tees, colors, collections"
              />
              <button
                type="button"
                className="rounded-full bg-brandBlue px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              >
                Search
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/cart"
                className="rounded-full border border-borderSoft px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
              >
                Cart
              </Link>
              {userToken ? (
                <>
                  <Link
                    to="/account"
                    className="rounded-full border border-borderSoft px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                  >
                    My Account
                  </Link>
                  <button
                    type="button"
                    className="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-full border border-borderSoft px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-white/20">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-4 px-6 py-3 text-xs uppercase tracking-[0.25em] text-white/70">
              <Link to="/">Home</Link>
              <Link to="/customize">Customize</Link>
              <a href="/#collection">New arrivals</a>
              <a href="/#flash">Flash sale</a>
              <a href="/#faq">Support</a>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-brandOrangeSoft blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 translate-x-1/3 rounded-full bg-brandYellow/40 blur-3xl" />
        <Outlet />
      </main>

      <footer className="border-t border-white/20 bg-ink text-white">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="grid gap-3">
            <p className="font-display text-2xl tracking-[0.2em]">DM CLOTHS</p>
            <p className="text-sm text-white/70">
              Custom tees with a marketplace feel: fresh drops, fast checkout,
              and island-wide delivery.
            </p>
          </div>
          <div className="grid gap-2 text-xs uppercase tracking-[0.25em] text-white/70">
            <Link to="/customize">Start customizing</Link>
            <Link to="/login">My account</Link>
            <Link to="/signup">Create account</Link>
          </div>
          <div className="grid gap-2 text-xs uppercase tracking-[0.25em] text-white/70">
            <a href="/#faq">Help center</a>
            <Link
              to="/admin/login"
              className="w-fit rounded-full border border-white/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em]"
            >
              Admin
            </Link>
            <span className="text-[11px] text-white/70">hello@dmcloths.lk</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
