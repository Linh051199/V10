import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";

import {
  RequiredField,
  requiredExcludeSpecialCharactersOnlyNumbers2,
} from "@packages/common/Validation_Rules";
import { useI18n } from "@/i18n/useI18n";
import { LinkCell } from "@packages/ui/link-cell";
import { Mst_CarModelStd } from "@/packages/types/master/Mst_CarModelStd";
import { viewingDataAtom } from "./screen-atom";
import { StatusButton } from "@/packages/ui/status-button";
import { filterByFlagActive } from "@/packages/common";

interface UseColumnsProps {
  data: any;
}

export const useColumns = ({ data }: UseColumnsProps) => {
  const { t } = useI18n("Mst_CarModelStd");

  const setViewingItem = useSetAtom(viewingDataAtom);
  const viewRow = (rowIndex: number, data: Mst_CarModelStd) => {
    setViewingItem({
      rowIndex,
      item: data,
    });
  };

  const columns: any[] = [
    {
      dataField: "ModelCode",
      caption: t("ModelCode"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      cellRender: ({ data, rowIndex, value }: any) => {
        return (
          <LinkCell
            key={nanoid()}
            onClick={() => viewRow(rowIndex, data)}
            value={value}
          />
        );
      },
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },
      validationRules: [
        RequiredField(t("ModelCodeIsRequired")),
        // ExcludeSpecialCharactersType,
      ],
    },
    {
      dataField: "ModelName",
      caption: t("ModelName"),
      visible: true,
      columnIndex: 1,
      groupKey: "BASIC_INFORMATION",
      editorType: "dxTextBox",
      editorOptions: {
        placeholder: t("Input"),
        validationMessageMode: "always",
      },

      validationRules: [RequiredField(t("ModelNameIsRequired"))],
    },
    // {
    //   dataField: "FlagActive",
    //   caption: t("FlagActive"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxTextBox",
    //   editorOptions: {
    //     placeholder: t("Input"),
    //     validationMessageMode: "always",
    //   },
    // },
    // {
    //   dataField: "FlagActive",
    //   caption: t("Flag Active"),
    //   visible: true,
    //   columnIndex: 1,
    //   groupKey: "BASIC_INFORMATION",
    //   editorType: "dxSwitch",
    //   alignment: "center",
    //   cellRender: ({ data }: any) => {
    //     return <StatusButton isActive={data.FlagActive} />;
    //   },
    // },
    {
      dataField: "FlagActive",
      caption: t("FlagActive"),
      editorType: "dxSwitch",
      alignment: "center",
      columnIndex: 1,
      headerFilter: {
        dataSource: filterByFlagActive(data ?? [], {
          true: t("Active"),
          false: t("Inactive"),
        }),
      },
      groupKey: "BASIC_INFORMATION",
      visible: true,
      width: 100,
      cellRender: ({ data }: any) => {
        return <StatusButton key={nanoid()} isActive={data.FlagActive} />;
      },
    },
  ];

  return columns;
};
