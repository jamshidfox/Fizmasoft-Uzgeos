import { Image } from "react-feather"
import { injectIntl } from "react-intl"
import "@styles/react/libs/noui-slider/noui-slider.scss"
import { Input } from "reactstrap"

const ImageUpload = ({ intl, img, setImg, setSimilarity, similarity }) => {
  const handleImgUpload = (e) => {
    if (e.target.files.length === 0) return
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = function () {
      const res = reader.result

      setImg(res)
    }
  }

  return (
    <div className="border" style={{ height: 300, width: "85%", margin: "0 5px 10px 5px", padding: "0 10px", display: "flex", flexDirection: "column" }}>
      <label
        style={{ cursor: "pointer", border: "1px solid gray", margin: "10px 0", padding: "5px 15px", display: "flex", justifyContent: "space-around", alignItems: "center" }}
        htmlFor="upload-photo"
      >
        {intl.formatMessage({ id: "SetUserPhotoInfo" })} <Image />
      </label>
      <input style={{ opacity: 0, position: "absolute", zIndex: -1 }} type="file" name="photo" accept="image/*" id="upload-photo" onChange={handleImgUpload} />
      {img && (
        <>
          <img className="rounded" style={{ height: "55%", width: "100%", objectFit: "contain" }} src={img} alt="avatar" />
        </>
      )}
      <div className="d-flex justify-content-around" style={{ visibility: img ? "visible" : "hidden", marginTop: 20 }}>
        <Input
          style={{ width: "75%" }}
          onChange={(e) => setSimilarity(+e.target.value)}
          type="range"
          className="form-range cursor-pointer"
          min="0"
          max="100"
          value={similarity}
          id="customRange2"
        ></Input>
        <label htmlFor="customRange2" className="form-label">
          {`${similarity} %`}
        </label>
      </div>
    </div>
  )
}

export default injectIntl(ImageUpload)
