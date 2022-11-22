var infos={};
document.getElementById("btnbtn").addEventListener("click",function (){
    infos["name"]=document.getElementById("name").value;
    getpokedetails(infos["name"]);
})

async function getpokedetails(name){
    url=`https://pokeapi.co/api/v2/pokemon/${name}`;
    await fetch(url).then(Response => Response.json())
    .then(data =>{
        infos["type"]=data.types[0].type.name;
        infos["id"]=data.id;
        infos["weight"]=""+data.weight+" hectograms";
        infos["height"]=""+data.height+" decimetres";
        infos["ability"]=data.abilities[0].ability.name;
        url=data.sprites.front_default;
        var img= document.createElement("img");
        img.src=url;
        img.classList.add("pokeimg");
        document.getElementById("pokedex").appendChild(img);
    });
    txt2voice(name+" its an "+infos["type"]+" type pokemon which normally weights up to "+infos["weight"]+"and has an ability known as "+infos["ability"]);

}  
function txt2voice(name){
    var msg = new SpeechSynthesisUtterance();
    msg.text = name;
    window.speechSynthesis.speak(msg);
}  




async function weakness(){
    let url_type=`https://pokeapi.co/api/v2/type/${infos["type"]}/`;
    fetch(url_type).then(Response => Response.json()).then(data =>
        {   txt2voice("Weak to types such as"); 
            let types=data.damage_relations.double_damage_from;
            types.forEach(i => {
            txt2voice(i.name);
            })
        });
}

async function type(){
    txt2voice("It's an "+infos["type"]+"type pokemon");
}


document.getElementById("WEAKNESS").addEventListener("click",weakness);
document.getElementById("TYPE").addEventListener("click",type);


var myForm = document.getElementById("myForm");
var inpImg  = document.getElementById("upload");
// zdrxtfcygvuhbjnklm
myForm.addEventListener("submit", e =>{
    alert("123");
    e.preventDefault();
    const endpoint = "/upload";
    var formData = new FormData();
    formData.append('user-img', inpImg.files[0]);
    fetch(endpoint, {
      method: "post",
      body: formData
    }).then(
      response => response.json()
    ).then(
        (data) => {
            document.getElementById("name").value=data.result;
            infos["name"]=document.getElementById("name").value;
            let s=`pokemon identified as ${data.result}`;
            txt2voice(s);
            getpokedetails(data.result);
        }
    );
   
  });
