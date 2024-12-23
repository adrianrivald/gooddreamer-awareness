import Image from "next/image";

function Loading({ text }: { text?: string }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="spinner">
        <Image
          className="spinner-img"
          src="/icons/spinner.svg"
          width={30}
          height={30}
          alt="spinner"
        />
        <p>{text ?? "Loading..."}</p>
      </div>
    </div>
  );
}

export default Loading;
