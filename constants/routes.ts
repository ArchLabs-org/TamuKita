export const ROUTES = {
  // Marketing
  home: "/",
  pricing: "/pricing",
  templates: "/templates",
  demo: "/demo",
  // Auth
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  // Dashboard
  dashboard: "/dashboard",
  weddings: "/dashboard/weddings",
  guests: "/dashboard/guests",
  themes: "/dashboard/themes",
  settings: "/dashboard/settings",
  // API
  apiAuth: "/api/auth",
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.home,
  ROUTES.pricing,
  ROUTES.templates,
  ROUTES.demo,
  ROUTES.login,
  ROUTES.register,
  ROUTES.forgotPassword,
  ROUTES.resetPassword,
];

export const AUTH_ROUTES = [ROUTES.login, ROUTES.register];
export const PROTECTED_ROUTES = [
  ROUTES.dashboard,
  ROUTES.weddings,
  ROUTES.guests,
  ROUTES.themes,
  ROUTES.settings,
];
