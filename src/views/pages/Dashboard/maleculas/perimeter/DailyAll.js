import ReactECharts from "echarts-for-react"
import { useEffect, useState } from "react"
import dashboardApi from "../../api"
import cloneDeep from "lodash.clonedeep"
import { injectIntl } from "react-intl"
import moment from "moment"
import Timer from "../../../../components/Timer"

const DatailyAll = ({ intl, sendDate, setLoading, active, setDayTimer, dayTimer }) => {
  const options = {
    title: {
      text: intl.formatMessage({ id: "NtfsInfoModalGeneral" }),
      textStyle: {
        fontSize: 20,
        fontWeight: "bolder",
        textBorderColor: "#000",
        color: "white",
        textBorderType: "solid",
        textBorderWidth: 3
      }
    },
    color: ["#7367f0", "#03a9f4"],
    tooltip: {
      formatter: (params) => {
        return `<div class='tooltip-key'>${params[0] && params[0].axisValue}<br />
         <span style="margin: 0px 20px 0px 0px">${params[0] && params[0].marker} ${params[0].seriesName}</span><span style="margin: 0px 0px 0px 20px"> ${
          params[0] && new Intl.NumberFormat().format(params[0].data)
        }</span> <br /> <span style="margin: 0px 20px 0px 0px">${params[1] ? params[1].marker : ""} ${params[1] ? params[1].seriesName : ""}</span><span style="margin: 0px 0px 0px 20px"> ${
          params[1] ? new Intl.NumberFormat().format(params[1].data) : ""
        }</span>${params[1] ? "<hr />" : ""} <span style="margin: 0px 60px 0px 0px; font-weight: bold">${
          params[1] && params[0] ? intl.formatMessage({ id: "TableTotal" }) : ""
        }</span><span style="margin: 0px 0px 0px 70px; font-weight: bold"> ${
          params[1] && params[0] ? new Intl.NumberFormat().format(Number(params[0] && params[0].data) + Number(params[1] && params[1].data)) : ""
        }</span>`
      },
      trigger: "axis",
      axisPointer: {
        animation: false,
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    legend: {
      data: [],
      textStyle: {
        fontSize: 40,
        textBorderColor: "#000",
        color: "white",
        textBorderType: "solid",
        textBorderWidth: 3,
        fontFamily: "sans-serif"
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
        boundaryGap: false,
        data: [],
        axisLabel: {
          rotate: 45,
          formatter: "{value}",
          textStyle: {
            textBorderColor: "#000",
            color: "white",
            textBorderWidth: 4,
            fontSize: "10px",
            letterSpacing: "30px"
          }
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          formatter: "{value}",
          textStyle: {
            textBorderColor: "#000",
            color: "white",
            textBorderWidth: 4,
            fontSize: "12px",
            letterSpacing: "30px"
          }
        }
      }
    ],
    series: [
      {
        smooth: true,
        name: "",
        type: "line",
        // stack: "1",
        label: {
          show: false,
          position: "bottom"
        },
        areaStyle: {
          opacity: 0
        },
        emphasis: {
          focus: "series"
        },
        symbol: "none",
        data: []
      },
      {
        smooth: true,
        name: ``,
        type: "line",
        // stack: "1",
        label: {
          show: false,
          position: "top"
        },
        areaStyle: {
          opacity: 0
        },
        emphasis: {
          focus: "series"
        },
        symbol: "none",
        data: []
      }
    ]
  }
  const [data, setData] = useState(options)
  const [kirishCond, setKirishCond] = useState(true)
  const [chiqishCond, setChiqishCond] = useState(true)
  const [total, setTotal] = useState(0)
  const [pending, setPending] = useState(1)

  async function fetchNewData() {
    setPending(1)
    if (!kirishCond || !chiqishCond) return
    const { data: apiData } = await dashboardApi.getPerimeterDaily(sendDate)
    if (apiData) {
      setLoading(false)
      setDayTimer(true)
    }
    if (apiData) setPending(0)
    const newoption = cloneDeep(data)
    let kirish = 0,
      chiqish = 0
    const kirishArr = [],
      chiqishArr = [],
      xArr = []
    apiData.data.forEach((d, i) => {
      if (i !== apiData.data.length) {
        kirish += +d.kirish
        chiqish += +d.chiqish
        kirishArr.push(d.kirish)
        chiqishArr.push(d.chiqish)
        if (apiData.data && apiData.data.length > 0) xArr.push(moment(d.time).format("DD/MM HH:mm"))
      }
    })
    newoption.legend.data = [
      `${intl.formatMessage({ id: "DashEntry" })} [${new Intl.NumberFormat().format(kirish)}]:`,
      `${intl.formatMessage({ id: "DashExit" })} [${new Intl.NumberFormat().format(chiqish)}]:`
    ]
    newoption.xAxis[0].data = xArr
    newoption.series[0].data = kirishArr
    newoption.series[0].name = `${intl.formatMessage({ id: "DashEntry" })} [${new Intl.NumberFormat().format(kirish)}]:`
    newoption.series[1].data = chiqishArr
    newoption.series[1].name = `${intl.formatMessage({ id: "DashExit" })} [${new Intl.NumberFormat().format(chiqish)}]:`
    setTotal(chiqish + kirish)
    setData(newoption)
  }

  useEffect(() => {
    fetchNewData()
  }, [sendDate])

  useEffect(() => {
    if (active === "1") {
      if (pending === 0) {
        const timer = setInterval(() => {
          fetchNewData()
        }, 10000)
        return () => clearInterval(timer)
      }
    }
  }, [active, sendDate, pending])

  // const onChartLegendselectchanged = (param) => {
  //   const keys = Object.keys(param.selected)
  //   setKirishCond(param.selected[keys[0]])
  //   setChiqishCond(param.selected[keys[1]])
  // }

  return (
    <>
      <div style={{ height: "100%", width: "103%", position: "relative" }}>
        {active === "1" && <Timer name={intl.formatMessage({ id: "NtfsInfoModalGeneral" })} condition={dayTimer} />}
        <h1 style={{ position: "absolute", right: "5%", top: "10px" }}>{`${intl.formatMessage({ id: "TableTotal" })}: ${new Intl.NumberFormat().format(total)}`}</h1>
        <ReactECharts theme="dark_theme" option={data} theme={"theme_name"} />
      </div>
    </>
  )
}

export default injectIntl(DatailyAll)
