import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RoomGallery from '@/components/RoomGallery';
import About from '@/components/About';
import MeetTheGuests from '@/components/MeetTheGuests';
import Neighborhood from '@/components/Neighborhood';
import FAQ from '@/components/FAQ';
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Hero />
        <RoomGallery />
      </main>
      <About />
      <MeetTheGuests />
      <Neighborhood />
      <FAQ />
      <Footer />
    </div>
  );
}
