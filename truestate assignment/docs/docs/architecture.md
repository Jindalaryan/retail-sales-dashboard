# TruEstate Retail Sales Management – Architecture

## 1. Backend Architecture

- **Tech Stack**: Node.js, Express, csv-parser
- **Entry Point**: `backend/src/index.js`
- **Modules**:
  - `utils/loadData.js`
    - Reads `data/sales.csv` once at startup.
    - Stores rows in in-memory array.
  - `services/salesService.js`
    - Pure functions for:
      - Search (customer name, phone number)
      - Filters (region, gender, age range, product category, tags, payment method, date range)
      - Sorting (date, quantity, customer name)
    - Handles edge cases like invalid numeric/date ranges.
  - `controllers/salesController.js`
    - Binds HTTP layer with service.
    - Implements pagination (10 items / page).
    - Provides filter metadata endpoint.
  - `routes/salesRoutes.js`
    - Defines `/api/sales` and `/api/sales/meta`.

- **Key Concepts**
  - **Separation of concerns**: HTTP layer vs business logic.
  - **Single source of truth** for filtering/sorting logic in the service layer.
  - CSV treated as static dataset (read-only).

---

## 2. Frontend Architecture

- **Tech Stack**: React (Vite), Axios
- **Entry Point**: `frontend/src/main.jsx`
- **Core Components**:
  - `App.jsx`
    - Layout shell, wires all components and hook.
  - `components/SearchBar.jsx`
    - Search input for name/phone.
  - `components/FilterPanel.jsx`
    - Multi-select filters (region, gender, product category, payment method)
    - Range filters (age, date).
  - `components/SortDropdown.jsx`
    - Sorting options (date, quantity, customer name).
  - `components/SalesTable.jsx`
    - Tabular display of sales transactions.
  - `components/PaginationControls.jsx`
    - Next / Previous navigation, page status.

- **Hooks**
  - `hooks/useSalesData.js`
    - Owns state: filters, pagination, loading, metadata.
    - Calls backend through `services/api.js`.
    - Ensures search, filters, sorting, pagination always in sync.

- **Services**
  - `services/api.js`
    - Axios wrapper for `/api/sales` and `/api/sales/meta`.

- **Styles**
  - `styles/global.css`
    - Minimal, clean UI aligned with assignment structure:
      - Header
      - Filter panel (left)
      - Top bar (search + sort)
      - Table + pagination.

---

## 3. Data Flow

1. **Initial Load**
   - Frontend mounts `App`.
   - `useSalesData`:
     - Calls `GET /api/sales/meta` → builds filter options.
     - Calls `GET /api/sales?page=1&sortBy=date` → loads first page.

2. **User Interactions**
   - User types in **SearchBar**:
     - `filters.search` update → `useEffect` triggers → new API call.
   - User toggles filters in **FilterPanel**:
     - Multi-select or range updates `filters` → new API call.
   - User changes sort option:
     - `filters.sortBy` update → new API call.
   - User clicks Next/Previous:
     - `pagination.page` update → new API call.

3. **Backend Processing**
   - Controller receives query params.
   - `salesService`:
     - Applies search.
     - Applies all filters.
     - Sorts result.
   - Controller slices correct page (10 items).
   - Returns `{ meta, data }` to frontend.

---

## 4. Folder Structure (Summary)

- **root**
  - `README.md` – project overview + setup.
- **backend/**
  - `data/` – CSV dataset.
  - `src/`
    - `controllers/`
    - `services/`
    - `utils/`
    - `routes/`
    - `models/` (optional)
    - `index.js`
- **frontend/**
  - `src/`
    - `components/`
    - `hooks/`
    - `services/`
    - `styles/`
    - `App.jsx`
    - `main.jsx`
- **docs/**
  - `architecture.md` (this file)

---

## 5. Module Responsibilities

- **Backend**
  - `index.js`: Server startup, middleware, route registration, CSV bootstrap.
  - `salesRoutes.js`: Route definitions and URL structure.
  - `salesController.js`: Request validation, pagination, response formatting.
  - `salesService.js`: Business rules for search/filter/sort.
  - `loadData.js`: Data loading and in-memory storage.

- **Frontend**
  - `App.jsx`: Composition and page structure.
  - `SearchBar.jsx`: Search-only UI.
  - `FilterPanel.jsx`: Filter-only UI.
  - `SortDropdown.jsx`: Sorting-only UI.
  - `SalesTable.jsx`: Read-only display UI.
  - `PaginationControls.jsx`: Pagination-only UI.
  - `useSalesData.js`: Coordinates all state + API calls.
  - `api.js`: HTTP abstraction layer.
