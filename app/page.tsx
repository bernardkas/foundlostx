import Header from '@/components/header/Header';
import Howwork from './../components/howDosItWork/Howwork';
import { useUser } from '@clerk/nextjs';

export default async function Home() {
  return (
    <div>
      <Header />
      <Howwork />
    </div>
  );
}
