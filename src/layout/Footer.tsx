export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="bg-gray-800 text-white ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 text-center">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Explore</h3>
          <ul className="text-gray-300">
            <li className="hover:text-white transition duration-300">
              Upcoming
            </li>
            <li className="hover:text-white transition duration-300">
              Shipping
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">About</h3>
          <ul className="text-gray-300">
            <li className="hover:text-white transition duration-300">
              Support
            </li>
            <li className="hover:text-white transition duration-300">
              Careers
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Contact</h3>
          <ul className="text-gray-300">
            <li className="hover:text-white transition duration-300">
              List our books
            </li>
            <li className="hover:text-white transition duration-300">
              Contact team
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto  text-center">
        <div className="flex justify-center items-center text-gray-300 text-sm space-x-5">
          <p className="hover:text-white transition duration-300">
            Privacy Policy
          </p>
          <p className="hover:text-white transition duration-300">
            Terms & Conditions
          </p>
          <p>&#169; Book Catalog {year}</p>
        </div>
      </div>
    </footer>
  );
}
