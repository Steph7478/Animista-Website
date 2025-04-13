import { useEffect } from "react";
import Modal from "../../components/coffeeModal";
import useToggleModal from "../../hooks/useModal";

export default function Cookies() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { modal, toggleModal } = useToggleModal();
  return (
    <div className="xs:text-md flex flex-col overflow-hidden bg-white font-text text-navbar xs:p-5 md:px-[15%] md:py-[10%] md:text-lg">
      <Modal toggleModal={toggleModal} modal={modal} />
      <Section
        title="Cookies Policy"
        className="mb-[80px] font-normal uppercase xs:text-[45px] md:text-[60px]"
      >
        <p className="mt-[30px] italic">Last updated: 26 December 2019</p>
        <br />
        <p>
          Animista website (the "Service") uses cookies. By using the Service,
          you consent to the use of cookies.
        </p>
        <br />
        <p>
          Our Cookies Policy explains what cookies are, how we use cookies, how
          third-parties we may partner with may use cookies on the Service, your
          choices regarding cookies, and further information about cookies.
        </p>
      </Section>

      <Section title="What are Cookies" className="">
        <p>
          Cookies are small pieces of text sent by your web browser by a website
          you visit. A cookie file is stored in your web browser and allows the
          Service or a third-party to recognize you and make your next visit
          easier and the Service more useful to you.
        </p>
        <br />
        <p>Cookies can be "persistent" or "session" cookies.</p>
      </Section>

      <Section title="How Animista uses cookies" className="">
        <p>
          When you use and access the Service, we may place a number of cookies
          files in your web browser.
        </p>
        <br />
        <p>
          We use cookies for the following purposes: to enable certain functions
          of the Service, to provide analytics, to store your preferences, to
          enable advertisements delivery, including behavioral advertising.
        </p>
        <br />
        <p>
          We use both session and persistent cookies on the Service and we use
          different types of cookies to run the Service:
        </p>
      </Section>

      <Section title="Third-party cookies" className="">
        <p>
          In addition to our own cookies, we may also use various third-party
          cookies to report usage statistics of the Service, deliver
          advertisements on and through the Service, and so on. Please refer to
          the privacy policy of the listed services for detailed information.
        </p>
      </Section>

      <Section title="Advertising" className="">
        <p>
          This type of service allows User Data to be utilized for advertising
          communication purposes displayed in the form of banners and other
          advertisements on this Website, possibly based on User interests.
        </p>
        <br />
        <p>
          Some of the services listed below may use Cookies to identify Users or
          they may use the behavioral retargeting technique, i.e. displaying ads
          tailored to the User’s interests and behavior, including those
          detected outside this Website. For more information, please check the
          privacy policies of the relevant services.
        </p>
        <SubSection className="" title="BuySellAds (BuySellAds.com Inc.)">
          <p>
            BuySellAds is an advertising service provided by BuySellAds.com Inc.
          </p>
          <br />
          <p>Personal Data collected: Cookies and Usage Data.</p>
          <br />
          <p>
            Place of processing: United States –{" "}
            <a
              target="_blank"
              href="https://mailchimp.com/legal/privacy/"
              className="text-lightred hover:underline"
            >
              Privacy Policy{" "}
            </a>
            .
          </p>
        </SubSection>
      </Section>

      <Section title="Managing contacts and sending messages" className="">
        <p>
          This type of service makes it possible to manage a database of email
          contacts, phone contacts or any other contact information to
          communicate with the User.
        </p>
        <br />
        <p>
          These services may also collect data concerning the date and time when
          the message was viewed by the User, as well as when the User
          interacted with it, such as by clicking on as included in the message.
        </p>
        <SubSection
          className=""
          title="Mailchimp (The Rocket Science Group LLC)"
        >
          <p>
            Mailchimp is an email address management and message sending service
            provided by The Rocket Science Group LLC.
          </p>
          <br />
          <p>Personal Data collected: email address.</p>
          <br />
          <p>
            Place of processing: United States –{" "}
            <a
              target="_blank"
              href="https://mailchimp.com/legal/privacy/"
              className="text-lightred hover:underline"
            >
              Privacy Policy{" "}
            </a>
            . Privacy Shield participant.
          </p>
        </SubSection>
      </Section>

      <Section title="Analytics" className="">
        <p>
          The services contained in this section enable the Owner to monitor and
          analyze web traffic and can be used to keep track of User behavior.
        </p>

        <SubSection title="Google Analytics (Google Inc.)" className="">
          <p>
            Google Analytics is a web analysis service provided by Google Inc.
            (“Google”). Google utilizes the Data collected to track and examine
            the use of this Website, to prepare reports on its activities and
            share them with other Google services.
          </p>
          <br />
          <p>
            Google may use the Data collected to contextualize and personalize
            the ads of its own advertising network.
          </p>
          <br />
          <p>Personal Data collected: Cookies and Usage Data.</p>
          <br />
          <p>
            Place of processing: United States –{" "}
            <a
              target="_blank"
              href="https://www.google.com/intl/en/policies/privacy/"
              className="text-lightred hover:underline"
            >
              Privacy Policy{" "}
            </a>
            -{" "}
            <a
              target="_blank"
              href="https://tools.google.com/dlpage/gaoptout?hl=en"
              className="text-lightred hover:underline"
            >
              Opt out
            </a>
            . Privacy Shield participant.
          </p>
        </SubSection>
      </Section>

      <Section title="What are your choices regarding cookies" className="">
        <p>
          If you'd like to delete cookies or instruct your web browser to delete
          or refuse cookies, please visit the help pages of your web browser.
        </p>
        <br />
        <p>
          Please note, however, that if you delete cookies or refuse to accept
          them, you might not be able to use all of the features we offer, you
          may not be able to store your preferences, and some of our pages might
          not display properly.
        </p>
      </Section>

      <Section
        title="Where can you find more information about cookies"
        className=""
      >
        <p>
          You can learn more about cookies and the following third-party
          websites:
        </p>
        <br />
        <ul className="flex translate-x-[10%] list-disc flex-col gap-y-3 text-lightred marker:text-navbar xs:text-sm md:text-base">
          <li>
            {" "}
            <a
              target="_blank"
              href="http://www.allaboutcookies.org/"
              className="text-lightred hover:underline"
            >
              AllAboutCookies
            </a>
          </li>
          <li>
            {" "}
            <a
              target="_blank"
              href="http://www.networkadvertising.org/"
              className="text-lightred hover:underline"
            >
              Network Advertising Initiative (US)
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="http://www.youronlinechoices.eu/"
              className="text-lightred hover:underline"
            >
              EDAA (EU)
            </a>
          </li>
          <li>
            {" "}
            <a
              target="_blank"
              href="https://youradchoices.ca/understanding-online-advertising/"
              className="text-lightred hover:underline"
            >
              DAAC (Canada)
            </a>
          </li>
          <li>
            {" "}
            <a
              target="_blank"
              href="http://www.ddai.info/optout"
              className="text-lightred hover:underline"
            >
              DDAI (Japan)
            </a>
          </li>
        </ul>
      </Section>

      <Section title="Data Controller" className="">
        <p>
          Since the installation of third-party Cookies and other tracking
          systems through the services used within this Website cannot be
          technically controlled by the Owner, any specific references to
          Cookies and tracking systems installed by third parties are to be
          considered indicative. In order to obtain complete information, the
          User is kindly requested to consult the privacy policy for the
          respective third-party services listed in this document.
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
    <div className="my-8">
      <h2
        className={`${className} mb-[30px] font-normal xs:text-[20px] md:text-[30px]`}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function SubSection({ title, children, className }: SectionProps) {
  return (
    <div>
      <h3 className={`${className} my-5 font-bold`}>{title}</h3>
      {children}
    </div>
  );
}
