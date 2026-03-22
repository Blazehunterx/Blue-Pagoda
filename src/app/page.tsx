import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RoomGallery from "@/components/RoomGallery";
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
      <Footer />
    </div>
  );
}
