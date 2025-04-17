import React, { useState, useEffect } from 'react';
import { Widget } from '@strapi/admin/strapi-admin';
import { Table, Tbody, Tr, Td, Typography, Box } from '@strapi/design-system';
import { useStrapiApp } from '@strapi/helper-plugin';

const MetricsWidget = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);
  const { getPlugin } = useStrapiApp();
  
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Make a request to a custom endpoint that returns content counts
        const response = await fetch('/content-metrics/count');
        const data = await response.json();
        
        setMetrics(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    };
    
    fetchMetrics();
  }, []);
  
  if (loading) {
    return <Widget.Loading />;
  }
  
  if (error) {
    return <Widget.Error />;
  }
  
  if (!metrics || Object.keys(metrics).length === 0) {
    return <Widget.NoData>No content types found</Widget.NoData>;
  }
  
  return (
    <Box padding={4}>
      <Table>
        <Tbody>
          {Object.entries(metrics).map(([contentType, count]) => (
            <Tr key={contentType}>
              <Td>
                <Typography variant="omega">{contentType}</Typography>
              </Td>
              <Td>
                <Typography variant="omega" fontWeight="bold">{count}</Typography>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MetricsWidget;