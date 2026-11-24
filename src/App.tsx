import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { destinations, featuredSafaris } from "./data/siteContent";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { BookingModal } from "./components/BookingModal";

const getFadeUp = (delay = 0): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0, 0, 0.2, 1], delay },
  },
});

function Hero({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <section className="hero" id="home">
      <div className="hero__image" />
      <div className="hero__shade" />
      <div className="hero__content page-shell">
        <motion.p className="eyebrow hero__eyebrow" initial="hidden" animate="visible" variants={getFadeUp(0)}>
          CURATED AFRICAN JOURNEYS
        </motion.p>
        <motion.h1 initial="hidden" animate="visible" variants={getFadeUp(0.12)}>
          Discover Africa,<br /><em>beautifully.</em>
        </motion.h1>
        <motion.p className="hero__description" initial="hidden" animate="visible" variants={getFadeUp(0.24)}>
          Thoughtfully crafted journeys through extraordinary landscapes, remarkable wildlife and the spirit of Africa.
        </motion.p>
        <motion.div className="hero__actions" initial="hidden" animate="visible" variants={getFadeUp(0.36)}>
          <a className="button button--orange" href="#safaris">Explore our safaris <ArrowRight size={16} /></a>
          <button type="button" className="button button--text-light" onClick={onOpenBooking}>Plan bespoke safari</button>
        </motion.div>
      </div>
      <a href="#story" className="hero__scroll" aria-label="Scroll to discover">
        <span>SCROLL TO DISCOVER</span><ArrowDown size={15} />
      </a>
      <div className="hero__index"><span>01</span><i /> <span>04</span></div>
    </section>
  );
}

function Intro() {
  return (
    <section className="intro section-pad" id="story">
      <div className="page-shell intro__grid">
        <motion.div className="intro__copy" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} variants={getFadeUp(0)}>
          <p className="eyebrow eyebrow--orange">A DIFFERENT WAY TO DISCOVER</p>
          <h2>More than a destination.<br /><em>A feeling that stays.</em></h2>
          <p className="body-copy">At Vespers, we believe the most meaningful journeys are felt long after the journey ends. From quiet mornings on the savannah to extraordinary encounters in the wild, every detail is thoughtfully considered.</p>
          <a className="text-link" href="#experiences">The Vespers experience <ArrowRight size={16} /></a>
        </motion.div>
        <motion.div className="intro__visual" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <img src="/images/intro-safari.jpg" alt="Golden light over the African savannah" />
          <div className="intro__caption"><span>THE AFRICAN WILDERNESS</span><span>01 / 03</span></div>
          <div className="intro__stamp">V<br /><span>EST.</span></div>
        </motion.div>
      </div>
    </section>
  );
}

