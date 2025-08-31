import Song from '../models/Song';

export const sampleSongs = [
  // Rock / Alternative
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    genre: "rock",
    year: 1975,
    durationSec: 355
  },
  {
    title: "Stairway to Heaven",
    artist: "Led Zeppelin", 
    album: "Led Zeppelin IV",
    genre: "rock",
    year: 1971,
    durationSec: 482
  },
  {
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    genre: "rock",
    year: 1976,
    durationSec: 391
  },
  {
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    album: "Appetite for Destruction",
    genre: "rock",
    year: 1987,
    durationSec: 356
  },
  {
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
    genre: "alternative",
    year: 1991,
    durationSec: 301
  },
  {
    title: "Come As You Are",
    artist: "Nirvana",
    album: "Nevermind", 
    genre: "alternative",
    year: 1991,
    durationSec: 219
  },
  {
    title: "Creep",
    artist: "Radiohead",
    album: "Pablo Honey",
    genre: "alternative",
    year: 1992,
    durationSec: 238
  },

  // Pop
  {
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    genre: "pop",
    year: 1982,
    durationSec: 294
  },
  {
    title: "Beat It",
    artist: "Michael Jackson",
    album: "Thriller",
    genre: "pop", 
    year: 1982,
    durationSec: 258
  },
  {
    title: "Like a Virgin",
    artist: "Madonna",
    album: "Like a Virgin",
    genre: "pop",
    year: 1984,
    durationSec: 219
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    album: "÷ (Divide)",
    genre: "pop",
    year: 2017,
    durationSec: 233
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    genre: "pop",
    year: 2020,
    durationSec: 200
  },

  // Hip-Hop / Rap
  {
    title: "Lose Yourself",
    artist: "Eminem",
    album: "8 Mile Soundtrack",
    genre: "hip-hop",
    year: 2002,
    durationSec: 326
  },
  {
    title: "HUMBLE.",
    artist: "Kendrick Lamar",
    album: "DAMN.",
    genre: "hip-hop",
    year: 2017,
    durationSec: 177
  },
  {
    title: "God's Plan",
    artist: "Drake",
    album: "Scorpion",
    genre: "hip-hop",
    year: 2018,
    durationSec: 198
  },
  {
    title: "Stronger",
    artist: "Kanye West",
    album: "Graduation",
    genre: "hip-hop",
    year: 2007,
    durationSec: 311
  },

  // Electronic / Dance
  {
    title: "One More Time",
    artist: "Daft Punk",
    album: "Discovery",
    genre: "electronic",
    year: 2000,
    durationSec: 320
  },
  {
    title: "Titanium",
    artist: "David Guetta",
    album: "Nothing but the Beat",
    genre: "electronic",
    year: 2011,
    durationSec: 245
  },
  {
    title: "Levels",
    artist: "Avicii",
    album: "True",
    genre: "electronic",
    year: 2011,
    durationSec: 203
  },
  {
    title: "Clarity",
    artist: "Zedd",
    album: "Clarity",
    genre: "electronic",
    year: 2012,
    durationSec: 271
  },

  // Jazz
  {
    title: "Take Five",
    artist: "Dave Brubeck Quartet",
    album: "Time Out",
    genre: "jazz",
    year: 1959,
    durationSec: 324
  },
  {
    title: "Kind of Blue",
    artist: "Miles Davis",
    album: "Kind of Blue",
    genre: "jazz",
    year: 1959,
    durationSec: 462
  },
  {
    title: "Summertime",
    artist: "Ella Fitzgerald",
    album: "Porgy and Bess",
    genre: "jazz",
    year: 1957,
    durationSec: 258
  },

  // Classical
  {
    title: "Symphony No. 9",
    artist: "Ludwig van Beethoven",
    album: "Beethoven: The Complete Symphonies",
    genre: "classical",
    year: 1824,
    durationSec: 4080
  },
  {
    title: "Clair de Lune",
    artist: "Claude Debussy",
    album: "Suite Bergamasque",
    genre: "classical",
    year: 1905,
    durationSec: 300
  },

  // R&B / Soul
  {
    title: "Respect",
    artist: "Aretha Franklin",
    album: "I Never Loved a Man the Way I Love You",
    genre: "r&b",
    year: 1967,
    durationSec: 148
  },
  {
    title: "Superstition",
    artist: "Stevie Wonder",
    album: "Talking Book",
    genre: "r&b",
    year: 1972,
    durationSec: 245
  },
  {
    title: "Crazy in Love",
    artist: "Beyoncé",
    album: "Dangerously in Love",
    genre: "r&b",
    year: 2003,
    durationSec: 236
  },

  // Country
  {
    title: "Friends in Low Places",
    artist: "Garth Brooks",
    album: "No Fences",
    genre: "country",
    year: 1990,
    durationSec: 260
  },
  {
    title: "Jolene",
    artist: "Dolly Parton",
    album: "Jolene",
    genre: "country",
    year: 1973,
    durationSec: 162
  },
  {
    title: "Old Town Road",
    artist: "Lil Nas X",
    album: "7 EP",
    genre: "country",
    year: 2019,
    durationSec: 113
  },

  // Reggae
  {
    title: "No Woman No Cry",
    artist: "Bob Marley & The Wailers",
    album: "Live!",
    genre: "reggae",
    year: 1975,
    durationSec: 426
  },
  {
    title: "Three Little Birds",
    artist: "Bob Marley & The Wailers",
    album: "Exodus",
    genre: "reggae",
    year: 1977,
    durationSec: 179
  },

  // Blues
  {
    title: "The Thrill Is Gone",
    artist: "B.B. King",
    album: "Completely Well",
    genre: "blues",
    year: 1969,
    durationSec: 308
  },
  {
    title: "Pride and Joy",
    artist: "Stevie Ray Vaughan",
    album: "Texas Flood",
    genre: "blues",
    year: 1983,
    durationSec: 218
  },

  // Indie
  {
    title: "Mr. Brightside",
    artist: "The Killers",
    album: "Hot Fuss",
    genre: "indie",
    year: 2003,
    durationSec: 222
  },
  {
    title: "Somebody That I Used to Know",
    artist: "Gotye",
    album: "Making Mirrors",
    genre: "indie",
    year: 2011,
    durationSec: 244
  },
  {
    title: "Pumped Up Kicks",
    artist: "Foster the People",
    album: "Torches",
    genre: "indie",
    year: 2010,
    durationSec: 239
  },

  // World Music
  {
    title: "Despacito",
    artist: "Luis Fonsi",
    album: "Vida",
    genre: "latin",
    year: 2017,
    durationSec: 229
  },
  {
    title: "Bambaataa",
    artist: "Shawn Mendes",
    album: "Illuminate",
    genre: "latin",
    year: 2016,
    durationSec: 195
  }
];

