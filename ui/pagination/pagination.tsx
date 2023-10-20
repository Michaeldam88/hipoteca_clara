import "./pagination.scss";
import Text from "../text/text";
import Button from "../button/button";

const Pagination = ({
  page,
  totalPages,
  handlePreviousPage,
  handleNextPage,
  prevButtonText = "Prev",
  nextButtonText = "Next",
}: {
  page: number;
  totalPages?: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  prevButtonText?: string;
  nextButtonText?: string;
}) => {
  return (
    <div className="pagination">
      <button
        className="pagination__button"
        disabled={page === 1 && true}
        onClick={() => handlePreviousPage()}
      >
        {prevButtonText}
      </button>
      <button
        className="pagination__button"
        disabled={page === totalPages}
        onClick={() => handleNextPage()}
      >
        {nextButtonText}
      </button>

      <Text
        text={totalPages ? `${page}/${totalPages}` : `Page ${page}`}
        preset="small"
        color="subtle"
      />
    </div>
  );
};

export default Pagination;
