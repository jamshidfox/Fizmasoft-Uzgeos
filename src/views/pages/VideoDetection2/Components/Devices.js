import { CustomInput, Input, Button, UncontrolledButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap"
import AutoComplete from "@components/autocomplete"
import { Filter } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import { useEffect, useState } from "react"
import deviceState from "../deviceState.json"
import { injectIntl } from "react-intl"

const Devices = ({ intl, treeData, setChannel }) => {
  const [active, setActive] = useState([])
  const [filteredData, setfilteredData] = useState([])

  useEffect(() => {
    setfilteredData(treeData)
  }, [treeData])

  const filterData = (state, all) => {
    if (all) return setfilteredData(treeData)
    const data = treeData.filter((d) => d.state === state)
    setfilteredData(data)
  }

  const handleChannelSearch = (e) => {
    const text = e.target.value
    const nullRemovedChannel = treeData.filter((d) => d.title)
    const result = nullRemovedChannel.filter((d) => d.title.toLowerCase().includes(text.toLowerCase()))
    setfilteredData(result)
  }

  return (
    <>
      <Input style={{ width: "85%", margin: "0 5px" }} type="select" name="select" id="select-sm">
        <option>Device</option>
        <option>Task List</option>
      </Input>
      <div style={{ width: "85%", margin: "10px 5px", display: "flex" }}>
        <Input onChange={handleChannelSearch} type="search" placeholder={intl.formatMessage({ id: "NavSearch" })} />
        <UncontrolledButtonDropdown>
          <DropdownToggle size="sm" color="primary" caret>
            <Filter size={13} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem disabled tag="option">
              {intl.formatMessage({ id: "NavMap" })}
            </DropdownItem>
            {deviceState.map((state, i) => (
              <DropdownItem onClick={() => filterData(state.state, i === 0)} key={state.state} value={state.state} tag="option">
                {intl.formatMessage({ id: state.title })}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>
      <PerfectScrollbar style={{ height: 200, width: "85%", margin: "0 5px" }}>
        <CustomInput checked={false} label={intl.formatMessage({ id: "All" })} type="checkbox" />
        {filteredData.map((tr, i) => {
          return (
            tr.title && (
              <CustomInput
                key={i}
                checked={active.includes(tr.key)}
                label={tr.title}
                onChange={() => {
                  if (!active.includes(tr.key)) {
                    setActive([...active, tr.key])
                    setChannel(tr.channel)
                  } else {
                    setActive([...active.filter((a) => a !== tr.key)])
                  }
                }}
                className="ml-2"
                id={tr.key}
                type="checkbox"
              />
            )
          )
        })}
      </PerfectScrollbar>
    </>
  )
}

export default injectIntl(Devices)
