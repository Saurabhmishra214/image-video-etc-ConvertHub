# 🎥 YouTube Video Downloader

Ek professional YouTube video aur audio downloader website with Node.js backend.

## ✨ Features

- ✅ **YouTube Videos Download** - High quality MP4 format mein
- 🎵 **Audio Download** - MP3 format mein sirf audio
- 🎯 **Multiple Quality Options** - High aur Medium quality choose kar sakte ho
- ⚡ **Fast Downloads** - Direct streaming se fast download
- 🎨 **Modern UI** - Beautiful animated interface
- 📱 **Fully Responsive** - Mobile aur desktop dono pe perfect

---

## 🚀 Setup Instructions (Hindi)

### Step 1: Files ko Setup Karo

Aapke paas ye files honi chahiye same folder mein:
```
your-folder/
├── server.js          (Backend server)
├── index.html         (Frontend website)
├── package.json       (Dependencies list)
└── README.md          (Ye file)
```

### Step 2: Dependencies Install Karo

Terminal/Command Prompt kholo aur apne project folder mein jao, phir run karo:

```bash
npm install
```

Ye command automatically sab dependencies install kar dega:
- express (Web server)
- ytdl-core (YouTube downloader library)
- cors (Cross-origin requests ke liye)

### Step 3: Folder Structure Banao

Ek `public` naam ka folder banao aur `index.html` ko usme move karo:

```bash
# Windows
mkdir public
move index.html public\

# Mac/Linux
mkdir public
mv index.html public/
```

**Ya manually:**
1. "public" naam ka folder banao
2. index.html file ko us folder mein copy/move karo




*** project ka structure kaisa hona chahiye:**
```
|
|---backend
|     |____controllers 
|     |____modules
|     |        |___user 
|     |____routes
|     |____utils
|     |____connection.js (database se connectivity ke liye)
|     |____server.js (sabhi routes or database se related chijo ko conbine karta hai)
|
|_____node_modules
|
|_____src
|       |___assets
|       |___components
|       |          |___common
|       |          |___image
|       |          |___insta
|       |          |___live
|       |          |___movies
|       |          |___pdf
|       |          |___video
|       |          |___youtube
|       |___contexts
|       |___lib
|       |___pages
|       |___App.tsx 
|____.env
|____index.html
|____package-lock.json
|____package.json
|____tsconfig.app.json
|____tsconfig.node.json
|____tsconfig.json
|____vite.config.ts
```

```
1. Controller folder me vo file rahegi jo decide karti hai ki request aane par kya kaam karna hai.
2. modules folder me database me jitane bhi table banege unke liye alag se controller or routes file hongi.
3. user folder me user table se related routes controller and table se connection karne ka code rahega.
4. routes folder me code rahega ki kis url ki request pe kya function perform ho isi ke andar hum log api ki file bhi create karenge.
5. utils folder me kuch extra chije rahengi jaise password validation ke liye ya koi dusra input validation ke liye
6. node_modules folder me sabhi package install hote hai 
7. assets folder me jitane bhi css or js se related file hogi jo ki frontend ke liye hai vo rahegi.
8. components folder me humare project jo cards hai unke naam se folder banege or un folder ke andar sab alag alag kaam karenge. isame ek common naam ka folder hoga jaisi kuch chije hongi jo ab me common ho vo is folder me hongi taki sabko alag alag na likhna ho
9. Context folder ka use hota hai global data store karne aur share karne ke liye.
10. lib folder assets ki tarah hai pr hum isame sirf typescrit se related file use karenge.
11. pages folder ke andar jo humare components folder ke andar component banye honge unhe yaha combine karke apne us perticular page ko design karenge
12. App.tsx React application ka main root component hota hai.Yeh decide karta hai ki app ka main layout kaisa hoga.Kaun sa page kab open hoga yeh yaha define hota hai.Yeh poore React app ko assemble karta hai.
13. main.tsx React app ka starting entry point hota hai. React ko HTML page se connect karta hai. App.tsx ko render karta hai
```

***Database connection code: ***

