let cl = console.log;

const showmodelbtn = document.getElementById("showmodelbtn");
const overlay = document.getElementById("overlay");
const mymodal = document.getElementById("mymodal");
const addmovie = document.getElementById("addmovie");
const title = document.getElementById("title");
const image = document.getElementById("image");
const rating = document.getElementById("rating");
const moviecontainer = document.getElementById("moviecontainer");
const myclose = [...document.querySelectorAll(".myclose")];

let moviearray = JSON.parse(localStorage.getItem("moviearray")) || [];


const temaplating = (arr) => {
    let result = '';
    arr.forEach(obj => {
        result += `
         
        <div class="col-sm-4">
        <div class="card">
            <div class="card-header">
                <h3>
                    ${obj.title}
                </h3>
            </div>
            <div class="card-body">
                <img src="${obj.image}">
            </div>
            <div class="card-footer text-right">
                <p class="m-0 font-weight-bold">
                    ${obj.rating}/5
                </p>
            </div>
        </div>
    </div>
                 `
    })
    moviecontainer.innerHTML = result
}


const onmodalHandler = (eve) => {
    overlay.classList.toggle(`show`)
    mymodal.classList.toggle(`show`)
}

const onaddmoviehandler = (eve) => {
    eve.preventDefault();
    // cl("add movies")
    let obj = {
        title : title.value,
        image : image.value,
        rating : rating.value
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
    if(val >= 1 && val <= 5){
        eve.target.nextElementSibling.classList.add("d-none")
        return
    }else{
        eve.target.nextElementSibling.classList.remove("d-none")
        eve.target.value = ""
    }
}

myclose.forEach(ele => {
    ele.addEventListener("click" , onmodalHandler)
})
showmodelbtn.addEventListener("click", onmodalHandler)
// addmovie.addEventListener("click" , onaddmoviehandler)
addmovie.addEventListener("submit", onaddmoviehandler)

rating.addEventListener("blur" , ratingValueHandler)