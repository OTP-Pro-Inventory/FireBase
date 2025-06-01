
// Firebase config placeholder - insert your config in firebaseConfig below
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
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
