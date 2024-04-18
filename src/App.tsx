import { protectedRoutes } from "@/app-routes";
import { AdminPageLayout } from "@/layouts";
import { LoginSsoPage, SelectNetworkPage } from "@/pages";
import { HomePage } from "@/pages/commons/home-page";
import { PrivateRoutes } from "@packages/ui/private-routes";
import { RequireSession } from "@packages/ui/require-session";
import "devextreme/dist/css/dx.common.css";
import { useAtomValue } from "jotai";
import { memo } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./dx-styles.scss";
import { permissionAtom } from "./packages/store/permission-store";
import PageNotData from "./packages/ui/PageError/PageNotData";
import "./themes/generated/theme.additional.css";
import "./themes/generated/theme.base.css";

export default memo(function Root() {
  // to trigger localization service
  // const [value] = useAtom(localeAtom);
  const permissionStore = useAtomValue(permissionAtom);
  // console.log(permissionStore);

  return (
    <Router>
      <Routes>
        <Route path={""} element={<PrivateRoutes />}>
          <Route path={""} element={<RequireSession />}>
            <Route path={"/"} element={<HomePage />} />
            <Route path={":networkId"} element={<AdminPageLayout />}>
              {/* <Route path={"/:networkId/"} element={<AdminDashboardPage />} /> */}
              {protectedRoutes
                .filter((route) => route.key === route.mainMenuKey)
                .map((route) => {
                  return (
                    <Route
                      key={route.key}
                      path={`${route.path}`}
                      element={
                        route.permissionCode === "" ||
                        permissionStore.menu?.includes(
                          route.permissionCode!
                        ) ? (
                          route.getPageElement?.()
                        ) : (
                          <PageNotData text={"Không được phép truy cập"} />
                        )
                      }
                    >
                      {route.items &&
                        route.items.length > 0 &&
                        route.items.map((child) => {
                          return (
                            <Route
                              key={child.key}
                              path={`${child.path}`}
                              element={
                                child.permissionCode === "" ||
                                permissionStore.menu?.includes(
                                  child.permissionCode!
                                ) ? (
                                  child.getPageElement?.()
                                ) : (
                                  <PageNotData />
                                )
                              }
                            />
                          );
                        })}
                    </Route>
                  );
                })}
              {protectedRoutes
                .filter((route) => route.key !== route.mainMenuKey)
                .map((route) => {
                  return (
                    <Route
                      key={route.key}
                      path={`${route.path}`}
                      element={
                        route.permissionCode === "" ||
                        permissionStore.menu?.includes(
                          route.permissionCode!
                        ) ? (
                          route.getPageElement?.()
                        ) : (
                          <PageNotData text={"Không được phép truy cập"} />
                        )
                      }
                    >
                      {route.items &&
                        route.items.length > 0 &&
                        route.items
                          .filter((route) => route.key !== route.mainMenuKey)
                          .filter((r) =>
                            r.isHQ
                              ? r.isHQ === permissionStore.sysUser?.BizUserType
                              : true
                          )
                          .map((child) => {
                            return (
                              <Route
                                key={child.key}
                                path={`${child.path}`}
                                element={
                                  child.permissionCode === "" ||
                                  permissionStore.menu?.includes(
                                    child.permissionCode!
                                  ) ? (
                                    child.getPageElement?.()
                                  ) : (
                                    <PageNotData
                                      text={"Không được phép truy cập"}
                                    />
                                  )
                                }
                              />
                            );
                          })}
                    </Route>
                  );
                })}
            </Route>
          </Route>
        </Route>
        <Route path={"/login"} element={<LoginSsoPage />}></Route>
        <Route path={"/select-network"} element={<SelectNetworkPage />}></Route>
        <Route path={"*"} element={<PageNotData text={"Page not found"} />} />
      </Routes>
    </Router>
  );
});
