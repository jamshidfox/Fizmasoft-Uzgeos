// ** Third Part
import { Button } from "reactstrap"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

// ** Iconst
import { Trash2 } from "react-feather"

// ** Styles
import "animate.css/animate.css"
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss"
import { injectIntl } from "react-intl"

const MySwal = withReactContent(Swal)

const BasicSweetCallback = ({ intl, row, handleDelete }) => {
  const handlename = (row) => {
    if (row.full_name) {
      return row.full_name
    } else if (row.name) {
      return row.name
    } else {
      return row.passport_raqami
    }
  }

  const handleConfirmCancel = () => {
    return MySwal.fire({
      title: `${handlename(row)}${intl.formatMessage({ id: "PopConfirmTitle" })}`,
      text: intl.formatMessage({ id: "PopConfirmText" }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: intl.formatMessage({ id: "PopConfirmOK" }),
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-info ml-1"
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: intl.formatMessage({ id: "PopConfirmSuccessTitle" }),
          text: intl.formatMessage({ id: "PopConfirmSuccessText" }),
          customClass: {
            confirmButton: "btn btn-success"
          }
        })
        return handleDelete(row.id)
      }
    })
  }

  return (
    <Button.Ripple color="danger" size="sm" id="popClick" onClick={() => handleConfirmCancel()}>
      <Trash2 size={12} />
    </Button.Ripple>
  )
}

export default injectIntl(BasicSweetCallback)
