'use client';
import {
  What3wordsAutosuggest,
  What3wordsMap,
} from '@what3words/react-components';
import { useEffect, useState } from 'react';

const API_KEY = 'TYEW9946';
const MAP_API_KEY = 'AIzaSyDLTfBVtaUXBaflFEyBqa6zhIUjMMYcUTY';

export default function MapFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div className='relative'>
      <What3wordsMap
        id='w3w-map'
        api_key={API_KEY}
        map_api_key={MAP_API_KEY}
        disable_default_ui={true}
        fullscreen_control={true}
        map_type_control={true}
        zoom_control={true}
        current_location_control_position={9}
        fullscreen_control_position={3}
        search_control_position={2}
        words='filled.count.soap'>
        <div slot='map' className='w-auto md:w-[500px] h-[300px]' />
        <div slot='search-control' style={{ margin: '10px 0 0 10px' }}>
          <What3wordsAutosuggest>
            <input
              type='text'
              placeholder='Find your address'
              style={{ width: '300px' }}
              autoComplete='off'
            />
          </What3wordsAutosuggest>
        </div>
        <div
          slot='current-location-control'
          className='top-14 absolute left-0 md:top-5'>
          <button className='bg-orange-500 p-1 text-white text-sm'>
            Current Location
          </button>
        </div>
      </What3wordsMap>
    </div>
  );
}
