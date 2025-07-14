"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { QuoteModal } from "@/components/quote-modal";
import { TourDetailsModal } from "@/components/tour-details-modal";
import { openWhatsApp, whatsappMessages } from "@/lib/whatsapp";

const tours = [
  {
    id: 1,
    title: "3 Days - A Quick Adventure",
    location: "Kandy, Colombo",
    duration: "3 Days",
    groupSize: "8-12 People",
    rating: 4.9,
    price: "From $299",
    images: [
      "/images/Sigiriya.jpg",
      "/images/dambulla.jpg",
      "/images/polonnaruwa.jpg",
    ],
    highlights: [
      "Ancient Kingdoms",
      "Rock Fortress",
      "Cave Temples",
      "UNESCO Sites",
    ],
    description:
      "Experience the best of Sri Lanka in just 3 days! Discover ancient temples, UNESCO heritage sites, and vibrant local culture. Enjoy flavorful Sri Lankan cuisine and create unforgettable family memories on this fun, relaxing getaway. Perfect for a quick escape filled with history, adventure, and delicious food!",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Sigiriya Rock Fortress",
        description:
          "Begin your cultural journey with the iconic Sigiriya Rock Fortress",
        activities: [
          "Airport/hotel pickup",
          "Sigiriya Rock climb",
          "Ancient palace ruins exploration",
          "Frescoes viewing",
        ],
        meals: ["Lunch", "Dinner"],
        accommodation: "Heritage hotel near Sigiriya",
      },
      {
        day: 2,
        title: "Dambulla Cave Temple & Polonnaruwa",
        description: "Explore sacred caves and ancient royal capital",
        activities: [
          "Temple of the Tooth visit",
          "Kandy Lake Walk",
          "Cultural Show",
          "Royal palace ruins",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Boutique hotel in Polonnaruwa",
      },
      {
        day: 3,
        title: "Cultural Immersion & Departure",
        description: "Experience local culture and traditional crafts",
        activities: [
          "Village tour",
          "Traditional pottery making",
          "Local market visit",
          "Departure transfer",
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "Check-out and departure",
      },
    ],
    inclusions: [
      "Professional English-speaking guide",
      "All accommodation (twin sharing)",
      "All meals as mentioned",
      "Air-conditioned transportation",
      "All entrance fees",
      "Bottled water",
      "Government taxes",
    ],
    exclusions: [
      "International flights",
      "Visa fees",
      "Travel insurance",
      "Personal expenses",
      "Tips and gratuities",
      "Alcoholic beverages",
    ],
    bestTime: "December to March",
    difficulty: "Moderate",
  },

  {
    id: 2,
    title: "Hill Country Explorer",
    location: "Kandy, Ella, Nuwara Eliya",
    duration: "4 Days",
    groupSize: "6-10 People",
    rating: 4.8,
    price: "From $399",
    images: [
      "/images/nine-arch.jpg",
      "/images/kandy.jpg",
      "/images/nuwaraeliya.png",
    ],
    highlights: [
      "Tea Plantations",
      "Train Rides",
      "Waterfalls",
      "Cool Climate",
    ],
    description:
      "Journey through Sri Lanka's breathtaking hill country, where emerald tea plantations carpet rolling hills and misty mountains create a magical landscape. Experience the famous blue train, visit sacred temples, and discover cascading waterfalls in this 4-day highland adventure.",
    itinerary: [
      {
        day: 1,
        title: "Kandy - Cultural Capital",
        description: "Explore the last kingdom of Sri Lanka",
        activities: [
          "Temple of the Tooth visit",
          "Kandy Lake walk",
          "Cultural dance show",
          "Royal Botanical Gardens",
        ],
        meals: ["Lunch", "Dinner"],
        accommodation: "Heritage hotel overlooking Kandy Lake",
      },
      {
        day: 2,
        title: "Scenic Train to Ella",
        description: "Experience the world's most beautiful train ride",
        activities: [
          "Blue train journey",
          "Tea plantation visit",
          "Tea factory tour",
          "Nine Arch Bridge",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Mountain view hotel in Ella",
      },
      {
        day: 3,
        title: "Ella Adventures",
        description: "Hiking and natural wonders",
        activities: [
          "Little Adam's Peak hike",
          "Ella Rock climbing",
          "Ravana Falls visit",
          "Local village tour",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Eco-lodge with valley views",
      },
      {
        day: 4,
        title: "Nuwara Eliya & Departure",
        description: "Little England of Sri Lanka",
        activities: [
          "Nuwara Eliya city tour",
          "Strawberry farm visit",
          "Lake Gregory boat ride",
          "Departure",
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "Check-out and departure",
      },
    ],
    bestTime: "December to March, July to September",
    difficulty: "Easy to Moderate",
  },
  {
    id: 3,
    title: "Coastal Paradise",
    location: "Galle, Mirissa, Unawatuna",
    duration: "5 Days",
    groupSize: "4-8 People",
    rating: 4.9,
    price: "From $499",
    images: [
      "/images/Mirissa.jpg",
      "/images/galle.jpg",
      "/images/unawatuna.jpg",
    ],
    highlights: [
      "Beach Relaxation",
      "Whale Watching",
      "Historic Forts",
      "Water Sports",
    ],
    description:
      "Discover Sri Lanka's stunning southern coast where golden beaches meet turquoise waters, historic Dutch forts tell colonial tales, and majestic whales dance in the ocean. This 5-day coastal journey combines relaxation, adventure, and cultural exploration.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Galle Fort",
        description: "Explore the historic Dutch colonial fort",
        activities: [
          "Galle Fort walking tour",
          "Lighthouse visit",
          "Colonial architecture",
          "Sunset at ramparts",
        ],
        meals: ["Lunch", "Dinner"],
        accommodation: "Boutique hotel within Galle Fort",
      },
      {
        day: 2,
        title: "Whale Watching in Mirissa",
        description: "Encounter giants of the ocean",
        activities: [
          "Early morning whale watching",
          "Blue whale spotting",
          "Dolphin encounters",
          "Beach relaxation",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Beachfront resort in Mirissa",
      },
      {
        day: 3,
        title: "Unawatuna Beach Day",
        description: "Paradise beach and water activities",
        activities: [
          "Snorkeling",
          "Beach games",
          "Coconut tree hill",
          "Jungle beach visit",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Beach villa in Unawatuna",
      },
      {
        day: 4,
        title: "Cultural & Adventure Mix",
        description: "Temples, turtles, and local experiences",
        activities: [
          "Turtle hatchery visit",
          "Snake Island temple",
          "Stilt fishing",
          "Local cooking class",
        ],
        meals: ["Breakfast", "Lunch", "Dinner"],
        accommodation: "Eco-resort near beach",
      },
      {
        day: 5,
        title: "Relaxation & Departure",
        description: "Final beach moments and farewell",
        activities: [
          "Morning beach walk",
          "Souvenir shopping",
          "Spa treatment",
          "Departure transfer",
        ],
        meals: ["Breakfast", "Lunch"],
        accommodation: "Check-out and departure",
      },
    ],
    bestTime: "November to April",
    difficulty: "Easy",
  },
  {
    id: 4,
    title: "Sri Lanka 4 Days - Culture Shores",
    location: "Kandy, Bentota, Colombo",
    duration: "4 Days",
    groupSize: "4-8 People",
    rating: 4.9,
    price: "From $499",
    images: [
      "/images/kandy.jpg",
      "/images/Sigiriya.jpg",
      "/images/unawatuna.jpg",
    ],
    highlights: ["Beach", "History", "Culture", "Nature", "Wild Life"],
    description:
      "Our 5-day Sri Lanka tour package boasts visits to ancient cities, seaside adventures, & wildlife encounters. Explore the cultural & historical heritage of Sri Lanka by discovering remnants of ancient kingdoms. Head to the southern coast to visit turtle hatcheries & embark on a thrilling jeep safari through a wildlife sanctuary. Relax & let our expert travel agents plan your perfect Sri Lanka tour.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Kandy City Tour",
        description:
          "As a sacred city in Sri Lanka, Kandy is home to the 'Temple of the Tooth.' Enjoy the scenic beauty of misty mountains, charming tea plantations, and the mesmerising flora and fauna of The Royal Botanical Gardens. That location is ideal for capturing a perfect Instagram-worthy photo.",
        activities: [
          "Welcome at the Airport",
          "Transfer to Kandy",
          "Enjoy a city tour of Kandy",
          "Visit Temple of the Tooth Relic",
        ],
        meals: ["None"],
        accommodation: "Thilanka Hotel ",
      },
      {
        day: 2,
        title: "Bentota",
        description:
          "Bentota is a beloved beachfront city on this paradise island. Explore the city by bicycle, passing through paddy fields and stunning ancient mural paintings, and stop by at the Kosgoda Turtle Hatchery. You can also spend the evening by indulging in water sports with your loved ones!",
        activities: [
          "Visit Royal Botanic Garden",
          "Visit Giragama Tea Factory",
          "Transfer to Bentota",
          "Relax on the beach",
        ],
        meals: ["Breakfast"],
        accommodation: "Turyaa Kalutara",
      },
      {
        day: 3,
        title: "Colombo City Tour",
        description:
          "Colombo is a city brimming with endless things to do. Your Sri Lanka trip is sure to be better with Colombo's luxury hotels, and international cuisine including the famous Sri Lankan crab dish. Go on a city tour and experience the island's multi-ethnic heritage and vibrant life!",
        activities: [
          "Madu River Boat Safari",
          "Transfer to Colombo",
          "Enjoy a Colombo city tour",
          "Shopping in Colombo",
        ],
        meals: ["Breakfast"],
        accommodation: "Cinnamon Red Colombo",
      },
    ],
    bestTime: "November to April",
    difficulty: "Easy",
  },
  {
    id: 5,
    title: "Sri Lanka 5 Days - Island Escape",
    location: "Sigiriya,Kandy,Bentota",
    duration: "5 Days",
    groupSize: "4-8 People",
    rating: 4.9,
    price: "From $499",
    images: [
      " /images/Sigiriya.jpg",
      "/images/kandy.jpg",
      "/images/unawatuna.jpg",
    ],
    highlights: ["Beach", "History", "Culture"],
    description:
      "Indulge in the serendipity of a 4-day Sri Lanka tour, where adventure and relaxation await. Explore the rich heritage of Kandy, unwind on the beautiful beaches of Bentota, and take a scenic boat ride along the enchanting Madu Ganga river. Treat yourself to a relaxing Fish Foot Therapy session and discover the vibrant city of Colombo, once a bustling hub of the old silk route.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Sigiriya Tour",
        description:
          "Sigiriya is famous for its stunning rock fortress, ancient frescoes, and breathtaking views of both sunset and sunrise. The area is also known for its rich wildlife and beautiful countryside, making it a popular destination for nature lovers and history enthusiasts alike.",
        activities: [
          "Welcome at the Airport",
          "Transfer to Sigiriya",
          "Visit Dambulla Cave Temple",
        ],
        meals: ["Breakfast "],
        accommodation: "Habarana Village by Cinnamon ",
      },
      {
        day: 2,
        title: "Sigiriya",
        description: "",
        activities: [
          "Visit Sigiriya Rock Fortress",
          "Optional Jeep Safari at Minneriya",
        ],
        meals: ["Breakfast"],
        accommodation: "Habarana Village by Cinnamon",
      },
      {
        day: 3,
        title: "Kandy City Tour",
        description:
          "Kandy, Sri Lanka's cultural capital, is rich in history and spiritual heritage. Visit ancient temples, enjoy a peaceful walk around Kandy Lake, and sip authentic Ceylon tea at a local café.",
        activities: [
          "Transfer to Kandy",
          "Enjoy a Kandy city tour",
          "Visit Temple of the Tooth Relic",
        ],
        meals: ["Breakfast"],
        accommodation: "ThIlanka Hotel",
      },
      {
        day: 4,
        title: "Bentota City Tour",
        description:
          "Bentota, a serene coastal town in Sri Lanka, is famous for its beautiful beaches, clear waters, and peaceful atmosphere. It offers water sports, boat rides on the Bentota River, and vibrant marine life, making it the perfect destination for a relaxing getaway.",
        activities: [
          "Visit Royal Botanic Garden",
          "Giragama Tea Factory",
          "Madu River Boat Safari",
        ],
        meals: ["Breakfast"],
        accommodation: "Turyaa Kalutara",
      },
    ],
    bestTime: "November to April",
    difficulty: "Easy",
  },
  {
    id: 6,
    title: "Sri Lanka 12 Days - Serendip Escape",
    location:
      "Polonnaruwa,Sigiriya,Kandy,Ella,Yala,Mirissa,Sinharaja,Bentota,Colombo",
    duration: "12 Days",
    groupSize: "4-8 People",
    rating: 4.9,
    price: "From $499",
    images: [
      "/images/Mirissa.jpg",
      "/images/galle.jpg",
      "/images/unawatuna.jpg",
    ],
    highlights: [
      "Beach Relaxation",
      "Whale Watching",
      "Historic Forts",
      "Water Sports",
    ],
    description:
      "Discover Sri Lanka's stunning southern coast where golden beaches meet turquoise waters, historic Dutch forts tell colonial tales, and majestic whales dance in the ocean. This 5-day coastal journey combines relaxation, adventure, and cultural exploration.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Habarana",
        description:
          "Habarana, at the heart of Sri Lanka's Cultural Triangle, offers easy access to ancient kingdoms and is surrounded by three wildlife sanctuaries—perfect for spotting wild elephants and exotic animals in their natural habitats",
        activities: ["Welcome at the airport", "Tranfer to Habarana"],
        meals: ["Breakfast ", "Dinner"],
        accommodation: "Habarana Village by Cinnamon",
      },
      {
        day: 2,
        title: "Sigiriya ",
        description:
          "Step into the iconic Sigiriya Rock Fortress, a must-visit in Sri Lanka. Immerse yourself in the local culture by tasting the island's cuisine, going on a traditional cart ride, and enjoying nature's serenity on a boat ride. This is an ideal family trip to create lasting memories!",
        activities: [
          "Visit Sigiriya Rock Fortress",
          "Safari at Minneriya National Park",
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Habarana Village by Cinnamon",
      },
      {
        day: 3,
        title: "Kandy City Tour",
        description:
          "As a sacred city in Sri Lanka, Kandy is home to the 'Temple of the Tooth.' Enjoy the scenic beauty of misty mountains, charming tea plantations, and the mesmerising flora and fauna of The Royal Botanical Gardens. That location is ideal for capturing a perfect Instagram-worthy photo.",
        activities: [
          "Visit Dambulla Cave temple",
          "Visit Temple of the Sacred Tooth",
        ],
        meals: ["Breakfast"],
        accommodation: "Earl's Regent ",
      },
      {
        day: 4,
        title: "Ella",
        description:
          "Your journey in Ella will include a picturesque train ride, offering views of cascading waterfalls, lush mountains, and charming tea plantations. Once you arrive in Ella, be sure to visit the Nine Arch Bridge, an architectural marvel, and don't forget to take a swim in a foamy waterfall!",
        activities: [
          "Go on a world-famous train ride",
          "Visit Nine Arch Bridge",
        ],
        meals: ["Breakfast"],
        accommodation: "Morning Dew Hotel ",
      },
      {
        day: 5,
        title: "Yala National Park",
        description:
          "Yala, a journey of diverse & captivating landscapes. Explore the tranquil waters of Yoda Wewa, venture to Kataragama for spiritual experiences, & discover the untamed beauty of the Sithulpawwa Rock Temple. A unique blend of nature, culture, & wildlife beckons in Sri Lanka.",
        activities: ["Transfer to Yala", "Game drive at Yala National Park"],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Chaarya Resort & Spa",
      },
      {
        day: 6,
        title: "Mirissa",
        description:
          "Mirissa's allure lies in its pristine Mirissa Beach, a blend of golden sands & turquoise waters. Embark on thrilling whale-watching adventures, uncover the beauty of Secret Beach, & relish seafood by the beautiful shore. An enchanting coastal escape awaits in the South of Sri Lanka.",
        activities: ["Transfer to Mirissa", "Relax at Mirissa"],
        meals: ["Breakfast"],
        accommodation: "Insight Resort ",
      },
      {
        day: 7,
        title: "Mirissa",
        description:
          "Mirissa's allure lies in its pristine Mirissa Beach, a blend of golden sands & turquoise waters. Embark on thrilling whale-watching adventures, uncover the beauty of Secret Beach, & relish seafood by the beautiful shore. An enchanting coastal escape awaits in the South of Sri Lanka.",
        activities: ["TWhale watching", "Relax on the mirissa beach"],
        meals: ["Breakfast"],
        accommodation: "Insight Resort ",
      },
      {
        day: 8,
        title: "Sinharaja",
        description:
          "Embrace the tranquillity in Sinharaja as your day begins with breathtaking forest views and melodious bird chirpings. Venture into the jungle and take a swim in a natural water spring. Go on a village walk with your loved ones and wind up the day with a Sri Lankan Lion beer.",
        activities: ["Transfer to Sinharaja", "Half day bird watching trail"],
        meals: ["Breakfast", "Dinner"],
        accommodation: "The Rainforest Ecolodge Sinharaja ",
      },
      {
        day: 9,
        title: "Sinharaja",
        description:
          "Embrace the tranquillity in Sinharaja as your day begins with breathtaking forest views and melodious bird chirpings. Venture into the jungle and take a swim in a natural water spring. Go on a village walk with your loved ones and wind up the day with a Sri Lankan Lion beer.",
        activities: [
          "Morning bird watching trail at Sinharaja",
          "Explore sinharaja forest",
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "The Rainforest Ecolodge Sinharaja ",
      },

      {
        day: 10,
        title: "Bentota",
        description:
          "  Bentota is a beloved beachfront city on this paradise island. Explore the city by bicycle, passing through paddy fields and stunning ancient mural paintings, and stop by at the Kosgoda Turtle Hatchery. You can also spend the evening by indulging in water sports with your loved ones!.",
        activities: [
          "Explore Galle Fort",
          "Transfer to Bentota",
          "Visit Turtle hatchery",
          "Relax on the beach",
        ],
        meals: ["Breakfast"],
        accommodation: "EKHO Surf Bentota ",
      },
      {
        day: 11,
        title: "Colombo",
        description:
          "As the commercial capital, Colombo offers the island's finest dining venues and shopping complexes. You will also get the chance to learn how to cook traditional Sri Lankan cuisine, and at night, explore the local pubs and clubs for an unforgettable nightlife experience!",
        activities: ["Transfer to Colombo", "Enjoy Colombo city tour"],
        meals: ["Breakfast"],
        accommodation: "Cinnamon Red Colombo",
      },
    ],
    bestTime: "November to April",
    difficulty: "Easy",
  },
  {
    id: 7,
    title: "Sri Lanka 6 Days - Temples, Wildlife & Beach",
    location: "Kandy,Nuwara Eliya,Udawalawe,Galle,Colombo",
    duration: "6 Days",
    groupSize: "Family",
    rating: 4.9,
    price: "From $499",
    images: [
      "/images/kandy.jpg",
      "/images/Sigiriya.jpg",
      "/images/unawatuna.jpg",
    ],
    highlights: [
      "Temple of the Tooth",
      "Tea plantations",
      "Elephant safari",
      "Galle Fort",
      "Beach time",
    ],
    description:
      "A 6‑day tour through Sri Lanka combining cultural sites, wildlife safaris, highlands and beaches." +
      " Visit Kandy, Nuwara Eliya, Udawalawe, Galle, and Colombo.",
    itinerary: [
      {
        day: 1,
        title: "Kandy",
        description:
          "In Kandy, you will have the privilege of visiting the Temple of the Tooth, one of the most sacred places in the country. The Tooth Relic of Lord Buddha is adorned with gold and jewels in the temple. After the temple visit, explore the incredible flavours of Sri Lankan cuisine!",
        activities: [
          "Welcome at the airport",
          "Transfer to Kandy",
          "Enjoy a city tour in Kandy",
          "Visit the Temple of the Tooth Relic",
        ],
        meals: ["Breakfast"],
        accommodation: "Thilanka Hotel",
      },
      {
        day: 2,
        title: "Nuwara Eliya",
        description:
          "Nuwara Eliya boasts lush-green estates, soothing weather and enchanting flora and fauna. Will you hike through highlands? Will you enjoy a horseback ride along the bank of Gregory Lake? Or will you explore this British Victorian-style town? Whatever you do, a good time is ensured!",
        activities: [
          "Royal Botanical Gardens",
          "Experience Tea Plucking",
          "Tea plantation tour",
          "Visit Ramboda Waterfall",
        ],
        meals: ["Breakfast"],
        accommodation: "Galway Heights Hotel",
      },
      {
        day: 3,
        title: "Udawalawe",
        description:
          "Udawalawa National Park was established to create a sanctuary for wild animals. Grab your camera and hop on a safari jeep to witness the wildlife before your eyes. You can also witness the daily routine of the adorable elephant calves at the Elephant Transit Home!",
        activities: [
          "Visit Seetha Amman Temple",
          "Visit Ella",
          "Optional visit to the Elephant Transit Home",
        ],
        meals: ["Breakfast"],
        accommodation: "Grand Udawalawa Safari Resor",
      },
      {
        day: 4,
        title: "Galle",
        description:
          "Galle, where history breathes within ancient walls. Stroll cobblestone streets, explore the Dutch Fort, & visit the iconic lighthouse, Dutch Reformed Church, & museums. A fusion of charm & heritage invites you to step back in time & savour the essence of colonial elegance.",
        activities: [
          "Jeep Safari at Udawalawa National Park",
          "Walk inside Galle Fort",
        ],
        meals: ["Breakfast"],
        accommodation: "Turyaa Kalutara",
      },
      {
        day: 5,
        title: "Colombo",
        description:
          "Immerse yourself in the essence of local culture, and admire the spectacular cityscape in Colombo. Explore Sri Lanka's rich history in its museums and art galleries, and indulge in a luxurious hotel experience as you create wonderful memories with your loved ones!",
        activities: [
          "Madu River boat safari",
          "Transfer to Colombo",
          "Enjoy a city tour of Colombo",
        ],
        meals: ["Breakfast"],
        accommodation: "Cinnamon Red Colombo",
      },
    ],
    bestTime: "December to March",
    difficulty: "Moderate",
  },
  {
    id: 8,
    title: "Sri Lanka 7 Days - Island Adventure",
    location: "Sigiriya,Kandy,Nuwara Eliya,Yala,Bentota",
    duration: "7 Days",
    groupSize: "Family",
    rating: 4.9,
    price: "From $499",
    images: [
      "/images/kandy.jpg",
      "/images/Sigiriya.jpg",
      "/images/unawatuna.jpg",
    ],
    highlights: [
      "Sigiriya",
      "Kandy culture",
      "Tea country",
      "Yala safari",
      "Beach relaxation",
    ],
    description:
      "A perfectly paced 7‑day journey highlighting cultural heritage, hill country and coastal life.",
    itinerary: [
      {
        day: 1,
        title: "Sigiriya & Dambulla",
        description:
          "If you wish to see the wonders of ancient Sri Lankan architecture, Sigiriya town is a must-visit. Hike the Pidurangala Rock to get a breathtaking view of Sigiriya Rock. Visit the 'Royal Gardens' which is one of the oldest gardens in the world & go on a soul-tapping walk in the village!",
        activities: [
          "Welcome at the airport",
          "Transfer to Sigiriya",
          "Visit Dambulla Cave Temple",
        ],
        meals: ["Breakfast"],
        accommodation: "Habarana Village by Cinnamon",
      },
      {
        day: 2,
        title: "Kandy",
        description:
          "Kandy is the essence of Sri Lanka's rich culture and nature. Take a stroll in one of the most beautiful gardens in Asia: the Royal Botanical Gardens. Witness a traditional Kandyan dance performance and immerse yourself in Sri Lanka's captivating culture through the streets of Kandy!",
        activities: [
          "Visit the Sigiriya Rock Fortress",
          "Visit the Temple of the Tooth Relic",
          "Kandy city tour",
        ],
        meals: ["Breakfast"],
        accommodation: "Thilanka Hotel",
      },
      {
        day: 3,
        title: "Nuwara Eliya",
        description:
          "Nuwara Eliya is the total opposite of what you might imagine a tropical island to be. Explore British Victorian-style architecture, strawberry farms and botanical gardens. Wake up to the chilly misty weather, go on a horse ride and enjoy the charming greenery around you!",
        activities: [
          "Visit the Royal Botanic Garden",
          "Tea plucking experience",
          "Visit a tea factory",
        ],
        meals: ["Breakfast"],
        accommodation: "Galway Heights Hotel",
      },
      {
        day: 4,
        title: "Yala",
        description:
          "Yala, a unique wildlife sanctuary where nature's majesty thrives. Safari through the heart of the enchanting landscapes of Yala National Park, home to leopards, elephants, & a myriad of fascinating creatures. Immerse yourself in the untamed wilderness of Sri Lanka's grandeur.",
        activities: ["Visit Ella", "Safari in Yala National Park"],
        meals: ["Breakfast"],
        accommodation: "Chaarya Resort & Spa",
      },
      {
        day: 5,
        title: "Bentota",
        description:
          "No Sri Lanka trip is complete without a stay on the southern beaches. While you relax on the golden sandy shores, you can also explore the historic Galle Fort, boat ride at Madu river, and see the sea turtles nesting along the coast. It’s the perfect blend of relaxation and adventure.",
        activities: [
          "Explore the Galle Royal Dutch Fort",
          "Relax on the beach",
        ],
        meals: ["Breakfast"],
        accommodation: "Turyaa Kalutara",
      },
      {
        day: 6,
        title: "Bentota",
        description:
          "No Sri Lanka trip is complete without a stay on the southern beaches. While you relax on the golden sandy shores, you can also explore the historic Galle Fort, boat ride at Madu river, and see the sea turtles nesting along the coast. It’s the perfect blend of relaxation and adventure.",
        activities: [
          "Boat safari at the Madu River",
          "Optional visit to a turtle conservation center",
        ],
        meals: ["Breakfast"],
        accommodation: "Turyaa Kalutara",
      },
    ],
    bestTime: "December to March",
    difficulty: "Moderate",
  },
  {
    id: 9,
    title: "Sri Lanka 8 Days - A Journey Through Paradise",
    location: "Sigiriya,Kandy,Nuwara Eliya,Yala,Bentota,Colombo",
    duration: "8 Days",
    groupSize: "Family",
    rating: 4.9,
    price: "From $499",
    images: [
      "/images/kandy.jpg",
      "/images/Sigiriya.jpg",
      "/images/unawatuna.jpg",
    ],
    highlights: [
      "Sigiriya",
      "Dambulla",
      "Kandy",
      "Tea plantations",
      "Yala safari",
      "Bentota beach",
      "Colombo",
    ],
    description:
      "Embark on an 8-day journey through Sri Lanka, exploring Sigiriya’s rock fortress, the Dambulla Cave Temple, and Kandy’s cultural heritage. Visit Nuwara Eliya’s picturesque tea plantations, enjoy a thrilling safari in Yala National Park, relax on Bentota’s beaches, and end in Colombo, experiencing the perfect mix of culture, nature, adventure, and relaxation.",
    itinerary: [
      {
        day: 1,
        title: "Sigiriya & Dambulla",
        description:
          "Sigiriya, a UNESCO World Heritage site, boasts a stunning fortress with rich history and panoramic views. Nearby, you'll find the Dambulla Cave Temple with its intricate murals, as well as wildlife sanctuaries, offering a perfect blend of culture, history, and nature.",
        activities: [
          "Welcome at the airport",
          "Transfer to Sigirya",
          "Dambulla Cave Temple",
        ],
        meals: ["Breakfast"],
        accommodation: "Habarana Village by Cinnamon",
      },
      {
        day: 2,
        title: "Kandy",
        description:
          "Kandy is a city of immense cultural heritage. Visit Sri Lanka's Spice Village to understand its rich culinary flavours. Wander around the Royal Botanical Gardens and participate in a soothing yoga and relaxation session. End your day with an evening cultural dance performance.",
        activities: [
          "Visit Sigiriya Fortress",
          "Transfer to Kandy",
          "Temple of the Tooth",
          "City tour",
        ],
        meals: ["Breakfast"],
        accommodation: "Thilanka Hotel",
      },
      {
        day: 3,
        title: "Nuwara Eliya",
        description:
          "Nuwara Eliya is an exceptionally cold city in Sri Lanka. Experience the British influence on Sri Lanka through tea plantations, strawberry farms, Victorian-style architecture, and many more. In the evening, pay a visit to the sacred Sita Amman Kovil for a refreshing cultural shift.",
        activities: [
          "Visit the Royal Botanic Garden",
          "Transfer to Nuwara Eliya",
          "Tea plucking experience",
          "Visit a tea factory",
        ],
        meals: ["Breakfast"],
        accommodation: "Galway Heights Hotel",
      },
      {
        day: 4,
        title: "Yala",
        description:
          "Yala is known as the best place to spot leopards, the island's largest predator. It is also home to wild elephants, sloth bears, and many other mammals, making it a haven for wildlife. In addition, Yala offers a great variety of Sri Lankan birds, making it a must-visit for nature lovers.",
        activities: ["Visit Ella", "Half-day jeep safari in Yala"],
        meals: ["Breakfast"],
        accommodation: "Chaarya Resort & Spa ",
      },
      {
        day: 5,
        title: "Bentota",
        description:
          "Bentota is a well-known spot in the locality for its stunning beaches, lush coconut groves, and thrilling watersports. Sip a cup of toddy, a unique Sri Lankan alcoholic beverage, while enjoying the breathtaking view of the waves crashing on the golden sands with your beloveds.",
        activities: ["Explore Galle’s Royal Dutch Fort", "Beach time"],
        meals: ["Breakfast"],
        accommodation: "Turyaa Kalutara",
      },
      {
        day: 6,
        title: "Bentota",
        description:
          "Bentota is a well-known spot in the locality for its stunning beaches, lush coconut groves, and thrilling watersports. Sip a cup of toddy, a unique Sri Lankan alcoholic beverage, while enjoying the breathtaking view of the waves crashing on the golden sands with your beloveds.",
        activities: [
          "Madu Ganga boat ride",
          "Optional visit to a turtle conservation tour",
        ],
        meals: ["Breakfast"],
        accommodation: "Turyaa Kalutara",
      },
      {
        day: 7,
        title: "Colombo",
        description:
          "Colombo is a vibrant mix of cultures, with influences from various ethnic groups. The city still holds traces of its colonial past, seen in its architecture. A guided tour offers a deeper look into Colombo's rich history, culture, and the unique stories that define it.",
        activities: ["City tour"],
        meals: ["Breakfast"],
        accommodation: "Cinnamon Red Colombo",
      },
    ],
    bestTime: "December to March",
    difficulty: "Moderate",
  },
  {
    id: 10,
    title: "Sri Lanka Tour Package 5 Dayse",
    location: "Kandy,Nuwara Eliya,Kitulgala,Bentota",
    duration: "5 Days",
    groupSize: "Family",
    rating: 4.9,
    price: "From $499",
    images: [
      "/images/kandy.jpg",
      "/images/Sigiriya.jpg",
      "/images/unawatuna.jpg",
    ],
    highlights: [
      "Sigiriya",
      "Dambulla",
      "Kandy",
      "Tea plantations",
      "Yala safari",
      "Bentota beach",
      "Colombo",
    ],
    description:
      "Pamper yourself to luxury & comfort on your 5-day Sri Lanka Tour. Experience natural wonders, unveiling cultural treasures in the middle of the island. Immerse in rich history, embark on thrilling river adventures, & unwind on golden shores. Explore a diverse & memorable exploration of Sri Lanka's exceptional natural beauty, with a special highlight amidst the lush, verdant rainforests.",
    itinerary: [
      {
        day: 1,
        title: "Kandy",
        description:
          "Kandy is a city of immense cultural heritage. Visit Sri Lanka's Spice Village to understand its rich culinary flavours. Wander around the Royal Botanical Gardens and participate in a soothing yoga and relaxation session. End your day with an evening cultural dance performance.",
        activities: [
          "Touch down in paradise Sri Lanka",
          "Greetings by Olanka representative",
          "Visit the cashew village",
          "Watch elephants at Pinnawala",
          "Visit the sacred Dalada Maligawa",
          "Explore a local spice village",
          "Engage with local spice experts",
          "Enjoy friendly chats with locals",
          "Sip on a Lankan brewed cool beer",
          "Watch a magnificent cultural show",
          "Indulge in local dinner buffet",
          "Learn about local handicrafts",
          "Visit historic Kandy City Centre",
        ],
        meals: ["Breakfast", " Dinner"],
        accommodation: "Earl's Regent",
      },

      {
        day: 2,
        title: "Nuwara Eliya",
        description:
          "Nuwara Eliya is an exceptionally cold city in Sri Lanka. Experience the British influence on Sri Lanka through tea plantations, strawberry farms, Victorian-style architecture, and many more. In the evening, pay a visit to the sacred Sita Amman Kovil for a refreshing cultural shift.",
        activities: [
          "Visit the Royal Botanic Garden",
          "Transfer to Nuwara Eliya",
          "Tea plucking experience",
          "Visit a tea factory",
        ],
        meals: ["Breakfast"],
        accommodation: "Galway Heights Hotel",
      },

      {
        day: 3,
        title: "Kitulgala",
        description:
          "Kitulgala is a city that offers a range of adrenaline-kicking tropical sports. Discover the delights of white-water rafting, jungle trekking, bird watching, and cave exploration. Walk along the banks of Kelani River and spot the famous Bridge in David Lean's 1957 Oscar-winning film!",
        activities: [
          "Proceed to Kitulgala",
          "Experience white water rafting",
          "Engage in birdwatching in the jungle",
          "Experience rock abseiling",
          "Experience confidence jumping",
          "Hike mountains for scenic views",
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "TParadise Eco Garden ",
      },

      {
        day: 4,
        title: "Bentota",
        description:
          "Bentota is a resort town known for tropical sea waters, lush gardens, and therapeutic spas. Walk through the enchanting ‘Brief Garden’ designed by the famous architect ‘Bewis Bava’, and take a stroll along the golden beach. In the evening, explore soothing temples and antique boutiques.",
        activities: [
          "Wake up in tropical Sri Lanka",
          "Enjoy traditional breakfast buffet",
          "Proceed to beautiful Bentota beach",
          "Visit a sea turtle hatchery",
          "Enjoy boat ride along Madu River",
          "Try fish therapy while on boat ride",
          "Experience deep-sea fishing",
          "Take a walk on the golden seashore",
          "Watch sunset with a local Lion beer",
          "Indulge in a seafood dinner buffet",
          "Wind down with Ayurveda spa treatment",
          "Taste spicy crab at seafood BBQ",
          "Join a beach party with locals",
        ],
        meals: ["Breakfast", "Dinner "],
        accommodation: "Taj Bentota Resort & Spa",
      },
    ],
    bestTime: "December to March",
    difficulty: "Moderate",
  },
  {
    id: 11,
    title: "Sri Lanka Tour Itinerary 9 Days",
    location: "Negombo,Kandy,Nuwara Eliya,Yala,Bentota,Colombo",
    duration: "9 Days",
    groupSize: "Friends",
    rating: 4.9,
    price: "From $499",
    images: [
      "/images/kandy.jpg",
      "/images/Sigiriya.jpg",
      "/images/unawatuna.jpg",
    ],
    highlights: [
      "Negombo canal life",
      "Kandy culture",
      "Nuwara Eliya cold climate",
      "Yala safari",
      "Bentota beach",
      "Colombo city",
    ],
    description:
      "Your 9-day Sri Lanka tour package will take you on a rollercoaster of events, from the warmest to the coldest climates, from rural culture to modernity, from ancient history to the 20th century, and from the central hills to the crystal-clear beaches. Leave the hard task of planning to our travel experts & enjoy your Sri Lankan-style cocktail on the golden shore of Bentota Beach with your family!",
    itinerary: [
      {
        day: 1,
        title: "Negombo",
        description:
          "Located close to the airport and known as a popular beach destination, Negombo is an ideal place to stay for the first night after a long flight or if you arrive at midnight. The city offers a wide range of local pubs and restaurants, making it perfect for enjoying a vibrant nightlife",
        activities: ["Welcome at the airport", "Transfer to Negombo"],
        meals: ["Breakfast"],
        accommodation: "Earl's Regent Negombo",
      },
      {
        day: 2,
        title: "Kandy",
        description:
          "Kandy is the essence of Sri Lanka's rich culture and nature. Take a stroll in one of the most beautiful gardens in Asia: the Royal Botanical Gardens. Witness a traditional Kandyan dance performance and immerse yourself in Sri Lanka's captivating culture through the streets of Kandy!",
        activities: [
          "Visit Negombo Fish Market",
          "Visit Pinnawala Elephant Orphanage",
          "Transfer to Kandy",
          "Visit the Temple of the Tooth",
          "Enjoy a Kandy City Tour",
        ],
        meals: ["Breakfast"],
        accommodation: "Earl’s Regent",
      },
      {
        day: 3,
        title: "Nuwara Eliya",
        description:
          "Nuwara Eliya is a unique city in Sri Lanka. The cloudy waterfalls, charming rows of tea plantations, the world-famous Ceylon tea factories, & European-style buildings are sure to leave you mesmerised! To end this day, enjoy a picnic by Gregory Lake with your loved ones.",
        activities: [
          "Visit the Royal Botanical Gardens",
          "Transfer to Nuwara Eliya",
          "Tea Plucking Experience",
          "Visit a Tea Factory",
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "The Blackpool",
      },
      {
        day: 4,
        title: "Ella",
        description:
          "Ella is a beloved town for travellers from around the world. During your tour, visit the iconic 100 year old Nine Arch Bridge, embark on a thrilling hike to Mini Adam's Peak, and, in the evening. Enjoy a leisurely stroll through the beautiful Ella village, the recipe for relaxation!",
        activities: ["Scenic train ride to Ella", "Visit Nine arch bridge"],
        meals: ["Breakfast"],
        accommodation: "Morning Dew Hotel",
      },
      {
        day: 5,
        title: "Yala",
        description:
          "Yala, a unique wildlife sanctuary where nature's majesty thrives. Safari through the heart of the enchanting landscapes of Yala National Park, home to leopards, elephants, & a myriad of fascinating creatures. Immerse yourself in the untamed wilderness of Sri Lanka's grandeur.",
        activities: [
          "Transfer to Yala",
          "Visit the Elephant Transit Home",
          "Safari at Yala National Park",
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Chaarya Resort & Spa",
      },
      {
        day: 6,
        title: "Mirissa",
        description:
          "Mirissa, a coastal gem where Midigama Beach beckons surfers. Taprobane Island offers exotic escapes. The Doctor's House sets the stage for unforgettable evenings. Enjoy the best of sun, sea, & celebration in one vibrant destination, where every sunset paints the sky gold.",
        activities: ["Transfer to Mirissa", "Relax at Mirissa"],
        meals: ["Breakfast"],
        accommodation: "Weligama Bay Marriott Resort & Spa",
      },
      {
        day: 7,
        title: "Bentota",
        description:
          "Today, we will walk inside the Royal Dutch Fort in Galle, exploring its vibrant streets filled with history. Afterward, we’ll head to Bentota, a popular beach destination known for its exciting water sports and beautiful gardens, offering a perfect mix of relaxation and adventure",
        activities: [
          "Stilt fisherman",
          "Work inside the Galle Fort",
          "Visit Brief garden",
        ],
        meals: ["Breakfast"],
        accommodation: "Cinnamon Bey",
      },
      {
        day: 8,
        title: "Colombo",
        description:
          "As the financial epicentre of Sri Lanka, Colombo stands as a favoured hotspot for tourists. Immerse yourself in a diverse culinary experience and embark on an exciting tuk-tuk ride around the seaside city. After an exciting day, enjoy the nightlife with friendly locals and good food!",
        activities: [
          "Transfer to Colombo",
          "Explore Pettah Stree",
          "Relax Shopping at Colombo",
        ],
        meals: ["Breakfast"],
        accommodation: "Amari Colombo",
      },
    ],
    bestTime: "December to March",
    difficulty: "Moderate",
  },
  {
    id: 12,
    title: "Sri Lanka 8 Days - The Local Thrill Route",
    location: "Sigiriya,Negombo,Kandy,Nuwara Eliya,Kitulgala,Bentota,Colombo",
    duration: "8 Days",
    groupSize: "Family",
    rating: 4.9,
    price: "From $499",
    images: [
      "/images/kandy.jpg",
      "/images/Sigiriya.jpg",
      "/images/unawatuna.jpg",
    ],
    highlights: [
      "Sigiriya",
      "Dambulla",
      "Kandy",
      "Nuwara Eliya",
      "Yala safari",
      "Bentota beach",
      "City life in Colombo",
    ],
    description:
      "Our tour experts will help you plan an unforgettable journey around this paradise island in just eight days. Visit the breathtaking archaeological, historical, & cultural sites of this beautiful island. This Sri Lanka tour also includes a visit to Nuwara Eliya, nicknamed `Little England,` for its cold, tingly climate. And don’t forget to witness Sri Lanka’s incredible wildlife and pristine beaches!",
    itinerary: [
      {
        day: 1,
        title: "Negombo",
        description:
          "The marine culture of Negombo, a beautiful beach town located very close to the airport, is shaped by its colourful culture & the fishery industry. The stunning beach, bustling city life, & lively nightlife welcome its visitors with open hands to enjoy a wonderful time!",
        activities: ["Welcome at the airport", "Transfer to Negombo"],
        meals: ["Breakfast"],
        accommodation: "Earl's Regent Negombo",
      },
      {
        day: 2,
        title: "Sigiriya",
        description:
          "Sigiriya, known for its scenic sunsets and rich heritage, offers vast paddy fields, the iconic Rock Fortress, and mesmerizing frescoes—an unforgettable journey awaits!",
        activities: [
          "Visit Negombo Fish Market",
          "Visit Sigiriya Rock Fortress",
        ],
        meals: ["Breakfast"],
        accommodation: "Camellia Resort and Spa",
      },
      {
        day: 3,
        title: "Kandy",
        description:
          "Kandy, the last kingdom of ancient Sri Lanka, is now a UNESCO World Heritage city. It's also one of the most sacred places for Buddhists, primarily due to the Temple of the Tooth Relic, which holds immense religious significance and attracts pilgrims from around the world",
        activities: [
          "Visit Dambulla Cave Temple",
          "Visit Dambulla Cave Temple",
          "Visit Temple of the Tooth Relic",
          "Enjoy a city tour of Kandy",
        ],
        meals: ["Breakfast"],
        accommodation: "Earl's Regent",
      },
      {
        day: 4,
        title: "Nuwara Eliya",
        description:
          "Nuwara Eliya boasts lush-green estates, soothing weather and enchanting flora and fauna. Will you hike through highlands? Will you enjoy a horseback ride along the bank of Gregory Lake? Or will you explore this British Victorian-style town? Whatever you do, a good time is ensured!",
        activities: [
          "Visit Royal Botanical Garden",
          "Transfer to Nuwara Eliya",
          "Tea Plucking Experience",
          "Visit a Tea Factory",
        ],
        meals: ["Breakfast"],
        accommodation: "Galway Heights",
      },
      {
        day: 5,
        title: "Kithulgala",
        description:
          "Kitulgala, located beside the Kelani River, is a perfect destination in Sri Lanka for adventure seekers and nature lovers, particularly those keen on white-water rafting and birdwatching. With a history dating back over 32,000 years, it is home to prehistoric human skeletons",
        activities: [
          "Visit Seetha Amman Temple",
          "Transfer to Kitulgala",
          "Visit St. Clair Waterfall and Devon Waterfall",
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Aramya River Front Boutique Hote",
      },
      {
        day: 6,
        title: "Bentota",
        description:
          "No Sri Lanka trip is complete without a visit to the golden sandy beaches of Bentota. This resort town offers a fun boat ride in the Madu River and a wide array of watersports. Taste toddy, a distinctive local alcoholic beverage and witness the sunset with your loved ones!",
        activities: ["Transfer to Bentota", "Boat Safari at Madu River"],
        meals: ["Breakfast"],
        accommodation: "Cinnamon Bey",
      },
      {
        day: 7,
        title: "Colombo",
        description:
          "Colombo is a city brimming with endless things to do. Your Sri Lanka trip is sure to be better with Colombo's luxury hotels, and international cuisine including the famous Sri Lankan crab dish. Go on a city tour and experience the island's multi-ethnic heritage and vibrant life!",
        activities: [
          "Transfer to Colombo",
          "Colombo City Tour",
          "Shopping in Colombo",
        ],
        meals: ["Breakfast"],
        accommodation: "Granbell Hotel Colombo",
      },
    ],
    bestTime: "December to March",
    difficulty: "Moderate",
  },
  {
    id: 13,
    title: "Sri Lanka 15 Days of Romantic Bliss",
    location: "Negombo,Dambulla,Pussellawa, Ella, Yala,Tangalle,Galle",
    duration: "15 Days",
    groupSize: "Couple",
    rating: 4.9,
    price: "From $499",
    images: [
      "/images/kandy.jpg",
      "/images/Sigiriya.jpg",
      "/images/unawatuna.jpg",
    ],
    highlights: [
      "Romantic canal ride",
      "Cultural triangle",
      "Highlands",
      "Safari",
      "Coastal seclusion",
      "Beach luxury",
    ],
    description:
      "Experience a romantic 15-day escape in Sri Lanka, where luxury and adventure blend seamlessly. This itinerary invites you to indulge in intimate moments while exploring cultural highlights, enjoying magnificent views of the central highlands, embarking on thrilling game drives, relaxing on secluded beaches, and strolling through the lively forts, creating unforgettable memories on this enchanting island.",
    itinerary: [
      {
        day: 1,
        title: "Negombo",
        description: "",
        activities: [
          "Arrive & transfer to Negombo",
          "Visit Mutharajawela Wetland",
          "Sail on Fishing Boats",
          "Visit the churches in Negombo",
        ],
        meals: ["N/A"],
        accommodation: "Wallawwa",
      },
      {
        day: 2,
        title: "Sigiriya",
        description:
          "This morning, we will transfer to Sigiriya. En route, visit the UNESCO-listed Dambulla Cave Temple. In the evening, enjoy some leisure time or embark on an adventurous climb to Pidurangala to witness a stunning sunset over Sigiriya Fortress. Return to the hotel and relax.",
        activities: [
          "Transfer to Dambulla",
          "Visit Dambulla Cave Temple",
          "Climb Pidurangala Rock",
        ],
        meals: ["Breakfast"],
        accommodation: "Water Garden Sigiriya",
      },
      {
        day: 3,
        title: "Sigiriya",
        description:
          "Visit the UNESCO heritage Sigiriya Fortress, renowned for its beautiful water gardens and frescoes. Enjoy the magnificent views from the top before returning to the hotel. Later, we embark on a jeep safari at Minneriya National Park, famous for its large herds of wild elephants.",
        activities: [
          "Visit Sigiriya Fortress",
          "Jeep Safari at Minneriya National Park",
        ],
        meals: ["Breakfast"],
        accommodation: "Water Garden Sigiriya",
      },
      {
        day: 4,
        title: "Pussellawa",
        description:
          "Say goodbye to Sigiriya as we drive to the Central Highlands. In Kandy, the City of Love, we visit the Temple of Tooth Relic, stroll around Kandy Lake, and wander through the serene paths of the Royal Botanical Gardens. We continue to Pussellawa, a quieter, picturesque location to stay.",
        activities: [
          "Transfer to Pussellawa",
          "Visit Temple of Tooth Relic",
          "Explore the Kandy City",
          "Visit Peradeniya Botanical Gardens",
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "The Lavender House",
      },
      {
        day: 5,
        title: "Pussellawa",
        description:
          "Discover Pussellawa as you immerse yourself in tea experiences with local tea pluckers. Visit the picturesque Geradigini Ella Falls and the serene Kotmale Reservoir, sharing the beauty of these natural wonders. Return to the hotel for a delightful high tea by the poolside.",
        activities: [
          "Tea experiences with Local Pluckers",
          "Visit Geradigini Ella Falls Viewpoint",
          "Explore Kotmale Reservoir or Hike to the top of Peacock Hill",
          "High Tea Session",
        ],
        meals: ["Breakfast"],
        accommodation: "The Lavender House",
      },
      {
        day: 6,
        title: "Pussellawa",
        description:
          "Pussellawa is renowned for its connection to the Ramayana, the tale of Princess Seetha and Prince Rama. Start the day with a visit to the Lord Hanuman temple, followed by exploring hidden waterfalls, local temples, and enjoying scenic train rides in the afternoon.",
        activities: [
          "Visit Hanuman Temple",
          "Kadadora Temple",
          "Scenic Train Ride",
          "Scenic Waterfalls",
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "The Lavender House",
      },
      {
        day: 7,
        title: "Ella",
        description:
          "Proceed to Ella, stopping en route at Adisham Bungalow. Enjoy free time to relax at the Ravana Pool Club or try the giant swing. In the evening, explore the artisanal tea process at Amba Estate, where you can learn about and appreciate the craftsmanship behind Sri Lanka’s famous tea.",
        activities: [
          "Adisham Bungalow",
          "Ravana Pool Club",
          "Ella Swing",
          "Amba Estate",
        ],
        meals: ["Breakfast"],
        accommodation: "98 Acres",
      },
      {
        day: 8,
        title: "Ella",
        description:
          "Another day in Ella, capturing romantic moments. We visit Lipton Seat for breathtaking views, then head to Upper Diyaluma and Ravana Falls, two of the most Instagrammable spots. On our return, we’ll explore the iconic Nine Arches Bridge and experience the thrilling zip line.",
        activities: [
          "Lipton Seat Viewpoint",
          "Upper Diyaluma and Ravana Waterfalls",
          "Nine Arch Bridge",
          "Ravana Zip-line",
        ],
        meals: ["Breakfast"],
        accommodation: "98 Acres",
      },
      {
        day: 9,
        title: "Yala",
        description:
          "We head to Yala for wildlife adventure. En route, we visit the Udawalawe Elephant Transit Home, a sustainable project for abandoned baby elephants. In the evening, we embark on a safari at Yala National Park, hoping to spot the magnificent Sri Lankan leopards in their natural habitat.",
        activities: [
          "Transfer to Yala",
          "Visit Elephant Transit Home",
          "Jeep Safari at Yala National Park",
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Wild Culture Yala",
      },
      {
        day: 10,
        title: "Yala",
        description:
          "In the morning, discover diverse birdlife with our resident naturalist. In the evening, embark on your second Yala safari, spotting more wildlife, maybe even a leopard again. End the day with a romantic dinner on the beach under the stars for an unforgettable experience.",
        activities: [
          "Bird Watching trail",
          "Jeep Safari at Yala National Park",
        ],
        meals: ["Breakfast", "Dinner"],
        accommodation: "Wild Culture Yala",
      },
      {
        day: 11,
        title: "Tangalle",
        description:
          "After a leisurely breakfast, we drive to Tangalle, home to some of the most beautiful beaches at the southern tip of Sri Lanka. Spend the rest of the day at your leisure on the beach or indulge in wellness treatments to relax and rejuvenate amidst the stunning coastal scenery.",
        activities: ["Transfer to Tangalle", "Turtle Nesting at Night"],
        meals: ["Breakfast"],
        accommodation: "Anantara Peace Haven",
      },
      {
        day: 12,
        title: "Tangalle",
        description:
          "Enjoy more free time in the morning. In the afternoon, we drive to Mulgirigala Caves to explore ancient murals that showcase the region's rich history. We return to Tangalle for a scenic sunset boat ride at Kalametiya Lagoon, immersing ourselves in the tranquil beauty of the surroundings.",
        activities: ["Mulgirigala Caves", "Boat Ride at Kalametiya Senture"],
        meals: ["Breakfast"],
        accommodation: "Anantara Peace Haven",
      },
      {
        day: 13,
        title: "Galle",
        description:
          "Drive to Galle, making stops at the famous Coconut Hills in Mirissa and the stilt fishermen in Ahangama, two of the best Instagram-worthy moments for anyone visiting Sri Lanka. If the weather permits, you can even get onto the pole and try your hand at catching some fish.",
        activities: [
          "Transfer to Galle",
          "Visit Mirissa and Coconut Hills",
          "Visit Stilt Fishermen",
        ],
        meals: ["Breakfast"],
        accommodation: "Galle Fort Hotel",
      },
      {
        day: 14,
        title: "Galle",
        description:
          "In the late afternoon, we embark on a guided walk inside the Royal Dutch Fort in Galle. Explore the masterpiece architecture influenced by both Portuguese and Dutch styles. We conclude our stroll by savoring a sun downer cocktail while enjoying the stunning views overlooking the ramparts.",
        activities: [
          "Explore Galle Fort",
          "Visit Dutch Reformed Church",
          "Sundowners at Galle Fort",
        ],
        meals: ["Breakfast"],
        accommodation: "Galle Fort Hotel",
      },
    ],
    bestTime: "December to March",
    difficulty: "Easy",
  },
  {
    id: 16,
    title: "Sri Lanka 7 Days of Love and Adventure",
    location: "Negombo,Kandy,Hatton,Galle",
    duration: "7 Days",
    groupSize: "Family",
    rating: 4.9,
    price: "From $499",
    images: [
      "/images/kandy.jpg",
      "/images/Sigiriya.jpg",
      "/images/unawatuna.jpg",
    ],
    highlights: ["Kandy", "Hatton", "Beach"],
    description:
      "Embark on a romantic 7-day honeymoon journey through Sri Lanka's most enchanting destinations. From the tranquil beaches of Negombo to the cultural heart of Kandy, the tea plantations of Hatton, and the historic charm of Galle, explore the intricacies of Sri Lanka as you revel in the presence of your lover.",
    itinerary: [
      {
        day: 1,
        title: "Negombo",
        description:
          "Arrive at BIA and transfer to Negombo for a relaxing sail on traditional fishing boats. Stroll hand-in-hand through St. Mary's Church and explore the charm of Grand Street, soaking in the local ambiance together. Enjoy a sundowner before ending the day.",
        activities: [
          "Arrival and transfer to Negombo",
          "Stroll through St. Mary's Church and Grand Street",
        ],
        meals: ["N/A"],
        accommodation: "Wallawwa ",
      },
      {
        day: 2,
        title: "Kandy",
        description:
          "Travel to Kandy, a city of romance and culture. Visit the sacred Temple of the Tooth, stroll around Kandy Lake, and explore the lush Royal Botanical Gardens. Enjoy a romantic evening at the Kandy Viewpoint, where you can share breathtaking sunset views together.",
        activities: [
          "Transfer to Kandy",
          "TVisit Temple of the Tooth",
          "Explore Kandy's hidden gems on a Guided Walk with a Local Storyteller",
        ],
        meals: ["Breakfast"],
        accommodation: "Kings Pavilion",
      },
      {
        day: 3,
        title: "Hatton",
        description:
          "Head to the picturesque town of Hatton, nestled in Sri Lanka’s tea country, as you share a scenic train ride through lush tea plantations and visit the historic Christ Church Earleigh together. Immerse yourselves in the tranquil surroundings and natural beauty of this romantic region.",
        activities: [
          "Transfer to Hatton",
          "Explore Hatton",
          "Enjoy a scenic Train Ride",
          "Visit Christ Church Warleigh",
        ],
        meals: ["Breakfast", "Lunch", "Dinner", "Beverages"],
        accommodation: "Ceylon Tea Trails",
      },
      {
        day: 4,
        title: "Hatton",
        description:
          "Experience a romantic private tea adventure and meet local tea pluckers together. Stroll hand in hand to the stunning Gartmore, waterfall, and enjoy the breathtaking views of the Bogawanthalawa Tea Valley",
        activities: [
          "Indulge in a Private Tea Experience",
          "Meet Tea Pluckers",
          "Visit St Clair's and Devon Waterfalls",
          "Explore the Bogawanthalawa Tea Valley",
        ],
        meals: ["Breakfast", "Lunch", "Dinner", "Beverages"],
        accommodation: "Ceylon Tea Trails",
      },

      {
        day: 5,
        title: "Galle",
        description:
          "Travel to the coastal city of Galle, known for its historic charm and colonial architecture. Explore the famous Galle Fort, walk along its ancient ramparts, and visit art galleries and boutiques. Savour fresh seafood by the ocean as you enjoy the vibrant atmosphere of this seaside town.",
        activities: [
          "Explore Galle Royal Dutch Fort",
          "Enjoy a Sundowner Cocktail while overlooking the Ramparts",
        ],
        meals: ["Breakfast"],
        accommodation: "Kahanda Kanda Hotel (Boutique Hotel)",
      },
      {
        day: 6,
        title: "Galle",
        description:
          "Relax at your hotel and enjoy some beach time together. Engage in a rejuvenating yoga and wellness session, or opt for whale watching and a cinnamon experience at Villa Mayurana for a touch of adventure and discovery. The day is all about creating core memories together.",
        activities: [
          "Enjoy some Beach Time",
          "Yoga and Wellness Session",
          "Optional Whale Watching",
          "Cinnamon Experience",
        ],
        meals: ["Breakfast"],
        accommodation: "Kahanda Kanda Hotel (Boutique Hotel)",
      },
    ],
    bestTime: "December to March",
    difficulty: "Moderate",
  },
];

export function ToursSection() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showTourDetails, setShowTourDetails] = useState(false);
  const [selectedTour, setSelectedTour] = useState<(typeof tours)[0] | null>(
    null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState<{
    [key: number]: number;
  }>({});

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const newIndex = { ...prev };
        tours.forEach((tour) => {
          newIndex[tour.id] = ((prev[tour.id] || 0) + 1) % tour.images.length;
        });
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleBookNow = (tour: (typeof tours)[0]) => {
    setSelectedTour(tour);
    setShowTourDetails(true);
  };

  return (
    <section id="tours" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-800 mb-3 sm:mb-4">
            Popular <span className="text-emerald-600">Tours</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            Discover Sri Lanka's most breathtaking destinations with our
            expertly crafted tours
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 50, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="h-full"
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group h-full flex flex-col">
                <motion.div
                  className="aspect-video relative overflow-hidden group/image"
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Image Carousel */}
                  <div className="relative w-full h-full">
                    {tour.images.map((image, imgIndex) => (
                      <motion.div
                        key={imgIndex}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${image})` }}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{
                          opacity:
                            (currentImageIndex[tour.id] || 0) === imgIndex
                              ? 1
                              : 0,
                          scale:
                            (currentImageIndex[tour.id] || 0) === imgIndex
                              ? 1
                              : 1.1,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut",
                        }}
                      />
                    ))}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover/image:bg-black/10 transition-colors duration-300"></div>

                    {/* Image Navigation Dots - Made larger for mobile */}
                    <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {tour.images.map((_, imgIndex) => (
                        <motion.button
                          key={imgIndex}
                          className={`w-2.5 h-2.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                            (currentImageIndex[tour.id] || 0) === imgIndex
                              ? "bg-white scale-125"
                              : "bg-white/50 hover:bg-white/75"
                          }`}
                          onClick={() =>
                            setCurrentImageIndex((prev) => ({
                              ...prev,
                              [tour.id]: imgIndex,
                            }))
                          }
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        />
                      ))}
                    </div>

                    {/* Price Badge */}
                    <Badge className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-emerald-600 z-10 text-xs sm:text-sm">
                      {tour.duration}
                    </Badge>

                    {/* Image Counter */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                      <span className="text-xs text-white font-medium">
                        {(currentImageIndex[tour.id] || 0) + 1}/
                        {tour.images.length}
                      </span>
                    </div>
                  </div>

                  {/* Navigation Arrows - Made larger and more touch-friendly for mobile */}
                  <button
                    className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 sm:p-2 opacity-0 group-hover/image:opacity-100 transition-all duration-300 z-10 touch-manipulation"
                    onClick={() =>
                      setCurrentImageIndex((prev) => ({
                        ...prev,
                        [tour.id]:
                          ((prev[tour.id] || 0) - 1 + tour.images.length) %
                          tour.images.length,
                      }))
                    }
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 sm:p-2 opacity-0 group-hover/image:opacity-100 transition-all duration-300 z-10 touch-manipulation"
                    onClick={() =>
                      setCurrentImageIndex((prev) => ({
                        ...prev,
                        [tour.id]:
                          ((prev[tour.id] || 0) + 1) % tour.images.length,
                      }))
                    }
                  >
                    <ChevronRight className="w-4 h-4 sm:w-4 sm:h-4" />
                  </button>
                </motion.div>

                <CardContent className="p-4 sm:p-6 flex-1 flex flex-col bg-slate-50">
                  <div className="space-y-3 sm:space-y-4 flex-1">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 line-clamp-2">
                        {tour.title}
                      </h3>
                      <div className="flex items-center text-slate-600 text-sm mb-2">
                        <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{tour.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                        <span>{tour.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {tour.highlights.slice(0, 3).map((highlight, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          {highlight}
                        </Badge>
                      ))}
                      {tour.highlights.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          +{tour.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <div className="flex flex-col xs:flex-row gap-2">
                      <Button
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-sm sm:text-base"
                        onClick={() => handleBookNow(tour)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-200 text-green-600 hover:bg-green-50 xs:w-auto w-full bg-transparent"
                        onClick={() =>
                          openWhatsApp(whatsappMessages.inquiry(tour.location))
                        }
                      >
                        <MessageCircle className="w-4 h-4 mr-1 sm:mr-2" />
                        <span className="xs:hidden sm:inline">Inquire</span>
                        <span className="hidden xs:inline sm:hidden">Chat</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quote Modal */}
        <QuoteModal
          isOpen={showQuoteModal}
          onClose={() => setShowQuoteModal(false)}
        />

        {/* Tour Details Modal */}
        {selectedTour && (
          <TourDetailsModal
            isOpen={showTourDetails}
            onClose={() => {
              setShowTourDetails(false);
              setSelectedTour(null);
            }}
            tour={selectedTour}
          />
        )}
      </div>
    </section>
  );
}
