import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Compass,
  Glasses,
  HeartHandshake,
  MapPin,
  Menu,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const nav = [
  ["Overview", "/"],
  ["Our stories", "/stories"],
  ["Prices", "/prices"],
  ["Contact us", "/contact"],
];
const partnerLink = "/contact?topic=partnership#contact-form";
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

function Brand({ original = false }: { original?: boolean }) {
  if (original) {
    return (
      <Link className="brand original-brand" to="/#top" aria-label="StoryLens home">
        <span className="logo-window">
          <img src="/images/storylens-banner-logo.png" alt="StoryLens Technologies" />
        </span>
      </Link>
    );
  }
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
        <Brand original />
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewActive = useRef(false);
  const manualPlayback = useRef(false);
  const [fullVideo, setFullVideo] = useState(false);
  const previousMuted = useRef(false);

  const takeVideoControl = () => {
    const video = videoRef.current;
    if (!video) return;
    manualPlayback.current = true;
    previewActive.current = false;
    setFullVideo(true);
    video.currentTime = 0;
    video.muted = false;
    void video.play().catch(() => {});
  };

  const stopPreview = () => {
    const video = videoRef.current;
    if (!video || !previewActive.current) return;
    previewActive.current = false;
    video.pause();
    video.muted = previousMuted.current;
  };

  const startPreview = () => {
    const video = videoRef.current;
    if (!video || manualPlayback.current || !video.paused || previewActive.current) return;
    previousMuted.current = video.muted;
    previewActive.current = true;
    video.muted = true;
    if (video.currentTime >= 19) video.currentTime = 0;
    void video.play().catch(() => {
      if (previewActive.current) stopPreview();
    });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const headerHeight = document.querySelector(".header")?.getBoundingClientRect().height ?? 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.999) startPreview();
      else stopPreview();
    }, { threshold: [0, 0.999, 1], rootMargin: `-${headerHeight}px 0px 0px 0px` });
    observer.observe(video);
    const timer = window.setInterval(() => {
      const video = videoRef.current;
      if (video && previewActive.current && video.currentTime >= 19) {
        video.currentTime = 0;
      }
    }, 50);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
      video.pause();
      previewActive.current = false;
    };
  }, []);

  return (
    <Layout title="History you can play">
      <div className="overview-page">
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
            <Link className="text-link" to="/#how-it-works">
              How it works <ArrowDown size={16} />
            </Link>
            <Button to="/stories#chapter">Explore our stories</Button>
          </div>
          <div className="hero-footnote">
            <span className="tiny-star">✦</span> For curious kids. And the
            grown-ups who come along.
          </div>
        </div>
        <figure className="hero-image">
          <img
            src="/images/courtyard.jpg"
            alt="Concept illustration of a castle courtyard with a family adventure"
            fetchPriority="high"
          />
        </figure>
      </section>
      <section className="film-section container film-direct" id="introduction">
        <div className="concept-video" style={{ position: "relative" }}>
        <video
          ref={videoRef}
          style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }}
          controls={fullVideo}
          playsInline
          preload="metadata"
          aria-label="Introduction to the StoryLens concept"
        >
          <source src="/video/storylens-introduction.mp4" type="video/mp4" />
          Your browser cannot play this video. <a href="/video/storylens-introduction.mp4">Open the concept video</a>.
        </video>
        {!fullVideo && (
          <button
            type="button"
            onClick={takeVideoControl}
            aria-label="Play full video with sound"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, background: "transparent", cursor: "pointer", color: "white" }}
          >
            <span style={{ position: "absolute", bottom: 16, left: 16, padding: "10px 16px", borderRadius: 24, background: "rgba(0, 0, 0, 0.65)" }}>▶ Play full video</span>
          </button>
        )}
        </div>
        <div className="film-copy">
          <Eyebrow>A glimpse inside</Eyebrow>
          <h2>
            Picture the
            <br />
            <em>possibilities.</em>
          </h2>
          <p>
            Discover the StoryLens concept and how a castle visit can become a
            shared family adventure.
          </p>
        </div>
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
              "We would love to explore your story. Visit Prices to discover the partnership and included services, then get in touch through our contact form.",
            ],
          ]}
        />
      </section>
      <Closing />
      </div>
    </Layout>
  );
}

