export const customLoad = (storeKey: string, datagridRef: any) => {
  if (storeKey) {
    const savedState = JSON.parse(localStorage.getItem(storeKey) ?? "{}");
    if (savedState) {
      // ignore selection state
      delete savedState.selectedRowKeys;
      datagridRef.current?.instance.state(savedState);
    }
  }

}
export const customSave = (storeKey: string, gridState: any) => {
  if (storeKey) {
    localStorage.setItem(storeKey, JSON.stringify(gridState));
  }
}