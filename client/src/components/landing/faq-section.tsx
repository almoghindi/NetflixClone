import FAQItem from "./faq-item";


const FAQSection: React.FC = () => {
    return (
      <section className="py-16 border-t border-gray-800 bg-black" >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">
            Frequently Asked Questions
          </h2>
  
          <div className="max-w-4xl mx-auto">
          <FAQItem
            question="What is Netflix?"
            answer="Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single commercial – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!"
          />
          <FAQItem
            question="How much does Netflix cost?"
            answer="Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $8.99 to $17.99 a month. No extra costs, no contracts."
          />
          <FAQItem
            question="Where can I watch?"
            answer="Watch anywhere, anytime, on an unlimited number of devices. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players, and game consoles."
          />
          <FAQItem
            question="How do I cancel?"
            answer="Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees - start or stop your account anytime."
          />
          <FAQItem
            question="What can I watch on Netflix?"
            answer="Netflix has an extensive"
          />
          </div>
        </div>
      </section>
    );
};

export default FAQSection
