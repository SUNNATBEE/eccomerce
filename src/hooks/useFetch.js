/**
 * useFetch.js - Ma'lumot yuklash uchun custom hook
 *
 * Bu hook API dan ma'lumot olishni soddalashtiradi.
 * Loading, error va data holatlarini boshqaradi.
 *
 * Barcha o'quvchilar bu hookdan foydalanishi mumkin!
 *
 * Ishlatilish:
 * const { data, loading, error, refetch } = useFetch(getProducts, { page: 1 });
 *
 * Yoki:
 * const { data: product, loading } = useFetch(getProductById, id);
 *
 * @param {function} fetchFn  - API funksiyasi (api.js dan import qilinadi)
 * @param {any} params        - Funksiyaga beriladigan parametrlar
 */

import { useState, useEffect, useCallback } from "react";

const useFetch = (fetchFn, params = null) => {
  const [data, setData] = useState(null);       // API dan kelgan ma'lumot
  const [loading, setLoading] = useState(true); // Yuklanmoqda?
  const [error, setError] = useState(null);     // Xatolik xabari

  // Ma'lumot yuklash funksiyasi
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // API funksiyasini chaqirish
      const response = params
        ? await fetchFn(params)
        : await fetchFn();

      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  }, [fetchFn, JSON.stringify(params)]);

  // Komponent mount bo'lganda yoki params o'zgarganda
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // refetch - qayta yuklash uchun
  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
