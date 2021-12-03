import React from "react"
import { Table, Spinner, Progress, Label } from "reactstrap"
import ReactPaginate from "react-paginate"
import PerfectScrollbar from "react-perfect-scrollbar"
import { injectIntl } from "react-intl"

const CustomTable = ({ columns, rows, size = "default", loading = false, count, currentPage, handlePagination, pagination = true, intl, totalCount }) => {
  return (
    <>
      <div style={{ height: "100%", overflow: "hidden", width: "100%" }}>
        {loading ? (
          <div
            style={{
              position: "absolute",
              zIndex: 2,
              height: "100%",
              width: "98%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
              // background: "#fff"
            }}
          >
            <Spinner color="primary" />
          </div>
        ) : (
          <PerfectScrollbar>
            <Table className="table" hover size={size}>
              <thead>
                <tr>{columns()}</tr>
              </thead>
              <tbody style={{ width: "100%" }}>{rows()}</tbody>
            </Table>
          </PerfectScrollbar>
        )}
      </div>

      {pagination && (
        <ReactPaginate
          style={{ position: "sticky", bottom: "0", width: "100%" }}
          pageCount={count}
          forcePage={currentPage}
          nextLabel=""
          breakLabel="..."
          previousLabel=""
          activeClassName="active"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          onPageChange={(page) => handlePagination(page)}
          pageClassName={"page-item"}
          nextLinkClassName={"page-link"}
          nextClassName={"page-item next"}
          previousClassName={"page-item prev"}
          previousLinkClassName={"page-link"}
          pageLinkClassName={"page-link"}
          containerClassName={"pagination react-paginate justify-content-end p-1"}
        />
      )}
    </>
  )
}

export default injectIntl(CustomTable)
