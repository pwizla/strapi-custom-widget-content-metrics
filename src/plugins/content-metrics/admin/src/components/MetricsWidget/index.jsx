import React, { useState, useEffect } from 'react';
import { Table, Tbody, Tr, Td, Typography, Box } from '@strapi/design-system';
import { Widget } from '@strapi/admin/strapi-admin'

const MetricsWidget = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/content-metrics/count');
        const data = await response.json();

        const formattedData = {};
        
        if (data && typeof data === 'object') {
          Object.keys(data).forEach(key => {
            const value = data[key];
            formattedData[key] = typeof value === 'number' ? value : String(value);
          });
        }
        
        setMetrics(formattedData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message || 'An error occurred');
        setLoading(false);
      }
    };
    
    fetchMetrics();
  }, []);
  
  if (loading) {
    return (
      <Widget.Loading />
    );
  }
  
  if (error) {
    return (
      <Widget.Error />
    );
  }
  
  if (!metrics || Object.keys(metrics).length === 0) {
    return <Widget.NoData>No content types found</Widget.NoData>;
  }
  
  return (
    <Table>
      <Tbody>
        {Object.entries(metrics).map(([contentType, count], index) => (
          <Tr key={index}>
            <Td>
              <Typography variant="omega">{String(contentType)}</Typography>
            </Td>
            <Td>
              <Typography variant="omega" fontWeight="bold">{String(count)}</Typography>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default MetricsWidget;