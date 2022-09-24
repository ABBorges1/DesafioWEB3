const { initializeApp } = require("firebase/app");
const { getDatabase, ref, child, get } = require('firebase/database')

const firebaseConfig = {
  apiKey: "AIzaSyCl3UN1U8D3D4RDScc8UrqtjbT2tztsKcI",
  authDomain: "dbzombie-ad1bd.firebaseapp.com",
  databaseURL: "https://dbzombie-ad1bd-default-rtdb.firebaseio.com",
  projectId: "dbzombie-ad1bd",
  storageBucket: "dbzombie-ad1bd.appspot.com",
  messagingSenderId: "727374127765",
  appId: "1:727374127765:web:2ed586f029e4c762a8f19c"
};

const app = initializeApp(firebaseConfig);

async function getRanking(){
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, `ranking`))
  if (snapshot.exists()) {
    const jogadores = Object.entries(snapshot.val()).map(([key, value]) => ({
      nome: key,
      score: value
    }))
    return jogadores;
  } else {
    return [];
  }
}

module.exports = getRanking;




