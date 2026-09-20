import wangKalbiImage from "../assets/menu/menu-wang-kalbi.jpg";
import bulgogiImage from "../assets/menu/menu-bulgogi.jpg";
import samGyupSalImage from "../assets/menu/menu-sam-gyup-sal.jpg";
import soonDooBooImage from "../assets/menu/menu-soondooboo.jpg";
import bibimbapImage from "../assets/menu/menu-bibimbap.jpg";
import japChaeImage from "../assets/menu/menu-japchae.jpg";
import jjamPongImage from "../assets/menu/menu-jampong.jpg";
import chickenWingImage from "../assets/menu/menu-chickenwing.jpg";

export const dietaryLabels = {
  GF: "Gluten Free",
  V: "Vegetarian",
  VG: "Vegan",
};

/* =========================================================
   SHARED SECTIONS
========================================================= */

const createExtrasSection = (number) => ({
  id: "extras",
  number,
  title: "Extras",
  note: "Sides and additions for the table.",
  items: [
    {
      name: "Banchan Small",
      note: "Pint",
      price: "$7.38",
    },
    {
      name: "Banchan Large",
      note: "Quart",
      price: "$13.53",
    },
    {
      name: "Multigrain Rice",
      price: "$2.46",
    },
    {
      name: "White Rice",
      price: "$2.46",
    },
  ],
});

/* =========================================================
   DINNER
========================================================= */

