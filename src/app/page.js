import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Main from "@/components/Main";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex gap-4 mx-4">
      <div className="w-3/12">
        <Sidebar/>
      </div>

      <div className="w-9/12">
        <Header/>  
        <main>
          <Main/>
        </main>
        <Footer/>
      </div>
    </div>
    
  );
}
