export interface ArticleContent {
  id: number
  category: string
  date: string
  title: string
  subtitle?: string
  readTime: string
  convoyCode: string
  image?: string
  imageAlt?: string
  sections: { heading?: string; body: string }[]
}

export const articleContent: Record<number, ArticleContent> = {
  10: {
    id: 10,
    category: 'museum',
    date: 'March 2026',
    title: 'The World’s First Museum Dedicated to the Battle of the Atlantic is Coming to Birkenhead',
    subtitle: 'Opening Spring 2027 and it tells a story the world has never properly heard',
    readTime: '12 min read',
    convoyCode: 'BA 27',
    sections: [
      {
        body: 'Winston Churchill called it “the dominating factor all through the war.” Without victory at sea, there would have been no D-Day, no liberation of Europe. And yet the Battle of the Atlantic - the longest and most decisive campaign of the Second World War - has never had a museum to call its own.\n\nThat changes in 2027.\n\nThe Battle of the Atlantic Story will open on the banks of the River Mersey in Birkenhead, becoming the world’s first museum dedicated entirely to this six-year struggle for control of the Atlantic Ocean. Situated with sweeping views of the Liverpool skyline, and just minutes from the legendary Western Approaches Command bunker where Allied victory was orchestrated, it’s a place with genuine historic roots and an extraordinary story to tell.',
      },
      {
        heading: 'Why Birkenhead?',
        body: 'Few places on earth were more central to the Battle of the Atlantic than the banks of the Mersey. Liverpool’s docks were among the largest in the world, serving as the gateway for Allied convoys heading into the Atlantic. Across the water, Birkenhead’s Cammell Laird shipyards worked around the clock building and repairing the vessels that kept Britain’s lifeline open. No area outside London was bombed as heavily, and yet the people here kept the supply lines flowing.\n\nAt the heart of this effort stood Western Approaches Command, the underground bunker in Liverpool from which the entire Allied convoy strategy was directed. Historians have suggested it may have been the single most important building in determining the outcome of the war. Today it survives as a museum, and the new Battle of the Atlantic Story, just ten minutes away by car or a scenic Mersey Ferry ride, will sit alongside it as its natural companion.',
      },
      {
        heading: 'The Centrepiece: U-534',
        body: 'At the heart of the museum stands something truly remarkable: U-534, one of only four surviving U-boats from the Second World War, and the only one ever raised from the seabed after being sunk in combat.\n\nU-534 was commissioned in December 1942 and served under Kapitänleutnant Herbert Nollau. It never sank an Allied ship. By the time it was operational, the tide of war had already begun to turn. Its end came on 5 May 1945, just days before Germany’s surrender, when British RAF aircraft intercepted it in the Kattegat. Depth charges sent it to the bottom. Remarkably, 49 of its 52 crew members survived.\n\nFor nearly five decades it lay on the seabed. Then, in 1993, it was raised: a perfectly preserved time capsule from the final days of the war. Cut into sections and brought to Birkenhead, U-534 now carries with it an extraordinary archive of letters, diaries, personal items, games, records, even a cocktail shaker and a pair of tropical shorts. Together, these objects paint an intimate picture of life aboard a U-boat that no other museum can offer.',
      },
      {
        heading: 'What Visitors Will Experience',
        body: 'The museum tells the Battle of the Atlantic from every angle, Allied and Axis, strategic and deeply personal, across eight interconnected zones.\n\nZone 1: Nature of the Conflict opens with an immersive projected film that introduces the Battle through the lens of U-534 itself. Why is there a U-boat here? What was the Battle of the Atlantic? What role did Merseyside play? Visitors will discover the answers through film, setworks, and a compelling opening to the story.\n\nZone 2: Supply Lines takes visitors to the heart of the convoy system, the Allied response to the U-boat threat. A large animated map of the Atlantic shows shipping routes, U-boat activity, and the scale of operations. Displays explore the Merchant Navy, the vital cargo that kept Britain alive, the international crews who sailed from Merseyside, and the shipbuilders who made it all possible. Interactive exhibits include a convoy game, an ensign flag activity, and a model-building table.\n\nZone 3: Warfare at Sea explores the evolving technologies and tactics that gradually turned the tide, including depth charges, aerial patrols, and naval tactics pioneered by legendary figures like Captain Johnnie Walker. Visitors can try depth charge simulations, look through a “sight spider” to spot aircraft silhouettes, and hear first-hand testimonies from both Allied and Axis crew members.\n\nZone 4: Signals and Stealth dives into the intelligence war: radar, sonar, Huff Duff radio triangulation, and the breaking of Enigma. Retro-styled interactive stations let visitors try each detection method themselves, and the zone reveals how these breakthroughs stripped U-boats of their greatest weapon, invisibility.\n\nZone 5: Life Under the Sea is perhaps the most intimate zone of all, reconstructing daily life aboard U-534 through the personal objects recovered from the wreck. Visitors can explore the cramped crew quarters (each sailor had roughly one square metre of personal space), try their hand at operating an Enigma machine, hear letters from home read aloud, play the crew’s own board games, and choose records to play on an interactive radio station, all inspired by items found on board.\n\nZone 6: The Sinking takes visitors outside onto a viewing platform overlooking the wreck, where panel displays and personal testimonies recount U-534’s final hours on 5 May 1945. Visitors can look through a cockpit-style installation to experience what the Allied Liberator pilots saw as they made their attack runs.\n\nZone 7: The Wreck lets visitors walk among the sections of U-534 itself, exploring the control room, diesel engine room, torpedo room, and crew quarters. Interactive interpretation stations recreate navigation by periscope, communication through speaking tubes, and the technical systems that kept the submarine operational. A Grumman Avenger aircraft is also on display, showing how Allied air power helped close the mid-Atlantic gap.\n\nZone 8: Legacy and Lab brings the story full circle, from the seabed discovery in 1993 to the ongoing research into the objects found on board. Curated displays showcase the collection, including its more unexpected items, and changeable display units give academics and local community groups the opportunity to share their own discoveries and perspectives.',
      },
      {
        heading: 'A Phased Vision',
        body: 'The museum opens its doors in Spring 2027, the first phase of a three-stage development. By 2028, public artworks commissioned for the surrounding gardens will add a creative and emotional dimension to the visitor journey. By 2029, a planned expansion of the building will introduce new galleries and more advanced installations.\n\nLooking further ahead, there are ambitions to bring a historic Second World War vessel to the Mersey, potentially HMS Whimbrel, a Black Swan-class sloop that escorted over 100 Atlantic convoys, currently preserved in Alexandria, creating a truly immersive, multi-site experience comparable to HMS Belfast in London, but rooted in the place where the real decisions were made.',
      },
      {
        heading: 'A Story Worth Telling',
        body: 'In the words of John Dennett, a Royal Navy veteran who crossed the Atlantic repeatedly from the age of seventeen:\n\n“This museum is more than a memorial. It’s a call for understanding, a testament to peace, and a tribute to those who never came home.”\n\nEach year, fewer survivors remain to tell these stories. The Battle of the Atlantic Story exists to ensure their voices, and the voices of the young German sailors who faced them across the water, are never lost.\n\nThe museum is supported by £3 million from the UK Government, backing from the Naval Club Charitable Trust, and founding sponsorship from the Betty Wold Johnson Foundation.\n\nThe Battle of the Atlantic Story opens Spring 2027 in Birkenhead, on the banks of the River Mersey. For more information on visiting, partnerships, or supporting the project, get in touch.',
      },
    ],
  },
  11: {
    id: 11,
    category: 'memorial',
    date: 'July 2026',
    title: 'Pier Head Memorial Service to Honour WWII Naval Hero Captain Johnnie Walker',
    subtitle: 'Annual service marks 82 years since the death of the Royal Navy’s most successful anti-submarine commander',
    readTime: '5 min read',
    convoyCode: 'JW 82',
    image: '/images/captain-johnnie-walker.jpg',
    imageAlt: 'Captain Frederic "Johnnie" Walker, Royal Navy, in 1944',
    sections: [
      {
        body: 'Big Heritage will host a memorial service to honour Captain Frederic John “Johnnie” Walker at 11am on Thursday 9th July at his statue located on Liverpool’s Pier Head.\n\nThe annual service will this year mark 82 years since Captain Walker passed away in 1944 and honours his incredible contributions to Britain’s naval efforts during the Battle of the Atlantic, the longest sea campaign in the Second World War.',
      },
      {
        heading: 'Britain’s Greatest U-Boat Hunter',
        body: 'Captain Walker was one of the Royal Navy’s most successful anti-submarine commanders. His development of tactics and techniques to protect vital convoy routes through the Atlantic helped shape modern anti-submarine warfare, and he is widely recognised as a key figure in securing Allied success at sea.',
      },
      {
        heading: 'Who Will Attend',
        body: 'In attendance at the service will be several prominent figures who will lay wreaths in his honour, including Councillor William Shortall, Lord Mayor of Liverpool; Commander Richard Fletcher of HMS Eaglet; and Lord Derby, Edward Stanley, representing the Lord Lieutenant.\n\nIn addition, they will be joined by Captain Walker’s granddaughter, Jane Hedger, as well as Big Heritage employees, including CEO Dean Paton.\n\nThe Royal Northern College of Music will provide a trumpeter for the service to play the opening notes of the Last Post, while flag bearers will also provide their services.',
      },
      {
        heading: 'A Legacy Worth Protecting',
        body: 'Dean Paton, CEO of Big Heritage, said: “Captain Johnnie Walker’s leadership and bravery played a critical role in protecting the lifeline of Britain during the Second World War.\n\n“This annual service is an important opportunity to reflect on his legacy, honour his achievements and ensure that future generations understand the significance of the Battle of the Atlantic and those who fought in it.”',
      },
      {
        heading: 'The Grandfather She Never Knew',
        body: 'Captain Walker’s granddaughter, Jane, added: “My grandfather’s memorial is an event of mixed emotions. It fills me with pride but is also tinged with sadness.\n\n“He died almost 25 years before I was born, at the age of just 48. For me it is the meeting point of history and family and connecting with the grandfather I never knew. We’re not just honouring one person but remembering everyone who was a part of the war. Captain Walker was my grandfather but everyone will have a relative or a connection to somebody else who was involved. Their actions and the sacrifices they made have profoundly impacted our lives.\n\n“Memorial services matter because they remind us that history is made by ordinary people who are asked to do extraordinary things. They are not only about looking back but about understanding the values that carried people through difficult times through duty, courage, service and a willingness to put others before themselves.\n\n“I am enormously proud of my Grandfather, proud of what he achieved, grateful for what he did but wishing I could have met the man behind the medals and the memorial. He showed that one person, through commitment, courage and service, can make a difference far beyond their own lifetime. The freedoms we enjoy today were shaped by the efforts of people like him. To know that he played a part in that and that people still remember him more than eighty years later fills me with gratitude as much as pride.”',
      },
      {
        heading: 'Attending the Service',
        body: 'Members of the public are welcome to attend to show their respects. Attendees are advised to arrive at least 15 minutes before the service begins, at Captain Walker’s statue on Liverpool’s Pier Head.\n\nFor more information, visit the Western Approaches website (liverpoolwarmuseum.co.uk) or the Battle of the Atlantic museum website (battleoftheatlantic.org).',
      },
    ],
  },
}
