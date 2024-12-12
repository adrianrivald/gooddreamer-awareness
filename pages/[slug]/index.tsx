import Head from "next/head";
import { dummyContent } from "../../constants/dummyData";

export default function DetailPage() {
  return (
    <div className="">
      <Head>
        <title>Content Page - Awareness</title>
        <meta name="description" content="Content page" />
      </Head>
      <main className="max-w-[80rem] flex justify-center mx-auto px-4 pt-4 mb-32">
        <div id="content">
          <h1 className="font-bold text-4xl mt-4">
            Kesepakatan Hati: Ibu Pengganti Untuk Anak CEO
          </h1>
          <p className="text-2xl mt-8 text-[#68696a]">
            🔞"Rasa dia bagaimana, saudara?" 🔞"Manis, seperti madu."Dia memberi
            jawaban setelah merenung sejenak, lalu menjalankan lidahnya kembali
            ke lipatan saya.
          </p>
          <img
            src="/images/thumbnail-1.jpg"
            className="flex justify-center w-full mt-4"
          />
          <p className="mt-4 text-2xl leading-10">{dummyContent}</p>
          <div className="my-16 flex justify-center text-[#6C4E9A] text-3xl underline font-bold">
            Klik Bab Berikutnya
          </div>
        </div>
        <footer className="fixed bottom-0 bg-white p-4 w-full">
          <button className="p-4 text-3xl rounded-lg bg-[#6C4E9A] w-full text-white font-bold">
            👉LANJUTKAN MEMBACA👈
          </button>
        </footer>
      </main>
    </div>
  );
}
