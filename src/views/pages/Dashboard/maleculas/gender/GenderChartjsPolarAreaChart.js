import { Doughnut } from "react-chartjs-2"
import { User } from "react-feather"
import { Card, CardHeader, CardTitle, CardBody, Col, Row } from "reactstrap"
/// translation
import { FormattedHTMLMessage, injectIntl } from "react-intl"

const ChartjsRadarChart = ({ tooltipShadow, intl }) => {
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
        // Updated default tooltip UI
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: tooltipShadow,
        backgroundColor: "#fff",
        titleFontColor: "#000",
        bodyFontColor: "#000"
      }
    },
    data = {
      datasets: [
        {
          labels: [intl.formatMessage({ id: "MAN" }), intl.formatMessage({ id: "WOMAN" })],
          data: [100, 40],
          backgroundColor: ["#00cfe8", "#ea5455"],
          borderWidth: 0,
          pointStyle: "rectRounded"
        }
      ]
    }
  return (
    <Card style={{ height: "49%" }}>
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <CardTitle tag="h4">
          {<FormattedHTMLMessage id="DashCitizen" />}
          {" - "} {<FormattedHTMLMessage id="DashGenderByTashkent" />}
        </CardTitle>
      </CardHeader>
      <CardBody className="d-flex flex-column justify-content-around">
        <div style={{ height: "70%" }}>
          <Doughnut data={data} options={options} />
        </div>
        <div style={{ height: "10%" }} className="d-flex justify-content-between mt-1">
          <div className="d-flex justify-content-around w-100">
            <div>
              <User style={{ color: "#00cfe8" }} size={17} />
              <span className="font-weight-bold ml-75 mr-25">{<FormattedHTMLMessage id="MAN" />}</span>
              {" - "}
              <span>{40}</span>
            </div>
            <div>
              <User style={{ color: "#ea5455" }} size={17} className="text-danger" />
              <span className="font-weight-bold ml-75 mr-25">{<FormattedHTMLMessage id="WOMAN" />}</span>
              {" - "}
              <span>40</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default injectIntl(ChartjsRadarChart)
