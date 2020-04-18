-- INSERT INTO authors (first_name, last_name) VALUES ('Oleg', 'Litvak');
-- INSERT INTO authors (first_name, last_name) VALUES ('Tanya', 'Litvak');
-- INSERT INTO authors (first_name, last_name) VALUES ('Milana', 'Litvak');
-- INSERT INTO authors (first_name, last_name) VALUES ('Dana', 'Litvak');
-- INSERT INTO authors (first_name, last_name) VALUES ('Petya', 'Litvak');

-- INSERT INTO books (title) VALUES ('Hello world');
-- INSERT INTO books (title) VALUES ('Art of decisions');
-- INSERT INTO books (title) VALUES ('King of rings');
-- INSERT INTO books (title) VALUES ('Rings of kings');
-- INSERT INTO books (title) VALUES ('Art of Me');
-- INSERT INTO books (title) VALUES ('Foo bar');

-- INSERT INTO books_authors_relation_authors (authorsId, booksId)
--   VALUES
--    ('1', '2'),
--    ('2', '1'),
--    ('1', '3'),
--    ('3', '6'),
--    ('2', '3'),
--    ('2', '4');

-- SELECT * FROM authors;
-- SELECT * FROM books;
SELECT * FROM books_authors_relation_authors;
