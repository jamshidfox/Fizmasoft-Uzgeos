import { Button, CustomInput, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import AppCollapse from "@components/app-collapse"
import { useEffect, useState } from "react"
import avtoQidiruvApi from "../api"
import PerfectScrollbar from "react-perfect-scrollbar"
import { injectIntl } from "react-intl"

const CameraSelectModal = ({ setCheckedData, open, setOpen, intl }) => {
  const [dropdownData, setDropdownData] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const prepareSelecteds = (data) => {
    const selecteds = data.map((d) => {
      return { title: d.title, data: d.childrens.filter((ch) => ch.checked) }
    })
    setCheckedData(selecteds)
  }

  const handleCheckBox = (title, isAll) => {
    let newData
    if (isAll) {
      newData = dropdownData.map((d) => {
        if (d.title === title) {
          return { ...d, checked: !d.checked, childrens: d.childrens.map((ch) => ({ ...ch, checked: !d.checked })) }
        }
        return { ...d }
      })
    } else newData = dropdownData.map((d) => ({ ...d, childrens: d.childrens.map((ch) => ({ ...ch, checked: ch.title === title ? !ch.checked : ch.checked })) }))
    setDropdownData(newData)
  }

  const makeCollapseData = (data) => {
    const properData = data.map((d) => ({
      title: (
        <CustomInput
          type="checkbox"
          className="custom-control-Primary"
          id={`${d.id}${d.title}`}
          key={`${d.id}${d.title}`}
          label={d.title}
          onChange={() => handleCheckBox(d.title, true)}
          checked={d.checked}
          inline
        />
      ),
      content: (
        <div className="mb-0" style={{ height: "300px", overflowX: "hidden" }}>
          <PerfectScrollbar>
            {d.childrens.map((ch, i) => (
              <span>
                <CustomInput type="checkbox" className="custom-control-Primary" id={`${ch.id}${ch.title}`} label={ch.title} onChange={() => handleCheckBox(ch.title, false)} checked={ch.checked} />
              </span>
            ))}
          </PerfectScrollbar>
        </div>
      )
    }))
    return properData
  }

  const prepareData = (data) => {
    const readyData = data.map((d) => ({ ...d, checked: true, childrens: d.childrens.map((ch) => ({ ...ch, checked: true })) }))
    setDropdownData(readyData)
  }

  const handleSearch = (e) => {
    const search = e.target.value
    setSearchValue(search)
    if (search.trim() === "") setSearchResults([])
    else {
      const arr = dropdownData.map((p) => p.childrens)
      const flatArr = arr.flat()
      const results = flatArr.filter((a) => a.title.toUpperCase().includes(search.toUpperCase()))
      setSearchResults(results)
    }
  }

  useEffect(() => {
    setSearchResults([])
    setSearchValue("")
  }, [open])

  useEffect(() => {
    prepareSelecteds(dropdownData)
  }, [dropdownData])

  useEffect(async () => {
    const { data } = await avtoQidiruvApi.getCameras()
    prepareData(data.data)
  }, [])

  return (
    <Modal isOpen={open} toggle={() => setOpen(!open)} className="modal-dialog-centered">
      <ModalHeader toggle={() => setOpen(!open)}>{intl.formatMessage({ id: "NavCameras" })}</ModalHeader>
      <ModalBody>
        {/* <Input value={searchValue} onChange={handleSearch} placeholder={intl.formatMessage({ id: "NavSearch" })} /> */}
        {searchResults.length === 0 ? (
          <AppCollapse accordion data={makeCollapseData(dropdownData)} />
        ) : (
          searchResults.map((ch, i) => (
            <span>
              <CustomInput type="checkbox" className="custom-control-Primary" id={`${ch.id}${ch.title}`} label={ch.title} onChange={() => handleCheckBox(ch.title, false)} defaultChecked />
            </span>
          ))
        )}
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => setOpen(false)} color="primary">
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default injectIntl(CameraSelectModal)
