let myLibrary = JSON.parse(localStorage.getItem("library") || "[]");

class Book{
  constructor(name,author,genre,isRead){
    this.name = name;
    this.author = author;
    this.genre = genre;
    this.date = new Date();
    this.dateAdded = this.date.toDateString();
    this.isRead = isRead;
  }
}

const AddBooks = (userName,userAuthor,userGenre, userRead) => {
  let b1 = new Book(userName,userAuthor,userGenre,userRead);
  myLibrary.push(b1);
  localStorage.setItem('library', JSON.stringify(myLibrary));
  return myLibrary;
}

const render = () => {
  let HTML = `<div class="library">`;
  if (myLibrary.length === 0){
    HTML += `<h2>Oh no! It looks like you have no books in your library! Why not add one now?</h2>
              <img src="./bookcase.png">`;
    console.log('Hi');
  }
  else{
    for (i = 0 ; i<myLibrary.length; i++){
      let currentBook = myLibrary[i];
      HTML += `
        <div class='card'>
          <h2>${currentBook.name}</h2>
          <h3>Author: ${currentBook.author}</h3>
          <h3>Genre: ${currentBook.genre}</h3>
          <h3>Added on: ${currentBook.dateAdded}</h3>
          <h3>Have I Read It? ${printYesNo(currentBook.isRead)}</h3>
          <button class="remove" data-index = "${i}">Remove Book</button>
          <button class="toggle" data-index = "${i}">Toggle Read</button>
        </div>`
      }
    }

  HTML += `</div>`;
  document.getElementById('library').innerHTML = HTML;
}

const printYesNo = (boolean) => {
  if(boolean){
    return "Yes";
  }
  else{
    return "No";
  }
}

$(document).on("click","#showForm",function(){
  $('#form').toggle();
  if ($('#form').attr('style') != "display: none;"){
    $(this).text('Close');
  }
  else{
    $(this).text('Add New Book to Library')
  }
});

$(document).on("click",".remove",function(){

  let index = $(this).attr('data-index');
  console.log(index);
  myLibrary.splice(index,1);
  localStorage.setItem('library', JSON.stringify(myLibrary));
  render();
});

$(document).on("click","#add",function(e){
  e.preventDefault();
  let titleInput = $("#title").val();
  let authorInput = $("#author").val();
  let genreInput = $("#genre").val();
  if (titleInput === '' ||authorInput === '' || genreInput === ''){
    $('#error').show();
  }
  else{
    $('#error').hide();
    let readInput = undefined;
    if($('#read').is(':checked')){
      readInput = true;
    }
    else {
      readInput = false;
    }
    console.log(readInput);

    AddBooks(titleInput,authorInput,genreInput,readInput);
    render();

    $("#title").val('');
    $("#author").val('');
    $("#genre").val('');
    $('#read').prop('checked',false);
  }
});

$(document).on("click",".toggle",function(){
  let index = $(this).attr('data-index');
  let selected = myLibrary[index];
  selected.isRead = !selected.isRead;
  console.log(selected.isRead);
  render();
});




$('#form').hide();
$('#error').hide();
render();
