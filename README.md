# 📚 1E4 Werkplaats 4

## 👥 Teamleden
- [Yorick](https://github.com/yorick-1101625)
- [Ruben](https://github.com/ruben-0926195) 
- [Kevin](https://github.com/Kevin-1111102)   
- [Marco](https://github.com/Marco-1028839)  

---

## 📌 Projectbeschrijving
De opdracht was het ontwikkelen van een platform waarop studenten van de Rotterdam Academy studiematerialen zoals boeken, video’s en online cursussen kunnen delen, beoordelen, zoeken en opslaan als favoriet.  

Alleen studenten met een @hr.nl e-mailadres kunnen een account aanmaken en inloggen, zodat de gedeelde content veilig en relevant blijft.  

De applicatie moet gebruik maken van **React Native** voor de frontend en **Docker** voor de backend, en voorzien zijn van duidelijke documentatie.

---

## ⚙️ Functionaliteiten
- Gebruiker kan zich registreren en inloggen. Standaard geen admin.  
  Alleen admins kunnen andere gebruikers admin maken. Een admin kan gebruikers blokkeren.  
  Een geblokkeerde gebruiker kan niet meer inloggen. Gebruiker kan ook account verwijderen en uitloggen.
  
- Elke gebruiker heeft een profiel met een overzicht van favoriete bronnen/posts, gelikete bronnen/posts en gemaakte bronnen/posts.  
  Gebruiker kan gebruikersnaam, profielfoto en studie aanpassen.

- Gebruiker kan wachtwoord aanpassen op de instellingenpagina. Ook hier kan je uitloggen of je account verwijderen.

- Je kan posts aanmaken met één gekoppelde bron.  
  Posts kunnen geliket, bewerkt, verwijderd en als favoriet opgeslagen worden.

- Elke post heeft een detailpagina waar andere gebruikers comments kunnen achterlaten en verwijderen.

- Bronnen kunnen aangemaakt worden, een rating krijgen en aan favorieten toegevoegd worden.

- Op de zoekpagina kun je zoeken en filteren op posts, bronnen en gebruikers.

- De feedpagina toont een overzicht van posts en bronnen.  
  Inclusief scroll-to-top knop en pull-to-refresh bij swipe op mobiel.

---

## 🧪 Installatie-instructies

### Backend
#### 🔹 Met Docker  

##### 1. Start Docker Desktop
Als je Windows gebruikt, start dan Docker Desktop.

##### 2. Bouw de docker image
```bash
docker compose up --build
```  

##### 3. Start de container
Als de container niet automatisch start, voer dan uit:  
```bash
docker compose up
```


---

#### 🔸 Zonder Docker

##### 1. Maak een virtual environment aan
Zorg ervoor dat je Python geïnstalleerd hebt. Navigeer naar de `backend` folder en voer uit:

```bash
python -m venv venv
```

##### 2. Activeer de virtual environment
**Windows:**
```bash
venv\Scripts\activate
```

**MacOS/Linux:**
```bash
source venv/bin/activate
```

##### 3. Installeer de vereiste Python packages
```bash
pip install -r requirements.txt
```

##### 4. Start de backend
In de `backend` folder:

```bash
python app.py
```

> Werkt dit niet? Open `app.py` in je IDE en klik op “Run”.

### Frontend

#### 1. Installeer de vereiste npm packages
Ga naar de `frontend` folder en voer uit:

```bash
npm install
```

#### 2. Maak een `.env` bestand
Maak een bestand genaamd `.env` aan in de `frontend` folder met daarin:

```env
EXPO_PUBLIC_BACKEND_URL=http://-ip-address-:8000
```

Vervang `-ip-address-` met je IP-adres.  
Deze kan je vinden bij het uitvoeren van dit commando:

**Windows:**
```bash
ipconfig
```

**MacOS/Linux:**
```bash
ifconfig
```


#### 7. Start de frontend
In de `frontend` folder:

```bash
npx expo start  
```
of  
```bash
npm run start
```

#### Problemen?
Als je de app wilt starten met Expo Go en het bovenstaande werkt niet:

```bash
npx expo start --tunnel
```
of 
```bash
npm run start --tunnel
```

Mocht dat ook niet werken, zet dan je internetverbinding op particulier, zet je firewall uit en probeer het opnieuw

Als de Expo Go app niet registreert wanneer je het scherm aanraakt, typ dan `m` in de terminal waar je de app hebt draaien.

---

## 🔐 Inloggegevens

**Admin**  
Gebruikersnaam: `test@hr.nl`  
Wachtwoord: `1234`

---

## 📑 API Documentatie
_in te voegen indien beschikbaar._

---

## 📚 Bronnen
Kid, E. (2021, December 29). Animated and React Native ScrollViews - evening kid - Medium. Medium.   
https://eveningkid.medium.com/animated-and-react-native-scrollviews-de701f1b1ce5

Zurek, A. (2022, July 9). Building a “Scroll To Top” Button Using React Native. Atomic Spin.   
https://spin.atomicobject.com/react-native-building-scroll-top-button/

Net Ninja. (2025, April 28). Complete React Native Tutorial #14 - Making an auth context [Video]. YouTube.   
https://www.youtube.com/watch?v=Ky43ve3b9Ss

Net Ninja. (2025b, April 28). Complete React Native Tutorial #15 - Logging users in [Video]. YouTube.   
https://www.youtube.com/watch?v=RcrWlOgL1hM

Net Ninja. (2025c, May 7). Complete React Native Tutorial #19 - Protecting routes [Video]. YouTube.   
https://www.youtube.com/watch?v=v4-q39sBfvU

vinde_sensumars [username]. (2013, July 2). Debounce search input [Online forum post]. Reddit.   
https://www.reddit.com/r/reactjs/comments/1fajz2e/debounce_search_input/

ImagePicker. (n.d.). Expo Documentation.   
https://docs.expo.dev/versions/latest/sdk/imagepicker/

Freepik. (n.d.). Free Twitter Posts templates to design online.   
https://www.freepik.com/templates/twitter-posts

Net Ninja. (2021, January 12). Full React tutorial #20 - Making a custom hook [Video]. YouTube.   
https://www.youtube.com/watch?v=Jl4q2cccwf0

Gil, S. E. (2021, August 24). How to create a Scroll to Top Button with React. DEV Community.   
https://dev.to/silviaespanagil/how-to-create-a-scroll-to-top-button-with-react-17do

Feldjesus. (2023, May 26). How to decode a JWT Token with JavaScript - Feldjesus - Medium. Medium.   
https://medium.com/@feldjesus/how-to-decode-a-jwt-token-175305335024

Gupta, L., & Gupta, L. (2023, July 6). Java Regex to validate ISBN. HowToDoInJava.   
https://howtodoinjava.com/java/regex/java-regex-validate-international-standard-book-number-isbns/

Kaur, A. (n.d.). Logout Confirmation Page UI design Template. Dribbble.   
https://dribbble.com/shots/20221638-Logout-Confirmation-Page-UI-design-Template

React Native. (2025, April 14). Modal · React native.  
https://reactnative.dev/docs/modal

Code For You. (2021, June 15). React native infinite scroll using FlatList [Video]. YouTube.   
https://www.youtube.com/watch?v=jow2lXber3A

Stack Overflow. (2021, August 17). React Native Navigation: How to dynamically set header title before render navigation screen? Stack Exchange.   
https://stackoverflow.com/questions/68821573/react-native-navigation-how-to-dynamically-set-header-title-before-render-naviga

Stack Overflow. (2012, October 24). SQLite DELETE CASCADE not working. Retrieved May 28, 2025, from   
https://stackoverflow.com/questions/13641250/sqlite-delete-cascade-not-working

Grimm, S. (2024, January 2). Twitter Top Tabs Navigation with Expo Router [Video]. YouTube.   
https://www.youtube.com/watch?v=AP08wUBhpKM
