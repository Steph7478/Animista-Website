import { useEffect } from "react";

export default function Advertise() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="xs:p-5 flex flex-col gap-y-5 bg-white font-text text-navbar md:px-[15%] md:py-[10%]">
      <Section title="BRAND PROMOTION" className="font-normal">
        <p className="mt-[30px] font-normal uppercase">
          Promote your brand, product or service on Animista and reach thousands
          of web developers and designers from across the globe.
        </p>
        <br />
        <p>
          Animista is a high traffic niche web app that gets tens of thousands
          unique visitors montly. It has been voted both Product of the Week and
          Product of the Day on{" "}
          <a
            target="_blank"
            href="https://www.producthunt.com/posts/animista"
            className="text-lightred hover:underline"
          >
            Product Hunt
          </a>
          . It has also been featured in many industry-leading magazines and
          websites such as net magazine (print edition feature article),
          <a
            target="_blank"
            href="https://www.creativebloq.com/features/master-on-demand-css-animations-with-animista"
            className="text-lightred hover:underline"
          >
            Creative Bloq
          </a>
          ,{" "}
          <a
            target="_blank"
            href="https://www.smashingmagazine.com/smashing-newsletter-issue-178/#a5"
            className="text-lightred hover:underline"
          >
            Smashing Magazine
          </a>
          ,{" "}
          <a
            target="_blank"
            href="https://css-tricks.com/css-animation-libraries/"
            className="text-lightred hover:underline"
          >
            CSS Tricks
          </a>
          ,{" "}
          <a
            target="_blank"
            href="https://www.hongkiat.com/blog/animista-generate-css-animations/"
            className="text-lightred hover:underline"
          >
            Hongkiat
          </a>
          , ant others.
        </p>
      </Section>

      <Section title="Brand placement" className="">
        <p className="mt-[20px]">
          Premium sponsors are featured with a linked brand logo on Animista
          front page and other pages throughout the website. Number of Premium
          sponsor slots is limited so as to ensure the best possible exposure.
        </p>
        <img
          src="https://animista.net/images/animista-screenshot-desk.png"
          alt="desk"
          className="my-10 object-contain shadow-md shadow-gray-300"
        />
      </Section>

      <Section title="Brand logo graphic styleguide" className="">
        <p className="mt-[20px]">
          Brand logo image has to be 30px high and maximum 220px wide (i.e. 60px
          and max. 440px for high PPI screens). Accepted image formats are
          *.svg, *.png and *.jpg. Here is the brand logo styleguide:
        </p>
        <img
          src="https://animista.net/images/brand-logo-styleguide.png"
          alt="styleguide"
          className="my-10 self-center justify-self-center object-contain shadow-md shadow-gray-300"
        />
      </Section>

      <Section title="How to apply" className="">
        <p className="mt-[20px]">
          If you are interested in promoting your brand on Animista, click the
          button below to fill out the application form.
        </p>
        <button className="text-md group relative my-10 flex h-[65px] w-[280px] items-center justify-center justify-self-center rounded-sm bg-lightred font-bold uppercase text-white transition-all duration-150">
          <span className="z-10 flex items-center justify-center gap-x-2 uppercase">
            Promote your brand
          </span>
          <div className="absolute inset-0 h-full w-full origin-top scale-50 rounded-t-full bg-lightred opacity-0 brightness-125 backdrop-blur-none transition-all duration-75 group-hover:scale-100 group-hover:rounded-t-md group-hover:opacity-100 group-hover:backdrop-blur-sm"></div>
        </button>
        <p>
          If you have any questions contact us at cssanimista(at)gmail.com with
          a subject 'Brand Promotion'.
        </p>
        <br />
        <p className="mb-[40px]">
          Animista Premium sponsors are handpicked. Tech related businesses are
          preferred although exceptions can be made. We reserve the right to
          turn down all inappropriate businesses.
        </p>
      </Section>
    </div>
  );
}
interface SectionProps {
  title: string;
  children: React.ReactNode;
  className: string;
}

function Section({ title, children, className }: SectionProps) {
  return (
    <div>
      <span className={`xs:text-[30px] md:text-[40px] ${className}`}>
        {title}
      </span>
      {children}
    </div>
  );
}
