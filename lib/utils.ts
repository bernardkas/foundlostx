import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  airoportBerlin,
  airoportMunich,
  airportsNewYork,
  americaCity,
  englandAiroports,
  englandCity,
  germanyCity,
} from './defaultData';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: any): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  const formattedDate = new Date(dateString).toLocaleString('en-US', options);
  return formattedDate;
};

export const capitalizeFirstLetter = (str: string) => {
  return str?.charAt(0).toUpperCase() + str?.slice(1);
};

export const formatDistanceToNow = (date: any) => {
  const currentDate = new Date();
  const postDate = new Date(date);
  const diffInMilliseconds = currentDate.getTime() - postDate.getTime();

  if (!isNaN(diffInMilliseconds)) {
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
        return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
      }
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  }
  return 'Invalid date';
};

export const getCityOptions = (country: string) => {
  switch (country) {
    case 'england':
      return englandCity;
    case 'america':
      return americaCity;
    case 'germany':
      return germanyCity;
    default:
      return [];
  }
};

export const getAiroportOptions = (airoport: string) => {
  switch (airoport) {
    case 'london':
      return englandAiroports;
    case 'new-york':
      return airportsNewYork;
    case 'munich':
      return airoportMunich;
    case 'berlin':
      return airoportBerlin;
    default:
      return [];
  }
};

export const getAirportLabel = (value: string) => {
  switch (value?.toLowerCase()) {
    case 'jfk':
      return 'John F. Kennedy International Airport (JFK)';
    case 'lga':
      return 'LaGuardia Airport (LGA)';
    case 'ewr':
      return 'Newark Liberty International Airport (EWR)';
    case 'swf':
      return 'Stewart International Airport (SWF)';
    case 'isp':
      return 'Long Island MacArthur Airport (ISP)';
    case 'hpn':
      return 'Westchester County Airport (HPN)';
    case 'alb':
      return 'Albany International Airport (ALB)';
    case 'roc':
      return 'Greater Rochester International Airport (ROC)';
    case 'buf':
      return 'Buffalo Niagara International Airport (BUF)';
    case 'syr':
      return 'Syracuse Hancock International Airport (SYR)';
    case 'lha':
      return 'London Heathrow Airport (LHR)';
    case 'lga':
      return 'London Gatwick Airport (LGW)';
    case 'lst':
      return 'London Stansted Airport (STN)';
    case 'llu':
      return 'London Luton Airport (LTN)';
    case 'lcy':
      return 'London City Airport (LCY)';
    case 'lse':
      return 'London Southend Airport (SEN)';
    case 'lbh':
      return 'London Biggin Hill Airport (BQH)';
    case 'las':
      return 'London ashford airport';
    case 'lea':
      return 'London Elstree Airfield (EGTR)';
    case 'lfa':
      return 'London Farnborough Airport (FAB)';
    case 'loa':
      return 'London Oxford Airport (OXF)';
    case 'muc':
      return 'Munich Airport (MUC)';
    case 'txl':
      return 'Berlin Tegel Airport (TXL)';
    case 'sxf':
      return 'Berlin Schönefeld Airport (SXF)';
    case 'ber':
      return 'Berlin Brandenburg Airport (BER)';
    default:
      return 'Unknown Airport';
  }
};
