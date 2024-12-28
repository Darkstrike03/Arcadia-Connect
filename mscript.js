document.getElementById("startMeeting").addEventListener("click", () => {
    alert("Redirecting to a new meeting...");
    // Logic to create a new meeting room
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