export const dinnerSections = [
  {
    id: "salads",
    number: "01",
    title: "Salads",
    note: "Served with ginger or house sesame dressing.",
    items: [
      {
        name: "House Salad",
        description:
          "Mixed greens, tomatoes, carrots & cucumbers",
        price: "$6",
      },
      {
        name: "Avocado Salad",
        description: "House salad with avocados",
        price: "$12",
      },
      {
        name: "Asian Spring Salad",
        description:
          "Mixed greens, fuji apple, asian pear, clementine",
        price: "$14",
      },
    ],
  },

  {
    id: "soups",
    number: "02",
    title: "Soups",
    items: [
      {
        name: "Miso",
        description: "Japanese soybean soup",
        price: "$3",
      },
      {
        name: "Mandoo",
        description:
          "Choice of vegetable or chicken dumpling",
        price: "$5",
        dietary: ["V"],
      },
      {
        name: "Clam",
        description: "Dashi broth with top neck clams",
        price: "$8",
        dietary: ["GF"],
      },
      {
        name: "Seaweed",
        description:
          "Seaweed with dashi broth. Large seaweed with dashi broth includes beef or clams.",
        price: "SM. $5 / LG. $16",
        dietary: ["V", "VG"],
      },
    ],
  },

  {
    id: "appetizers",
    number: "03",
    title: "Appetizers",
    items: [
      {
        name: "Pajun",
        description:
          "Pan-fried Korean pancake. Choice of scallion, kimchi, or seafood.",
        price: "SM. $13 / LG. $18",
      },
      {
        name: "Mandoo",
        description:
          "Pan-fried beef dumplings or pan-fried vegetable dumplings",
        price: "VEG $6 / MEAT $7",
        dietary: ["V"],
      },
      {
        name: "Shumai",
        description: "Steamed shrimp dumplings",
        price: "$6",
      },
      {
        name: "Edamame",
        description: "Steamed soybean",
        price: "$6",
        dietary: ["GF", "V", "VG"],
      },
      {
        name: "Sae Woo Twigim",
        description: "Breaded fried shrimp",
        price: "5pc · $15",
      },
      {
        name: "Tukbockee",
        description:
          "Stir-fried rice cake in gochujang with fish cake and potato noodles. Add beef and make non-spicy +$3.",
        price: "$11",
        spicy: true,
      },
      {
        name: "Chicken Wings",
        description:
          "Fried chicken wings with sweet and spicy sauce",
        price: "$13",
        image: chickenWingImage,
        imageAlt:
          "Sweet and spicy chicken wings at Ssambap Korean BBQ",
      },
      {
        name: "Grilled Mackerel",
        description:
          "Grilled mackerel with radish and lemon",
        price: "$16",
        dietary: ["GF"],
      },
      {
        name: "Steamed Egg Custard",
        description:
          "Soufflé of egg with scallions",
        price: "$7",
      },
      {
        name: "So Tteok So Tteok",
        description:
          "Pork sausage and rice cake with sweet gochujang",
        price: "$10",
      },
    ],
  },

  {
    id: "korean-bbq",
    number: "04",
    title: "Authentic Korean BBQ",
    note:
      "Our freshly prepared barbecue dishes are marinated in our signature sauce and served with leaf lettuce, assorted banchan (side dishes), and a choice of white or multigrain rice. Raw dishes are brought from the kitchen to be cooked on the tabletop gas grill. To make ssam, place cooked meat in a thin layer of bean paste on a bed of lettuce and wrap it all together.",
    items: [
      {
        name: "Wang Kalbi Gui",
        korean: "왕갈비구이",
        description:
          "Short ribs marinated in soy sauce",
        price: "$50",
        image: wangKalbiImage,
        imageAlt:
          "Wang Kalbi Gui at Ssambap Korean BBQ",
      },
      {
        name: "Saeng Kalbi Gui",
        korean: "생갈비구이",
        description: "Un-marinated short ribs",
        price: "$50",
        dietary: ["GF"],
      },
      {
        name: "Bulgogi",
        korean: "불고기",
        description:
          "Thinly sliced prime rib-eye, marinated in soy sauce",
        price: "$42",
        image: bulgogiImage,
        imageAlt:
          "Bulgogi at Ssambap Korean BBQ",
      },
      {
        name: "Cha-Dol-Bagi",
        korean: "차돌박이",
        description:
          "Un-marinated beef brisket, thinly sliced",
        price: "$40",
        dietary: ["GF"],
      },
      {
        name: "Steamed Seafood",
        description:
          "Clams, mussels, shrimp, 1/2 lobster, snow crab legs, steamed in dashi, served with spicy mayo & citrus salt",
        price: "$80",
        dietary: ["GF"],
      },
      {
        name: "Hang Jeong Sal",
        korean: "항정살",
        description:
          "Premium pork jowl from Sakura Farms",
        price: "$35",
      },
      {
        name: "Sam-Gyub-Sal",
        korean: "삼겹살",
        description:
          "Thick sliced un-marinated Berkshire pork belly",
        price: "$40",
        dietary: ["GF"],
        image: samGyupSalImage,
        imageAlt:
          "Sam-Gyub-Sal pork belly at Ssambap Korean BBQ",
      },
      {
        name: "Dae Gi Kalbi",
        korean: "돼지갈비",
        description:
          "Prime pork rib marinated in soy sauce",
        price: "$38",
      },
      {
        name: "Dak Gui",
        korean: "닭구이",
        description:
          "Sliced chicken breast marinated in special house sauce",
        price: "$34",
      },
      {
        name: "Vegetable Gui",
        korean: "야채구이",
        description:
          "An assortment of fresh seasonal vegetables marinated in special house sauce",
        price: "$32",
        dietary: ["V", "VG"],
      },
    ],
  },

  {
    id: "traditional",
    number: "05",
    title: "Traditional Selections",
    note:
      "Served with assorted banchan and choice of rice. Add ramen or udon +$3. Extra rice or rice cake +$2. Extra egg +$1.",
    items: [
      {
        name: "Kalbi Tang",
        korean: "갈비탕",
        description:
          "Simmered beef short rib soup with potato noodles, vegetables and egg",
        price: "$24",
        dietary: ["GF"],
      },
      {
        name: "Tuk Bae Kee Bulgogi",
        korean: "뚝배기 불고기",
        description:
          "Marinated rib-eye in soy sauce cooked with rice cake, mushrooms, potato noodles and scallions in beef broth",
        price: "$22",
      },
      {
        name: "Daegu Maewoon Tang",
        korean: "대구 매운탕",
        description:
          "Spicy cod fish stew with clams, assorted vegetables and tofu",
        price: "$26",
        spicy: true,
        dietary: ["GF"],
      },
      {
        name: "Kimchi Jigae",
        korean: "김치찌개",
        description:
          "Spicy kimchi stew with tofu, rice cake, potato noodles and sliced pork",
        price: "$18",
        spicy: true,
      },
      {
        name: "Dwenjang Jigae",
        korean: "된장찌개",
        description:
          "Soybean paste soup with tofu and vegetables. Choice of seafood or beef.",
        price: "$18",
        dietary: ["GF", "V", "VG"],
      },
      {
        name: "Yook Gae Jang",
        korean: "육개장",
        description:
          "Spicy shredded beef stew simmered with scallions, egg, potato noodles and assorted vegetables",
        price: "$22",
        spicy: true,
        dietary: ["GF"],
      },
      {
        name: "Soon Doo Boo",
        korean: "순두부",
        description:
          "Spicy soft tofu stew with egg. Choice of seafood, beef or kimchi.",
        price: "$18",
        spicy: true,
        dietary: ["GF", "V", "VG"],
        image: soonDooBooImage,
        imageAlt:
          "Soon Doo Boo spicy soft tofu stew at Ssambap Korean BBQ",
      },
      {
        name: "Sam Gae Tang",
        korean: "삼계탕",
        description:
          "Whole young chicken soup, garlic, rice, jujubes, ginseng and egg strips",
        price: "$25",
        note: "Winter only",
      },
      {
        name: "Dduk Mandoo Gook",
        korean: "떡만두국",
        description:
          "Beef or vegetable dumplings and rice cake soup",
        price: "$17",
      },
      {
        name: "Jja Jang Myun",
        korean: "짜장면",
        description:
          "Thick noodles with black bean sauce. Contains pork.",
        price: "$19",
      },
      {
        name: "Jjam Pong",
        korean: "짬뽕",
        description:
          "Spicy seafood and vegetable noodle soup",
        price: "$24",
        spicy: true,
        dietary: ["GF"],
        image: jjamPongImage,
        imageAlt:
          "Jjam Pong seafood noodle soup at Ssambap Korean BBQ",
      },
      {
        name: "Boodae Jungol",
        korean: "부대전골",
        description:
          "Spicy casserole of pork sausage, tofu, rice cakes, ramen noodles and assorted vegetables. For two.",
        price: "$40",
        spicy: true,
        dietary: ["GF"],
      },
      {
        name: "Kimchi Fried Rice",
        description:
          "Wok-fried rice with kimchi, scrambled egg and choice of beef, pork, chicken or plain",
        price: "$20",
      },
      {
        name: "Jayook Tofu Kimchi",
        korean: "제육두부김치",
        description:
          "Spicy stir-fried pork and kimchi with steamed tofu",
        price: "$28",
        spicy: true,
      },
      {
        name: "Jap Chae",
        korean: "잡채",
        description:
          "Stir-fried potato noodles with assorted vegetables and beef",
        price: "$22",
        dietary: ["V", "VG"],
        image: japChaeImage,
        imageAlt:
          "Jap Chae glass noodles at Ssambap Korean BBQ",
      },
      {
        name: "Bibim Neng Myun",
        korean: "비빔냉면",
        description:
          "Sweet and spicy cold buckwheat noodles topped with lean brisket beef, boiled egg and pickled radish",
        price: "$19",
        spicy: true,
      },
      {
        name: "Mool Neng Myun",
        korean: "물냉면",
        description:
          "Cold buckwheat noodles served in cool beef broth topped with lean brisket, boiled egg and pickled radish",
        price: "$18",
      },
      {
        name: "Spicy Chicken",
        korean: "닭 불고기",
        description:
          "Broiled spicy chicken thigh marinated in gochujang",
        price: "$28",
        spicy: true,
      },
      {
        name: "Spicy Pork",
        korean: "돼지 불고기",
        description:
          "Broiled spicy pork marinated in gochujang",
        price: "$29",
        spicy: true,
      },
      {
        name: "Squid Bokkum",
        korean: "오징어 볶음",
        description:
          "Spicy stir-fried squid with vegetables",
        price: "$31",
        spicy: true,
      },
      {
        name: "Squid Samgyup Sal Bokkum",
        korean: "오징어 삼겹살 볶음",
        description:
          "Spicy stir-fried squid with pork belly and vegetables",
        price: "$34",
        spicy: true,
      },
      {
        name: "Donkatsu",
        description:
          "Deep-fried breaded pork cutlet with katsu sauce",
        price: "$20",
      },
      {
        name: "Chicken Katsu",
        description:
          "Deep-fried breaded chicken cutlet with katsu sauce",
        price: "$20",
      },
      {
        name: "Seafood Udon Bokkum",
        description:
          "Mixture of various seafood items stir-fried with vegetables, udon noodles and a soy sauce base",
        price: "$28",
      },
      {
        name: "Vegetable Udon Bokkum",
        description:
          "Stir-fried udon noodles with vegetables and a soy sauce base",
        price: "$22",
        dietary: ["V", "VG"],
      },
    ],
  },

  {
    id: "japanese-entrees",
    number: "06",
    title: "Japanese Entrées",
    note:
      "Japanese-inspired noodles and crispy cutlet entrées.",
    items: [
      {
        name: "Seafood Udon Bokkum",
        price: "$34.44",
        description:
          "Mixture of various seafood items stir-fried with vegetables and udon noodles.",
      },
      {
        name: "Vegetable Udon Bokkum",
        price: "$27.06",
        description:
          "Udon noodles stir-fried with vegetables in a soy sauce base.",
        dietary: ["V"],
      },
      {
        name: "Tonkatsu Entree",
        price: "$24.60",
        description:
          "Deep-fried breaded pork cutlet with katsu sauce on the side.",
      },
      {
        name: "Chicken Katsu Entree",
        price: "$24.60",
        description:
          "Deep-fried breaded chicken cutlet with katsu sauce on the side.",
      },
      {
        name: "Chicken Udon Bokkum",
        price: "$29.52",
        description:
          "Chicken stir-fried with vegetables and udon noodles with a soy sauce base.",
      },
    ],
  },

  {
    id: "bibimbap",
    number: "07",
    title: "Bibimbaps",
    note:
      "Bibim Bap or Dolsot Bibim Bap. Delightfully seasoned vegetables and fried egg. Dolsot is served in a sizzling hot stone bowl.",
    items: [
      {
        name: "Bibim Bap / Dolsot Bibim Bap",
        korean: "비빔밥 / 돌솥 비빔밥",
        description:
          "Choose one protein: bulgogi, chicken, tofu, kimchi, or seafood (+$2). Choose white or multigrain rice and gochujang or house sesame dressing.",
        price: "$22",
        image: bibimbapImage,
        imageAlt:
          "Dolsot Bibimbap at Ssambap Korean BBQ",
      },
    ],
  },

  {
    id: "ssambap",
    number: "08",
    title: "Ssambap",
    note:
      "Make your own wraps. Korean BBQ bites and rice alongside pickles, greens, ssamjang, gochujang, assorted vegetables and miso soup.",
    items: [
      {
        name: "Ssambap",
        description:
          "Choose one: Kalbi, Ssam Gyup Sal, Grilled Chicken, or Vegetarian.",
        price: "$25",
      },
    ],
  },

  {
    id: "childrens",
    number: "09",
    title: "Children's Menu",
    note:
      "Served with rice, fried mandoo and miso soup. Children 12 and under.",
    items: [
      {
        name: "Bulgogi",
        description:
          "Thinly sliced prime rib-eye marinated traditionally in soy sauce",
        price: "$15",
      },
      {
        name: "Donkatsu",
        description:
          "Deep-fried breaded pork cutlet with katsu sauce",
        price: "$15",
      },
      {
        name: "Chicken Katsu",
        description:
          "Deep-fried breaded chicken cutlet with katsu sauce",
        price: "$15",
      },
      {
        name: "Chicken Wings",
        description:
          "Fried chicken wings with sweet and spicy sauce",
        price: "$15",
      },
      {
        name: "Chicken or Veg Udon Bokkum",
        description:
          "Stir-fried udon noodles with chicken and vegetables, or vegetables only, with a soy sauce base",
        price: "$15",
      },
    ],
  },

  {
    id: "dinner-combos",
    number: "10",
    title: "Dinner Combos",
    note:
      "All combos served with four bowls of rice.",
    items: [
      {
        name: "Combo #1 — Korean Beef Set",
        description:
          "Wang Kalbi Gui, Bulgogi, Chadol Bagi. Choice of Soon Doo Boo, Kimchi Jigae, or Dwenjang Jigae. Plus one small Pajun and one Egg Custard.",
        price: "$160",
      },
      {
        name: "Combo #2 — Korean Pork Set",
        description:
          "Daegi Galbi, Sam Gyub Sal, Hang Jeong Sal. Choice of Soon Doo Boo, Kimchi Jigae, or Dwenjang Jigae. Plus one small Pajun and one Egg Custard.",
        price: "$140",
      },
      {
        name: "Combo #3 — Korean BBQ Set",
        description:
          "Any choice of 2 BBQ, except Beef Kalbi and Steamed Seafood. Choice of Spicy Chicken, Squid Bokkum, or Jayook Tofu Kimchi. Choice of Soon Doo Boo, Kimchi Jigae, or Dwenjang Jigae. Plus one large pancake and one Egg Custard.",
        price: "$150",
      },
    ],
  },

  createExtrasSection("11"),
];

