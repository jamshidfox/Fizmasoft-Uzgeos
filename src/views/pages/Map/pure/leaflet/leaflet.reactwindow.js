/* eslint-disable */
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import ReactDOM from "react-dom"
import { useState } from "react"

const LModal = ({ options }) => {
  const [open, setOpen] = useState(true)
  return (
    <Modal isOpen={open} className={options.modalCls}>
      <ModalHeader
        toggle={() => {
          options.cancelCb && options.cancelCb()
          setOpen(false)
        }}
      >
        {options.title}
      </ModalHeader>
      <ModalBody style={{ height: options.height ? options.height : "inherit", overflow: "auto" }}>{options.content}</ModalBody>
      <ModalFooter>
        <Button
          outline
          color="info"
          onClick={() => {
            options.okCb && options.okCb()
            setOpen(false)
          }}
        >
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  )
}

import L from "leaflet"

L.Control.ReactWindow = L.Control.extend({
  includes: L.Evented.prototype || L.Mixin.Events,

  options: {
    element: "map",
    className: "control-window",
    visible: false,
    title: undefined,
    closeButton: true,
    content: undefined,
    prompt: undefined,
    maxWidth: 600,
    modal: true,
    scrollable: false,
    draggable: false,
    position: "top"
  },
  initialize: function (options) {
    L.setOptions(this, options)
    const div = L.DomUtil.create("div")
    ReactDOM.render(<LModal options={this.options} />, div)
  }
})

L.control.reactWindow = function (options) {
  return new L.Control.ReactWindow(options)
}
