export default function PaginationControls({ pagination, setPage }) {
  const { page, pages } = pagination;

  const prevDisabled = page <= 1;
  const nextDisabled = page >= pages || pages === 0;

  return (
    <div className="pagination">
      <button
        type="button"
        disabled={prevDisabled}
        onClick={() => !prevDisabled && setPage(page - 1)}
      >
        Previous
      </button>
      <span>
        Page {page} of {pages || 1}
      </span>
      <button
        type="button"
        disabled={nextDisabled}
        onClick={() => !nextDisabled && setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
