import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Compass,
  Glasses,
  HeartHandshake,
  MapPin,
  Menu,
  Monitor,
  Sparkles,
  Users,
  Wrench,
  X,
} from "lucide-react";

const nav = [
  ["Overview", "/"],
  ["Our stories", "/stories"],
  ["Prices", "/prices"],
  ["Contact us", "/contact"],
];
const partnerLink = "/contact?topic=partnership#contact-form";
const services = [
  {
    icon: BookOpen,
    title: "A story that belongs to your castle",
    text: "A bespoke chapter inspired by your people, places and history, developed with your team and historical expertise.",
  },
  {
    icon: Compass,
    title: "An adventure made to be shared",
    text: "Interactive challenges, meaningful roles and a route that turns a family visit into a story everyone helps to tell.",
  },
  {
    icon: Sparkles,
    title: "History, brought into view",
    text: "Production and technical implementation of the AR scenes that add a new layer to your real surroundings.",
  },
  {
    icon: Glasses,
    title: "The tools to step inside",
    text: "Magic lenses and AR glasses, with device provision and fleet operation included in the partnership.",
  },
  {
    icon: Users,
    title: "A team ready for the first chapter",
    text: "On-site setup and staff training, so your team can confidently welcome visitors into the experience.",
  },
  {
    icon: Wrench,
    title: "Support beyond opening day",
    text: "Ongoing technical support and maintenance to keep the experience ready for the next adventure.",
  },
];
const stations = [
  [
    "The castle gate",
    "Surrender or fight?",
    "Every adventure begins with a choice. Yours starts at the gate.",
  ],
  [
    "The inner courtyard",
    "Three families. One purpose.",
    "Discover the people whose stories are woven into the castle.",
  ],
  [
    "The guided tour",
    "Find the Rose of Silence.",
    "Look closely. The smallest details can hold the biggest clues.",
  ],
  [
    "The treasury",
    "Prepare the defenders.",
    "Explore the treasury and decide what the castle needs most.",
  ],
  [
    "The outer wall",
    "Look beyond the walls.",
    "An enemy builds above you. A new perspective changes everything.",
  ],
  [
    "Back at the gate",
    "A different kind of ending.",
    "Return to where it began, with peace and a story to take home.",
  ],
];

