import { Box } from '@mui/material';
import MapView from '../Map/MapView';
import PolygonPanel from '../Panels/PolygonPanel';
import ObjectsPanel from '../Panels/ObjectsPanel';
import MapDataPanel from '../Panels/MapDataPanel';

const AppLayout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Box sx={{ flex: 1, height: '100%' }}>
        <MapView />
      </Box>

      <Box
        sx={{
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid #e0e0e0',
          bgcolor: '#fafafa',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <PolygonPanel />
        <ObjectsPanel />
        <MapDataPanel />
      </Box>
    </Box>
  );
};

export default AppLayout;
