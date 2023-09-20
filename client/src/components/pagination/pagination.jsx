import '../pagination/pagination.css'

const Pagination=({pageHandler, totalPages,currentPage}) => {
    
  const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="pagination">
      {pageNumbers.length > 1 && (
        <button onClick={() => pageHandler(1)}>First</button>
      )}
      {totalPages > 1 && pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => pageHandler(pageNumber)} disable={currentPage}>
          {pageNumber}
        </button>
      ))}
      {pageNumbers.length > 1 && (
        <button onClick={() => pageHandler(totalPages)}>Last</button>
      )}
    </div>
    );
  }
  
  export default Pagination;