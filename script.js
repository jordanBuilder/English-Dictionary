const inputElement = document.getElementById('input');
const infotextElement = document.getElementById('info-text');
const meaningContainerElement = document.getElementById('meaning-container');
const titleElement = document.getElementById('title');
const meaningElement = document.getElementById('meaning');
const audioElement = document.getElementById('audio');

async function fetchAPI(word)
{
    try {
        infotextElement.style.display = "block";
        meaningContainerElement.style.display = "none";
        infotextElement.innerHTML = `searching the meaning of "${word}"`;

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

        const result = await fetch(url).then((res)=> res.json());

        if(result.title){
            titleElement.innerHTML = word;
            meaningElement.innerHTML = "N/A";   
            audioElement.style.display = "none";  
        }
        else{
            infotextElement.style.display = "none";

            meaningContainerElement.style.display = "block";

            audioElement.style.display = "inline-flex";

            titleElement.innerHTML = result[0].word;

            meaningElement.innerHTML = result[0].meanings[0].definitions[0].definition;

            audioElement.src = result[0].phonetics[0].audio;
        }
        infotextElement.style.display = "none";

        meaningContainerElement.style.display = "block";

        titleElement.innerHTML = result[0].word;
        
        meaningElement.innerHTML = result[0].meanings[0].definitions[0].definition;   
        audioElement.src = result[0].phonetics[0].audio;

    } catch (error) {
        console.log(error);
        infotextElement.innerHTML = `an error happened, please try again later`;

    }
       
}
inputElement.addEventListener("keyup", (event)=>{
    if(event.target.value && event.key === "Enter"){
        fetchAPI(event.target.value); 
    }
}, false);