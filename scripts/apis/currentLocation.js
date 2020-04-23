const defaultLocation = '32.076169, 34.771252'; // tel aviv

function getCurrentLocation() {

    return new Promise(done => {
        if (!navigator.geolocation) {
            done(defaultLocation);

        } else {
            navigator.geolocation.getCurrentPosition(p => done([p.coords.latitude, p.coords.longitude]),
                () => done(defaultLocation));
        }
    });
}

export default getCurrentLocation;