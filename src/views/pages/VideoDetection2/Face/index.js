import React, { useEffect, useState } from "react"
import FoundCard from "./FoundCard"
import PerfectScrollbar from "react-perfect-scrollbar"
import Sider from "./Sider"
import "react-perfect-scrollbar/dist/css/styles.css"
import ReactPaginate from "react-paginate"
import Total from "../Components/Total"

const Face = () => {
  const [data, setData] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(24)
  const [currentPage, setCurrentPage] = useState(0)
  const [renderData, setRenderData] = useState([])
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!data) return
    const tmp = currentPage * itemsPerPage
    const pageData = [...data.slice(tmp, tmp + itemsPerPage)]
    setRenderData(pageData)
  }, [currentPage, data])

  const getResults = (data) => {
    setCurrentPage(0)
    setData(data)
  }
  return (
    <div className="d-flex">
      <Sider exportResult={getResults} />
      <PerfectScrollbar style={{ height: "calc(100vh - 135px)", width: "100vw" }}>
        {data ? <Total data={data} selected={selected} /> : null}
        {renderData ? (
          <div className="d-flex flex-wrap">
            {renderData.map((d, i) => (
              <FoundCard key={d.human_id || d.face_id || i} data={d} setSelected={setSelected} selected={selected} />
            ))}
          </div>
        ) : null}
        {data && data.length > 0 && (
          <ReactPaginate
            pageCount={Math.ceil(data.length / itemsPerPage)}
            forcePage={currentPage}
            nextLabel=""
            breakLabel="..."
            previousLabel=""
            activeClassName="active"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            onPageChange={({ selected }) => setCurrentPage(selected)}
            pageClassName={"page-item"}
            nextLinkClassName={"page-link"}
            nextClassName={"page-item next"}
            previousClassName={"page-item prev"}
            previousLinkClassName={"page-link"}
            pageLinkClassName={"page-link"}
            containerClassName={"pagination react-paginate justify-content-end p-1"}
          />
        )}
      </PerfectScrollbar>
    </div>
  )
}

export default Face
