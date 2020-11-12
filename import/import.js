const fs = require('fs');
const { IgApiClient } = require('instagram-private-api');
const sample = require('lodash/sample');
const ig = new IgApiClient();
// You must generate device id's before login.
// Id's generated based on seed
// So if you pass the same value as first argument - the same id's are generated every time
ig.state.generateDevice(process.env.IG_USERNAME);
// Optionally you can setup proxy url
ig.state.proxyUrl = process.env.IG_PROXY;

function createUser(user, info) {
    return `CREATE (${user.username}: User {
    username: '${user.username}',
    followed_by_count: ${info.follower_count},
    follow_count: ${info.following_count},
    user_id: ${user.pk},
    is_private: false,
    is_verified: ${user.is_verified}
    is_business: ${info.is_business}
});
`;
}

async function main() {
    // Execute all requests prior to authorization in the real Android application
    // Not required but recommended
    await ig.simulate.preLoginFlow();
    const loggedInUser = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    // The same as preLoginFlow()
    // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
    process.nextTick(async () => await ig.simulate.postLoginFlow());
    // Create UserFeed instance to get loggedInUser's posts
    const followedUsersFeed = ig.feed.accountFollowing(loggedInUser.pk);
    const response = await followedUsersFeed.request();

    // doing via .push() to process all one-by-one via for/of + await
    const usersToWrite = [];
    for (const user of response.users) {
        const userInfo = await ig.user.info(user.pk);
        const userFeed = ig.feed.timeline(user.pk);

        const userFeedResponse = await userFeed.request();

        if (user.username == 'mkbhd') {
            console.log(
                'user media:',
                userFeedResponse.feed_items
                    .filter(item => 'media_or_ad' in item)
                    .map(item => item.media_or_ad.carousel_items)
            );
        }

        usersToWrite.push(createUser(user, userInfo));
    }

    fs.writeFileSync('./createUsers.cypher', usersToWrite.join('\n'));
}

main().finally(() => {
    console.log('Done');
});
