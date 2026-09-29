"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Camera,
  ChevronDown,
  Heart,
  Image as ImageIcon,
  Images,
  Users,
  X,
} from "lucide-react"

type GalleryItem = {
  title: string
  category: "Community" | "Education" | "Joy" | "Impact"
  image: string
  alt: string
}

const galleryItems: GalleryItem[] = [
  {
    title: "Smiles that tell a story",
    category: "Joy",
    image: "/images/hero-children.png",
    alt: "Children smiling together",
  },
  {
    title: "Learning with purpose",
    category: "Education",
    image: "/images/about-children.png",
    alt: "Children learning together",
  },
  {
    title: "Growing together",
    category: "Community",
    image: "/images/4.png",
    alt: "Children and community moment",
  },
  {
    title: "A place to belong",
    category: "Community",
    image: "/images/hero-children.png",
    alt: "Children sharing a joyful moment",
  },
  {
    title: "Every child matters",
    category: "Impact",
    image: "/images/about-children.png",
    alt: "Children benefiting from education",
  },
  {
    title: "Hope in every moment",
    category: "Joy",
    image: "/images/4.png",
    alt: "Children enjoying time together",
  },
  {
    title: "Building brighter futures",
    category: "Education",
    image: "/images/about-children.png",
    alt: "Children in a learning environment",
  },
  {
    title: "Together we can",
    category: "Impact",
    image: "/images/hero-children.png",
    alt: "Children together in community",
  },
  {
    title: "Celebrating possibility",
    category: "Joy",
    image: "/images/4.png",
    alt: "Children celebrating together",
  },
]

const filters = ["All", "Community", "Education", "Joy", "Impact"] as const
type Filter = (typeof filters)[number]

