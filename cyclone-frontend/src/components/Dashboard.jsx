import React, { useEffect, useState } from 'react';
import { fetchStats } from '../api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchStats();
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError(err.response?.data?.message || err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Cyclone Overview</h2>

      {error && (
        <p className="text-red-500">
          Error: {error}. Please check your connection and try again.
        </p>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : stats.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Affected" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Dashboard;