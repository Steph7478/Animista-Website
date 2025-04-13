import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-text">
      <div className="xs:p-5 flex flex-col bg-white text-navbar md:px-[170px] md:py-[80px]">
        <span className="xs:text-[40px] uppercase md:text-[50px]">About</span>
        <span className="xs:text-sm py-5 uppercase md:text-lg">
          Animista is a place where you can play with a collection of pre-made
          CSS animations, tweak them, and get only those you will actually use.
        </span>
        <p className="xs:text-sm md:text-base">
          Animista started out as a small side project of{" "}
          <a
            target="_blank"
            href="/https://www.aedin.com/in/anatravas"
            className="text-lightred hover:underline"
          >
            mine
          </a>
          . As I was increasingly using CSS animations, I thought it would be
          useful to have them organized in a meaningful and accessible way, so
          they could be easily reused in different projects. <br /> <br /> The
          idea was to create a playground of sorts where a collection of
          pre-made animations could be tested and tweaked before use. Seeing how
          various options, like easing, delay, and duration, affect the
          animation proved to be very useful. And basically, that's how Animista
          was born. <br /> <br />I have been using Animista for a while now, and
          I hope some of you will find it useful as well. It's still very much a
          work in progress, and hopefully, it will evolve over time. :{")"}{" "}
          <br />
          <br />
          Huge thanks to{" "}
          <a
            target="_blank"
            href="/https://twitter.com/sergej108"
            className="text-lightred hover:underline"
          >
            @sergej108
          </a>{" "}
          for helping me with the JS part and for supporting and encouraging me
          to publish this project. Animista wouldn't be possible without him.
        </p>
        <span className="xs:text-[40px] py-5 md:text-[50px]">Get in touch</span>
        <p className="xs:text-sm mb-16 md:text-base">
          Should you decide to use Animista for your next cool project or have
          any suggestions/feedback, it would be awesome if you gave me a shout
          at{" "}
          <a
            target="_blank"
            href="/mailto:cssanimista@gmail.com?subject=Animista"
            className="text-lightred hover:underline"
          >
            cssanimista(at)gmail.com
          </a>{" "}
          !
        </p>
      </div>
    </div>
  );
}
