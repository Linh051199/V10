export const useListDealer = () => {
  const result = Array.from({ length: 100 }, (v: any, i: any) => {
    if (i < 10) {
      return {
        MaDaiLy: `VS00${i}`,
        TenDaiLy: `Đại lý VS00${i}`,
      };
    }
    if (i >= 10 && i < 100) {
      return {
        MaDaiLy: `VS00${i}`,
        TenDaiLy: `Đại lý VS00${i}`,
      };
    }
  });

  return result;
};
