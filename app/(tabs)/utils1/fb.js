// fb.js
// Function to fetch facebook posts using FB Graph API
//const BEARER_TOKEN = 'EAAXWDbZCE91IBQTvhCoO1leDTTMqveZCasVZAuNZC6BkT3iztwIhk16ZAF3H8He3KMEMJ6SKiIgYA8eX3vCcX7Ro7CmoGWvNlnGzK5bIFPg7cbBlJ7ZCG4BG9IZBbQJdLrpZC9FYbEmeRnQvmRLFHgjNIyZAn1rSt5Hk8uwq7xsNXfZASo3UN9CTL6Un4pqzEZBaNtSQKjijzYK8y3HwkUDtXejg3pZC1oE08PXUhEP9kuZAnloAIRVWTOhSvEQpJYS8ZCWAnQEvD92wPKSFZBlaPKBpMTZBjmJDnIlV9NCDducZD';
const USERNAME = '24bce1015';  // Change this to the target username

async function fetchPosts() {
    try {
        // Step 1: Generate bearer token via graph API
        const APP_ID = '1642729423828818';
        const REDIRECT_URI = encodeURIComponent('./feeds.html'); //URI of app
        const SCOPE = encodeURIComponent('user_posts'); // ask for user_posts
        const STATE = encodeURIComponent(Math.random().toString(36).slice(2)); // CSRF token
        const url =
            `https://www.facebook.com/v21.0/dialog/oauth` +
            `?client_id=${APP_ID}` +
            `&redirect_uri=${REDIRECT_URI}` +
            `&scope=${SCOPE}` +
            `&response_type=code` +
            `&state=${STATE}`;
        const BEARER_TOKEN = await fetch(url);
        console.log('BEARER_TOKEN =', BEARER_TOKEN);
        // Step 2: Fetch posts using FB API
        const res = await fetch(`https://graph.facebook.com/v24.0/me?fields=id%2Cname%2Cposts%2Cfeed&access_token=${BEARER_TOKEN}`, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`
            }
        });
        const data = await res.json();
        //console.log(feedsData);
        const userid = data.id;
        console.log("userid =", userid);
        const username = data.name;
        console.log("username =", username);
        const posts = data.posts;
        console.log("posts =", posts);
        const posts_data = data.posts.data;
        console.log("posts_data =", posts_data);
        const feed = data.feed;
        console.log("feed =", feed);
        const feed_data = data.feed.data;
        console.log("feed_data =", feed_data);
        return posts_data;
    } catch (error) {
        console.error('Error fetching feed:', error);
        return [];
    }
}

// Function to render posts on the webpage
export const displayFBPosts = async () => {
	alert("Hi");
    const posts = await fetchPosts();
    console.log("posts =", posts);
}

// Call the function when the DOM is fully loaded
//displayPosts();