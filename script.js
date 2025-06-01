
// Firebase config placeholder - insert your config in firebaseConfig below
const firebaseConfig = {
  apiKey: "AIzaSyCGc_pSx9CAaTmSHFXvDGeRUTPYRmLJ8iQ",
  authDomain: "deviceinventory-fd1e9.firebaseapp.com",
  projectId: "deviceinventory-fd1e9",
  storageBucket: "deviceinventory-fd1e9.firebasestorage.app",
  messagingSenderId: "512375013041",
  appId: "1:512375013041:web:b81a9ee6cd8166ffc56c90",
  measurementId: "G-KSE1QE1DRB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function logActivity(type, field, value, details = '') {
    const timestamp = new Date().toISOString();
    const entry = {
        timestamp,
        type,
        field,
        value,
        details
    };
    db.collection("activity_logs").add(entry)
      .then(() => console.log("Activity logged:", entry))
      .catch(console.error);
}

function loadActivityLog() {
    const container = document.getElementById('activity-log-container');
    container.innerHTML = '<p>Loading logs...</p>';
    db.collection("activity_logs").orderBy("timestamp", "desc").get()
      .then(snapshot => {
          container.innerHTML = "";
          if (snapshot.empty) {
              container.innerHTML = "<div class='empty-state'>No activity logged yet.</div>";
              return;
          }
          snapshot.forEach(doc => {
              const entry = doc.data();
              const div = document.createElement("div");
              div.className = "log-entry";
              div.innerHTML = \`
                  <div class="log-timestamp">\${entry.timestamp}</div>
                  <div class="log-details"><strong>\${entry.type}:</strong> \${entry.field} = "\${entry.value}"<br><em>\${entry.details}</em></div>
              \`;
              container.appendChild(div);
          });
      })
      .catch(console.error);
}
