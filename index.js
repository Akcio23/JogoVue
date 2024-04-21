const { createApp } = Vue

createApp({
    data() {
        return {
            heroi: { vida: 100, pocao: 3, critico: 3, escudo: false, defender: 3 },
            vilao: { vida: 100, vidaAnteriorVilao: 100, critico: 0 },
            game: { ativo: false },
            log: [],
            mostrarBotao: false

        }
    },
    methods: {
        atacar(isHeroi) {
            if (!this.game.ativo) {
                if (isHeroi) {
                    this.acaoVilao();
                    this.vilao.vidaAnteriorVilao = this.vilao.vida
                    this.log.push("Herói atacou!")
                    this.vilao.vida -= 8





                } else {
                    if (this.heroi.escudo == false) {
                        this.log.push("Vilão atacou!")
                        this.heroi.vida -= 20
                    }
                    else if (this.heroi.escudo == true) {
                        this.log.push("Vilão atacou")
                        this.log.push("Heroi defendeu o ataque! ")
                        this.heroi.escudo = false
                    }






                }
                this.vitoriaHeroi()
            }
            this.limpandoLog()
        },


        defender(isHeroi) {
            if (!this.game.ativo) {
                if (isHeroi) {

                    if (this.heroi.defender > 0) {
                        this.heroi.defender -= 1
                        this.heroi.escudo = true
                        this.log.push("O herói se prepara para bloquear o próximo ataque do vilão")
                        this.acaoVilao()
                    }
                    else if (this.heroi.defender <= 0) {
                        this.log.push("Heroi não tem mais escudo!")
                        this.acaoVilao()
                    }






                } else {

                    this.vilao.vida = this.vilao.vidaAnteriorVilao
                    this.log.push("Vilão defendeu!")


                }
                this.vitoriaHeroi()
            }
            this.limpandoLog()
        },


        usarPocao(isHeroi) {
            if (!this.game.ativo) {
                if (isHeroi) {

                    if (this.heroi.pocao > 0 & this.heroi.vida < 85) {
                        this.heroi.pocao -= 1
                        this.heroi.vida += 15

                        this.log.push("O herói utilizou uma poção, recuperando 15 pontos de vida.")
                        this.acaoVilao();



                    }



                    else if (this.heroi.pocao > 3) {
                        this.log.push("Impossível se curar, o herói utilizou todas as poções!")
                        this.acaoVilao()

                    }

                    else if (this.heroi.vida > 85) {
                        this.log.push("Impossível herói curar com a vida acima de 85%!")
                        this.acaoVilao()

                    }


                } else {

                    if (this.vilao.vida < 85) {
                        this.vilao.vida += 5
                        this.log.push("O Vilão utilizou uma poção, recuperando 5 pontos de vida!")


                    }

                    else {
                        this.log.push("Impossível vilão curar com a vida acima de 85%!")

                    }


                }
                this.vitoriaHeroi()

            }
            this.limpandoLog()
        },


        critico(isHeroi) {
            if (!this.game.ativo) {
                if (isHeroi) {

                    if (this.heroi.critico > 0) {
                        this.heroi.critico -= 1
                        this.vilao.vidaAnteriorVilao = this.vilao.vida
                        this.log.push("Herói conseguiu um acerto crítico!!!")
                        this.vilao.vida -= 24
                        this.acaoVilao();
                        if (this.vilao.vida <= 0) {
                            this.vilao.vida = 0

                        }

                    }
                    else {

                        this.log.push("Herói não possui mais chance de crítico!.")
                        this.acaoVilao();

                    }


                } else {

                    if (this.heroi.escudo == false) {
                        this.log.push("Vilão CRITOU!!")
                        this.heroi.vida -= 30

                    }
                    else if (this.heroi.escudo == true) {
                        this.log.push("Vilão CRITOU!!")
                        this.log.push("Heroi defendeu o CRITICO!")
                        this.heroi.escudo = false
                    }






                }
                this.vitoriaHeroi()
            }
            this.limpandoLog()
        },


        acaoVilao() {
            setTimeout(() => {
                const acoes = ['atacar', 'defender', 'usarPocao', 'critico'];
                const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
                this[acaoAleatoria](false);
                this.vitoriaVilao()
            }, 1400)


        },
        vitoriaHeroi() {

            if (this.vilao.vida <= 0) {
                this.vilao.vida = 0
                this.game.ativo = true
                this.mostrarBotao = true
                setTimeout(() => { alert('HEROI GANHOU!!') }, 500)
                
            
            }
        },
        vitoriaVilao() {
            if (this.heroi.vida <= 0) {

                this.heroi.vida = 0
                this.game.ativo = true
                this.mostrarBotao = true

                setTimeout(() => { alert('VILÃO GANHOU HAHAHAHAHAHAHA') }, 500)

            }
        },
        limpandoLog() {
            if (this.log.length > 6) {
                this.log.shift();
            }
        },

        resetGame() {
            this.heroi = { vida: 100, pocao: 3, critico: 3, escudo: false, defender: 3 };
            this.vilao = { vida: 100, vidaAnteriorVilao: 100, critico: 0 };
            this.game.ativo = false;
            this.log = [];
            this.mostrarBotao = false
        }
    }
}).mount("#app");