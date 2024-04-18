import { forwardRef, ForwardedRef, useState } from "react";
import Form, { GroupItem, SimpleItem } from "devextreme-react/form";
import { TextField } from "@/packages/components/text-field";
import { useI18n } from "@/i18n/useI18n";
import { SelectField } from "@/packages/components/select-field";
import { RequiredField } from "@/packages/common/Validation_Rules";
import { CheckboxField } from "@/packages/components/checkbox-field";
import { NumberBox, TextArea } from "devextreme-react";
import { GroupField } from "@/packages/ui/group-field";
import { usePermissions } from "@/packages/contexts/permission";
import { Mst_Dealer, Mst_Transporter } from "@/packages/types";
import { useVisibilityControl } from "@/packages/hooks";
import { GroupHeader } from "./group-header";

export const CarStatus = forwardRef(({ }, ref: any) => {
  const { t } = useI18n("QuanLyPhieuTiepNhanGiaoXeView");
  // const dealerList: any[] = []
  const [formDataDC, setFormDataDC] = useState({ FStatus_OS_Paint: 0 });
  const control = useVisibilityControl({ defaultVisible: true });
  const { isHQ } = usePermissions();

  const cockpit = [
    "DenBaoTaplo",
    "Coi",
    "GatMua",
    "HeThongAmThanh",
    "HeThongDieuHoa",
    "CoCauNangHaKinh",
    "GheLai"
  ]
  const frontAndBackOfCar = [
    "DenTruocXe",
    "DenSauXe"
  ]

  const engine = [
    "MucDauDongCo",
    "MucDauPhanh",
    "MucDauTroLucLai",
    "MucNuocLamMat",
    "MucNuocRuaKinh",
    "DayDaiTruyenDong",
    "LocGioDongCo",
    "RoRiChatLong",
    "RoRiGaHeThongDieuHoa"
  ]
  const tire = [
    "BanhXeTruocT",
    "BanhXeTruocP",
    "BanhXeSauP",
    "BanhXeSauT"
  ]
  const carTrunk = [
    'BoDungCuTheoXe',
    'LopDuPhong'
  ]
  return (
    <div className={"p-2 form-group"}>
      <GroupHeader
        caption={"II. Kiểm tra tình trạng xe"}
        control={control}
        disableCollapsible={false}
      // visiableHeader={true}
      />
      <Form
        ref={ref}
        colCount={3}
        formData={formDataDC}
        labelLocation={"left"}
        validationGroup={"main"}
        visible={control.visible}
        className={`form-input-create-checkbox !pt-2  ${control.visible ? "normal-content" : "collapsible-content"
          }`}
      >
        <GroupItem cssClass="ml-5" key={1}>
          <SimpleItem
            render={() => {
              return (
                <h5>Thông tin kiểm tra </h5>
              )
            }}
          />
          <SimpleItem
            render={() => {
              return (
                <h5 className="pl-2">A. Khoang lái </h5>
              )
            }}
          />
          {
            cockpit.map((item, index) => {
              return <SimpleItem
                cssClass="pl-4 description-title"
                // key={index}
                render={() => {
                  return <h5 className="pl-2">{`${index + 1}.${item}`}</h5>
                }
                }
              />
            })
          }
        </GroupItem>
        <GroupItem cssClass="ml-5">
          <SimpleItem
            render={() => {
              return (
                <h5 className="text-center">Trạng thái tiếp nhận </h5>
              )
            }}
          />
          <SimpleItem
            cssClass="d-flex"
            render={() => {
              return (
                <div className="double-checkbox">
                  <h5 className="w-60 flex justify-center">OK</h5>
                  <h5 className="w-60 flex justify-center">NG</h5>
                </div>
              )
            }}
          />
          {cockpit.map((item: any, index: any) => {
            return <SimpleItem
              label={{
                visible: false
              }}
              // key={index}
              cssClass="w-full"
              dataField={"FStatus_OS_Chassis"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                return (
                  <div className={"flex flex-row m-0"}>
                    <div className="double-checkbox">
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>
          })}
        </GroupItem>
        <GroupItem cssClass="ml-5">
          <SimpleItem
            render={() => {
              return (
                <h5 className="text-center">Trạng thái giao xe </h5>
              )
            }}
          />
          <SimpleItem
            cssClass="d-flex"
            render={() => {
              return (
                <div className="double-checkbox">
                  <h5 className="w-60 flex justify-center">OK</h5>
                  <h5 className="w-60 flex justify-center">NG</h5>
                </div>
              )
            }}
          />
          {
            cockpit.map((item, index) => {
              return <SimpleItem
                label={{
                  visible: false
                }}
                // key={item}
                cssClass="w-full"
                dataField={"FStatus_OS_Chassis"}
                render={({ component: formInstance, dataField }: any) => {
                  const formData = formInstance.option("formData");
                  return (
                    <div className={"flex flex-row m-0"}>
                      <div className="double-checkbox">
                        <CheckboxField
                          width={240}
                          dataField={dataField}
                          formInstance={formInstance}
                          defaultValue={formData?.[dataField] ? true : false}
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value ? 1 : 0);
                          }}
                        />
                        <CheckboxField
                          width={240}
                          dataField={dataField}
                          formInstance={formInstance}
                          defaultValue={formData?.[dataField] ? true : false}
                          onValueChanged={(e: any) => {
                            formInstance.updateData(dataField, e.value ? 1 : 0);
                          }}
                        />
                      </div>
                    </div>
                  );
                }}
              ></SimpleItem>
            })
          }
        </GroupItem>
        <GroupItem cssClass="ml-5" key={1}>
          <SimpleItem
            render={() => {
              return (
                <h5 className="pl-2">B. Phía trước và sau xe </h5>
              )
            }}
          />
          {
            frontAndBackOfCar.map((item, index) => {
              return <SimpleItem
                cssClass="pl-4 description-title"
                // key={uui}
                render={() => {
                  return <h5 className="pl-2">{`${index + 1}.${item}`}</h5>
                }
                }
              />
            })
          }
        </GroupItem>

        <GroupItem cssClass="ml-5 mt-30">
          {frontAndBackOfCar.map((item: any, index: any) => {
            return <SimpleItem
              label={{
                visible: false
              }}
              // key={index}
              cssClass="w-full"
              dataField={"FStatus_OS_Chassis"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                return (
                  <div className={"flex flex-row m-0"}>
                    <div className="double-checkbox">
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>
          })}
        </GroupItem>
        <GroupItem cssClass="ml-5 mt-30">
          {frontAndBackOfCar.map((item: any, index: any) => {
            return <SimpleItem
              label={{
                visible: false
              }}
              // key={index}
              cssClass="w-full"
              dataField={"FStatus_OS_Chassis"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                return (
                  <div className={"flex flex-row m-0"}>
                    <div className="double-checkbox">
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>
          })}
        </GroupItem>

        <GroupItem cssClass="ml-5" key={1}>
          <SimpleItem
            render={() => {
              return (
                <h5 className="pl-2">C. Khoang Động Cơ </h5>
              )
            }}
          />
          {
            engine.map((item, index) => {
              return <SimpleItem
                cssClass="pl-4 description-title"
                // key={uui}
                render={() => {
                  return <h5 className="pl-2">{`${index + 1}.${item}`}</h5>
                }
                }
              />
            })
          }
        </GroupItem>

        <GroupItem cssClass="ml-5 mt-30">
          {engine.map((item: any, index: any) => {
            return <SimpleItem
              label={{
                visible: false
              }}
              // key={index}
              cssClass="w-full"
              dataField={"FStatus_OS_Chassis"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                return (
                  <div className={"flex flex-row m-0"}>
                    <div className="double-checkbox">
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>
          })}
        </GroupItem>
        <GroupItem cssClass="ml-5 mt-30">
          {engine.map((item: any, index: any) => {
            return <SimpleItem
              label={{
                visible: false
              }}
              // key={index}
              cssClass="w-full"
              dataField={"FStatus_OS_Chassis"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                return (
                  <div className={"flex flex-row m-0"}>
                    <div className="double-checkbox">
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>
          })}
        </GroupItem>

        <GroupItem cssClass="ml-5" key={1}>
          <SimpleItem
            render={() => {
              return (
                <h5 className="pl-2">D. Lốp xe </h5>
              )
            }}
          />
          {
            tire.map((item, index) => {
              return <SimpleItem
                cssClass="pl-4 description-title"
                // key={uui}
                render={() => {
                  return <h5 className="pl-2">{`${index + 1}.${item}`}</h5>
                }
                }
              />
            })
          }
        </GroupItem>

        <GroupItem cssClass="ml-5 mt-30">
          {tire.map((item: any, index: any) => {
            return <SimpleItem
              label={{
                visible: false
              }}
              // key={index}
              cssClass="w-full"
              dataField={"FStatus_OS_Chassis"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                return (
                  <div className={"flex flex-row m-0"}>
                    <div className="double-checkbox">
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>
          })}
        </GroupItem>
        <GroupItem cssClass="ml-5 mt-30">
          {tire.map((item: any, index: any) => {
            return <SimpleItem
              label={{
                visible: false
              }}
              // key={index}
              cssClass="w-full"
              dataField={"FStatus_OS_Chassis"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                return (
                  <div className={"flex flex-row m-0"}>
                    <div className="double-checkbox">
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>
          })}
        </GroupItem>


        <GroupItem cssClass="ml-5" key={1}>
          <SimpleItem
            render={() => {
              return (
                <h5 className="pl-2">E. Cốp sau </h5>
              )
            }}
          />
          {
            carTrunk.map((item, index) => {
              return <SimpleItem
                cssClass="pl-4 description-title"
                // key={uui}
                render={() => {
                  return <h5 className="pl-2">{`${index + 1}.${item}`}</h5>
                }
                }
              />
            })
          }
        </GroupItem>

        <GroupItem cssClass="ml-5 mt-30">
          {carTrunk.map((item: any, index: any) => {
            return <SimpleItem
              label={{
                visible: false
              }}
              // key={index}
              cssClass="w-full"
              dataField={"FStatus_OS_Chassis"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                return (
                  <div className={"flex flex-row m-0"}>
                    <div className="double-checkbox">
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>
          })}
        </GroupItem>
        <GroupItem cssClass="ml-5 mt-30">
          {carTrunk.map((item: any, index: any) => {
            return <SimpleItem
              label={{
                visible: false
              }}
              // key={index}
              cssClass="w-full"
              dataField={"FStatus_OS_Chassis"}
              render={({ component: formInstance, dataField }: any) => {
                const formData = formInstance.option("formData");
                return (
                  <div className={"flex flex-row m-0"}>
                    <div className="double-checkbox">
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                      <CheckboxField
                        width={240}
                        dataField={dataField}
                        formInstance={formInstance}
                        defaultValue={formData?.[dataField] ? true : false}
                        onValueChanged={(e: any) => {
                          formInstance.updateData(dataField, e.value ? 1 : 0);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            ></SimpleItem>
          })}
        </GroupItem>
      </Form>
    </div >
  )
})