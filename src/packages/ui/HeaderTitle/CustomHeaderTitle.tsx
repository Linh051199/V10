import { useI18n } from '@/i18n/useI18n';
import React from 'react'
import { Tooltip } from 'devextreme-react/tooltip';
import './custom_header.scss'


interface CustomHeaderTitle {
  displayName: string
  isSearch?: boolean
}

export const CustomHeaderTitle = ({ displayName = "", isSearch = true }: CustomHeaderTitle) => {
  const { t } = useI18n(displayName);
  return (
    <div id={"tool-tip-header-container"}
      className="tool-tip-title-header"
    >
      <div className={`font-bold dx-font-m text-tool-tip w-[250px] ${isSearch && 'header-search__form'} cursor-default`}>
        {t(displayName)}
      </div>
      <div className="show-tool-tip">
        <Tooltip
          target="#tool-tip-header-container"
          showEvent="dxhoverstart"
          hideEvent="dxhoverend"
          className="tooltip-render"
        >
          <div className={"z-[9999] text-content-tooltip-title-header"} style={{ zIndex: 9999 }}>
            {t(displayName)}
          </div>
        </Tooltip>
      </div>
    </div>
  )
}
