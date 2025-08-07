export default function Page404() {
  return (
    <article className="h-screen w-screen flex flex-col justify-center items-center px-4 sm:px-8 md:px-12">
      <h1 className="text-6xl sm:text-7xl md:text-8xl font-dancing text-gold font-bold animate-bounce">
        404
      </h1>
      <p className="font-bold font-montserrat text-white text-lg sm:text-xl md:text-2xl italic mt-4 text-center">
        Oops! This page isn't available. Sorry about that.
      </p>
      <p className="font-bold font-montserrat text-white text-lg sm:text-xl md:text-2xl italic mt-2 text-center">
        Try searching for something else, or head back to the homepage.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-2 bg-gold text-black font-bold text-lg sm:text-xl md:text-lg rounded-full hover:bg-gray-200 transition duration-300 font-montserrat"
      >
        Go to Homepage
      </a>
    </article>
  );
}
