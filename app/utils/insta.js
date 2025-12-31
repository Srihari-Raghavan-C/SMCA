// fb.js
// Function to fetch facebook posts using FB Graph API
const BEARER_TOKEN = 'IGAAnJtvcnLRJBZAFp6QW05Y0FVYXdWMWJoWTFZAT1VUWGZApdHZATSTgzUlZALc0lhanhDLWlsVFRoSzVjZA0hGTmNzV1dQZAUxJeWVuLXZAUX1RuZA0NXbTV1NEpHMXh4WFBqSEl2dVotaXFZAYmFsb1dzUEhzS1VybzFnQVN6MXU3LWNEOAZDZD';

async function fetchReels(token) {
    try {
        // Step 2: Fetch posts using FB API
		// const meData = await fetch(`https://graph.instagram.com/v24.0/me?fields=name,id&access_token=${BEARER_TOKEN}`, {
        //     headers: {
        //         'Authorization': `Bearer ${BEARER_TOKEN}`
        //     }
        // });
		console.log("Bearer Token passed in (insta) =", token);
		const meData = await fetch(`https://graph.instagram.com/v24.0/me?fields=name,id&access_token=${token}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
		
        const me = await meData.json();
		console.log("me =", me);
        // const feedData = await fetch(`https://graph.instagram.com/v24.0/me/media?fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${BEARER_TOKEN}`, {
        //     headers: {
        //         'Authorization': `Bearer ${BEARER_TOKEN}`
        //     }
        // });
        const feedData = await fetch(`https://graph.instagram.com/v24.0/me/media?fields=id,caption,media_url,media_type,timestamp,permalink&access_token=${token}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
		
        const feed = await feedData.json();
		console.log("feed =", feed);
		const feed_json_data = feed.data;
		console.log("feed_json_data =", feed_json_data);
		let res = [];
		for (const every_feed of feed_json_data) {
            let post_id = every_feed.id;
            //Get likes of every post
            let likesData = await fetch(`https://graph.instagram.com/v24.0/${post_id}/insights?metric=likes&access_token=${token}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            let likes = (await likesData.json()).data[0].values[0].value;
            console.log(`Likes of ${post_id} = ${likes}`);
            //Get shares of every post
            let sharesData = await fetch(`https://graph.instagram.com/v24.0/${post_id}/insights?metric=shares&access_token=${token}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            let shares = (await sharesData.json()).data[0].values[0].value;
            console.log(`Shares of ${post_id} = ${shares}`);
            //Get comments of every post
            let commentsData = await fetch(`https://graph.instagram.com/v24.0/${post_id}/insights?metric=comments&access_token=${token}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            let comments = (await commentsData.json()).data[0].values[0].value;
            console.log(`Comments of ${post_id} = ${comments}`);
            //Get reach of every post
            let reachData = await fetch(`https://graph.instagram.com/v24.0/${post_id}/insights?metric=reach&access_token=${token}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            let reach = (await reachData.json()).data[0].values[0].value;
			let every_res = {
				id: every_feed.id,
				platform: 'Instagram',
				username: me.name,
				handle: me.name,
				content: every_feed.caption,
				timestamp: every_feed.timestamp,
				likes: likes,
				comments: comments,
				shares: shares,
				image: every_feed.media_url,
				metrics: {
					reach: reach,
					engagement: null,
					sentiment: null
				}
			}
			res.push(every_res);
		}
        console.log("res =", res);
		return res;
    } catch (error) {
        console.error('Error fetching feed:', error);
        return [];
    }
}

// Function to render posts on the webpage
const displayInstaReels = async (token) => {
    const posts = await fetchReels(token);
    console.log("posts =", posts);
	return posts;
}
export { displayInstaReels };

// Call the function when the DOM is fully loaded
// fetchReels("dummy");