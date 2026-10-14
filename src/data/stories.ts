import type { EditorialStatus, Story } from "./types";

/**
 * Stories the homepage illustrates, one photograph each.
 *
 * Every image in /public/images/stories is cropped from the edition it
 * belongs to, and every headline, subject and dek is transcribed from print,
 * so wording and designations are verified. Web usage rights for the
 * photography still need the publisher's confirmation.
 */
const fromPrint: EditorialStatus = {
  approvedForWeb: true,
  imageRightsConfirmed: false,
  titleVerified: true,
  roleVerified: true,
  note: "Image cropped from the printed edition; confirm web usage rights with the photographer or agency.",
};

export const stories: Story[] = [
  /* --- The cover panel -------------------------------------------------- */
  {
    id: "manisha-patankar-mhaiskar",
    title: "The Steady Hand of Maharashtra",
    subject: "Manisha Patankar Mhaiskar, IAS",
    category: "Leadership",
    excerpt:
      "Three decades in the service of Maharashtra — a career built on discipline, crisis management and institutional trust.",
    image: "/images/stories/manisha-patankar-mhaiskar.jpg",
    imageAlt: "Manisha Patankar Mhaiskar, IAS, in a green saree, holding a bouquet",
    issueId: "october-2026",
    featured: true,
    page: 10,
    placement: "cover",
    caption: "One posting, one crisis, one decision at a time.",
    stats: [
      { value: "34", label: "Years of service" },
      { value: "21", label: "Documented postings" },
      { value: "1992", label: "Joined the IAS" },
    ],
    status: fromPrint,
  },

  /* --- Inside the issues: two per edition, newest first ------------------ */
  {
    id: "devi-sahny",
    title: "The Banker Who Bet on Curiosity",
    subject: "Devi Sahny",
    category: "Business & Finance",
    excerpt:
      "She left Goldman Sachs at 23, moved to Singapore with little more than a conviction, and built two education companies on a radical premise: that self-belief can be taught.",
    image: "/images/stories/devi-sahny.jpg",
    imageAlt: "Portrait of Devi Sahny in a pink jacket",
    issueId: "october-2026",
    page: 46,
    placement: "feature",
    status: fromPrint,
  },
  {
    id: "ashish-shelar",
    title: "Player One",
    subject: "Ashish Shelar",
    category: "Leadership",
    excerpt:
      "From Wankhede to 600 million gamers — the minister betting on people who can't vote yet.",
    image: "/images/stories/ashish-shelar.jpg",
    imageAlt: "Portrait of Ashish Shelar in a white shirt",
    issueId: "october-2026",
    page: 26,
    placement: "feature",
    status: fromPrint,
  },
  {
    id: "jay-kotak",
    title: "The Future of Banking Is Digital",
    subject: "Jay Kotak",
    category: "Business & Finance",
    excerpt:
      "The driving force behind Kotak811, the digital banking business incubated within Kotak Mahindra Bank.",
    image: "/images/stories/jay-kotak.jpg",
    imageAlt: "Portrait of Jay Kotak in a navy sweater",
    issueId: "september-2026",
    page: 45,
    placement: "feature",
    status: fromPrint,
  },
  {
    id: "kangana-ranaut",
    title: "Saree, Boots & Point to Prove",
    subject: "Kangana Ranaut",
    category: "Culture & Public Life",
    excerpt:
      "She walked into Parliament the way she has always walked into every room — on her own terms, in her own clothes, ready to make noise.",
    image: "/images/stories/kangana-ranaut.jpg",
    imageAlt: "Portrait of Kangana Ranaut against a red backdrop",
    issueId: "september-2026",
    page: 49,
    placement: "feature",
    status: fromPrint,
  },
  {
    id: "nikhil-kamath",
    title: "Adapt or Disappear",
    subject: "Nikhil Kamath",
    category: "Business & Finance",
    excerpt:
      "He didn't follow the rules of wealth. He rewrote them, and somehow made it look like he wasn't paying attention. The real trick? He absolutely was.",
    image: "/images/stories/nikhil-kamath-2016.jpg",
    imageAlt: "Nikhil Kamath in a grey blazer, standing against a wooden wall",
    issueId: "may-2026",
    page: 40,
    placement: "feature",
    photoCredit: {
      author: "Brian452",
      source: "Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Picture_of_Nikhil_Kamath.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    status: {
      ...fromPrint,
      imageRightsConfirmed: true,
      imageCredit: "Brian452 via Wikimedia Commons, CC BY-SA 4.0 (cropped)",
      note: "Openly licensed; the credit under the photo is a licence condition — keep it.",
    },
  },
  {
    id: "sabeer-bhatia",
    title: "The Eternal Builder",
    subject: "Sabeer Bhatia",
    category: "Business & Finance",
    excerpt: "He gave the world free email at 29. He's still not done.",
    image: "/images/stories/sabeer-bhatia.jpg",
    imageAlt: "Portrait of Sabeer Bhatia smiling, against a blue backdrop",
    issueId: "may-2026",
    page: 56,
    placement: "feature",
    status: fromPrint,
  },

  /* --- Developers' Diary: one builder per edition, newest first ---------- */
  {
    id: "abhishek-lodha",
    title: "The Long View",
    subject: "Abhishek Lodha",
    category: "Developers' Diary",
    excerpt:
      "He came home from Atlanta in 2003 to a mid-sized Mumbai builder. Two decades later, he runs one of India's largest real estate companies.",
    image: "/images/stories/abhishek-lodha.jpg",
    imageAlt: "Portrait of Abhishek Lodha in a grey suit",
    issueId: "october-2026",
    page: 66,
    placement: "diary",
    status: fromPrint,
  },
  {
    id: "vikas-oberoi",
    title: "Where Luxury Meets Legacy",
    subject: "Vikas Oberoi",
    category: "Developers' Diary",
    excerpt:
      "The MD and CEO of Oberoi Realty has turned his father D.P. Oberoi's vision into one of India's most prestigious luxury real estate names.",
    image: "/images/stories/vikas-oberoi.jpg",
    imageAlt: "Vikas Oberoi seated at a polished table, hands clasped",
    issueId: "september-2026",
    page: 40,
    placement: "diary",
    status: fromPrint,
  },
  {
    id: "niranjan-hiranandani",
    title: "The Man Who Built Cities Inside a City",
    subject: "Dr. Niranjan Hiranandani",
    category: "Developers' Diary",
    excerpt:
      "He didn't just develop real estate. He redefined what urban living could feel like for millions of Indians.",
    image: "/images/stories/niranjan-hiranandani.jpg",
    imageAlt: "Dr. Niranjan Hiranandani in a cream suit on a balcony",
    issueId: "may-2026",
    page: 59,
    placement: "diary",
    status: fromPrint,
  },
];
