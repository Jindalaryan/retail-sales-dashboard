export default function FilterPanel({
  filters,
  setFilters,
  metaOptions
}) {
  const handleMultiSelect = (key, value) => {
    setFilters((prev) => {
      const exists = prev[key].includes(value);
      return {
        ...prev,
        [key]: exists
          ? prev[key].filter((v) => v !== value)
          : [...prev[key], value]
      };
    });
  };

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <aside className="filter-panel">
      <h3>Filters</h3>

      {/* Region */}
      <div className="filter-group">
        <label>Customer Region</label>
        <div className="chips">
          {metaOptions?.regions?.map((r) => (
            <button
              key={r}
              className={
                filters.region.includes(r) ? "chip active" : "chip"
              }
              type="button"
              onClick={() => handleMultiSelect("region", r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div className="filter-group">
        <label>Gender</label>
        <div className="chips">
          {metaOptions?.genders?.map((g) => (
            <button
              key={g}
              className={
                filters.gender.includes(g) ? "chip active" : "chip"
              }
              type="button"
              onClick={() => handleMultiSelect("gender", g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Age Range */}
      <div className="filter-group">
        <label>Age Range</label>
        <div className="age-range">
          <input
            type="number"
            placeholder="Min"
            value={filters.ageMin}
            onChange={(e) => handleChange("ageMin", e.target.value)}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.ageMax}
            onChange={(e) => handleChange("ageMax", e.target.value)}
          />
        </div>
      </div>

      {/* Product Category */}
      <div className="filter-group">
        <label>Product Category</label>
        <div className="chips">
          {metaOptions?.productCategories?.map((c) => (
            <button
              key={c}
              className={
                filters.productCategory.includes(c)
                  ? "chip active"
                  : "chip"
              }
              type="button"
              onClick={() => handleMultiSelect("productCategory", c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="filter-group">
        <label>Payment Method</label>
        <div className="chips">
          {metaOptions?.paymentMethods?.map((m) => (
            <button
              key={m}
              className={
                filters.paymentMethod.includes(m)
                  ? "chip active"
                  : "chip"
              }
              type="button"
              onClick={() => handleMultiSelect("paymentMethod", m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="filter-group">
        <label>Date Range</label>
        <div className="date-range">
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
          />
          <span>-</span>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
          />
        </div>
      </div>
    </aside>
  );
}
