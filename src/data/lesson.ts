interface Lesson {
  id: number;
  album: number;
  title: string;
  url: string;
  isCurrentlyPlaying: boolean;
  preview: string;
  text: string;
}

interface LessonsList{
  [key: string] : Lesson[]
}

const lessons: LessonsList  = {
  "album1": [
    {
      "id": 1,
      "album": 1,
      "title": "שיעור 1",
      "url": "/Videos/Album1/IMG_2789.mp4",
      "isCurrentlyPlaying": true,
      "preview": "/Videos/Album1/2789.jpg",
      "text": "הקדמה"
    },
    {
      "id": 2,
      "album": 1,
      "title": "שיעור 2",
      "url": "/Videos/Album1/IMG_2790.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album1/2790.jpg",
      "text": "הפרופיל המושלם"
    },
    {
      "id": 3,
      "album": 1,
      "title": "שיעור 3",
      "url": "/Videos/Album1/IMG_2791.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album1/2791.jpg",
      "text": "בניית ביו"
    },
    {
      "id": 4,
      "album": 1,
      "title": "שיעור 4",
      "url": "/Videos/Album1/IMG_2792.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album1/2792.jpg",
      "text": "חמשת המודלים"
    },
    {
      "id": 5,
      "album": 1,
      "title": "שיעור 5",
      "url": "/Videos/Album1/IMG_2793.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album1/2793.jpg",
      "text": "המודל הראשון"
    },
    {
      "id": 6,
      "album": 1,
      "title": "שיעור 6",
      "url": "/Videos/Album1/IMG_2794.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album1/2794.jpg",
      "text": "המודל השני"
    },
    {
      "id": 7,
      "album": 1,
      "title": "שיעור 7",
      "url": "/Videos/Album1/IMG_2795.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album1/2795.jpg",
      "text": "המודל השלישי"
    },
    {
      "id": 8,
      "album": 1,
      "title": "שיעור 8",
      "url": "/Videos/Album1/IMG_2796.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album1/2796.jpg",
      "text": "המודל הרביעי"
    },
    {
      "id": 9,
      "album": 1,
      "title": "שיעור 9",
      "url": "/Videos/Album1/IMG_2797.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album1/2797.jpg",
      "text": "המודל החמישי"
    }
  ],
  "album2": [
    {
      "id": 10,
      "album": 2,
      "title": "שיעור 1",
      "url": "/Videos/Album2/IMG_2853.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album2/2853.jpg",
      "text": "איך למגנט נשים"
    },
    {
      "id": 11,
      "album": 2,
      "title": "שיעור 2",
      "url": "/Videos/Album2/IMG_2854.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album2/2854.jpg",
      "text": "עוקבים"
    },
    {
      "id": 12,
      "album": 2,
      "title": "שיעור 3",
      "url": "/Videos/Album2/IMG_2856.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album2/2856.jpg",
      "text": "סטורים מעניינים"
    },
    {
      "id": 13,
      "album": 2,
      "title": "שיעור 4",
      "url": "/Videos/Album2/IMG_2857.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album2/2857.jpg",
      "text": "מה כדאי לי לפרסם"
    },
    {
      "id": 14,
      "album": 2,
      "title": "שיעור 5",
      "url": "/Videos/Album2/IMG_2858.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album2/2858.jpg",
      "text": "אחרי מי לעקוב"
    },
    {
      "id": 15,
      "album": 2,
      "title": "שיעור 6",
      "url": "/Videos/Album2/IMG_2860.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album2/2860.jpg",
      "text": "הייט לייטים"
    },
    {
      "id": 16,
      "album": 2,
      "title": "שיעור 7",
      "url": "/Videos/Album2/IMG_2861.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album2/2861.jpg",
      "text": "כל הסודות"
    },
    {
      "id": 17,
      "album": 2,
      "title": "שיעור 8",
      "url": "/Videos/Album2/IMG_2862.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album2/2862.jpg",
      "text": "1 - למה אינסטגרם"
    },
    {
      "id": 18,
      "album": 2,
      "title": "שיעור 9",
      "url": "/Videos/Album2/IMG_2863.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album2/2863.jpg",
      "text": "2 - למה אינסטגרם"
    },
    {
      "id": 19,
      "album": 2,
      "title": "שיעור 10",
      "url": "/Videos/Album2/IMG_2875.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album2/2875.jpg",
      "text": "בונוס - טירגוטים וקידום ממומן"
    }
  ],
  "album3": [
    {
      "id": 20,
      "album": 3,
      "title": "שיעור 1",
      "url": "/Videos/Album3/IMG_2901.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album3/2901.png",
      "text": "מהודעה לפגישה חלק"
    },
    {
      "id": 21,
      "album": 3,
      "title": "שיעור 2",
      "url": "/Videos/Album3/IMG_2902.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album3/2902.png",
      "text": "תבנית הודעה חלק"
    },
    {
      "id": 22,
      "album": 3,
      "title": "שיעור 3",
      "url": "/Videos/Album3/IMG_2903.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album3/2903.png",
      "text": "תבנית הודעה חלק"
    },
    {
      "id": 23,
      "album": 3,
      "title": "שיעור 4",
      "url": "/Videos/Album3/IMG_2904.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album3/2904.png",
      "text": "תבנית הודעה חלק"
    },
    {
      "id": 24,
      "album": 3,
      "title": "שיעור 5",
      "url": "/Videos/Album3/IMG_2905.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album3/2905.png",
      "text": "דוגמא מהפרופיל המושלם חלק"
    },
    {
      "id": 25,
      "album": 3,
      "title": "שיעור 6",
      "url": "/Videos/Album3/IMG_2906.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album3/2906.png",
      "text": "דוגמא מהודעות עם נשים חלק"
    },
    {
      "id": 26,
      "album": 3,
      "title": "שיעור 7",
      "url": "/Videos/Album3/IMG_2907.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album3/2907.png",
      "text": "הסבר סיום קורס חלק"
    },
    {
      "id": 27,
      "album": 3,
      "title": "שיעור 8",
      "url": "/Videos/Album3/IMG_2908.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album3/2908.png",
      "text": "איך לחיות כמו דן בלזיריאן בונוס"
    },
    {
      "id": 28,
      "album": 3,
      "title": "שיעור 9",
      "url": "/Videos/Album3/IMG_2909.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album3/2909.png",
      "text": "לצאת לבד בונוס"
    },
    {
      "id": 29,
      "album": 3,
      "title": "שיעור 10",
      "url": "/Videos/Album3/IMG_2910.mp4",
      "isCurrentlyPlaying": false,
      "preview": "/Videos/Album3/2910.png",
      "text": "פסיכולוגיה נשית בונוס"
    }
  ]
}

export default lessons;