const castles = [
  { name: "Burg Eltz", location: "Wierschem · Germany", address: "Burg Eltz 1, 56294 Wierschem", image: "/images/eltz-route.jpg", age: "6+", stories: ["The Rose of Silence", "The Last Torch", "The Siege of Eltz"] },
  { name: "Burg Altdahn", location: "Dahn · Germany", address: "Burg Altdahn, 66994 Dahn", image: "/images/burg-altdahn.jpeg", age: "8+", stories: ["The Hidden Gate", "The Keeper’s Secret", "The Night Watch"] },
  { name: "Schloss Heidelberg", location: "Heidelberg · Germany", address: "Schlosshof 1, 69117 Heidelberg", image: "/images/heidelberg.jpeg", age: "10+", stories: ["The Lost Heirloom", "The Silent Courtyard", "The Crown’s Riddle"] },
];
const storyExperience: Record<string, { difficulty: "Easy" | "Medium" | "Difficult"; length: string }> = {
  "The Rose of Silence": { difficulty: "Easy", length: "1 hour" },
  "The Last Torch": { difficulty: "Medium", length: "1.5 hours" },
  "The Siege of Eltz": { difficulty: "Difficult", length: "2 hours" },
  "The Hidden Gate": { difficulty: "Easy", length: "1 hour" },
  "The Keeper’s Secret": { difficulty: "Medium", length: "1.5 hours" },
  "The Night Watch": { difficulty: "Difficult", length: "2 hours" },
  "The Lost Heirloom": { difficulty: "Easy", length: "1 hour" },
  "The Silent Courtyard": { difficulty: "Medium", length: "1.5 hours" },
  "The Crown’s Riddle": { difficulty: "Difficult", length: "2 hours" },
};
const storyCoverImages: Record<string, string> = {
  "the-siege-of-eltz": "/images/story-siege-of-eltz.png",
  "the-rose-of-silence": "/images/story-rose-of-silence.png",
  "the-last-torch": "/images/story-last-torch.png",
  "the-hidden-gate": "/images/story-hidden-gate.png",
  "the-keepers-secret": "/images/story-keepers-secret.png",
  "the-night-watch": "/images/story-night-watch.png",
  "the-lost-heirloom": "/images/story-lost-heirloom.png",
  "the-silent-courtyard": "/images/story-silent-courtyard.png",
  "the-crowns-riddle": "/images/story-crowns-riddle.png",
};
const storyGalleryImages: Record<string, string[]> = {
  "the-siege-of-eltz": [
    "/images/story-rest-moonlight.png",
    "/images/story-rest-night-watch.png",
    "/images/story-rest-grimoire.png",
  ],
  "the-rose-of-silence": [
    "/images/story-rest-moonlight.png",
    "/images/story-rest-night-watch.png",
    "/images/story-rest-grimoire.png",
  ],
  "the-last-torch": [
    "/images/story-rest-moonlight.png",
    "/images/story-rest-night-watch.png",
    "/images/story-rest-grimoire.png",
  ],
  "the-hidden-gate": [
    "/images/story-rest-moonlight.png",
    "/images/story-rest-night-watch.png",
    "/images/story-rest-grimoire.png",
  ],
  "the-keepers-secret": [
    "/images/story-rest-moonlight.png",
    "/images/story-rest-night-watch.png",
    "/images/story-rest-grimoire.png",
  ],
  "the-night-watch": [
    "/images/story-rest-moonlight.png",
    "/images/story-rest-night-watch.png",
    "/images/story-rest-grimoire.png",
  ],
  "the-lost-heirloom": [
    "/images/story-crowns-riddle-2.png",
    "/images/story-crowns-riddle-3.png",
    "/images/story-lost-heirloom-2.png",
    "/images/story-silent-courtyard-2.png",
    "/images/story-silent-courtyard-3.png",
  ],
  "the-silent-courtyard": [
    "/images/story-crowns-riddle-2.png",
    "/images/story-crowns-riddle-3.png",
    "/images/story-lost-heirloom-2.png",
    "/images/story-silent-courtyard-2.png",
    "/images/story-silent-courtyard-3.png",
  ],
  "the-crowns-riddle": [
    "/images/story-crowns-riddle-2.png",
    "/images/story-crowns-riddle-3.png",
    "/images/story-lost-heirloom-2.png",
    "/images/story-silent-courtyard-2.png",
    "/images/story-silent-courtyard-3.png",
  ],
};
const storySummaries: Record<string, { tagline: string; synopsis: string[] }> = {
  "the-siege-of-eltz": {
    tagline: "The gates are closing. Your family has one chance to change the course of the siege.",
    synopsis: [
      "Burg Eltz, 1331. Rival forces are gathering beyond the walls, supplies are running low and an urgent message must reach the right hands before nightfall.",
      "Each family member receives a different role in the castle’s defence. Together, you uncover clues, make difficult choices and decide whom to trust as the siege draws closer.",
    ],
  },
  "the-rose-of-silence": {
    tagline: "A forgotten emblem points to a promise that was never meant to be found.",
    synopsis: [
      "A carved rose appears in rooms across Burg Eltz, but no one agrees on what it means. Following its trail reveals fragments of a story the castle has kept quiet for generations.",
      "Your family must connect symbols, whispered accounts and hidden objects to discover why the Rose of Silence disappeared from the records.",
    ],
  },
  "the-last-torch": {
    tagline: "When the final beacon goes dark, the castle’s fate rests with you.",
    synopsis: [
      "A storm has extinguished the warning fires around Burg Eltz. With riders approaching through the valley, the last torch must reach the highest tower in time.",
      "This demanding adventure combines navigation, observation and shared decisions as your family searches for a safe route through the darkened castle.",
    ],
  },
  "the-hidden-gate": {
    tagline: "An unfinished map suggests that Burg Altdahn has one entrance no visitor has seen.",
    synopsis: [
      "A newly discovered map contains three missing pieces and a route that appears to pass straight through the rock beneath Burg Altdahn.",
      "Search the ruins for landmarks, decode the mapmaker’s symbols and work together to reveal where the hidden gate once stood.",
    ],
  },
  "the-keepers-secret": {
    tagline: "The keys are accounted for, yet one locked chamber has opened by itself.",
    synopsis: [
      "The castle keeper’s records contain a strange gap: one room, one key and one name have been carefully removed from the story of Burg Altdahn.",
      "By comparing clues from different parts of the ruins, your family can reconstruct the missing account and decide whether the keeper protected the castle—or betrayed it.",
    ],
  },
  "the-night-watch": {
    tagline: "Three signal fires. One unknown visitor. No room for a wrong decision.",
    synopsis: [
      "As darkness settles over Burg Altdahn, an unfamiliar signal appears in the hills. The night watch cannot tell whether it announces an ally or an attack.",
      "Take charge of the watch, interpret changing signals and coordinate your family’s choices before the visitor reaches the outer wall.",
    ],
  },
  "the-lost-heirloom": {
    tagline: "A celebration is about to begin, but the object at its heart has vanished.",
    synopsis: [
      "On the morning of an important celebration at Schloss Heidelberg, a treasured heirloom disappears from the royal apartments.",
      "Follow its path through the palace, question the evidence and combine each player’s discoveries to return it before the first guests arrive.",
    ],
  },
  "the-silent-courtyard": {
    tagline: "Every sound has disappeared from the courtyard—except one.",
    synopsis: [
      "A musician’s melody once filled Schloss Heidelberg, but an unexplained silence now follows the same route through the castle grounds.",
      "Your family traces patterns in the architecture and pieces together a coded composition to learn what the silence is trying to reveal.",
    ],
  },
  "the-crowns-riddle": {
    tagline: "A royal puzzle has remained unsolved for centuries. Tonight, the final clue returns.",
    synopsis: [
      "A sequence of symbols hidden across Schloss Heidelberg leads to a riddle connected with the court, its scholars and an unfinished royal plan.",
      "The most challenging StoryLens chapter asks your family to compare perspectives, test theories and agree on one final answer before the trail closes.",
    ],
  },
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function Stories() {
  return (
    <Layout title="Our stories">
      <section className="page-intro container" id="top">
        <Eyebrow>Our stories</Eyebrow>
        <h1>Choose your castle.<br /><em>Find your story.</em></h1>
        <p>Three places to explore. Three stories in every castle.<br />Choose a story to discover its challenge.</p>
      </section>
      <section className="castle-library section" id="stories-library">
        <div className="container">
          {castles.map((castle, castleIndex) => (
            <section className="castle-row" key={castle.name}>
              <div className="castle-feature">
                <img src={castle.image} alt={`${castle.name} concept illustration`} loading="lazy" />
                <div className="castle-info">
                  <span className="castle-number">0{castleIndex + 1}</span>
                  <h2>{castle.name}</h2>
                  <p className="castle-address"><MapPin size={14} /> {castle.address}</p>
                  <p className="castle-meta">Stories for ages {castle.age}<br />Three adventures · Easy to difficult</p>
                </div>
              </div>
              <div className="story-cards">
                {castle.stories.map((story, index) => (
                  <article className="story-card" key={story}>
                    <img src={storyCoverImages[slugify(story)] ?? castle.image} alt={`${story} at ${castle.name}`} loading="lazy" />
                    <div className="story-card-title"><span>Story {index + 1}</span><h3>{story}</h3></div>
                    <div className="story-card-hover"><span className="story-level">{storyExperience[story].difficulty}</span><h3>{story}</h3><p><span>Difficulty</span>{storyExperience[story].difficulty}<br /><span>Length</span>{storyExperience[story].length}<br /><span>Age</span>{castle.age}</p><Link className="text-link" to={`/stories/${slugify(castle.name)}/${slugify(story)}#top`}>Explore story <ArrowUpRight size={15} /></Link></div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
      <section className="next-story container"><span aria-hidden="true">✦</span><div><Eyebrow>More stories to come</Eyebrow><h2>The next chapter<br /><em>could be yours.</em></h2><p>We imagine a collection of adventures, each rooted in the history of a different place.</p></div><Link className="text-link" to="/prices#services">Explore the castle partnership <ArrowUpRight size={19} /></Link></section>
    </Layout>
  );
}

function StoryDetail() {
  const { castleSlug, storySlug } = useParams();
  const [activeSlide, setActiveSlide] = useState(0);
  const castle = castles.find((item) => slugify(item.name) === castleSlug);
  const storyIndex = castle?.stories.findIndex((story) => slugify(story) === storySlug) ?? -1;
  const story = storyIndex >= 0 ? castle?.stories[storyIndex] : undefined;
  const summary = storySlug ? storySummaries[storySlug] : undefined;
  const coverImage = storySlug ? storyCoverImages[storySlug] : undefined;
  const detailImages = storySlug ? storyGalleryImages[storySlug] ?? [] : [];
  const slideLabels = [
    "The setting",
    "A moment from the story",
    "The family adventure",
    "A hidden clue",
    "The next discovery",
    "The final chapter",
  ].slice(0, detailImages.length + 1);

  useEffect(() => setActiveSlide(0), [castleSlug, storySlug]);

  if (!castle || !story || !summary) return <NotFound />;

  const experience = storyExperience[story];
  const showSlide = (index: number) =>
    setActiveSlide((index + slideLabels.length) % slideLabels.length);

  return (
    <Layout title={`${story} · ${castle.name}`}>
      <article className="story-detail" id="top">
        <header className="story-detail-header container">
          <Link className="story-back" to="/stories#stories-library">
            <ArrowLeft size={16} /> All stories
          </Link>
          <Eyebrow>{castle.name} · Story {storyIndex + 1}</Eyebrow>
          <h1>{story}</h1>
          <p className="story-tagline">{summary.tagline}</p>
          <div className="story-detail-meta" aria-label="Story information">
            <span><small>Difficulty</small>{experience.difficulty}</span>
            <span><small>Length</small>{experience.length}</span>
            <span><small>Recommended age</small>{castle.age}</span>
          </div>
        </header>

        <section className="story-detail-body container">
          <div className="story-synopsis">
            <Eyebrow>Story synopsis</Eyebrow>
            <h2>Step into the<br /><em>adventure.</em></h2>
            {summary.synopsis.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <div className="story-gallery" aria-roledescription="carousel" aria-label={`${story} image gallery`}>
            <div className="story-gallery-viewport">
              <div className="story-gallery-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                {slideLabels.map((label, index) => (
                  <figure className={`story-gallery-slide story-gallery-slide-${index + 1}`} key={label} aria-hidden={activeSlide !== index}>
                    {(index === 0 ? coverImage : detailImages[index - 1]) ? (
                      <img src={(index === 0 ? coverImage : detailImages[index - 1])} alt={`${story} scene ${index + 1} at ${castle.name}`} />
                    ) : (
                      <div className="story-image-placeholder">
                        <Sparkles size={30} strokeWidth={1.2} />
                        <span>Image placeholder {String(index + 1).padStart(2, "0")}</span>
                        <strong>{label}</strong>
                        <small>{castle.name} · {story}</small>
                      </div>
                    )}
                  </figure>
                ))}
              </div>
            </div>
            <div className="story-gallery-controls">
              <button type="button" onClick={() => showSlide(activeSlide - 1)} aria-label="Previous image"><ArrowLeft size={18} /></button>
              <div className="story-gallery-dots" aria-label="Choose image">
                {slideLabels.map((label, index) => (
                  <button type="button" key={label} className={activeSlide === index ? "active" : ""} onClick={() => showSlide(index)} aria-label={`Show image ${index + 1}`} aria-current={activeSlide === index ? "true" : undefined} />
                ))}
              </div>
              <span>{String(activeSlide + 1).padStart(2, "0")} / {String(slideLabels.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => showSlide(activeSlide + 1)} aria-label="Next image"><ArrowRight size={18} /></button>
            </div>
          </div>
        </section>

        <section className="story-detail-cta">
          <div className="container">
            <Eyebrow>Ready for the next chapter?</Eyebrow>
            <h2>Discover more stories<br /><em>at {castle.name}.</em></h2>
            <Button to="/stories#stories-library">Explore all stories</Button>
          </div>
        </section>
      </article>
    </Layout>
  );
}

function Prices() {
  const includedServices = [
    ["Bespoke story development", "A chapter shaped around your castle, its people and its history."],
    ["Game design and interactive challenges", "Shared missions and decisions that invite families to explore together."],
    ["AR content and technical implementation", "Digital story layers produced for the real rooms, routes and surroundings."],
    ["Devices and fleet operation", "Magic lenses and AR glasses, with practical device provision included."],
    ["On-site setup and staff training", "A prepared visitor journey and a team ready to welcome the first families."],
    ["Ongoing support and maintenance", "Technical support that keeps the experience ready for every next visit."],
  ];
  return (
    <Layout title="Prices & partnership">
      <section className="pricing-offer-intro pricing-content container" id="top">
        <Eyebrow>For castles & historic places</Eyebrow>
        <h1>
          One partnership.
          <br />
          <em>Everything included.</em>
        </h1>
        <p>
          Bring your castle’s stories to life with an experience created,
          equipped and supported by StoryLens.
        </p>
      </section>
      <section className="partnership-offer pricing-content container" id="partnership">
        <div className="partnership-terms">
          <Eyebrow>Subscription + pay for performance</Eyebrow>
          <h2>
            Shared rewards.
            <br />
            <em>A clear partnership.</em>
          </h2>
          <p>
            Our partnership combines a recurring subscription with a
            performance-based share of the additional StoryLens revenue
            your castle earns.
          </p>
          <p className="partnership-split">
            <strong>No upfront costs.</strong>
          </p>
          <div className="partnership-note">
            <Check size={18} />
            <span>Your regular admission revenue stays entirely with you.</span>
          </div>
          <Button to={partnerLink}>Contact us</Button>
        </div>
        <div className="partnership-includes" id="services">
          <Eyebrow>What’s included</Eyebrow>
          <h2>From idea<br /><em>to opening day.</em></h2>
          <ul>
            {includedServices.map(([title, text]) => (
              <li key={title}>
                <Check size={16} strokeWidth={1.8} />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="partnership-journey pricing-content container">
        <div>
          <Eyebrow>How we start</Eyebrow>
          <h2>
            A simple path.
            <br />
            <em>Built together.</em>
          </h2>
        </div>
        <div className="partnership-steps">
          {[
            ["01", "Discuss your castle", "Share the place, the people and the story you would like families to discover."],
            ["02", "Shape the experience", "We turn that knowledge into a StoryLens chapter with your team."],
            ["03", "Prepare for launch", "Set up the experience and prepare your team to welcome visitors."],
          ].map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="pricing-faq pricing-content container">
        <div>
          <Eyebrow>Good to know</Eyebrow>
          <h2>
            Clear answers.
            <br />
            <em>Before we begin.</em>
          </h2>
        </div>
        <Faq
          items={[
            [
              "Are there any upfront costs?",
              "No. There are no upfront costs. Our partnership uses a recurring subscription and a performance-based share of the additional StoryLens revenue.",
            ],
            [
              "Do you take a share of ordinary admission tickets?",
              "No. The revenue share applies to the StoryLens add-on, not your regular castle admission.",
            ],
            [
              "How do we start?",
              "Tell us about your castle and the story you would like to share. We’ll review your inquiry and get back to you with the next steps.",
            ],
          ]}
        />
      </section>
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
  const [sending, setSending] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const submitTimer = useRef<number | undefined>(undefined);
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
  useEffect(
    () => () => {
      if (submitTimer.current) window.clearTimeout(submitTimer.current);
    },
    [],
  );
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
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    setSubmitted(false);
    setSending(true);
    submitTimer.current = window.setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 700);
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
            Whether you represent a castle, the media or are simply curious
            about StoryLens, we’d love to hear from you.
          </p>
          <div className="contact-note">
            <HeartHandshake size={27} strokeWidth={1.3} />
            <div>
              <h3>A thoughtful start.</h3>
              <p>
                Tell us a little about your place, idea or question. We’ll
                point you to the right next step.
              </p>
            </div>
          </div>
        </div>
        <div className="form-panel" id="contact-form">
          <h2>Tell us your story.</h2>
          <p className="form-intro">We’d love to know what you have in mind.</p>
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
                <option value="" disabled>Choose a topic</option>
                <option>Castle partnership</option>
                <option>Media &amp; press</option>
                <option>General inquiry</option>
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
            <button
              className="button submit-button"
              type="submit"
              disabled={sending}
              aria-busy={sending}
            >
              {sending ? "Sending…" : "Send inquiry"} <ArrowUpRight size={18} />
            </button>
            <div aria-live="polite" aria-atomic="true">
              {submitted && (
                <p className="form-success" role="status">
                  <Check size={20} /> Thank you — your message has been sent.
                  We’ll be in touch soon.
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
  const allowed = ["#how-it-works"];
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
      <Route path="/stories/:castleSlug/:storySlug" element={<StoryDetail />} />
      <Route path="/prices" element={<Prices />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/experience" element={<LegacyExperience />} />
      <Route path="/partners" element={<Navigate replace to={partnerLink} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
