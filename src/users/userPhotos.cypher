MATCH (user: User { username: $username })-[:POSTED]->(photo:Photo)
RETURN photo
