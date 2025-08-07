import { lazy, Suspense } from "react";
import { DashboardLayout } from "../layouts/Dashboard";
import { AuthLayout } from "../layouts/Auth";
import { SearchLayout } from "../layouts/Search/layout";
import { Riple } from "react-loading-indicators";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

export const Homepage = lazy(() => import("../pages/Home"));
export const Dossier = lazy(() => import("../pages/Dossier"));
export const AuthPage = lazy(() => import("../pages/Auth"));
export const Page404 = lazy(() => import("../pages/404"));
export const SearchPage = lazy(() => import("../pages/Search"));
export const ProfilePage = lazy(() => import("../pages/Profile"));
export const DossierDetail = lazy(() => import("../pages/DossierDetail"));
export const CreateDossierPage = lazy(() => import("../pages/CreateDossier"));
export const CheckOTPPage = lazy(() => import("../pages/CheckOTPPage"));

export function Router() {
  const loading = <Riple color="#ECCB9A" size="large" text="" textColor="" />;

  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={loading}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <Homepage />, index: true },
        { path: "dossiers", element: <Dossier /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "profile/:id", element: <ProfilePage /> },
        { path: "dossier", element: <DossierDetail /> },
        { path: "dossier/:id", element: <DossierDetail /> },
        { path: "/otp", element: <CheckOTPPage /> },
      ],
    },
    {
      path: "create-dossier",
      element: (
        <SearchLayout>
          <Suspense fallback={loading}>
            <Outlet />
          </Suspense>
        </SearchLayout>
      ),
      children: [
        { index: true, element: <CreateDossierPage /> },
      ],
    },
    {
      path: "auth",
      element: (
        <AuthLayout>
          <AuthPage />
        </AuthLayout>
      ),
    },
    {
      path: "search",
      element: (
        <SearchLayout>
          <Suspense fallback={loading}>
            <SearchPage />
          </Suspense>
        </SearchLayout>
      ),
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}



