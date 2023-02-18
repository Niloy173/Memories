import React, { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pages = ({ paginate, PostPerPage, totalPosts, activePage }) => {
  const pageNumber = [];
  const myRef = useRef();

  for (let index = 1; index <= Math.ceil(totalPosts / PostPerPage); index++) {
    pageNumber.push(index);
  }

  const handlePrevious = (e) => {
    myRef.current.scrollLeft -= 200;
  };
  const handleNext = (e) => {
    myRef.current.scrollLeft += 200;
  };

  return (
    pageNumber.length > 0 && (
      <div className="pages">
        <div className="pages__left">
          <IoIosArrowBack className="pages__icon" onClick={handlePrevious} />
        </div>

        <div className="pages__center" ref={myRef}>
          {pageNumber.map((pageNumber) => (
            <span key={pageNumber} className={activePage === pageNumber ? "active": ''}
            onClick={() => paginate(pageNumber)}>
              {pageNumber}
     
            </span>
          ))}
        </div>

        <div className="pages__right">
          <IoIosArrowForward className="pages__icon" onClick={handleNext} />
        </div>
      </div>
    )
  );
};

export default Pages;
