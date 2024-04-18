import { adminRoutes } from "./routes/admin-routes";
import { customerCareRoutes } from "./routes/customerCare-routes";
import { reportRoutes } from "./routes/report-routes";
import { serviceRoutes } from "./routes/service-routes";
import { storageRoutes } from "./routes/storage-routes";
import { RouteItem } from "./types";

export const protectedRoutes: RouteItem[] = [
  ...adminRoutes,
  ...serviceRoutes,
  ...reportRoutes,
  ...storageRoutes,
  ...customerCareRoutes,
];
