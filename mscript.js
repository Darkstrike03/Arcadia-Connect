document.getElementById("startMeeting").addEventListener("click", async () => {
    const response = await fetch("arcadia-connect.railway.internal");
    const data = await response.json();
    alert(`Here you go! Share this link with your friends: ${data.link}`);
});


document.getElementById("joinMeeting").addEventListener("click", () => {
    const code = document.getElementById("meetingCode").value.trim();
    if (code) {
        alert(`Joining meeting with code: ${code}`);
        // Logic to join a meeting room
    } else {
        alert("Please enter a valid meeting code.");
    }
});
