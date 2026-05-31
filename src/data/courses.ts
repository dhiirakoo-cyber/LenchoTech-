/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'web-dev',
    titleOm: 'Web Development Guutuu',
    titleEn: 'Full Web Development',
    descOm: 'HTML, CSS, JavaScript fi Supabase bifa salphaafi qabatamaa ta\'een baradhu.',
    descEn: 'Learn HTML, CSS, JavaScript, and Supabase step by step with interactive lessons.',
    category: 'Coding',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600',
    duration: '15 Hrs',
    lessons: [
      {
        id: 'web-dev-1',
        titleOm: 'Seensa HTML fi Caasaa Web',
        titleEn: 'Introduction to HTML & Web Structure',
        duration: '45 mins',
        summaryOm: 'Caasaa bu\'uuraa weebsaayiitii uumuu fi taagoota ijoo baradhu.',
        summaryEn: 'Learn the foundational structure of web pages and master basic tags.',
        contentOm: `
### Maalummaa HTML (HyperText Markup Language)
HTML caasaa bu'uuraa weebsaayiitii kamiiyyuu uumuuf gargaara. Akkuma lafee namaa weebsaayiitiif tajaajila.

#### Taagota Ijoo (Core Tags)
1. \`<h1>\` hanga \`<h6>\`: Mata-dureewwan adda addaa uumuuf.
2. \`<p>\`: Keeyyata (paragraph) barruuf.
3. \`<a>\`: Geessituu (link) gara weebsaayiti biraa geessu uumuuf.
4. \`<img>\`: Fakkiiwwan galchuuf.

#### Caasaa Bu'uuraa (Basic Skeleton)
\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>Amoo Academy</title>
</head>
<body>
  <h1>Baga Nagaan Dhuftan!</h1>
  <p>Kun barumsa kooti.</p>
</body>
</html>
\`\`\`
        `,
        contentEn: `
### What is HTML?
HTML stands for HyperText Markup Language. It builds the skeleton of every website you see on the internet, acting just like the structural framing of a house.

#### Essential Tags to Know:
1. \`<h1>\` to \`<h6>\`: Heading levels from most important to least important.
2. \`<p>\`: Standard paragraph text for articles or descriptions.
3. \`<a>\`: Anchor tags to create clickable hyperlinks to other pages.
4. \`<img>\`: Inline image containers to render photos or vector graphics.

#### Standard Skeleton:
\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>Amoo Academy</title>
</head>
<body>
  <h1>Welcome to the Course!</h1>
  <p>This is my first paragraph on the web.</p>
</body>
</html>
\`\`\`
        `,
        codeSnippet: `<!DOCTYPE html>
<html>
<head>
  <title>Amoo Academy Practice</title>
</head>
<body>
  <h1>Amoo Academy</h1>
  <p>Barumsa HTML as irratti shaakali!</p>
</body>
</html>`,
        quizQuestionOm: 'Taagiin keeyyata (paragraph) weebsaayitiitti galchuuf gargaaru isa kami?',
        quizOptionsOm: ['<a>', '<p>', '<h1>', '<div>'],
        quizAnswerOm: '<p>',
        quizQuestionEn: 'Which HTML tag is used to define a standard paragraph?',
        quizOptionsEn: ['<a>', '<p>', '<h1>', '<div>'],
        quizAnswerEn: '<p>'
      },
      {
        id: 'web-dev-2',
        titleOm: 'CSS fi Tailwind Midhagsuu',
        titleEn: 'Styling with CSS and Tailwind CSS',
        duration: '1 hr 15 mins',
        summaryOm: 'Weebsaayitiidhaaf bifaa fi boca akkamitti akka badhaasnu baradhu.',
        summaryEn: 'Discover the power of visual styling using modern utility-first CSS Framework classes.',
        contentOm: `
### CSS fi Tailwind CSS Maali?
*CSS (Cascading Style Sheets)* weebsaayitiitti bareedina, bifa, halluu fi layaat (layout) uumuuf tajaajila. 
**Tailwind CSS** ammoo freemworkii CSS tajaajila salphisu yoo ta'u, klasiwwan duraan qophaa'an fayyadamuun reefuun midhagsuuf gargaara.

#### Fakkeenya Klasiwwan Tailwind:
* \`bg-blue-600\`: Halluu duubaa (Background) buluu gochuuf.
* \`text-white\`: Qubee adiitti jijjiiruuf.
* \`p-4\`: Paadiingii (Keessoo) dabalachuuf.
* \`rounded-xl\`: Koonee elementii jallisuuf.
* \`shadow-lg\`: Gaaddidduu uumuuf.

#### Shaakala:
\`\`\`html
<button class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition shadow">
  Amoo Click!
</button>
\`\`\`
        `,
        contentEn: `
### CSS and Tailwind CSS Basics
*CSS (Cascading Style Sheets)* provides the styling, styling rules, typography, grid spacing, and appearance of your HTML structure.

**Tailwind CSS** is a modern utility-first CSS framework that lets you directly apply styles in your HTML/JSX code via pre-defined classes, eliminating the need to write traditional monolithic stylesheets.

#### Fundamental Tailwind Utility Categories:
* **Backgrounds & Colors**: \`bg-slate-900\`, \`text-blue-400\`
* **Spacing (Padding & Margins)**: \`p-6\` (padding), \`mt-4\` (margin top)
* **Flexbox & Grid**: \`flex\`, \`items-center\`, \`justify-between\`
* **Borders & Corners**: \`border\`, \`border-slate-700\`, \`rounded-2xl\`
* **Interactions**: \`hover:scale-105\`, \`transition-all\`, \`duration-300\`

#### Inline Example:
\`\`\`html
<div class="p-6 bg-slate-800 rounded-2xl border border-slate-700">
  <h3 class="text-xl font-bold text-white">Interactive Card</h3>
</div>
\`\`\`
        `,
        codeSnippet: `<div class="p-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-xl text-center">
  <h3 class="text-2xl font-black text-white">Barruu Bareedduu</h3>
  <p class="text-blue-100 text-sm mt-2">Tailwind bareeda dhaa!</p>
</div>`,
        quizQuestionOm: 'Klasiin Tailwind halluu duubaa (background) diimaa gochuuf gargaaru isa kami?',
        quizOptionsOm: ['text-red-500', 'bg-red-500', 'border-red-500', 'p-red-500'],
        quizAnswerOm: 'bg-red-500',
        quizQuestionEn: 'Which Tailwind CSS utility prefix is used to change the background color?',
        quizOptionsEn: ['text-', 'bg-', 'border-', 'shadow-'],
        quizAnswerEn: 'bg-'
      },
      {
        id: 'web-dev-3',
        titleOm: 'JavaScript Dynamic fi Supabase Database',
        titleEn: 'Dynamic JavaScript & Supabase Database',
        duration: '2 hours',
        summaryOm: 'Weebsaayitiitti jireenya gochuufii dynamic gochuu akkasumas database qabsiisuu.',
        summaryEn: 'Add interactivity to your client app with JavaScript and connect it to Supabase databases.',
        contentOm: `
### JavaScript fi Supabase Integrasidhaa
Dynamic gochuuf **JavaScript** fayyadamna (akkuma qaama sochoosuudha). **Supabase** ammoo Backend-as-a-Service ta'ee can tajaajilu yoo ta'u, kuusaa ragaa (Database) fi Auth nuuf kenna.

#### Supabase Auth Bifa Salphaan:
\`\`\`javascript
// Seenuuf (Sign In)
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'example@gmail.com',
  password: 'super-secure-password'
});

// Ba'uuf (Sign Out)
await supabase.auth.signOut();
\`\`\`

Supabase madaalessaa fi salphaa waan ta'eef, weebsaayiiti adda addaa hojjachuuf furmaata gaariidha.
        `,
        contentEn: `
### Dynamic JavaScript & Supabase
JavaScript brings web pages to life by creating interactive behaviors (dynamic interfaces, responding to input events, making network requests).

**Supabase** in turn provides a fully managed open-source Firebase alternative, built on top of Postgres. It gives you instant RESTful APIs, real-time sync, and robust user Authentication.

#### Example Supabase Auth Pattern:
\`\`\`javascript
// Log in existing user
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@amoo.com',
  password: 'mysecurepassword'
});

// Query items from database table "courses"
const { data: courses } = await supabase
  .from('courses')
  .select('*');
\`\`\`
        `,
        codeSnippet: `// Fakkeenya callback JavaScript
const daganNagaan = (maqaa) => {
  return "Baga Nagaan dhufte: " + maqaa + "!";
};
console.log(daganNagaan("Amoo Academy Student"));`,
        quizQuestionOm: 'Function Supabase kanaan dura dhabamee seenaa (login) uumuuf tajaajilu kam?',
        quizOptionsOm: ['supabase.auth.signInWithPassword()', 'supabase.auth.signUp()', 'supabase.from().select()', 'supabase.auth.signOut()'],
        quizAnswerOm: 'supabase.auth.signInWithPassword()',
        quizQuestionEn: 'Which Supabase SDK function is used to authenticate a user with their email and password?',
        quizOptionsEn: ['supabase.auth.signUp()', 'supabase.auth.signInWithPassword()', 'supabase.auth.signOut()', 'supabase.from().select()'],
        quizAnswerEn: 'supabase.auth.signInWithPassword()'
      }
    ]
  },
  {
    id: 'video-editing',
    titleOm: 'Gulaallii Viidiyoo (Premium)',
    titleEn: 'Premium Video Editing Mastery',
    descOm: 'Gulaallii viidiyoo TikTok, YouTube fi Gidduu hojii adda addaaf gulaallii dammaqe.',
    descEn: 'Master high-conversion video editing for TikTok, YouTube, Reels, and professional agencies.',
    category: 'Video Editing',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600',
    duration: '10 Hrs',
    lessons: [
      {
        id: 'video-edit-1',
        titleOm: 'Wirtuu Gulaallii fi Ciriinsa Bu\'uuraa',
        titleEn: 'The Timeline & Basic Cuts',
        duration: '50 mins',
        summaryOm: 'Tiriimtota adda addaa ciriuun, caasaa seenaa uumuu baradhu.',
        summaryEn: 'Learn how to master the timeline, slice footage, and arrange story sequences.',
        contentOm: `
### Timeline fi Curiinsa (Timeline & Cutting)
Gulaallii viidiyoo keessatti wirtuun hojii **Timeline** jedhama. Ciriinsonni (Cuts) saganticharratti bifa adda addaan godhama.

#### Gosoota Ciriinsaa (Types of Cuts):
1. **Hard Cut**: Ciriinsa tokko irraa gara isa lammataatti bifa battalaa ta'een darbuu.
2. **Jump Cut**: Viidiyoo tokko keessatti yaroo muraasa qulqulleessuun, akka namni sosocho'u gochuu (fayyadamaa baay'ee TikTok irratti).
3. **J-Cut**: Sagaleen viidiyoo itti aanuuf jiru dursee yoo jalqabu.
4. **L-Cut**: Sagaleen viidiyoo darbe sanaa keessatti itti fufuun mul'atu yoo ta'e.

Ciriinsa bareeda qabaachuun barreeffama viidiyichaa qindeessuuf baay'ee murteessaadha!
        `,
        contentEn: `
### Understanding the Timeline
The timeline is the absolute control center of your editing workflow. Placing, trimming, and positioning clips determines the narrative pacing of your edit.

#### Standard Cuts All Professionals Use:
1. **Standard Cut**: Simple visual replacement of one scene with the next with no transition.
2. **Jump Cut**: A cut in a single continuous shot that makes the subject appear to 'jump' forward in time (heavily used on YouTube/TikTok for high energy pacing).
3. **J-Cut**: When the audio of the upcoming clip plays before you visually transition to it. This creates smooth, conversational pacing.
4. **L-Cut**: When the audio of the current clip continues carrying into the next incoming visual clip.
        `,
        quizQuestionOm: 'Sagaleen viidiyoo itti aanuu dursiise yoo jalqabu ciriinsa akkamii jedhama?',
        quizOptionsOm: ['Hard Cut', 'J-Cut', 'L-Cut', 'Jump Cut'],
        quizAnswerOm: 'J-Cut',
        quizQuestionEn: 'What type of cut occurs when the audio of the next scene plays before the current visual scene ends?',
        quizOptionsEn: ['Standard Cut', 'J-Cut', 'L-Cut', 'Jump Cut'],
        quizAnswerEn: 'J-Cut'
      },
      {
        id: 'video-edit-2',
        titleOm: 'Sagalee Qindeessuu fi Baakgraawundi',
        titleEn: 'Audio Editing & Soundscapes',
        duration: '1 hr',
        summaryOm: 'Sagalee qulqulluu hojjechuu fi muuziqaa gargaaruu.',
        summaryEn: 'Master the art of background music, noise filters, and immersive sound effects.',
        contentOm: `
### Sagalee (Audio Design) Maaliif Murteessaa dha?
Viidiyoon bareedaan %50 sagalee isaati! Sagaleen qulqulluun yoo hin jiraan viidiyoon kee mul'atulleef namni deebisee hin ilaalu.

#### Wantoota Ijoo:
* **Background Music (BGM)**: Haala moodii viidiyichaan muuziqaa mijeessuu.
* **Sound Effects (SFX)**: Sagaleewwan xixiqqoo (akkasumas swoosh, pop, dingle) bifa gaarii addaa uuman.
* **Ducking**: Sagaleen namaa yeroo dubbatu muuziqichi gadi bu'ee ofumaan bilisa akka ta'u gochuu.
        `,
        contentEn: `
### Audio: 50% of the Video Experience
Viewers can tolerate poor color grading, but they will immediately exit a video if the audio is harsh, noisy, or distorted. Immersive audio design is key to viral retention.

#### Essential Sound Design Pillars:
* **Sound Effects (SFX)**: Small accents like "Swooshes" on transitions, "Pops" on text graphics, or ambient background layers.
* **Audio Ducking**: Automatically lowering background music decibels whenever a human presence or voiceover occurs.
* **Equalization & Compression**: Eliminating low-end rumbling and shaping vocal parameters so speech is clear and present.
        `,
        quizQuestionOm: 'Yeroo namni dubbatu muuziqaan duubaa ofumaan gadi bu\'uun isaa maali jedhama?',
        quizOptionsOm: ['Cutting', 'Splicing', 'Ducking', 'Transitioning'],
        quizAnswerOm: 'Ducking',
        quizQuestionEn: 'What is the technique where background music tracks dynamically lower their volume when a speaker is talking?',
        quizOptionsEn: ['Audio Clipping', 'Ducking', 'Sound Filtering', 'Crossfading'],
        quizAnswerEn: 'Ducking'
      }
    ]
  }
];
