## Adventure Escape SA
This README provides clear documentation for the Adventure Escape SA project.
Here is a summary breakdown of your project details for quick reference:
## Key Highlights
 * Tech Stack: Expo, React Native, TypeScript, Expo Router, React Navigation.
 * Target Audience: Outdoor adventure and eco-tourism enthusiasts in Cape Town, Western Cape.
 * Core Application Capabilities:
   * Interactive Quote Builder: Automatic discount structure based on item count.
   * 13 Modular Screens: Navigation supported via Bottom Tabs and a global top Header Menu.
   * Cross-Platform: Mobile (Expo Go on iOS/Android) and Web support (react-native-web).
   * Demo-Only Scope: Non-persisted mock checkout, map directions enquiry, and review submission.
Quick Reference Commands
| Task | Command |

| Install Dependencies | npm install |
| Install React Navigation & UI | npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context @expo/vector-icons expo-status-bar |
| Install Web Support | npx expo install react-dom react-native-web @expo/metro-runtime |
| Start Development Server | npx expo start (or npm start) |
| Start with Tunnel (Restricted Networks) | npx expo start --tunnel |
| Clear Cache & Restart | npx expo start --clear |
Pricing & Tiered Discount Logic
## Discounts are calculated based on the total number of bookings added to the quotation (not total guests):
| Quantity Tier | Discount | Example Calculation (2 × R1,500 packages) |
| 1 Booking | 0% | Subtotal: R3,000 |
| 2 Bookings | 5% | Discount: -R150 |
| 3 Bookings | 10% | Total: R2,850 |
| > 3 Bookings | 15% |  |
Is there a specific feature, component refactor, or navigation update you would like help implementing next?
import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { C, S, Shell, Btn, Field, Photo, Dropdown, validName, Errs, useApp } from './common';

const RATINGS = ['5 - Excellent', '4 - Good', '3 - Okay', '2 - Poor', '1 - Very poor'];

export default function ReviewScreen() {
  const { reviews, addReview } = useApp();
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [text, setText] = useState('');
  const [errs, setErrs] = useState<Errs>({});
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  const submit = () => {
    const e: Errs = {};
    if (!validName(name)) e.name = 'Enter your name.';
    if (!rating) e.rating = 'Select a rating.';
    if (text.trim().length < 10) e.text = 'Please write at least 10 characters.';
    setErrs(e);
    if (Object.keys(e).length > 0) return;
    addReview({ name: name.trim(), rating: Number(rating[0]), text: text.trim(), tag: 'Your review' });
    setName(''); setRating(''); setText('');
    Alert.alert('Thank you', 'Your review has been added.');
  };

  return (
    <Shell title="Reviews" sub="Demo feedback to show how reviews will appear.">
      <View style={S.card}>
        <Text style={{ fontSize: 22, fontWeight: '800', color: C.green }}>{avg.toFixed(1)} / 5 | Sample score</Text>
        <Text style={S.small}>Illustrative content only, not actual customer reviews or ratings.</Text>
      </View>
      {reviews.map((r, i) => (
        <View key={i} style={S.card}>
          {r.image ? <><Photo height={90} source={r.image} /><View style={{ height: 8 }} /></> : null}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: '700', fontSize: 12 }}>{r.name}</Text>
            <Text style={{ color: C.orange }}>Rating: {r.rating}/5</Text>
          </View>
          <Text style={[S.p, { fontSize: 13, marginVertical: 4 }]}>"{r.text}"</Text>
          <Text style={S.small}>{r.tag}</Text>
        </View>
      ))}

      <Text style={S.h2}>Write a review</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <View style={{ flex: 1 }}><Field label="Name" value={name} onChangeText={setName} error={errs.name} placeholder="Your name" /></View>
        <View style={{ flex: 1 }}><Dropdown label="Rating" value={rating} options={RATINGS} placeholder="Select rating" onSelect={setRating} error={errs.rating} /></View>
      </View>
      <Field label="Your experience" value={text} onChangeText={setText} error={errs.text} multiline placeholder="Tell us about your adventure..." />
      <Btn label="Submit review" onPress={submit} />
    </Shell>
  );
}

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).



## Name	Student Number	Role
Rayan Bvulani	ST10497168	Team leader
Itumeleng Ndlovu	ST10515918	Team secretary
Asukia Ebuta	ST10531063	Member / designer & researcher

The app is a single page that swaps its content based on the URL hash (#home, #about, #overview, #package/<id>, #fees, #contact), so the back/forward buttons work and a page can be bookmarked or linked to directly.

Screen	What it does
Home	Hero banner, "View Packages" / "Get Quote" buttons, 3 featured packages
About Us	Founder story and mission, matching the wireframe's two-column layout
Overview	All / Packages / Individual Activities filter tabs, full catalogue
Package Detail	Photo gallery (click thumbnails), collapsible Description / What's Included / Meeting Point / Cancellation Policy, date picker, Book Now, Add to Quote
Fees	Add/remove any package or activity; subtotal, discount tier and total recalculate live
Contact Us	Name / email / phone / package / message form with validation and a sent confirmation
Discount rule (Fees page) 

## Customising
Colours — defined once as CSS variables at the top of the <style> block (--forest, --canyon, --sand, etc.), so the whole palette can be changed from one place.
Fonts — Fraunces (headings) and Inter (body text), loaded from Google Fonts.
Content — package/activity details are in the ACTIVITIES array; nav links, footer text and the Contact page's business info are plain HTML in the relevant screen...() function.

[task 2 (1).docx](https://github.com/user-attachments/files/33297796/task.2.1.docx)


## youtube link: 
https://youtu.be/Sh2KHbuWlGM?si=tcdL7iarcmVYioVH 
https://youtu.be/lGpi9A5tNF0?si=hgkufodnjNwr-lbi

<img width="1588" height="926" alt="ad 1" src="https://github.com/user-attachments/assets/5633e983-20eb-4c03-a1ff-22540c343d42" />
<img width="1597" height="910" alt="adventure" src="https://github.com/user-attachments/assets/1009c62a-7089-4e5c-9e5d-38b5fcfd13f3" />
<img width="1591" height="925" alt="ad6" src="https://github.com/user-attachments/assets/7abd796f-5a50-42a6-a284-891deba5d66c" />
<img width="1591" height="925" alt="ad6" src="https://github.com/user-attachments/assets/7e00d128-835c-42c1-b41f-eaa639002ca3" />
<img width="1607" height="913" alt="ad5" src="https://github.com/user-attachments/assets/68dcf64d-fbb1-4d4f-9c72-193d12aa05e3" />
<img width="1597" height="916" alt="ad3" src="https://github.com/user-attachments/assets/eab33abf-729c-4dae-b443-51662ac10676" />
<img width="1601" height="923" alt="ad2" src="https://github.com/user-attachments/assets/6e9334ed-a0d3-425b-83b5-543051142541" />
<img width="1588" height="926" alt="ad 1" src="https://github.com/user-attachments/assets/f4278499-3b02-4e90-aa55-c7b8966a6738" />



