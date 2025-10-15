import { cn } from "../lib/utils";
import NavbarDemo from "./components/element/navbar";
import Tabless from "./components/element/crudColom";

export default function Home() {
  
  return (
    <>
      <div className="relative flex flex-col h-[100vh] w-full overflow-hidden rounded-md  antialiased md:items-center md:justify-center">
          <div
            className={cn(
              "absolute inset-0",
              "[background-size:20px_20px]",
              "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
              "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
            )}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
          <NavbarDemo />
          <Tabless />
      </div>
    </>
  )
}
