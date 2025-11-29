import { useState, useEffect, useCallback } from 'react';

const api = {
  stats: async () => {
    const res = await fetch('/api/admin/stats');
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },
  getFields: async (org = 'default', dept = 'default') => {
    const res = await fetch(`/api/admin/fields?org=${encodeURIComponent(org)}&dept=${encodeURIComponent(dept)}`);
    if (!res.ok) throw new Error('Failed to fetch fields');
    return res.json();
  },
  saveFields: async (payload) => {
    const res = await fetch('/api/admin/fields', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to save fields');
    return res.json();
  }
};

export default function useAdminApi() {
  const [stats, setStats] = useState(null);
  const [fields, setFields] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.stats();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFields = useCallback(async (org = 'default', dept = 'default') => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getFields(org, dept);
      setFields(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const saveFields = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.saveFields(payload);
      setFields(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, fields, loading, error, fetchStats, fetchFields, saveFields };
}
