"use client";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  function handleSubmit(){
    router.push("/signin")

  }
  return (
  <div className=" flex flex-col text-2xl mt-32 items-center">
     <div className="text-4xl m-6">
    hi welcome to ai planner enter your details
  </div>
  <div className="flex flex-col space-y-4">
     <input type="text" placeholder="Destination"/>
    <input type="text" placeholder="Budjet"/>
    <input type="text" placeholder="Days"/>
    <input type="text" placeholder="type"/>
    <button onClick={handleSubmit}>Submit</button>
  </div>
  </div>
  );
}
