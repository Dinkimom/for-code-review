import React, { useMemo, useCallback, useEffect } from 'react';
import { uuid } from 'uuidv4';
import usePagination from '../../hook/usePagination';
import './Pagination.css';

const LIMIT = 20;

interface IPagination {
  total: number;
  searchValue: string,
  onPageChange: (num: number) => void;
}

interface IPaginationItem {
  onPageClick: (evt: React.MouseEvent) => void,
  number: number,
  isActive: boolean
}

const PaginationItem: React.FC<IPaginationItem> = ({ onPageClick, number, isActive }) => (
  <li onClick={onPageClick}>
    <button type="button" className={isActive ? 'active' : ''}>{number}</button>
  </li>
);

const Dots = () => (
  <li>
    <span>...</span>
  </li>
);

const Pagination: React.FC<IPagination> = ({ total, onPageChange, searchValue }) => {
  const pagLength = useMemo(() => Math.floor(total / LIMIT), [total]);
  const [curPage, setCurrentPage, paginationIndexes] = usePagination(pagLength);

  const onNextClick = (): void => {
    if (pagLength !== curPage) {
      setCurrentPage(curPage + 1);
    }
  };

  const onPrevClick = () => {
    if (curPage !== 1) {
      setCurrentPage(curPage - 1);
    }
  };

  const onPageNumberClick = useCallback(
    (evt) => {
      setCurrentPage(+evt.target.textContent);
    },
    [setCurrentPage],
  );

  useEffect(() => {
      setCurrentPage(1);
  }, [searchValue, setCurrentPage])

  useEffect(() => {
    onPageChange(curPage);
  }, [curPage, onPageChange]);

  const renderPagination = useCallback(
    () => {
      let arr;
      if (paginationIndexes) {
        arr = paginationIndexes.map((page: number, i: number) => {
          if (!page) {
            return <Dots key={uuid()} />;
          }
          return (
            <PaginationItem
              key={uuid()}
              onPageClick={onPageNumberClick}
              number={page}
              isActive={page === curPage}
            />
          );
        })
      }
      return arr
    },
    [curPage, onPageNumberClick, paginationIndexes],
  );

  return (
    <div className="pagination__wrapper">
      <ul className="pagination">
        <li>
          <button type="button" onClick={onPrevClick} className="prev" title="previous page">
            &#10094;
          </button>
        </li>
        {renderPagination()}
        <li>
          <button type="button" onClick={onNextClick} className="next" title="next page">
            &#10095;
          </button>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(Pagination);
