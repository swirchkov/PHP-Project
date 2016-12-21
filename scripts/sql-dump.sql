USE b17_19337464_iblog;

-- ---------------------------------------------------------------------

--
-- table structure users
--

CREATE TABLE IF NOT EXISTS Users (
    Id int(6) UNSIGNED NOT NULL auto_increment PRIMARY KEY,
    Login varchar(50) NOT NULL default '',
    Email varchar(50) NOT NULL default '',
    Password varchar(255) NOT NULL default '',
    Image varchar(255) NOT NULL default ''
);

-- ----------------------------------------------------------------------

-- 
-- table structure Article
--

CREATE TABLE IF NOT EXISTS Articles (
    Id int(6) UNSIGNED NOT NULL auto_increment PRIMARY KEY,
    Title varchar(50) NOT NULL default '',
    TextField TEXT NOT NULL default '',
    Image varchar(50) NOT NULL default '',
    Tags varchar(100) NOT NULL default '' ,
    AuthorId int(6),
    Index auth_id (AuthorId),
    FOREIGN KEY (AuthorId) REFERENCES Users(Id) ON DELETE CASCADE
);