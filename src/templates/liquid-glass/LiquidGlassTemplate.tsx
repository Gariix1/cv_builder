import type { ForwardedRef } from "react";
import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useI18n } from "../../i18n";
import type {
  CV,
  Certificate,
  Education,
  Experience,
  SkillGroup,
} from "../../models/cv.schema";
import {
  CertificatesSection,
  CompactHeader,
  ContactSectionList,
  EducationSection,
  ExperienceSection,
  PhotoBlock,
  ProfileHero,
  SkillsSection,
  buildContactItems,
  getVisibleCertificates,
  getVisibleEducation,
  getVisibleExperience,
  getVisibleSkills,
} from "./components";
import type { ContactItem } from "./components";

interface LiquidGlassTemplateProps {
  cv: CV;
}

type SidebarItem = ContactItem | Education | SkillGroup | Certificate;
type MainItem = Experience;

type SidebarKey = "contact" | "education" | "skills" | "certificates";
type MainKey = "experience";

interface SectionMeasurement {
  headerHeight: number;
  listGap: number;
  itemHeights: number[];
}

interface SectionDefinition<T, Key extends string> {
  key: Key;
  items: T[];
  measurement: SectionMeasurement;
}

interface SectionSlice<T, Key extends string> {
  key: Key;
  items: T[];
}

type SidebarSectionSlice = SectionSlice<SidebarItem, SidebarKey>;
type MainSectionSlice = SectionSlice<MainItem, MainKey>;

interface PaginatedPage {
  sidebar: SidebarSectionSlice[];
  main: MainSectionSlice[];
}

const getRowGap = (element: Element | null) => {
  if (!element || typeof window === "undefined") {
    return 0;
  }

  const style = window.getComputedStyle(element);
  const gap = parseFloat(style.rowGap || style.gap || "0");
  return Number.isNaN(gap) ? 0 : gap;
};

const getSectionMeasurement = (
  root: Element,
  listClass: string,
  itemClass: string,
): SectionMeasurement | null => {
  const listElement = root.querySelector(`.${listClass}`);
  if (!listElement) {
    return null;
  }

  const sectionElement = listElement.closest(".cv-section");
  const titleElement = sectionElement?.querySelector(
    ".section-title",
  ) as HTMLElement | null;
  const headerHeight =
    (titleElement?.offsetHeight ?? 0) + getRowGap(sectionElement);
  const listGap = getRowGap(listElement);
  const itemElements = Array.from(
    listElement.querySelectorAll(`.${itemClass}`),
  ) as HTMLElement[];
  const itemHeights = itemElements.map((element) => element.offsetHeight);

  return {
    headerHeight,
    listGap,
    itemHeights,
  };
};

const paginateColumn = <T, Key extends string>(
  sections: Array<SectionDefinition<T, Key>>,
  heights: { first: number; rest: number },
  sectionGap: number,
) => {
  const pages: Array<Array<SectionSlice<T, Key>>> = [];
  let current: Array<SectionSlice<T, Key>> = [];
  let pageIndex = 0;

  const getPageHeight = (index: number) =>
    index === 0 ? heights.first : heights.rest;

  let remaining = getPageHeight(pageIndex);

  const startNewPage = () => {
    if (current.length > 0) {
      pages.push(current);
    }
    current = [];
    pageIndex += 1;
    remaining = getPageHeight(pageIndex);
  };

  sections.forEach((section) => {
    if (section.items.length === 0) {
      return;
    }

    const { headerHeight, listGap, itemHeights } = section.measurement;
    let itemIndex = 0;

    while (itemIndex < section.items.length) {
      const nextItemHeight = itemHeights[itemIndex] ?? 0;
      if (remaining < headerHeight + nextItemHeight && current.length > 0) {
        startNewPage();
      }

      let space = remaining - headerHeight;
      const chunk: T[] = [];

      while (itemIndex < section.items.length) {
        const itemHeight = itemHeights[itemIndex] ?? 0;
        const gap = chunk.length > 0 ? listGap : 0;
        if (space < itemHeight + gap && chunk.length > 0) {
          break;
        }
        chunk.push(section.items[itemIndex]);
        space -= itemHeight + gap;
        itemIndex += 1;
        if (space < 0) {
          break;
        }
      }

      if (chunk.length > 0) {
        current.push({ key: section.key, items: chunk });
        remaining = space;
      }

      if (itemIndex < section.items.length) {
        startNewPage();
      } else {
        remaining -= sectionGap;
      }
    }
  });

  if (current.length > 0) {
    pages.push(current);
  }

  return pages;
};