function SafariSection({ onSelectSafari }: { onSelectSafari: (title: string) => void }) {
  return (
    <section className="safaris section-pad" id="safaris">
      <div className="page-shell">
        <div className="section-heading">
          <div><p className="eyebrow eyebrow--orange">FIND YOUR JOURNEY</p><h2>Journeys worth<br /><em>remembering.</em></h2></div>
          <p className="section-heading__aside">Every journey is an invitation to experience Africa differently. Find the escape that speaks to you.</p>
        </div>
        <div className="safari-grid">
          {featuredSafaris.map((safari, index) => (
            <motion.article className={`safari-card safari-card--${index + 1}`} key={safari.title} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay: index * 0.12 }}>
              <div
                className="safari-card__image-wrap"
                style={{ cursor: "pointer" }}
                onClick={() => onSelectSafari(safari.title)}
              >
                <img src={safari.image} alt={safari.imageAlt} />
                <span className="safari-card__number">0{index + 1}</span>
                <span className="safari-card__arrow"><ArrowRight size={19} /></span>
              </div>
              <div className="safari-card__meta"><span>{safari.region}</span><span>{safari.duration}</span></div>
              <h3>{safari.title}</h3>
              <p>{safari.description}</p>
              <button
                type="button"
                className="text-link"
                style={{ background: "transparent", borderTop: "none", borderLeft: "none", borderRight: "none", cursor: "pointer" }}
                onClick={() => onSelectSafari(safari.title)}
              >
                Inquire about journey <ArrowRight size={15} />
              </button>
            </motion.article>
          ))}
        </div>
        <div className="center-action">
          <button
            type="button"
            className="button button--outline"
            onClick={() => onSelectSafari("Custom African Itinerary")}
          >
            Request custom safari <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function DestinationSection({ onSelectDestination }: { onSelectDestination: (name: string) => void }) {
  return (
    <section className="destinations section-pad" id="destinations">
      <div className="page-shell">
        <div className="section-heading section-heading--light">
          <div><p className="eyebrow eyebrow--orange">PLACES THAT MOVE YOU</p><h2>Africa, in all<br /><em>its wonder.</em></h2></div>
          <p className="section-heading__aside">From iconic wildlife reserves to quiet corners of wilderness, discover the places that make every journey extraordinary.</p>
        </div>
        <div className="destination-grid">
          {destinations.map((destination, index) => (
            <motion.div
              className={`destination-card destination-card--${index + 1}`}
              key={destination.name}
              style={{ cursor: "pointer" }}
              onClick={() => onSelectDestination(destination.name)}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.1 }}
            >
              <img src={destination.image} alt={destination.name} />
              <span className="destination-card__count">0{index + 1}</span>
              <div><p>{destination.country}</p><h3>{destination.name}</h3><span className="destination-card__link">Discover destination <ArrowRight size={14} /></span></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <section className="experience section-pad" id="experiences">
      <div className="page-shell experience__grid">
        <div className="experience__image"><img src="/images/experience-lodge.jpg" alt="An intimate luxury safari lodge surrounded by nature" /></div>
        <motion.div className="experience__copy" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={getFadeUp(0)}>
          <p className="eyebrow eyebrow--orange">THE VESPERS DIFFERENCE</p>
          <h2>Thoughtful details.<br /><em>Unforgettable moments.</em></h2>
          <p className="body-copy">The right place to stay. The perfect time to explore. The little details that turn a holiday into a story worth telling. We bring the pieces together to create a journey that feels entirely yours.</p>
          <button
            type="button"
            className="text-link"
            style={{ background: "transparent", borderTop: "none", borderLeft: "none", borderRight: "none", cursor: "pointer" }}
            onClick={onOpenBooking}
          >
            Experience Vespers <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function CtaSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <section className="cta" id="contact">
      <div className="cta__image" />
      <div className="cta__overlay" />
      <motion.div className="cta__content page-shell" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={getFadeUp(0)}>
        <p className="eyebrow">YOUR NEXT CHAPTER BEGINS HERE</p>
        <h2>Let Africa<br /><em>find you.</em></h2>
        <p>Tell us what you dream of discovering. We'll help you make it extraordinary.</p>
        <button
          type="button"
          className="button button--orange"
          onClick={onOpenBooking}
        >
          Plan your safari <ArrowRight size={16} />
        </button>
      </motion.div>
    </section>
  );
}

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedSafari, setSelectedSafari] = useState<string>("The Mara, Uncovered");

  const handleOpenBooking = (safariTitle?: string) => {
    if (safariTitle) setSelectedSafari(safariTitle);
    setIsBookingOpen(true);
  };

  return (
    <>
      <Navbar onOpenBooking={() => handleOpenBooking()} />
      <main>
        <Hero onOpenBooking={() => handleOpenBooking("Custom African Itinerary")} />
        <Intro />
        <SafariSection onSelectSafari={(title) => handleOpenBooking(title)} />
        <DestinationSection onSelectDestination={(name) => handleOpenBooking(`${name} Safari`)} />
        <ExperienceSection onOpenBooking={() => handleOpenBooking("Bespoke Safari Experience")} />
        <CtaSection onOpenBooking={() => handleOpenBooking()} />
      </main>
      <Footer />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedSafariTitle={selectedSafari}
      />
    </>
  );
}
