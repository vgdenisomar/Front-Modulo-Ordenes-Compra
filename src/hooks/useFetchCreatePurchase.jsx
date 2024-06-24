import { useState, useEffect } from 'react';
import { fetchCreatePurchase } from '../services/supplychain';

const useFetchCreatePurchase = () => {
  const [createPurchase, setCreatePurchase] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCreatePurchase = async () => {
      try {
        const data = await fetchCreatePurchase();
        setCreatePurchase(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getCreatePurchase();
  }, []);

  return { createPurchase, loading, error };
};

export default useFetchCreatePurchase;