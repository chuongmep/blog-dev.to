Dev.to is a great platform for writing blog articles and sharing knowledge. However, I’m concerned that important posts might be deleted at any time due to account-related issues or other reasons beyond our control. Therefore, it’s a good idea to keep backups of all the posts we create to ensure they are preserved.

## Good Things 

- You don't need to worries about your post will lost 
- You can use you data for analyst and explore 
- you can use backup data to build another blog or for another purpose.
- dev.to as a cms system
...

## Requirment

First at all, you need to import the library and api able to use API, the API you can generate at `Settings > Extensions > Generate a new Key`

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lbs7ix67udh1gy78fdiy.png)

Some import library for python:

```py
import requests
import os
import json
import sqlite3
api_key = os.environ['DEVTOAPI']
```

## Backup Acticles To Markdown 

```py
def get_posts_response_data(api_key):
    # URL of the API endpoint
    url = "https://dev.to/api/articles/me/published"

    # Headers for the request
    headers = {
        "Content-Type": "application/json",
        "api-key": api_key
    }

    # Send GET request
    response = requests.get(url, headers=headers)

    # Check if request was successful
    if response.status_code == 200:
        # Parse JSON response
        response_data = response.json()
        return response_data
    else:
        # If request was unsuccessful, print error message
        print("Error:", response.text)

def save_dev_post_to_markdown(response,markdown_file_root_path,overwrite=False):
    for article in response:
        published_at = article['published_at']
        title = article['title']
        full_title = "{}-{}".format(published_at.split('T')[0],title)
        markdown_content = article['body_markdown']
        if overwrite == False and os.path.exists('{}/{}.md'.format(markdown_file_root_path,full_title)) == True:
            continue
        if os.path.exists(markdown_file_root_path) == False:
            os.mkdir(markdown_file_root_path)
        if '/' in title:
            title = title.replace('/', '-')
        with open('{}/{}.md'.format(markdown_file_root_path,full_title), 'w',encoding='utf-8') as f:
            f.write(markdown_content)
            print("File saved as {}.md".format(title))
```

Now you can run function to generate result markdown to storage in folder acticles 

```py
# run the function
response = get_posts_response_data(api_key)
save_dev_post_to_markdown(response, 'acticles')
```
This is result, markdown files generate with datetime-title and save into folder `acticles` created
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1yy49uwdxmtmmqugi7bk.png)

## Backup Acticles to SQLite

```py
def insert_article(data,sql_path):
    # Connect to the SQLite database (or create it if it doesn't exist)
    conn = sqlite3.connect(sql_path)
    cursor = conn.cursor()

    # Create the table if it doesn't already exist
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY,
        type_of TEXT,
        title TEXT,
        description TEXT,
        published BOOLEAN,
        published_at TEXT,
        slug TEXT,
        path TEXT,
        url TEXT,
        comments_count INTEGER,
        public_reactions_count INTEGER,
        page_views_count INTEGER,
        published_timestamp TEXT,
        body_markdown TEXT,
        positive_reactions_count INTEGER,
        cover_image TEXT,
        tag_list TEXT,
        canonical_url TEXT,
        reading_time_minutes INTEGER,
        user_name TEXT,
        user_username TEXT,
        user_github_username TEXT,
        user_website_url TEXT,
        user_profile_image TEXT
    )
    ''')

    # Prepare the data to insert
    article = {
        "type_of": data.get("type_of"),
        "id": data.get("id"),
        "title": data.get("title"),
        "description": data.get("description"),
        "published": data.get("published"),
        "published_at": data.get("published_at"),
        "slug": data.get("slug"),
        "path": data.get("path"),
        "url": data.get("url"),
        "comments_count": data.get("comments_count"),
        "public_reactions_count": data.get("public_reactions_count"),
        "page_views_count": data.get("page_views_count"),
        "published_timestamp": data.get("published_timestamp"),
        "body_markdown": data.get("body_markdown"),
        "positive_reactions_count": data.get("positive_reactions_count"),
        "cover_image": data.get("cover_image"),
        "tag_list": json.dumps(data.get("tag_list", [])),  # Store tags as JSON string
        "canonical_url": data.get("canonical_url"),
        "reading_time_minutes": data.get("reading_time_minutes"),
        "user_name": data["user"].get("name"),
        "user_username": data["user"].get("username"),
        "user_github_username": data["user"].get("github_username"),
        "user_website_url": data["user"].get("website_url"),
        "user_profile_image": data["user"].get("profile_image")
    }

    # Insert data into the table
    cursor.execute('''
        INSERT OR REPLACE INTO articles (
            id, type_of, title, description, published, published_at, slug, path, url,
            comments_count, public_reactions_count, page_views_count, published_timestamp, 
            body_markdown, positive_reactions_count, cover_image, tag_list, canonical_url, 
            reading_time_minutes, user_name, user_username, user_github_username, 
            user_website_url, user_profile_image
        ) VALUES (
            :id, :type_of, :title, :description, :published, :published_at, :slug, :path, :url, 
            :comments_count, :public_reactions_count, :page_views_count, :published_timestamp, 
            :body_markdown, :positive_reactions_count, :cover_image, :tag_list, :canonical_url, 
            :reading_time_minutes, :user_name, :user_username, :user_github_username, 
            :user_website_url, :user_profile_image
        )
    ''', article)

    # Commit the transaction and close the connection
    conn.commit()
    conn.close()
def insert_articles(response,sql_path):
    for article in response:
        insert_article(article,sql_path)
```
And you also do same with generate markdown by execute function to save to sqlite :

