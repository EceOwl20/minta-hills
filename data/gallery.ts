// Home page gallery
export const homeGalleryImages = [
  {
    id: "sunset",
    src: "/images/exteriors/dusk-1.jpg",
    featured: true,
  },
  {
    id: "bedroom",
    src: "/images/interiors/bedroom-2.jpg",
    featured: false,
  },
  {
    id: "pool",
    src: "/images/exteriors/pool-2.jpg",
    featured: false,
  },
] as const;

// Gallery page hero
export const galleryHero = {
  image: "/images/exteriors/banner-about.jpg",
} as const;

// Gallery categories
export const galleryCategories = [
  "activities",
  "garden",
  "gardenEvening",
  "pool",
  "poolOutdoor",
  "cafeteria",
  "socialArea",
  "villaExterior",
  "villaInterior",
  "walkingPaths",
] as const;

// Gallery types
export type GalleryCategory =
  (typeof galleryCategories)[number];

export type GalleryFilter = "all" | GalleryCategory;

export type GalleryPhoto = {
  id: string;
  category: GalleryCategory;
  src: string;
  width: number;
  height: number;
  captionKey: string;
};

export type GalleryGroupData = {
  id: GalleryCategory;
  photos: readonly GalleryPhoto[];
};

type GalleryFolder =
  | "exteriors"
  | "gallery"
  | "hospitality"
  | "interiors";

// Gallery photo helper
function createPhoto(
  id: string,
  category: GalleryCategory,
  folder: GalleryFolder,
  fileName: string,
  width: number,
  height: number,
  captionKey: string
): GalleryPhoto {
  return {
    id,
    category,
    src: `/images/${folder}/${fileName}`,
    width,
    height,
    captionKey,
  };
}

