/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import '../pagination/pagination.css'

const Pagination=({pageHandler, totalPages,currentPage,setStartPage,startPage,pagesToShow}) => {

  let pageNumbers = [];
  for (let i = 0;  i < pagesToShow; i++) {
    if(startPage + i <= totalPages && startPage >= 1) pageNumbers.push(startPage + i);
  }
  
    return (
      <div className="pagination">
      {pageNumbers.length > 1 && startPage > 1 ? (
        <button className='pagination-button' onClick={() => {
          pageHandler(1)
          setStartPage(1)}}>First</button>
      ):null}
      {pageNumbers.length > 1 && currentPage > 1 ?(
        <button className='pagination-button' onClick={() => { 
          pageHandler(currentPage-1)
         } }>Previous</button>
      ):null}      
      {totalPages > 1 && pageNumbers.map((pageNumber) => (
        <button className={`pagination-button ${pageNumber === currentPage ? 'active disabled' : ''}`} key={pageNumber} onClick={() => pageHandler(pageNumber)}>
          {pageNumber}
        </button>
      ))}
      {pageNumbers.length > 1 &&  currentPage !==totalPages ? (
        <button className='pagination-button' onClick={() => { 
            pageHandler(currentPage+1)
          }}>Next</button>
      ):null}         
      {pageNumbers.length > 1 && startPage < totalPages-pagesToShow ? (
        <button className='pagination-button' onClick={() => {
          pageHandler(totalPages)
          setStartPage(totalPages-pagesToShow+1)
        }}>Last</button>
      ) : null}

    </div>
    );
  }
  
  export default Pagination;