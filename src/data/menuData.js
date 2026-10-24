
 // =========================================================
 // MENU IMAGE LOADER
 // =========================================================
 const menuImages = import.meta.glob("../assets/menu/**/*.webp", {
   eager: true,
   import: "default",
 });

 const originalImageEntries = Object.entries(menuImages).filter(
   ([path]) => !path.includes("/thumbs/")
 );

 const originalImageLookup = new Map();

 for (const [path, imageUrl] of originalImageEntries) {
   const filename = path.split("/").pop();

   if (filename && !originalImageLookup.has(filename)) {
     originalImageLookup.set(filename, imageUrl);
   }
 }

 const menuImage = (filename) => {
   const image = originalImageLookup.get(`${filename}.webp`) ?? null;

   if (!image) {
     console.warn(`[Ssambap] Missing menu image: ${filename}.webp`);
   }

   return image;
 };

 const thumbnailByOriginal = new Map();

 for (const [path, originalUrl] of originalImageEntries) {
   const filename = path.split("/").pop();
   const folder = path.slice(0, path.lastIndexOf("/"));
   const thumbnail = menuImages[`${folder}/thumbs/${filename}`];

   if (thumbnail) thumbnailByOriginal.set(originalUrl, thumbnail);
 }

 export const menuThumbnail = (originalUrl) =>
   thumbnailByOriginal.get(originalUrl) ?? originalUrl;

 export const dietaryLabels = {
   GF: "Gluten Free",
   V: "Vegetarian",
   VG: "Vegan",
 };

 const createExtrasSection = (number) => ({
   id: "extras",
   number,
   title: "Extras",
   note: "Sides and additions for the table.",
   items: [
     { name: "Banchan Small", note: "Pint", price: "$7.38" },
     { name: "Banchan Large", note: "Quart", price: "$13.53" },
     { name: "Multigrain Rice", price: "$2.46" },
     { name: "White Rice", price: "$2.46" },
   ],
 });

 // =========================================================
 // DINNER
 // =========================================================
 export const dinnerSections = [
   {
     id: "salads",
     number: "01",
     title: "Salads",
     note: "Served with ginger or house sesame dressing.",
     items: [
       {
         name: "House Salad",
         image: menuImage("salad-house-salad"),
         imageAlt: "House Salad at Ssambap Korean BBQ",
         description: "Mixed greens, tomatoes, carrots & cucumbers",
         price: "$6",
       },
       {
         name: "Avocado Salad",
         image: menuImage("salad-avocado-salad"),
         imageAlt: "Avocado Salad at Ssambap Korean BBQ",
         description: "House salad with avocados",
         price: "$12",
       },
       {
         name: "Asian Spring Salad",
         image: menuImage("salad-asian-spring-salad"),
         imageAlt: "Asian Spring Salad at Ssambap Korean BBQ",
         description: "Mixed greens, fuji apple, asian pear, clementine",
         price: "$14",
       },
     ],
   },
   {
     id: "appetizers",
     number: "02",
     title: "Appetizers",
     soupItems: [
       {
         name: "Miso",
         image: menuImage("traditional-miso"),
         imageAlt: "Miso at Ssambap Korean BBQ",
         description: "Japanese soybean",
         price: "$3",
       },
       {
         name: "Mandoo",
         image: menuImage("traditional-mandoo"),
         imageAlt: "Mandoo Soup at Ssambap Korean BBQ",
         description: "Choice of vegetable or chicken dumpling",
         price: "$5",
         dietary: ["V"],
       },
       {
         name: "Clam",
         image: menuImage("traditional-clam"),
         imageAlt: "Clam Soup at Ssambap Korean BBQ",
         description: "Dashi broth with top neck clams",
         price: "$8",
         dietary: ["GF"],
       },
       {
         name: "Seaweed",
         image: menuImage("traditional-seaweed"),
         imageAlt: "Seaweed Soup at Ssambap Korean BBQ",
         description:
           "Seaweed with dashi broth. Large seaweed with dashi broth includes beef or clams.",
         price: "SM. $5 / LG. $16",
         dietary: ["V", "VG"],
       },
     ],
     items: [
       {
         name: "Pajun",
         images: [
           { src: menuImage("appetizer-pajun-small"), label: "Small" },
           { src: menuImage("appetizer-pajun-large"), label: "Large" },
         ],
         imageAlt: "Pajun at Ssambap Korean BBQ",
         description:
           "Pan-fried Korean pancake. Choice of scallion, kimchi, or seafood.",
         price: "SM. $13 / LG. $18",
       },
       {
         name: "Mandoo",
         images: [
           { src: menuImage("appetizer-mandoo-veggie"), label: "Vegetable" },
           { src: menuImage("appetizer-mandoo-beef"), label: "Beef" },
         ],
         imageAlt: "Mandoo at Ssambap Korean BBQ",
         description:
           "Pan-fried beef dumplings or pan-fried vegetable dumplings",
         price: "VEGI $6 / MEAT $7",
         dietary: ["V"],
       },
       {
         name: "Shumai",
         image: menuImage("appetizer-shumai"),
         imageAlt: "Shumai at Ssambap Korean BBQ",
         description: "Steamed shrimp dumplings",
         price: "$6",
       },
       {
         name: "Edamame",
         image: menuImage("appetizer-edamame"),
         imageAlt: "Edamame at Ssambap Korean BBQ",
         description: "Steamed soybean",
         price: "$6",
         dietary: ["GF", "V", "VG"],
       },
       {
         name: "Sae Woo Twigim",
         image: menuImage("appetizer-sae-woo-twigim"),
         imageAlt: "Sae Woo Twigim at Ssambap Korean BBQ",
         description: "Breaded fried shrimp",
         price: "5pc · $15",
       },
       {
         name: "Tukbockee",
         images: [
           {
             src: menuImage("appetizer-tukbockee"),
             label: "Spicy",
             spicy: true,
           },
           {
             src: menuImage("appetizer-tukbockee-non-spicy"),
             label: "Non-Spicy",
             spicy: false,
           },
         ],
         imageAlt: "Tukbockee at Ssambap Korean BBQ",
         description:
           "Stir-fried rice cake in gochujang (chili sauce) with fish cake and potato noodles. Can add beef and make it non-spicy +$3.",
         price: "$11",
         spicy: true,
       },
       {
         name: "Chicken Wings",
         image: menuImage("appetizer-chicken-wings"),
         imageAlt: "Chicken Wings at Ssambap Korean BBQ",
         description: "Fried chicken wings with sweet and spicy sauce",
         price: "$13",
       },
       {
         name: "Grilled Mackerel",
         image: menuImage("appetizer-grilled-mackerel"),
         imageAlt: "Grilled Mackerel at Ssambap Korean BBQ",
         description: "Grilled mackerel with radish and lemon",
         price: "$16",
         dietary: ["GF"],
       },
       {
         name: "Steamed Egg Custard",
         image: menuImage("appetizer-steamed-egg-custard"),
         imageAlt: "Steamed Egg Custard at Ssambap Korean BBQ",
         description: "Soufflé of egg with scallions",
         price: "$7",
       },
       {
         name: "So Tteok So Tteok",
         image: menuImage("appetizer-so-tteok-so-tteok"),
         imageAlt: "So Tteok So Tteok at Ssambap Korean BBQ",
         description: "Pork sausage and rice cake with sweet gochujang",
         price: "$10",
       },
     ],
   },
   {
     id: "korean-bbq",
     number: "03",
     title: "Authentic Korean BBQ",
     note:
       "Our freshly prepared barbecued dishes are marinated in our signature sauce and served with a variety of leaf lettuce, assorted banchan (side dishes), and a choice of white or multigrain rice. Raw dishes from the kitchen are served to be cooked on a gas grill table. To make ssam, place a cooked small portion of meat with a thin layer of bean paste on a bed of lettuce and wrap it all together. Rice can be added to make Ssambap.",
     items: [
       {
         name: "Wang Kalbi Gui",
         korean: "왕갈비구이",
         image: menuImage("kitchen-wang-kalbi-gui"),
        //  tableImage: menuImage("kitchen-wang-kalbi-gui"),
         imageAlt: "Wang Kalbi Gui at Ssambap Korean BBQ",
         description: "Short ribs marinated in soy sauce",
         price: "$50",
       },
       {
         name: "Saeng Kalbi Gui",
         korean: "생갈비구이",
         image: menuImage("kitchen-saeng-kalbi-gui"),
         //tableImage: menuImage("kitchen-saeng-kalbi-gui"),
         imageAlt: "Saeng Kalbi Gui at Ssambap Korean BBQ",
         description: "Un-marinated short ribs",
         price: "$50",
         dietary: ["GF"],
       },
       {
         name: "Bulgogi",
         korean: "불고기",
         image: menuImage("kitchen-bulgogi"),
         //tableImage: menuImage("kitchen-bulgogi"),
         imageAlt: "Bulgogi at Ssambap Korean BBQ",
         description: "Thinly sliced prime rib-eye, marinated in soy sauce",
         price: "$42",
       },
       {
         name: "Cha-Dol-Bagi",
         korean: "차돌박이",
         image: menuImage("kitchen-cha-dol-bagi"),
         //tableImage: menuImage("kitchen-cha-dol-bagi"),
         imageAlt: "Cha-Dol-Bagi at Ssambap Korean BBQ",
         description: "Un-marinated beef brisket, thinly sliced",
         price: "$40",
         dietary: ["GF"],
       },
       {
         name: "Hang Jeong Sal",
         korean: "항정살",
         image: menuImage("kitchen-hang-jeong-sal"),
         //tableImage: menuImage("kitchen-hang-jeong-sal"),
         imageAlt: "Hang Jeong Sal at Ssambap Korean BBQ",
         description: "Premium pork jowl from Sakura Farms",
         price: "$35",
       },
       {
         name: "Sam-Gyub-Sal",
         korean: "삼겹살",
         image: menuImage("kitchen-sam-gyub-sal"),
         //tableImage: menuImage("kitchen-sam-gyub-sal"),
         imageAlt: "Sam-Gyub-Sal at Ssambap Korean BBQ",
         description: "Thick sliced un-marinated Berkshire pork belly",
         price: "$40",
         dietary: ["GF"],
       },
       {
         name: "Dae Gi Kalbi",
         korean: "돼지갈비",
         image: menuImage("kitchen-dae-gi-kalbi"),
         //tableImage: menuImage("kitchen-dae-gi-kalbi"),
         imageAlt: "Dae Gi Kalbi at Ssambap Korean BBQ",
         description: "Prime pork rib marinated in soy sauce",
         price: "$38",
       },
       {
         name: "Dak Gui",
         korean: "닭구이",
         image: menuImage("kitchen-dak-gui"),
         //tableImage: menuImage("kitchen-dak-gui"),
         imageAlt: "Dak Gui at Ssambap Korean BBQ",
         description: "Sliced chicken breast marinated in special house sauce",
         price: "$34",
       },
       {
         name: "Vegetable Gui",
         korean: "야채구이",
         image: menuImage("kitchen-vegetable-gui"),
         //tableImage: menuImage("kitchen-vegetable-gui"),
         imageAlt: "Vegetable Gui at Ssambap Korean BBQ",
         description:
           "An assortment of fresh seasonal vegetable favorites marinated in special house sauce",
         price: "$32",
         dietary: ["V", "VG"],
       },
     ],
   },

  {
    id: "traditional",
    number: "04",
    title: "Traditional Selections",
    note:
      "Served with assorted banchan (side dishes) and choice of rice (white or multigrain). Add ramen or udon +$3. Extra rice or rice cake +$2. Extra egg +$1.",
    items: [
      {
        name: "Kalbi Tang",
        korean: "갈비탕",
        image: menuImage("traditional-kalbi-tang"),
        description:
          "Simmered beef short rib soup with potato noodles, vegetable and egg",
        price: "$24",
        dietary: ["GF"],
      },
      {
        name: "Tuk Bae Kee Bulgogi",
        korean: "뚝배기 불고기",
        image: menuImage("traditional-tuk-bae-bulgogi"),
        description:
          "Marinated rib-eye in soy sauce cooked with rice cake, mushrooms, potato noodles and scallions in beef broth",
        price: "$22",
      },
      {
        name: "Daegu Maewoon Tang",
        korean: "대구 매운탕",
        image: menuImage("traditional-daegu-maewoon-tang"),
        description:
          "Spicy cod fish stew with clams, assorted vegetables and tofu. Contains bones.",
        price: "$26",
        spicy: true,
        dietary: ["GF"],
      },
      {
        name: "Kimchi Jigae",
        korean: "김치찌개",
        image: menuImage("traditional-kimchi-jigae"),
        description:
          "Spicy kimchi stew with tofu, rice cake, potato noodles and sliced pork",
        price: "$18",
        spicy: true,
      },
      {
        name: "Dwenjang Jigae",
        korean: "된장찌개",
        image: menuImage("traditional-dwenjang-jigae"),
        description:
          "Soybean paste soup with tofu and vegetables. Choice of seafood or beef.",
        price: "$18",
        dietary: ["GF", "V", "VG"],
      },
      {
        name: "Yook Gae Jang",
        korean: "육개장",
        image: menuImage("traditional-yook-gae-jang"),
        description:
          "Spicy shredded beef stew simmered with scallions, egg, potato noodles and assorted vegetables",
        price: "$22",
        spicy: true,
        dietary: ["GF"],
      },
      {
        name: "Soon Doo Boo",
        korean: "순두부",
        image: menuImage("traditional-soon-doo-boo"),
        description:
          "Spicy soft tofu stew with egg. Choice of seafood, beef or kimchi.",
        price: "$18",
        spicy: true,
        dietary: ["GF", "V", "VG"],
      },
      {
        name: "Sam Gae Tang",
        korean: "삼계탕",
        image: menuImage("traditional-sam-gae-tang"),
        description:
          "Whole young chicken soup, garlic, rice, jujubes, ginseng and egg strips",
        price: "$25",
        note: "Winter only",
      },
      {
        name: "Dduk Mandoo Gook",
        korean: "떡만두국",
        image: menuImage("traditional-dduk-mandoo-gook"),
        description:
          "Beef or vegetable dumplings and rice cake soup",
        price: "$17",
      },
      {
        name: "Jja Jang Myun",
        korean: "짜장면",
        image: menuImage("traditional-jja-jang-myun"),
        description:
          "Thick noodles with black bean sauce. Contains pork.",
        price: "$19",
      },
      {
        name: "Jjam Pong",
        korean: "짬뽕",
        image: menuImage("traditional-jjam-pong"),
        description: "Spicy seafood and vegetable noodle soup",
        price: "$24",
        spicy: true,
        dietary: ["GF"],
      },
      {
        name: "Boodae Jungol",
        korean: "부대전골",
        image: menuImage("traditional-boondae-jungol"),
        description:
          "Spicy casserole of pork sausage, tofu, rice cakes, ramen noodles and assorted vegetables. For two.",
        price: "$40",
        spicy: true,
        dietary: ["GF"],
      },
      {
        name: "Kimchi Fried Rice",
        image: menuImage("traditional-kimchi-fried-rice"),
        description:
          "Wok-fried rice with kimchi, scrambled egg and choice of beef, pork, chicken or plain",
        price: "$20",
      },
      {
        name: "Jayook Tofu Kimchi",
        korean: "제육두부김치",
        image: menuImage("traditional-jayook-tofu-kimchi"),
        description:
          "Spicy stir-fried pork and kimchi with steamed tofu",
        price: "$28",
        spicy: true,
      },
      {
        name: "Jap Chae",
        korean: "잡채",
        image: menuImage("traditional-jap-chae"),
        description:
          "Stir-fried potato noodles with assorted vegetables and beef",
        price: "$22",
        dietary: ["V", "VG"],
      },
      {
        name: "Bibim Neng Myun",
        korean: "비빔냉면",
        image: menuImage("traditional-bibim-neng-myun"),
        description:
          "Sweet and spicy cold buckwheat noodles topped with lean brisket beef, boiled egg and pickled radish",
        price: "$19",
        spicy: true,
      },
      {
        name: "Mool Neng Myun",
        korean: "물냉면",
        image: menuImage("traditional-mool-neng-myun"),
        description:
          "Cold buckwheat noodles served in a cool, refreshing beef broth topped with lean brisket, boiled egg and pickled radish",
        price: "$18",
      },
      {
        name: "Spicy Chicken",
        korean: "닭 불고기",
        image: menuImage("traditional-spicy-chicken"),
        description:
          "Broiled spicy chicken thigh marinated in gochujang (chili sauce)",
        price: "$28",
        spicy: true,
      },
      {
        name: "Spicy Pork",
        korean: "돼지 불고기",
        image: menuImage("traditional-spicy-pork"),
        description:
          "Broiled spicy pork marinated in gochujang (chili sauce)",
        price: "$29",
        spicy: true,
      },
      {
        name: "Squid Bokkum",
        korean: "오징어 볶음",
        image: menuImage("traditional-squid-bokkum"),
        description: "Spicy stir-fried squid with vegetables",
        price: "$31",
        spicy: true,
      },
      {
        name: "Squid Samgyup Sal Bokkum",
        korean: "오징어 삼겹살 볶음",
        image: menuImage("traditional-squid-samgyup-sal-bokkum"),
        description:
          "Spicy stir-fried squid with pork belly and vegetables",
        price: "$34",
        spicy: true,
      },
      {
        name: "Donkatsu",
        image: menuImage("traditional-donkatsu"),
        description:
          "Deep-fried breaded pork cutlet with katsu sauce",
        price: "$20",
      },
      {
        name: "Chicken Katsu",
        image: menuImage("traditional-chicken-katsu"),
        description:
          "Deep-fried breaded chicken cutlet with katsu sauce",
        price: "$20",
      },
      {
        name: "Seafood Udon Bokkum",
        image: menuImage("traditional-seafood-udon-bokkum"),
        description:
          "Mixture of various seafood items stir-fried with vegetables, udon noodles and a soy sauce base",
        price: "$28",
      },
      {
        name: "Vegetable Udon Bokkum",
        image: menuImage("traditional-vegetable-udon-bokkum"),
        description:
          "Stir-fried udon noodles with vegetables in a soy sauce base. Add chicken +$2.",
        price: "$22",
        dietary: ["V", "VG"],
      },
    ],
  },
  {
    id: "bibimbaps",
    number: "05",
    title: "Bibimbaps",
    note:
      "Delightfully seasoned vegetables and fried egg. Dolsot is served in a sizzling hot stone bowl.",
    items: [
      {
        name: "Bibim Bap",
        korean: "비빔밥",
        image: menuImage("bibimbap-bibimbap"),
        description:
          "Choose one protein: bulgogi (beef), chicken, tofu, kimchi, or seafood (+$2). Choose white or multigrain rice and gochujang (chili sauce) or house sesame dressing. Extra toppings: mixed greens +$1, avocado +$2, additional fried egg +$1 (white or whole).",
        price: "$22",
      },
      {
        name: "Dolsot Bibim Bap",
        korean: "돌솥 비빔밥",
        image: menuImage("bibimbap-dolsot-bibimbap"),
        description:
          "Seasoned vegetables and fried egg served in a sizzling hot stone bowl. Choose one protein: bulgogi (beef), chicken, tofu, kimchi, or seafood (+$2). Choose white or multigrain rice and gochujang or house sesame dressing.",
        price: "$22",
      },
    ],
  },
  {
    id: "ssambap",
    number: "06",
    title: "Ssambap",
    note:
      "Make your own wraps. Korean BBQ bites and rice alongside pickles, greens, ssamjang (soy bean paste sauce), gochujang, assorted vegetables and miso soup.",
    items: [
      {
        name: "Ssambap",
        image: menuImage("ssambap-ssambap"),
        description:
          "Choose one: Kalbi, Ssam Gyup Sal, Grilled Chicken, or Vegetarian.",
        price: "$25",
      },
    ],
  },
  {
    id: "children",
    number: "07",
    title: "Children's Menu",
    note:
      "Served with rice, fried mandoo (vegetable or beef) and miso soup. Children 12 and under.",
    items: [
      {
        name: "Bulgogi",
        image: menuImage("kid-bulgogi"),
        description:
          "Thinly sliced prime rib-eye marinated traditionally in soy sauce",
        price: "$15",
      },
      {
        name: "Donkatsu",
        image: menuImage("kid-donkatsu"),
        description:
          "Deep-fried breaded pork cutlet with katsu sauce",
        price: "$15",
      },
      {
        name: "Chicken Katsu",
        image: menuImage("kid-chicken-katsu"),
        description:
          "Deep-fried breaded chicken cutlet with katsu sauce",
        price: "$15",
      },
      {
        name: "Chicken Wings",
        image: menuImage("kid-chicken-wings"),
        description:
          "Fried chicken wings with sweet and spicy sauce",
        price: "$15",
      },
      {
        name: "Chicken or Veg Udon Bokkum",
        image: menuImage("kid-chicken-or-veg-udon-bokkum"),
        description:
          "Stir-fried udon noodles with chicken and vegetables, or just vegetables, with a soy sauce base",
        price: "$15",
      },
    ],
  },
  createExtrasSection("08"),
];

