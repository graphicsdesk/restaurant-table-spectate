import React from "react";
import styled from "styled-components";
import { useTable, useFilters, useSortBy, usePagination, useGlobalFilter, useAsyncDebounce} from 'react-table'



//style
const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
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
    []
   )

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
  } = useTable({
    columns,
    data,
    //filtering
    defaultColumn,
    initialState: { pageSize: 20},
  },
  //hook arguments
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
  )

//filtering
function TextFilter({
  column: { filterValue, setFilter },
  }) {
  
  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`Search`}
    />
  )
  }

  //renders table
  return (
  <div>
    {console.log(globalFilter)}
    <input
      type="text"
      value={globalFilter || ""}
      onChange={e => setGlobalFilter(e.target.value)}
      placeholder={`Search`}
    />
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (

              /*sorting and filering */
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                {/* direction indicator */}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              </th>
              
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>

        {page.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    <div>
       <button onClick={() => previousPage()} disabled={!canPreviousPage}>
         Previous Page
       </button>
       <button onClick={() => nextPage()} disabled={!canNextPage}>
         Next Page
       </button>
       <div>
         Page{' '}
         <em>
           {pageIndex + 1} of {pageOptions.length}
         </em>
       </div>
     </div>
  </div>
  );
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header: "Outdoor Dining",
        accessor: "outdoor"
      },
      {
        Header: "Tables",
        accessor: "tables"
      }
    ],
    []
  );

  const data = React.useMemo(
    () => [
      {
        name: "Friedman's",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Elysian Fields",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Subs conscious",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Sliced",
        status: "ooen",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Apple Tree",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Dunkin Donuts (121)",
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
        name: "Flat Top",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Bar 314 (check)",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Max Caffe",
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
        name: "Go! Go! Curry",
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
        name: "Dinosaur BBQ",
        status: "closed",
        outdoor: "no (under construction)",
        tables: ""
      },
      {
        name: "123BSB",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Floridita",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "The Expat",
        status: "open",
        outdoor: "yes",
        tables: 8
      },
      {
        name: "Starbucks",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Oasis Jimma",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Peking Garden",
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
        name: "Toast",
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
        name: "Capt Loui",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Bettolona",
        status: "open",
        outdoor: "no (construction)",
        tables: ""
      },
      {
        name: "La Salle Dumpling Room",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Chokolat",
        status: "open",
        outdoor: "yes",
        tables: 2
      },
      {
        name: "Broadway au Lait",
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
        name: "Shake Shack",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Prêt a Manger",
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
        name: "Starbucks",
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
        name: "Haagen-Dazs",
        status: "open",
        outdoor: "yes",
        tables: 4
      },
      {
        name: "Blue Bottle Coffee (?)",
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
        name: "Community",
        status: "closed",
        outdoor: "no (renovations)",
        tables: ""
      },
      {
        name: "Le Monde",
        status: "open",
        outdoor: "yes",
        tables: 16
      },
      {
        name: "Pinkberry",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Hex & Co",
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
        name: "Heights",
        status: "open",
        outdoor: "idk",
        tables: ""
      },
      {
        name: "Samad's",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Famiglia",
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
        name: "Cascabel Taqueria",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Fumo",
        status: "open",
        outdoor: "yes",
        tables: 7
      },
      {
        name: "The West End Lounge",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Six Corners Marketplace",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Smoke",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Boulevard",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Serafina",
        status: "open",
        outdoor: "no (construction)",
        tables: ""
      },
      {
        name: "Tap a Keg",
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
        name: "Broadway Pizza",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Sun Chan",
        status: "open",
        outdoor: "no",
        tables: ""
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
        name: "Xian",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Sal + Carmines",
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
        name: "Naruto",
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
        name: "Mexican Festival",
        status: "open",
        outdoor: "closed",
        tables: ""
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
        name: "Silver Moon",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Szechuan Garden",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Malaysian Grill",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Mama's Too",
        status: "open",
        outdoor: "yes",
        tables: 6
      },
      {
        name: "Calle Ocho",
        status: "closed",
        outdoor: "",
        tables: ""
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
        name: "108 Food",
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
        name: "Mel's",
        status: "open",
        outdoor: "yes",
        tables: 8
      },
      {
        name: "Panda Garden",
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
        name: "Oren's",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Dig Inn",
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
        name: "Junzi",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Giovannie's",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Miss Mamie's Spoonbread",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Hunan Chen",
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
        name: "Frieda's",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Zanny's",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Demitasse",
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
        name: "Calaveras",
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
        name: "Saiguette",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Bob's Your Uncle",
        status: "open",
        outdoor: "",
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
        name: "Elsa",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Benny's",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Roasted Masala",
        status: "closed",
        outdoor: "",
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
        name: "JuicC",
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
        name: "Crêpes on Columbus",
        status: "open",
        outdoor: "yes",
        tables: 3
      },
      {
        name: "Ortomare",
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
        name: "Red Hot",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Lions Head",
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
        name: "Nobody Told Me",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Awash",
        status: "open",
        outdoor: "yes",
        tables: 5
      },
      {
        name: "Mama's Pizza",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Anar",
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
        name: "Arts and Crafts",
        status: "closed",
        outdoor: "",
        tables: ""
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
        name: "Raenu Thai",
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
        name: "Cafe Roma",
        status: "closed",
        outdoor: "",
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
        name: "Casa Mexicana",
        status: "check (setting up)",
        outdoor: "",
        tables: ""
      },
      {
        name: "Dunkin Donuts",
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
        name: "Banh",
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
        name: "Panchos",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Suma",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "La Piccola Cuccina",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Taqueria y Fonda",
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
        name: "Gourmet Deli",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Rôti Roll",
        status: "open",
        outdoor: "yes",
        tables: 5
      },
      {
        name: "The Hamilton",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: "Elis",
        status: "open",
        outdoor: "yes",
        tables: 5
      },
      {
        name: "Marlow",
        status: "closed",
        outdoor: "",
        tables: ""
      },
      {
        name: 1020,
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
        name: "New York Basics",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Strokos",
        status: "open",
        outdoor: "no",
        tables: ""
      },
      {
        name: "Symposium",
        status: "open",
        outdoor: "no",
        tables: ""
      },
    ],
  []
  );

  return (
    <Styles>
      <Table columns={columns} 
      data={data} />
    </Styles>
  );
}

export default App;
