import React from 'react';
import styled from 'styled-components';
import {
  useTable,
  useFilters,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table';

//style
const Styles = styled.div`
  padding: 1rem;
  font-family:roboto;
  h2 {
    margin-bottom: 10px;
    max-width: 550px;
  }
  h3 {
    margin-top:5px;
    margin-bottom: 10px;
    font-weight:400;
  }
  p.credit{
    color: a9a9a9;
    margin: 10 auto 0;
    max-width: 475px;
    text-align: center;
    margin-top:10px;
    font-size:13;
  }
  .container-container{
    display:flex;
    justify-content:center;
  }
  .CharContainer {
    display:inline-block;
  }
  input {
    display: block;
    width: 200px;
    height: 24px;
  }
  .page {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .pageNum {
    justify-content: center;
    display: flex;
    margin-top: 5px;
    em {
      margin-left: 3px;
    }
  }
  table {
    border-spacing: 0;
    /*border: 1px solid black;*/

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    tr.closed{
      background-color: #C7C6C1;
    }

    th {
      text-align:left;
      padding: 0.5rem;
      font-weight: 300;
      border-bottom: 1px solid black;
    }
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #808080;
      /*border-right: 1px solid black;*/
      :first-child{
        width:175px;
      }
      :nth-child(2){
        width:85px;
      }
      :nth-child(3){
        width:140px;
      }
      :last-child {
        border-right: 0;
        width: 75px;
      }
    }
  }
`;

function Table({ columns, data }) {
  //filtering
  const defaultColumn = React.useMemo(
    () => ({
      Filter: TextFilter,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    //rows,
    prepareRow,
    //pagination
    page,
    pageOptions,
    state: { pageIndex, pageSize, globalFilter },
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    //state,
    //preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      //filtering
      defaultColumn,
      initialState: { 
        pageSize: 15,
        sortBy: [
          {
              id: 'name',
              desc: false
          }
      ] 
      },
    },
    //hook arguments
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  //filtering
  function TextFilter({ column: { filterValue, setFilter } }) {
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`Search`}
      />
    );
  }

  //renders table
  return (
  <div className="container-container">
    <div className="CharContainer">
      {console.log(globalFilter)}
      <h2>Wondering the status of your favorite restaurant near campus?</h2>
      <h3>Search for it below.</h3>
      <input
        type="text"
        value={globalFilter || ''}
        onChange={e => setGlobalFilter(e.target.value)}
        placeholder={`Search`}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                /*sorting and filering */
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* direction indicator */}
                  <span
                    style={{
                      visibility: column.isSorted ? 'visible' : 'hidden',
                    }}
                  >
                    {column.isSortedDesc ? ' 🔽' : ' 🔼'}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            console.log();
            return (
              <tr className = {row.values.status.includes("closed")? "closed" : "open"} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="page">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
      </div>
      <div className="pageNum">
        Page 
        <em>
          {pageIndex + 1} of {pageOptions.length}
        </em>
      </div>
      <p className="credit">Data reported by Noah Sheidlower, table created by Elizabeth Commisso and edited by Charlotte Li.</p>
    </div>
    </div>
  );
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Outdoor Dining',
        accessor: 'outdoor',
      },
      {
        Header: 'Tables',
        accessor: 'tables',
      },
    ],
    [],
  );

  const data = React.useMemo(
    () => [
      {
        name: "Friedman's",
        status: "closed",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Flat Top",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Floridita",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Cascabel Taqueria",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "The West End Lounge",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Smoke Jazz & Supper Club",
        status: "open",
        outdoor: "",
        tables: ""
      },
      {
        name: "Xi'an Famous Foods",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Mexican Festival",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Szechuan Garden",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Calle Ocho",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Chandni",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Zanny's",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Saiguette",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Bob's Your Uncle",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Roasted Masala",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Red Hot Hot Pot",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Nobody Told Me",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Arts and Crafts Beer Parlor",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "The Hamilton",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Marlow Bistro",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Community Food & Juice",
        status: "closed",
        outdoor: "no (renovations)",
        tables: ""
      },
      {
        name: "Elysian Fields Cafe",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Subconscious",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Sliced",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Apple Tree Supermarket",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Dunkin’ - 121st and Amsterdam",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Bar 314",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Max Caffè",
        status: "open",
        outdoor: "yes",
        tables: 6
      },
      {
        name: "Dragon Sushi",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Dun Huang",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Mellow Tea",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Max SoHa",
        status: "open",
        outdoor: "yes",
        tables: 4
      },
      {
        name: "Nikko",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Jin Ramen",
        status: "open",
        outdoor: "yes",
        tables: 5
      },
      {
        name: "Go! Go! Curry!",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Dear Mama Coffee",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Dinosaur Bar-B-Que",
        status: "open",
        outdoor: "yes",
        tables: 5
      },
      {
        name: "123 Burger Shot Beer",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "The Expat",
        status: "open",
        outdoor: "yes",
        tables: 8
      },
      {
        name: "Starbucks - 124th and Broadway",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Oasis Jimma Juice Bar",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Trufa Pizzeria",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Toast Uptown",
        status: "open",
        outdoor: "yes",
        tables: 7
      },
      {
        name: "Craftsman",
        status: "open",
        outdoor: "yes",
        tables: 10
      },
      {
        name: "Chapati House",
        status: "open",
        outdoor: "yes",
        tables: 2
      },
      {
        name: "Falafel on Broadway",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "El Porton",
        status: "open",
        outdoor: "yes",
        tables: 8
      },
      {
        name: "Cap't Loui",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Bettolona",
        status: "open",
        outdoor: "yes",
        tables: 4
      },
      {
        name: "La Salle Dumpling Room",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Chokolat Patisserie & Culture Tea Bar",
        status: "open",
        outdoor: "yes",
        tables: 2
      },
      {
        name: "Broadway Au Lait",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Olive Tree Deli",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Pret A Manger",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Sweetgreen",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Starbucks - 114th and Broadway",
        status: "open",
        outdoor: "yes",
        tables: 2
      },
      {
        name: "Dos Toros",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Häagen-Dazs",
        status: "open",
        outdoor: "yes",
        tables: 4
      },
      {
        name: "Blue Bottle Coffee",
        status: "open",
        outdoor: "yes",
        tables: 7
      },
      {
        name: "Wu + Nussbaum",
        status: "open",
        outdoor: "yes",
        tables: 10
      },
      {
        name: "Mill",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Pinkberry",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Hex & Company",
        status: "open",
        outdoor: "yes",
        tables: 4
      },
      {
        name: "Shaking Crab",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "The Heights Bar & Grill",
        status: "open",
        outdoor: "",
        tables: ""
      },
      {
        name: "Samad's Gourmet",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Famous Famiglia",
        status: "open",
        outdoor: "yes",
        tables: 4
      },
      {
        name: "Pressed Juicery",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Kung Fu Tea",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Five Guys",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Chipotle",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Fumo",
        status: "open",
        outdoor: "yes",
        tables: 7
      },
      {
        name: "Six Corners Marketplace",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Serafina",
        status: "open",
        outdoor: "no (construction)",
        tables: ""
      },
      {
        name: "Tap A Keg",
        status: "open",
        outdoor: "yes",
        tables: 6
      },
      {
        name: "Cafe Du Soleil",
        status: "open",
        outdoor: "yes",
        tables: 21
      },
      {
        name: "Jerusalem",
        status: "open",
        outdoor: "yes",
        tables: 2
      },
      {
        name: "Broadway Pizza & Restaurant",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Yakitori Sun-Chan",
        status: "open",
        outdoor: "yes",
        tables: 2
      },
      {
        name: "Ollie's",
        status: "open",
        outdoor: "yes",
        tables: 7
      },
      {
        name: "Aangan",
        status: "open",
        outdoor: "yes",
        tables: 3
      },
      {
        name: "Sal & Carmine Pizza",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Shiny Tea",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Cool Fresh Juice Bar",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Flor de Mayo",
        status: "open",
        outdoor: "yes",
        tables: 2
      },
      {
        name: "Metro Diner",
        status: "open",
        outdoor: "yes",
        tables: 9
      },
      {
        name: "Manhattan Valley",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Naruto Ramen",
        status: "open",
        outdoor: "yes",
        tables: "1-2"
      },
      {
        name: "Yu Kitchen",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Broadway Bagel",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Broadway Dive",
        status: "open",
        outdoor: "yes",
        tables: 5
      },
      {
        name: "Peaky Barista",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Ben and Jerry's",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "McDonald's",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Silver Moon Bakery",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Malaysia Grill",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Mama's TOO!",
        status: "open",
        outdoor: "yes",
        tables: 6
      },
      {
        name: "Koko Wings",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Absolute Bagels",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "108 Food Dried Hot Pot",
        status: "open",
        outdoor: "yes",
        tables: 2
      },
      {
        name: "Himalayan Curry House",
        status: "open",
        outdoor: "yes",
        tables: "3-4"
      },
      {
        name: "Gong Cha",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Atlas Kitchen",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Koronet",
        status: "open",
        outdoor: "yes",
        tables: 4
      },
      {
        name: "Mel's Burger Bar",
        status: "open",
        outdoor: "yes",
        tables: 8
      },
      {
        name: "Panda Express",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Tea Magic",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Tom's",
        status: "open",
        outdoor: "yes",
        tables: "4-5"
      },
      {
        name: "Oren's Daily Roast",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Dig",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Milano Market",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Junzi Kitchen",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Miss Mamie's Spoonbread Too",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Hunan Chen's Kitchen",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Awash Ethiopian Restaurant",
        status: "open",
        outdoor: "yes",
        tables: 5
      },
      {
        name: "Cafe Roma",
        status: "open",
        outdoor: "yes",
        tables: 1
      },
      {
        name: "Casa Mexicana",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "GerSushi",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Massawa",
        status: "open",
        outdoor: "yes",
        tables: 5
      },
      {
        name: "Peking Garden",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Shake Shack",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Le Monde",
        status: "open",
        outdoor: "yes",
        tables: 16
      },
      {
        name: "Giovanni’s Pizza",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Freda's Caribbean & Soul Cuisine",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Demitasse Coffee & Tea",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Don Ramon",
        status: "open",
        outdoor: "yes",
        tables: 6
      },
      {
        name: "Sheshe Pizzeria",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "The Calaveras",
        status: "open",
        outdoor: "yes",
        tables: 10
      },
      {
        name: "Doaba Deli",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Mekong",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Empire Garden",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Benny’s Chao King",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Joe's Gourmet Deli",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Pie Pie Pizza",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Chirping Chicken",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Duke Ellington Deli",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Mighty Catch",
        status: "open",
        outdoor: "yes",
        tables: 5
      },
      {
        name: "Curry King",
        status: "open",
        outdoor: "yes",
        tables: 3
      },
      {
        name: "Coma Bueno",
        status: "open",
        outdoor: "yes",
        tables: 9
      },
      {
        name: "Crepes on Columbus",
        status: "open",
        outdoor: "yes",
        tables: 3
      },
      {
        name: "Ortomare Ristorante Pizzeria",
        status: "open",
        outdoor: "yes",
        tables: 4
      },
      {
        name: "Kikoo Sushi",
        status: "open",
        outdoor: "yes",
        tables: 4
      },
      {
        name: "Lion's Head Tavern",
        status: "open",
        outdoor: "yes",
        tables: 16
      },
      {
        name: "Spice",
        status: "open",
        outdoor: "yes",
        tables: 4
      },
      {
        name: "Subway",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Happy Hot Hunan",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Domino's",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Zaad",
        status: "open",
        outdoor: "yes",
        tables: 2
      },
      {
        name: "Tropical Sensation",
        status: "open",
        outdoor: "yes",
        tables: 4
      },
      {
        name: "Mama’s Pizzeria",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Anār",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Living Thai",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Grain House",
        status: "open",
        outdoor: "yes",
        tables: 2
      },
      {
        name: "Hamilton Deli",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Noche Mexicana",
        status: "open",
        outdoor: "yes",
        tables: 5
      },
      {
        name: "Raenu Continental Thai",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Mokja",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Ranch Deli",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Host Deli",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Arco Cafe",
        status: "open",
        outdoor: "yes",
        tables: 5
      },
      {
        name: "Bosino",
        status: "open",
        outdoor: "yes",
        tables: 4
      },
      {
        name: "New Kam Lai",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Dunkin’ - 104th and Amsterdam",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Papa John's",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "The Tang",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Ranchito",
        status: "open",
        outdoor: "yes",
        tables: 2
      },
      {
        name: "Miss Saigon",
        status: "open",
        outdoor: "yes",
        tables: 2
      },
      {
        name: "Acosta",
        status: "open",
        outdoor: "yes",
        tables: 3
      },
      {
        name: "Calaveras Corner",
        status: "open",
        outdoor: "yes",
        tables: 9
      },
      {
        name: "Makana",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Dive 106",
        status: "open",
        outdoor: "yes",
        tables: 10
      },
      {
        name: "Bánh",
        status: "open",
        outdoor: "yes",
        tables: 6
      },
      {
        name: "Thai Market",
        status: "open",
        outdoor: "yes",
        tables: 4
      },
      {
        name: "Pancho’s",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Suma Sushi",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "La Piccola Cucina",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Taqueria y Fonda La Mexicana",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Amity Hall",
        status: "open",
        outdoor: "yes",
        tables: "18-19"
      },
      {
        name: "109 Spicy Gourmet Deli",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Roti Roll",
        status: "open",
        outdoor: "yes",
        tables: 5
      },
      {
        name: "Elis Wine Bar and Restaurant",
        status: "open",
        outdoor: "yes",
        tables: 5
      },
      {
        name: "1020 Bar",
        status: "open",
        outdoor: "yes",
        tables: 4
      },
      {
        name: "V&T",
        status: "open",
        outdoor: "yes",
        tables: 9
      },
      {
        name: "Hula Poke",
        status: "open",
        outdoor: "yes",
        tables: 1
      },
      {
        name: "Insomnia",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Hungarian Pastry Shop",
        status: "open",
        outdoor: "yes",
        tables: 17
      },
      {
        name: "Tartina",
        status: "open",
        outdoor: "yes",
        tables: 5
      },
      {
        name: "The New York Basics",
        status: "open",
        outdoor: "yes",
        tables: 5
      },
      {
        name: "Strokos Gourmet Deli",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Symposium",
        status: "open",
        outdoor: "no",
        tables: ""
      }
    ],
    [],
  );

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  );
}

export default App;
