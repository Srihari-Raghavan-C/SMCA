// fb.js
// Function to fetch facebook posts using FB Graph API
const BEARER_TOKEN = 'EAAXWDbZCE91IBQQQJR2CuVXpySzTBVDXKZBNXh4xJpcTApTkaPcpmPkZC3IGnHR9ZCOdRw1pSwAI0fHGWyf0EqZAYhZAxXTyI6ZCbUNpFMYnkxtHKdziRsrDNLwwnKbRCi3ZCtYtUeLfTZAoZBqIUYtolkiOA6lijf3ViQsDBcMZC5xGqdjI5YpbtO62QoiH9wePtljhdTCAVXhRm0WY0j8WAcZAoiCUbbCdfQse6EhIIVPSykFbDsacJhFdzbjZCnr7xZBdL7CDIvlGeptM0pe8aFquAkHZB9QJfEYF5ZAp18ZBvZAvLtUc463OdqLOlZCQMpJVpVKctuoEJKs';

async function fetchPosts(token) {
    try {
        // Step 2: Fetch posts using FB API
		/*const meData = await fetch(`https://graph.facebook.com/v24.0/me?fields=name,id&access_token=${BEARER_TOKEN}`, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`
            }
        });*/
		const meData = await fetch(`https://graph.facebook.com/v24.0/me?fields=name,id&access_token=${token}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
		
        const me = await meData.json();
        /*const feedData = await fetch(`https://graph.facebook.com/v24.0/me/feed?access_token=${BEARER_TOKEN}`, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`
            }
        });*/
        const feedData = await fetch(`https://graph.facebook.com/v24.0/me/feed?access_token=${token}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
		
        const feed = await feedData.json();
		const feed_json_data = feed.data;
		let res = [];
		for (const every_feed of feed_json_data) {
			let every_res = {
				id: every_feed.id,
				platform: 'Facebook',
				username: me.name,
				handle: me.name,
				content: every_feed.message,
				timestamp: every_feed.created_time,
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
        console.error('Error fetching feed:', error);
        return [];
    }
}

// Function to render posts on the webpage
const displayFBPosts = async (token) => {
    const posts = await fetchPosts(token);
    console.log("posts =", posts);
	return posts;
}
export { displayFBPosts };

// Call the function when the DOM is fully loaded
//displayPosts();