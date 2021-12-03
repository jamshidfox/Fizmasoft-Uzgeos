import ReactECharts from "echarts-for-react"
import { useEffect, useState } from "react"
import dashboardApi from "../../api"
import cloneDeep from "lodash.clonedeep"
import { injectIntl } from "react-intl"
import { Button, Spinner } from "reactstrap"
import Timer from "../../../../components/Timer"
import { useSelector } from "react-redux"

const ByDistricts = ({ intl, sendDate, setLoadingDistrict, loadingDistrict, active, setRegionTimer, regionTimer }) => {
  const skin = useSelector((state) => state.layout.isSkinChange)
  const options = {
    title: {
      text: intl.formatMessage({ id: "DashInfoDistricts" }),
      textStyle: {
        fontSize: 20,
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
         <span style="margin: 0px 25px 0px 0px">${params[0] && params[0].marker} ${params[0].seriesName}</span><span style="margin: 0px 0px 0px 20px"> ${
          params[0] && new Intl.NumberFormat().format(params[0].data)
        }</span> <br /> <span style="margin: 0px 25px 0px 0px">${params[1] ? params[1].marker : ""} ${params[1] ? params[1].seriesName : ""}</span><span style="margin: 0px 0px 0px 20px;"> ${
          params[1] ? new Intl.NumberFormat().format(params[1].data) : ""
        }</span>${params[1] ? "<hr />" : ""} <span style="margin: 0px 30px 0px 0px; font-weight: bold">${
          params[1] && params[0] ? intl.formatMessage({ id: "TableTotal" }) : ""
        }</span><span style="margin: 0px 0px 0px 35px; font-weight: bold"> ${
          params[1] && params[0] ? new Intl.NumberFormat().format(Number(params[0] && params[0].data) + Number(params[1] && params[1].data)) : ""
        }</span> <br />`
      },
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    legend: {
      data: [intl.formatMessage({ id: "DashEntry" }), intl.formatMessage({ id: "DashExit" })],
      textStyle: {
        fontSize: 17,
        textBorderColor: "#000",
        color: "white",
        textBorderType: "solid",
        textBorderWidth: 3,
        fontFamily: "sans-serif"
      }
    },
    grid: {
      left: 200
    },
    xAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          fontSize: "18px",
          textBorderColor: "#000",
          color: "white",
          textBorderWidth: 4,
          fontSize: "12px"
        }
      }
    },
    yAxis: {
      type: "category",
      data: [],
      axisLabel: {
        formatter: "{value}",
        textStyle: {
          textBorderColor: "#000",
          color: "white",
          textBorderWidth: 4,
          fontSize: "12px"
        }
      }
    },
    series: [
      {
        name: intl.formatMessage({ id: "DashEntry" }),
        type: "bar",
        data: [],
        label: {
          formatter: (params) => {
            return new Intl.NumberFormat().format(params.value)
          },
          show: true,
          position: "outside",
          color: skin === "dark" ? "#D0D2D6" : "#000000D9"
        },
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)"
        },
        animationEasing: "elasticOut",
        animationDelay: (idx) => {
          return idx * 10
        },
        animationDelayUpdate: (idx) => {
          return idx * 10
        }
      },
      {
        name: intl.formatMessage({ id: "DashExit" }),
        label: {
          formatter: (params) => {
            return new Intl.NumberFormat().format(params.value)
          },
          show: true,
          position: "outside",
          color: skin === "dark" ? "#D0D2D6" : "#000000D9"
        },
        type: "bar",
        data: [],
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)"
        }
        // barWidth: 30
      }
    ]
  }
  const [data, setData] = useState(options)
  const [kirishCond, setKirishCond] = useState(true)
  const [chiqishCond, setChiqishCond] = useState(true)
  const [pending, setPending] = useState(1)

  async function fetchNewData() {
    setPending(1)
    if (!kirishCond && !chiqishCond) return
    const { data: apiData } = await dashboardApi.getPerimeterDistricts(sendDate)
    if (apiData) {
      setRegionTimer(true)
      setLoadingDistrict(false)
    }
    if (apiData) setPending(0)
    const newoption = cloneDeep(data)
    newoption.yAxis.data = apiData.data.map((d) => d.name)
    newoption.series[0].data = apiData.data.map((d) => d.kirish)
    newoption.series[1].data = apiData.data.map((d) => d.chiqish)
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
      {loadingDistrict ? (
        <div style={{ marginBottom: "-40px" }} className="d-flex justify-content-end">
          <Button className="d-flex justify-content-end" color="primary">
            {loadingDistrict ? <Spinner size="sm" /> : null}
          </Button>
        </div>
      ) : null}
      {active === "1" && <Timer name={intl.formatMessage({ id: "DashInfoDistricts" })} condition={regionTimer} />}
      <ReactECharts style={{ height: "100%", width: "110%" }} theme="dark_theme" option={data} />
    </>
  )
}

export default injectIntl(ByDistricts)
