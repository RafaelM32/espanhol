const div_base = document.querySelector(".textos_apoio")
const letra_a = document.querySelector(".a")
const letra_b = document.querySelector(".b")
const letra_c = document.querySelector(".c")
const letra_d = document.querySelector(".d")
const letra_e = document.querySelector(".e")
const botao_gabarito = document.querySelector(".gabarito")
const titulo = document.querySelector("#title")
const botao_proxima = document.querySelector(".proxima")
const botao_anterior = document.querySelector(".anterior")


const letras =  [letra_a,letra_b,letra_c,letra_d,letra_e]

let gabarito_atual = "d"

let numeroQuestao = 0

letras.forEach(letra => {
    letra.addEventListener("click", function(){
        escolher(letra)
    })
})



class Imagem_apoio{
    constructor(nome, fonte){
        this.nome = nome
        this.fonte = fonte
    }
}


class Texto_apoio{
    constructor(titulo, texto, fonte){
        this.titulo = titulo
        this.texto = texto
        this.fonte = fonte
    }
}

class Questao{
    constructor(enunciado, alternativas, textos_apoio, imagens_apoio, gabarito){
        this.enunciado = enunciado
        this.alternativas = alternativas
        this.textos_apoio = textos_apoio
        this.imagens_apoio = imagens_apoio
        this.gabarito = gabarito
    }
}

function escolher(letra){
    zerarEscolhas(letras)
    letra.classList.add("escolha")

}

function removerEscolha(letra){
    letra.classList.remove("escolha")
}


function removerGabarito(letra){
    letra.classList.remove("correta")
}

function eGabarito(letra){
    let lista_de_classes =  letra.classList
    for(let i = 0 ; i< lista_de_classes.length; i++){
        if(lista_de_classes[i]== "correta"){
            return true
        }
    }
    return false
}

function escolhida(letra){
    let lista_de_classes =  letra.classList
    for(let i = 0 ; i< lista_de_classes.length; i++){
        if(lista_de_classes[i]== "escolha"){
            return true
        }
    }
    return false
}

function zerarGabarito(letras){
    letras.forEach(letra =>{
            if(eGabarito(letra)){
                removerGabarito(letra)
            }
        })
}

function zerarEscolhas(letras){
    letras.forEach(letra =>{
            if(escolhida(letra)){
                removerEscolha(letra)
            }
        })
}


function adicionarFonte(fonte){
    let paragrafo = document.createElement("p")
    paragrafo.innerText = fonte
    paragrafo.classList.add("fonte")
    div_base.appendChild(paragrafo)
}

function adicionarImagem(imagem){
    let img = document.createElement("img")
    img.src = "src/imagens/"+imagem.nome + ".png"
    div_base.appendChild(img)
    adicionarFonte(imagem.fonte)
}

function adicionarEnunciado(enunciado){
    let paragrafo = document.createElement("p")
    paragrafo.innerText = enunciado
    div_base.appendChild(paragrafo)
}

function adicionarTextoApoio(texto_apoio){
    const h2 = document.createElement("h2")
    h2.innerText = texto_apoio.titulo
    h2.classList.add("titulo_texto_apoio")

    const p = document.createElement("p")
    p.innerText = texto_apoio.texto
    p.classList.add("texto_apoio")

    const fonte = document.createElement("p")
    fonte.innerText = texto_apoio.fonte
    fonte.classList.add("fonte")

    div_base.appendChild(h2)
    div_base.appendChild(p)
    div_base.appendChild(fonte)

}

function carregarAlternativas(alternativas){
    letra_a.innerText = alternativas[0]
    letra_b.innerText = alternativas[1]
    letra_c.innerText = alternativas[2]
    letra_d.innerText = alternativas[3]
    letra_e.innerText = alternativas[4]
}

function revelarGabarito(questao){
    gabarito_atual = questao.gabarito
    letras.forEach(letra =>{
        let classes = letra.classList
        for(let i = 0; i<classes.length;i++){
            if(classes[i] == gabarito_atual){
                letra.classList.add("correta")
                console.log(gabarito_atual)
            }
        }
    })
}