export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("All")
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)

  const visibleItems =
    filter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter)

  const selectedItem =
    selectedIndex === null ? null : visibleItems[selectedIndex]

  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null)
      if (event.key === "ArrowRight") {
        setSelectedIndex((current) =>
          current === null ? 0 : (current + 1) % visibleItems.length,
        )
      }
      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === null
            ? visibleItems.length - 1
            : (current - 1 + visibleItems.length) % visibleItems.length,
        )
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedIndex, visibleItems.length])

  const openItem = (index: number) => setSelectedIndex(index)

  const changeFilter = (nextFilter: Filter) => {
    setFilter(nextFilter)
    setSelectedIndex(null)
    setFilterOpen(false)
  }

  return (
    <main className="gallery-page">
      <section className="gallery-hero">
        <div className="gallery-hero-shape gallery-hero-shape-one" aria-hidden="true" />
        <div className="gallery-hero-shape gallery-hero-shape-two" aria-hidden="true" />
        <div className="gallery-spark gallery-spark-one" aria-hidden="true" />
        <div className="gallery-spark gallery-spark-two" aria-hidden="true" />

        <div className="container gallery-hero-inner">
          <div className="gallery-hero-copy">
            <div className="gallery-breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Gallery</span>
            </div>

            <p className="eyebrow gallery-eyebrow">
              <Camera size={15} />
              MOMENTS THAT MATTER
            </p>

            <h1>
              See the <span>hope</span> behind the work.
            </h1>

            <p className="gallery-hero-lead">
              Step into the moments, smiles and stories that make every
              contribution meaningful. This is a glimpse of children,
              community and possibility in motion.
            </p>

            <div className="gallery-hero-actions">
              <a className="button button-primary" href="#gallery-grid">
                Explore Photos <ArrowDownIcon />
              </a>
              <Link className="button gallery-outline-button" href="/contact">
                Get Involved <Users size={18} />
              </Link>
            </div>

            <div className="gallery-hero-note">
              <span className="gallery-note-icon">
                <Heart size={15} fill="currentColor" />
              </span>
              <span>Since 2019 · Every child matters</span>
            </div>
          </div>

          <div className="gallery-hero-collage" aria-label="Gallery highlights">
            <div className="collage-main">
              <Image
                src="/images/hero-children.png"
                alt="Children smiling together"
                fill
                priority
                sizes="(max-width: 900px) 90vw, 46vw"
              />
              <div className="collage-caption">
                <span>01</span>
                <strong>Hope looks like this.</strong>
              </div>
            </div>

            <div className="collage-small collage-small-top">
              <Image
                src="/images/about-children.png"
                alt="Children learning"
                fill
                sizes="180px"
              />
            </div>

            <div className="collage-small collage-small-bottom">
              <Image
                src="/images/4.png"
                alt="Children together"
                fill
                sizes="180px"
              />
            </div>

            <div className="collage-sticker">
              <Images size={19} />
              <span>Moments<br />of joy</span>
            </div>
          </div>
        </div>

        <div className="gallery-hero-bottom" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="gallery-intro">
        <div className="container gallery-intro-inner">
          <div>
            <p className="eyebrow pink-text">OUR GALLERY</p>
            <h2>
              Little moments.
              <br />
              <span>Big meaning.</span>
            </h2>
          </div>
          <p>
            Every photograph captures more than a moment. It reflects
            relationships built, opportunities created and children being
            encouraged to dream a little bigger.
          </p>
        </div>
      </section>

      <section className="gallery-collection" id="gallery-grid">
        <div className="container">
          <div className="gallery-toolbar">
            <div>
              <p className="eyebrow blue-text">PHOTO STORIES</p>
              <h2>Explore our moments</h2>
            </div>

            <div className="gallery-filter-wrap">
              <div className="gallery-filters-desktop" aria-label="Gallery filters">
                {filters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={filter === item ? "active" : ""}
                    onClick={() => changeFilter(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="gallery-filter-mobile">
                <button
                  type="button"
                  className="gallery-filter-select"
                  onClick={() => setFilterOpen((open) => !open)}
                  aria-expanded={filterOpen}
                >
                  {filter}
                  <ChevronDown size={17} />
                </button>
                {filterOpen && (
                  <div className="gallery-filter-menu">
                    {filters.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => changeFilter(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="gallery-grid-full">
            {visibleItems.map((item, index) => (
              <button
                key={`${item.title}-${index}`}
                type="button"
                className={`gallery-card gallery-card-${index % 6}`}
                onClick={() => openItem(index)}
                aria-label={`View ${item.title}`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
                />
                <span className="gallery-card-shade" />
                <span className="gallery-card-content">
                  <small>{item.category}</small>
                  <strong>{item.title}</strong>
                  <span className="gallery-view-link">
                    View photo <ArrowRight size={15} />
                  </span>
                </span>
              </button>
            ))}
          </div>

          {visibleItems.length === 0 && (
            <div className="gallery-empty">
              <ImageIcon size={28} />
              <h3>No photos in this category yet.</h3>
              <p>More moments will be added as the work grows.</p>
            </div>
          )}

          <div className="gallery-count">
            <span />
            <p>
              Showing <strong>{visibleItems.length}</strong> photo
              {visibleItems.length === 1 ? "" : "s"}
            </p>
            <span />
          </div>
        </div>
      </section>

      <section className="gallery-story-strip">
        <div className="container gallery-story-inner">
          <div className="gallery-story-icon">
            <CalendarDays size={25} />
          </div>
          <div>
            <p className="eyebrow orange-text">MORE THAN A PHOTO</p>
            <h2>Behind every image is a child, a family and a story.</h2>
          </div>
          <Link className="button button-purple" href="/updates">
            Read Our Stories <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="gallery-cta">
        <div className="gallery-cta-pattern" aria-hidden="true" />
        <div className="gallery-cta-circle gallery-cta-circle-one" aria-hidden="true" />
        <div className="gallery-cta-circle gallery-cta-circle-two" aria-hidden="true" />

        <div className="container gallery-cta-inner">
          <div className="gallery-cta-copy">
            <p className="eyebrow pink-text">BE PART OF THE STORY</p>
            <h2>
              Help us create more moments of
              <span> hope and opportunity.</span>
            </h2>
            <p>
              Your support helps us reach more children with care, education,
              protection and the confidence to imagine a brighter future.
            </p>
          </div>

          <div className="gallery-cta-actions">
            <Link className="button button-primary" href="/donate">
              <Heart size={18} fill="currentColor" />
              Donate Now
            </Link>
            <Link className="button button-purple" href="/contact">
              <Users size={18} />
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>

      {selectedItem && selectedIndex !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery viewer"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            aria-label="Close gallery"
            onClick={() => setSelectedIndex(null)}
          >
            <X size={24} />
          </button>

          <button
            type="button"
            className="gallery-lightbox-arrow gallery-lightbox-prev"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation()
              setSelectedIndex(
                (selectedIndex - 1 + visibleItems.length) % visibleItems.length,
              )
            }}
          >
            <ArrowLeft size={22} />
          </button>

          <div
            className="gallery-lightbox-frame"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="gallery-lightbox-image">
              <Image
                src={selectedItem.image}
                alt={selectedItem.alt}
                fill
                sizes="90vw"
              />
            </div>
            <div className="gallery-lightbox-caption">
              <div>
                <small>{selectedItem.category}</small>
                <strong>{selectedItem.title}</strong>
              </div>
              <span>
                {selectedIndex + 1} / {visibleItems.length}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="gallery-lightbox-arrow gallery-lightbox-next"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation()
              setSelectedIndex((selectedIndex + 1) % visibleItems.length)
            }}
          >
            <ArrowRight size={22} />
          </button>
        </div>
      )}
    </main>
  )
}

function ArrowDownIcon() {
  return <ArrowRight size={18} />
}