/* =========================================================
   LUNCH
========================================================= */

export const lunchSections = [
  {
    id: "lunch-specials",
    number: "01",
    title: "Lunch Specials",
    note: "Tuesday–Friday · 12:00 PM–3:00 PM",
    items: [
      {
        name: "Soon Doo Boo",
        korean: "순두부",
        description:
          "Spicy soft tofu stew with egg. Choice of seafood, beef or kimchi.",
        price: "$16",
        spicy: true,
        dietary: ["GF", "V", "VG"],
        image: soonDooBooImage,
        imageAlt:
          "Soon Doo Boo spicy soft tofu stew at Ssambap Korean BBQ",
      },
      {
        name: "Yook Gae Jang",
        korean: "육개장",
        description:
          "Spicy shredded beef stew simmered with scallions, mushrooms, potato noodles and assorted vegetables",
        price: "$17",
        spicy: true,
        dietary: ["GF"],
      },
      {
        name: "Kalbi Tang",
        korean: "갈비탕",
        description:
          "Simmered beef short rib soup with potato noodles, vegetables and egg",
        price: "$19",
        dietary: ["GF"],
      },
      {
        name: "Kimchi Jigae",
        korean: "김치찌개",
        description:
          "Spicy kimchi stew with tofu, rice cake, potato noodles and sliced pork",
        price: "$16",
        spicy: true,
      },
      {
        name: "Dwenjang Jigae",
        korean: "된장찌개",
        description:
          "Soybean paste soup with tofu and vegetables. Choice of seafood or beef.",
        price: "$16",
        dietary: ["GF", "V", "VG"],
      },
      {
        name: "Dduk Mandoo Gook",
        korean: "떡만두국",
        description:
          "Beef or vegetable dumplings and rice cake soup",
        price: "$15",
        dietary: ["GF"],
      },
      {
        name: "Bibimbap / Dolsot Bibimbap",
        korean: "비빔밥 / 돌솥 비빔밥",
        description:
          "Seasoned vegetables and fried egg. Dolsot is served in a sizzling stone bowl.",
        price: "$18",
        dietary: ["GF", "V", "VG"],
        image: bibimbapImage,
        imageAlt:
          "Dolsot Bibimbap at Ssambap Korean BBQ",
      },
      {
        name: "Jjajang Myun",
        korean: "짜장면",
        description:
          "Thick noodles with black bean sauce. Contains pork.",
        price: "$16",
      },
      {
        name: "Jjam Pong",
        korean: "짬뽕",
        description:
          "Spicy seafood and vegetable noodle soup",
        price: "$19",
        spicy: true,
        dietary: ["GF"],
        image: jjamPongImage,
        imageAlt:
          "Jjam Pong seafood noodle soup at Ssambap Korean BBQ",
      },
      {
        name: "Donkatsu / Chicken Katsu",
        korean: "돈까스 / 치킨까스",
        description:
          "Deep-fried pork or chicken cutlet with katsu sauce",
        price: "$17",
      },
      {
        name: "Kimchi Fried Rice",
        korean: "김치볶음밥",
        description:
          "Wok-fried rice with kimchi",
        price: "$16",
      },
    ],
  },

  createExtrasSection("02"),
];

