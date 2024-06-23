import React from "react";
import { Pagination } from "react-bootstrap";

function PaginationComp({ dto, setCurrentPage}){

    
    
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber - 1);
    };

    const renderPaginationItems = () => {
        let items = [];
        const totalPages = dto.totalPage;
        const currentPage = dto.currentPage;
        const deltaBefore = 1;
        const deltaAfter = 2;
    
        if (currentPage <= deltaBefore + 2) {
            for (let number = 1; number <= Math.min(totalPages, currentPage + deltaAfter); number++) {
                items.push(
                    <Pagination.Item
                        linkStyle={{background: "#A79B94",
                            border:"1px solid #786960",
                            color:"#F3F4F6"
                        }}
                        className="reddit-regular-font page"
                        key={number}
                        active={number === currentPage}
                        onClick={() => handlePageClick(number)}>
                        {number}
                    </Pagination.Item>
                );
            }
            if (totalPages > currentPage + deltaAfter) {
                items.push(<Pagination.Ellipsis key="ellipsis-1" linkStyle={{background: "#A79B94",
                    border:"1px solid #786960",
                    color:"#F3F4F6"}} 
                />);
                items.push(
                    <Pagination.Item
                        linkStyle={{background: "#A79B94",
                            border:"1px solid #786960",
                            color:"#F3F4F6"
                        }}
                        className="reddit-regular-font page"
                        key={totalPages}
                        active={currentPage === totalPages}
                        onClick={() => handlePageClick(totalPages)}>
                        {totalPages}
                    </Pagination.Item>
                );
            }
        } else {
            items.push(
                <Pagination.Item
                    linkStyle={{background: "#A79B94",
                        border:"1px solid #786960",
                        color:"#F3F4F6"
                    }}
                    className="reddit-regular-font page"
                    key={1}
                    active={currentPage === 1}
                    onClick={() => handlePageClick(1)}>
                    1
                </Pagination.Item>
            );
            items.push(<Pagination.Ellipsis key="ellipsis-2" linkStyle={{background: "#A79B94",
                border:"1px solid #786960",
                color:"#F3F4F6"}} 
                />);
            for (let number = Math.max(1, currentPage - deltaBefore); number <= Math.min(totalPages, currentPage + deltaAfter); number++) {
                items.push(
                    <Pagination.Item
                        linkStyle={{background: "#A79B94",
                            border:"1px solid #786960",
                            color:"#F3F4F6"
                        }}
                        className="reddit-regular-font page"
                        key={number}
                        active={number === currentPage}
                        onClick={() => handlePageClick(number)}>
                        {number}
                    </Pagination.Item>
                );
            }
            if (currentPage + deltaAfter < totalPages) {
                items.push(<Pagination.Ellipsis key="ellipsis-3" linkStyle={{background: "#A79B94",
                border:"1px solid #786960",
                color:"#F3F4F6"}} 
            />);                items.push(
                    <Pagination.Item
                        linkStyle={{background: "#A79B94",
                            border:"1px solid #786960",
                            color:"#F3F4F6"
                        }}
                        className="reddit-regular-font page"
                        key={totalPages}
                        active={currentPage === totalPages}
                        onClick={() => handlePageClick(totalPages)}>
                        {totalPages}
                    </Pagination.Item>
                );
            }
        }
        return items;
    };
    

    return<>
        {dto.totalPage === 1 ? "" : <Pagination className="pagination">{renderPaginationItems()}</Pagination> }

    </>
}

export default PaginationComp;