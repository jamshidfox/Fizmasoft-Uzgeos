import React, { useEffect, useState } from "react"
import dashboardApi from "../../api"
import ReactECharts from "echarts-for-react"
import { Card, Spinner } from "reactstrap"
import { injectIntl } from "react-intl"
import moment from "moment"
import Timer from "../../../../components/Timer"

const CarRegionByDay = ({ intl, skin, sendDate, active, setLoadingByWeek, loadingByWeek, regionTimer, setRegionTimer }) => {
  const [result, setResult] = useState([])
  const [days, setDays] = useState("")

  useEffect(() => {
    setDays(
      result.map((date) => {
        return {
          date: moment(date.date, "YYYY-MM-DD").format("dddd"),
          weekDate: moment(date.date).format("DD.MM.YYYY")
        }
      })
    )
  }, [result])
  const option = {
    tooltip: {
      useHTML: true,
      formatter: (params) => {
        return `<div class='tooltip-key'>${params[0] && params[0].axisValue}<br />
         <span style="margin: 0px 20px 0px 0px">${params[0] && params[0].marker} ${params[0].seriesName}</span><span style="margin: 0px 0px 0px 20px"> ${
          params[0] && new Intl.NumberFormat().format(params[0].data)
        }</span> <br /> <span style="margin: 0px 20px 0px 0px">${params[1] ? params[1].marker : ""} ${params[1] ? params[1].seriesName : ""}</span><span style="margin: 0px 0px 0px 20px"> ${
          params[1] ? new Intl.NumberFormat().format(params[1].data) : ""
        }</span>${params[1] ? "<hr />" : ""} <span style="margin: 0px 30px 0px 0px; font-weight: bold">${
          params[1] && params[0] ? intl.formatMessage({ id: "TableTotal" }) : ""
        }</span><span style="margin: 0px 0px 0px 30px; font-weight: bold"> ${
          params[0] && params[1] ? new Intl.NumberFormat().format(Number(params[0] && params[0].data) + Number(params[1] && params[1].data)) : ""
        }</span>`
      },
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      textStyle: {
        color: skin === "dark" ? "#D0D2D6" : "#000000D9"
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: days.length > 0 && days.map((d) => `${d.weekDate} \n ${intl.formatMessage({ id: d.date })}`),
        axisLabel: {
          textStyle: {
            color: skin === "dark" ? "white" : "#000000D9",
            fontSize: "16px"
          }
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          textStyle: {
            color: skin === "dark" ? "white" : "#000000D9"
          }
        }
      }
    ],
    series: [
      {
        name: intl.formatMessage({ id: "DashEntry" }),
        label: {
          formatter: (params) => {
            return new Intl.NumberFormat().format(params.value)
          },
          show: true,
          position: "outside",
          padding: [0, 0, 0, 40],
          rotate: 45,
          color: skin === "dark" ? "white" : "#000000D9"
        },
        type: "bar",
        emphasis: {
          focus: "series"
        },
        data: result.map((d) => d.kirish)
      },
      {
        label: {
          formatter: (params) => {
            return new Intl.NumberFormat().format(params.value)
          },
          show: true,
          position: "outside",
          padding: [0, 0, 0, 40],
          rotate: 45,
          color: skin === "dark" ? "white" : "#000000D9"
        },
        name: intl.formatMessage({ id: "DashExit" }),
        showDatapoints: true,
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series"
        },
        data: result.map((d) => d.chiqish)
      }
    ]
  }

  useEffect(async () => {
    if (active === "2") {
      const { data } = await dashboardApi.getCarDataByDay(sendDate[0].slice(0, 10), sendDate[1].slice(0, 10))
      setResult(data)
      if (data) {
        setLoadingByWeek(false)
        setRegionTimer(true)
      }
    }
  }, [sendDate, active])

  return (
    <Card className="d-flex justify-content-center" style={{ width: "69%", height: "100%" }}>
      {active === "2" && <Timer name={intl.formatMessage({ id: "DashKunlikMalumot" })} condition={regionTimer} />}
      <div className="d-flex justify-content-between mx-2">
        {loadingByWeek ? <Spinner style={{ position: "absolute", top: 10, right: 20 }} color="primary" /> : null}
        <h3>{intl.formatMessage({ id: "DashKunlikMalumot" })}</h3>
      </div>
      <ReactECharts option={option} />
    </Card>
  )
}

export default injectIntl(CarRegionByDay)
