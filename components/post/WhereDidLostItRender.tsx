import { getAirportLabel } from '@/lib/utils';
import { Bus, CarTaxiFront, Plane, Ship } from 'lucide-react';
import React from 'react';

interface WhereDidLostItRenderProps {
  airoportData?: any;
  busData?: any;
  trainData?: any;
  ferryData?: any;
  taxiData?: any;
  generalData?: any;
}

const WhereDidLostItRender = ({
  airoportData,
  busData,
  trainData,
  ferryData,
  taxiData,
  generalData,
}: WhereDidLostItRenderProps) => {
  const airoportsLabel = getAirportLabel(airoportData.airportName);
 

  return (
    <div className='flex flex-col gap-3'>
      {airoportData &&
        (airoportData.airoportName === '' ? (
          <></>
        ) : (
          <div className='flex flex-row  gap-2 w-auto lg:w-[500px]'>
            <Plane size={22} className=' text-orange-500 ' />
            <div>
              <p className=' text-slate-500 font-noto-sans'>Airoport Name</p>
              <p className=' text-slate-800 font-noto-sans'>{airoportsLabel}</p>
            </div>
            <div>
              <p className=' text-slate-500 font-noto-sans'>Airoplan Name</p>
              <p className=' text-slate-800 font-noto-sans'>
                {airoportData.airlineName}
              </p>
            </div>
            <div>
              <p className=' text-slate-500 font-noto-sans'>Airoplan Number</p>
              <p className=' text-slate-800 font-noto-sans'>
                {airoportData.flightNumber}
              </p>
            </div>
          </div>
        ))}
      {busData &&
        (busData.busName === '' ? (
          <></>
        ) : (
          <div className='flex flex-row  gap-2 w-auto lg:w-[500px]'>
            <Bus size={22} className=' text-orange-500 ' />
            <div>
              <p className=' text-slate-500 font-noto-sans'>Autobus Name</p>
              <p className=' text-slate-800 font-noto-sans'>
                {busData.busName}
              </p>
            </div>
            <div>
              <p className=' text-slate-500 font-noto-sans'>
                Autobus Route Number
              </p>
              <p className=' text-slate-800 font-noto-sans'>
                {busData.busRouteNumber}
              </p>
            </div>
          </div>
        ))}
      {trainData &&
        (trainData.trainName === '' ? (
          <></>
        ) : (
          <div className='flex flex-row  gap-2 w-auto lg:w-[500px]'>
            <Bus size={22} className=' text-orange-500 ' />
            <div>
              <p className=' text-slate-500 font-noto-sans'>Train Name</p>
              <p className=' text-slate-800 font-noto-sans'>
                {trainData.trainName}
              </p>
            </div>
            <div>
              <p className=' text-slate-500 font-noto-sans'>Train Number</p>
              <p className=' text-slate-800 font-noto-sans'>
                {trainData.trainNumber}
              </p>
            </div>
          </div>
        ))}
      {ferryData &&
        (ferryData.ferryName === '' ? (
          <></>
        ) : (
          <div className='flex flex-row  gap-2 w-auto lg:w-[500px]'>
            <Ship size={22} className=' text-orange-500 ' />
            <div>
              <p className=' text-slate-500 font-noto-sans'>Ferry Name</p>
              <p className=' text-slate-800 font-noto-sans'>
                {ferryData.ferryName}
              </p>
            </div>
            <div>
              <p className=' text-slate-500 font-noto-sans'>Ferry Route</p>
              <p className=' text-slate-800 font-noto-sans'>
                {ferryData.ferryRoute}
              </p>
            </div>
          </div>
        ))}
      {taxiData &&
        (taxiData.taxiName === '' ? (
          <></>
        ) : (
          <div className='flex flex-row  gap-2 w-auto lg:w-[500px]'>
            <CarTaxiFront size={22} className=' text-orange-500 ' />
            <div>
              <p className=' text-slate-500 font-noto-sans'>Taxi Name</p>
              <p className=' text-slate-800 font-noto-sans'>
                {taxiData.taxiName}
              </p>
            </div>
            <div>
              <p className=' text-slate-500 font-noto-sans'>Taxi Plate</p>
              <p className=' text-slate-800 font-noto-sans'>
                {taxiData.taxiPlate}
              </p>
            </div>
          </div>
        ))}
      {generalData &&
        (generalData.generaleLocation === '' ? (
          <></>
        ) : (
          <div className='flex flex-row  gap-2 w-auto lg:w-[500px]'>
            -
            <div>
              <p className=' text-slate-500 font-noto-sans'>
                General Information
              </p>
              <p className=' text-slate-800 font-noto-sans'>
                {generalData.generaleLocation}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WhereDidLostItRender;