function addNumberTittle(numero){
    console.log(numero)
    titulo.innerText = "Gerador de ENEM ESPANHOL " + numero
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


let questaoAtual = null; // Adicione esta variável global

function gerarQuestao(questao){
    zerarGabarito(letras)
    questaoAtual = questao; // Atualize a questão atual
    if(questao.textos_apoio != false){
        questao.textos_apoio.forEach(element =>{
            adicionarTextoApoio(element)
        })
    }

    if(questao.imagens_apoio != false){
        questao.imagens_apoio.forEach(element => {
            adicionarImagem(element)
        });
    }
    adicionarEnunciado(questao.enunciado)
    carregarAlternativas(questao.alternativas)
}

botao_gabarito.addEventListener("click", function(){
    if (questaoAtual) {
        revelarGabarito(questaoAtual);
    }
});


function sortearQuestao(lista){
    numeroQuestao = getRandomIntInclusive(0,lista.length - 1)
    gerarQuestao(lista_de_questoes[numeroQuestao])
    addNumberTittle(numeroQuestao)
}

function zerarQuestao(){
    div_base.innerHTML = ""
}


function proximaQuestao(lista){
    if(numeroQuestao <= lista.length -2){
        numeroQuestao +=1
        zerarQuestao()
        gerarQuestao(lista[numeroQuestao])
        gabarito_atual = lista[numeroQuestao].gabarito
        addNumberTittle(numeroQuestao)
    }
}

function questaoAnterior(lista){
    if(numeroQuestao >= 1){
        numeroQuestao -=1
        zerarQuestao()
        gerarQuestao(lista[numeroQuestao])
        gabarito_atual = lista[numeroQuestao].gabarito
        addNumberTittle(numeroQuestao)
    }
}


///IMAGENS DE APOIO
imagem_apoio_0 = new Imagem_apoio()
imagem_apoio_1 = new Imagem_apoio()

///TEXTOS DE APOIO
texto_apoio_0 = new Texto_apoio("El vírus de la cancelación", " ¿De qué se trata este fenómeno? Se entiende por \
cultura de la cancelación a una práctica popular que consiste \
en “quitarle apoyo” especialmente a figuras públicas y \
compañías multinacionales después de que hayan hecho \
o dicho algo considerado objetable u ofensivo. Cuando \
alguien o algo está cancelado se descarta, se deja de ver, \
se deja de escuchar, se desclasifica, se aísla, se abandona, \
se niega, se deja de consumir hasta que eventualmente \
puede o no desaparecer. Es una estrategia muy extendida \
en la historia de las luchas anticoloniales, antiespecistas, \
sexodisidentes, feministas y, especialmente en nuestro \
país, también llevadas adelante por el movimiento de \
derechos humanos. Entonces, ¿dónde radica el problema? \
Se puede observar positivamente que hay un proceso cada \
vez más agudo de socialización de herramientas críticas \
para desmantelar formas de desigualdad incrustadas en \
los lazos sociales. Pero la popularización irrestricta y el uso \
amplificado de esta herramienta por fuera de sus contextos \
colectivos de emergencia han despertado efectos adversos \
en una sociedad atravesada por las pantallas como formas \
de encierro-consumo, la representación online como única \
esfera pública y un imperativo felicista cuya moral nos obliga \
a trabajar ansiosamente por una vida sin desacuerdos, sin \
errores y sin dolor, a como dé lugar."," Disponível em: www.revistaanfibia.com.  \
Acesso em: 7 out. 2021 (adaptado).")

texto_apoio_1 = new Texto_apoio("","“Y si llueve, que llueva” es un refrán gallego. Para mí cobró \
sentido una noche de febrero, cuando vivía en el barrio de la \
Macarena de Sevilla con dos buenos amigos, gallegos también. \
 Mi compañero y yo nos decidimos a salir ese sábado \
de noche, pese a que había estado lloviendo algunas \
horas a lo largo del día. La idea era una locura, al parecer. \
Le propusimos salir “de parranda” con nosotros a una \
amiga andaluza, ésta respondió que no, nos dijo que no \
iba a salir un día de lluvia. Flipamos. Comentamos entre \
nosotros que si los gallegos no saliésemos de casa cuando \
llueve, en invierno saldríamos poco. Habríamos inventado \
el confinamiento hace mucho. \
 Los gallegos no dejamos de salir por la lluvia.","Disponível em: https://politicahora.es. Acesso em: 26 out. 2021.")

texto_apoio_2 = new Texto_apoio("","Celerina Patricia Sánchez Santiago comentó que su \
acercamiento a la poesía fue por la escuela, con libros de texto \
en español. Descubrió el gusto por las letras pero notó que no \
había textos en la suya, así que, contra muchos comentarios \
negativos que recibió en ese momento, decidió emprender el \
camino de la escritura pero en mixteco. “Fue un proceso de \
años para notar que en mi lengua podía escribir poesía, \
porque me decían que mi lengua era tan pobre que no podía \
tener conceptos abstractos, era un reto pero yo sabía que \
sí era posible”. \
 Este proceso no sólo le ayudó a vivir la poesía en \
mixteco, sino a “ir descubriendo mi propia historia y la de mi \
pueblo”. Comentó que las lenguas habladas en el territorio \
nacional se encuentran en gran desventaja con el español. \
“El reconocimiento a la diversidad no se ha hecho y ha \
sido tratada de borrar. Este es un país con 68 lenguas \
y somos monolingües del español. Antes había nulo de \
reconocimiento de ser bilingüe, negabas que hablabas tu \
lengua, hasta le decían dialecto. Era parte del proceso fatal \
que nos llevó a no reconocernos en un país multilingüe. \
¿Si tenemos varias lenguas por qué no aprender?”.","Disponível em: www.fapcom.edu.br. Acesso em: 20 nov. 2021.")

texto_apoio_3 = new Texto_apoio("Morir muy vivos", "No todo es perder, es cierto. Si te esfuerzas mucho \
y bien, porque no viene de fábrica, ganas conocimiento \
del mundo y de ti mismo, empatía, sosiego y, en suma, \
algo que podríamos denominar sabiduría. Pero creo que \
para ello hay que mantenerse alerta y no darse nunca por \
vencido. Pero también es un tiempo para saldar cuentas. \
No creo que haya que dejarse llevar por el peso de los días \
como un leño podrido al que las olas arrojan finalmente \
a la playa. Uno siempre puede intentar sacarse alguna \
de las piedras que lleva a la espalda, decir las cosas que \
nunca se atrevió a decir, cumplir en la medida de lo posible \
los deseos arrumbados, rescatar algún sueño que quedó \
en la cuneta. No rendirse, esa es la clave. Y sobre todo \
decirse: ¿y por qué no? Porque la vejez no está reñida con \
la audacia. Debemos aspirar a morir muy vivos.","MONTERO, R. Disponível em: https://elpais.com. \
Acesso em: 4 dez. 2017.")

texto_apoio_4 = new Texto_apoio("Los últimos días del sitio de Tenochtitlán","Y todo esto pasó con nosotros. \
 Nosotros lo vimos, \
 nosotros lo admiramos. \
 Con esta lamentosa y triste suerte \
 nos vimos angustiados. \
 En los caminos yacen dardos rotos, \
 los cabellos están esparcidos. \
 Destechadas están las casas, \
 enrojecidos tienen sus muros. \
 Gusanos pululan por calles y plazas, \
 y en las paredes están salpicados los sesos. \
 Rojas están las aguas, están como teñidas, \
 y cuando la bebimos, \
 es como si bebiéramos agua de salitre.","Manuscrito anónimo de Tlatelolco, 1528. Disponível em:  \
www.biblioweb.tic.unam.mx. Acesso em: 13 out. 2021 (fragmento).")

///QUESTOES
const questao_0 = new Questao("Na argumentação apresentada sobre cultura do \
cancelamento, esse texto objetiva",["A apresentar o conceito desse tipo de prática.",
    "B mostrar a contrariedade das mídias com relação a \
essa atitude.", "C criticar o impacto dessa cultura sobre a vida \
representada nas redes.", "D evidenciar a democratização dessa prática na \
sociedade virtual.", "E discorrer historicamente sobre a origem e as causas \
dessa cultura."
],[texto_apoio_0],false, "c")

const questao_1 = new Questao(" O comportamento dos personagens narrado no texto \
destaca o(a)",["A abandono da própria identidade.",
    "B medo dos perigos durante a noite.",
    "C influência do grupo na tomada de decisão.",
    "D diferença cultural entre galegos e andaluzes.",
    "E variação meteorológica entre Sevilha e Galiza."
],[texto_apoio_1],false,"d")

const questao_2 = new Questao(" Em sua escrita poética, a poetisa mexicana Celerina \
Patricia Sánchez Santiago assume o desafio de", ["A destacar a importância da literatura na formação escolar.",
    "B discutir a hegemonia da literatura escrita em espanhol.",
    "C promover reflexões acerca de conceitos abstratos.",
    "D representar a pluralidade linguística de seu país.",
    "E narrar uma trajetória de autoconhecimento."
],[texto_apoio_2],false,"d")

const questao_3 = new Questao("Nesse texto, ao utilizar a expressão “morir muy vivos”, \
a escritora Rosa Montero evidencia a importância de se",["A acumular sabedoria com o passar do tempo.",
    "B observar o impacto dos anos sobre o corpo.",
    "C rever os erros e os acertos de sua trajetória.",
    "D desfrutar de todas as fases da vida.",
    "E libertar das amarras sociais."
],[texto_apoio_3],false,"d")

const questao_4 = new Questao(" Nesse poema, o eu lírico representa a voz de um \
sobrevivente asteca que testemunha a",["A destruição da capital do Império Asteca pelos \
colonizadores espanhóis.",
"B degradação do meio ambiente no entorno da capital \
do Império Asteca.",
"C tristeza dos refugiados astecas ao deixarem a capital \
do Império rumo ao exílio.",
"D aflição dos astecas ao receberem os colonizadores \
espanhóis na capital do Império.",
"E resistência dos astecas às mudanças feitas pelos \
colonizadores espanhóis na capital do Império."
],[texto_apoio_4],false,"a")



///LISTA PRINCIPAL

const lista_de_questoes = [questao_0, questao_1,questao_2,questao_3,questao_4]

botao_proxima.addEventListener("click", function(){
    proximaQuestao(lista_de_questoes)
})

botao_anterior.addEventListener("click", function(){
    questaoAnterior(lista_de_questoes)
})




sortearQuestao(lista_de_questoes)