export async function seedSongs() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing songs
    const existingCount = await Song.countDocuments();
    if (existingCount > 0) {
      console.log(`🗑️  Clearing ${existingCount} existing songs...`);
      await Song.deleteMany({});
    }

    // Insert sample songs
    console.log(`📀 Inserting ${sampleSongs.length} sample songs...`);
    const insertedSongs = await Song.insertMany(sampleSongs);
    
    console.log(`✅ Successfully seeded ${insertedSongs.length} songs!`);
    
    // Display summary statistics
    const stats = await generateSeedStats();
    console.log('\n📊 Seeding Summary:');
    console.log(`Total Songs: ${stats.totalSongs}`);
    console.log(`Artists: ${stats.totalArtists}`);
    console.log(`Albums: ${stats.totalAlbums}`);
    console.log(`Genres: ${stats.totalGenres}`);
    console.log('\n🎵 Genre Distribution:');
    stats.genreDistribution.forEach(({ genre, count }) => {
      console.log(`  ${genre}: ${count} songs`);
    });
    
    return insertedSongs;
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

async function generateSeedStats() {
  const totalSongs = await Song.countDocuments();
  const artists = await Song.distinct('artist');
  const albums = await Song.distinct('album');
  const genres = await Song.distinct('genre');
  
  const genreDistribution = await Song.aggregate([
    { $group: { _id: '$genre', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $project: { _id: 0, genre: '$_id', count: 1 } }
  ]);

  return {
    totalSongs,
    totalArtists: artists.length,
    totalAlbums: albums.length,
    totalGenres: genres.length,
    genreDistribution
  };
}
