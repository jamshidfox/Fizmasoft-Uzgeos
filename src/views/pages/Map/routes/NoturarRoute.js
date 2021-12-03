import { FormGroup, Input } from "reactstrap"
import { Tooltip } from "antd"
import CustomTable from "../../../components/table"
import { useState, useEffect } from "react"
import { injectIntl } from "react-intl"
import { CheckCircle, Circle, ZoomIn, ZoomOut } from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import { changeNoturarIdList, handleChangeNoturarData, handleGetNoturarData } from "../store/actions/noturar"

const NoturarRoute = ({ id, intl }) => {
  const dispatch = useDispatch()
  const restData = useSelector((state) => state.noturar.data)
  const idList = useSelector((state) => state.noturar.idList)
  const [loading, setLoading] = useState(false)
  const [allSelected, setAllSelected] = useState(true)
  const [tableData, setaTableData] = useState([])
  const searchInputPlaceHolder = intl.formatMessage({ id: "MapSearchInputPlaceholder" })

  useEffect(async () => {
    setLoading(true)
    try {
      const { data } = await dispatch(handleGetNoturarData(id, restData))
      setaTableData(data[id])
    } catch (err) {}
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!restData[id]) return
    setaTableData(restData[id])
  }, [restData])

  const toggleAllVisibility = () => {}

  const handleZoomClick = (itemId) => {
    const tmp = {}
    _.each(restData, (val, key) => {
      if (id === +key) {
        tmp[key] = val.map((d) => (d.id === itemId ? { ...d, zoomed: !d.zoomed } : { ...d, zoomed: false }))
      } else tmp[key] = val.map((d) => ({ ...d, zoomed: false }))
    })
    dispatch(handleChangeNoturarData({ ...tmp }))
  }
  const handleSelectClick = (itemId) => {
    const tmp = restData[id].map((d) => (d.id === itemId ? { ...d, selected: !d.selected } : d))
    dispatch(handleChangeNoturarData({ ...restData, [id]: tmp }))
  }

  const columns = [
    {
      title: (
        <>
          {allSelected ? <CheckCircle color="#6e62ee" size={16} onClick={() => toggleAllVisibility(false)} /> : <Circle size={16} onClick={() => toggleAllVisibility(true)} />}
          {"  "}
          {intl.formatMessage({ id: "RadarTableName" })}
        </>
      ),
      name: "title",
      key: "title"
    },
    {
      title: `${tableData.length}`,
      name: "status",
      key: "status"
    }
  ]

  const renderColumns = () => {
    return columns.map((column) => {
      return <th key={column.key}>{column.title} </th>
    })
  }

  const renderRows = () => {
    const data = tableData.map((td) => (
      <tr style={td.zoomed ? { background: "rgb(115,103,240,0.5)", color: "#fff" } : {}} key={td.id}>
        <td>
          {td.selected ? <CheckCircle size={16} onClick={() => handleSelectClick(td.id)} color="#6e62ee" /> : <Circle size={16} onClick={() => handleSelectClick(td.id)} />} {"  "}
          <Tooltip placement="right" title={td.company_name}>
            {td.company_name.length > 30 ? `${td.company_name.slice(0, 30)}...` : td.company_name}
          </Tooltip>
        </td>
        <td>{td.zoomed ? <ZoomOut size={16} onClick={() => handleZoomClick(td.id)} className="ml-1" /> : <ZoomIn size={16} onClick={() => handleZoomClick(td.id)} className="ml-1" />}</td>
      </tr>
    ))
    return data
  }

  return (
    <>
      <FormGroup>
        <Input type="text" id="radarSearch" placeholder={searchInputPlaceHolder} onChange={(val) => handleSearchRadars(val)} />
      </FormGroup>
      <CustomTable size="sm" loading={loading} pagination={false} columns={renderColumns} rows={renderRows} />
    </>
  )
}

export default injectIntl(NoturarRoute)
