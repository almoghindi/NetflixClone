
import HeaderLandingPage from "../layouts/header-landing-page";
import BackgroundLandingPage from "../assets/img/landing-page-assets/landing-page-background.jpg";
import TVImage from "../assets/img/landing-page-assets/tv.png";
import DeviceImage from "../assets/img/landing-page-assets/mobile-section.jpg";
import WatchEveryWere from "../assets/img/landing-page-assets/watch-everywere-section.png";
import KidsProfileImage from "../assets/img/landing-page-assets/profile-for-kids.png";
import SignInButton from "../components/landing/sign-in-button";
import EmailForm from "../components/landing/email-form";
import FeatureSection from "../components/landing/feature-section";
import FAQSection from "../components/landing/faq-section";


const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${BackgroundLandingPage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="bg-cover min-h-screen relative z-10">
          <header className="flex justify-between items-center p-4">
            <HeaderLandingPage />
            <SignInButton />
          </header>

          <main className="container mx-auto px-4 py-16">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-5xl font-bold mb-4">
                Unlimited movies, TV shows, and more
              </h1>
              <p className="text-xl mb-8">Watch anywhere. Cancel anytime.</p>
              <p className="text-lg mb-4">
                Ready to watch? Enter your email to create or restart your
                membership.
              </p>
              <EmailForm />
            </div>
          </main>
        </div>
      </div>

      <FeatureSection
        title="Enjoy on your TV"
        description="Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
        imageSrc={TVImage}
        videoSrc={
          "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
        }
      />

      <FeatureSection
        title="Download your shows to watch offline"
        description="Save your favorites easily and always have something to watch."
        imageSrc={DeviceImage}
        isReversed={true}
      />
      <FeatureSection
        title="Watch everywhere"
        description="Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV."
        imageSrc={WatchEveryWere}
        videoWatchEverywere={
          "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v"
        }
      />
      <FeatureSection
        title="Create profiles for kids"
        description="Send kids on adventures with their favorite characters in a space made just for them—free with your membership."
        imageSrc={KidsProfileImage}
        isReversed={true}
      />

      <FAQSection />
      <footer className="py-8 ">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-4 text-bold">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className="flex justify-center max-w-md mx-auto">
          <EmailForm />
          </div>
        </div>
      </footer>
      <div className="border-t-8 rounded-lg" style={{ borderColor: 'rgb(45, 45, 45)' }}/>
    </div>
  );
};

export default LandingPage;
