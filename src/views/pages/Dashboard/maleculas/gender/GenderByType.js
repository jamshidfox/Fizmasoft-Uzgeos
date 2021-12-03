import { Bar } from "react-chartjs-2"
import { Card, CardTitle } from "reactstrap"
/// translation
import { injectIntl } from "react-intl"
import { useEffect, useState } from "react"
import dashboardApi from "../../api"

const GenderByType = ({ intl, active }) => {
  const [ageRangeData, setAgeRangeData] = useState(null)
  useEffect(async () => {
    if (active === "4") {
      const { data } = await dashboardApi.getDataAgeRange()
      setAgeRangeData(data)
    }
  }, [active])
  const labels = [intl.formatMessage({ id: "Toddler" }), intl.formatMessage({ id: "Teenager" }), intl.formatMessage({ id: "Middle-aged" }), intl.formatMessage({ id: "Elderly" })]
  const data = {
    labels,
    datasets: [
      {
        data: [ageRangeData && ageRangeData.baby, ageRangeData && ageRangeData.teenager, ageRangeData && ageRangeData.adult, ageRangeData && ageRangeData.elderly],
        backgroundColor: ["#20c997", "#ea5455", "#ff9f43", "#000fff"],
        borderColor: "transparent",
        borderWidth: 1
      }
    ]
  }
  const options = {
    legend: { display: false }
  }

  return (
    <Card style={{ height: "99%", width: "90%", marginLeft: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CardTitle tag="h4">
        {intl.formatMessage({ id: "DashCitizen" })}
        {" - "}
        {intl.formatMessage({ id: "DashGenderByTashkent" })}
      </CardTitle>
      <Bar data={data} options={options} />
    </Card>
  )
}

export default injectIntl(GenderByType)
