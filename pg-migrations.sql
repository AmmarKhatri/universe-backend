CREATE TABLE post_counter (
    post_id varchar(255) PRIMARY KEY,
    likes int,
    dislikes int,
    comments int
);

CREATE TABLE comment_counter (
    comment_id varchar(255) PRIMARY KEY,
    likes int,
    dislikes int
);

CREATE TABLE post_impression (
    post_id varchar(255),
    user_id varchar(255),
    impression bool,
    PRIMARY KEY (post_id, user_id)
);

CREATE TABLE comment_impressions(
    comment_id varchar(255),
    user_id varchar(255),
    impression bool,
    PRIMARY KEY (comment_id, user_id)
);