import React, { useState, useEffect } from "react"
import styled from "styled-components"
import moment from "moment"

const ClockSpan = styled.span`
  font-family: Helvetica;
  font-size: 14pt;
  font-weight: bold;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`

const Clock = () => {
  const [clock, setClock] = useState("")
  useEffect(() => {
    const current_time = moment().format("DD.MM.YYYY HH:mm:ss")
    setClock(current_time)
    const time = setInterval(() => {
      setClock(moment().format("DD.MM.YYYY HH:mm:ss"))
    }, 1000)
    return () => clearInterval(time)
  }, [])

  return <ClockSpan>{clock}</ClockSpan>
}

export default Clock
