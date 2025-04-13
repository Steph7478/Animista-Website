import { useEffect } from "react";

export default function HowTo() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="xs:p-5 flex flex-col items-start justify-center bg-white font-text text-navbar md:px-[15%] md:py-[10%]">
      <Section title="HOW TO">
        <Step
          number="1"
          title="PLAY"
          description="So this is how it works… You start by browsing through animations and playing with various options like easing, delay, duration etc. You will be able to see how they affect the animation on the spot."
        />
        <Step
          number="2"
          title="LIKE"
          description="You see something you like - just Funnel icon it. Rinse and repeat until you are happy with your picks. You can see your favourites at any time by hitting the Funnel icon button or click the Trash can icon button to start from scratch."
        />
        <Step
          number="3"
          title="COPY / DOWNLOAD"
          description="When you are ready, head to download screen by clicking the Downward arrow icon button or download a in main navigation. If you use Chrome browser, hit the download button and check your download folder. Boom - if everything went well the 'animista.css' file should be there. Otherwise you can simply copy the generated CSS code and paste it into your favourite code editor."
        />
      </Section>
      <Section title="Few notes">
        <p className="xs:text-sm mb-[100px] pt-4 md:text-base">
          Download feature relies on HTML5 FileSystem API and is supported in
          Chrome browser only. No worries, in other browsers you will have the
          option to copy the generated CSS code to clipboard.
          <br />
          <br />
          Also, some of the animations are experimental and may not work as
          expected in older browsers no matter how you prefix them. Use your own
          judgement or better yet – consult the super-useful{" "}
          <a
            target="_blank"
            href="http://caniuse.com/"
            className="text-lightred hover:underline"
          >
            caniuse.com
          </a>{" "}
          to check for browser support.
        </p>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="xs:text-[45px] mt-14 md:text-[50px]">{title}</span>
      {children}
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="my-14 flex flex-row">
      <span className="numbers px-5">{number}</span>
      <div className="px-6">
        <span className="text-[2em]">{title}</span>
        <p className="xs:text-sm mt-4 md:text-base">{description}</p>
      </div>
    </div>
  );
}
