import { Arena, GrandFiesta, IgboAmaka, Block, NF } from "./media";

export const eventsData = [
  {
    id: "igbo-amaka-festival",
    title: "Igbo Amaka Festival",
    description:
      "Celebrate the rich cultural heritage of the Igbo people with traditional music, dance, and cuisine.",
    longDescription: `
      <p>Igbo Amaka Festival is a celebration of the rich cultural heritage of the Igbo people, showcasing traditional music, dance, art, and cuisine.</p>
      <p>This immersive cultural experience includes:</p>
      <ul>
        <li>Traditional Igbo music and dance performances</li>
        <li>Cultural exhibitions and demonstrations</li>
        <li>Authentic Igbo cuisine</li>
        <li>Traditional fashion showcase</li>
        <li>Cultural workshops and storytelling</li>
      </ul>
      <p>Join us for this unique opportunity to experience the beauty and richness of Igbo culture in all its glory!</p>
    `,
    date: "2025-04-13",
    time: "2:00 PM",
    endTime: "",
    location: "Municipal Garden, Calabar",
    address: "",
    price: "#0",
    category: "Cultural",
    image: IgboAmaka,
    featured: true,
    ticketTypes: [
      {
        name: "Standard",
        price: "#0",
        description:
          "General admission with access to all performances and exhibitions",
      },
      {
        name: "VIP",
        price: "₦5,000",
        description: "Free Abacha",
      },
      {
        name: "Lounge",
        price: "₦200,000",
        description: "6 persons",
      },
      {
        name: "Table",
        price: "₦500,000",
        description: "8 persons",
      },
    ],
    features: [
      { icon: "mdi:music", text: "Traditional Music" },
      { icon: "mdi:food", text: "Igbo Cuisine" },
      { icon: "mdi:dance-ballroom", text: "Cultural Dances" },
      { icon: "mdi:palette", text: "Art Exhibitions" },
    ],
    faqs: [
      {
        question: "What should I wear to the festival?",
        answer:
          "Traditional Igbo attire is encouraged but not required. Come dressed comfortably and respectfully.",
      },
      {
        question: "Will there be activities for children?",
        answer:
          "Yes, we have storytelling sessions and craft activities suitable for children.",
      },
      {
        question: "Can I purchase traditional crafts at the event?",
        answer:
          "Yes, there will be vendors selling traditional Igbo crafts, artwork, and clothing.",
      },
      {
        question: "Is the venue accessible for people with disabilities?",
        answer:
          "Yes, the venue is wheelchair accessible and has facilities for people with disabilities.",
      },
    ],
    organizer: "Plug Events",
  },
  {
    id: "arena-experience",
    title: "Echoes Of Love",
    description:
      "Echoes of love is a concert event featuring top artists and state-of-the-art production, creating an unforgettable night of music and entertainment.",
    longDescription: `
      <p> Experience an immersive concert event featuring top artists and state-of-the-art production, creating an unforgettable night of music and entertainment.</p>
      <p>What makes this event special:</p>
      <ul>
        <li>Performances by chart-topping artists</li>
        <li>Cutting-edge sound and lighting systems</li>
        <li>Interactive digital experiences</li>
        <li>Exclusive merchandise opportunities</li>
        <li>VIP meet-and-greet options</li>
      </ul>
      <p>This is more than just a concert - it's a complete sensory experience designed to create memories that will last a lifetime!</p>
    `,
    date: "2025-02-14",
    time: "7:00 PM",
    endTime: "",
    location: "Bae Arena, Uyo",
    address: "Bae Arena, Uyo",
    price: "#0",
    category: "Concert",
    image: Arena,
    featured: true,
    ticketTypes: [
      {
        name: "Standard",
        price: "#0",
        description: "General admission standing",
      },
    ],
    features: [
      { icon: "mdi:music", text: "Live Performances" },
      { icon: "mdi:spotlight", text: "Light Show" },
      { icon: "mdi:food-fork-drink", text: "Premium Bars" },
      { icon: "mdi:shopping", text: "Merchandise" },
    ],
    faqs: [
      {
        question: "What time should I arrive?",
        answer:
          "Doors open at 6:00 PM. We recommend arriving early to avoid lines and enjoy the pre-show atmosphere.",
      },
      {
        question: "Is there an age restriction?",
        answer:
          "Yes, this event is for attendees 18 years and older. ID will be checked at entry.",
      },
      {
        question: "What items are prohibited?",
        answer:
          "Professional cameras, outside food and drinks, large bags, and weapons are not permitted.",
      },
      {
        question: "Will there be food available?",
        answer:
          "Yes, there will be various food vendors and bars throughout the venue.",
      },
    ],
    organizer: "Plug Events, DeRok, Teezers",
  },
  {
    id: "block-party-2024",
    title: "The Block Fiesta",
    description:
      "Get ready for an explosion of vibes, music, and non-stop fun",
    longDescription: `
      <p>Block Party 2024 brings the community together for a day of celebration with music, food, games, and good vibes on the streets of Lagos.</p>
      <p>Join us for:</p>
      <ul>
        <li>DJ sets and live performances from local artists</li>
        <li>Street food from the best local vendors</li>
        <li>Games and activities for all ages</li>
        <li>Community art projects</li>
        <li>Local business showcases</li>
      </ul>
      <p>This is a celebration of our community and culture - come be a part of the biggest block party of the year!</p>
    `,
    date: "2025-04-20",
    time: "2:00 PM",
    endTime: "",
    location: "Municipal Garden, Marian, Calabar",
    address: "",
    price: "₦2,000",
    category: "Community",
    image: Block,
    featured: false,
    ticketTypes: [
      {
        name: "Standard",
        price: "₦2,000",
        description: "General admission to all areas",
      },
      {
        name: "Group",
        price: "₦10,000",
        description: "Entry for 4 people at a discounted rate",
      },
    ],
    features: [
      { icon: "mdi:music", text: "DJ Sets" },
      { icon: "mdi:food", text: "Street Food" },
      { icon: "mdi:gamepad-variant", text: "Games" },
      { icon: "mdi:account-group", text: "Community" },
    ],
    faqs: [
      {
        question: "Is the event family-friendly?",
        answer:
          "Yes, this is a family-friendly event with activities for all ages.",
      },
      {
        question: "What happens if it rains?",
        answer:
          "The event will proceed rain or shine. We have covered areas in case of light rain, but may postpone for severe weather.",
      },
      {
        question: "Can I bring my own food and drinks?",
        answer:
          "We encourage supporting our local food vendors, but small personal snacks are permitted.",
      },
      {
        question: "Is there parking available?",
        answer:
          "Limited street parking is available. We recommend using ride-sharing services or public transportation.",
      },
    ],
    organizer: "MITCHY, Nero, Gadi Events, Plug Events",
  },
  {
    id: "night-of-fashion",
    title: "Nollywood Themed Party 1.0",
    description: `Get Ready for a Night of Nollywood Glam!
Enjoy live music, dancing, and a night of celebration with fellow Nollywood fans!
`,
    longDescription: `
      <p>Night of Fashion is a glamorous evening showcasing the latest designs from Nigeria's top fashion talents and emerging designers.</p>
      <p>This prestigious event features:</p>
      <ul>
        <li>Runway shows from established and emerging designers</li>
        <li>Exhibition of avant-garde fashion pieces</li>
        <li>Networking opportunities with industry professionals</li>
        <li>Exclusive after-party with fashion elites</li>
        <li>Pop-up shops with designer pieces</li>
      </ul>
      <p>Be part of the most stylish night of the year and witness the future of Nigerian fashion unfold before your eyes!</p>
    `,
    date: "2024-11-12",
    time: "7:00 PM",
    endTime: "",
    location: "Open Pavilion, University of Calabar",
    address: "University of Calabar",
    price: "₦1,500",
    category: "Nollywood",
    image: NF,
    featured: false,
    ticketTypes: [
      {
        name: "Standard",
        price: "₦1,500",
        description: "General seating",
      },
      {
        name: "Friend zone",
        price: "₦15,000",
        description:
          "Premium front row seating, swag bag, and access to after-party : Admits 12 persons",
      },
      {
        name: "VIP",
        price: "₦4,000",
        description:
          "Front row seating, meet & greet with actors, exclusive swag bag, and VIP after-party access",
      },
    ],
    features: [
      { icon: "mdi:hanger", text: "Fashion Shows" },
      { icon: "mdi:glass-cocktail", text: "Cocktail Reception" },
      { icon: "mdi:camera", text: "Photo Opportunities" },
      { icon: "mdi:shopping", text: "Designer Pop-ups" },
    ],
    faqs: [
      {
        question: "What is the dress code?",
        answer:
          "The dress code is formal/cocktail attire. We encourage fashion-forward and creative expressions.",
      },
      {
        question: "Will there be opportunities to purchase designs?",
        answer:
          "Yes, there will be pop-up shops where you can purchase pieces from the featured designers.",
      },
      {
        question: "Is there a minimum age requirement?",
        answer: "This event is for attendees 18 years and older.",
      },
      {
        question: "Will there be food and drinks available?",
        answer:
          "Yes, there will be a cocktail reception with hors d'oeuvres, and a cash bar throughout the event.",
      },
    ],
    organizer: "Events By Adnom, Specific 7 Ent, Plug Events",
  },
];
