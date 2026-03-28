export interface ArticleContent {
  id: number
  category: string
  date: string
  title: string
  subtitle?: string
  readTime: string
  convoyCode: string
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
        body: 'Winston Churchill called it “the dominating factor all through the war.” Without victory at sea, there would have been no D-Day, no liberation of Europe. And yet the Battle of the Atlantic — the longest and most decisive campaign of the Second World War — has never had a museum to call its own.\n\nThat changes in 2027.\n\nThe Battle of the Atlantic Story will open on the banks of the River Mersey in Birkenhead, becoming the world’s first museum dedicated entirely to this six-year struggle for control of the Atlantic Ocean. Situated with sweeping views of the Liverpool skyline, and just minutes from the legendary Western Approaches Command bunker where Allied victory was orchestrated, it’s a place with genuine historic roots and an extraordinary story to tell.',
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
}