// Gallery photos
export const galleryPhotos: readonly GalleryPhoto[] = [
  // Activities
  createPhoto(
    "activity01", "activities", "gallery",
    "IHSO3109.JPG", 1536, 2040, "outdoorActivity"
  ),

  // Garden
  createPhoto(
    "garden01", "garden", "exteriors",
    "garden-2.jpg", 900, 1200, "villaGarden"
  ),
  createPhoto(
    "garden02", "garden", "exteriors",
    "garden-lawn.jpg", 900, 1200, "gardenLawn"
  ),
  createPhoto(
    "garden03", "garden", "exteriors",
    "garden-palm.jpg", 900, 1200, "palmGarden"
  ),
  createPhoto(
    "garden04", "garden", "gallery",
    "BRVY9413.JPG", 1536, 2040, "gardenFlowers"
  ),
  createPhoto(
    "garden05", "garden", "gallery",
    "ETVP1901.JPG", 1536, 2040, "villaGarden"
  ),
  createPhoto(
    "garden06", "garden", "gallery",
    "IZPB5736.JPG", 1536, 2040, "villaGarden"
  ),
  createPhoto(
    "garden07", "garden", "gallery",
    "PLGI6329.JPG", 1536, 2040, "gardenPlants"
  ),
  createPhoto(
    "garden08", "garden", "gallery",
    "VTYA4989.JPG", 1536, 2040, "villaGarden"
  ),

  // Garden & Evening
  createPhoto(
    "evening01", "gardenEvening", "exteriors",
    "dusk-1.jpg", 1400, 1050, "gardenAtDusk"
  ),
  createPhoto(
    "evening02", "gardenEvening", "exteriors",
    "dusk-2.jpg", 1400, 1050, "gardenAtDusk"
  ),
  createPhoto(
    "evening03", "gardenEvening", "exteriors",
    "garden-3.jpg", 900, 1200, "illuminatedGarden"
  ),
  createPhoto(
    "evening04", "gardenEvening", "exteriors",
    "villa-night.jpg", 1400, 1050, "villaAtNight"
  ),
  createPhoto(
    "evening05", "gardenEvening", "gallery",
    "FVOH3571.JPG", 1536, 2040, "illuminatedPath"
  ),
  createPhoto(
    "evening06", "gardenEvening", "gallery",
    "MNTS3009.JPG", 1536, 2040, "illuminatedGarden"
  ),
  createPhoto(
    "evening07", "gardenEvening", "gallery",
    "SJKE5856.JPG", 2040, 1536, "gardenAtDusk"
  ),

  // Pool

  createPhoto(
    "pool01", "pool", "gallery",
    "CURJ0855.JPG", 1536, 2040, "outdoorPool"
  ),
  createPhoto(
    "pool02", "pool", "gallery",
    "DCSD8156.JPG", 1536, 2040, "poolAtNight"
  ),
  createPhoto(
    "pool03", "pool", "gallery",
    "RCNX1457.JPG", 1536, 2040, "poolAtNight"
  ),


  // Pool & Outdoor Areas
  createPhoto(
    "poolOutdoor01", "poolOutdoor", "exteriors",
    "pool-wide.jpg", 1400, 933, "poolAndVillas"
  ),
  
  createPhoto(
    "poolOutdoor02", "poolOutdoor", "gallery",
    "JRML8039.JPG", 1536, 2040, "poolGarden"
  ),

    createPhoto(
    "poolOutdoor03", "poolOutdoor", "exteriors",
    "pool-1.jpg", 1400, 933, "poolAtNight"
  ),
  createPhoto(
    "poolOutdoor04", "poolOutdoor", "exteriors",
    "pool-2.jpg", 1400, 933, "outdoorPool"
  ),
  createPhoto(
    "poolOutdoor05", "poolOutdoor", "exteriors",
    "pool-detail.jpg", 1400, 933, "poolDetail"
  ),

    createPhoto(
    "poolOutdoor06", "poolOutdoor", "exteriors",
    "villa-night.jpg", 1400, 933, "poolDetail"
  ),

     createPhoto(
    "poolOutdoor07", "poolOutdoor", "exteriors",
    "villa-2.jpg", 1400, 933, "poolDetail"
  ),

       createPhoto(
    "poolOutdoor08", "poolOutdoor", "exteriors",
    "dusk-1.jpg", 1400, 1050, "poolDetail"
  ),
  
       createPhoto(
    "poolOutdoor09", "poolOutdoor", "exteriors",
    "hero-2.jpg", 1600, 900, "poolDetail"
  ),

         createPhoto(
    "poolOutdoor09", "poolOutdoor", "exteriors",
    "villa-1.jpg", 1400, 950, "poolDetail"
  ),



  // Cafeteria
  createPhoto(
    "cafeteria01", "cafeteria", "hospitality",
    "cafe-1.jpg", 1400, 1050, "cafeteria"
  ),
  createPhoto(
    "cafeteria02", "cafeteria", "hospitality",
    "cafe-2.jpg", 1400, 933, "cafeteria"
  ),
  createPhoto(
    "cafeteria03", "cafeteria", "hospitality",
    "cafe-3.jpg", 1400, 933, "cafeteria"
  ),
  createPhoto(
    "cafeteria04", "cafeteria", "hospitality",
    "cafe-building.jpg", 1400, 1050, "cafeteriaBuilding"
  ),

  // Social Areas
  createPhoto(
    "social01", "socialArea", "gallery",
    "CYXH3230.JPG", 1536, 2040, "outdoorSeating"
  ),
  createPhoto(
    "social02", "socialArea", "gallery",
    "DUYY0535.JPG", 1536, 2040, "eveningSeating"
  ),

  // Villa Exterior
  createPhoto(
    "villaExterior01", "villaExterior", "exteriors",
    "villa-1.jpg", 1400, 933, "villaExterior"
  ),
  createPhoto(
    "villaExterior02", "villaExterior", "exteriors",
    "villa-2.jpg", 1400, 933, "villaTerrace"
  ),
  createPhoto(
    "villaExterior03", "villaExterior", "exteriors",
    "villa-3.jpg", 1400, 933, "villaEntrance"
  ),
  createPhoto(
    "villaExterior04", "villaExterior", "exteriors",
    "villa-4.jpg", 1400, 933, "villaTerrace"
  ),

  // Villa Interior
  createPhoto(
    "villaInterior01", "villaInterior", "interiors",
    "living.jpg", 1400, 933, "livingRoom"
  ),
  createPhoto(
    "villaInterior02", "villaInterior", "interiors",
    "living-2.jpg", 1400, 933, "livingRoom"
  ),
  createPhoto(
    "villaInterior03", "villaInterior", "interiors",
    "living-3.jpg", 1400, 933, "livingRoom"
  ),
  createPhoto(
    "villaInterior04", "villaInterior", "interiors",
    "kitchen.jpg", 1400, 933, "villaKitchen"
  ),
  createPhoto(
    "villaInterior05", "villaInterior", "interiors",
    "kitchen-2.jpg", 1400, 933, "villaKitchen"
  ),
  createPhoto(
    "villaInterior06", "villaInterior", "interiors",
    "bedroom.jpg", 1400, 933, "villaBedroom"
  ),
  createPhoto(
    "villaInterior07", "villaInterior", "interiors",
    "bedroom-2.jpg", 1400, 933, "villaBedroom"
  ),
  createPhoto(
    "villaInterior08", "villaInterior", "interiors",
    "bedroom-3.jpg", 1400, 933, "villaBedroom"
  ),
  createPhoto(
    "villaInterior09", "villaInterior", "interiors",
    "bedroom-4.jpg", 1400, 933, "villaBedroom"
  ),
  createPhoto(
    "villaInterior10", "villaInterior", "interiors",
    "bath.jpg", 1400, 933, "villaBathroom"
  ),

  // Walking Paths
  createPhoto(
    "walking01", "walkingPaths", "gallery",
    "ASFE6511.JPG", 1536, 2040, "gardenPath"
  ),
  createPhoto(
    "walking02", "walkingPaths", "gallery",
    "ESRO6052.JPG", 1536, 2040, "villaPath"
  ),
  createPhoto(
    "walking03", "walkingPaths", "gallery",
    "FWKW5695.JPG", 1536, 2040, "villaPath"
  ),
  createPhoto(
    "walking04", "walkingPaths", "gallery",
    "QSWR6272.JPG", 1536, 2040, "gardenPath"
  ),
  createPhoto(
    "walking05", "walkingPaths", "gallery",
    "SKCX6410.JPG", 1536, 2040, "villaPath"
  ),
  createPhoto(
    "walking06", "walkingPaths", "exteriors",
    "garden-4.jpg", 900, 1200, "villaPath"
  ),
];

// Gallery groups
export const galleryGroups: readonly GalleryGroupData[] =
  galleryCategories
    .map((category) => ({
      id: category,
      photos: galleryPhotos.filter(
        (photo) => photo.category === category
      ),
    }))
    .filter((group) => group.photos.length > 0);

// Dynamic gallery photo count
export const galleryPhotoCount = galleryPhotos.length;