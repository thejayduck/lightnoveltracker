import Head from 'next/head'
import styles from '../styles/Home.module.css'
import cardStyle from '../styles/BookCard.module.css'

import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import BookCard from '../components/bookCard'
import Footer from '../components/footer'
import SearchBar from '../components/searchBar'
import NewBook from './newBook'
import BookInfo from './bookInfo'

export function CardListWrapper({ data, children }) {
  return (
    <div className={styles.cardListContainer}>
      <ul className={styles.cardListFeed}>{children}</ul>
    </div>
  );
}

function usePersistedState(key, defaultValue) {

  // const [state, setState] = useState(
  //   (JSON.parse(localStorage.getItem(key)) || defaultValue)
  // );
  // useEffect(() => {
  //   localStorage.setItem(key, JSON.stringify(state));
  // }, [key, state]);

  const [state, setState] = useState(defaultValue);
  return ([state, setState]);
}

export default function Home() {

  //#region  CONST
  const [darkmode, setDarkmode] = usePersistedState("darkmode", false);
  const [newBookPanel, setNewBookPanel] = useState(false);
  const [data, setData] = useState([]);
  const [bookInfoPanel, setBookInfoPanel] = useState(false);
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);

  const removeBook = (id) => {
    setData(data.filter(target => target.mal_id !== id));

  };

  //#region Fuse
  const [query, setQuery] = useState('');

  const fuse = new Fuse(data, {
    keys: [
      'title',
      'synopsis'
    ],
  });

  const fuseResults = fuse.search(query);
  const bookResults = query ? fuseResults.map(result => result.item) : data;

  function onSearch({ currentTarget }) {
    setQuery(currentTarget.value);
  }
  //#endregion

  //#region Local Storage
  const exportData = () => {
    var element = document.createElement('a');
    element.style.display = 'none';
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));
    element.setAttribute('download', 'data.json');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  const importData = (target) => {
    const reader = new FileReader();
    reader.addEventListener('load', ({ target }) => {
      console.log(target.result);
      setData(JSON.parse(atob(target.result.replace("data:application/json;base64,", ""))));
      document.getElementById
    });
    reader.readAsDataURL(target);
  }

  useEffect(() => {
    const localData = localStorage.getItem('books');
    setData(localData ? JSON.parse(localData) : []);
  }, [])

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(data))
  }, [data])
  //#endregion

  const updateElementInData = (index, updateElementCallback) => {
    let new_data = [...data];
    updateElementCallback(new_data[index]);
    setData(new_data);
  };

  //#endregion

  return (
    <div
      className={`${styles.container} ${darkmode ? styles.dark : styles.light}`}
    >
      <Head>
        <title>Light Novel Tracker</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="public/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* Old SearchBar Location */}
        <SearchBar onInput={onSearch} query={query} />
        <CardListWrapper data={data}>
          {bookResults.map((entry, index) => (
            <li key={entry.mal_id}>
              <div className={cardStyle.activityEntry}>
                <BookCard
                  entry={entry}
                  onIncrement={() =>
                    updateElementInData(index, (element) => element.chapter++)
                  }
                  onDecrement={() =>
                    updateElementInData(
                      index,
                      (element) =>
                        (element.chapter = Math.max(0, element.chapter - 1))
                    )
                  }
                  onInfoClick={() => {
                    setSelectedBookIndex(index);
                    setBookInfoPanel(!bookInfoPanel);
                  }}
                  onDelete={() => removeBook(entry.mal_id)}
                />
              </div>
            </li>
          ))}
        </CardListWrapper>
      </main>
      <Footer
        data={data}
        darkmode={darkmode}
        onDarkModeClick={() => setDarkmode(!darkmode)}
        onExportDataClick={exportData}
        onImportDataClick={() => {
          var element = document.getElementById('importData');
          element.click();
        }}
      />
      <input id="importData" style={{ display: 'none' }} type="file" accept=".json" onChange={({ target }) => { importData(target.files[0]); target.value = null }} />
      {newBookPanel && (
        <NewBook onAddClicked={(entry) => {
          if (!data.includes(entry))
            setData([...data, entry])
        }
        } />
      )}
      <div className={styles.newBook} onClick={() => setNewBookPanel(!newBookPanel)}>
        <a title="Add New Book" className="fas fa-plus" />
      </div>

      {bookInfoPanel && (
        <BookInfo
          book={data[selectedBookIndex]}
          onChapterChange={
            ({ target }) => {
              updateElementInData(selectedBookIndex, (element) => element.chapter = Number.parseInt(target.value))
            }
          }
          onVolumeChange={
            ({ target }) => {
              updateElementInData(selectedBookIndex, (element) => element.volume = Number.parseInt(target.value))
            }
          }
          onExit={() => setBookInfoPanel(!bookInfoPanel)}
        />
      )}
    </div>
  );
}
