import Header from '@/components/header/Header';
import Howwork from './../components/howDosItWork/Howwork';
import { englandCountry } from '@/lib/action';

export default async function Home() {
  const getEngland = await englandCountry();

  console.log('englandCountry', getEngland);
  return (
    <div>
      <Header getEngland={getEngland} />
      <Howwork />
    </div>
  );
}
