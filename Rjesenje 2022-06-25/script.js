let napravi_stavke=(opcije) =>{

    let s="";
    opcije.forEach(x => {
        s+=`<option>${x}</option>`
    });

    return s;
};


let odaberi=(dest, dugme)=>{
    let opcija = dugme.parentElement.querySelector(".offer-option").value
    document.getElementById("destinacija").value = dest + ", " + opcija;
}

let preuzmi=()=> {
    let url = `https://restapiexample.wrd.app.fit.ba/Ispit20220716/Get6Ponuda`;
    let divdest=document.getElementById("destinacije");
    divdest.innerHTML="";


    fetch(url)
        .then((r) => {
            if (r.status != 200) {

                return;
            }

            r.json().then((obj) => {
                for(const i of obj.podaci){
                    divdest.innerHTML +=`
                   <div class="offer">
           <div  class="offer-image" style="background-image: url('${i.imageUrl}');" ></div>
               <div class="offer-details">
                   <div class="offer-destination">${i.mjesto}</div>
                   <div class="offer-price">$${i.cijenaDolar}</div>
                   <div class="offer-description">${i.opis}</div>
                    <select class="offer-option">${napravi_stavke(i.opcije)}</select>
                    </div>
                    <div class="ponuda-dugme" onclick="odaberi('${i.mjesto}', this)">Odaberi ponudu</div>
                </div>
                    `;
                }

            });

        })
        .catch((error) => {

        });
}



let posalji=()=>{
    let url = `https://restapiexample.wrd.app.fit.ba/Ispit20220625/Add`;
    let obj=new Object();
    obj.destinacijaSoba=document.getElementById("destinacija").value;
    obj.imeGosta = document.getElementById("first-name").value;
    obj.prezimeGosta = document.getElementById("last-name").value;
    obj.poruka = document.getElementById("messagetxt").value;
    obj.email = document.getElementById("email").value;
    obj.telefon =  document.getElementById("phone").value;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
})
    .then((r) => {
        if (r.status != 200) {
            alert("Server javlja gresku: " + r.status);
            return;
        }

        r.json().then(x => {
            alert("Vasa rezervacija je poslana. Broj rezervacije: " + x.brojRezervacije);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}


let ErrorBackgroundColor="#FE7D7D";
let OkBackgroundColor="#DFF6D8";

let test_first=()=>{
    let txt=document.getElementById("first-name");
    if(/^[A-Z][a-z]+$/.test(txt.value)){
        txt.style.backgroundColor = OkBackgroundColor;
        return " ";
    }
    else{
        txt.style.backgroundColor=ErrorBackgroundColor;
    }
}

let test_last=()=>{
    let txt=document.getElementById("last-name");
    if(/^[A-Z][a-z]+$/.test(txt.value)){
        txt.style.backgroundColor=OkBackgroundColor;
        return "";
    }
    else{
        txt.style.backgroundColor=ErrorBackgroundColor;
        return "ime nije u isparasg1";
    }
}
let test_phone = ()=>{
    let txt=document.getElementById("phone");
    if (/^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{3}$/.test(txt.value)){
        txt.style.backgroundColor = OkBackgroundColor;
        return "";
    }
    else{
        txt.style.backgroundColor = ErrorBackgroundColor;
        return "Telefon nije u ispravnom formatu!\n";
       
    }
}




let test_email=()=>{
    let txt=document.getElementById("email");
    if(/^[A-Za-z]+\.?[A-Za-z]+@(edu.fit.ba|hotmail.com|gmail.com)$/.test(txt.value))
    {
        txt.style.backgroundColor=OkBackgroundColor;

    }
    else{
        txt.style.backgroundColor=ErrorBackgroundColor;
    }
}
