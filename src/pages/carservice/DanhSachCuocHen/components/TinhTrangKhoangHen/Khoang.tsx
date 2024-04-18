const Khoang = ({
  width,
  start,
  title,
  loai,
  bienso,
  isStar = false,
}: {
  width: number;
  start: number;
  title: string;
  loai: string;
  bienso: string;
  isStar: boolean;
}) => {
  function generateHourArray() {
    const hours = [];
    for (let i = 6; i <= 19; i++) {
      if (i == 19) {
        hours.push(`${i}:00`);
      } else {
        hours.push(`${i}:00`);
        hours.push(`${i}:30`);
      }
    }
    return hours;
  }
  const listTime = generateHourArray();

  const listColor = [
    {
      color: "f8cbad",
      loai: "BaoDuongDinhKy",
    },
    {
      color: "c9c9c9",
      loai: "SuaChuaChung",
    },
    {
      color: "00b0f0",
      loai: "SuaChuaDongSon",
    },
    {
      color: "ffff00",
      loai: "SuaChuaKhac",
    },
  ];

  return (
    <div className="w-full flex">
      <div
        className="w-[150px] text-[12px] font-semibold border-b-[1px] border-[#f8cbad]"
        style={{
          wordWrap: "break-word",
        }}
      >
        {title}
      </div>
      <div
        className="flex items-center  border-[#f8cbad] relative min-h-[30px] "
        style={{
          // gridTemplateColumns: "repeat(13)",
          gridAutoFlow: "column",
          width: "calc(100% - 150px)",
        }}
      >
        {listTime.map((item: any, index: any) => {
          if (index == listTime.length - 1) {
            return (
              <div
                className=" text-[11px] border-l-[1px] border-[#f8cbad] border-b-[1px] border-r-[1px]"
                style={{
                  width: "calc(100% / 27)",
                  height: "100%",
                }}
              ></div>
            );
          }

          return (
            <div
              className=" text-[11px] border-l-[1px] border-[#f8cbad] border-b-[1px] "
              style={{
                width: "calc(100% / 27)",
                height: "100%",
              }}
            ></div>
          );
        })}

        <div
          className={`absolute  h-[60%] left-0 top-0 bg-[#${
            listColor.find((c: any) => c.loai == loai)?.color
          }] `}
          style={{
            width: `calc(${width}% )`,
            left: `calc(${start}%)`,
          }}
        >
          <div className="flex items-center justify-center gap-[10px]">
            <div className="h-full flex items-center">{bienso}</div>
            {isStar && (
              <div className="h-full flex items-center justify-center absolute z-[10] right-[1px]">
                <i className="fa-solid fa-star text-red-600"></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Khoang;
