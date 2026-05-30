import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/WhatsApp Image 2026-05-13 at 4.18.03 PM.jpeg";

const SiteLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userToken, setUserToken] = useState(() =>
    localStorage.getItem("dm_user_token")
  );
  const [activeMenu, setActiveMenu] = useState("");

  const megaMenus = {
    Women: [
      {
        title: "Clothing",
        items: ["Dresses", "Tops", "Sarees", "Skirts", "Denim"],
      },
      {
        title: "Collections",
        items: ["New arrivals", "Work edit", "Weekend", "Occasion"],
      },
      {
        title: "Accessories",
        items: ["Bags", "Jewelry", "Footwear", "Belts"],
      },
    ],
    Men: [
      {
        title: "Clothing",
        items: ["T-shirts", "Shirts", "Joggers", "Denim"],
      },
      {
        title: "Collections",
        items: ["New arrivals", "Essentials", "Streetwear"],
      },
      {
        title: "Accessories",
        items: ["Caps", "Bags", "Footwear"],
      },
    ],
    "Kids & baby": [
      {
        title: "Kids",
        items: ["Tops", "Bottoms", "Sets", "Sleepwear"],
      },
      {
        title: "Baby",
        items: ["Rompers", "Bodysuits", "Accessories"],
      },
      {
        title: "Collections",
        items: ["New arrivals", "Playtime", "Essentials"],
      },
    ],
    "Home & lifestyle": [
      {
        title: "Home",
        items: ["Bedding", "Cushions", "Candles"],
      },
      {
        title: "Lifestyle",
        items: ["Bottles", "Stationery", "Gifts"],
      },
      {
        title: "Collections",
        items: ["New arrivals", "Seasonal"],
      },
    ],
  };

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
      <header className="sticky top-0 z-30 bg-white shadow-sm">
        <div className="bg-brandOrange text-white">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-2 text-[11px] uppercase tracking-[0.3em]">
            <span>Site wide offer: flat 20% off</span>
            <span>Free delivery over Rs. 7,500</span>
          </div>
        </div>

        <div className="border-b border-borderSoft">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="DM Cloths"
                className="h-10 w-10 rounded-xl object-cover"
              />
              <span className="font-display text-2xl uppercase tracking-[0.35em] text-brandOrange">
                DM CLOTHS
              </span>
            </Link>

            <div className="flex min-w-[220px] flex-1 items-center gap-3 rounded-full border border-borderSoft bg-white px-4 py-2 shadow-sm focus-within:border-brandOrange">
              <input
                className="w-full border-none bg-transparent text-sm text-ink placeholder:text-slate/70 outline-none"
                placeholder="Search dresses, tees, sarees"
              />
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-brandOrange px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M10 3a7 7 0 1 0 4.47 12.4l4.07 4.07 1.42-1.42-4.07-4.07A7 7 0 0 0 10 3Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
                </svg>
                Search
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.25em] text-slate">
              <Link to="/cart" className="inline-flex items-center gap-2">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M7 18a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm10 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2ZM6.2 6l.5 2H20a1 1 0 0 1 1 .76l-1.4 6a2 2 0 0 1-2 1.56H9.1a2 2 0 0 1-2-1.6L5.4 6.6 5 4H3V2h3a1 1 0 0 1 1 .8Z" />
                </svg>
                Shopping cart
              </Link>
              <Link to="/account" className="inline-flex items-center gap-2">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12 21.2c-1.8-1.4-3.2-2.6-4.3-3.7-2.6-2.5-3.8-4.7-3.8-6.9A4.6 4.6 0 0 1 8.4 6c1.4 0 2.7.6 3.6 1.6A5 5 0 0 1 19.7 9c0 2.2-1.2 4.4-3.8 6.9-1.1 1.1-2.5 2.3-3.9 3.7l-.6.5-.6-.5Z" />
                </svg>
                My wish list
              </Link>
              {userToken ? (
                <button
                  type="button"
                  className="rounded-full border border-borderSoft px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              ) : (
                <Link
                  to="/login"
                  className="rounded-full border border-borderSoft px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>

        <div
          className="relative bg-brandOrange text-white"
          onMouseLeave={() => setActiveMenu("")}
        >
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-6 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.28em]">
            {[
              "New arrivals",
              "Women",
              "Men",
              "Kids & baby",
              "Health & beauty",
              "Home & lifestyle",
              "Gift vouchers",
              "Buy 1 get 1",
              "Sale",
            ].map((label) => {
              const hasMenu = Boolean(megaMenus[label]);
              if (hasMenu) {
                return (
                  <button
                    key={label}
                    type="button"
                    className="hover:text-white/80"
                    onMouseEnter={() => setActiveMenu(label)}
                  >
                    {label}
                  </button>
                );
              }
              return (
                <a
                  key={label}
                  href="/#collection"
                  className="hover:text-white/80"
                  onMouseEnter={() => setActiveMenu("")}
                >
                  {label}
                </a>
              );
            })}
          </div>

          {activeMenu && megaMenus[activeMenu] && (
            <div className="absolute left-0 right-0 top-full border-b border-borderSoft bg-white text-ink shadow-lg">
              <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-6 md:grid-cols-3">
                {megaMenus[activeMenu].map((group) => (
                  <div key={group.title} className="grid gap-3">
                    <p className="text-xs uppercase tracking-[0.3em] text-brandOrange">
                      {group.title}
                    </p>
                    <div className="grid gap-2 text-sm text-slate">
                      {group.items.map((item) => (
                        <a key={item} href="/#collection" className="hover:text-ink">
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="relative">
        <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-brandOrangeSoft/60 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 translate-x-1/3 rounded-full bg-rose/50 blur-3xl" />
        <Outlet />
      </main>

      <footer className="border-t border-borderSoft bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="grid gap-3">
            <p className="font-display text-2xl uppercase tracking-[0.35em] text-brandOrange">
              DM CLOTHS
            </p>
            <p className="text-sm text-slate">
              Fashion-forward drops, weekly arrivals, and island-wide delivery.
            </p>
            <div className="mt-4 h-px w-16 bg-brandOrange/30" />
          </div>
          <div className="grid gap-3 text-xs uppercase tracking-[0.28em] text-slate">
            <span className="text-[10px] text-slate/60">Shop</span>
            <Link to="/customize" className="hover:text-ink">
              Start customizing
            </Link>
            <a href="/#collection" className="hover:text-ink">
              New arrivals
            </a>
            <a href="/#faq" className="hover:text-ink">
              Size guide
            </a>
          </div>
          <div className="grid gap-3 text-xs uppercase tracking-[0.28em] text-slate">
            <span className="text-[10px] text-slate/60">Customer care</span>
            <span>Hotline: 076-364-9510</span>
            <span>hello@dmcloths.lk</span>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-slate">
              <a
                href="https://www.facebook.com/profile.php?id=61587798652228"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-ink"
              >
                Facebook
              </a>
              <span className="h-3 w-px bg-borderSoft" />
              <a
                href="https://tiktok.com/@glowy.clothes7"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-ink"
              >
                TikTok
              </a>
            </div>
            <Link
              to="/admin/login"
              className="mt-2 w-fit rounded-full border border-borderSoft px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink"
            >
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
