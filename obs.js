class Recinto {
    constructor(numero, bioma, capacidade) {
      this.numero = numero;
      this.bioma = bioma;
      this.capacidade = capacidade;
      this.animais = [];
    }
  
    adicionaAnimal(animal, quantidade) {
      if (this.animais.length > 0 && this.animais[0].tipo !== animal.tipo) {
        
        if (animal.tipo === 'hipopótamo' && this.bioma !== 'savana e rio') {
          return false;
        }
        if (this.animais[0].tipo === 'macaco' && this.animais.length < 2) {
          return false;
        }
        if (this.animais[0].tipo === 'carnívoro' || animal.tipo === 'carnívoro') {
          return false;
        }
      }
      if (this.animais.length > 0 && this.animais[0].tipo === animal.tipo) {
        
        if (this.animais[0].quantidade + quantidade > this.capacidade) {
          return false;
        }
      } else {
        if (quantidade > this.capacidade) {
          return false;
        }
      }
      this.animais.push({ tipo: animal.tipo, quantidade: quantidade });
      return true;
    }
  
    getEspacoLivre() {
      let ocupado = 0;
      for (let animal of this.animais) {
        ocupado += animal.quantidade;
      }
      if (this.animais.length > 1) {
        ocupado += 1;
      }
      return this.capacidade - ocupado;
    }
  
    toString() {
      return `Recinto ${this.numero} (espaço livre: ${this.getEspacoLivre()} total: ${this.capacidade})`;
    }
  }
  
  class Animal {
    constructor(tipo, quantidade) {
      this.tipo = tipo;
      this.quantidade = quantidade;
    }
  }
  
  function encontraRecinto(animal) {
    let recintos = [
      new Recinto(1, 'savana e rio', 5),
      new Recinto(2, 'floresta', 8),
      new Recinto(3, 'savana', 12),
    ];
  
    if (animal.tipo !== 'macaco' && animal.tipo !== 'hipopótamo' && animal.tipo !== 'carnívoro') {
      return { erro: 'Animal inválido' };
    }
    if (animal.quantidade <= 0) {
      return { erro: 'Quantidade inválida' };
    }
  
    let recintosViaveis = [];
    for (let recinto of recintos) {
      if (recinto.adicionaAnimal(animal, animal.quantidade)) {
        recintosViaveis.push(recinto.toString());
      }
    }
  
    if (recintosViaveis.length === 0) {
      return { erro: 'Não há recinto viável' };
    }
  
    return { recintos: recintosViaveis };
  }
  
  
  let animal = new Animal('UNICORNIO', 5);
  let resultado = encontraRecinto(animal);
  console.log(resultado);