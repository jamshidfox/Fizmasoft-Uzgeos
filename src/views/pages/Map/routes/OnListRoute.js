import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CustomInput from "reactstrap/lib/CustomInput"
import { handleGetTypes, handleUpdateSelectedData, handleUpdateSelecteds } from "../store/actions/onListData"

const OnListRoute = () => {
  const [allSelected, setAllSelected] = useState(false)

  const onListState = useSelector((state) => state.onList)
  const onListData = useSelector((state) => state.onListData)
  const dispatch = useDispatch()

  const allOrNone = (state) => {
    const { selecteds } = onListData
    let newSelecteds
    if (state) {
      dispatch(handleUpdateSelecteds([]))
      newSelecteds = []
      setAllSelected(false)
    } else {
      const all = []
      onListData.types.forEach((type) => {
        if (!selecteds.includes(type.id)) all.push(type.id)
      })
      newSelecteds = [...all, ...selecteds]
      dispatch(handleUpdateSelecteds(newSelecteds))
      setAllSelected(true)
    }
    dispatch(handleUpdateSelectedData(newSelecteds))
  }

  useEffect(() => {
    if (onListState.onList) dispatch(handleGetTypes())
    else {
      // dispatch(handleUpdateSelectedData([]))
      allOrNone(true)
    }
  }, [onListState])

  const addToSelected = (id) => {
    const { selecteds } = onListData
    let newSelecteds
    if (!selecteds.includes(id)) {
      // add to selecteds
      newSelecteds = [...selecteds, id]
      dispatch(handleUpdateSelecteds(newSelecteds))
    } else {
      // remove from selecteds
      const idIndex = selecteds.indexOf(id)
      newSelecteds = [...selecteds.slice(0, idIndex), ...selecteds.slice(idIndex + 1)]
      dispatch(handleUpdateSelecteds(newSelecteds))
    }
    dispatch(handleUpdateSelectedData(newSelecteds))
  }

  return onListState.onList ? (
    <>
      <div className="d-flex mt-1">
        <CustomInput checked={allSelected} onChange={() => allOrNone(allSelected)} id="All" type="checkbox" />
        <h5>
          <label htmlFor="All" className="ml-1">
            {"Выбрать всех".toUpperCase()}
          </label>
        </h5>
      </div>
      {onListData.types.map((type) => (
        <div key={type.id} className="d-flex mt-1">
          <CustomInput checked={onListData.selecteds.includes(type.id)} onChange={() => addToSelected(type.id)} className="ml-2" id={type.id} type="checkbox" />
          <h5>
            <label htmlFor={type.id} className="ml-1">
              {type.title.toUpperCase()}
            </label>
          </h5>
        </div>
      ))}
    </>
  ) : null
}

export default OnListRoute
