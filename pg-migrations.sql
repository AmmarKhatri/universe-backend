CREATE TABLE post_counter (
    post_id varchar(255) PRIMARY KEY,
    likes int,
    dislikes int,
    comments int
);

CREATE TABLE comment_counter (
    post_id varchar(255),
    comment_id varchar(255),
    likes int,
    dislikes int,
    PRIMARY KEY (post_id, comment_id)
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