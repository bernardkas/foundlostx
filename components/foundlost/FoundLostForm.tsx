'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Combobox } from '../ui/combobox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { DatePicker } from '../ui/dataPicker';
import { englandCity, countryData, whereDidYouFindIt } from '@/lib/defaultData';
import axios from 'axios';
import { toast } from 'react-toastify';
import TimePicker from '../ui/timePicker';
import PhotoUpload from '../ui/uploadphoto';
import WhereDidFindIt from './whereDidFindIt';
import Map from '../map/Map';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface FoundLostFromProps {
  // userId: User;
}

const FoundLostForm = ({}: FoundLostFromProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [airoport, setAiroport] = useState({
    airportName: '',
    airlineName: '',
    flightNumber: '',
  });

  const [bus, setBus] = useState({
    busName: '',
    busRouteNumber: '',
  });
  const [train, setTrain] = useState({
    trainName: '',
    trainNumber: '',
  });
  const [ferry, setFerry] = useState({
    ferryName: '',
    ferryRoute: '',
  });
  const [taxi, setTaxi] = useState({
    taxiName: '',
    taxiPlate: '',
  });
  const [generalLocation, setGeneralLocation] = useState({
    generaleLocation: '',
  });
  const [input, setInput] = useState({
    name: '',
    lastname: '',
    phone: '',
    email: '',
    title: '',
    country: '',
    city: '',
    whereDidFind: '',
    exactLocation: '',
    description: '',
    mapAddress: '',
    label: '',
  });
  // const [address, setAddress] = useState('');

  const [selectPhoto, setSelectPhoto] = useState<File[]>([]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPhotos = e.target.files;
    if (selectedPhotos) {
      const newPhotos = Array.from(selectedPhotos);
      setSelectPhoto((prevPhotos: any) => [...prevPhotos, ...newPhotos]);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };
  const handleTimeSelect = (date: string) => {
    setSelectedTime(date);
  };
  const createForm = async (e: any) => {
    e.preventDefault();

    // if (!userId) {
    //   return router.push('/sign-in');
    // }

    if (
      input.name === '' ||
      input.phone === '' ||
      input.email === '' ||
      input.title === '' ||
      input.country === '' ||
      input.city === '' ||
      input.whereDidFind === '' ||
      input.exactLocation === '' ||
      input.description === '' ||
      input.label === ''
    ) {
      toast('You need to fill required value', { type: 'error' });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      selectPhoto.forEach((file, index) => {
        formData.append(`file[]`, file);
      });

      const uploadResponse = await axios.post('/api/s3-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Content-Disposition': 'inline',
        },
      });
      const photoData = uploadResponse.data;
      const fotoS3 = photoData?.fileNames;

      const data = await axios.post('/api/foundlost', {
        ...input,
        findingDate: selectedDate,
        findingTime: selectedTime,
        photo: fotoS3,
        airoport: airoport,
        bus: bus,
        train: train,
        ferry: ferry,
        taxi: taxi,
        generalLocation: generalLocation,
      });

      if (data.status === 200) {
        toast('foundlost', { type: 'success' });
        setLoading(false);
        setInput({
          name: '',
          lastname: '',
          phone: '',
          email: '',
          title: '',
          country: '',
          city: '',
          whereDidFind: '',
          exactLocation: '',
          description: '',
          mapAddress: '',
          label: '',
        });
        setAiroport({
          airlineName: '',
          airportName: '',
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
        setFerry({
          ferryName: '',
          ferryRoute: '',
        });
        setSelectedTime('');
        // @ts-ignore
        setSelectedDate('');
      }
    } catch (err) {
      toast('Error! Not created', { type: 'error' });
      console.log(err);
    }
  };

  const handleInputChange = (fieldName: string, fieldValue: any) => {
    setInput({ ...input, [fieldName]: fieldValue });
  };

  const handleRemovePhoto = (index: number) => {
    const updatedFiles = [...selectPhoto];
    updatedFiles.splice(index, 1);
    setSelectPhoto(updatedFiles);
  };

  return (
    <div className='w-full my-16 flex items-center justify-center'>
      <div className='mx-5  lg:mx-[15%] flex flex-col items-left justify-center gap-5 '>
        <form className='flex flex-col gap-5 p-4' onSubmit={createForm}>
          <div className='w-full md:w-[800px]'>
            <h1
              className={`text-3xl font-noto-sans mb-3 font-semibold ${
                input.label === 'found'
                  ? 'text-green-400 border-b-[2px] border-green-500'
                  : 'text-red-400 border-b-[2px] border-red-500'
              } `}>
              {input.label === 'found' ? 'Found' : 'Lost'}
            </h1>
            {input.label === 'found' ? (
              <p>
                Did you found something. Greate you can give information below
                and describe what you found.
              </p>
            ) : (
              <p>
                Did you lost something. Ufff bad day but we are here for you,
                you can give information below and describe what you lost.
              </p>
            )}
          </div>
          <div>
            <label htmlFor=''>*Items status</label>
            <Select
              onValueChange={value => handleInputChange('label', value)}
              value={input.label}>
              <SelectTrigger className='border-[1px] pb-1 outline-none w-96 font-golos-text text-base'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  defaultValue='lost'
                  defaultChecked={true}
                  value='lost'>
                  Lost
                </SelectItem>
                <SelectItem value='found'>Found</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-row flex-wrap gap-5'>
            <div>
              <label htmlFor=''>*Name</label>
              <Input
                onChange={value =>
                  handleInputChange('name', value.target.value)
                }
                value={input.name}
                className=' w-96 outline-none text-base font-noto-sans'
              />
            </div>
            <div>
              <label htmlFor=''>Lastname</label>
              <Input
                onChange={value =>
                  handleInputChange('lastname', value.target.value)
                }
                value={input.lastname}
                name='lastname'
                className='w-96 outline-none text-base font-noto-sans'
              />
            </div>
          </div>
          <div className='flex flex-row flex-wrap gap-5'>
            <div>
              <label htmlFor=''>*Phone</label>
              <Input
                onChange={value =>
                  handleInputChange('phone', value.target.value)
                }
                value={input.phone}
                name='phone'
                className='w-96 outline-none text-base font-noto-sans'
              />
            </div>
            <div>
              <label htmlFor=''>Email</label>
              <Input
                onChange={value =>
                  handleInputChange('email', value.target.value)
                }
                value={input.email}
                name='email'
                className='w-96 outline-none text-base font-noto-sans'
              />
            </div>
          </div>
          <div className=''>
            <label htmlFor=''>*Title</label>
            <Input
              onChange={value => handleInputChange('title', value.target.value)}
              value={input.title}
              name='title'
              className='w-96 lg: outline-none text-base font-noto-sans'
            />
          </div>
          <div className='flex flex-row flex-wrap gap-5'>
            <div className='flex flex-col'>
              <label htmlFor=''>*Country</label>
              <Combobox
                frameworks={countryData}
                className='w-96 outline-none text-base font-noto-sans'
                setValue={value => handleInputChange('country', value)}
                value={input.country}
                placeholder='Select a country'
              />
            </div>
          </div>
          <div className='flex flex-row flex-wrap gap-5'>
            <div className='flex flex-col'>
              <label htmlFor=''>*City</label>
              <Combobox
                frameworks={englandCity}
                className='w-96 outline-none text-base font-noto-sans'
                setValue={value => handleInputChange('city', value)}
                value={input.city}
                placeholder='Select a city'
              />
            </div>
          </div>
          <div className='flex flex-col'>
            {input.label === 'found' ? (
              <label htmlFor=''>*Where did you find it?</label>
            ) : (
              <label htmlFor=''>*Where did you lose it?</label>
            )}

            <Select
              onValueChange={value => handleInputChange('whereDidFind', value)}
              value={input.whereDidFind}>
              <SelectTrigger className='border-[1px] pb-1 outline-none w-96 font-golos-text text-base'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {whereDidYouFindIt.map(where => (
                  <SelectItem key={where.value} value={where.value}>
                    {where.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <WhereDidFindIt
            input={input}
            handleInputChange={handleInputChange}
            setAiroport={setAiroport}
            airoport={airoport}
            bus={bus}
            setBus={setBus}
            train={train}
            setTrain={setTrain}
            ferry={ferry}
            setFerry={setFerry}
            taxi={taxi}
            setTaxi={setTaxi}
            generale={generalLocation}
            setGenerale={setGeneralLocation}
          />
          <div className='flex flex-col'>
            {input.label === 'found' ? (
              <label htmlFor=''>
                *Provide details about the specific location where you find it.
              </label>
            ) : (
              <label htmlFor=''>
                *Provide details about the specific location where you lost it.
              </label>
            )}
            <Textarea
              onChange={value =>
                handleInputChange('exactLocation', value.target.value)
              }
              value={input.exactLocation}
              className='text-base font-noto-sans w-96 lg:w-2/3'
            />
          </div>
          <div className='flex flex-col'>
            {input.label === 'found' ? (
              <label htmlFor=''>
                *Can you please describe the item you find?
              </label>
            ) : (
              <label htmlFor=''>
                *Can you please describe the item you lost?
              </label>
            )}
            <Textarea
              onChange={value =>
                handleInputChange('description', value.target.value)
              }
              value={input.description}
              className='text-base font-noto-sans w-96 lg:w-2/3'
            />
          </div>
          <div className='flex flex-col'>
            {input.label === 'found' ? (
              <label htmlFor=''>*What day you find it?</label>
            ) : (
              <label htmlFor=''>*What day you losted?</label>
            )}
            <DatePicker
              selectedDate={selectedDate}
              onSelectDate={handleDateSelect}
              placeholder='Select your date'
            />
          </div>
          <TimePicker
            selectedDateTime={selectedTime}
            onDateTimeChange={handleTimeSelect}
            label='Select the time'
          />
          {/* <div>
            <Map address={address} setAddress={setAddress} />
          </div> */}
          <div>
            <label htmlFor=''>*Please upload a photo here</label>
            <PhotoUpload
              onChange={handleUpload}
              photo={selectPhoto}
              handleRemovePhoto={handleRemovePhoto}
            />
          </div>
          <Button
            type='submit'
            className='bg-orange-500 text-base hover:bg-orange-700'>
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FoundLostForm;
