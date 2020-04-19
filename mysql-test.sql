use graphql;

-- SET FOREIGN_KEY_CHECKS = 0;
-- DROP table if exists books_authors_authors;
-- DROP table if exists authors;
-- DROP table if exists books;
-- SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO authors (first_name, last_name) VALUES ('Oleg', 'Litvak');
INSERT INTO authors (first_name, last_name) VALUES ('Tanya', 'Litvak');
INSERT INTO authors (first_name, last_name) VALUES ('Milana', 'Litvak');
INSERT INTO authors (first_name, last_name) VALUES ('Dana', 'Litvak');
INSERT INTO authors (first_name, last_name) VALUES ('Petya', 'Litvak');

INSERT INTO books (title) VALUES ('Hello world');
INSERT INTO books (title) VALUES ('Art of decisions');
INSERT INTO books (title) VALUES ('King of rings');
INSERT INTO books (title) VALUES ('Rings of kings');
INSERT INTO books (title) VALUES ('Art ofThe Painting');
INSERT INTO books (title) VALUES ('Foo bar');

INSERT INTO books_authors_relation_authors (authorsId, booksId)
  VALUES
   ('9', '2'),
   ('9', '3'),
   ('9', '5'),
   ('10', '2'),
   ('10', '3'),
   ('11', '19'),
   ('11', '20'),
   ('11', '3'),
   ('11', '24'),
   ('12', '24'),
   ('12', '25'),
   ('13', '25')
   ;

SELECT * FROM authors;
SELECT * FROM books;
SELECT * FROM books_authors_relation_authors;

SELECT rl.*, a.first_name, a.last_name, b.title
  FROM books_authors_relation_authors rl
  JOIN authors a ON rl.authorsId = a.id
  JOIN books b ON rl.booksId = b.id
;

-- GET authors by book count
SELECT filtered.* FROM ( 
    SELECT a.*, COUNT(*) book_count
        FROM books_authors_relation_authors rl
        JOIN authors a ON rl.authorsId = a.id
        JOIN books b ON rl.booksId = b.id
        GROUP BY a.id
        ORDER BY book_count DESC
) filtered
    WHERE filtered.book_count >= 0
    AND filtered.book_count <= 10
;
