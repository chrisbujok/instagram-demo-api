MATCH (n) DETACH DELETE n;

CREATE(photo_1:Photo {
    id: 1,
    user_id: "ijustine",
    caption: "Caption 1",
    height: 400,
    width: 300,
    image_path: "#",
    image_size: 123,
    date_created: datetime(),
    date_updated: datetime()
})

CREATE(photo_2:Photo {
    id: 2,
    user_id: "mkbhd",
    caption: "Caption 2",
    height: 400,
    width: 300,
    image_path: "#",
    image_size: 123,
    date_created: datetime(),
    date_updated: datetime()
})

CREATE (beyonce: User {
    username: 'beyonce',
    followed_by_count: 155784719,
    follow_count: 0,
    user_id: 247944034,
    is_private: false,
    is_verified: true,
    is_business: false
});

CREATE (ijustine: User {
    username: 'ijustine',
    followed_by_count: 1703734,
    follow_count: 1333,
    user_id: 103,
    is_private: false,
    is_verified: true,
    is_business: false
});

CREATE (ronaldo: User {
    username: 'ronaldo',
    followed_by_count: 17463096,
    follow_count: 1019,
    user_id: 5749522,
    is_private: false,
    is_verified: true,
    is_business: false
});

CREATE (mkbhd: User {
    username: 'mkbhd',
    followed_by_count: 2866438,
    follow_count: 399,
    user_id: 28943446,
    is_private: false,
    is_verified: true,
    is_business: true
});

CREATE (rockstargames: User {
    username: 'rockstargames',
    followed_by_count: 18971497,
    follow_count: 826,
    user_id: 184595688,
    is_private: false,
    is_verified: true,
    is_business: true
});

MATCH (a:User), (b:Photo) WHERE a.username = "mkbhd" AND b.id = 2
CREATE (a)-[r:POSTED]->(b);

MATCH (a:User), (b:Photo) WHERE a.username = "ijustine" AND b.id = 1
CREATE (a)-[r:POSTED]->(b);

