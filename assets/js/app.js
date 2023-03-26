let cl = console.log;

const showmodelbtn = document.getElementById("showmodelbtn");
const overlay = document.getElementById("overlay");
const mymodal = document.getElementById("mymodal");
const addmovie = document.getElementById("addmovie");
const title = document.getElementById("title");
const image = document.getElementById("image");
const rating = document.getElementById("rating");
const moviecontainer = document.getElementById("moviecontainer");
const submitbtn = document.getElementById("submitbtn")
const updatebtn = document.getElementById("updatebtn")
const myclose = [...document.querySelectorAll(".myclose")];

let moviearray = JSON.parse(localStorage.getItem("moviearray")) || [];



function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }



const temaplating = (arr) => {
    let result = '';
    arr.forEach(obj => {
        result += `
         
        <div class="col-sm-4">
        <div class="card mb-3">
            <div class="card-header">
                <h3>
                    ${obj.title}
                </h3>
            </div>
            <div class="card-body">
                <img src="${obj.image}">
            </div>
            <div class="card-footer">
                <a href="#onEdit"><i class="fa-sharp fa-solid fa-pen-to-square mr-3" data-id="${obj.id}" onclick="onEdit(this)"></i></a>
                <a href="#onDelete"><i class="fa-solid fa-trash text-danger" data-id="${obj.id}" onclick="onDelete(this)"></i></a>
                <span class="float-right">${obj.rating}/5</span>
            </div>
        </div>
    </div>
                 `
    })
    moviecontainer.innerHTML = result
}



const onEdit = (ele) => {
    // cl(`Editted`,ele)
    let editid = ele.getAttribute("data-id")
    localStorage.setItem("updateId" , editid)
    cl(editid)
    let editobj = moviearray.find(obj => obj.id === editid)
    cl(editobj)

    title.value = editobj.title
    image.value = editobj.image
    rating.value = editobj.rating

    submitbtn.classList.add("d-none")
    updatebtn.classList.remove("d-none")
    onmodalHandler()
}


const onDelete = (ele) => {
    // cl("deleted")
    let deleteId = ele.getAttribute("data-id")
    cl(deleteId)
    moviearray = moviearray.filter(movie => movie.id !== deleteId)
    localStorage.setItem("moviearray", JSON.stringify(moviearray))
    // temaplating(moviearray)
    let close = ele.closest(".card")
    close.remove()
}




const updateMovie = (eve) => {
    let updateId = localStorage.getItem("updateId")
    cl("updated...",updateId)
    moviearray.forEach(movie => {
        if(movie.id === updateId){
            movie.title = title.value,
            movie.image = image.value,
            movie.rating = rating.value
        }
    })
    localStorage.setItem("moviearray",JSON.stringify(moviearray))
    temaplating(moviearray)
    addmovie.reset()
    updatebtn.classList.add("d-none")
    submitbtn.classList.remove("d-none")
    mymodal.classList.add("d-none")
    overlay.classList.add("d-none")
}



const onmodalHandler = (eve) => {
    overlay.classList.toggle(`show`)
    mymodal.classList.toggle(`show`)
}

const onaddmoviehandler = (eve) => {
    eve.preventDefault();
    // cl("add movies")
    let obj = {
        title: title.value,
        image: image.value,
        rating: rating.value,
        id:uuid()
    }
    moviearray.unshift(obj)
    localStorage.setItem("moviearray", JSON.stringify(moviearray));
    cl(moviearray);

    temaplating(moviearray);
    title.value = "";
    image.value = "";
    rating.value = "";
    onmodalHandler()

}
temaplating(moviearray);





const ratingValueHandler = (eve) => {
    let val = eve.target.value;
    if (val >= 1 && val <= 5) {
        eve.target.nextElementSibling.classList.add("d-none")
        return
    } else {
        eve.target.nextElementSibling.classList.remove("d-none")
        eve.target.value = ""
    }
}

myclose.forEach(ele => {
    ele.addEventListener("click", onmodalHandler)
})
showmodelbtn.addEventListener("click", onmodalHandler)
// addmovie.addEventListener("click" , onaddmoviehandler)
addmovie.addEventListener("submit", onaddmoviehandler)

rating.addEventListener("blur", ratingValueHandler)
updatebtn.addEventListener("click", updateMovie)