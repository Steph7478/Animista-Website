import { Link } from "react-router-dom";
import { AiFillTwitterCircle } from "react-icons/ai";

export default function Footer() {
  return (
    <>
      <div className="absolute left-0 right-0 z-50 mx-auto flex w-fit -translate-y-2 items-center justify-center">
        <span className="flex w-full items-center justify-center text-nowrap rounded-t-sm bg-white px-3 py-1 text-xs font-bold uppercase text-gray-500 xs:hidden md:flex">
          Premium sponsors
        </span>
      </div>
      <div className="relative bottom-0 w-full overflow-hidden border-t-[1px] bg-transparent">
        <div className="flex flex-wrap items-center justify-center gap-10 border-y-[1px] border-gray-300 bg-white py-[30px] xs:hidden md:flex">
          <img
            src="https://animista.net/sponsors/svgartista-logo.png"
            className="h-[30px]"
            alt="SVGArtista"
          />
          <img
            src="https://animista.net/sponsors/digitalocean-logo.svg"
            className="h-[30px]"
            alt="DigitalOcean"
          />
          <img
            src="https://animista.net/sponsors/nordvpn-logo.svg"
            className="h-[30px]"
            alt="NordVPN"
          />
          <Link
            to={"/advertise"}
            className="text-sm uppercase hover:text-lightred"
          >
            Promote your brand
          </Link>
        </div>

        <div className="bg-white">
          <ul className="flex list-none flex-row flex-wrap items-center justify-center gap-x-2 py-[20px] text-sm uppercase">
            <li className="flex items-center">
              By:{" "}
              <a
                href="https://x.com/ana108"
                target="_blank"
                className="px-2 hover:text-red-500"
              >
                Ana Travas
              </a>
              ©2017
            </li>
            <li className="flex items-center">
              <span className="mr-2 scale-150">•</span>
              <Link className="hover:text-red-500" to={"/cookies"}>
                Cookies
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mr-2 scale-150">•</span>
              <Link className="hover:text-red-500" to={"/privacy"}>
                Privacy
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mr-2 scale-150">•</span>
              <Link
                className="hover:text-red-500"
                to={"mailto:cssanimista@gmail.com?subject=Animista"}
              >
                Contact
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mr-2 scale-150">•</span>
              Share the love
              <span className="mx-2">
                <a
                  href="https://x.com/intent/post?status=Check%20out%20this%20cool%20CSS%20animations%20library%20at%20http%3A%2F%2Fanimista.net%20%23CSS%20%23cssanimation%20via%20%40cssanimista"
                  target="_blank"
                >
                  <AiFillTwitterCircle className="h-8 w-8" />
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
