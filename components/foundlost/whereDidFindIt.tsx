import React from 'react';
import { Combobox } from '../ui/combobox';
import { englandAiroports } from '@/lib/defaultData';
import { Input } from '../ui/input';
import { LostAndFound } from '@prisma/client';

interface WhereDidFindItProps {
  input: any;
  handleInputChange: (a: any, b: any) => void;
  airoport: any;
  setAiroport: (a: any) => void;
  bus: any;
  setBus: (a: any) => void;
  train: any;
  setTrain: (a: any) => void;
  ferry: any;
  setFerry: (a: any) => void;
  taxi: any;
  setTaxi: (a: any) => void;
  generale: any;
  setGenerale: (a: any) => void;
  airoportsOption?: any;
}

const WhereDidFindIt = ({
  input,
  handleInputChange,
  airoport,
  setAiroport,
  bus,
  setBus,
  train,
  setTrain,
  ferry,
  setFerry,
  taxi,
  setTaxi,
  generale,
  setGenerale,
  airoportsOption,
}: WhereDidFindItProps) => {
  const handleAiroportChange = (fieldName: string, fieldValue: any) => {
    if (airoport) {
      setBus({
        busName: '',
        busRouteNumber: '',
      });
      setTrain({
        trainName: '',
        trainNumber: '',
      });
      setFerry({
        ferryName: '',
        ferryRoute: '',
      });
      setTaxi({
        taxiName: '',
        taxiPlate: '',
      });
      setGenerale({
        generaleLocation: '',
      });
    }

    setAiroport({ ...airoport, [fieldName]: fieldValue });
  };

  const handleBusChange = (fieldName: string, fieldValue: any) => {
    if (bus) {
      setAiroport({
        airoportName: '',
        airlineName: '',
        flightNumber: '',
      });
      setTrain({
        trainName: '',
        trainNumber: '',
      });
      setFerry({
        ferryName: '',
        ferryRoute: '',
      });
      setTaxi({
        taxiName: '',
        taxiPlate: '',
      });
      setGenerale({
        generaleLocation: '',
      });
    }

    setBus({ ...bus, [fieldName]: fieldValue });
  };
  const handleTrainChange = (fieldName: string, fieldValue: any) => {
    if (train) {
      setAiroport({
        airoportName: '',
        airlineName: '',
        flightNumber: '',
      });
      setBus({
        busName: '',
        busRouteNumber: '',
      });
      setFerry({
        ferryName: '',
        ferryRoute: '',
      });
      setTaxi({
        taxiName: '',
        taxiPlate: '',
      });
      setGenerale({
        generaleLocation: '',
      });
    }

    setTrain({ ...train, [fieldName]: fieldValue });
  };

  const handleFerryChange = (fieldName: string, fieldValue: any) => {
    if (ferry) {
      setAiroport({
        airoportName: '',
        airlineName: '',
        flightNumber: '',
      });
      setBus({
        busName: '',
        busRouteNumber: '',
      });
      setTrain({
        trainName: '',
        trainNumber: '',
      });
      setTaxi({
        taxiName: '',
        taxiPlate: '',
      });
      setGenerale({
        generaleLocation: '',
      });
    }

    setFerry({ ...ferry, [fieldName]: fieldValue });
  };

  const handleTaxiChange = (fieldName: string, fieldValue: any) => {
    if (taxi) {
      setAiroport({
        airoportName: '',
        airlineName: '',
        flightNumber: '',
      });
      setBus({
        busName: '',
        busRouteNumber: '',
      });
      setFerry({
        ferryName: '',
        ferryRoute: '',
      });
      setGenerale({
        generaleLocation: '',
      });
    }

    setTaxi({ ...taxi, [fieldName]: fieldValue });
  };

  const handleGeneralChange = (fieldName: string, fieldValue: any) => {
    if (generale) {
      setAiroport({
        airoplanName: '',
        airlineName: '',
        flightNumber: '',
      });
      setBus({
        busName: '',
        busRouteNumber: '',
      });
      setFerry({
        ferryName: '',
        ferryRoute: '',
      });
      setTrain({
        trainName: '',
        trainNumber: '',
      });
      setTaxi({
        taxiName: '',
        taxiPlate: '',
      });
    }

    setGenerale({ ...generale, [fieldName]: fieldValue });
  };

  return (
    <div>
      {input.whereDidFind === 'airoport' && (
        <div className='border p-2 rounded-md border-cyan-500'>
          <div className='flex flex-col'>
            <label htmlFor=''>*Airoport name</label>
            <Combobox
              frameworks={airoportsOption}
              className='w-96 outline-none text-base font-noto-sans'
              setValue={value => handleAiroportChange('airportName', value)}
              value={airoport.airportName}
              placeholder='.'
            />
          </div>
          <div className=''>
            <label htmlFor=''>Airline Name</label>
            <Input
              onChange={value =>
                handleAiroportChange('airlineName', value.target.value)
              }
              value={airoport.airlineName}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
          <div className=''>
            <label htmlFor=''>Flight Number</label>
            <Input
              onChange={value =>
                handleAiroportChange('flightNumber', value.target.value)
              }
              value={airoport.flightNumber}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
        </div>
      )}
      {input.whereDidFind === 'bus' && (
        <div className='border p-2 rounded-md border-cyan-500'>
          <div className=''>
            <label htmlFor=''>*Bus Station Name</label>
            <Input
              onChange={value => handleBusChange('busName', value.target.value)}
              value={bus.busName}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
          <div className=''>
            <label htmlFor=''>Bus Route Number</label>
            <Input
              onChange={value =>
                handleBusChange('busRouteNumber', value.target.value)
              }
              value={bus.busRouteNumber}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
        </div>
      )}
      {input.whereDidFind === 'train' && (
        <div className='border relative p-2 rounded-md border-cyan-500'>
          <div className=''>
            <label htmlFor=''>*Train Station Name</label>
            <Input
              onChange={value =>
                handleTrainChange('trainName', value.target.value)
              }
              value={train.trainName}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
          <div className=''>
            <label htmlFor=''>Train Number or Name</label>
            <Input
              onChange={value =>
                handleTrainChange('trainNumber', value.target.value)
              }
              value={train.trainNumber}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
        </div>
      )}
      {input.whereDidFind === 'ferry' && (
        <div className='border relative p-2 rounded-md border-cyan-500'>
          <div className=''>
            <label htmlFor=''>*Ferry Service Name</label>
            <Input
              onChange={value =>
                handleFerryChange('ferryName', value.target.value)
              }
              value={ferry.ferryName}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
          <div className=''>
            <label htmlFor=''>Ferry Route</label>
            <Input
              onChange={value =>
                handleFerryChange('ferryRoute', value.target.value)
              }
              value={ferry.ferryRoute}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
        </div>
      )}
      {input.whereDidFind === 'taxi' && (
        <div className='border relative p-2 rounded-md border-cyan-500'>
          <div className=''>
            <label htmlFor=''>*Taxi Name</label>
            <Input
              onChange={value =>
                handleTaxiChange('taxiName', value.target.value)
              }
              value={taxi.taxiName}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
          <div className=''>
            <label htmlFor=''>License Plate</label>
            <Input
              onChange={value =>
                handleTaxiChange('taxiPlate', value.target.value)
              }
              value={taxi.taxiPlate}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
        </div>
      )}
      {input.whereDidFind === 'general' && (
        <div className='border relative p-2 rounded-md border-cyan-500'>
          <div className=''>
            <label htmlFor=''>
              *General Information{' '}
              <span className='text-gray-500'>
                (ex: Hotel, Restaurant, Store)
              </span>
            </label>
            <Input
              onChange={value =>
                handleGeneralChange('generaleLocation', value.target.value)
              }
              value={generale.generaleLocation}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WhereDidFindIt;
