import { CardBody } from "reactstrap"
import { Line } from "react-chartjs-2"

const CarInOut = () => {
  const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]

  const data = {
    labels,
    datasets: [
      {
        label: "Kirish",
        data: [65, 59, 830, 841, 356, 55, 65, 59, 830, 841, 356, 55, 65, 59, 830, 841, 356, 55, 65, 59, 830, 841, 356, 55],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
      },
      {
        label: "Chiqish",
        data: [5, 9, 50, 341, 612, 365, 5, 9, 50, 341, 612, 365, 5, 9, 50, 341, 612, 365, 5, 9, 50, 341, 612, 365],
        fill: false,
        borderColor: "rgb(75, 192, 102)",
        tension: 0.1
      }
    ]
  }
  const options = {
    maintainAspectRatio: false
  }
  return (
    <CardBody style={{ height: "100%", width: "100%" }}>
      <Line data={data} options={options} />
    </CardBody>
  )
}

export default CarInOut
