import https from 'node:https';

https.get('https://djpromokit.com/test-dj', (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        console.log("Status:", res.statusCode);
        console.log("Response starts with:", rawData.substring(0, 500));
        if (rawData.includes("Profile Draft Mode")) {
            console.log("Found: Profile Draft Mode");
        } else {
            console.log("MISSING OVERLAY CONTENT!");
        }
    });
});
