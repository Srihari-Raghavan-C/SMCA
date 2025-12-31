// tweets.js
// Function to fetch tweets using Twitter API v2
const BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAANRj6AEAAAAAFdoL3N9HQ1B7O%2Fka9qbpjlRi5Xg%3Doc9VFy6CjBJ1ZiTe6Wkmntn0AmY2q9LqYc2tGTgZmS1kK15ROW';
const USERNAME = '24bce1015';  // Change this to the target username
//const TWEET_COUNT = 5; // Number of tweets to fetch

async function fetchTweets(token) {
    try {
        // Step 1: Get user ID from username
        // Returns {"data":{"id":"2000158604759052288","name":"Srihari Raghavan C 24BCE1015","username":"24bce1015"}}
        const userResponse = await fetch(`https://api.twitter.com/2/users/by/username/${USERNAME}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const userData = await userResponse.json();
        if (!userData.data) throw new Error('User not found');
        const userId = userData.data.id;

        // Step 2: Fetch recent tweets using user ID
        // Retuns {"meta":{"result_count":0}}
        const tweetsResponse = await fetch(`https://api.twitter.com/2/users/${userId}/tweets`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const tweetsData = await tweetsResponse.json();
        
        let feed_json_data = tweetsData.data;
		let res = [];
		for (const every_feed of feed_json_data) {
			let every_res = {
				id: every_feed.id,
				platform: 'Twitter',
				username: userData.data.name,
				handle: userData.data.username,
				content: every_feed.text,
				timestamp: every_feed.created_at,
				likes: Math.floor(Math.random() * (601)),
				comments: 0,
				shares: Math.floor(Math.random() * (15)),
				image: null,
				metrics: {
					reach: null,
					engagement: null,
					sentiment: null
				}
			}
			res.push(every_res);
		}
		return res;
    } catch (error) {
        console.error('Error fetching tweets:', error);
        return [];
    }
}

// Function to render posts on the webpage
const displayTwitterFeed = async (token) => {
    const posts = await fetchTweets(token);
    console.log("posts =", posts);
	return posts;
}
export { displayTwitterFeed };

