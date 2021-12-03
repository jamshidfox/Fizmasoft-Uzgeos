import React, { useEffect, useState } from "react"
import ReactECharts from "echarts-for-react"
import { Card, Spinner } from "reactstrap"
import { injectIntl } from "react-intl"
import dashboardApi from "../../api"
import Timer from "../../../../components/Timer"

const CarExitByType = ({ intl, skin, sendDate, active, setLoadingExit, loadingExit, exitTimer, setExitTimer }) => {
  const [result, setResult] = useState([])
  const [sum, setSum] = useState(0)

  const option = {
    tooltip: {
      trigger: "item"
    },
    legend: {
      formatter: (params) => {
        const amount = result.filter((d) => d.title === params).length > 0 ? result.filter((d) => d.title === params)[0].exit_amount : 0
        return `${params} (${new Intl.NumberFormat().format(amount)} та)`
      },
      selector: [
        {
          type: "all",
          title: intl.formatMessage({ id: "DashTurnOn" })
        },
        {
          type: "inverse",
          title: intl.formatMessage({ id: "DashTurnOff" })
        }
      ],
      selectorLabel: {
        color: skin === "dark" ? "#D0D2D6" : "#000000D9",
        padding: [5, 20, 5, 20]
      },
      top: "0%",
      left: "left",
      padding: [0, 0, 40, 0],
      orient: "vertical",
      textStyle: {
        color: skin === "dark" ? "#D0D2D6" : "#000000D9",
        fontSize: "13px",
        fontFamily: "sans-serif"
      }
    },
    series: [
      {
        name: intl.formatMessage({ id: "DashExit" }),
        type: "pie",
        center: ["83%", "50%"],
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2
        },
        label: {
          show: false,
          position: "center"
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "16",
            fontWeight: "bold"
          }
        },
        labelLine: {
          show: false
        },
        data: result.map((d) => {
          return {
            value: d.exit_amount,
            name: d.title
          }
        })
      }
    ]
  }

  useEffect(async () => {
    if (active === "2") {
      const { data } = await dashboardApi.getCarDataByRegion(sendDate)
      setResult(data.data)
      if (data) {
        setLoadingExit(false)
        setExitTimer(true)
      }
    }
  }, [sendDate, active])

  useEffect(() => {
    let total = 0
    result.forEach((item) => {
      total += Number(item.exit_amount)
    })
    setSum(total)
  }, [result])

  return (
    <Card className="d-flex justify-content-center" style={{ width: "49%", height: "100%", padding: "0px 20px", margin: "0px" }}>
      {active === "2" && <Timer name={intl.formatMessage({ id: "DashExit" })} condition={exitTimer} />}
      {loadingExit ? <Spinner style={{ position: "absolute", top: 10 }} color="primary" /> : null}
      <h3 style={{ textAlign: "center" }}>
        {intl.formatMessage({ id: "DashExit" })} {" - "}
        {new Intl.NumberFormat().format(sum)}
      </h3>
      <ReactECharts option={option} />
    </Card>
  )
}

export default injectIntl(CarExitByType)
