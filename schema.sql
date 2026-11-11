CREATE TABLE IF NOT EXISTS mangas (
    id INTEGER PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS chapters (
    manga_id INTEGER NOT NULL REFERENCES mangas(id),
    id INTEGER NOT NULL PRIMARY KEY,
    title TEXT,
    cap REAL NOT NULL,
    UNIQUE (manga_id, cap)
);

CREATE TABLE IF NOT EXISTS pages (
    chapter_id INTEGER NOT NULL REFERENCES chapters(id),
    pag INTEGER NOT NULL,
    file_key TEXT NOT NULL UNIQUE,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    UNIQUE (chapter_id, pag)
);