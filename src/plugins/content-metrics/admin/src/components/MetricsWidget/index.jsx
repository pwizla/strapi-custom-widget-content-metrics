import React, { useState, useEffect } from 'react';
import { Table, Tbody, Tr, Td, Typography, Box } from '@strapi/design-system';

const MetricsWidget = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/content-metrics/count');
        const data = await response.json();

        console.log("data:", data);
        
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
      <Box padding={4} background="neutral100">
        <Typography variant="omega">Loading content metrics...</Typography>
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box padding={4} background="neutral100">
        <Typography variant="omega" textColor="danger600">
          Error: {String(error)}
        </Typography>
      </Box>
    );
  }
  
  if (!metrics || Object.keys(metrics).length === 0) {
    return (
      <Box padding={4} background="neutral100">
        <Typography variant="omega">No content types found</Typography>
      </Box>
    );
  }
  
  // Debug - afficher les métriques dans la console
  console.log("Metrics to render:", metrics);
  
  return (
    <Box padding={4}>
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
    </Box>
  );
};

export default MetricsWidget;