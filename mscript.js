document.getElementById("startMeeting").addEventListener("click", async () => {
    try {
        const response = await fetch("https://arcadia-connect-production.up.railway.app/new-meeting");
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        alert(`Here you go! Share this link with your friends: ${data.link}`);
    } catch (error) {
        console.error("Failed to create a new meeting:", error);
        alert("Something went wrong while starting a new meeting. Please try again later.");
    }
});

document.getElementById("joinMeeting").addEventListener("click", () => {
    const code = document.getElementById("meetingCode").value.trim();
    if (code) {
        alert(`Joining meeting with code: ${code}`);
        // Implement logic to join a meeting here
    } else {
        alert("Please enter a valid meeting code.");
    }
});
