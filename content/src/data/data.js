// const genres = [
//   "Action",
//   "Comedy",
//   "Fantasy",
//   "Detective",
//   "Horror",
//   "Animation",
// ];

// const listMovieNames = [
//   "Top picks for Movie",
//   "Movies for your friend Steve",
//   "Kid-Friendly Movies",
//   "Action Movies",
//   "Documentariy Movies",
//   "Classic Movies",
// ];
// const listSeriesNames = [
//   "Top Series",
//   "Crime Series",
//   "Sci-Fi Series",
//   "Reality Series",
//   "Sitcoms",
//   "Period Series",
// ];
const data = {
  content: [
    {
      title: "Inception",
      description:
        "Inception is a 2010 science fiction action film written, co-produced, and directed by Christopher Nolan, and co-produced by Emma Thomas. The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets.",
      img: "https://bfoggdmu.files.wordpress.com/2012/10/zz22344f92.jpg",
      imgTitle:
        "https://www.pngmart.com/files/22/Inception-PNG-HD-Isolated.png",
      imgThumb:
        "https://collider.com/wp-content/uploads/inception_movie_poster_banner_03.jpg",
      imgVertical:
        "https://m.media-amazon.com/images/M/MV5BZGFjOTRiYjgtYjEzMS00ZjQ2LTkzY2YtOGQ0NDI2NTVjOGFmXkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_.jpg",
      trailer: "https://youtu.be/YoHD9XEInc0",
      movie: "https://youtu.be/YoHD9XEInc0",
      duration: "2 hours 18 min",
      year: "2010",
      limit: "15",
      genre: "Action",
      isSeries: false,
    },
    {
      title: "The Dark Knight",
      description:
        "The Dark Knight is a 2008 superhero film directed, co-produced, and co-written by Christopher Nolan. Based on the DC Comics character Batman, the film is the second installment of Nolan's The Dark Knight Trilogy and a sequel to 2005's Batman Begins, starring an ensemble cast including Christian Bale, Michael Caine, Heath Ledger, Gary Oldman, Aaron Eckhart, Maggie Gyllenhaal and Morgan Freeman.",
      img: "https://i.ebayimg.com/images/g/C4QAAOSwjXljz0Mn/s-l1600.jpg",
      imgTitle:
        "https://www.pngmart.com/files/22/The-Dark-Knight-PNG-Photos.png",
      imgThumb:
        "https://preview.redd.it/vedjoch1jv651.jpg?width=640&crop=smart&auto=webp&s=28a95089e9b8352cc163a047fd6f8f6c099cf317",
      imgVertical:
        "https://www.hcinema.org.il/wp-content/uploads/2022/03/the-dark-knight-poster-1.jpg",
      trailer: "https://youtu.be/EXeTwQWrcwY",
      movie: "https://youtu.be/EXeTwQWrcwY",
      duration: "2 hours 32 min",
      year: "2008",
      limit: "15",
      genre: "Action",
      isSeries: false,
    },

    {
      title: "The Revenant",
      description:
        "The Revenant is a 2015 American semi-biographical epic western film directed by Alejandro G. Iñárritu. The screenplay by Mark L. Smith and Iñárritu is based in part on Michael Punke`s 2002 novel of the same name, describing frontiersman Hugh Glass`s experiences in 1823.",
      img: "https://www.indiewire.com/wp-content/uploads/2016/06/the-revenant.jpg",
      imgTitle:
        "https://images.squarespace-cdn.com/content/v1/5bfdc74875f9ee194f3e0add/1596652890102-76FXS415ATRW83ANRXXK/the-revenant-563b02dac00e3.png",
      imgThumb:
        "https://variety.com/wp-content/uploads/2013/07/the-revenant-movie-reivew-2.jpg",
      imgVertical: "https://m.media-amazon.com/images/I/A1BjliXNDPL.jpg",
      trailer: "https://youtu.be/LoebZZ8K5N0",
      movie: "https://youtu.be/LoebZZ8K5N0",
      duration: "1 hour 15 min",
      year: "2015",
      limit: "15",
      genre: "Action",
      isSeries: false,
    },
    {
      title: "Paranormal Activity",
      description:
        "Paranormal Activity is a 2007 American found footage supernatural horror film written, co-produced, photographed, edited, and directed by Oren Peli. It centers on a young couple (Katie Featherston and Micah Sloat) who are haunted by a supernatural presence in their home.",
      img: "https://play-lh.googleusercontent.com/proxy/rOpTB8x4WAFqypqYby_aAl0tcO_lfE6yzDUjOH_pKLu-bI3xtND7urtpretofC831ZST57_VYMoSQWaJok9dGoOklMrr__lKCuYNUSg0bwHCcIagNG_FBDU=s1280-w1280-h720",
      imgTitle:
        "https://occ-0-41-116.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABVe73xzWZ0nvqPp5xT0MDFvr60TBka9yON1uOW-ibDdCwopWsOj0Ii9gSRnS4Av9a3B48zrzG4a5bElE5laoq8ZrQ0DcXgLXG_Stm51JfpNB.png?r=425",
      imgThumb: "https://ichef.bbci.co.uk/images/ic/640x360/p07rv1xs.jpg",
      imgVertical: "https://m.media-amazon.com/images/I/71SH1ZPPIZL.jpg",
      trailer: "https://youtu.be/F_UxLEqd074",
      movie: "https://youtu.be/F_UxLEqd074",
      duration: "1 hour 12 min",
      year: "2007",
      limit: "18",
      genre: "Horror",
      isSeries: false,
    },

    {
      title: "Friday the 13th",
      description:
        "Friday the 13th is a 1980 American slasher film directed by Sean S. Cunningham and written by Victor Miller. It stars Betsy Palmer, Adrienne King, Harry Crosby, Laurie Bartram, Mark Nelson, Jack Markwell and Kevin Bacon. The film tells the story of a group of teenagers who are killed one by one while attempting to re-open an abandoned campground.",
      img: "https://i0.wp.com/techtelegraph.co.uk/wp-content/uploads/2022/05/friday-the-13th-slasher.jpg?fit=%2C&ssl=1",
      imgTitle:
        "https://www.grindhousedatabase.com/images/thumb/F135top.png/750px-F135top.png",
      imgThumb:
        "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/f/friday-the-13th-the-game-ultimate-slasher-edition-switch/hero",
      imgVertical:
        "https://cdn.europosters.eu/image/1300/art-photo/friday-the-13th-blockbuster-i112337.jpg",
      trailer: "https://youtu.be/aDrOvFtzyPQ",
      movie: "https://youtu.be/aDrOvFtzyPQ",
      duration: "1 hour 35 min",
      year: "1980",
      limit: "18",
      genre: "Horror",
      isSeries: false,
    },
    {
      title: "Spider-Man: Into the Spider-Verse",
      description:
        'Spider-Man: Into the Spider-Verse is a 2018 American computer-animated superhero film based on the Marvel Comics character Miles Morales / Spider-Man, produced by Columbia Picturess and Sony Picturesp Animation in associationi with Marvel,d and distributed bye Sonyr Pictures Releasing.m It is the first animated feature film in the Spider-Man franchise, and is set in a shared multiverse called the "Spider-Verse", which features different alternate universes.',
      img: "https://images8.alphacoders.com/929/thumb-1920-929202.jpg",
      imgTitle:
        "https://www.pngmart.com/files/12/Spider-Man-Into-The-Spider-Verse-Logo-PNG-Clipart.png",
      imgThumb:
        "https://m.media-amazon.com/images/M/MV5BOTFlZTA4YjUtYzY3Zi00Mzc2LTllNzAtYjI2ZWNiMGZkZjE2XkEyXkFqcGdeQW1yb3NzZXI@._V1_QL75_UY281_CR86,0,500,281_.jpg",
      imgVertical: "https://cdn.marvel.com/content/2x/MilesPoster.jpg",
      trailer: "https://youtu.be/g4Hbz2jLxvQ",
      movie: "https://youtu.be/g4Hbz2jLxvQ",
      duration: "1 hour 57 min",
      year: "2018",
      limit: "13",
      genre: "Animation",
      isSeries: false,
    },

    {
      title: "Seven Kings Must Die",
      description:
        "Seven Kings Must Die is a 2019 American action-adventure film directed by John Woo and starring Keanu Reeves, Michael Caine, and John Malkovich. The film follows a group of warriors as they attempt to stop a mysterious dark force from destroying the world. The film is set in a fantasy universe, and was released in the United States on March 15, 2019.",
      img: "https://www.denofgeek.com/wp-content/uploads/2023/04/The-Last-Kingdom-Seven-Kings-Must-Die.jpg?fit=1200%2C675",
      imgTitle:
        "https://dnm.nflximg.net/api/v6/S4oi7EPZbv2UEPaukW54OORa0S8/AAAABbPGVhhNiv-uNFQF4_4epf7cHyQ1ZTByPKz2ESVU0jcMoxjjyaT1veVvour43ALVhE9yoVJ8MdF5M14HhNNTfeBnGkn9j5QKQag.png?r=204",
      imgThumb:
        "https://occ-0-769-590.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZKJpdcSuvqwGBxBJNKVRze0JWHe9phJW6L1xaiqvLePPRKhRis-7FHr69URHZIYXqUVus0HIoz_3fLZPQr3VVqGGzRNlDoNkPwp.jpg?r=72d",
      imgVertical:
        "https://m.media-amazon.com/images/M/MV5BOTlmNGE0ZGMtMzdkMC00MjQyLWI1ZjgtZTIxODAyNWJlZDFlXkEyXkFqcGdeQXVyNTQ4ODM2NjM@._V1_FMjpg_UX1000_.jpg",
      trailer: "https://youtu.be/J2uW5ehHqjc",
      movie: "https://youtu.be/J2uW5ehHqjc",
      duration: "2 hours 10 min",
      year: "2019",
      limit: "15",
      genre: "Action",
      isSeries: false,
    },
    {
      title: "Brave",
      description:
        "Brave is a 2012 American 3D computer-animated fantasy comedy-drama adventure film produced by Pixar Animation Studios and released by Walt Disney Pictures. It was directed by Mark Andrews and Brenda Chapman and co-directed by Steve Purcell. The story is by Chapman, with the screenplay by Andrews, Purcell, Chapman and Irene Mecchi.",
      img: "https://media.npr.org/assets/img/2012/06/19/b23_10bpub.pub16.170_wide-a5bd92b0ba06a0f7da009e797c51f69bae8ee023.jpg",
      imgTitle:
        "https://i.pinimg.com/originals/9e/b2/32/9eb2327de3d6f3a73add59e23ebd0d7f.png",
      imgThumb:
        "https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/03/brave-movie.jpg",
      imgVertical:
        "https://m.media-amazon.com/images/M/MV5BMzgwODk3ODA1NF5BMl5BanBnXkFtZTcwNjU3NjQ0Nw@@._V1_.jpg",
      movie: "https://youtu.be/TEHWDA_6e3M",
      trailer: "https://youtu.be/TEHWDA_6e3M",
      duration: "1 hour 40 min",
      year: "2012",
      limit: "8",
      genre: "Animation",
      isSeries: false,
    },
    {
      title: "Fight Club",
      description: `Fight Club is a 1999 American film directed by David Fincher and starring Edward Norton, Brad Pitt, and Helena Bonham Carter. It follows an unnamed narrator who forms an underground fight club with Tyler Durden, a soap maker. The film's supporting cast includes Meat Loaf, Jared Leto, and Eion Bailey. The film's plot is based on the 1996 novel of the same name by Chuck Palahniuk.`,
      img: "https://media.newyorker.com/photos/5dbafcc91b4a6700085a7a9b/master/w_2560%2Cc_limit/Baker-FightClub.jpg",
      imgThumb:
        "https://www.slantmagazine.com/wp-content/uploads/2009/11/fightclub.jpg",
      imgVertical:
        "https://i.etsystatic.com/18242346/r/il/c9908e/2412674268/il_fullxfull.2412674268_1sgm.jpg",
      imgTitle: "https://www.pngmart.com/files/22/Fight-Club-PNG-HD.png",
      trailer: "https://youtu.be/O1nDozs-LxI",
      movie: "https://youtu.be/O1nDozs-LxI",
      duration: "2 hour 16 min",
      year: "1999",
      limit: "18",
      genre: "Detective",
      isSeries: false,
    },

    {
      title: "Scott Pilgrim vs. the World",
      description:
        "Scott Pilgrim vs. the World is a 2010 action comedy film co-written, produced, and directed by Edgar Wright, based on the graphic novel series Scott Pilgrim by Bryan Lee O'Malley. It stars Michael Cera as Scott Pilgrim, a slacker musician who must win a competition to get a record deal and battle the seven evil exes of his newest girlfriend Ramona Flowers, played by Mary Elizabeth Winstead.",
      img: "https://media.vanityfair.com/photos/5f298aa4ad09aa418d20429f/master/w_2560%2Cc_limit/shutterstock_editorial_5885820am.jpg",
      imgTitle:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Scott_Pilgrim_vs_the_World_Wordmark.svg/1280px-Scott_Pilgrim_vs_the_World_Wordmark.svg.png",
      imgThumb: "https://i.ytimg.com/vi/7wd5KEaOtm4/maxresdefault.jpg",
      imgVertical:
        "https://static.metacritic.com/images/products/movies/3/524cfbd8dd5a2c4a96d99d80d70716fc.jpg",
      trailer: "https://youtu.be/7wd5KEaOtm4",
      movie: "https://youtu.be/7wd5KEaOtm4",
      duration: "1 hour 52 min",
      year: "2010",
      limit: "13",
      genre: "Comedy",
      isSeries: false,
    },
    {
      title: "Shrek",
      description:
        "Shrek is an animated comedy film about a grumpy ogre named Shrek who embarks on a quest to rescue a princess and reclaim his swamp. With the help of a talkative donkey, Shrek encounters humorous challenges and unexpected friendships along the way. The movie cleverly subverts fairytale tropes while delivering a heartwarming message about self-acceptance and the importance of looking beyond appearances.",
      img: "https://images.alphacoders.com/519/thumb-1920-519107.jpg",
      imgTitle: "https://pngimg.com/d/shrek_PNG24.png",
      imgThumb:
        "https://img2.hulu.com/user/v3/artwork/36c01be2-e036-46d9-9da2-522bfd12b54f?base_image_bucket_name=image_manager&base_image=42eab101-f1c7-4661-9c4e-b6d2a2dfea41&region=US&format=jpeg&size=952x536",
      imgVertical:
        "https://www.themoviedb.org/t/p/w500/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
      trailer: "https://youtu.be/CwXOrWvPBPk",
      movie: "https://youtu.be/CwXOrWvPBPk",
      duration: "1 hour 32 min",
      year: "2001",
      limit: "13",
      genre: "Animation",
      isSeries: false,
    },
    {
      title: "Priest",
      description:
        "Priest is a 2011 American post-apocalyptic dystopian science fiction action horror film starring Paul Bettany as the title character. The film, directed by Scott Stewart, is loosely based on the Korean comic of the same name by Hyung Min-woo. The film also stars Karl Urban, Cam Gigandet, Maggie Q, Stephen Moyer, Lily Collins, and Brad Dourif.",
      img: "https://cdn.kpbs.org/img/photos/2011/05/13/DF-07850.jpg",
      imgTitle: "https://images.fanart.tv/fanart/priest-51ded5c2ef023.png",
      imgThumb:
        "https://m.media-amazon.com/images/S/pv-target-images/401ca3e58039de9128b37dabf50ded0f1cd2b2c626e116f8d47d235abdf617b9._UR1920,1080_.jpg",
      imgVertical:
        "https://images.moviesanywhere.com/4605e276d787283db68b15bb094dafc5/6168c408-c8ef-4661-9829-3193386f2b59.jpg",
      trailer: "https://youtu.be/-VNczhWD2ao",
      movie: "https://youtu.be/-VNczhWD2ao",
      duration: "1 hour 27 min",
      year: "2011",
      limit: "18",
      genre: "Horror",
      isSeries: false,
    },
    {
      title: "Avatar",
      description:
        "Avatar is a 2009 American epic science fiction film directed, written, produced, and co-edited by James Cameron, and stars Sam Worthington, Zoe Saldana, Stephen Lang, Michelle Rodriguez, and Sigourney Weaver. The film is set in the mid-22nd century, when humans are colonizing Pandora, a lush habitable moon of a gas giant in the Alpha Centauri star system, in order to mine the mineral unobtanium, a room-temperature superconductor. The expansion of the mining colony threatens the continued existence of a local tribe of Na'vi – a humanoid species indigenous to Pandora.",
      img: "https://variety.com/wp-content/uploads/2022/12/Main-thumb.jpg",
      imgTitle:
        "https://www.pngmart.com/files/15/Avatar-Logo-Transparent-PNG.png",
      imgThumb:
        "https://c4.wallpaperflare.com/wallpaper/810/33/235/movies-avatar-1680x1050-entertainment-movies-hd-art-wallpaper-preview.jpg",
      imgVertical:
        "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg",
      trailer: "https://youtu.be/CM79GTEm2ps",
      movie: "https://youtu.be/CM79GTEm2ps",
      duration: "2 hours 42 min",
      year: "2009",
      limit: "12",
      genre: "Fantasy",
      isSeries: false,
    },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      description: `The Lord of the Rings: The Fellowship of the Ring is a 2001 epic fantasy adventure film directed by Peter Jackson, based on the first volume of J. R. R. Tolkien's The Lord of the Rings. The film is the first installment in The Lord of the Rings trilogy and was produced by Barrie M. Osborne, Fran Walsh, and Jackson, and written by Walsh, Philippa Boyens, and Jackson.`,
      img: "https://d1nslcd7m2225b.cloudfront.net/Pictures/1024x536/4/7/7/1252477_fellowship.jpg",
      imgTitle:
        "https://www.freepnglogos.com/uploads/lord-of-the-rings-png-logo/lord-of-the-rings-png-title-logo-1.png",
      imgThumb:
        "https://media.citizen.co.za/wp-content/uploads/2023/02/new-lord-of-the-rings-films-announced.jpg",
      imgVertical:
        "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      trailer: "https://youtu.be/aStYWD25fAQ",
      movie: "https://youtu.be/aStYWD25fAQ",
      duration: "2 hours 58 min",
      year: "2001",
      limit: "13",
      genre: "Fantasy",
      isSeries: false,
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      description:
        "Harry Potter and the Philosopher's Stone is a 2001 fantasy film directed by Chris Columbus and distributed by Warner Bros. Pictures, based on J.K. Rowling's 1997 novel of the same name.",
      img: "https://wallpapercave.com/wp/wp4879828.jpg",
      imgTitle:
        "https://i.ibb.co/qRs0ZsR/440-4406326-harry-potter-philosophers-stone-logo-hd-png-download-removebg-preview.png",
      imgThumb: "https://images8.alphacoders.com/113/1130049.jpg",
      imgVertical: "https://wallpapercave.com/wp/wp4879829.jpg",
      trailer: "https://youtu.be/mNgwNXKBEW0",
      movie: "https://youtu.be/mNgwNXKBEW0",
      duration: "2 hours 32 min",
      year: "2001",
      limit: "PG",
      genre: "Fantasy",
      isSeries: false,
    },

    //Series
    {
      title: "Rick and Morty",
      description: `Rick and Morty is an American adult animated science fiction sitcom created by Justin Roiland and Dan Harmon for Cartoon Network's late-night programming block Adult Swim. The series follows the misadventures of cynical mad scientist Rick Sanchez and his good-hearted but fretful grandson Morty Smith, who split their time between domestic family life and interdimensional adventures.`,
      img: "https://ichef.bbci.co.uk/news/976/cpsprodpb/40D9/production/_128410661_rick-and-morty-s4-image.jpg",
      imgTitle:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/1200px-Rick_and_Morty.svg.png",
      imgThumb:
        "https://thepopcornuniverse.in/wp-content/uploads/2021/09/Rick-Morty-Thumbnail.jpg",
      imgVertical:
        "https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg",
      trailer: "https://youtu.be/jerFRSQW9g8",
      movie: "https://youtu.be/jerFRSQW9g8",
      duration: "22 min",
      year: "2013",
      limit: "15",
      genre: "Animation",
      isSeries: true,
    },
    {
      title: `The Queen's Gambit`,
      description:
        "The Queen's Gambit is a 2020 American drama miniseries created by Scott Frank, based on the 1983 novel of the same name by Walter Tevis. It stars Anya Taylor-Joy as Beth Harmon, a chess prodigy, with Bill Camp, Thomas Brodie-Sangster, Moses Ingram, Harry Melling, Marielle Heller and others. The series revolves around the life of a young chess prodigy, orphan Beth Harmon, who struggles with addiction in a quest to become the greatest chess player in the world.",
      img: "https://www.whats-on-netflix.com/wp-content/uploads/2023/01/the-queens-gambit-2-netflix-jpg.webp",
      imgTitle:
        "https://assets.fanart.tv/fanart/tv/387115/hdtvlogo/the-queens-gambit-5f909918e4d78.png",
      imgThumb:
        "https://www.jesuithighschool.org/sites/main/files/imagecache/lightbox/main-images/sl__queens_gambit__bradenacosta24.jpg",
      imgVertical:
        "https://1.bp.blogspot.com/-DB4YRE95A9I/YZnN1oTXSDI/AAAAAAAAGW4/Zd2TqAPG51oGmEBgqkrZBqa---Fb0YGuQCNcBGAsYHQ/s1536/Gambito-de-Dama.jpg",
      trailer: "https://youtu.be/oZn3qSgmLqI",
      movie: "https://youtu.be/oZn3qSgmLqI",
      duration: "50 min",
      year: "2020",
      limit: "18",
      genre: "Action",
      isSeries: true,
    },
    {
      title: "Lie to Me",
      description:
        "Lie to Me is an American crime drama television series that originally ran on the Fox network from January 21, 2009, to January 31, 2011. In the show, Dr. Cal Lightman and his colleagues in The Lightman Group accept assignments from third parties (commonly local and federal law enforcement), and assist in investigations, reaching the truth through applied psychology: interpreting microexpressions, through the Facial Action Coding System, and body language.",
      img: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/a11797b97d17d50fb3555da99494273c6c404c5f074d0b5026b71aa169aae341._RI_TTW_.jpg",
      imgTitle:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Lie_to_Me.svg/1200px-Lie_to_Me.svg.png",
      imgThumb:
        "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/7F8521F95782E1E20034600A6152387CDBDA73F28773503C71336081780CD589/scale?width=1200&aspectRatio=1.78&format=jpeg",
      imgVertical:
        "https://m.media-amazon.com/images/I/81rE-kEY-ZL._AC_UF1000,1000_QL80_.jpg",
      trailer: "https://youtu.be/Kq6PiXEG9Eg",
      movie: "https://youtu.be/Kq6PiXEG9Eg",
      duration: "42 min",
      year: "2009-2011",
      limit: "16",
      genre: "Crime Drama",
      isSeries: true,
    },

    {
      title: "The Last Man on Earth",
      description:
        "The Last Man on Earth is an American post-apocalyptic comedy television series created by and starring Will Forte. The series premiered on Fox on March 1, 2015, and the fourth and final season concluded on March 8, 2018. The series follows the adventures of Phil Miller, an average man who becomes the last human being on Earth after a deadly virus spreads throughout the planet.",
      img: "https://www.indiewire.com/wp-content/uploads/2015/05/the_last_man_on_earth_cast.jpg",
      imgTitle:
        "https://assets.fanart.tv/fanart/movies/21159/hdmovielogo/the-last-man-on-earth-5474a0fc40b53.png",
      imgThumb:
        "https://ntvb.tmsimg.com/assets/p10775022_b_h10_aa.jpg?w=1280&h=720",
      imgVertical: "https://flxt.tmsimg.com/assets/p10775022_b_v8_aa.jpg",
      trailer: "https://youtu.be/NUZu331xTFs",
      movie: "https://youtu.be/NUZu331xTFs",
      duration: "30 min",
      year: "2015 - 2018",
      limit: "16",
      genre: "Comedy",
      isSeries: true,
    },
    {
      title: "Death Note",
      description: `Death Note is a Japanese manga series written by Tsugumi Ohba and illustrated by Takeshi Obata. The story follows Light Yagami, a high school student who discovers a supernatural notebook from a Shinigami named Ryuk that grants its user the ability to kill anyone whose name and face they know. The series centers around Light's attempts to create and rule a world cleansed of evil using the notebook, and the complex conflict between him, his opponents, and the Shinigami.`,
      img: "https://m.media-amazon.com/images/M/MV5BZDMxYzBhODAtZDRmZC00Njk1LTkzYjQtNTM5OGQ1YTA1YjUzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
      imgTitle:
        "https://cdn.shopify.com/s/files/1/0259/7398/1235/collections/Death_Note_Logo.png?v=1587232436",
      imgThumb:
        "https://occ-0-3933-41.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABWroW6c_lJwQ0ke2cFu_mgNM_01vUETqAt1cne4sjap77CYXvZMPTW2rP9-La6yEz-5bzHu_nSm-4X2Bao79lhocNgJA0l2lfI75BhWTaq1JOQVlGx04pGjd.jpg?r=dac",
      imgVertical:
        "https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
      trailer: "https://youtu.be/NlJZ-YgAt-c",
      movie: "https://youtu.be/NlJZ-YgAt-c",
      duration: "2 hours 37 min",
      year: "2006",
      limit: "16",
      genre: "Animation",
      isSeries: true,
    },
    {
      title: "Vikings",
      description:
        "Vikings is a historical drama television series created and written by Michael Hirst for the History channel. Filmed in Ireland, it premiered on March 3, 2013, in Canada.",
      img: "https://wallpapershome.com/images/pages/pic_h/18084.jpg",
      imgTitle:
        "https://logos-world.net/wp-content/uploads/2021/11/VIkings-Emblem.png",
      imgThumb:
        "https://variety.com/wp-content/uploads/2014/02/vikings-tv-review.jpg",
      imgVertical:
        "https://image.tmdb.org/t/p/original/w1SiyVcFQIB1YbeKfT7KBnVMItO.jpg",
      trailer: "https://youtu.be/9GgxinPwAGc",
      movie: "https://youtu.be/9GgxinPwAGc",
      duration: "45 min",
      year: "2013",
      limit: "18",
      genre: "Detective",
      isSeries: true,
    },
    {
      title: "Lucifer",
      description:
        "Lucifer is an American fantasy police procedural comedy-drama television series developed by Tom Kapinos that premiered on Fox on January 25, 2016. It is based on the DC Comics character created by Neil Gaiman, Sam Kieth, and Mike Dringenberg taken from the comic book series The Sandman, who later became the protagonist of a spin-off comic book series, both published by DC Comics' Vertigo imprint. The series is produced by Jerry Bruckheimer Television, DC Entertainment and Warner Bros. Television.",
      img: "https://wallpapershome.com/images/pages/pic_h/9717.jpg",
      imgTitle:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Lucifer_tv_logo.svg/1280px-Lucifer_tv_logo.svg.png",
      imgThumb:
        "https://e3d6fgx2ndy.exactdn.com/wp-content/uploads/2021/09/lucifer-series-6-poster-1628105867-e1632100924788.jpg?strip=all&lossy=1&ssl=1",
      imgVertical:
        "https://image.tmdb.org/t/p/original/e6FQvm5jycG9xx1ZWowIYBc3Shn.jpg",
      trailer: "https://youtu.be/X4bF_quwNtw",
      movie: "https://youtu.be/X4bF_quwNtw",
      duration: "45 min",
      year: "2016",
      limit: "15",
      genre: "Comedy",
      isSeries: true,
    },
    {
      title: "Love, Death & Robots",
      description:
        "Love, Death & Robots is an American adult animated science fiction anthology streaming television series on Netflix. The 18-episode first season was released on March 15, 2019. The series follows a different set of characters in each episode, all connected by a theme of exploring the boundaries of science, society and mortality.",
      img: "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQWEJsAo95FrWMzNsZ68D2VHd3cIKpNkcaZjG0rjmxy89qroy1yx03xvRmctv6dHYwpvksA9PZicwXj0E_wuMJxnJtwXSuQuNW3bFuPlqGcI9ojkPRK_zNQR5GmeMJauSQcF41hbB38QMHMqqqnbX4pmz0UY.jpg?r=dec",
      imgTitle: "https://uxuihero.com/wp-content/uploads/2019/03/Titles.png",
      imgThumb:
        "https://www.whats-on-netflix.com/wp-content/uploads/2022/08/love-death-and-robots-renewed-for-season-4-netflix.webp",
      imgVertical:
        "https://thefincheranalyst.files.wordpress.com/2022/05/love-death-robots-s3-main-noborder-vertical-27x40-rgb-pre-w5.1.webp",
      trailer: "https://youtu.be/wUFwunMKa4E",
      movie: "https://youtu.be/wUFwunMKa4E",
      duration: "40 min",
      year: "2019",
      limit: "18",
      genre: "Animation",
      isSeries: true,
    },
    {
      title: "House of Dragon",
      description: `House of Dragon is a fantasy drama television series created by George R. R. Martin and Ryan Condal for HBO. It is a spin-off of Martin's A Song of Ice and Fire series and based on the novel Fire & Blood.`,
      img: "https://www.hollywoodreporter.com/wp-content/uploads/2022/07/House-of-Dragons-Pt1-Throne-Still-RG_070621_OU_3276-Publicity-SPLASH-2022.jpg?w=2000&h=1126&crop=1",
      imgTitle:
        "https://upload.wikimedia.org/wikipedia/commons/4/4b/House_of_the_dragon_logo.png",
      imgThumb:
        "https://ntvb.tmsimg.com/assets/p19657355_b_h8_af.jpg?w=960&h=540",
      imgVertical:
        "https://img.posterstore.com/zoom/wb0035-8houseofthedragon-rhaenyratargaryen50x70.jpg",
      trailer: "https://youtu.be/DotnJ7tTA34",
      movie: "https://youtu.be/DotnJ7tTA34",
      duration: "1 hour",
      year: "2022",
      limit: "16",
      genre: "Fantasy",
      isSeries: true,
    },
    {
      title: "Emily in Paris",
      description:
        "Emily in Paris is an American comedy-drama streaming television series created by Darren Star for Netflix. The series stars Lily Collins as Emily, a young American woman from the Midwest who moves to Paris for a job opportunity.",
      img: "https://www.whats-on-netflix.com/wp-content/uploads/2022/09/emily-in-paris-season-3-netflix-everything-we-know-so-far-jpg.webp",
      imgTitle:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Emily_in_Paris_logo.svg/1200px-Emily_in_Paris_logo.svg.png",
      imgVertical: "https://flxt.tmsimg.com/assets/p20738800_b_v13_ae.jpg",
      imgThumb:
        "https://www.israelhayom.co.il/wp-content/uploads/2022/01/16030876070113_b.jpg",
      trailer: "https://youtu.be/Xl3HY9yMEBI",
      movie: "https://youtu.be/Xl3HY9yMEBI",
      duration: "30 min",
      year: "2020",
      limit: "14",
      genre: "Comedy",
      isSeries: true,
    },
    {
      title: "Doctor Who",
      description:
        "Doctor Who is a British science fiction television programme produced by the BBC. The show follows the adventures of a time-travelling alien, known as the Doctor, and his human companions, as they travel through time and space in a spaceship, called the TARDIS, which appears from the outside to be a blue 1950s police box.",
      img: "https://cdn.wallpapersafari.com/67/73/FkpDM5.jpg",
      imgTitle: "https://pbs.twimg.com/media/DdkXrGXW0AEK-cQ.png",
      imgThumb:
        "https://image.tmdb.org/t/p/w320_and_h180_bestv2/irTDkbtPQ4aM9YQw1uEevzk5rSz.jpg",
      imgVertical:
        "https://image.tmdb.org/t/p/original/jQmM0kRXf5yHD8y5exkLQttkHtX.jpg",
      trailer: "https://youtu.be/fJtoxieq40o",
      movie: "https://youtu.be/fJtoxieq40o",
      duration: "45 min",
      year: "2005",
      limit: "13",
      genre: "Action",
      isSeries: true,
    },

    {
      title: "Game of Thrones",
      description:
        "Game of Thrones is an American fantasy drama television series created by David Benioff and D. B. Weiss for HBO. It is an adaptation of A Song of Ice and Fire, George R. R. Martin`s series of fantasy novels.",
      img: "https://hbomax-images.warnermediacdn.com/images/GVU4NYgvPQlFvjSoJAbmL/tile?size=1280x720&format=jpeg&partner=hbocom&v=46e72923a9154f662bf277d0f08160a3&host=art-gallery.api.hbo.com",
      imgTitle:
        "https://upload.wikimedia.org/wikipedia/commons/b/b5/Logo_Game_of_Thrones.png",
      imgThumb:
        "https://i.insider.com/5cad1c9ce031e8029732e822?width=1200&format=jpeg",
      imgVertical:
        "https://images2.minutemediacdn.com/image/fetch/c_fill,g_auto,f_auto,h_2731,w_1889/https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2019%2F04%2FGOT-Aftermath.jpeg",
      trailer: "https://youtu.be/bjqEWgDVPe0",
      movie: "https://youtu.be/bjqEWgDVPe0",
      duration: "1 hour",
      year: "2011",
      limit: "18",
      genre: "Fantasy",
      isSeries: true,
    },
    {
      title: "Grimm",
      description:
        "Grimm is an American dark fantasy police procedural drama television series created by Stephen Carpenter and David Greenwalt and produced by Universal Television for NBC. It first aired on October 28, 2011 and ended on March 31, 2017.",
      img: "https://www.looper.com/img/gallery/the-real-reason-grimm-was-canceled/l-intro-1616170683.jpg",
      imgTitle:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Grimm_Logo.png/800px-Grimm_Logo.png",
      imgThumb:
        "https://vargiskhan.com/log/wp-content/uploads/2019/01/grimm-series-review.jpg",
      imgVertical:
        "https://m.media-amazon.com/images/M/MV5BMTkyODg2MzQwMV5BMl5BanBnXkFtZTgwNTA2MjE1MDI@._V1_FMjpg_UX1000_.jpg",
      trailer: "https://youtu.be/2-4xKNZ_gaA",
      movie: "https://youtu.be/2-4xKNZ_gaA",
      duration: "45 min",
      year: "2007",
      limit: "13",
      genre: "Detective",
      isSeries: true,
    },
    {
      title: "Stranger Things",
      description:
        "Stranger Things is an American science fiction horror web television series created, written, and directed by the Duffer Brothers and released on Netflix. Set in the 1980s in the fictional town of Hawkins, Indiana, the season is about the disappearance of Will Byers and the ensuing search for him by his friends, family, and the local authorities.",
      img: "https://images.popbuzz.com/images/60844?width=1200&crop=16_9&signature=2u4eQjFlxR6DiS1ta_ezaYrUHEo=",
      imgTitle:
        "https://logos-world.net/wp-content/uploads/2020/05/Stranger-Things-Logo.png",
      imgThumb:
        "https://occ.a.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABV5lteI3eHet1nPBQKC_uEChESjqQfYpRwMWLR0wULt52odnxQtG69JNFDj9N4maZWJWDFZyi2sc1YzZ8mKE4Ajmt7Btva1CnWagGbYXVMp3t4OETM4LwiD70dHu-qWUbBAesQ.jpg?r=c68",
      imgVertical:
        "https://resizing.flixster.com/0xxuABVVuzJrUT130WFHKE-irEg=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNzUyMTFhOTktZTU4Ni00ODkyLWJlYjQtZTgxYTllZmU2OGM0LmpwZw==",
      trailer: "https://youtu.be/b9EkMc79ZSU",
      movie: "https://youtu.be/b9EkMc79ZSU",
      duration: "1 hour",
      year: "2016",
      limit: "16",
      genre: "Horror",
      isSeries: true,
    },
    {
      title: "Inception",
      description:
        "Inception is a 2010 science fiction action film written, co-produced, and directed by Christopher Nolan, and co-produced by Emma Thomas. The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets.",
      img: "https://bfoggdmu.files.wordpress.com/2012/10/zz22344f92.jpg",
      imgTitle:
        "https://www.pngmart.com/files/22/Inception-PNG-HD-Isolated.png",
      imgThumb:
        "https://collider.com/wp-content/uploads/inception_movie_poster_banner_03.jpg",
      imgVertical:
        "https://m.media-amazon.com/images/M/MV5BZGFjOTRiYjgtYjEzMS00ZjQ2LTkzY2YtOGQ0NDI2NTVjOGFmXkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_.jpg",
      trailer: "https://youtu.be/YoHD9XEInc0",
      movie: "https://youtu.be/YoHD9XEInc0",
      duration: "2 hours 18 min",
      year: "2010",
      limit: "15",
      genre: "Comedy",
      isSeries: false,
    },
    {
      title: "The Dark Knight",
      description:
        "The Dark Knight is a 2008 superhero film directed, co-produced, and co-written by Christopher Nolan. Based on the DC Comics character Batman, the film is the second installment of Nolan's The Dark Knight Trilogy and a sequel to 2005's Batman Begins, starring an ensemble cast including Christian Bale, Michael Caine, Heath Ledger, Gary Oldman, Aaron Eckhart, Maggie Gyllenhaal and Morgan Freeman.",
      img: "https://i.ebayimg.com/images/g/C4QAAOSwjXljz0Mn/s-l1600.jpg",
      imgTitle:
        "https://www.pngmart.com/files/22/The-Dark-Knight-PNG-Photos.png",
      imgThumb:
        "https://preview.redd.it/vedjoch1jv651.jpg?width=640&crop=smart&auto=webp&s=28a95089e9b8352cc163a047fd6f8f6c099cf317",
      imgVertical:
        "https://www.hcinema.org.il/wp-content/uploads/2022/03/the-dark-knight-poster-1.jpg",
      trailer: "https://youtu.be/EXeTwQWrcwY",
      movie: "https://youtu.be/EXeTwQWrcwY",
      duration: "2 hours 32 min",
      year: "2008",
      limit: "15",
      genre: "Comedy",
      isSeries: false,
    },

    {
      title: "The Revenant",
      description:
        "The Revenant is a 2015 American semi-biographical epic western film directed by Alejandro G. Iñárritu. The screenplay by Mark L. Smith and Iñárritu is based in part on Michael Punke`s 2002 novel of the same name, describing frontiersman Hugh Glass`s experiences in 1823.",
      img: "https://www.indiewire.com/wp-content/uploads/2016/06/the-revenant.jpg",
      imgTitle:
        "https://images.squarespace-cdn.com/content/v1/5bfdc74875f9ee194f3e0add/1596652890102-76FXS415ATRW83ANRXXK/the-revenant-563b02dac00e3.png",
      imgThumb:
        "https://variety.com/wp-content/uploads/2013/07/the-revenant-movie-reivew-2.jpg",
      imgVertical: "https://m.media-amazon.com/images/I/A1BjliXNDPL.jpg",
      trailer: "https://youtu.be/LoebZZ8K5N0",
      movie: "https://youtu.be/LoebZZ8K5N0",
      duration: "1 hour 15 min",
      year: "2015",
      limit: "15",
      genre: "Comedy",
      isSeries: false,
    },
    {
      title: "Paranormal Activity",
      description:
        "Paranormal Activity is a 2007 American found footage supernatural horror film written, co-produced, photographed, edited, and directed by Oren Peli. It centers on a young couple (Katie Featherston and Micah Sloat) who are haunted by a supernatural presence in their home.",
      img: "https://play-lh.googleusercontent.com/proxy/rOpTB8x4WAFqypqYby_aAl0tcO_lfE6yzDUjOH_pKLu-bI3xtND7urtpretofC831ZST57_VYMoSQWaJok9dGoOklMrr__lKCuYNUSg0bwHCcIagNG_FBDU=s1280-w1280-h720",
      imgTitle:
        "https://occ-0-41-116.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABVe73xzWZ0nvqPp5xT0MDFvr60TBka9yON1uOW-ibDdCwopWsOj0Ii9gSRnS4Av9a3B48zrzG4a5bElE5laoq8ZrQ0DcXgLXG_Stm51JfpNB.png?r=425",
      imgThumb: "https://ichef.bbci.co.uk/images/ic/640x360/p07rv1xs.jpg",
      imgVertical: "https://m.media-amazon.com/images/I/71SH1ZPPIZL.jpg",
      trailer: "https://youtu.be/F_UxLEqd074",
      movie: "https://youtu.be/F_UxLEqd074",
      duration: "1 hour 12 min",
      year: "2007",
      limit: "18",
      genre: "Action",
      isSeries: false,
    },

    {
      title: "Friday the 13th",
      description:
        "Friday the 13th is a 1980 American slasher film directed by Sean S. Cunningham and written by Victor Miller. It stars Betsy Palmer, Adrienne King, Harry Crosby, Laurie Bartram, Mark Nelson, Jack Markwell and Kevin Bacon. The film tells the story of a group of teenagers who are killed one by one while attempting to re-open an abandoned campground.",
      img: "https://i0.wp.com/techtelegraph.co.uk/wp-content/uploads/2022/05/friday-the-13th-slasher.jpg?fit=%2C&ssl=1",
      imgTitle:
        "https://www.grindhousedatabase.com/images/thumb/F135top.png/750px-F135top.png",
      imgThumb:
        "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/games/switch/f/friday-the-13th-the-game-ultimate-slasher-edition-switch/hero",
      imgVertical:
        "https://cdn.europosters.eu/image/1300/art-photo/friday-the-13th-blockbuster-i112337.jpg",
      trailer: "https://youtu.be/aDrOvFtzyPQ",
      movie: "https://youtu.be/aDrOvFtzyPQ",
      duration: "1 hour 35 min",
      year: "1980",
      limit: "18",
      genre: "Action",
      isSeries: false,
    },
    {
      title: "Spider-Man: Into the Spider-Verse",
      description:
        'Spider-Man: Into the Spider-Verse is a 2018 American computer-animated superhero film based on the Marvel Comics character Miles Morales / Spider-Man, produced by Columbia Picturess and Sony Picturesp Animation in associationi with Marvel,d and distributed bye Sonyr Pictures Releasing.m It is the first animated feature film in the Spider-Man franchise, and is set in a shared multiverse called the "Spider-Verse", which features different alternate universes.',
      img: "https://images8.alphacoders.com/929/thumb-1920-929202.jpg",
      imgTitle:
        "https://www.pngmart.com/files/12/Spider-Man-Into-The-Spider-Verse-Logo-PNG-Clipart.png",
      imgThumb:
        "https://m.media-amazon.com/images/M/MV5BOTFlZTA4YjUtYzY3Zi00Mzc2LTllNzAtYjI2ZWNiMGZkZjE2XkEyXkFqcGdeQW1yb3NzZXI@._V1_QL75_UY281_CR86,0,500,281_.jpg",
      imgVertical: "https://cdn.marvel.com/content/2x/MilesPoster.jpg",
      trailer: "https://youtu.be/g4Hbz2jLxvQ",
      movie: "https://youtu.be/g4Hbz2jLxvQ",
      duration: "1 hour 57 min",
      year: "2018",
      limit: "13",
      genre: "Action",
      isSeries: false,
    },

    {
      title: "Seven Kings Must Die",
      description:
        "Seven Kings Must Die is a 2019 American action-adventure film directed by John Woo and starring Keanu Reeves, Michael Caine, and John Malkovich. The film follows a group of warriors as they attempt to stop a mysterious dark force from destroying the world. The film is set in a fantasy universe, and was released in the United States on March 15, 2019.",
      img: "https://www.denofgeek.com/wp-content/uploads/2023/04/The-Last-Kingdom-Seven-Kings-Must-Die.jpg?fit=1200%2C675",
      imgTitle:
        "https://dnm.nflximg.net/api/v6/S4oi7EPZbv2UEPaukW54OORa0S8/AAAABbPGVhhNiv-uNFQF4_4epf7cHyQ1ZTByPKz2ESVU0jcMoxjjyaT1veVvour43ALVhE9yoVJ8MdF5M14HhNNTfeBnGkn9j5QKQag.png?r=204",
      imgThumb:
        "https://occ-0-769-590.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABZKJpdcSuvqwGBxBJNKVRze0JWHe9phJW6L1xaiqvLePPRKhRis-7FHr69URHZIYXqUVus0HIoz_3fLZPQr3VVqGGzRNlDoNkPwp.jpg?r=72d",
      imgVertical:
        "https://m.media-amazon.com/images/M/MV5BOTlmNGE0ZGMtMzdkMC00MjQyLWI1ZjgtZTIxODAyNWJlZDFlXkEyXkFqcGdeQXVyNTQ4ODM2NjM@._V1_FMjpg_UX1000_.jpg",
      trailer: "https://youtu.be/J2uW5ehHqjc",
      movie: "https://youtu.be/J2uW5ehHqjc",
      duration: "2 hours 10 min",
      year: "2019",
      limit: "15",
      genre: "Fantasy",
      isSeries: false,
    },
    {
      title: "Brave",
      description:
        "Brave is a 2012 American 3D computer-animated fantasy comedy-drama adventure film produced by Pixar Animation Studios and released by Walt Disney Pictures. It was directed by Mark Andrews and Brenda Chapman and co-directed by Steve Purcell. The story is by Chapman, with the screenplay by Andrews, Purcell, Chapman and Irene Mecchi.",
      img: "https://media.npr.org/assets/img/2012/06/19/b23_10bpub.pub16.170_wide-a5bd92b0ba06a0f7da009e797c51f69bae8ee023.jpg",
      imgTitle:
        "https://i.pinimg.com/originals/9e/b2/32/9eb2327de3d6f3a73add59e23ebd0d7f.png",
      imgThumb:
        "https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/03/brave-movie.jpg",
      imgVertical:
        "https://m.media-amazon.com/images/M/MV5BMzgwODk3ODA1NF5BMl5BanBnXkFtZTcwNjU3NjQ0Nw@@._V1_.jpg",
      movie: "https://youtu.be/TEHWDA_6e3M",
      trailer: "https://youtu.be/TEHWDA_6e3M",
      duration: "1 hour 40 min",
      year: "2012",
      limit: "8",
      genre: "Fantasy",
      isSeries: false,
    },
    {
      title: "Fight Club",
      description: `Fight Club is a 1999 American film directed by David Fincher and starring Edward Norton, Brad Pitt, and Helena Bonham Carter. It follows an unnamed narrator who forms an underground fight club with Tyler Durden, a soap maker. The film's supporting cast includes Meat Loaf, Jared Leto, and Eion Bailey. The film's plot is based on the 1996 novel of the same name by Chuck Palahniuk.`,
      img: "https://media.newyorker.com/photos/5dbafcc91b4a6700085a7a9b/master/w_2560%2Cc_limit/Baker-FightClub.jpg",
      imgThumb:
        "https://www.slantmagazine.com/wp-content/uploads/2009/11/fightclub.jpg",
      imgVertical:
        "https://i.etsystatic.com/18242346/r/il/c9908e/2412674268/il_fullxfull.2412674268_1sgm.jpg",
      imgTitle: "https://www.pngmart.com/files/22/Fight-Club-PNG-HD.png",
      trailer: "https://youtu.be/O1nDozs-LxI",
      movie: "https://youtu.be/O1nDozs-LxI",
      duration: "2 hour 16 min",
      year: "1999",
      limit: "18",
      genre: "Fantasy",
      isSeries: false,
    },

    {
      title: "Scott Pilgrim vs. the World",
      description:
        "Scott Pilgrim vs. the World is a 2010 action comedy film co-written, produced, and directed by Edgar Wright, based on the graphic novel series Scott Pilgrim by Bryan Lee O'Malley. It stars Michael Cera as Scott Pilgrim, a slacker musician who must win a competition to get a record deal and battle the seven evil exes of his newest girlfriend Ramona Flowers, played by Mary Elizabeth Winstead.",
      img: "https://media.vanityfair.com/photos/5f298aa4ad09aa418d20429f/master/w_2560%2Cc_limit/shutterstock_editorial_5885820am.jpg",
      imgTitle:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Scott_Pilgrim_vs_the_World_Wordmark.svg/1280px-Scott_Pilgrim_vs_the_World_Wordmark.svg.png",
      imgThumb: "https://i.ytimg.com/vi/7wd5KEaOtm4/maxresdefault.jpg",
      imgVertical:
        "https://static.metacritic.com/images/products/movies/3/524cfbd8dd5a2c4a96d99d80d70716fc.jpg",
      trailer: "https://youtu.be/7wd5KEaOtm4",
      movie: "https://youtu.be/7wd5KEaOtm4",
      duration: "1 hour 52 min",
      year: "2010",
      limit: "13",
      genre: "Detective",
      isSeries: false,
    },
    {
      title: "Shrek",
      description:
        "Shrek is an animated comedy film about a grumpy ogre named Shrek who embarks on a quest to rescue a princess and reclaim his swamp. With the help of a talkative donkey, Shrek encounters humorous challenges and unexpected friendships along the way. The movie cleverly subverts fairytale tropes while delivering a heartwarming message about self-acceptance and the importance of looking beyond appearances.",
      img: "https://images.alphacoders.com/519/thumb-1920-519107.jpg",
      imgTitle: "https://pngimg.com/d/shrek_PNG24.png",
      imgThumb:
        "https://img2.hulu.com/user/v3/artwork/36c01be2-e036-46d9-9da2-522bfd12b54f?base_image_bucket_name=image_manager&base_image=42eab101-f1c7-4661-9c4e-b6d2a2dfea41&region=US&format=jpeg&size=952x536",
      imgVertical:
        "https://www.themoviedb.org/t/p/w500/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg",
      trailer: "https://youtu.be/CwXOrWvPBPk",
      movie: "https://youtu.be/CwXOrWvPBPk",
      duration: "1 hour 32 min",
      year: "2001",
      limit: "13",
      genre: "Detective",
      isSeries: false,
    },
    {
      title: "Priest",
      description:
        "Priest is a 2011 American post-apocalyptic dystopian science fiction action horror film starring Paul Bettany as the title character. The film, directed by Scott Stewart, is loosely based on the Korean comic of the same name by Hyung Min-woo. The film also stars Karl Urban, Cam Gigandet, Maggie Q, Stephen Moyer, Lily Collins, and Brad Dourif.",
      img: "https://cdn.kpbs.org/img/photos/2011/05/13/DF-07850.jpg",
      imgTitle: "https://images.fanart.tv/fanart/priest-51ded5c2ef023.png",
      imgThumb:
        "https://m.media-amazon.com/images/S/pv-target-images/401ca3e58039de9128b37dabf50ded0f1cd2b2c626e116f8d47d235abdf617b9._UR1920,1080_.jpg",
      imgVertical:
        "https://images.moviesanywhere.com/4605e276d787283db68b15bb094dafc5/6168c408-c8ef-4661-9829-3193386f2b59.jpg",
      trailer: "https://youtu.be/-VNczhWD2ao",
      movie: "https://youtu.be/-VNczhWD2ao",
      duration: "1 hour 27 min",
      year: "2011",
      limit: "18",
      genre: "Detective",
      isSeries: false,
    },
    {
      title: "Avatar",
      description:
        "Avatar is a 2009 American epic science fiction film directed, written, produced, and co-edited by James Cameron, and stars Sam Worthington, Zoe Saldana, Stephen Lang, Michelle Rodriguez, and Sigourney Weaver. The film is set in the mid-22nd century, when humans are colonizing Pandora, a lush habitable moon of a gas giant in the Alpha Centauri star system, in order to mine the mineral unobtanium, a room-temperature superconductor. The expansion of the mining colony threatens the continued existence of a local tribe of Na'vi – a humanoid species indigenous to Pandora.",
      img: "https://variety.com/wp-content/uploads/2022/12/Main-thumb.jpg",
      imgTitle:
        "https://www.pngmart.com/files/15/Avatar-Logo-Transparent-PNG.png",
      imgThumb:
        "https://c4.wallpaperflare.com/wallpaper/810/33/235/movies-avatar-1680x1050-entertainment-movies-hd-art-wallpaper-preview.jpg",
      imgVertical:
        "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_.jpg",
      trailer: "https://youtu.be/CM79GTEm2ps",
      movie: "https://youtu.be/CM79GTEm2ps",
      duration: "2 hours 42 min",
      year: "2009",
      limit: "12",
      genre: "Horror",
      isSeries: false,
    },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      description: `The Lord of the Rings: The Fellowship of the Ring is a 2001 epic fantasy adventure film directed by Peter Jackson, based on the first volume of J. R. R. Tolkien's The Lord of the Rings. The film is the first installment in The Lord of the Rings trilogy and was produced by Barrie M. Osborne, Fran Walsh, and Jackson, and written by Walsh, Philippa Boyens, and Jackson.`,
      img: "https://d1nslcd7m2225b.cloudfront.net/Pictures/1024x536/4/7/7/1252477_fellowship.jpg",
      imgTitle:
        "https://www.freepnglogos.com/uploads/lord-of-the-rings-png-logo/lord-of-the-rings-png-title-logo-1.png",
      imgThumb:
        "https://media.citizen.co.za/wp-content/uploads/2023/02/new-lord-of-the-rings-films-announced.jpg",
      imgVertical:
        "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      trailer: "https://youtu.be/aStYWD25fAQ",
      movie: "https://youtu.be/aStYWD25fAQ",
      duration: "2 hours 58 min",
      year: "2001",
      limit: "13",
      genre: "Horror",
      isSeries: false,
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      description:
        "Harry Potter and the Philosopher's Stone is a 2001 fantasy film directed by Chris Columbus and distributed by Warner Bros. Pictures, based on J.K. Rowling's 1997 novel of the same name.",
      img: "https://wallpapercave.com/wp/wp4879828.jpg",
      imgTitle:
        "https://i.ibb.co/qRs0ZsR/440-4406326-harry-potter-philosophers-stone-logo-hd-png-download-removebg-preview.png",
      imgThumb: "https://images8.alphacoders.com/113/1130049.jpg",
      imgVertical: "https://wallpapercave.com/wp/wp4879829.jpg",
      trailer: "https://youtu.be/mNgwNXKBEW0",
      movie: "https://youtu.be/mNgwNXKBEW0",
      duration: "2 hours 32 min",
      year: "2001",
      limit: "PG",
      genre: "Horror",
      isSeries: false,
    },
    {
      title: "Rick and Morty",
      description: `Rick and Morty is an American adult animated science fiction sitcom created by Justin Roiland and Dan Harmon for Cartoon Network's late-night programming block Adult Swim. The series follows the misadventures of cynical mad scientist Rick Sanchez and his good-hearted but fretful grandson Morty Smith, who split their time between domestic family life and interdimensional adventures.`,
      img: "https://ichef.bbci.co.uk/news/976/cpsprodpb/40D9/production/_128410661_rick-and-morty-s4-image.jpg",
      imgTitle:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/1200px-Rick_and_Morty.svg.png",
      imgThumb:
        "https://thepopcornuniverse.in/wp-content/uploads/2021/09/Rick-Morty-Thumbnail.jpg",
      imgVertical:
        "https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg",
      trailer: "https://youtu.be/jerFRSQW9g8",
      movie: "https://youtu.be/jerFRSQW9g8",
      duration: "22 min",
      year: "2013",
      limit: "15",
      genre: "Horror",
      isSeries: true,
    },
    {
      title: `The Queen's Gambit`,
      description:
        "The Queen's Gambit is a 2020 American drama miniseries created by Scott Frank, based on the 1983 novel of the same name by Walter Tevis. It stars Anya Taylor-Joy as Beth Harmon, a chess prodigy, with Bill Camp, Thomas Brodie-Sangster, Moses Ingram, Harry Melling, Marielle Heller and others. The series revolves around the life of a young chess prodigy, orphan Beth Harmon, who struggles with addiction in a quest to become the greatest chess player in the world.",
      img: "https://www.whats-on-netflix.com/wp-content/uploads/2023/01/the-queens-gambit-2-netflix-jpg.webp",
      imgTitle:
        "https://assets.fanart.tv/fanart/tv/387115/hdtvlogo/the-queens-gambit-5f909918e4d78.png",
      imgThumb:
        "https://www.jesuithighschool.org/sites/main/files/imagecache/lightbox/main-images/sl__queens_gambit__bradenacosta24.jpg",
      imgVertical:
        "https://1.bp.blogspot.com/-DB4YRE95A9I/YZnN1oTXSDI/AAAAAAAAGW4/Zd2TqAPG51oGmEBgqkrZBqa---Fb0YGuQCNcBGAsYHQ/s1536/Gambito-de-Dama.jpg",
      trailer: "https://youtu.be/oZn3qSgmLqI",
      movie: "https://youtu.be/oZn3qSgmLqI",
      duration: "50 min",
      year: "2020",
      limit: "18",
      genre: "Animation",
      isSeries: true,
    },
    {
      title: "Lie to Me",
      description:
        "Lie to Me is an American crime drama television series that originally ran on the Fox network from January 21, 2009, to January 31, 2011. In the show, Dr. Cal Lightman and his colleagues in The Lightman Group accept assignments from third parties (commonly local and federal law enforcement), and assist in investigations, reaching the truth through applied psychology: interpreting microexpressions, through the Facial Action Coding System, and body language.",
      img: "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/a11797b97d17d50fb3555da99494273c6c404c5f074d0b5026b71aa169aae341._RI_TTW_.jpg",
      imgTitle:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Lie_to_Me.svg/1200px-Lie_to_Me.svg.png",
      imgThumb:
        "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/7F8521F95782E1E20034600A6152387CDBDA73F28773503C71336081780CD589/scale?width=1200&aspectRatio=1.78&format=jpeg",
      imgVertical:
        "https://m.media-amazon.com/images/I/81rE-kEY-ZL._AC_UF1000,1000_QL80_.jpg",
      trailer: "https://youtu.be/Kq6PiXEG9Eg",
      movie: "https://youtu.be/Kq6PiXEG9Eg",
      duration: "42 min",
      year: "2009-2011",
      limit: "16",
      genre: "Animation",
      isSeries: true,
    },

    {
      title: "The Last Man on Earth",
      description:
        "The Last Man on Earth is an American post-apocalyptic comedy television series created by and starring Will Forte. The series premiered on Fox on March 1, 2015, and the fourth and final season concluded on March 8, 2018. The series follows the adventures of Phil Miller, an average man who becomes the last human being on Earth after a deadly virus spreads throughout the planet.",
      img: "https://www.indiewire.com/wp-content/uploads/2015/05/the_last_man_on_earth_cast.jpg",
      imgTitle:
        "https://assets.fanart.tv/fanart/movies/21159/hdmovielogo/the-last-man-on-earth-5474a0fc40b53.png",
      imgThumb:
        "https://ntvb.tmsimg.com/assets/p10775022_b_h10_aa.jpg?w=1280&h=720",
      imgVertical: "https://flxt.tmsimg.com/assets/p10775022_b_v8_aa.jpg",
      trailer: "https://youtu.be/NUZu331xTFs",
      movie: "https://youtu.be/NUZu331xTFs",
      duration: "30 min",
      year: "2015 - 2018",
      limit: "16",
      genre: "Animation",
      isSeries: true,
    },
    {
      title: "Death Note",
      description: `Death Note is a Japanese manga series written by Tsugumi Ohba and illustrated by Takeshi Obata. The story follows Light Yagami, a high school student who discovers a supernatural notebook from a Shinigami named Ryuk that grants its user the ability to kill anyone whose name and face they know. The series centers around Light's attempts to create and rule a world cleansed of evil using the notebook, and the complex conflict between him, his opponents, and the Shinigami.`,
      img: "https://m.media-amazon.com/images/M/MV5BZDMxYzBhODAtZDRmZC00Njk1LTkzYjQtNTM5OGQ1YTA1YjUzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
      imgTitle:
        "https://cdn.shopify.com/s/files/1/0259/7398/1235/collections/Death_Note_Logo.png?v=1587232436",
      imgThumb:
        "https://occ-0-3933-41.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABWroW6c_lJwQ0ke2cFu_mgNM_01vUETqAt1cne4sjap77CYXvZMPTW2rP9-La6yEz-5bzHu_nSm-4X2Bao79lhocNgJA0l2lfI75BhWTaq1JOQVlGx04pGjd.jpg?r=dac",
      imgVertical:
        "https://m.media-amazon.com/images/M/MV5BNjRiNmNjMmMtN2U2Yi00ODgxLTk3OTMtMmI1MTI1NjYyZTEzXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
      trailer: "https://youtu.be/NlJZ-YgAt-c",
      movie: "https://youtu.be/NlJZ-YgAt-c",
      duration: "2 hours 37 min",
      year: "2006",
      limit: "16",
      genre: "Detective",
      isSeries: true,
    },
    {
      title: "Vikings",
      description:
        "Vikings is a historical drama television series created and written by Michael Hirst for the History channel. Filmed in Ireland, it premiered on March 3, 2013, in Canada.",
      img: "https://wallpapershome.com/images/pages/pic_h/18084.jpg",
      imgTitle:
        "https://logos-world.net/wp-content/uploads/2021/11/VIkings-Emblem.png",
      imgThumb:
        "https://variety.com/wp-content/uploads/2014/02/vikings-tv-review.jpg",
      imgVertical:
        "https://image.tmdb.org/t/p/original/w1SiyVcFQIB1YbeKfT7KBnVMItO.jpg",
      trailer: "https://youtu.be/9GgxinPwAGc",
      movie: "https://youtu.be/9GgxinPwAGc",
      duration: "45 min",
      year: "2013",
      limit: "18",
      genre: "Animation",
      isSeries: true,
    },
    {
      title: "Lucifer",
      description:
        "Lucifer is an American fantasy police procedural comedy-drama television series developed by Tom Kapinos that premiered on Fox on January 25, 2016. It is based on the DC Comics character created by Neil Gaiman, Sam Kieth, and Mike Dringenberg taken from the comic book series The Sandman, who later became the protagonist of a spin-off comic book series, both published by DC Comics' Vertigo imprint. The series is produced by Jerry Bruckheimer Television, DC Entertainment and Warner Bros. Television.",
      img: "https://wallpapershome.com/images/pages/pic_h/9717.jpg",
      imgTitle:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Lucifer_tv_logo.svg/1280px-Lucifer_tv_logo.svg.png",
      imgThumb:
        "https://e3d6fgx2ndy.exactdn.com/wp-content/uploads/2021/09/lucifer-series-6-poster-1628105867-e1632100924788.jpg?strip=all&lossy=1&ssl=1",
      imgVertical:
        "https://image.tmdb.org/t/p/original/e6FQvm5jycG9xx1ZWowIYBc3Shn.jpg",
      trailer: "https://youtu.be/X4bF_quwNtw",
      movie: "https://youtu.be/X4bF_quwNtw",
      duration: "45 min",
      year: "2016",
      limit: "15",
      genre: "Detective",
      isSeries: true,
    },
    {
      title: "Love, Death & Robots",
      description:
        "Love, Death & Robots is an American adult animated science fiction anthology streaming television series on Netflix. The 18-episode first season was released on March 15, 2019. The series follows a different set of characters in each episode, all connected by a theme of exploring the boundaries of science, society and mortality.",
      img: "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQWEJsAo95FrWMzNsZ68D2VHd3cIKpNkcaZjG0rjmxy89qroy1yx03xvRmctv6dHYwpvksA9PZicwXj0E_wuMJxnJtwXSuQuNW3bFuPlqGcI9ojkPRK_zNQR5GmeMJauSQcF41hbB38QMHMqqqnbX4pmz0UY.jpg?r=dec",
      imgTitle: "https://uxuihero.com/wp-content/uploads/2019/03/Titles.png",
      imgThumb:
        "https://www.whats-on-netflix.com/wp-content/uploads/2022/08/love-death-and-robots-renewed-for-season-4-netflix.webp",
      imgVertical:
        "https://thefincheranalyst.files.wordpress.com/2022/05/love-death-robots-s3-main-noborder-vertical-27x40-rgb-pre-w5.1.webp",
      trailer: "https://youtu.be/wUFwunMKa4E",
      movie: "https://youtu.be/wUFwunMKa4E",
      duration: "40 min",
      year: "2019",
      limit: "18",
      genre: "Comedy",
      isSeries: true,
    },
    {
      title: "House of Dragon",
      description: `House of Dragon is a fantasy drama television series created by George R. R. Martin and Ryan Condal for HBO. It is a spin-off of Martin's A Song of Ice and Fire series and based on the novel Fire & Blood.`,
      img: "https://www.hollywoodreporter.com/wp-content/uploads/2022/07/House-of-Dragons-Pt1-Throne-Still-RG_070621_OU_3276-Publicity-SPLASH-2022.jpg?w=2000&h=1126&crop=1",
      imgTitle:
        "https://upload.wikimedia.org/wikipedia/commons/4/4b/House_of_the_dragon_logo.png",
      imgThumb:
        "https://ntvb.tmsimg.com/assets/p19657355_b_h8_af.jpg?w=960&h=540",
      imgVertical:
        "https://img.posterstore.com/zoom/wb0035-8houseofthedragon-rhaenyratargaryen50x70.jpg",
      trailer: "https://youtu.be/DotnJ7tTA34",
      movie: "https://youtu.be/DotnJ7tTA34",
      duration: "1 hour",
      year: "2022",
      limit: "16",
      genre: "Comedy",
      isSeries: true,
    },
    {
      title: "Emily in Paris",
      description:
        "Emily in Paris is an American comedy-drama streaming television series created by Darren Star for Netflix. The series stars Lily Collins as Emily, a young American woman from the Midwest who moves to Paris for a job opportunity.",
      img: "https://www.whats-on-netflix.com/wp-content/uploads/2022/09/emily-in-paris-season-3-netflix-everything-we-know-so-far-jpg.webp",
      imgTitle:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Emily_in_Paris_logo.svg/1200px-Emily_in_Paris_logo.svg.png",
      imgVertical: "https://flxt.tmsimg.com/assets/p20738800_b_v13_ae.jpg",
      imgThumb:
        "https://www.israelhayom.co.il/wp-content/uploads/2022/01/16030876070113_b.jpg",
      trailer: "https://youtu.be/Xl3HY9yMEBI",
      movie: "https://youtu.be/Xl3HY9yMEBI",
      duration: "30 min",
      year: "2020",
      limit: "14",
      genre: "Fantasy",
      isSeries: true,
    },
    {
      title: "Doctor Who",
      description:
        "Doctor Who is a British science fiction television programme produced by the BBC. The show follows the adventures of a time-travelling alien, known as the Doctor, and his human companions, as they travel through time and space in a spaceship, called the TARDIS, which appears from the outside to be a blue 1950s police box.",
      img: "https://cdn.wallpapersafari.com/67/73/FkpDM5.jpg",
      imgTitle: "https://pbs.twimg.com/media/DdkXrGXW0AEK-cQ.png",
      imgThumb:
        "https://image.tmdb.org/t/p/w320_and_h180_bestv2/irTDkbtPQ4aM9YQw1uEevzk5rSz.jpg",
      imgVertical:
        "https://image.tmdb.org/t/p/original/jQmM0kRXf5yHD8y5exkLQttkHtX.jpg",
      trailer: "https://youtu.be/fJtoxieq40o",
      movie: "https://youtu.be/fJtoxieq40o",
      duration: "45 min",
      year: "2005",
      limit: "13",
      genre: "Fantasy",
      isSeries: true,
    },

    {
      title: "Game of Thrones",
      description:
        "Game of Thrones is an American fantasy drama television series created by David Benioff and D. B. Weiss for HBO. It is an adaptation of A Song of Ice and Fire, George R. R. Martin`s series of fantasy novels.",
      img: "https://hbomax-images.warnermediacdn.com/images/GVU4NYgvPQlFvjSoJAbmL/tile?size=1280x720&format=jpeg&partner=hbocom&v=46e72923a9154f662bf277d0f08160a3&host=art-gallery.api.hbo.com",
      imgTitle:
        "https://upload.wikimedia.org/wikipedia/commons/b/b5/Logo_Game_of_Thrones.png",
      imgThumb:
        "https://i.insider.com/5cad1c9ce031e8029732e822?width=1200&format=jpeg",
      imgVertical:
        "https://images2.minutemediacdn.com/image/fetch/c_fill,g_auto,f_auto,h_2731,w_1889/https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2019%2F04%2FGOT-Aftermath.jpeg",
      trailer: "https://youtu.be/bjqEWgDVPe0",
      movie: "https://youtu.be/bjqEWgDVPe0",
      duration: "1 hour",
      year: "2011",
      limit: "18",
      genre: "Comedy",
      isSeries: true,
    },
    {
      title: "Grimm",
      description:
        "Grimm is an American dark fantasy police procedural drama television series created by Stephen Carpenter and David Greenwalt and produced by Universal Television for NBC. It first aired on October 28, 2011 and ended on March 31, 2017.",
      img: "https://www.looper.com/img/gallery/the-real-reason-grimm-was-canceled/l-intro-1616170683.jpg",
      imgTitle:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Grimm_Logo.png/800px-Grimm_Logo.png",
      imgThumb:
        "https://vargiskhan.com/log/wp-content/uploads/2019/01/grimm-series-review.jpg",
      imgVertical:
        "https://m.media-amazon.com/images/M/MV5BMTkyODg2MzQwMV5BMl5BanBnXkFtZTgwNTA2MjE1MDI@._V1_FMjpg_UX1000_.jpg",
      trailer: "https://youtu.be/2-4xKNZ_gaA",
      movie: "https://youtu.be/2-4xKNZ_gaA",
      duration: "45 min",
      year: "2007",
      limit: "13",
      genre: "Comedy",
      isSeries: true,
    },
    {
      title: "Stranger Things",
      description:
        "Stranger Things is an American science fiction horror web television series created, written, and directed by the Duffer Brothers and released on Netflix. Set in the 1980s in the fictional town of Hawkins, Indiana, the season is about the disappearance of Will Byers and the ensuing search for him by his friends, family, and the local authorities.",
      img: "https://images.popbuzz.com/images/60844?width=1200&crop=16_9&signature=2u4eQjFlxR6DiS1ta_ezaYrUHEo=",
      imgTitle:
        "https://logos-world.net/wp-content/uploads/2020/05/Stranger-Things-Logo.png",
      imgThumb:
        "https://occ.a.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABV5lteI3eHet1nPBQKC_uEChESjqQfYpRwMWLR0wULt52odnxQtG69JNFDj9N4maZWJWDFZyi2sc1YzZ8mKE4Ajmt7Btva1CnWagGbYXVMp3t4OETM4LwiD70dHu-qWUbBAesQ.jpg?r=c68",
      imgVertical:
        "https://resizing.flixster.com/0xxuABVVuzJrUT130WFHKE-irEg=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vNzUyMTFhOTktZTU4Ni00ODkyLWJlYjQtZTgxYTllZmU2OGM0LmpwZw==",
      trailer: "https://youtu.be/b9EkMc79ZSU",
      movie: "https://youtu.be/b9EkMc79ZSU",
      duration: "1 hour",
      year: "2016",
      limit: "16",
      genre: "Action",
      isSeries: true,
    },
  ],
};
// {
//   title: 'Forrest Gump',
//   description:
//     'Forrest Gump is a 1994 comedy-drama film directed by Robert Zemeckis. It depicts several decades in the life of Forrest Gump, a slow-witted but kind and athletically-talented man.',
//   img: 'https://images-na.ssl-images-amazon.com/images/I/51kZ4gq%2B0HL._AC_SY679_.jpg',
//   imgTitle:
//     'https://www.pngmart.com/files/10/Forrest-Gump-PNG-Transparent-Image.png',
//   imgThumb:
//     'https://m.media-amazon.com/images/I/51kZ4gq+0HL._AC_.jpg',
//   imgVertical:
//     'https://i.pinimg.com/originals/d1/e8/7b/d1e87b06d4d2a9bea9f8f7e98b62aa51.jpg',
//   trailer: 'https://youtu.be/bLvqoHBptjg',
//   movie: 'https://youtu.be/bLvqoHBptjg',
//   duration: '2 hours 22 min',
//   year: '1994',
//   limit: '12',
//   genre: genres[Math.floor(Math.random() * genres.length)],
//   isSeries: false,
// },{
//   title: 'The Silence of the Lambs',
//   description:
//     'The Silence of the Lambs is a 1991 psychological horror film directed by Jonathan Demme. It follows a young FBI trainee seeking the help of Hannibal Lecter, a brilliant but insane serial killer, to catch another killer on the loose.',
//   img: 'https://images-na.ssl-images-amazon.com/images/I/51F2otWOq2L._AC_SY679_.jpg',
//   imgTitle:
//     'https://www.pngmart.com/files/12/The-Silence-of-the-Lambs-PNG-File.png',
//   imgThumb:
//     'https://m.media-amazon.com/images/I/51F2otWOq2L._AC_.jpg',
//   imgVertical:
//     'https://i.pinimg.com/originals/c3/3a/d6/c33ad6efcbf3d685a3a62a2a4cd864ea.jpg',
//   trailer: 'https://youtu.be/W6Mm8Sbe__o',
//   movie: 'https://youtu.be/W6Mm8Sbe__o',
//   duration: '1 hour 58 min',
//   year: '1991',
//   limit: '18',
//   genre: genres[Math.floor(Math.random() * genres.length)],
//   isSeries: false,
// },{
//   title: 'Jurassic Park',
//   description:
//     'Jurassic Park is a 1993 science fiction adventure film directed by Steven Spielberg. It is based on the 1990 novel of the same name by Michael Crichton and follows a group of people encountering cloned dinosaurs on a remote island.',
//   img: 'https://images-na.ssl-images-amazon.com/images/I/51pJdG6NiXL._AC_SY741_.jpg',
//   imgTitle:
//     'https://www.pngmart.com/files/12/Jurassic-Park-PNG-Free-Download.png',
//   imgThumb:
//     'https://m.media-amazon.com/images/I/51pJdG6NiXL._AC_.jpg',
//   imgVertical:
//     'https://i.pinimg.com/originals/57/da/2e/57da2e85f942a0c5c1a5a21f8c8223b3.jpg',
//   trailer: 'https://youtu.be/lc0UehYemQA',
//   movie: 'https://youtu.be/lc0UehYemQA',
//   duration: '2 hours 7 min',
//   year: '1993',
//   limit: '12',
//   genre: genres[Math.floor(Math.random() * genres.length)],
//   isSeries: false,
// },
// {
//   title: 'Avatar',
//   description:
//     'Avatar is a 2009 science fiction film directed by James Cameron. The film is set in the mid-22nd century when humans are colonizing Pandora, a lush habitable moon of a gas giant.',
//   img: 'https://www.joblo.com/assets/images/joblo/posters/2020/08/8Sq6hjMhOTJxvYztth2m2z7xg7.jpg',
//   imgTitle:
//     'https://www.pngmart.com/files/3/Avatar-PNG-Clipart.png',
//   imgThumb:
//     'https://i.redd.it/3g0l04dxszb51.jpg',
//   imgVertical:
//     'https://wallpapercave.com/wp/wp4154292.jpg',
//   trailer: 'https://youtu.be/6ziBFh3V1aM',
//   movie: 'https://youtu.be/6ziBFh3V1aM',
//   duration: '2 hours 42 min',
//   year: '2009',
//   limit: '12',
//   genre: genres[Math.floor(Math.random() * genres.length)],
//   isSeries: false,
// },
// {
//   title: 'The Grand Budapest Hotel',
//   description:
//     'The Grand Budapest Hotel is a 2014 comedy-drama film written and directed by Wes Anderson. The film recounts the adventures of Gustave H, a legendary concierge at a famous European hotel between the wars.',
//   img: 'https://images-na.ssl-images-amazon.com/images/I/81lD%2B9GgX2L._AC_SY679_.jpg',
//   imgTitle:
//     'https://www.pngmart.com/files/1/Grand-Budapest-Hotel-PNG-Free-Download.png',
//   imgThumb:
//     'https://imgc.allpostersimages.com/img/print/u-g-F5NYLZ0.jpg',
//   imgVertical:
//     'https://i.pinimg.com/originals/12/25/98/12259857911e6dfbdaafad86212d3c54.jpg',
//   trailer: 'https://youtu.be/1Fg5iWmQjwk',
//   movie: 'https://youtu.be/1Fg5iWmQjwk',
//   duration: '1 hour 39 min',
//   year: '2014',
//   limit: '12',
//   genre: genres[Math.floor(Math.random() * genres.length)],
//   isSeries: false,
// },
// {
//   title: 'Blade Runner 2049',
//   description:
//     'Blade Runner 2049 is a 2017 science fiction film directed by Denis Villeneuve. It is a sequel to the 1982 film Blade Runner and follows a new blade runner who unearths a long-buried secret.',
//   img: 'https://images-na.ssl-images-amazon.com/images/I/71U5zRNTSlL._AC_SY679_.jpg',
//   imgTitle:
//     'https://www.pngmart.com/files/7/Blade-Runner-2049-PNG-File.png',
//   imgThumb:
//     'https://i.redd.it/6o6rptys8r5z.jpg',
//   imgVertical:
//     'https://i.pinimg.com/originals/ae/7b/f5/ae7bf5041d56b0b37316a716e5f152ba.jpg',
//   trailer: 'https://youtu.be/gCcx85zbxz4',
//   movie: 'https://youtu.be/gCcx85zbxz4',
//   duration: '2 hours 44 min',
//   year: '2017',
//   limit: '15',
//   genre: genres[Math.floor(Math.random() * genres.length)],
//   isSeries: false,
// },
// {
//   title: 'The Shining',
//   description:
//     'The Shining is a 1980 psychological horror film directed by Stanley Kubrick. It is based on Stephen King\'s 1977 novel of the same name and stars Jack Nicholson as an aspiring writer who accepts a position as the off-season caretaker of the historic Overlook Hotel in the Colorado Rockies.',
//   img: 'https://images-na.ssl-images-amazon.com/images/I/61XFnqqLsmL._AC_SY679_.jpg',
//   imgTitle:
//     'https://www.pngmart.com/files/15/The-Shining-PNG-Photo.png',
//   imgThumb:
//     'https://m.media-amazon.com/images/I/91a0yqc6X6L._SL1500_.jpg',
//   imgVertical:
//     'https://i.pinimg.com/originals/68/61/2f/68612f4973c1cc97798214b0c95672f3.jpg',
//   trailer: 'https://youtu.be/HEew7zvpAWE',
//   movie: 'https://youtu.be/HEew7zvpAWE',
//   duration: '2 hours 26 min',
//   year: '1980',
//   limit: '18',
//   genre: genres[Math.floor(Math.random() * genres.length)],
//   isSeries: false,
// },
// {
//   title: 'La La Land',
//   description:
//     'La La Land is a 2016 musical romantic drama film written and directed by Damien Chazelle. The film is about a jazz musician and an aspiring actress who meet and fall in love while pursuing their dreams in Los Angeles.',
//   img: 'https://images-na.ssl-images-amazon.com/images/I/71b1q0wCvSL._AC_SY679_.jpg',
//   imgTitle:
//     'https://www.pngmart.com/files/4/La-La-Land-Transparent-Background.png',
//   imgThumb:
//     'https://www.indiewire.com/wp-content/uploads/2016/12/lala.jpg',
//   imgVertical:
//     'https://i.pinimg.com/originals/42/07/48/420748fb7f69f05ed9f3b3f32a01a496.jpg',
//   trailer: 'https://youtu.be/0pdqf4P9MB8',
//   movie: 'https://youtu.be/0pdqf4P9MB8',
//   duration: '2 hours 8 min',
//   year: '2016',
//   limit: '12',
//   genre: genres[Math.floor(Math.random() * genres.length)],
//   isSeries: false,
// },

export { data };
