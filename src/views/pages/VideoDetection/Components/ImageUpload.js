import Uppy from "@uppy/core"
import thumbnailGenerator from "@uppy/thumbnail-generator"
import { DragDrop } from "@uppy/react"
import { useState } from "react"
import "uppy/dist/uppy.css"
import "@uppy/status-bar/dist/style.css"
import "@styles/react/libs/file-uploader/file-uploader.scss"
import { X } from "react-feather"
import { injectIntl } from "react-intl"

const ImageUpload = ({ intl, exportBase64 }) => {
  const [img, setImg] = useState(null)
  const user_photoInfo = intl.formatMessage({ id: "SetUserPhotoInfo" })
  const uppy = new Uppy({
    meta: { type: "avatar" },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
  })

  uppy.use(thumbnailGenerator)

  uppy.on("thumbnail:generated", (file, preview) => {
    setImg(preview)
  })

  uppy.on("file-added", function (file) {
    const reader = new FileReader()
    reader.readAsDataURL(file.data)
    reader.onloadend = function () {
      const base64data = reader.result.replace(/^data:image\/jpeg;base64,/, "").replace(/^data:image\/png;base64,/, "")
      exportBase64(base64data)
    }
  })
  return (
    <>
      {img !== null ? (
        <>
          <button onClick={() => setImg(null)} className="btn btn-danger btn-sm" style={{ borderRadius: 15, position: "absolute", top: 60, right: -3 }}>
            <X size={17} />
          </button>
          <img className="rounded mt-2" style={{ height: 250, objectFit: "contain" }} src={img} alt="avatar" />
        </>
      ) : (
        <DragDrop locale={{ strings: { dropHereOr: user_photoInfo } }} uppy={uppy} />
      )}
    </>
  )
}

export default injectIntl(ImageUpload)
