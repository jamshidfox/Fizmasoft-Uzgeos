// react
import React, { useState, useRef, useEffect } from "react"
// ** Store & Actions
import { useSelector } from "react-redux"

import "./index.scss"

String.prototype.splice = function (idx, str) {
  return this.slice(0, idx) + str + this.slice(idx)
}

const Plate = ({ item, isDisabled }) => {
  const store = useSelector((state) => state.layout.isSkinChange)
  const [carNumber, setCarNumber] = useState("")
  const [type, setType] = useState(0)
  const [vLine, setVLine] = useState(true) //Vertical Line Visibility
  const [iconVisibility, setIconVisibility] = useState(true) //Coutry icon visiblity
  const [isNewPlate, setIsNewPlate] = useState(false)
  const [isMotoplate, setMotoPlate] = useState(false)
  const [iconFirst, setIconFirst] = useState(false)
  const [startSelection, setStart] = useState(0)
  const [endSelection, setEnd] = useState(1)
  const input = useRef()
  const [templateNumber, setTemplateNumber] = useState(false)

  const Formats = [
    /^([0-9_]){2}[a-zA-Z_]{1}([0-9_]){3}[a-zA-Z_]{2}$/g, // 00 A 000 AA
    /^([0-9_]){5}[a-zA-Z_]{3}$/g, // 00 000 AAA
    // eslint-disable-next-line
    /^(C|\_)(M|\_)(D|\_)([0-9_]){4}$/g, // CMD 00-00
    // eslint-disable-next-line
    /^(D|\_)([0-9_]){6}$/g, // D 000000
    // eslint-disable-next-line
    /^(T|\_)([0-9_]){6}$/g, // T 000000
    // eslint-disable-next-line
    /^(X|\_)([0-9_]){6}$/g, // X 000000
    // eslint-disable-next-line
    /^(U|\_)(N|\_)([0-9_]){4}$/g, // UN 0000
    // eslint-disable-next-line
    /^([0-9_]){2}(H|\_)([0-9_]){6}$/g, // 00 H 000000
    // eslint-disable-next-line
    /^([0-9_]){2}(M|\_)([0-9_]){6}$/g, // 00 M 000000
    // eslint-disable-next-line
    /^([0-9_]){6}(M|\_)([a-zA-Z]|\_)$/g, // 01 0000 MT
    /^(P|\_)(A|\_)(A|\_)([0-9_]){3}$/g // PAA 000

    // /^([a-zA-Z_]){1}[0-9_]{3}([a-zA-Z_]){2}[0-9_]{2}$/g, // A 000 AA 00
    //  /^([0-9_]){3}([0-9_]){2}[a-zA-Z_]{2}$/g, // 000 00 AA
    // /^([0-9_]){2}([0-9_]){3}[a-zA-Z_]{3}$/g, // 00 000 AAA
  ]

  const cnFormat = (cn) => {
    if (cn === undefined) return -1 // eslint-disable-next-line
    const t_cn = cn.toUpperCase().replace(/\s|\-/g, "")

    for (let i = 0; i < Formats.length; i++) {
      if (t_cn.match(Formats[i]) !== null) return i
    }
    return -1
  }

  const Templates = [
    "00A000AA",
    "00000AAA",
    "CMD0000",
    "D000000",
    "T000000",
    "X000000",
    "UN0000",
    "00H000000",
    "00M000000",
    "000000MT",
    "PAA000"
    //  '00000AA',
    // '00000AAA',
    // '10TZ000',
    // '18MX000'
  ]
  const Colors = [
    // {
    //   backgroundColor: `${store === "dark" ? "#7367F0" : "white"}`,
    //   color: `${store === "dark" ? "#fff" : "black"}`,
    //   opacity: 1
    // },
    // { backgroundColor: `${store === "dark" ? "grey" : "white"}`, color: "#000000" },
    // { backgroundColor: `${store === "dark" ? "grey" : "white"}`, color: "#000000" },
    { backgroundColor: "white", color: "#000000" },
    { backgroundColor: "white", color: "#000000" },
    { backgroundColor: "#22B14C", color: "white", textAlign: "center" },
    { backgroundColor: "#22B14C", color: "white", textAlign: "center" },
    { backgroundColor: "#22B14C", color: "white", textAlign: "center" },
    { backgroundColor: "#22B14C", color: "white", textAlign: "center" },
    { backgroundColor: "#3F48CC", color: "white", textAlign: "center" },
    { backgroundColor: "#FFC913", color: "black", paddingRight: 20 },
    { backgroundColor: "#22B14C", color: "white", paddingRight: 20 },
    { backgroundColor: "white", color: "black", paddingRight: 20 },
    { backgroundColor: "white", color: "black", textAlign: "right" },
    { backgroundColor: "#22B14C", color: "red" }
  ]

  useEffect(() => {
    input.current.focus()
    input.current.setSelectionRange(startSelection, endSelection)
    if (!isNewPlate) {
      document.addEventListener("keydown", function (event) {
        if (event.keyCode === 113) {
          setCarNumber("")
          setIsNewPlate(true)
          setTemplateNumber(true)
          setVLine(false)
          setIconFirst(false)
          setIconVisibility(false)
        }
      })
    }
  })

  const parseFormat = (cn) => {
    const i = cnFormat(cn)
    setType(i)
    switch (i) {
      case 0:
        setIconVisibility(true)
        setVLine(true)
        setIconFirst(false)
        setMotoPlate(false)
        setIsNewPlate(false)
        return cn.splice(6, " ").splice(3, " ").splice(2, "  ")
      case 1:
        setIconFirst(false)
        setMotoPlate(false)
        setIsNewPlate(false)
        return cn.splice(5, " ").splice(2, "  ")
      case 2:
        setIconFirst(false)
        setIconVisibility(false)
        setVLine(false)
        setMotoPlate(false)
        setIsNewPlate(false)
        return cn.splice(5, "-").splice(3, " ")
      case 3:
        setMotoPlate(false)
        setIsNewPlate(false)
        setIconFirst(false)
        setIconVisibility(false)
        setVLine(false)
        return cn.splice(1, " ")
      case 4:
        setMotoPlate(false)
        setIsNewPlate(false)
        setIconFirst(false)
        setIconVisibility(false)
        setVLine(false)
        return cn.splice(1, " ")
      case 5:
        setMotoPlate(false)
        setIsNewPlate(false)
        setIconFirst(false)
        setIconVisibility(false)
        setVLine(false)
        return cn.splice(1, " ")
      case 6:
        setMotoPlate(false)
        setIsNewPlate(false)
        setIconFirst(false)
        setIconVisibility(false)
        setVLine(false)
        return cn.splice(2, " ")
      case 7:
        setMotoPlate(false)
        setIsNewPlate(false)
        setIconFirst(false)
        setIconVisibility(false)
        setVLine(true)
        return cn.splice(3, " ").splice(2, "  ")
      case 8:
        setMotoPlate(false)
        setIsNewPlate(false)
        setIconFirst(false)
        setIconVisibility(false)
        setVLine(true)
        return cn.splice(3, " ").splice(2, "  ")
      case 9:
        setMotoPlate(false)
        setIsNewPlate(false)
        setIconFirst(false)
        setIconVisibility(true)
        setVLine(true)
        return cn.splice(6, " ").splice(2, "   ")
      case 10:
        setMotoPlate(false)
        setIsNewPlate(false)
        setIconFirst(true)
        setVLine(false)
        setIconVisibility(false)
        return cn.splice(3, " ")
      default:
        setIconFirst(false)
        setIconVisibility(false)
        setVLine(false)
        return cn
    }
  }

  useEffect(() => {
    const cn = parseFormat(item)
    setCarNumber(cn)
  }, [item && templateNumber])

  useEffect(() => {
    const cn = parseFormat(item)
    setCarNumber(cn)
  }, [item || templateNumber])

  const selectChar = (el, isRight) => {
    if (isRight === true) {
      for (let i = el.selectionEnd; i < el.value.length; i++) {
        if (el.value[i] !== " " && el.value[i] !== "-") {
          el.setSelectionRange(i, i + 1)
          setStart(i)
          setEnd(i + 1)
          break
        }
      }
    } else if (isRight === false) {
      for (i = el.selectionStart; i > 0; i--) {
        if (el.value[i - 1] !== " " && el.value[i - 1] !== "-") {
          el.setSelectionRange(i - 1, i)
          setStart(i - 1)
          setEnd(i)

          break
        }
      }
    }
  }

  const focusPlate = (el) => {
    el.focus()
    selectChar(el)
  }

  const isLetter = (str) => {
    return str.length === 1 && str.match(/[a-z]/i)
  }
  const isNumeric = (str) => {
    return /^\d+$/.test(str)
  }

  const setCharAt = (str, index, chr) => {
    if (index > str.length - 1) return str
    return str.substr(0, index) + chr + str.substr(index + 1)
  }

  const handleCustomInputKeyDown = (event) => {
    if (event.keyCode === 112) {
      event.preventDefault()
      setIsNewPlate(false)
      setTemplateNumber(false)
      setVLine(true)
      setIconVisibility(true)
    }
  }
  const classVLine = vLine ? "vertical-line" : "vertical-line none"
  const classIcon = iconVisibility ? "country-icon" : "country-icon none"
  const countryIconFirst = iconFirst ? "country-icon-first" : " country-icon-first none"

  const handle = (event) => {
    event.preventDefault()
    if (event.keyCode === 39 || event.keyCode === 37) {
      if (event.keyCode === 39) {
        selectChar(input.current, true)
        event.preventDefault()
      } else if (event.keyCode === 37) {
        selectChar(input.current, false)
        event.preventDefault()
      }
    } else if ((event.keyCode >= 48 && event.keyCode <= 90) || (event.keyCode >= 96 && event.keyCode <= 105)) {
      const char = carNumber[input.current.selectionStart]
      if ((isNumeric(char) && isNumeric(event.key)) || char === "_") {
        const str = setCharAt(carNumber, input.current.selectionStart, event.key)
        setCarNumber(str)
        selectChar(input.current, true)
      } else if ((isLetter(char) && isLetter(event.key)) || char === "_") {
        const str = setCharAt(carNumber, input.current.selectionStart, event.key)
        setCarNumber(str)
        selectChar(input.current, true)
      }
    } else if (event.keyCode === 112) {
      // When F1 is clicked
      let tt = cnFormat(carNumber)
      const t = cnFormat(item)
      if (tt >= Templates.length - 1) tt = -1
      tt++

      if (tt === t) setCarNumber(parseFormat(item))
      else if (type === tt) setCarNumber(parseFormat(carNumber))
      else setCarNumber(parseFormat(Templates[tt]))
      setStart(0)
      setEnd(1)
    } else {
      focusPlate(input.current)
      event.preventDefault()
    }
  }

  return (
    <div className="plate">
      <div className={classVLine}></div>
      <div className={classIcon}>UZ</div>
      <input
        onDragStart={() => {
          return false
        }}
        onDrop={() => {
          return false
        }}
        type="text"
        spellCheck={false}
        className="form-control"
        maxLength={12}
        id="car_number"
        name="number_plate"
        defaultValue={carNumber}
        onKeyDown={handle}
        onMouseDown={handle}
        ref={input}
        style={Colors[type]}
        disabled={isDisabled}
      />
    </div>
  )
}
export default Plate
