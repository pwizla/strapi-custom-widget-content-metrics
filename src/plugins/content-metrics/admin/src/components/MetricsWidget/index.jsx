import React, { useState, useEffect } from 'react';
import { Table, Tbody, Tr, Td, Typography, Box, Loader, EmptyStateLayout } from '@strapi/design-system';
import { ExclamationMarkCircle, InformationSquare } from '@strapi/icons';
// import { useStrapiApp } from '@strapi/helper-plugin';

// Composants internes simples pour remplacer Widget.*
const Loading = () => (
  <Box padding={8} background="neutral100" style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Loader>Loading content metrics...</Loader>
  </Box>
);

const Error = () => (
  <Box padding={8} background="neutral100" style={{ height: '100%' }}>
    <EmptyStateLayout
      icon={<ExclamationMarkCircle />}
      content="An error occurred while loading metrics"
    />
  </Box>
);

const NoData = ({ children }) => (
  <Box padding={8} background="neutral100" style={{ height: '100%' }}>
    <EmptyStateLayout
      icon={<InformationSquare />}
      content={children || "No content types found"}
    />
  </Box>
);

// const MetricsWidget = () => {
//   const [loading, setLoading] = useState(true);
//   const [metrics, setMetrics] = useState(null);
//   const [error, setError] = useState(null);
//   const { getPlugin } = useStrapiApp();
  
//   useEffect(() => {
//     const fetchMetrics = async () => {
//       try {
//         // Make a request to a custom endpoint that returns content counts
//         const response = await fetch('/content-metrics/count');
//         const data = await response.json();
        
//         setMetrics(data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError(err);
//         setLoading(false);
//       }
//     };
    
//     fetchMetrics();
//   }, []);
  
//   if (loading) {
//     return <Loading />;
//   }
  
//   if (error) {
//     return <Error />;
//   }
  
//   if (!metrics || Object.keys(metrics).length === 0) {
//     return <NoData>No content types found</NoData>;
//   }
  
//   return (
//     <Box padding={4}>
//       <Table>
//         <Tbody>
//           {Object.entries(metrics).map(([contentType, count]) => (
//             <Tr key={contentType}>
//               <Td>
//                 <Typography variant="omega">{contentType}</Typography>
//               </Td>
//               <Td>
//                 <Typography variant="omega" fontWeight="bold">{count}</Typography>
//               </Td>
//             </Tr>
//           ))}
//         </Tbody>
//       </Table>
//     </Box>
//   );
// };

const MetricsWidget = () => {
  return (
    <Box padding={4}>
      <Typography variant="omega">Widget de test</Typography>
    </Box>
  );
};

export default MetricsWidget;

