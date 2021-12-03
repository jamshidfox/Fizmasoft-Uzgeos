import React, { useEffect, useState } from "react"
import { Card, Spinner } from "reactstrap"
import ReactECharts from "echarts-for-react"
import dashboardApi from "../../api"
import { injectIntl } from "react-intl"
import _ from "lodash"
import Timer from "../../../../components/Timer"

const CarOwnerTypeQuantity = ({ intl, skin, sendDate, active, setLoadingOwnerType, loadingOwnerType, setCarOwnerTimer, carOWnerTimer }) => {
  const [result, setResult] = useState([])

  const option = {
    title: {
      left: "center"
    },
    tooltip: {
      trigger: "item"
    },
    legend: {
      formatter: (params) => {
        switch (params) {
          case "Жисмоний":
            return `${params} (${new Intl.NumberFormat().format(result.personal)} та)`
          case "Юридик":
            return `${params} (${new Intl.NumberFormat().format(result.governmental)} та)`
          case "Тури аниқланмаган":
            return `${params} (${new Intl.NumberFormat().format(result.others)} та)`
          default:
            return `${params} (${new Intl.NumberFormat().format(result.personal)} та)`
        }
      },
      orient: "vertical",
      left: "right",
      top: "0%",
      textStyle: {
        color: skin === "dark" ? "#D0D2D6" : "#000000D9"
      }
    },
    series: [
      {
        label: {
          show: true,
          color: skin === "dark" ? "#D0D2D6" : "#000000D9"
        },
        labelLine: {
          lineStyle: {
            color: skin === "dark" ? "#D0D2D6" : "#000000D9"
          }
        },
        name: intl.formatMessage({ id: "Car Owner Type" }),
        type: "pie",
        radius: "50%",
        top: "10%",
        data: _.map(result, (val, key) => {
          return { value: val, name: intl.formatMessage({ id: key }) }
        }),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  }

  useEffect(async () => {
    if (active === "2") {
      const { data } = await dashboardApi.getDataByCarOwnerType(sendDate)
      setResult(data.data)
      if (data) {
        setLoadingOwnerType(false)
        setCarOwnerTimer(true)
      }
    }
  }, [sendDate, active])

  return (
    <Card className="d-flex justify-content-center" style={{ width: "30%", height: "100%", padding: "10px", margin: "0px" }}>
      {active === "2" && <Timer name={intl.formatMessage({ id: "Car Owner Type" })} condition={carOWnerTimer} />}
      {loadingOwnerType ? <Spinner style={{ position: "absolute", top: 10 }} color="primary" /> : null}
      <h3 className="text-center">{intl.formatMessage({ id: "Car Owner Type" })}</h3>
      <ReactECharts option={option} />
    </Card>
  )
}

export default injectIntl(CarOwnerTypeQuantity)
