import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import dashboardApi from "../api"

const OnListChartPie = ({ skin, active }) => {
  const [dataOnList, setDataOnList] = useState(null)
  const colors = [
    "red",
    "black",
    "blue",
    "#4aa2a3",
    "#4aa2a3",
    "#adf222",
    "#ada2f2",
    "#aaa222",
    "red",
    "black",
    "blue",
    "#4aa2a3",
    "#4aa2a3",
    "#adf222",
    "#ada2f2",
    "#aaa222",
    "red",
    "black",
    "blue",
    "#4aa2a3",
    "#4aa2a3",
    "#adf222",
    "#ada2f2",
    "#aaa222",
    "red",
    "black",
    "blue",
    "#4aa2a3",
    "#4aa2a3",
    "#adf222",
    "#ada2f2",
    "#aaa222",
    "red",
    "black",
    "blue",
    "#4aa2a3",
    "#4aa2a3",
    "#adf222",
    "#ada2f2",
    "#aaa222",
    "#4aa2a3",
    "#4aa2a3"
  ]
  useEffect(async () => {
    if (active === "5") {
      const { data } = await dashboardApi.getDataOnList()
      setDataOnList(data)
    }
  }, [active])

  const onList = dataOnList && dataOnList.map((d) => d.title)
  const onListNumber = dataOnList && dataOnList.map((d) => d.count)
  const labels = onList
  const data = {
    labels,
    datasets: [
      {
        data: onListNumber,
        backgroundColor: colors,
        borderColor: "transparent",
        borderWidth: 1
      }
    ]
  }
  const options = {
    legend: {
      display: false,
      textStyle: {
        color: skin === "dark" ? "#D0D2D6" : "#000000D9"
      }
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: skin === "dark" ? "white" : "#000000D9"
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: skin === "dark" ? "white" : "#000000D9"
          }
        }
      ]
    }
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  )
}

export default OnListChartPie
