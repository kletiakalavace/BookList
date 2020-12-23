let listBook = [];
let page = 1;
const bookList = document.getElementById('bookList');
const searchEntry = document.getElementById("searchEntry");
const searchBook = document.getElementById("searchBook");
const nextPage = document.getElementById("button_next");
const previousPage = document.getElementById("button_prev");

const searchItems =  () => {
  const searchString = document.getElementById('searchEntry').value.toLowerCase();
  const filteredBook = listBook.filter(i => {
   return (
      i.authorName.toLowerCase().includes(searchString) ||
      i.title.toLowerCase().includes(searchString)
    );
    
  });
 
 appendToDOM(filteredBook);
};

searchBook.addEventListener("click", e  => {
    searchItems()
});

nextPage.addEventListener("click", e  => {
  page++;
  filterList(page);
});

previousPage.addEventListener("click", e  => {
  //even if page get negative values it will show result, this is the reason why is not restricted
  page--;
  filterList(page);
});

searchEntry.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
  searchItems()
    e.preventDefault();
  }
});

const filterList =  (page) => {
axios.get('https://goodreads-server-express--dotdash.repl.co/search/'+page, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
 })
        .then(response => {
            listBook = response.data.list;
            // append to DOM
            appendToDOM(listBook);
        })
        .catch(error => console.error(error));
};

// Components

const appendToDOM = (list) => {
  const htmlString = list
        .map((list) => {
            return `
            <li class="book-box">
   <img src="${list.imageUrl}"></img>
   <div class="info-book"><h2>${list.authorName}</h2>
                <p>${list.title}</p>
                </div>
            </li>
        `;
        })
        .join('');
  bookList.innerHTML = htmlString;
};

filterList(page);
 