function Brand() {
  return (
    <Link className="brand" to="/#top" aria-label="StoryLens home">
      <span className="brand-symbol" aria-hidden="true">
        ✦
      </span>
      <span>
        Story<span className="brand-gold">Lens</span>
        <small>TECHNOLOGIES</small>
      </span>
    </Link>
  );
}
function Button({
  to,
  children,
  light = false,
}: {
  to: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link className={`button${light ? " light" : ""}`} to={to}>
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <span aria-hidden="true">✦</span>
      {children}
    </p>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [location]);
  return (
    <header className="header">
      <div className="header-inner">
        <Brand />
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="primary-nav"
          className={open ? "nav open" : "nav"}
          aria-label="Main navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              toggle.current?.focus();
            }
          }}
        >
          {nav.map(([label, to]) => (
            <NavLink
              end={to === "/"}
              key={to}
              to={`${to}#top`}
              className={({ isActive }) =>
                `${isActive ? "active " : ""}${to === "/contact" ? "nav-contact" : ""}`
              }
            >
              {label}
              {to === "/contact" && <ArrowUpRight size={15} />}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main container">
        <div>
          <Brand />
          <p>
            Real places. Shared adventures.
            <br />
            Stories that stay with you.
          </p>
        </div>
        <div className="footer-nav">
          <span className="footer-label">EXPLORE</span>
          {nav.map(([label, to]) => (
            <Link key={to} to={`${to}#top`}>
              {label}
            </Link>
          ))}
        </div>
        <div className="footer-partner">
          <span className="footer-label">FOR HISTORIC PLACES</span>
          <h3>
            Your castle.
            <br />
            The next chapter.
          </h3>
          <Link className="text-link" to={partnerLink}>
            Let’s tell it together <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} StoryLens</span>
        <span>Concept in development</span>
        <span>
          Made for curious minds <span aria-hidden="true">✦</span>
        </span>
      </div>
    </footer>
  );
}
function Layout({ title, children }: { title: string; children: ReactNode }) {
  const location = useLocation();
  useEffect(() => {
    document.title = `${title} — StoryLens`;
    const frame = requestAnimationFrame(() => {
      const id = location.hash.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (el) el.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(frame);
  }, [location, title]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
function Faq({ items }: { items: string[][] }) {
  return (
    <div className="faq-list">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <ChevronDown size={18} />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
function Closing({ partners = false }: { partners?: boolean }) {
  return (
    <section className="closing container">
      <span className="large-star" aria-hidden="true">
        ✦
      </span>
      <Eyebrow>
        {partners
          ? "A new chapter starts with a conversation"
          : "There is more to every castle"}
      </Eyebrow>
      <h2>
        {partners ? (
          <>
            Let’s tell your
            <br />
            <em>castle’s story.</em>
          </>
        ) : (
          <>
            A little curiosity.
            <br />
            <em>A whole new world.</em>
          </>
        )}
      </h2>
      <Button to={partners ? partnerLink : "/stories#chapter"}>
        {partners ? "Discuss your castle" : "Discover our first story"}
      </Button>
    </section>
  );
}

function Home() {
  return (
    <Layout title="History you can play">
      <section className="home-hero container" id="top">
        <div className="hero-copy">
          <Eyebrow>Real castles. Extraordinary adventures.</Eyebrow>
          <h1>
            History
            <br />
            you can <em>play.</em>
          </h1>
          <p>
            Turn a castle visit into a family adventure.
            <br className="desktop-break" /> Step into the past. Discover your
            part in the story.
          </p>
          <div className="hero-actions">
            <Button to="/stories#chapter">Explore our stories</Button>
            <Link className="text-link" to="/#how-it-works">
              How it works <ArrowDown size={16} />
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="tiny-star">✦</span> For curious kids. And the
            grown-ups who come along.
          </div>
        </div>
        <figure className="hero-image">
          <img
            src="/images/castle-family.jpg"
            alt="Concept illustration of a castle with a glowing adventure route"
            fetchPriority="high"
          />
          <div className="image-overlay">
            <span>YOUR NEXT ADVENTURE</span>
            <strong>
              Some stories are
              <br />
              waiting to be lived.
            </strong>
          </div>
          <figcaption>StoryLens concept illustration</figcaption>
          <span className="image-year" aria-hidden="true">
            1331
          </span>
        </figure>
      </section>
      <div className="promise-strip">
        <div className="container">
          <span>
            <MapPin size={16} /> Rooted in real places
          </span>
          <i>✦</i>
          <span>
            <Users size={17} /> Made to play together
          </span>
          <i>✦</i>
          <span>
            <Sparkles size={16} /> A new lens on history
          </span>
        </div>
      </div>
      <section className="section container" id="how-it-works">
        <div className="section-heading">
          <div>
            <Eyebrow>The experience</Eyebrow>
            <h2>
              A castle visit.
              <br />
              <em>With a twist.</em>
            </h2>
          </div>
          <p>
            The walls are real. The history is all around you. StoryLens adds
            the adventure that brings everyone into the picture.
          </p>
        </div>
        <div className="steps">
          {[
            [
              Glasses,
              "Pick up your lens",
              "Choose your role and see the castle through fresh eyes.",
            ],
            [
              Compass,
              "Follow the story",
              "Explore real rooms and courtyards, finding clues along the way.",
            ],
            [
              HeartHandshake,
              "Play your part",
              "Make decisions and solve challenges together. This is your family’s chapter.",
            ],
          ].map(([Icon, heading, text], i) => {
            const I = Icon as typeof Glasses;
            return (
              <article key={String(heading)}>
                <div className="step-top">
                  <I size={29} strokeWidth={1.3} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{String(heading)}</h3>
                <p>{String(text)}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="family-section">
        <div className="container family-grid">
          <figure>
            <img
              src="/images/courtyard.jpg"
              alt="Concept comparison of a quiet courtyard and an imagined medieval scene"
              loading="lazy"
            />
            <figcaption>
              One courtyard. Two perspectives. · Concept illustration
            </figcaption>
          </figure>
          <div>
            <Eyebrow>Everyone has a part to play</Eyebrow>
            <h2>
              Small explorers.
              <br />
              <em>Big imaginations.</em>
            </h2>
            <p>
              A shared adventure, with a different perspective for every
              generation.
            </p>
            <div className="role" id="magic-lens">
              <span>01</span>
              <div>
                <h3>A little magic in their hands</h3>
                <p>
                  A magic lens gives younger adventurers their own mission and a
                  reason to look closer.
                </p>
                <small>Magic lens · Designed for ages 6–12</small>
              </div>
            </div>
            <div className="role" id="ar-glasses">
              <span>02</span>
              <div>
                <h3>A new view of the past</h3>
                <p>
                  AR glasses reveal another layer of the story for teens and
                  grown-ups.
                </p>
                <small>AR glasses · Planned for ages 13+</small>
              </div>
            </div>
            <p className="fineprint">
              Device concepts and age guidance are still in development.
            </p>
          </div>
        </div>
      </section>
      <section className="section container story-teaser">
        <div>
          <Eyebrow>The first chapter</Eyebrow>
          <h2>
            The Siege
            <br />
            of Eltz, <em>1331.</em>
          </h2>
          <p>
            Six stations. One castle under threat. A family with a part to play
            in its story.
          </p>
          <Link className="text-link" to="/stories#chapter">
            Step into the chapter <ArrowUpRight size={18} />
          </Link>
          <span className="concept-label">CONCEPT CHAPTER · BURG ELTZ</span>
        </div>
        <figure>
          <img
            src="/images/eltz-route.jpg"
            alt="Imagined story route around a medieval castle"
            loading="lazy"
          />
          <figcaption>
            Concept illustration · Not a confirmed partnership
          </figcaption>
        </figure>
      </section>
      <section className="film-section container">
        <div>
          <Eyebrow>A glimpse inside</Eyebrow>
          <h2>
            Picture the
            <br />
            <em>possibilities.</em>
          </h2>
          <p>
            Our story is taking shape. A closer look at the experience is on its
            way.
          </p>
        </div>
        <div
          className="film-placeholder"
          role="img"
          aria-label="StoryLens film coming soon"
        >
          <span className="film-star">✦</span>
          <span>A NEW WAY TO VISIT THE PAST</span>
          <strong>Every place has a story.</strong>
          <span className="film-status">Film coming soon</span>
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <Eyebrow>Good to know</Eyebrow>
          <h2>
            A few things
            <br />
            <em>you might wonder.</em>
          </h2>
        </div>
        <Faq
          items={[
            [
              "Who is StoryLens for?",
              "Families with curious children, with different roles designed for younger players, teens and grown-ups.",
            ],
            [
              "Can we book an adventure yet?",
              "Not yet. StoryLens is a concept in development. Our first chapter shows the kind of experience we plan to create.",
            ],
            [
              "Do we all play the same story?",
              "Yes. The concept brings the family into one chapter, with different perspectives and challenges to solve together.",
            ],
            [
              "Can our castle become part of StoryLens?",
              "We would love to explore your story. Visit Prices to discover the partnership and included services, then get in touch through our demo contact form.",
            ],
          ]}
        />
      </section>
      <Closing />
    </Layout>
  );
}

function Stories() {
  return (
    <Layout title="Our stories">
      <section className="page-intro container" id="top">
        <Eyebrow>Our stories</Eyebrow>
        <h1>
          Old walls.
          <br />
          <em>New adventures.</em>
        </h1>
        <p>Every castle has a story. We give your family a part in it.</p>
      </section>
      <section className="chapter container" id="chapter">
        <figure className="chapter-visual">
          <img
            src="/images/eltz-route.jpg"
            alt="Concept illustration of the Eltz story with glowing route markers"
          />
          <div className="chapter-caption">
            <span>CHAPTER 01 · CONCEPT</span>
            <h2>
              The Siege of Eltz,
              <br />
              <em>1331.</em>
            </h2>
            <span>
              <MapPin size={15} /> Inspired by Burg Eltz, Germany
            </span>
          </div>
          <figcaption>Concept illustration</figcaption>
        </figure>
        <div className="chapter-intro">
          <p className="large-copy">
            A quiet Sunday.
            <br />A castle under siege.
            <br />
            <em>And you, right in the middle.</em>
          </p>
          <div>
            <p>
              Follow a trail through gates, courtyards and hidden details. Meet
              the castle’s story through choices, clues and a little
              imagination.
            </p>
            <p className="fineprint">
              This is a creative concept chapter. It does not represent a
              current partnership with Burg Eltz or an available experience.
            </p>
            <a className="text-link" href="#stations">
              Explore the six stations <ArrowDown size={17} />
            </a>
          </div>
        </div>
      </section>
      <section className="route-section section" id="stations">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>The journey</Eyebrow>
              <h2>
                Six moments.
                <br />
                <em>One shared story.</em>
              </h2>
            </div>
            <p>
              Each stop invites you to look a little closer, make a choice and
              discover what happens next.
            </p>
          </div>
          <div className="station-grid">
            {stations.map(([name, title, text], i) => (
              <article key={name}>
                <span className="station-number">0{i + 1}</span>
                <div>
                  <span className="station-place">{name}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="next-story container">
        <span aria-hidden="true">✦</span>
        <div>
          <Eyebrow>More stories to come</Eyebrow>
          <h2>
            The next chapter
            <br />
            <em>could be yours.</em>
          </h2>
          <p>
            We imagine a collection of adventures, each rooted in the history of
            a different place.
          </p>
        </div>
        <Link className="text-link" to="/prices#services">
          Explore the castle partnership <ArrowUpRight size={19} />
        </Link>
      </section>
      <Closing partners />
    </Layout>
  );
}

function Prices() {
  return (
    <Layout title="Prices & partnership">
      <section className="page-intro pricing-intro container" id="top">
        <Eyebrow>For castles & historic places</Eyebrow>
        <h1>
          We grow
          <br />
          <em>when you grow.</em>
        </h1>
        <p>
          A partnership built on shared success.
          <br />
          Bring your history to life, and share in every story played.
        </p>
        <Button to={partnerLink}>Discuss your castle</Button>
      </section>
      <section className="pricing-model container" id="partnership">
        <div className="pricing-model-copy">
          <Eyebrow>Pay for performance</Eyebrow>
          <h2>
            One experience.
            <br />
            <em>Shared rewards.</em>
          </h2>
          <p>
            Our fee is tied to the StoryLens add-on revenue your castle earns.
            You keep your regular admission revenue in full, plus your share of
            each StoryLens add-on.
          </p>
          <div className="admission-note">
            <Check size={18} />
            <span>Your regular admission revenue stays with you.</span>
          </div>
        </div>
        <div className="split-panel">
          <div className="split-heading">
            <span>THE STORYLENS ADD-ON</span>
            <span aria-hidden="true">✦</span>
          </div>
          <div className="split-numbers">
            <div>
              <strong>
                80<span>%</span>
              </strong>
              <h3>StoryLens</h3>
              <p>
                Creating and delivering
                <br />
                the experience
              </p>
            </div>
            <div>
              <strong>
                20<span>%</span>
              </strong>
              <h3>Your castle</h3>
              <p>
                Your share of every
                <br />
                StoryLens add-on
              </p>
            </div>
          </div>
          <div className="split-bar" aria-hidden="true">
            <span />
            <span />
          </div>
          <p className="split-note">
            The split applies to the StoryLens surcharge only.
          </p>
        </div>
      </section>
      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>Our services · Included in the partnership</Eyebrow>
              <h2>
                Your history.
                <br />
                <em>Our craft.</em>
              </h2>
            </div>
            <p>
              Everything your castle needs to bring history to life. From the
              first idea to the next family through your gates.
            </p>
          </div>
          <div className="services-grid">
            {services.map(({ icon: Icon, title, text }, i) => (
              <article key={title}>
                <div className="service-icon">
                  <Icon size={26} strokeWidth={1.35} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="included">
                  <Check size={13} /> Included
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container partnership-process">
        <div>
          <Eyebrow>Made together</Eyebrow>
          <h2>
            We bring the experience.
            <br />
            <em>You bring the place.</em>
          </h2>
        </div>
        <p>
          Your team knows the castle best. We work with that knowledge to shape
          a chapter that belongs to your site, your history and your visitors.
        </p>
      </section>
      <section className="faq-section container pricing-faq">
        <div>
          <Eyebrow>A clear partnership</Eyebrow>
          <h2>
            Good questions.
            <br />
            <em>Simple answers.</em>
          </h2>
        </div>
        <Faq
          items={[
            [
              "What does the 80/20 split apply to?",
              "Only the additional StoryLens surcharge. StoryLens receives 80% and your castle keeps 20%. Your regular admission revenue remains with your castle.",
            ],
            [
              "What is included in the partnership?",
              "The bespoke story, game development, AR production, device provision and operation, on-site setup and staff training, and ongoing technical support and maintenance.",
            ],
            [
              "Do you take a share of ordinary admission tickets?",
              "No. The revenue share applies to the StoryLens add-on, not your regular castle admission.",
            ],
            [
              "How do we start?",
              "Tell us about your castle and the story you would like to share. The contact form currently demonstrates the inquiry process; the partnership concept is still in development.",
            ],
          ]}
        />
      </section>
      <Closing partners />
    </Layout>
  );
}

type ContactFields = {
  name: string;
  email: string;
  castle: string;
  topic: string;
  message: string;
};
function Contact() {
  const location = useLocation();
  const partnership =
    new URLSearchParams(location.search).get("topic") === "partnership";
  const [fields, setFields] = useState<ContactFields>({
    name: "",
    email: "",
    castle: "",
    topic: partnership ? "Castle partnership" : "",
    message: partnership
      ? "I would like to learn more about the StoryLens partnership for our castle."
      : "",
  });
  const [errors, setErrors] = useState<Partial<ContactFields>>({});
  const [submitted, setSubmitted] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (partnership)
      setFields((f) => ({
        ...f,
        topic: "Castle partnership",
        message:
          f.message ||
          "I would like to learn more about the StoryLens partnership for our castle.",
      }));
  }, [partnership]);
  function update(key: keyof ContactFields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setSubmitted(false);
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    const next: Partial<ContactFields> = {};
    if (!fields.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!fields.topic) next.topic = "Please choose a topic.";
    if (!fields.message.trim())
      next.message = "Please tell us a little about your inquiry.";
    setErrors(next);
    setSubmitted(Object.keys(next).length === 0);
    if (Object.keys(next).length)
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
  }
  const props = (key: keyof ContactFields) => ({
    id: key,
    name: key,
    value: fields[key],
    "aria-invalid": !!errors[key] as boolean,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    onChange: (e: { target: { value: string } }) => update(key, e.target.value),
  });
  const error = (key: keyof ContactFields) =>
    errors[key] ? (
      <span className="field-error" id={`${key}-error`}>
        {errors[key]}
      </span>
    ) : null;
  return (
    <Layout title="Contact us">
      <section className="contact-layout container" id="top">
        <div className="contact-copy">
          <Eyebrow>Contact us</Eyebrow>
          <h1>
            Every story
            <br />
            starts with
            <br />
            <em>a hello.</em>
          </h1>
          <p>
            A castle with a story to tell?
            <br />A question about the adventure?
            <br />
            You’re in the right place.
          </p>
          <div className="contact-note">
            <HeartHandshake size={27} strokeWidth={1.3} />
            <div>
              <h3>Let’s imagine the possibilities.</h3>
              <p>
                From curious families to people caring for historic places,
                there’s a part for everyone.
              </p>
            </div>
          </div>
          <figure className="contact-brand">
            <img
              src="/images/brand-reference.png"
              alt="StoryLens Technologies logo with a castle landscape"
              loading="lazy"
            />
          </figure>
        </div>
        <div className="form-panel" id="contact-form">
          <h2>Tell us your story.</h2>
          <p className="form-intro">We’d love to know what you have in mind.</p>
          <div className="demo-notice">
            <Monitor size={18} />
            <p>
              <strong>A little preview.</strong> This is a demo form. Your
              message won’t be sent or saved.
            </p>
          </div>
          <form ref={form} noValidate onSubmit={submit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">
                  Your name <span>*</span>
                </label>
                <input
                  {...props("name")}
                  autoComplete="name"
                  required
                  placeholder="Alex Morgan"
                  maxLength={100}
                />
                {error("name")}
              </div>
              <div className="field">
                <label htmlFor="email">
                  Email address <span>*</span>
                </label>
                <input
                  {...props("email")}
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="alex@example.com"
                  maxLength={254}
                />
                {error("email")}
              </div>
            </div>
            <div className="field">
              <label htmlFor="castle">
                Castle or organisation{" "}
                <span className="optional">(optional)</span>
              </label>
              <input
                {...props("castle")}
                autoComplete="organization"
                placeholder="The place you call your own"
                maxLength={150}
              />
            </div>
            <div className="field">
              <label htmlFor="topic">
                What brings you here? <span>*</span>
              </label>
              <select {...props("topic")} required>
                <option value="">Choose a topic</option>
                <option>Castle partnership</option>
                <option>Family visit</option>
                <option>Other</option>
              </select>
              {error("topic")}
            </div>
            <div className="field">
              <label htmlFor="message">
                Your message <span>*</span>
              </label>
              <textarea
                {...props("message")}
                required
                rows={5}
                placeholder="A little about your castle, your idea or your question…"
                maxLength={5000}
              />
              {error("message")}
            </div>
            <p className="required-note">* Required fields</p>
            <button className="button submit-button" type="submit">
              Try the demo form <ArrowUpRight size={18} />
            </button>
            <div aria-live="polite" aria-atomic="true">
              {submitted && (
                <p className="form-success" role="status">
                  <Check size={20} /> Demo complete — your message has not been
                  sent.
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
function LegacyExperience() {
  const { hash } = useLocation();
  const allowed = ["#magic-lens", "#ar-glasses", "#how-it-works"];
  return (
    <Navigate
      replace
      to={`/${allowed.includes(hash) ? hash : "#how-it-works"}`}
    />
  );
}
function NotFound() {
  return (
    <Layout title="Page not found">
      <section className="page-intro container" id="top">
        <Eyebrow>A little detour</Eyebrow>
        <h1>
          This chapter
          <br />
          <em>isn’t here.</em>
        </h1>
        <p>Let’s get you back to the adventure.</p>
        <Button to="/#top">Back to overview</Button>
      </section>
    </Layout>
  );
}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stories" element={<Stories />} />
      <Route path="/prices" element={<Prices />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/experience" element={<LegacyExperience />} />
      <Route path="/partners" element={<Navigate replace to={partnerLink} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