/* =========================================================
   LUNCH COMBOS
========================================================= */

export const lunchComboSections = [
  {
    id: "20-combo",
    number: "01",
    title: "$20 Lunch Combo",
    note:
      "Tuesday–Friday · 12:00 PM–3:00 PM. All combos served with kimchi and yellow radish.",
    items: [
      {
        name: "Ramyun Noodles",
        description:
          "Korean-style ramyun noodles with a choice of beef, pork, or seafood (+$3). Side of fried beef or vegetable dumplings and rice.",
        price: "$20",
      },
      {
        name: "Curry Katsu",
        description:
          "Deep-fried chicken thigh, Japanese-style curry, Korean slaw with citrus mayo, rice and miso soup.",
        price: "$20",
      },
      {
        name: "Kimbap",
        description:
          "Vegetables and rice rolled in seaweed. Served with a small portion of tteokbokki and soup of the day.",
        price: "$20",
      },
    ],
  },

  {
    id: "build-combo",
    number: "02",
    title: "$28 + $34 Lunch Combos",
    note:
      "Select your soup, then choose Option 1 for $28 or Option 2 for $34. Instead of soup, try our Neng Myun with Option 2 only. Dine-in only.",
    items: [
      {
        name: "Select Your Soup",
        description:
          "Soon Doo Boo, Yook Gae Jang, Kimchi Jigae, or Dwenjang.",
      },
      {
        name: "Option 1",
        description:
          "Choose Squid Bokkum, Jap Chae, Spicy Chicken, or Spicy Pork.",
        price: "$28",
      },
      {
        name: "Option 2",
        description:
          "Choose Pork BBQ, Bulgogi, Chicken BBQ, or La Kalbi.",
        price: "$34",
      },
    ],
  },
];

