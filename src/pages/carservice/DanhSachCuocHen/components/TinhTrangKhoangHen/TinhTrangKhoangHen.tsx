import { useI18n } from "@/i18n/useI18n";
import { CheckBoxField } from "@/packages/ui/hook-form-field/CheckBoxField";
import { DateBoxField } from "@/packages/ui/hook-form-field/DateBoxField";
import { TextBoxField } from "@/packages/ui/hook-form-field/TextBoxField";
import { ToggleSidebarButton } from "@/packages/ui/toggle-sidebar-button";
import { Button, ScrollView } from "devextreme-react";
import { nanoid } from "nanoid";
import { useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Khoang from "./Khoang";
import "./TinhTrangKhoangHen.scss";

const TinhTrangKhoangHenPage = () => {
  const { t } = useI18n("TinhTrangKhoangHen");

  const methods = useForm();

  const {
    register,
    reset,
    unregister,
    watch,
    control,
    setValue,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      ThoiGianCuocHen: new Date(),
      BaoDuongDinhKy: true,
      SuaChuaChung: true,
      SuaChuaDongSon: true,
      SuaChuaKhac: true,
    },
  });

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

  function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  const listLoaiCuocHen = [
    "BaoDuongDinhKy",
    "SuaChuaChung",
    "SuaChuaDongSon",
    "SuaChuaKhac",
  ];

  const each = 100 / 27;

  const fd_ThoiGianCuocHen = watch("ThoiGianCuocHen");
  const fd_BaoDuongDinhKy = watch("BaoDuongDinhKy");
  const fd_SuaChuaChung = watch("SuaChuaChung");
  const fd_SuaChuaDongSon = watch("SuaChuaDongSon");
  const fd_SuaChuaKhac = watch("SuaChuaKhac");

  const renderKhoang = useMemo(() => {
    const data = Array.from({ length: 7 }, (v, i) => {
      const startDate = new Date(); // use the current date as the starting point

      startDate.setHours(6);
      startDate.setMinutes(0);

      return {
        Khoang: nanoid(),
        From: new Date(startDate.setHours(startDate.getHours() + i)),
        To: new Date(startDate.setHours(startDate.getHours() + i + 1)),
        LoaiCuocHen: getRandomElement(listLoaiCuocHen),
      };
    });
    const result = data
      .map((item: any) => {
        const timeFrom = new Date(item.From);

        const timeTo = new Date(item.To);

        const h_from = timeFrom.getHours();
        const m_from = timeFrom.getMinutes();

        const h_to = timeTo.getHours();
        const m_to = timeTo.getMinutes();

        const diff = h_to * 60 + m_to - (h_from * 60 + m_from);

        const diffStart = h_from * 60 + m_from - 360;

        const w = (diff / 30) * each;

        const s = (diffStart / 30) * each;

        return {
          ...item,
          Width: w,
          Start: s,
          BienSo: `30k-12345`,
        };
      })
      .filter((item: any) => {
        if (fd_BaoDuongDinhKy && item.LoaiCuocHen == "BaoDuongDinhKy") {
          return item;
        }
        if (fd_SuaChuaChung && item.LoaiCuocHen == "SuaChuaChung") {
          return item;
        }
        if (fd_SuaChuaDongSon && item.LoaiCuocHen == "SuaChuaDongSon") {
          return item;
        }
        if (fd_SuaChuaKhac && item.LoaiCuocHen == "SuaChuaKhac") {
          return item;
        }
      });

    return result.map((item: any) => {
      return (
        <Khoang
          title={item.Khoang}
          start={item.Start}
          width={item.Width}
          loai={item.LoaiCuocHen}
          key={nanoid()}
          bienso={item.BienSo}
          isStar={false}
        />
      );
    });
  }, [fd_BaoDuongDinhKy, fd_SuaChuaChung, fd_SuaChuaDongSon, fd_SuaChuaKhac]);

  const handleNextDay = () => {
    const result = new Date(fd_ThoiGianCuocHen).setDate(
      new Date(fd_ThoiGianCuocHen).getDate() + 1
    );

    setValue("ThoiGianCuocHen", result);
  };

  const handlePrevDay = () => {
    const result = new Date(fd_ThoiGianCuocHen).setDate(
      new Date(fd_ThoiGianCuocHen).getDate() - 1
    );

    setValue("ThoiGianCuocHen", result);
  };

  const handleNavigateHome = () => {};

  return (
    <ScrollView
      style={{
        scrollBehavior: "smooth",
      }}
      className="TinhTrangKhoangHen"
      useNative
    >
      <FormProvider {...methods}>
        <div className="flex justify-between items-center p-2 header-content h-[50px]">
          <div className="flex items-center">
            <ToggleSidebarButton />
            <p
              className="font-medium cursor-pointer hover:underline"
              onClick={handleNavigateHome}
            >
              Danh sách cuộc hẹn
            </p>
            <p className="mx-[5px]">&gt;</p>
            <p className="text-[#00703c] font-semibold">
              Tình trạng khoang hẹn
            </p>
          </div>
        </div>
        <div className="flex flex-col p-[5px] mt-[50px]">
          <div className="w-[500px] flex items-center gap-[5px]">
            <Controller
              name={"BienSo"}
              control={control}
              render={({ field }) => {
                return <TextBoxField field={field} label={t("BienSo")} />;
              }}
            />
            <Button
              style={{
                background: "#00703c",
                color: "#fff",
                margin: 0,
              }}
              text="Tìm kiếm"
            ></Button>
          </div>
          <div className="flex items-center mt-[10px] gap-[10px]">
            <div className="w-[90px]">Loại cuộc hẹn</div>
            <div className="px-[2px] bg-[#f8cbad]">
              <Controller
                name={"BaoDuongDinhKy"}
                control={control}
                render={({ field }) => {
                  return (
                    <CheckBoxField field={field} label={t("BaoDuongDinhKy")} />
                  );
                }}
              />
            </div>
            <div className="px-[2px] bg-[#c9c9c9]">
              <Controller
                name={"SuaChuaChung"}
                control={control}
                render={({ field }) => {
                  return (
                    <CheckBoxField field={field} label={t("SuaChuaChung")} />
                  );
                }}
              />
            </div>
            <div className="px-[2px] bg-[#00b0f0]">
              <Controller
                name={"SuaChuaDongSon"}
                control={control}
                render={({ field }) => {
                  return (
                    <CheckBoxField field={field} label={t("SuaChuaDongSon")} />
                  );
                }}
              />
            </div>
            <div className="px-[2px] bg-[#ffff00]">
              <Controller
                name={"SuaChuaKhac"}
                control={control}
                render={({ field }) => {
                  return (
                    <CheckBoxField field={field} label={t("SuaChuaKhac")} />
                  );
                }}
              />
            </div>
          </div>
          <div className="w-[500px] flex items-center gap-[5px] mt-[20px]">
            <div
              className="bg-[#bebebe] h-[30px] flex items-center justify-center w-[30px] cursor-pointer hover:shadow-md"
              onClick={handlePrevDay}
            >
              <i className="fa-solid fa-angles-left"></i>
            </div>
            <Controller
              name={"ThoiGianCuocHen"}
              control={control}
              render={({ field }) => {
                return (
                  <DateBoxField
                    field={field}
                    error={errors.ThoiGianCuocHen}
                    displayFormat="yyyy-MM-dd"
                    type="date"
                  />
                );
              }}
            />
            <div
              className="bg-[#bebebe] h-[30px] flex items-center justify-center w-[30px] cursor-pointer hover:shadow-md"
              onClick={handleNextDay}
            >
              <i className="fa-solid fa-angles-right"></i>
            </div>
          </div>

          <div className="mt-[20px] w-full flex items-center border-[#f8cbad] border-b-[1px]">
            <div className="w-[150px]  h-[15px]"></div>
            <div
              className="flex items-center"
              style={{
                // gridTemplateColumns: "repeat(13)",
                gridAutoFlow: "column",
                width: "calc(100% - 150px)",
              }}
            >
              {listTime.map((item: any) => {
                return (
                  <div
                    className=" text-[11px] border-l-[1px] border-[#f8cbad]"
                    style={{
                      width: "calc(100% / 27)",
                      height: 15,
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>

          {renderKhoang}
        </div>
      </FormProvider>
    </ScrollView>
  );
};

export default TinhTrangKhoangHenPage;