```py
# Save the response data to a SQLite database
sql_path = './database/articles.db'
insert_articles(response, sql_path)
```
Result 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7zl9ihidi5gt73radobt.png)

## Save Comments to SQLite

```py

def create_comments_db(db_path):
    # Connect to the comments database (comments.db)
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Create the comments table if it doesn't exist
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS comments (
        id_code TEXT PRIMARY KEY,
        article_id INTEGER,
        created_at TEXT,
        body_html TEXT,
        user_name TEXT,
        user_username TEXT,
        user_github_username TEXT,
        user_profile_image TEXT,
        children TEXT,
        FOREIGN KEY (article_id) REFERENCES articles (id)
    )
    ''')

    # Commit the changes and close the connection
    conn.commit()
    conn.close()

def insert_comment(data, article_id,sql_path):
    # Connect to the comments database
    conn = sqlite3.connect(sql_path)
    cursor = conn.cursor()

    # Prepare the data to insert
    comment = {
        "id_code": data.get("id_code"),
        "article_id": article_id,  # This links the comment to an article
        "created_at": data.get("created_at"),
        "body_html": data.get("body_html"),
        "user_name": data["user"].get("name"),
        "user_username": data["user"].get("username"),
        "user_github_username": data["user"].get("github_username"),
        "user_profile_image": data["user"].get("profile_image"),
        "children": json.dumps(data.get("children", []))  # Store children as a JSON string
    }

    # Insert comment into the table
    cursor.execute('''
        INSERT OR REPLACE INTO comments (
            id_code, article_id, created_at, body_html, user_name, user_username, 
            user_github_username, user_profile_image, children
        ) VALUES (
            :id_code, :article_id, :created_at, :body_html, :user_name, :user_username, 
            :user_github_username, :user_profile_image, :children
        )
    ''', comment)

    # Commit the changes and close the connection
    conn.commit()
    conn.close()
# Assuming article_id is 2222614 (use the correct article ID)
def get_all_acticle_ids(sql_path):
    conn = sqlite3.connect(sql_path)
    cursor = conn.cursor()
    cursor.execute('SELECT id FROM articles')
    article_ids = cursor.fetchall()
    conn.close()
    return article_ids

def patch_insert_comments(sql_acticles_path,sql_comments_path):
    article_ids = get_all_acticle_ids(sql_acticles_path)
    for article_id in article_ids:
        url = f'https://dev.to/api/comments?a_id={article_id[0]}'
        response = requests.get(url)
        comments = response.json()
        for comment in comments:
            insert_comment(comment, article_id[0],sql_comments_path)
```
Now you also able to save into sqlite by execute the funtion : 
```py
# path insert comments
sql_comments_path = './database/comments.db'
create_comments_db(sql_comments_path)
patch_insert_comments(sql_path,sql_comments_path)
```
So finally you can see beautiful result like this : 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wubokhlqxpr7w820o2oz.png)

Cheers !!

Open Source : 
- https://github.com/chuongmep/blog-dev.to