/* =========================================================
   DRINKS
========================================================= */

export const drinkSections = [
  {
    id: "wine",
    number: "01",
    title: "Wine",
    items: [
      {
        name: "Paumanok Festival Red",
        category: "Red Wine",
      },
      {
        name: "Paumanok Cabernet Sauvignon",
        category: "Red Wine",
      },
      {
        name: "Paumanok Cabernet Franc",
        category: "Red Wine",
      },
      {
        name: "Paumanok Merlot",
        category: "Red Wine",
      },
      {
        name: "Paumanok Festival Chardonnay",
        category: "White Wine",
      },
      {
        name: "Paumanok Semi Dry Riesling",
        category: "White Wine",
      },
      {
        name: "Paumanok Dry Riesling",
        category: "White Wine",
      },
      {
        name: "Paumanok Sauvignon Blanc",
        category: "White Wine",
      },
      {
        name: "Paumanok Vineyard Dry Rosé",
        category: "Rosé",
      },
      {
        name: "Paumanok Blanc De Blanc",
        category: "Champagne",
      },
      {
        name: "Plum Wine",
        category: "Kinsen Plum",
      },
    ],
  },

  {
    id: "sake",
    number: "02",
    title: "Sake",
    items: [
      {
        name: "Cold Unfiltered Sake",
        category: "Sho Chiku Bai",
      },
      {
        name: "Cold Ginjo Sake",
        category: "Sho Chiku Bai",
      },
      {
        name: "Cold Organic Sake",
        category: "Sho Chiku Bai",
      },
      {
        name: "Hot Sake",
        category: "Sho Chiku Bai",
      },
      {
        name: "Cold Lychee Sake",
        category: "Yuki Nigori",
      },
      {
        name: "Cold Mango Sake",
        category: "Yuki Nigori",
      },
      {
        name: "Cold White Peach Sake",
        category: "Yuki Nigori",
      },
      {
        name: "Cold Cantaloupe Sake",
        category: "Yuki Nigori",
      },
    ],
  },

  {
    id: "beer",
    number: "03",
    title: "Beer",
    items: [
      {
        name: "Sapporo",
        category: "Draft Beer",
      },
      {
        name: "Twisted Tea",
        category: "Draft Beer",
      },
      {
        name: "Mortal Bloom Hazy IPA",
        category: "Draft Beer",
      },
      {
        name: "Gridlock Hazy IPA",
        category: "Draft Beer",
      },
      {
        name: "Schofferhoffer Grapefruit",
        category: "Canned Beer",
      },
      {
        name: "Founder's All Day IPA",
        category: "Canned Beer",
      },
      {
        name: "Terra",
        category: "Bottled Korean Beer",
      },
      {
        name: "Kloud",
        category: "Bottled Korean Beer",
      },
    ],
  },

  {
    id: "soju",
    number: "04",
    title: "Soju & Korean Drinks",
    items: [
      {
        name: "Chamisul Fresh",
        category: "Soju",
        description: "Original",
      },
      {
        name: "Zero Sugar Soju",
        category: "Soju",
      },
      {
        name: "Apple",
        category: "Flavored Soju",
      },
      {
        name: "Peach",
        category: "Flavored Soju",
      },
      {
        name: "Yuzu",
        category: "Flavored Soju",
      },
      {
        name: "Grapefruit",
        category: "Flavored Soju",
      },
      {
        name: "Green Grapes",
        category: "Flavored Soju",
      },
      {
        name: "Strawberry",
        category: "Flavored Soju",
      },
      {
        name: "Plum",
        category: "Flavored Soju",
      },
      {
        name: "Apple Mango",
        category: "Flavored Soju",
      },
      {
        name: "Wild Raspberry Wine",
        category: "Bok Boon Ja",
      },
      {
        name: "So-Mak Tower",
        category: "So-Mak",
        description:
          "Sapporo beer and one bottle of Original Soju mixed together.",
      },
    ],
  },

  {
    id: "makku",
    number: "05",
    title: "Korean Rice Beer",
    note: "Unfiltered Korean rice beer.",
    items: [
      {
        name: "Original Màkku",
        category: "Canned Korean Beer",
      },
      {
        name: "Blueberry Màkku",
        category: "Canned Korean Beer",
      },
      {
        name: "Passion Fruit Màkku",
        category: "Canned Korean Beer",
      },
      {
        name: "Mango Màkku",
        category: "Canned Korean Beer",
      },
    ],
  },

  {
    id: "soft-drinks",
    number: "06",
    title: "Soft Drinks",
    items: [
      {
        name: "Coca-Cola",
        category: "Soda",
      },
      {
        name: "Coke Zero",
        category: "Soda",
      },
      {
        name: "Ginger Ale",
        category: "Soda",
      },
      {
        name: "Sprite",
        category: "Soda",
      },
      {
        name: "Dr. Pepper",
        category: "Soda",
      },
      {
        name: "Brisk Iced Tea",
        category: "Tea",
      },
      {
        name: "Orange Juice",
        category: "Juice",
      },
      {
        name: "Apple Juice",
        category: "Juice",
      },
      {
        name: "Cranberry Juice",
        category: "Juice",
      },
      {
        name: "Lemonade",
        category: "Juice",
      },
      {
        name: "Milk",
        category: "Other",
      },
      {
        name: "Green Tea",
        category: "Tea",
      },
      {
        name: "Unsweetened Iced Tea",
        category: "Tea",
      },
    ],
  },
];