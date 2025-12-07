# Retail Sales Management System

## 1. Overview (3–5 lines)

A full-stack Retail Sales Management System built for the TruEstate SDE Intern assignment.  
The application loads structured sales data from CSV and exposes a backend API with search, filters, sorting, and pagination.  
The React frontend provides a clean UI with a search bar, filter panel, sortable transaction table, and paginated results.  
All logic is implemented manually without auto-generated tools.

## 2. Tech Stack

- **Backend**: Node.js, Express, csv-parser
- **Frontend**: React (Vite), Axios
- **Styling**: Custom CSS
- **Data Source**: CSV (sales dataset)

## 3. Search Implementation Summary

- Full-text search on **Customer Name** and **Phone Number**.
- Case-insensitive matching on customer names.

- Search is combined with filters, sorting, and pagination via query parameters to `/api/sales`.

## 4. Filter Implementation Summary

- Multi-select filters:
  - Customer Region
  - Gender
  - Product Category
  - Payment Method
- Range filters:
  - Age Range (min–max)
  - Date Range (start–end)
- Filters work independently and in combination and are preserved across sorting and pagination.
- Filter options are dynamically fetched from `/api/sales/meta`.

## 5. Sorting Implementation Summary

- Supported sort options:
  - Date (Newest First)
  - Quantity
  - Customer Name (A–Z)
- Sorting is applied in the service layer after filtering and before pagination.
- Current sort state is kept on the frontend and passed as `sortBy` query parameter.

## 6. Pagination Implementation Summary

- Pagination is implemented on the backend with:
  - Fixed page size of **10** items.
  - Query parameter `page` controlling current page.
  - Response includes `meta` with `total`, `page`, `pages`, and `pageSize`.
- Frontend shows Next/Previous buttons and current page out of total pages.
- Pagination state is preserved with active search, filters, and sorting.

## 7. Setup Instructions

### Backend

```bash
cd backend
npm install
# place the CSV file at: backend/data/sales.csv
npm run dev
# backend runs on http://localhost:5000
