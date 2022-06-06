export const countries = [
  //     IF OBJECT_ID(N'tempdb..#Temp') IS NOT NULL
  // BEGIN
  // DROP TABLE #Temp
  // END
  // CREATE TABLE #Temp
  // (
  //   Country  varchar(255),
  // )

  // DECLARE @i int = 0
  // WHILE @i < 18464

  // BEGIN
  // DECLARE @StringList AS VARCHAR(1000)= (SELECT Country
  // FROM (
  // SELECT ROW_NUMBER() OVER (ORDER BY Id) AS RowNum, Country
  // FROM [Comp306].[dbo].[Shows]
  // ) T
  // WHERE RowNum IN (@i))

  // INSERT INTO #Temp
  // SELECT
  //     TRIM(value)
  // FROM
  //     STRING_SPLIT(@StringList,',')

  // SET @i = @i + 1
  // end
  //  SELECT distinct * FROM #Temp order by Country
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Albania", label: "Albania" },
  { value: "Algeria", label: "Algeria" },
  { value: "Angola", label: "Angola" },
  { value: "Argentina", label: "Argentina" },
  { value: "Armenia", label: "Armenia" },
  { value: "Australia", label: "Australia" },
  { value: "Austria", label: "Austria" },
  { value: "Azerbaijan", label: "Azerbaijan" },
  { value: "Bahamas", label: "Bahamas" },
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "Belarus", label: "Belarus" },
  { value: "Belgium", label: "Belgium" },
  { value: "Bermuda", label: "Bermuda" },
  { value: "Botswana", label: "Botswana" },
  { value: "Brazil", label: "Brazil" },
  { value: "Bulgaria", label: "Bulgaria" },
  { value: "Burkina Faso", label: "Burkina Faso" },
  { value: "Cambodia", label: "Cambodia" },
  { value: "Cameroon", label: "Cameroon" },
  { value: "Canada", label: "Canada" },
  { value: "Cayman Islands", label: "Cayman Islands" },
  { value: "Chile", label: "Chile" },
  { value: "China", label: "China" },
  { value: "Colombia", label: "Colombia" },
  { value: "Croatia", label: "Croatia" },
  { value: "Cuba", label: "Cuba" },
  { value: "Cyprus", label: "Cyprus" },
  { value: "Czech Republic", label: "Czech Republic" },
  { value: "Denmark", label: "Denmark" },
  { value: "Dominican Republic", label: "Dominican Republic" },
  { value: "East Germany", label: "East Germany" },
  { value: "Ecuador", label: "Ecuador" },
  { value: "Egypt", label: "Egypt" },
  { value: "Ethiopia", label: "Ethiopia" },
  { value: "Finland", label: "Finland" },
  { value: "France", label: "France" },
  { value: "Georgia", label: "Georgia" },
  { value: "Germany", label: "Germany" },
  { value: "Ghana", label: "Ghana" },
  { value: "Greece", label: "Greece" },
  { value: "Guatemala", label: "Guatemala" },
  { value: "Hong Kong", label: "Hong Kong" },
  { value: "Hungary", label: "Hungary" },
  { value: "Iceland", label: "Iceland" },
  { value: "India", label: "India" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Iran", label: "Iran" },
  { value: "Iraq", label: "Iraq" },
  { value: "Ireland", label: "Ireland" },
  { value: "Israel", label: "Israel" },
  { value: "Italy", label: "Italy" },
  { value: "Jamaica", label: "Jamaica" },
  { value: "Japan", label: "Japan" },
  { value: "Jordan", label: "Jordan" },
  { value: "Kazakhstan", label: "Kazakhstan" },
  { value: "Kenya", label: "Kenya" },
  { value: "Kosovo", label: "Kosovo" },
  { value: "Kuwait", label: "Kuwait" },
  { value: "Latvia", label: "Latvia" },
  { value: "Lebanon", label: "Lebanon" },
  { value: "Liechtenstein", label: "Liechtenstein" },
  { value: "Lithuania", label: "Lithuania" },
  { value: "Luxembourg", label: "Luxembourg" },
  { value: "Malawi", label: "Malawi" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Malta", label: "Malta" },
  { value: "Mauritius", label: "Mauritius" },
  { value: "Mexico", label: "Mexico" },
  { value: "Monaco", label: "Monaco" },
  { value: "Mongolia", label: "Mongolia" },
  { value: "Montenegro", label: "Montenegro" },
  { value: "Morocco", label: "Morocco" },
  { value: "Mozambique", label: "Mozambique" },
  { value: "Namibia", label: "Namibia" },
  { value: "Nepal", label: "Nepal" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "New Zealand", label: "New Zealand" },
  { value: "Nicaragua", label: "Nicaragua" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "Norway", label: "Norway" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Palestine", label: "Palestine" },
  { value: "Panama", label: "Panama" },
  { value: "Paraguay", label: "Paraguay" },
  { value: "Peru", label: "Peru" },
  { value: "Philippines", label: "Philippines" },
  { value: "Poland", label: "Poland" },
  { value: "Portugal", label: "Portugal" },
  { value: "Puerto Rico", label: "Puerto Rico" },
  { value: "Qatar", label: "Qatar" },
  { value: "Romania", label: "Romania" },
  { value: "Russia", label: "Russia" },
  { value: "Samoa", label: "Samoa" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "Senegal", label: "Senegal" },
  { value: "Serbia", label: "Serbia" },
  { value: "Singapore", label: "Singapore" },
  { value: "Slovakia", label: "Slovakia" },
  { value: "Slovenia", label: "Slovenia" },
  { value: "Somalia", label: "Somalia" },
  { value: "South Africa", label: "South Africa" },
  { value: "South Korea", label: "South Korea" },
  { value: "Soviet Union", label: "Soviet Union" },
  { value: "Spain", label: "Spain" },
  { value: "Sri Lanka", label: "Sri Lanka" },
  { value: "Sudan", label: "Sudan" },
  { value: "Sweden", label: "Sweden" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "Syria", label: "Syria" },
  { value: "Taiwan", label: "Taiwan" },
  { value: "Thailand", label: "Thailand" },
  { value: "Turkey", label: "Turkey" },
  { value: "Uganda", label: "Uganda" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "United Arab Emirates", label: "United Arab Emirates" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States", label: "United States" },
  { value: "Uruguay", label: "Uruguay" },
  { value: "Vatican City", label: "Vatican City" },
  { value: "Venezuela", label: "Venezuela" },
  { value: "Vietnam", label: "Vietnam" },
  { value: "West Germany", label: "West Germany" },
  { value: "Zimbabwe", label: "Zimbabwe" },
];

export const genres = [
  // IF OBJECT_ID(N'tempdb..#Temp') IS NOT NULL
  // BEGIN
  // DROP TABLE #Temp
  // END
  // CREATE TABLE #Temp
  // (
  //   Listed_In varchar(255),
  // )

  // DECLARE @i int = 0
  // WHILE @i < 18464

  // BEGIN
  // DECLARE @StringList AS VARCHAR(1000)= (SELECT Listed_In
  // FROM (
  // SELECT ROW_NUMBER() OVER (ORDER BY Id) AS RowNum, Listed_In
  // FROM [Comp306].[dbo].[Shows]
  // ) T
  // WHERE RowNum IN (@i))

  // INSERT INTO #Temp
  // SELECT
  //     TRIM(value)
  // FROM
  //     STRING_SPLIT(@StringList,',')

  // SET @i = @i + 1
  // end
  //  SELECT distinct * FROM #Temp order by Listed_In
  { value: "Action", label: "Action" },
  { value: "Action & Adventure", label: "Action & Adventure" },
  { value: "Adventure", label: "Adventure" },
  { value: "Animation", label: "Animation" },
  { value: "Anime", label: "Anime" },
  { value: "Anime Features", label: "Anime Features" },
  { value: "Anime Series", label: "Anime Series" },
  { value: "Arthouse", label: "Arthouse" },
  { value: "Arts", label: "Arts" },
  { value: "British TV Shows", label: "British TV Shows" },
  { value: "Children & Family Movies", label: "Children & Family Movies" },
  { value: "Classic & Cult TV", label: "Classic & Cult TV" },
  { value: "Classic Movies", label: "Classic Movies" },
  { value: "Comedies", label: "Comedies" },
  { value: "Comedy", label: "Comedy" },
  { value: "Crime TV Shows", label: "Crime TV Shows" },
  { value: "Cult Movies", label: "Cult Movies" },
  { value: "Documentaries", label: "Documentaries" },
  { value: "Documentary", label: "Documentary" },
  { value: "Docuseries", label: "Docuseries" },
  { value: "Drama", label: "Drama" },
  { value: "Dramas", label: "Dramas" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Faith & Spirituality", label: "Faith & Spirituality" },
  { value: "Faith and Spirituality", label: "Faith and Spirituality" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "Fitness", label: "Fitness" },
  { value: "Historical", label: "Historical" },
  { value: "Horror", label: "Horror" },
  { value: "Horror Movies", label: "Horror Movies" },
  { value: "Independent Movies", label: "Independent Movies" },
  { value: "International", label: "International" },
  { value: "International Movies", label: "International Movies" },
  { value: "International TV Shows", label: "International TV Shows" },
  { value: "Kids", label: "Kids" },
  { value: "Kids TV", label: "Kids TV" },
  { value: "Korean TV Shows", label: "Korean TV Shows" },
  { value: "LGBTQ", label: "LGBTQ" },
  { value: "LGBTQ Movies", label: "LGBTQ Movies" },
  { value: "Military and War", label: "Military and War" },
  { value: "Movies", label: "Movies" },
  { value: "Music & Musicals", label: "Music & Musicals" },
  { value: "Music Videos and Concerts", label: "Music Videos and Concerts" },
  { value: "Reality TV", label: "Reality TV" },
  { value: "Romance", label: "Romance" },
  { value: "Romantic Movies", label: "Romantic Movies" },
  { value: "Romantic TV Shows", label: "Romantic TV Shows" },
  { value: "Science & Nature TV", label: "Science & Nature TV" },
  { value: "Science Fiction", label: "Science Fiction" },
  { value: "Sci-Fi & Fantasy", label: "Sci-Fi & Fantasy" },
  { value: "Spanish-Language TV Shows", label: "Spanish-Language TV Shows" },
  { value: "Special Interest", label: "Special Interest" },
  { value: "Sports", label: "Sports" },
  { value: "Sports Movies", label: "Sports Movies" },
  { value: "Stand-Up Comedy", label: "Stand-Up Comedy" },
  {
    value: "Stand-Up Comedy & Talk Shows",
    label: "Stand-Up Comedy & Talk Shows",
  },
  { value: "Suspense", label: "Suspense" },
  { value: "Talk Show and Variety", label: "Talk Show and Variety" },
  { value: "Teen TV Shows", label: "Teen TV Shows" },
  { value: "Thrillers", label: "Thrillers" },
  { value: "TV Action & Adventure", label: "TV Action & Adventure" },
  { value: "TV Comedies", label: "TV Comedies" },
  { value: "TV Dramas", label: "TV Dramas" },
  { value: "TV Horror", label: "TV Horror" },
  { value: "TV Mysteries", label: "TV Mysteries" },
  { value: "TV Sci-Fi & Fantasy", label: "TV Sci-Fi & Fantasy" },
  { value: "TV Shows", label: "TV Shows" },
  { value: "TV Thrillers", label: "TV Thrillers" },
  { value: "Unscripted", label: "Unscripted" },
  { value: "Western", label: "Western" },
  { value: "Young Adult Audience", label: "Young Adult Audience" },
];
