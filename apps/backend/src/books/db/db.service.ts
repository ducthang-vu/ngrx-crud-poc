import { Injectable } from '@nestjs/common';
import { Book } from "@ngrx-crud-poc/core-data";

@Injectable()
export class DbService {
  private _items: Omit<Book, 'id'>[] = [
    {
      "author": "Chinua Achebe",
      "country": "Nigeria",
      "language": "English",
      "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
      "pages": 209,
      "title": "Things Fall Apart",
      "year": 1958
    },
    {
      "author": "Hans Christian Andersen",
      "country": "Denmark",
      "language": "Danish",
      "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
      "pages": 784,
      "title": "Fairy tales",
      "year": 1836
    },
    {
      "author": "Dante Alighieri",
      "country": "Italy",
      "language": "Italian",
      "link": "https://en.wikipedia.org/wiki/Divine_Comedy\n",
      "pages": 928,
      "title": "The Divine Comedy",
      "year": 1315
    },
    {
      "author": "Unknown",
      "country": "Sumer and Akkadian Empire",
      "language": "Akkadian",
      "link": "https://en.wikipedia.org/wiki/Epic_of_Gilgamesh\n",
      "pages": 160,
      "title": "The Epic Of Gilgamesh",
      "year": -1700
    },
    {
      "author": "Unknown",
      "country": "Achaemenid Empire",
      "language": "Hebrew",
      "link": "https://en.wikipedia.org/wiki/Book_of_Job\n",
      "pages": 176,
      "title": "The Book Of Job",
      "year": -600
    },
    {
      "author": "Unknown",
      "country": "India/Iran/Iraq/Egypt/Tajikistan",
      "language": "Arabic",
      "link": "https://en.wikipedia.org/wiki/One_Thousand_and_One_Nights\n",
      "pages": 288,
      "title": "One Thousand and One Nights",
      "year": 1200
    },
    {
      "author": "Unknown",
      "country": "Iceland",
      "language": "Old Norse",
      "link": "https://en.wikipedia.org/wiki/Nj%C3%A1ls_saga\n",
      "pages": 384,
      "title": "Nj\u00e1l's Saga",
      "year": 1350
    },
    {
      "author": "Jane Austen",
      "country": "United Kingdom",
      "language": "English",
      "link": "https://en.wikipedia.org/wiki/Pride_and_Prejudice\n",
      "pages": 226,
      "title": "Pride and Prejudice",
      "year": 1813
    },
    {
      "author": "Honor\u00e9 de Balzac",
      "country": "France",
      "language": "French",
      "link": "https://en.wikipedia.org/wiki/Le_P%C3%A8re_Goriot\n",
      "pages": 443,
      "title": "Le P\u00e8re Goriot",
      "year": 1835
    },
    {
      "author": "Samuel Beckett",
      "country": "Republic of Ireland",
      "language": "French, English",
      "link": "https://en.wikipedia.org/wiki/Molloy_(novel)\n",
      "pages": 256,
      "title": "Molloy, Malone Dies, The Unnamable, the trilogy",
      "year": 1952
    },
    {
      "author": "Giovanni Boccaccio",
      "country": "Italy",
      "language": "Italian",
      "link": "https://en.wikipedia.org/wiki/The_Decameron\n",
      "pages": 1024,
      "title": "The Decameron",
      "year": 1351
    },
    {
      "author": "Jorge Luis Borges",
      "country": "Argentina",
      "language": "Spanish",
      "link": "https://en.wikipedia.org/wiki/Ficciones\n",
      "pages": 224,
      "title": "Ficciones",
      "year": 1965
    },
    {
      "author": "Emily Bront\u00eb",
      "country": "United Kingdom",
      "language": "English",
      "link": "https://en.wikipedia.org/wiki/Wuthering_Heights\n",
      "pages": 342,
      "title": "Wuthering Heights",
      "year": 1847
    },
    {
      "author": "Albert Camus",
      "country": "Algeria, French Empire",
      "language": "French",
      "link": "https://en.wikipedia.org/wiki/The_Stranger_(novel)\n",
      "pages": 185,
      "title": "The Stranger",
      "year": 1942
    },
    {
      "author": "Paul Celan",
      "country": "Romania, France",
      "language": "German",
      "link": "\n",
      "pages": 320,
      "title": "Poems",
      "year": 1952
    },
    {
      "author": "Louis-Ferdinand C\u00e9line",
      "country": "France",
      "language": "French",
      "link": "https://en.wikipedia.org/wiki/Journey_to_the_End_of_the_Night\n",
      "pages": 505,
      "title": "Journey to the End of the Night",
      "year": 1932
    },
    {
      "author": "Miguel de Cervantes",
      "country": "Spain",
      "language": "Spanish",
      "link": "https://en.wikipedia.org/wiki/Don_Quixote\n",
      "pages": 1056,
      "title": "Don Quijote De La Mancha",
      "year": 1610
    },
    {
      "author": "Thomas Mann",
      "country": "Germany",
      "language": "German",
      "link": "https://en.wikipedia.org/wiki/Buddenbrooks\n",
      "pages": 736,
      "title": "Buddenbrooks",
      "year": 1901
    },
    {
      "author": "William Shakespeare",
      "country": "England",
      "language": "English",
      "link": "https://en.wikipedia.org/wiki/Hamlet\n",
      "pages": 432,
      "title": "Hamlet",
      "year": 1603
    },
    {
      "author": "William Shakespeare",
      "country": "England",
      "language": "English",
      "link": "https://en.wikipedia.org/wiki/King_Lear\n",
      "pages": 384,
      "title": "King Lear",
      "year": 1608
    },
    {
      "author": "William Shakespeare",
      "country": "England",
      "language": "English",
      "link": "https://en.wikipedia.org/wiki/Othello\n",
      "pages": 314,
      "title": "Othello",
      "year": 1609
    },
    {
      "author": "Sophocles",
      "country": "Greece",
      "language": "Greek",
      "link": "https://en.wikipedia.org/wiki/Oedipus_the_King\n",
      "pages": 88,
      "title": "Oedipus the King",
      "year": -430
    },
    {
      "author": "Stendhal",
      "country": "France",
      "language": "French",
      "link": "https://en.wikipedia.org/wiki/The_Red_and_the_Black\n",
      "pages": 576,
      "title": "The Red and the Black",
      "year": 1830
    },
    {
      "author": "Leo Tolstoy",
      "country": "Russia",
      "language": "Russian",
      "link": "https://en.wikipedia.org/wiki/The_Death_of_Ivan_Ilyich\n",
      "pages": 92,
      "title": "The Death of Ivan Ilyich",
      "year": 1886
    }
  ];

  get items(): Book[] {
    const decorateBook = (rawBook: Omit<Book, 'id'>, id: number): Book => ({
      ...rawBook,
      id: id.toString()
    });
    return this._items.map(decorateBook);
  }
}
