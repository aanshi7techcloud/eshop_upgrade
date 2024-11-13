export const doLogin = (email, password) => {
    let promiseResolveRef = null;
    let promiseRejectRef = null;

    const promise = new Promise((resolve, reject) => {
        promiseResolveRef = resolve;
        promiseRejectRef = reject;
    });

    console.log("Attempting login with email:", email);

    fetch('https://dev-project-ecommerce.upgrad.dev/api/auth/signin', {
        method: 'POST',
        body: JSON.stringify({
            username: email,
            password: password,
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    })
    .then((response) => {
        console.log("Login response received. Status:", response.status);
        
        response.json().then((json) => {
            if (response.ok) {
                
                console.log("Login successful:", json);

                promiseResolveRef({
                    username: json.email,
                    roles: json.roles,
                    userId: json.id,
                    response: response,
                });
            } else {
                console.warn("Login failed with server error. JSON:", json);
                promiseRejectRef({
                    reason: json.message || "Server error occurred. Please try again.",
                    response: response,
                });
            }
        })
        .catch((jsonParseError) => {
            console.error("Error parsing JSON response:", jsonParseError);
            promiseRejectRef({
                reason: "Bad Credentials. Please try again.",
                response: jsonParseError,
            });
        });
    })
    .catch((networkError) => {
        console.error("Network error occurred during login:", networkError);
        promiseRejectRef({
            reason: "Some error occurred. Please try again.",
            response: networkError,
        });
    });

    return promise;
};

export const doSignup = (requestJson) => {
    let promiseResolveRef = null;
    let promiseRejectRef = null;

    const promise = new Promise((resolve, reject) => {
        promiseResolveRef = resolve;
        promiseRejectRef = reject;
    });

    console.log("Attempting signup with request data:", requestJson);

    fetch('https://dev-project-ecommerce.upgrad.dev/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(requestJson),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => {
        console.log("Signup response received. Status:", response.status);

        response.json().then((json) => {
            if (response.ok) {
                console.log("Signup successful. Message:", json.message);
                promiseResolveRef({
                    message: json.message,
                    response: response,
                });
            } else {
                console.warn("Signup failed with server error. JSON:", json);
                promiseRejectRef({
                    reason: json.message || "Server error occurred. Please try again.",
                    response: response,
                });
            }
        })
        .catch((jsonParseError) => {
            console.error("Error parsing JSON response for signup:", jsonParseError);
            promiseRejectRef({
                reason: "Some error occurred. Please try again.",
                response: jsonParseError,
            });
        });
    })
    .catch((networkError) => {
        console.error("Network error occurred during signup:", networkError);
        promiseRejectRef({
            reason: "Some error occurred. Please try again.",
            response: networkError,
        });
    });

    return promise;
};
