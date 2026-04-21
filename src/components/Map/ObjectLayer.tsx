import { useMemo } from 'react';
import { Marker } from 'react-leaflet';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedObject } from '../../store/slices/objectSlice';
import { createJeepIcon, createDefaultIcon } from '../../utils/mapUtils';
import { markLayerClick } from '../../utils/layerClickGuard';

const jeepIcon = createJeepIcon();
const defaultIcon = createDefaultIcon();

const ObjectLayer = () => {
  const dispatch = useAppDispatch();
  const { items, pendingObjects } = useAppSelector((s) => s.objects);

  const allObjects = useMemo(() => [...items, ...pendingObjects], [items, pendingObjects]);

  return (
    <>
      {allObjects.map((obj, i) => (
        <Marker
          key={obj.id ?? `pending-${i}`}
          position={[obj.geometry.coordinates[1], obj.geometry.coordinates[0]]}
          icon={obj.symbolType === 'jeep' ? jeepIcon : defaultIcon}
          eventHandlers={{
            click: () => {
              markLayerClick();
              if (obj.id) dispatch(setSelectedObject(obj.id));
            },
          }}
        />
      ))}
    </>
  );
};

export default ObjectLayer;