const LiquidGlassTemplateBase = (
  { cv }: LiquidGlassTemplateProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { t } = useI18n();
  const { profile, personal, experience, skills, education, certificates } = cv;
  const [pages, setPages] = useState<PaginatedPage[]>([]);
  const measurePageRef = useRef<HTMLElement | null>(null);
  const sidebarFirstRef = useRef<HTMLDivElement | null>(null);
  const sidebarRestRef = useRef<HTMLDivElement | null>(null);
  const mainFirstRef = useRef<HTMLDivElement | null>(null);
  const mainRestRef = useRef<HTMLDivElement | null>(null);

  const contactItems = useMemo(
    () => buildContactItems(personal, t),
    [personal, t],
  );
  const visibleEducation = useMemo(
    () => getVisibleEducation(education),
    [education],
  );
  const visibleSkills = useMemo(() => getVisibleSkills(skills), [skills]);
  const visibleCertificates = useMemo(
    () => getVisibleCertificates(certificates),
    [certificates],
  );
  const visibleExperience = useMemo(
    () => getVisibleExperience(experience),
    [experience],
  );

  const fallbackPages = useMemo<PaginatedPage[]>(
    () => [
      {
        sidebar: [
          contactItems.length ? { key: "contact", items: contactItems } : null,
          visibleEducation.length
            ? { key: "education", items: visibleEducation }
            : null,
          visibleSkills.length ? { key: "skills", items: visibleSkills } : null,
          visibleCertificates.length
            ? { key: "certificates", items: visibleCertificates }
            : null,
        ].filter(Boolean) as SidebarSectionSlice[],
        main: visibleExperience.length
          ? [{ key: "experience", items: visibleExperience }]
          : [],
      },
    ],
    [
      contactItems,
      visibleEducation,
      visibleSkills,
      visibleCertificates,
      visibleExperience,
    ],
  );

  const computePages = useCallback(() => {
    const measureRoot = measurePageRef.current;
    const sidebarFirst = sidebarFirstRef.current;
    const mainFirst = mainFirstRef.current;

    if (!measureRoot || !sidebarFirst || !mainFirst) {
      return;
    }

    const sidebarFirstHeight = sidebarFirst.offsetHeight;
    const mainFirstHeight = mainFirst.offsetHeight;
    const sidebarRestHeight =
      sidebarRestRef.current?.offsetHeight ?? sidebarFirstHeight;
    const mainRestHeight =
      mainRestRef.current?.offsetHeight ?? mainFirstHeight;

    if (!sidebarFirstHeight || !mainFirstHeight) {
      return;
    }

    const sidebarGap = getRowGap(sidebarFirst);
    const mainGap = getRowGap(mainFirst);

    const contactMeasure = getSectionMeasurement(
      measureRoot,
      "cv-contact-list",
      "cv-contact-item",
    );
    const educationMeasure = getSectionMeasurement(
      measureRoot,
      "cv-education-list",
      "cv-education",
    );
    const skillsMeasure = getSectionMeasurement(
      measureRoot,
      "cv-skill-groups",
      "cv-skill-group",
    );
    const certificatesMeasure = getSectionMeasurement(
      measureRoot,
      "cv-certificate-list",
      "cv-certificate",
    );
    const experienceMeasure = getSectionMeasurement(
      measureRoot,
      "cv-experience-list",
      "cv-experience",
    );

    const sidebarSections: Array<SectionDefinition<SidebarItem, SidebarKey>> = [
      contactItems.length && contactMeasure
        ? {
            key: "contact",
            items: contactItems,
            measurement: contactMeasure,
          }
        : null,
      visibleEducation.length && educationMeasure
        ? {
            key: "education",
            items: visibleEducation,
            measurement: educationMeasure,
          }
        : null,
      visibleSkills.length && skillsMeasure
        ? {
            key: "skills",
            items: visibleSkills,
            measurement: skillsMeasure,
          }
        : null,
      visibleCertificates.length && certificatesMeasure
        ? {
            key: "certificates",
            items: visibleCertificates,
            measurement: certificatesMeasure,
          }
        : null,
    ].filter(Boolean) as Array<SectionDefinition<SidebarItem, SidebarKey>>;

    const mainSections: Array<SectionDefinition<MainItem, MainKey>> =
      visibleExperience.length && experienceMeasure
        ? [
            {
              key: "experience",
              items: visibleExperience,
              measurement: experienceMeasure,
            },
          ]
        : [];

    const sidebarPages = paginateColumn<SidebarItem, SidebarKey>(
      sidebarSections,
      { first: sidebarFirstHeight, rest: sidebarRestHeight },
      sidebarGap,
    );
    const mainPages = paginateColumn<MainItem, MainKey>(
      mainSections,
      { first: mainFirstHeight, rest: mainRestHeight },
      mainGap,
    );

    const totalPages = Math.max(sidebarPages.length, mainPages.length, 1);
    const nextPages: PaginatedPage[] = Array.from(
      { length: totalPages },
      (_, index) => ({
        sidebar: sidebarPages[index] ?? [],
        main: mainPages[index] ?? [],
      }),
    );

    setPages(nextPages);
  }, [
    contactItems,
    profile,
    visibleEducation,
    visibleSkills,
    visibleCertificates,
    visibleExperience,
  ]);

  useLayoutEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (document.fonts && "ready" in document.fonts) {
        await document.fonts.ready;
      }
      if (!cancelled) {
        computePages();
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [computePages]);

  useLayoutEffect(() => {
    const handleResize = () => computePages();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [computePages]);

  useLayoutEffect(() => {
    if (typeof ResizeObserver === "undefined") {
      return;
    }

    let frame = 0;
    const observer = new ResizeObserver(() => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      frame = window.requestAnimationFrame(() => computePages());
    });

    const elements = [
      sidebarFirstRef.current,
      sidebarRestRef.current,
      mainFirstRef.current,
      mainRestRef.current,
    ].filter(Boolean) as Element[];

    elements.forEach((element) => observer.observe(element));

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      observer.disconnect();
    };
  }, [computePages]);

  const pagesToRender = pages.length > 0 ? pages : fallbackPages;

  const renderSidebarSection = (section: SidebarSectionSlice) => {
    switch (section.key) {
      case "contact":
        return (
          <ContactSectionList
            key="contact"
            title={t("sectionContact")}
            items={section.items as ContactItem[]}
          />
        );
      case "education":
        return (
          <EducationSection
            key="education"
            education={section.items as Education[]}
          />
        );
      case "skills":
        return (
          <SkillsSection key="skills" skills={section.items as SkillGroup[]} />
        );
      case "certificates":
        return (
          <CertificatesSection
            key="certificates"
            certificates={section.items as Certificate[]}
          />
        );
      default:
        return null;
    }
  };

  const renderMainSection = (section: MainSectionSlice) => {
    switch (section.key) {
      case "experience":
        return (
          <ExperienceSection
            key="experience"
            experience={section.items as Experience[]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div ref={ref} className="cv-pages" data-template>
      {pagesToRender.map((page, index) => (
        <article
          key={`cv-page-${index}`}
          className="cv-page glass-surface"
          data-page={index + 1}
        >
          {index === 0 ? <div className="cv-glow" aria-hidden="true" /> : null}
          <div className="cv-layout">
            <aside
              className={[
                "cv-sidebar",
                index === 0 ? null : "cv-sidebar--no-photo",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {index === 0 ? <PhotoBlock profile={profile} /> : null}
              <div className="cv-sidebar__sections">
                {page.sidebar.map((section) => renderSidebarSection(section))}
              </div>
            </aside>

            <section
              className={[
                "cv-main",
                index === 0 ? null : "cv-main--compact",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {index === 0 ? (
                <ProfileHero profile={profile} />
              ) : (
                <CompactHeader profile={profile} />
              )}
              <div className="cv-main-body">
                {page.main.map((section) => renderMainSection(section))}
              </div>
            </section>
          </div>
        </article>
      ))}
      <div className="cv-pages--measure" aria-hidden="true">
        <article ref={measurePageRef} className="cv-page glass-surface">
          <div className="cv-layout">
            <aside className="cv-sidebar">
              <PhotoBlock profile={profile} />
              <div className="cv-sidebar__sections" ref={sidebarFirstRef}>
                <ContactSectionList
                  title={t("sectionContact")}
                  items={contactItems}
                />
                <EducationSection education={visibleEducation} />
                <SkillsSection skills={visibleSkills} />
                <CertificatesSection certificates={visibleCertificates} />
              </div>
            </aside>
            <section className="cv-main">
              <ProfileHero profile={profile} />
              <div className="cv-main-body" ref={mainFirstRef}>
                <ExperienceSection experience={visibleExperience} />
              </div>
            </section>
          </div>
        </article>
        <article className="cv-page glass-surface">
          <div className="cv-layout">
            <aside className="cv-sidebar cv-sidebar--no-photo">
              <div className="cv-sidebar__sections" ref={sidebarRestRef} />
            </aside>
            <section className="cv-main cv-main--compact">
              <CompactHeader profile={profile} />
              <div className="cv-main-body" ref={mainRestRef} />
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export const LiquidGlassTemplate = forwardRef<HTMLDivElement, LiquidGlassTemplateProps>(
  LiquidGlassTemplateBase,
);

LiquidGlassTemplate.displayName = "LiquidGlassTemplate";
