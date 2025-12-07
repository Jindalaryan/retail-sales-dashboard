import { useEffect, useState } from "react";
import { fetchSales, fetchMeta } from "../services/api";

export function useSalesData() {
  const [metaOptions, setMetaOptions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
    pageSize: 10
  });

  const [filters, setFilters] = useState({
    search: "",
    gender: [],
    region: [],
    productCategory: [],
    paymentMethod: [],
    ageMin: "",
    ageMax: "",
    startDate: "",
    endDate: "",
    sortBy: "date"
  });

  // Load dropdown options once
  useEffect(() => {
    fetchMeta().then(setMetaOptions).catch(console.error);
  }, []);

  const loadSales = async () => {
    setLoading(true);
    try {
      const params = {
        search: filters.search || undefined,
        gender: filters.gender.join(",") || undefined,
        region: filters.region.join(",") || undefined,
        productCategory: filters.productCategory.join(",") || undefined,
        paymentMethod: filters.paymentMethod.join(",") || undefined,
        ageMin: filters.ageMin || undefined,
        ageMax: filters.ageMax || undefined,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        sortBy: filters.sortBy || undefined,
        page: pagination.page
      };

      const res = await fetchSales(params);
      setSales(res.data);
      setPagination((p) => ({ ...p, ...res.meta }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pagination.page]);

  return {
    sales,
    filters,
    setFilters,
    pagination,
    setPagination,
    metaOptions,
    loading
  };
}
