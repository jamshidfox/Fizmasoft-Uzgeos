import React, { useEffect, useState } from "react"
import ReactECharts from "echarts-for-react"
import { Button, Card, Spinner } from "reactstrap"
import { injectIntl } from "react-intl"
import dashboardApi from "../../api"
import Timer from "../../../../components/Timer"

const CarEntryByType = ({ intl, skin, sendDate, active, loadingEntry, setLoadingEntry, entryTimer, setEntryTimer }) => {
  const [result, setResult] = useState([])
  const [sum, setSum] = useState(0)
  const [arr, setArr] = useState([])

  const option = {
    tooltip: {
      trigger: "item"
    },
    legend: {
      formatter: (params) => {
        const amount = result.filter((d) => d.title === params).length > 0 ? result.filter((d) => d.title === params)[0].entry_amount : 0
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
      padding: [0, 0, 40, 0],
      left: "left",
      orient: "vertical",
      textStyle: {
        color: skin === "dark" ? "#D0D2D6" : "#000000D9",
        fontSize: "13px",
        fontFamily: "sans-serif"
      }
    },
    series: [
      {
        name: `${intl.formatMessage({ id: "DashEntry" })}`,
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
            value: d.entry_amount,
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
        setEntryTimer(true)
        setLoadingEntry(false)
      }
    }
  }, [sendDate, active])

  useEffect(() => {
    let total = 0
    result.forEach((item) => {
      total += Number(item.entry_amount)
    })
    setSum(total)
  }, [result])

  // onEvents={{ legendselectchanged: onChartLegendselectchanged }}
  return (
    <Card className="d-flex justify-content-center" style={{ width: "49%", height: "100%", padding: "0px 20px", margin: "0px" }}>
      {active === "2" && <Timer name={intl.formatMessage({ id: "DashEntry" })} condition={entryTimer} />}
      {loadingEntry ? <Spinner style={{ position: "absolute", top: 10 }} color="primary" /> : null}
      <h3 style={{ textAlign: "center" }}>
        {intl.formatMessage({ id: "DashEntry" })}
        {" - "}
        {new Intl.NumberFormat().format(sum)}
      </h3>
      <ReactECharts option={option} />
    </Card>
  )
}

export default injectIntl(CarEntryByType)