// =========================================================
// END OF DINNER SECTIONS
// =========================================================

 // =========================================================
 // DINNER COMBOS
 // =========================================================

 const comboSoupChoices = [
   {
     name: "Soon Doo Boo",
     image: menuImage("traditional-soon-doo-boo"),
   },
   {
     name: "Kimchi Jigae",
     image: menuImage("traditional-kimchi-jigae"),
   },
   {
     name: "Dwenjang Jigae",
     image: menuImage("traditional-dwenjang-jigae"),
   },
 ];

 const comboPajunChoices = [
   {
     name: "Scallion",
     image: menuImage("appetizer-pajun-small"),
   },
   {
     name: "Kimchi",
     image: menuImage("appetizer-pajun-small"),
   },
   {
     name: "Seafood",
     image: menuImage("appetizer-pajun-small"),
   },
 ];

 const comboEggCustard = {
   name: "Egg Custard",
   image: menuImage("appetizer-steamed-egg-custard"),
 };

 export const dinnerComboSections = [
   {
     id: "dinner-combos",
     number: "01",
     title: "Dinner Combos",
     note: "All combos served with four bowls of rice.",
     items: [
       {
         name: "Combo #1 — Korean Beef Set",
         price: "$160",
         comboNumber: "01",
         comboColor: "red",
         comboTitle: "Korean Beef Set",
         comboGroups: [
           {
             title: "Korean Beef Set",
             subtitle: "Included",
             items: [
               {
                 name: "Wang Kalbi Gui",
                 image: menuImage("kitchen-wang-kalbi-gui"),
               },
               {
                 name: "Bulgogi",
                 image: menuImage("kitchen-bulgogi"),
               },
               {
                 name: "Chadol Bagi",
                 image: menuImage("kitchen-cha-dol-bagi"),
               },
             ],
           },
           {
             title: "Choice of 1 Soup",
             subtitle: "Choose 1",
             items: comboSoupChoices,
           },
           {
             title: "Plus",
             subtitle: "Included",
             items: [
               {
                 name: "1 Small Pajun",
                 image: menuImage("appetizer-pajun-small"),
                 options: comboPajunChoices,
               },
               comboEggCustard,
               { name: "4 Bowls of Rice" },
             ],
           },
         ],
       },
       {
         name: "Combo #2 — Korean Pork Set",
         price: "$140",
         comboNumber: "02",
         comboColor: "yellow",
         comboTitle: "Korean Pork Set",
         comboGroups: [
           {
             title: "Korean Pork Set",
             subtitle: "Included",
             items: [
               {
                 name: "Dae Gi Kalbi",
                 image: menuImage("kitchen-dae-gi-kalbi"),
               },
               {
                 name: "Sam Gyub Sal",
                 image: menuImage("kitchen-sam-gyub-sal"),
               },
               {
                 name: "Hang Jeong Sal",
                 image: menuImage("kitchen-hang-jeong-sal"),
               },
             ],
           },
           {
             title: "Choice of 1 Soup",
             subtitle: "Choose 1",
             items: comboSoupChoices,
           },
           {
             title: "Plus",
             subtitle: "Included",
             items: [
               {
                 name: "1 Small Pajun",
                 image: menuImage("appetizer-pajun-small"),
                 options: comboPajunChoices,
               },
               comboEggCustard,
               { name: "4 Bowls of Rice" },
             ],
           },
         ],
       },
       {
         name: "Combo #3 — Korean BBQ Set",
         price: "$150",
         comboNumber: "03",
         comboColor: "blue",
         comboTitle: "Korean BBQ Set",
         comboGroups: [
           {
             title: "Choice of 2 BBQ",
             subtitle: "Choose 2",
             note: "Except Beef Kalbi and Steamed Seafood",
             items: [
               {
                 name: "Bulgogi",
                 image: menuImage("kitchen-bulgogi"),
               },
               {
                 name: "Chadol Bagi",
                 image: menuImage("kitchen-cha-dol-bagi"),
               },
               {
                 name: "Sam Gyub Sal",
                 image: menuImage("kitchen-sam-gyub-sal"),
               },
               {
                 name: "Dae Gi Kalbi",
                 image: menuImage("kitchen-dae-gi-kalbi"),
               },
               {
                 name: "Hang Jeong Sal",
                 image: menuImage("kitchen-hang-jeong-sal"),
               },
               {
                 name: "Dak Gui",
                 image: menuImage("kitchen-bbq-dak-gui"),
               },
               {
                 name: "Vegetable Gui",
                 image: menuImage("kitchen-vegetable-gui"),
               },
             ],
           },
           {
             title: "Choice of 1 Spicy",
             subtitle: "Choose 1",
             items: [
               {
                 name: "Spicy Chicken",
                 image: menuImage("traditional-spicy-chicken"),
               },
               {
                 name: "Squid Bokkum",
                 image: menuImage("traditional-squid-bokkum"),
               },
               {
                 name: "Jayook Tofu Kimchi",
                 image: menuImage("traditional-jayook-tofu-kimchi"),
               },
             ],
           },
           {
             title: "Choice of 1 Soup",
             subtitle: "Choose 1",
             items: comboSoupChoices,
           },
           {
             title: "Plus",
             subtitle: "Included",
             items: [
               {
                 name: "1 Large Pancake",
                 image: menuImage("appetizer-pajun-large"),
                 options: comboPajunChoices,
               },
               comboEggCustard,
               { name: "4 Bowls of Rice" },
             ],
           },
         ],
       },
     ],
   },
 ];

 // =========================================================
 // LUNCH COMBOS
 // =========================================================

 export const lunchComboSections = [
   {
     id: "lunch-combo-20",
     number: "01",
     title: "$20 Lunch Combo",
     note:
       "Tuesday–Friday · 12:00 PM–3:00 PM. All combos served with kimchi and yellow radish.",
     items: [
       {
         name: "Ramyun Noodles",
         image: menuImage("lunch-combo-ramyun-noodles"),
         description:
           "Korean-style ramyun noodles with a choice of beef, pork, or seafood (+$3). Side of fried beef or vegetable dumplings and rice.",
         price: "$20",
       },
       {
         name: "Curry Katsu",
         image: menuImage("lunch-combo-curry-katsu"),
         description:
           "Deep-fried chicken thigh, Japanese-style curry, Korean slaw with citrus mayo, rice and miso soup.",
         price: "$20",
       },
       {
         name: "Kimbap",
         image: menuImage("lunch-combo-kimbap"),
         description:
           "Vegetables and rice rolled in seaweed. Served with a small portion of tteokbokki and soup of the day.",
         price: "$20",
       },
     ],
   },
   {
     id: "lunch-combo-28-34",
     number: "02",
     title: "$28 + $34 Lunch Combos",
     note:
       "Select your soup, then choose Option 1 for $28 or Option 2 for $34. Instead of soup, try our Neng Myun with Option 2 only. Dine-in only.",
     items: [
       {
         name: "Select Your Soup",
         description:
           "Choose one: Soon Doo Boo, Yook Gae Jang, Kimchi Jigae, or Dwenjang.",
         choices: [
           {
             name: "Soon Doo Boo",
             image: menuImage("traditional-soon-doo-boo"),
           },
           {
             name: "Yook Gae Jang",
             image: menuImage("traditional-yook-gae-jang"),
           },
           {
             name: "Kimchi Jigae",
             image: menuImage("traditional-kimchi-jigae"),
           },
           {
             name: "Dwenjang Jigae",
             image: menuImage("traditional-dwenjang-jigae"),
           },
         ],
       },
       {
         name: "Option 1",
         description:
           "Choose Squid Bokkum, Jap Chae, Spicy Chicken, or Spicy Pork.",
         price: "$28",
         choices: [
           {
             name: "Squid Bokkum",
             image: menuImage("traditional-squid-bokkum"),
           },
           {
             name: "Jap Chae",
             image: menuImage("traditional-jap-chae"),
           },
           {
             name: "Spicy Chicken",
             image: menuImage("traditional-spicy-chicken"),
           },
           {
             name: "Spicy Pork",
             image: menuImage("traditional-spicy-pork"),
           },
         ],
       },
       {
         name: "Option 2",
         description:
           "Choose Pork BBQ, Bulgogi, Chicken BBQ, or La Kalbi.",
         price: "$34",
         choices: [
           {
             name: "Pork BBQ",
             image: menuImage("kitchen-dae-gi-kalbi"),
           },
           {
             name: "Bulgogi",
             image: menuImage("kitchen-bulgogi"),
           },
           {
             name: "Chicken BBQ",
             image: menuImage("kitchen-dak-gui"),
           },
           {
             name: "La Kalbi",
             image: menuImage("kitchen-wang-kalbi-gui"),
           },
         ],
       },
       {
         name: "Neng Myun Alternative",
         description:
           "Instead of soup, choose Bibim Neng Myun or Mool Neng Myun. Available with Option 2 only.",
         choices: [
           {
             name: "Bibim Neng Myun",
             image: menuImage("traditional-bibim-neng-myun"),
           },
           {
             name: "Mool Neng Myun",
             image: menuImage("traditional-mool-neng-myun"),
           },
         ],
       },
     ],
   },
 ];

 // =========================================================
 // END OF DINNER AND LUNCH COMBOS
 // =========================================================

 // =========================================================
 // DRINKS
 // =========================================================

 export const drinkSections = [
   {
     id: "wine",
     number: "01",
     title: "Wine",
     items: [
       {
         name: "Paumanok Festival Red",
         category: "Red Wine",
         image: menuImage("drinks-paumanok-festival-red"),
         price: "Glass $9 / Bottle $32",
       },
       {
         name: "Paumanok Cabernet Sauvignon",
         category: "Red Wine",
         image: menuImage("drinks-paumanok-cabernet-sauvignon"),
         price: "Glass $11 / Bottle $40",
       },
       {
         name: "Paumanok Cabernet Franc",
         category: "Red Wine",
         image: menuImage("drinks-paumanok-cabernet-franc"),
         price: "Glass $12 / Bottle $44",
       },
       {
         name: "Paumanok Merlot",
         category: "Red Wine",
         image: menuImage("drinks-paumanok-merlot"),
         price: "Glass $12 / Bottle $44",
       },
       {
         name: "Paumanok Festival Chardonnay",
         category: "White Wine",
         image: menuImage("drinks-paumanok-festival-chardonnay"),
         price: "Glass $9 / Bottle $32",
       },
       {
         name: "Paumanok Semi Dry Riesling",
         category: "White Wine",
         image: menuImage("drinks-paumanok-semi-dry-riesling"),
         price: "Glass $10 / Bottle $36",
       },
       {
         name: "Paumanok Dry Riesling",
         category: "White Wine",
         image: menuImage("drinks-paumanok-dry-riesling"),
         price: "Glass $10 / Bottle $36",
       },
       {
         name: "Paumanok Sauvignon Blanc",
         category: "White Wine",
         image: menuImage("drinks-paumanok-sauvignon-blanc"),
         price: "Glass $12 / Bottle $40",
       },
       {
         name: "Paumanok Vineyard Dry Rosé",
         category: "Rosé",
         image: menuImage("drinks-paumanok-vineyard-dry-rose"),
         price: "Glass $9 / Bottle $32",
       },
       {
         name: "Paumanok Blanc De Blanc",
         category: "Champagne",
         image: menuImage("drinks-paumanok-blanc-de-blanc"),
         price: "Bottle $50",
       },
       {
         name: "Plum Wine",
         category: "Kinsen Plum",
         image: menuImage("drinks-plum-wine"),
         price: "Glass $8 / Bottle $34",
       },
     ],
   },
   {
     id: "sake",
     number: "02",
     title: "Sake",
     items: [
       {
         name: "Hot Sake",
         category: "Sho Chiku Bai",
         image: menuImage("drinks-hot-sake"),
         price: "$10",
       },
       {
         name: "Cold Unfiltered Sake",
         category: "Sho Chiku Bai",
         image: menuImage("drinks-cold-unfiltered-sake"),
         price: "$15",
       },
       {
         name: "Cold Ginjo Sake",
         category: "Sho Chiku Bai",
         image: menuImage("drinks-cold-ginjo-sake"),
         price: "$15",
       },
       {
         name: "Cold Organic Sake",
         category: "Sho Chiku Bai",
         image: menuImage("drinks-cold-organic-sake"),
         price: "$16",
       },
       {
         name: "Cold Lychee Sake",
         category: "Yuki Nigori",
         image: menuImage("drinks-cold-lychee-sake"),
         price: "$19",
       },
       {
         name: "Cold Mango Sake",
         category: "Yuki Nigori",
         image: menuImage("drinks-cold-mango-sake"),
         price: "$19",
       },
       {
         name: "Cold White Peach Sake",
         category: "Yuki Nigori",
         image: menuImage("drinks-cold-white-peach-sake"),
         price: "$19",
       },
       {
         name: "Cold Cantaloupe Sake",
         category: "Yuki Nigori",
         image: menuImage("drinks-cold-cantaloupe-sake"),
         price: "$19",
       },
     ],
   },
   {
     id: "beer",
     number: "03",
     title: "Beer",
     items: [
       {
         name: "Coors Light",
         category: "Draft Beer",
         image: menuImage("drinks-coors-light"),
         price: "Pint $5 / Pitcher $18",
       },
       {
         name: "Sapporo",
         category: "Draft Beer",
         image: menuImage("drinks-sapporo"),
         price: "Pint $6 / Pitcher $22",
       },
       {
         name: "Gridlock Hazy IPA",
         category: "Draft Beer",
         image: menuImage("drinks-gridlock-hazy-ipa"),
         price: "Pint $7 / Pitcher $26",
       },
       {
         name: "Blue Moon",
         category: "Draft Beer",
         image: menuImage("drinks-blue-moon"),
         price: "Pint $8 / Pitcher $28",
       },
       {
         name: "Non-Alcoholic Sapporo",
         category: "Non-Alcoholic Beer",
         image: menuImage("drinks-non-alcoholic-sapporo"),
         price: "$5",
       },
       {
         name: "Original Màkku",
         category: "Canned Korean Beer",
         image: menuImage("drinks-original-makku"),
         description: "Unfiltered Korean rice beer",
         price: "$5",
       },
       {
         name: "Mango Màkku",
         category: "Canned Korean Beer",
         image: menuImage("drinks-mango-makku"),
         description: "Unfiltered Korean rice beer",
         price: "$5",
       },
       {
         name: "Strawberry Màkku",
         category: "Canned Korean Beer",
         image: menuImage("drinks-strawberry-makku"),
         description: "Unfiltered Korean rice beer",
         price: "$5",
       },
       {
         name: "Terra 330 ML",
         category: "Bottled Korean Beer",
         image: menuImage("drinks-terra-330-ml"),
         price: "$7",
       },
       {
         name: "Terra 500 ML",
         category: "Bottled Korean Beer",
         image: menuImage("drinks-terra-500-ml"),
         price: "$9",
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
         image: menuImage("drinks-chamisul-fresh"),
         description: "Original",
         price: "$14",
       },
       {
         name: "Zero Sugar Soju",
         category: "Soju",
         image: menuImage("drinks-zero-sugar-soju"),
         price: "$14",
       },
       {
         name: "Apple",
         category: "Flavored Soju",
         image: menuImage("drinks-apple"),
         price: "$15",
       },
       {
         name: "Peach",
         category: "Flavored Soju",
         image: menuImage("drinks-peach"),
         price: "$15",
       },
       {
         name: "Lemon",
         category: "Flavored Soju",
         image: menuImage("drinks-lemon"),
         price: "$15",
       },
       {
         name: "Grapefruit",
         category: "Flavored Soju",
         image: menuImage("drinks-grapefruit"),
         price: "$15",
       },
       {
         name: "Green Grapes",
         category: "Flavored Soju",
         image: menuImage("drinks-green-grapes"),
         price: "$15",
       },
       {
         name: "Strawberry",
         category: "Flavored Soju",
         image: menuImage("drinks-strawberry"),
         price: "$15",
       },
       {
         name: "Plum",
         category: "Flavored Soju",
         image: menuImage("drinks-plum"),
         price: "$15",
       },
       {
         name: "Apple Mango",
         category: "Flavored Soju",
         image: menuImage("drinks-apple-mango"),
         price: "$15",
       },
       {
         name: "Wild Raspberry Wine",
         category: "Bok Boon Ja",
         image: menuImage("drinks-wild-raspberry-wine"),
         price: "$16",
       },
       {
         name: "So-Maek",
         category: "Korean Beer + Soju",
         image: menuImage("drinks-so-maek"),
         description:
           "One pitcher of Coors Light and one bottle of Original Soju. One shot of soju per glass, with beer added to your preferred ratio.",
         price: "$30",
       },
     ],
   },
   {
     id: "korean-fruit-drinks",
     number: "05",
     title: "Korean Fruit Drinks",
     note: "Available hot for $5 or iced for $6.",
     items: [
       {
         name: "Hallabong",
         image: menuImage("drinks-hallabong"),
         description: "Jeju Island orange",
         price: "Hot $5 / Iced $6",
       },
       {
         name: "Yuja",
         image: menuImage("drinks-yuja"),
         description: "Bittersweet citrus fruit",
         price: "Hot $5 / Iced $6",
       },
       {
         name: "Ume",
         image: menuImage("drinks-ume"),
         description: "Tangy and sour plum",
         price: "Hot $5 / Iced $6",
       },
     ],
   },
   {
     id: "soft-drinks",
     number: "06",
     title: "Soft Drinks",
     items: [
       {
         name: "Pepsi",
         category: "Soda",
         image: menuImage("drinks-pepsi"),
         price: "$2",
       },
       {
         name: "Pepsi Zero",
         category: "Soda",
         image: menuImage("drinks-pepsi-zero"),
         price: "$2",
       },
       {
         name: "Ginger Ale",
         category: "Soda",
         image: menuImage("drinks-ginger-ale"),
         price: "$2",
       },
       {
         name: "Starry",
         category: "Soda",
         image: menuImage("drinks-starry"),
         description: "Lemon Lime",
         price: "$2",
       },
       {
         name: "Orange Soda",
         category: "Soda",
         image: menuImage("drinks-orange-soda"),
         price: "$2",
       },
       {
         name: "Raspberry Iced Tea",
         category: "Tea",
         image: menuImage("drinks-raspberry-iced-tea"),
         price: "$2",
       },
       {
         name: "Orange Juice",
         category: "Juice",
         image: menuImage("drinks-orange-juice"),
         price: "$3",
       },
       {
         name: "Apple Juice",
         category: "Juice",
         image: menuImage("drinks-apple-juice"),
         price: "$3",
       },
       {
         name: "Cranberry Juice",
         category: "Juice",
         image: menuImage("drinks-cranberry-juice"),
         price: "$3",
       },
       {
         name: "Lemonade",
         category: "Juice",
         image: menuImage("drinks-lemonade"),
         price: "$3",
       },
       {
         name: "Milk",
         category: "Other",
         image: menuImage("drinks-milk"),
         price: "$2",
       },
       {
         name: "Green Tea",
         category: "Tea",
         image: menuImage("drinks-green-tea"),
         price: "$2",
       },
       {
         name: "Unsweetened Iced Tea",
         category: "Tea",
         image: menuImage("drinks-unsweetened-iced-tea"),
         price: "$2",
       },
       {
         name: "Shirley Temple",
         category: "Other",
         image: menuImage("drinks-shirley-temple"),
         price: "$3",
       },
     ],
   },
 ];

 // =========================================================
 // END OF MENU DATA
 // =========================================================
