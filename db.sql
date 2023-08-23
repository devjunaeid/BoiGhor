create database bookStore;
use bookStore;
create table books (id int primary key auto_increment, bookTitle varchar(50) not null, bookDesc varchar(300) not null, cover varchar(300) not null, price float not null);
insert into books (bookTitle, bookDesc, cover, price) values ("Gora", 'Rabindranath Tagore - Vast in its scope and rich in thought Gora has been acclaimed as a monumental work in the history of Bengali fiction.', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1182381908i/1268541.jpg', 125);
