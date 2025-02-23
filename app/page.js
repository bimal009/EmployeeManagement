import DataTable from "@/components/Table";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="m-4 text-center font-bold text-4xl text-black">
        <h1 className="mt-10 sm:mt-10 md:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Employee Management
        </h1>
      </div>

      <div className="mx-auto"></div>
      <DataTable />
    </>
  );
}
