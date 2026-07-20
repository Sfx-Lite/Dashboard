import { Link, NavLink } from "react-router";
import logo from "../../assets/images/sfx-logo.png";
import { motion } from "motion/react";

import CharmHome from "../icons/CharmHome";
import MaterialSymbolsShieldOutline from "../icons/MaterialSymbolsShieldOutline";
import LetsIconsUser from "../icons/LetsIconsUser";
import MiClock from "../icons/MiClock";
import BxWallet from "../icons/BxWallet";

const navigation = [
  {
    label: "Overview",
    href: "/",
    icon: CharmHome,
  },
  {
    label: "KYC Review",
    href: "/kyc-review",
    icon: MaterialSymbolsShieldOutline,
  },
  {
    label: "Users",
    href: "/users",
    icon: LetsIconsUser,
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: MiClock,
  },
  {
    label: "Master Wallet",
    href: "/master-wallet",
    icon: BxWallet,
  },
];

export default function Sidebar() {
  return (
    <nav className="isolate h-full w-full bg-sfx-ink p-[18px]">
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col space-y-6">
          <Link to="/" className="w-[90px]">
            <img
              src={logo}
              alt="Brand logo"
              className="w-full object-cover"
            />
          </Link>

          <ul className="space-y-1">
            {navigation.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                <NavLink to={href}>
                    {({ isActive }) => (
                    <div className="relative">
                        {isActive && (
                        <motion.div
                            layoutId="sidebar-active"
                            className="absolute inset-0 rounded-[var(--radius-field)] bg-sfx-primary"
                            transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                            }}
                        />
                        )}

                        <div className="relative z-10 flex items-center justify-between p-[var(--spacing-card-pad)]">
                          <div className="shrink-0 flex items-center gap-[var(--spacing-gutter)]">
                            <Icon className="text-[1.25rem] text-sfx-primary-tint" />
                            <span
                              className={`inline-block text-[14px] text-sfx-primary-tint ${isActive ? "font-rh-b" : "font-rh-m"}`}
                            >
                                {label}
                            </span>
                          </div>

                          {
                            href === "/kyc-review" && (
                              <span className={`shrink-0 inline-flex items-center justify-center font-rh-sb size-[20px] text-[12px] rounded-full ${isActive ? 'bg-sfx-card' : 'bg-sfx-danger text-sfx-card'}`}>
                                7
                              </span>
                            )
                          }
                        </div>
                    </div>
                    )}
                </NavLink>
                </li>
            ))}
            </ul>
        </div>

        <div className="flex flex-col space-y-1">
          <span className="text-[12px] text-sfx-muted">
            SFx Lite Admin
          </span>

          <span className="text-[12px] text-sfx-muted">
            v1.0 Amoy Testnet
          </span>
        </div>
      </div>
    </nav>
  );
}