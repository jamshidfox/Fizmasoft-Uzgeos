import React from "react"

import { ButtonGroup, Button, UncontrolledTooltip } from "reactstrap"
import { FaDrawPolygon, FaRulerVertical } from "react-icons/fa"
import { BiEraser } from "react-icons/bi"
import { AiOutlineLine } from "react-icons/ai"
import { PlusCircle, Map } from "react-feather"

import { useSelector, useDispatch } from "react-redux"
import {
  handleXududlarOff,
  handleXududlarOn,
  handleRulerAction,
  handleEraserAction,
  handlePolygonAction,
  handleLineAction,
  handleCircleAction
} from "./store/actions/tools"

const Tools = () => {
  const toolsState = useSelector((store) => store.tools)
  const dispatch = useDispatch()

  const changeXududlar = (cond) => {
    cond ? dispatch(handleXududlarOn()) : dispatch(handleXududlarOff())
  }

  return (
    <div className="w-100 d-flex justify-content-center ">
      <ButtonGroup size="sm" className="mb-1">
        <Button
          className="mr-1"
          color="primary"
          outline={!toolsState.xududlar.cond}
          id="Xududlar"
          onClick={() => changeXududlar(!toolsState.xududlar.cond)}
        >
          <Map size={25} />
          <UncontrolledTooltip placement="bottom" target="Xududlar">
            Xududlar
          </UncontrolledTooltip>
        </Button>
        <Button
          size="sm"
          color="primary"
          outline={!toolsState.ruler}
          id="Ruler"
          onClick={() => dispatch(handleRulerAction(!toolsState.ruler))}
        >
          <FaRulerVertical size={25} />
          <UncontrolledTooltip placement="bottom" target="Ruler">
            Ruler
          </UncontrolledTooltip>
        </Button>
        <Button
          color="primary"
          outline={!toolsState.eraser}
          id="Eraser"
          onClick={() => dispatch(handleEraserAction(!toolsState.eraser))}
        >
          <BiEraser size={25} />
          <UncontrolledTooltip placement="bottom" target="Eraser">
            Eraser
          </UncontrolledTooltip>
        </Button>
        <Button
          color="primary"
          outline={!toolsState.polygon}
          id="Polygon"
          onClick={() => dispatch(handlePolygonAction(!toolsState.polygon))}
        >
          <FaDrawPolygon size={25} />
          <UncontrolledTooltip placement="bottom" target="Polygon">
            Polygon
          </UncontrolledTooltip>
        </Button>
        <Button
          color="primary"
          id="Line"
          outline={!toolsState?.line}
          onClick={() => dispatch(handleLineAction(!toolsState?.line))}
        >
          <AiOutlineLine size={25} />
          <UncontrolledTooltip placement="bottom" target="Line">
            Line
          </UncontrolledTooltip>
        </Button>
        <Button
          color="primary"
          id="circle"
          outline={!toolsState?.circle}
          onClick={() => dispatch(handleCircleAction(!toolsState?.circle))}
        >
          <PlusCircle size={25} />
          <UncontrolledTooltip placement="bottom" target="circle">
            Circle
          </UncontrolledTooltip>
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default Tools
