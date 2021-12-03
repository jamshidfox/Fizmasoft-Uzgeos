import { Doughnut } from "react-chartjs-2"
import { Home } from "react-feather"
import { Card, CardHeader, CardTitle, CardBody, Col, Row } from "reactstrap"
/// translation
import { FormattedHTMLMessage, injectIntl } from "react-intl"
import dashboardApi from "../api"
import { useEffect, useState } from "react"

const XatlovChartjsRadarChart = ({ tooltipShadow, intl, active }) => {
  const [turarData, setTurarData] = useState(null)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    responsiveAnimationDuration: 500,
    cutoutPercentage: 60,
    legend: { display: false },
    tooltips: {
      callbacks: {
        label(tooltipItem, data) {
          const label = data.datasets[0].labels[tooltipItem.index] || "",
            value = data.datasets[0].data[tooltipItem.index]
          const output = ` ${label} : ${value}`
          return output
        }
      },
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      shadowBlur: 8,
      shadowColor: tooltipShadow,
      backgroundColor: "#fff",
      titleFontColor: "#000",
      bodyFontColor: "#000"
    }
  }
  const data = {
    datasets: [
      {
        labels: [intl.formatMessage({ id: "DashTurar" }), intl.formatMessage({ id: "DashNoTurar" })],
        data: [turarData && turarData.houses, turarData && turarData.businesses],
        backgroundColor: ["#6610f2", "#ff9f43"],
        borderWidth: 0,
        pointStyle: "rectRounded"
      }
    ]
  }
  useEffect(async () => {
    if (active === "4") {
      const { data } = await dashboardApi.getDataTurar()
      setTurarData(data)
    }
  }, [active])
  return (
    <Card style={{ height: "48%", marginBottom: "10px" }}>
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <CardTitle tag="h4">{<FormattedHTMLMessage id="DashXatlov" />}</CardTitle>
      </CardHeader>
      <CardBody className="d-flex flex-column justify-content-between">
        <div style={{ height: "70%" }}>
          <Doughnut data={data} options={options} />
        </div>
        <div style={{ height: "10%" }} className="d-flex justify-content-between mt-1">
          <div className="d-flex justify-content-around w-100">
            <div>
              <Home style={{ color: "#6610f2" }} size={17} />
              <span className="font-weight-bold ml-75 mr-25">{<FormattedHTMLMessage id="DashTurar" />}</span>
              {" - "}
              <span>{turarData && turarData.houses}</span>
            </div>
            <div>
              <Home style={{ color: "#ff9f43" }} size={17} />
              <span className="font-weight-bold ml-75 mr-25">
                {<FormattedHTMLMessage id="DashNoTurar" />} {" - "}
              </span>
              <span>{turarData && turarData.businesses}</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default injectIntl(XatlovChartjsRadarChart)
