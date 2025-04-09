import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CycloneMap from '../components/CycloneMap';

const FilterByYear = () => {
  const [year, setYear] = useState(2024);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEventsByYear = async (selectedYear) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/cyclone?year=${selectedYear}`
      );
      setEvents(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventsByYear(year);
  }, [year]);

  const years = Array.from({ length: 2025 - 2000 }, (_, i) => 2000 + i);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-8 tracking-tight">
        🌪️ Cyclone Events Explorer
      </h1>

      {/* Year Selector */}
      <div className="flex justify-center mb-6">
        <label htmlFor="year" className="text-lg font-bold text-blue-700 mr-3">
          Select Year:
        </label>
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="border border-blue-500 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Cyclone Map */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-blue-800 mb-2">
          📍 Cyclone Map for {year}
        </h2>
        <div className="rounded-xl overflow-hidden border shadow-md">
          <CycloneMap year={year} />
        </div>
      </div>

      {/* Event Cards */}
      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading events...</p>
      ) : (
        <div>
          {events.length === 0 ? (
            <p className="text-center text-gray-600">
              No events found for <strong>{year}</strong>.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 p-5 rounded-xl shadow hover:shadow-lg transition"
                >
                  <h2 className="text-lg font-bold text-indigo-700 mb-2">
                    {event.name || 'Unnamed Cyclone'}
                  </h2>

                  <p><span className="text-blue-700 font-bold">Location:</span> {event.location || 'N/A'}</p>
                  <p><span className="text-blue-700 font-bold">Country:</span> {event.country || 'N/A'}</p>
                  <p><span className="text-blue-700 font-bold">Disaster Type:</span> {event.disasterType || 'N/A'} ({event.disasterSubtype || 'N/A'})</p>
                  <p><span className="text-blue-700 font-bold">Magnitude:</span> {event.magnitude || 'N/A'} {event.magnitudeScale || ''}</p>
                  <p><span className="text-blue-700 font-bold">Affected:</span> {event.affected?.toLocaleString() || 'N/A'}</p>
                  <p><span className="text-blue-700 font-bold">Deaths:</span> {event.deaths ?? 'N/A'}</p>
                  <p><span className="text-blue-700 font-bold">Date:</span> {event.date || 'Date Not Available'}</p>

                  <p className="text-sm text-gray-400 mt-3">
                    Last updated: {event.lastUpdated || 'Unknown'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterByYear;
