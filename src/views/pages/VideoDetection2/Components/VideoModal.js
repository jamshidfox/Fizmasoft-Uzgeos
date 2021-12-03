import { Modal, ModalBody, ModalHeader } from "reactstrap"
import ReactHlsPlayer from "react-hls-player"
import F from "../../Map/pure/fizmasoft/fizmasoft"
import "../../Map/pure/fizmasoft/fizmasoft.stream"
import moment from "moment"

const correctTime = (time) => {
  const start = new Date(time),
    end = new Date(time)
  start.setSeconds(start.getSeconds() - 10)
  start.setHours(start.getHours() + 5)
  end.setHours(end.getHours() + 5)
  return [start, end]
}

const VideoModal = ({ url, open, setOpen, channel, time }) => {
  const fizmasoftPlay = () => {
    F.stream({ ipAddress: "10.2.1.6", port: "37777", login: "admin", password: "parol12345" }).playback(channel, correctTime(time)[0], correctTime(time)[1])
    setOpen(false)
  }
  return (
    <Modal isOpen={open} toggle={() => setOpen(!open)} className="modal-dialog-centered modal-lg">
      <ModalHeader toggle={() => setOpen(!open)} />
      {open && <ModalBody>{F.Browser.FS ? fizmasoftPlay() : <ReactHlsPlayer src={url} autoPlay={true} controls={true} width="100%" height="auto" />}</ModalBody>}
    </Modal>
  )
}

export default VideoModal
