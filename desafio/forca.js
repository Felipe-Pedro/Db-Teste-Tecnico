class Forca {

  constructor(palavraSecreta) {
    this.letrasChutadas = [];
    this.vidas = 6;
    this.palavra = [];
    this.palavraSecreta = palavraSecreta;

    this.iniciaPalavra();
  }

  iniciaPalavra() {
    //Preenche o Array palavra com "_" de acordo com o número de caracteres da palavra passada 
    //para o objeto Forca
    this.palavra = Array(this.palavraSecreta.length).fill("_");
  }

  pegaTodosIndex(letra) {
    let todosIndex = [];
    let index = this.palavraSecreta.indexOf(letra);

    while(index != -1) {
      todosIndex.push(index);
      index = this.palavraSecreta.indexOf(letra, index + 1);
    }

    return todosIndex;
  }

  registraChute(letra) {
    if(!this.letrasChutadas.includes(letra)) {
      this.letrasChutadas.push(letra);
    }
  }

  chutar(letra) {
    
    if(letra.length > 1 || this.letrasChutadas.includes(letra)) {
      return;
    }

    if(!this.palavraSecreta.includes(letra)) {
      this.registraChute(letra);
      this.vidas--;
      return;
    }
    
    this.pegaTodosIndex(letra).forEach(index => {
      this.palavra[index] = letra;
    });
    
    this.registraChute(letra);
  }

  buscarEstado() { 
    if(!this.palavra.includes("_") && this.vidas > 0) {
      return "ganhou";
    }

    if(this.vidas <= 0) {
      return "perdeu";
    }

    return "aguardando chute";
   }

  buscarDadosDoJogo() {
      return {
          letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
          vidas: this.vidas, // Quantidade de vidas restantes
          palavra: this.palavra // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
      }
  }
}

module.exports = Forca;