firstly make sure you have .env file in root directory and it must contain MONGO_URI and user.



require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("User");   // your database name
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(error);
  }
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };


and then create models in modules folder 


### Step 4: Server Start Karo

```bash
npm start
```

Ya directly:
```bash
node server.js
```

Server start hone ke baad aapko ye dikhega:
```
╔════════════════════════════════════════════════╗
║   🎥 YouTube Downloader Server Started! 🎥    ║
╠════════════════════════════════════════════════╣
║   Server running at:                          ║
║   ➜ Local:   http://localhost:3000           ║
╚════════════════════════════════════════════════╝
```

### Step 5: Browser Mein Kholo

Apne browser mein jao aur type karo:
```
http://localhost:3000
```

---

## 📖 Kaise Use Karein?

1. **YouTube Link Copy Karo** - Koi bhi YouTube video ka link copy karo
2. **Link Paste Karo** - Website pe input box mein paste karo
3. **Fetch Button Click Karo** - Video information fetch hoga
4. **Format Select Karo** - Video (High/Medium) ya Audio choose karo
5. **Download Karo** - "Download Karo" button click karo
6. **File Save Hogi** - Video/Audio apne Downloads folder mein save hogi

---

## 🛠️ Troubleshooting (Common Problems)

### Problem 1: "npm: command not found"
**Solution:** Node.js install karo - https://nodejs.org/

### Problem 2: Server start nahi ho raha
**Solution:** 
- Check karo ki port 3000 already use mein to nahi hai
- Terminal/CMD ko administrator mode mein run karo
- Antivirus temporarily disable karo

### Problem 3: "Cannot find module 'express'"
**Solution:**
```bash
npm install express ytdl-core cors
```

### Problem 4: Download nahi ho raha
**Solution:**
- Server running hai ya nahi check karo
- Console mein errors check karo (F12 press karke)
- YouTube link valid hai ya nahi verify karo

### Problem 5: "ECONNRESET" ya "Status code: 410" error
**Solution:**
ytdl-core library update karo:
```bash
npm install ytdl-core@latest
```

---

## 🔧 Advanced Configuration

### Port Change Karna Hai?

`server.js` file mein ye line edit karo:
```javascript
const PORT = 3000;  // Change this to any port number
```

### Different Computer/Network Pe Access?

1. Apna IP address find karo:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`

2. Browser mein type karo:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```
   Example: `http://192.168.1.100:3000`

---

## 📋 System Requirements

- **Node.js** - Version 14 ya usse upar
- **NPM** - Automatically Node.js ke saath aata hai
- **Internet Connection** - Downloads ke liye
- **Modern Browser** - Chrome, Firefox, Edge, Safari

---

## ⚠️ Important Notes

1. **Legal Use Only** - Sirf apne personal use ke liye download karo
2. **Copyright Respect** - Copyrighted content download karna illegal ho sakta hai
3. **Server Running** - Downloads ke liye server running hona chahiye
4. **YouTube Changes** - Kabhi-kabhi YouTube API changes hone par library update karni pad sakti hai

---

## 🔄 Updates

Library update karne ke liye:
```bash
npm update
```

Specific package update:
```bash
npm install ytdl-core@latest
```

---

## 🆘 Help & Support

Agar koi problem aa rahi hai to:

1. **Console Check Karo** - Browser mein F12 press karke console mein errors dekho
2. **Server Logs Check Karo** - Terminal/CMD mein errors dekho
3. **Internet Connection** - Stable internet connection check karo
4. **Firewall/Antivirus** - Temporarily disable karke try karo

---

## 📝 License

Ye project personal use ke liye hai. Commercial use se pehle proper license check karo.

---

## 🎉 Enjoy!

Ab aap easily YouTube videos aur audio download kar sakte ho! 

**Happy Downloading! 🚀**

---

## 📞 Credits

Made with ❤️ using:
- Node.js
- Express.js
- ytdl-core
- Pure HTML/CSS/JavaScript

---

**Note:** Agar server band karna hai to terminal mein `Ctrl + C` press karo.
