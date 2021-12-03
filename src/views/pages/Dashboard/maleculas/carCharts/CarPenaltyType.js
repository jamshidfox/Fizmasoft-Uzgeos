import { Bar } from "react-chartjs-2"
import { Card, CardHeader, CardTitle, CardBody, FormGroup, Button, Spinner } from "reactstrap"
import { useEffect, useState } from "react"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import moment from "moment"
import Cleave from "cleave.js/react"
import dashboardApi from "../../api"
import { injectIntl } from "react-intl"
import validateDate from "../../components/DateValidator"
import { toast } from "react-toastify"

const CarPenaltyType = ({ intl, active }) => {
  const [result, setResult] = useState([])
  const [startDate, setStartDate] = useState(moment(new Date()).subtract(1, "days").format("YYYY.MM.DD"))
  const [endDate, setEndDate] = useState(moment(new Date()).format("YYYY.MM.DD"))
  const [sendDate, setSendDate] = useState([moment(new Date()).subtract(1, "days").format("YYYY.MM.DD"), moment(new Date()).format("YYYY.MM.DD")])
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    if (active === "3") {
      const { data } = await dashboardApi.getDataByPenalty(sendDate)
      setResult(data.result)
      if (data) setLoading(false)
    }
  }, [sendDate, active])

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value)
  }

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value)
  }
  const handleSubmit = () => {
    if (!validateDate([moment(startDate).format("DD.MM.YYYY"), moment(endDate).format("DD.MM.YYYY")])) {
      return toast.error(intl.formatMessage({ id: "TimeIntervalError" }))
    } else {
      setLoading(true)
      setSendDate([startDate, endDate])
    }
  }

  const options = {
      elements: {
        rectangle: {
          borderWidth: 2,
          borderSkipped: "bottom"
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      responsiveAnimationDuration: 500,
      legend: {
        display: false
      },
      tooltips: {
        // Updated default tooltip UI
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: "tooltipShadow",
        backgroundColor: "#fff",
        titleFontColor: "#000",
        bodyFontColor: "#000"
      },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: true,
              color: "rgba(200, 200, 200, 0.2)",
              zeroLineColor: "rgba(200, 200, 200, 0.2)"
            },
            scaleLabel: {
              display: false
            },
            ticks: {
              fontColor: "#6e6b7b"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            gridLines: {
              color: "rgba(200, 200, 200, 0.2)",
              zeroLineColor: "rgba(200, 200, 200, 0.2)"
            },
            ticks: {
              stepSize: 100,
              min: 0,
              max: 400,
              fontColor: "#6e6b7b"
            }
          }
        ]
      }
    },
    data = {
      labels: result && result.map((d) => d.title),
      datasets: [
        {
          data: result && result.map((d) => d.count),
          backgroundColor: "#7367F0",
          borderColor: "transparent",
          barThickness: 15
        }
      ]
    }

  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <CardTitle style={{ width: "25%" }} tag="h4">
          {intl.formatMessage({ id: "DashPenalty" })}
        </CardTitle>
        <div className="d-flex justify-content-between align-items-center">
          <FormGroup style={{ margin: "0px 10px" }}>
            <Cleave
              className="form-control"
              value={startDate}
              options={{
                delimiters: [".", "."],
                blocks: [4, 2, 2],
                uppercase: true
              }}
              onChange={handleStartDateChange}
            />
          </FormGroup>
          <FormGroup style={{ margin: "0px 10px" }}>
            <Cleave
              className="form-control"
              value={endDate}
              options={{
                delimiters: [".", "."],
                blocks: [4, 2, 2],
                uppercase: true
              }}
              onChange={handleEndDateChange}
            />
          </FormGroup>
          <Button onClick={handleSubmit} color="primary">
            {loading ? <Spinner size="sm" /> : intl.formatMessage({ id: "DashSend" })}
          </Button>
        </div>
      </CardHeader>

      <span style={{ visibility: result && result.sum ? "visible" : "hidden", textAlign: "center", fontWeight: "bold" }}>
        {intl.formatMessage({ id: "TableTotal" })} {" - "} {result && result.sum}
      </span>

      <CardBody>
        <div style={{ height: "100%", width: "100%" }}>
          <Bar data={data} options={options} height={200} />
        </div>
      </CardBody>
    </Card>
  )
}

export default injectIntl(CarPenaltyType)
