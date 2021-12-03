import React, { useContext, useState } from "react"
import { Filter } from "react-feather"
import { injectIntl } from "react-intl"
import { Button, Card, CustomInput, Spinner } from "reactstrap"
import { Tooltip } from "antd"
import styled from "styled-components"
import { IntlContext } from "../../../../utility/context/Internationalization"
import PerfectScrollbar from "react-perfect-scrollbar"

const CarFilterIcon = ({ toggleDropdown, dropdownOpen, intl, valueSelect, setValueSelect, filterProps, handleClick }) => {
  const [active, setActive] = useState([])
  const intlContext = useContext(IntlContext)

  return (
    <>
      <Filter className="ml-1 cursor-pointer" onClick={toggleDropdown} size={16} />
      {dropdownOpen ? (
        <div>
          <Card style={{ position: "absolute", marginTop: "15px", marginLeft: "-30px" }} className="p-1 border">
            <PerfectScrollbar>
              {filterProps ? (
                <>
                  <div style={{ textAlign: "start", height: "300px", overflowY: "auto" }}>
                    <CustomInput
                      checked={active.length === filterProps.map((d) => d.key).length || valueSelect?.length === filterProps.map((d) => d.key).length}
                      onChange={() => {
                        if (active.length !== filterProps.map((d) => d.key).length && valueSelect.length !== filterProps.map((d) => d.key).length) {
                          setActive(filterProps.map((d) => d.key))
                          setValueSelect(filterProps.map((d) => d.key))
                        } else {
                          setActive([])
                          setValueSelect([])
                        }
                      }}
                      key={0}
                      id={0}
                      label={<span style={{ textTransform: "capitalize" }}>{intl.formatMessage({ id: "All" })}</span>}
                      type="checkbox"
                    />
                    {filterProps.map((tr) => {
                      return (
                        tr.key && (
                          <div key={tr.key} style={{ textAlign: "start" }}>
                            <CustomInput
                              key={tr.key}
                              checked={active.includes(tr.key) || valueSelect?.includes(tr.key)}
                              label={
                                <Tooltip
                                  placement="right"
                                  title={intlContext.locale === "us" ? tr.value_en : intlContext.locale === "ru" ? tr.value_ru : intlContext.locale === "kr" ? tr.value_kr : tr.value_uz}
                                >
                                  <FilterWrapper>
                                    <>
                                      {tr.value_en.length > 14 && intlContext.locale === "us"
                                        ? `${tr.value_en.slice(0, 11)}...`
                                        : tr.value_ru.length > 14 && intlContext.locale === "ru"
                                        ? `${tr.value_ru.slice(0, 11)}...`
                                        : tr.value_uz.length > 14 && intlContext.locale === "uz"
                                        ? `${tr.value_uz.slice(0, 11)}...`
                                        : tr.value_kr.length > 14 && intlContext.locale === "kr"
                                        ? `${tr.value_kr.slice(0, 11)}...`
                                        : intlContext.locale === "us"
                                        ? tr.value_en
                                        : intlContext.locale === "ru"
                                        ? tr.value_ru
                                        : intlContext.locale === "kr"
                                        ? tr.value_kr
                                        : tr.value_uz}
                                    </>
                                  </FilterWrapper>
                                </Tooltip>
                              }
                              onChange={() => {
                                if (!active.includes(tr.key) && !valueSelect.includes(tr.key)) {
                                  setActive([...active, tr.key])
                                  if (!valueSelect.includes(tr.key)) setValueSelect([...valueSelect, tr.key])
                                } else {
                                  setActive([...active.filter((a) => a !== tr.key)])
                                  setValueSelect([...valueSelect.filter((a) => a !== tr.key)])
                                }
                              }}
                              id={tr.key}
                              type="checkbox"
                            />
                          </div>
                        )
                      )
                    })}
                  </div>
                  <div className="d-flex mt-1">
                    <Button onClick={handleClick} color="primary" className="mr-1" size="sm">
                      {intl.formatMessage({ id: "LochinKozSearch" })}
                    </Button>
                    <Button
                      onClick={() => {
                        setActive([])
                        setValueSelect([])
                      }}
                      color="danger"
                      size="sm"
                    >
                      {intl.formatMessage({ id: "LochinKozClearFilter" })}
                    </Button>
                  </div>
                </>
              ) : (
                <div style={{ width: "120px" }}>
                  <Spinner size="sm" color="primary" />
                </div>
              )}
            </PerfectScrollbar>
          </Card>
        </div>
      ) : null}
    </>
  )
}

export default injectIntl(CarFilterIcon)

const FilterWrapper = styled.div`
  text-transform: lowercase;
  ::first-letter {
    text-transform: capitalize;
  }
`
