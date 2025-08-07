import { Typewriter } from "react-simple-typewriter";
export default function Homepage() {
  return (
    <article className="h-screen w-screen flex flex-col items-center justify-center text-center px-4">
      <title>FitRang | Home</title>
      <h1 className="border-grey font-dancing text-gold text-6xl sm:text-7xl md:text-8xl lg:text-8xl italic font-bold mb-4">
        Fit<span>रंग</span>
      </h1>
      <h1 className="text-white bg-grey w-auto font-montserrat italic text-lg sm:text-xl md:text-2xl lg:text-2xl mb-4 font-bold animate-bounce">
        <Typewriter
          words={["Shop Like It's Made Just for You..."]}
          typeSpeed={50}
        />
      </h1>
    </article>
  );
}
