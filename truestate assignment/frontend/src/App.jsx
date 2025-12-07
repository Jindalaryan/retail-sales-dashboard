import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import SortDropdown from "./components/SortDropdown";
import SalesTable from "./components/SalesTable";
import PaginationControls from "./components/PaginationControls";
import { useSalesData } from "./hooks/useSalesData";
import "./styles/global.css";

function App() {
  const {
    sales,
    filters,
    setFilters,
    pagination,
    setPagination,
    metaOptions,
    loading
  } = useSalesData();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Retail Sales Dashboard</h1>
      </header>

      <main className="layout">
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          metaOptions={metaOptions}
        />

        <section className="content">
          <div className="top-bar">
            <SearchBar
              value={filters.search}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, search: value }))
              }
            />
            <SortDropdown
              value={filters.sortBy}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, sortBy: value }))
              }
            />
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              <SalesTable sales={sales} />
              <PaginationControls
                pagination={pagination}
                setPage={(page) =>
                  setPagination((prev) => ({ ...prev, page }))
                }
              />
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
