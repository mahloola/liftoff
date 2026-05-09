import { useState, useEffect } from 'react';
import { BikeSpec } from '@/types';

interface BikeIndexBike {
  frame_material_slug: string | null;
  cycle_type_slug: string | null;
  propulsion_type_slug: string | null;
  rear_wheel_size_slug: string | null;
  year: number | null;
  component_spec: { groupset?: string } | null;
  stolen: boolean;
}

interface BikeIndexResponse {
  bikes: BikeIndexBike[];
}

type State = { loading: boolean; error: boolean; spec: BikeSpec | null };

function normalize(bike: BikeIndexBike): BikeSpec {
  return {
    frameType: bike.cycle_type_slug ?? 'bike',
    frameMaterial: bike.frame_material_slug ?? 'unknown',
    drivetrainType: bike.propulsion_type_slug ?? 'foot-pedal',
    wheelSize: bike.rear_wheel_size_slug ?? 'unknown',
    year: bike.year ?? new Date().getFullYear(),
    componentGroup: bike.component_spec?.groupset ?? 'unknown',
    verifiedStatus: !bike.stolen,
    source: 'bikeindex',
  };
}

const LOADING: State = { loading: true, error: false, spec: null };

export function useBikeSpecs(brand: string) {
  const [state, setState] = useState<State>(LOADING);

  useEffect(() => {
    let cancelled = false;
    setState(LOADING);

    fetch(`https://bikeindex.org/api/v3/bikes?query=${encodeURIComponent(brand)}&stolenness=all&per_page=1`)
      .then((r) => r.json())
      .then((data: BikeIndexResponse) => {
        if (cancelled) return;
        const first = data.bikes?.[0];
        setState({ loading: false, error: false, spec: first ? normalize(first) : null });
      })
      .catch(() => {
        if (cancelled) return;
        setState({ loading: false, error: true, spec: null });
      });

    return () => { cancelled = true; };
  }, [brand]);

  return state;
}
