
const searchResult = document.getElementById('search-result');
const inputField = document.getElementById('input-field');
const resultQuantity = document.getElementById('search-no');
const spinnerSection = document.getElementById('spinner');

const searchBook = () => {
    
    const searchText = inputField.value;
    document.getElementById('search-result').innerHTML = "";
    resultQuantity.innerHTML = '';
    spinnerSection.classList.remove('d-none');
    //error condition
    if(inputField.value === ''){
        searchResult.innerHTML =`
    <p class='container text-white text-center p-3 bg-danger mx-auto'><b>Please enter a book name...</b></p>`
    spinnerSection.classList.add('d-none');
    }else{
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data))
    }
    
    
    
}

const displaySearchResult = totalResult => {
    const resultFound = totalResult.docs;
    //error condition
    if(totalResult.numFound === 0){
        searchResult.innerHTML =`
            <p class='container text-white text-center p-3 bg-danger mx-auto'><b>Dear Sir/Ma'am,Your search did not match any of our book.Please enter a valid book name.</b></p>`;
        resultQuantity.innerHTML = '';
        spinnerSection.classList.add('d-none')
    }else{
        
        resultQuantity.innerHTML = `
        <div class="card mx-auto bg-info mb-2" style="width: 18rem">
           <h4>${resultFound.length} Results found</h4>
           </div>
        `;
        
    }
    
    resultFound.forEach(book => {
        const authorName = book.author_name;
        const publisherName = book.publisher;
        const bookName = book.title;
        const firstPublishDate = book.first_publish_year;
        const imageId = book.cover_i;
        const imgUrl = `https://covers.openlibrary.org/b/id/${imageId}-M.jpg`;

        const singleBook = document.createElement('div');
        singleBook.classList.add('col');
        //set single card innerhtml
        singleBook.innerHTML = `
        <div class="container mx-auto card h-100">
            
            <img src= "${imgUrl}" style="height: 350px; width: 100%" height='300px' class="card-img-top img-fluid img" alt="...">
            <div class=" card-body m-3 ">
                <h4 class="card-title text-info">Book name : ${bookName}</h4>
                <h6 class="card-title">Author name : ${authorName}</h6>
                <h6 class="card-title">Publisher name : ${publisherName}</h6>
                <h6 class="card-title">First publish date : ${firstPublishDate}</h6>
            </div>
        </div>
        `
        searchResult.appendChild(singleBook);
        spinnerSection.classList.add('d-none');
        });
}
