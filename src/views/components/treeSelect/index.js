import React from "react"
import { Tree } from "antd"
import styled from "styled-components"

// ** Store & Actions
import { useSelector } from "react-redux"

import "antd/dist/antd.css"

const CustomTreeSelect = ({ defaultExpandAll = false, defaultCheckedKeys = [], data, onChange, multiple = true }) => {
  const theme = useSelector((state) => state.layout.isSkinChange)

  return <StyledTree multiple={multiple} defaultExpandAll={defaultExpandAll} defaultCheckedKeys={defaultCheckedKeys} theme={theme ? theme : "light"} checkable onCheck={onChange} treeData={data} />
}
const StyledTree = styled(Tree)`
  background-color: ${(props) => (props.theme === "dark" ? "#283046 !important" : "#fff !important")};

  .ant-tree-title {
    color: ${(props) => (props.theme === "dark" ? "#fff !important" : "#000 !important")};
    /* background-color: red important; */
  }
  .anticon {
    text-align: center;
    color: ${(props) => (props.theme === "dark" ? "#fff !important" : "#000 !important")};
  }
  .ant-tree-node-content-wrapper {
    &:hover {
      background-color: transparent !important;
    }
  }
  .ant-tree-node-selected {
    background-color: transparent !important;
  }
`

export default CustomTreeSelect
