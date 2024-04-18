import { permissionAtom } from "@/packages/store/permission-store";
import { useAtomValue } from "jotai";

export default function PermissionContainer({
  permission,
  children,
  ...params
}: {
  permission: any;
  children: any;
}) {
  const permissionStore = useAtomValue(permissionAtom);
  return permission === "" ||
    permission === undefined ||
    permissionStore.buttons?.includes(permission) ? (
    <>{children}</>
  ) : (
    <></>
  );
}

export const checkPermision = (permission: string | any) => {
  const permissionStore = useAtomValue(permissionAtom);
  return permission === "" || permission === undefined
    ? true
    : permissionStore.buttons?.includes(permission) ?? false;
};
export const checkMenuPermision = (permission: string | any) => {
  const permissionStore = useAtomValue(permissionAtom);
  return permission === "" || permission === undefined
    ? true
    : permissionStore.menu?.includes(permission) ?? false;
};
