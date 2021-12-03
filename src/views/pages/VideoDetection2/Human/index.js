import React, { useEffect, useState } from "react"
import FoundCard from "../../VideoDetection2/Human/FoundCard"
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"
import Sider from "./Sider"
import ReactPaginate from "react-paginate"
import Total from "../Components/Total"

const Human = () => {
  const [data, setData] = useState([])
  const [filters, setFilters] = useState(null)
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
      <Sider filters={filters} setFilters={setFilters} exportResult={getResults} />
      <PerfectScrollbar style={{ height: "calc(100vh - 135px)", width: "100vw" }}>
        {data ? <Total data={data} selected={selected} /> : null}
        <div className="d-flex flex-wrap">
          {renderData ? renderData.map((d, i) => <FoundCard key={d.human_id || d.face_id || i} gender={filters.gender} data={d} setSelected={setSelected} selected={selected} />) : false}
        </div>
        {data && (
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

export default Human
