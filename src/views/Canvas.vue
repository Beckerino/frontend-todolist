<template>
  <div class="viagem-wrapper">
    <canvas ref="viagem" style="width:300px;height:150px"> </canvas>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    origin: {
      type: String
    },
    destiny: {
      type: String
    },
    Saida: {
      type: Object
    },
    Chegada: {
      type: Object
    }
  },
  created() {
    // this.duracao = this.horaChegada - this.horaSaida;
    this.Duracao(this.Saida.date, this.Chegada.date);
    this.horaSaida = this.FormataHora(this.Saida.date);
    this.horaChegada = this.FormataHora(this.Chegada.date);
  },
  data() {
    return {
      provider: {
        context: null
      },
      width: null,
      height: null,
      img: require("../assets/bus@2x.png"),
      font: "14px sans-serif"
    };
  },
  provide() {
    return {
      provider: this.provider
    };
  },
  methods: {
    FormataHora(date) {
      let hora = date.getUTCHours();
      let min = date.getMinutes();
      if (String(hora).length == 1) {
        hora = "0" + hora;
      }
      if (String(min).length == 1) {
        min = "0" + min;
      }
      return hora + ":" + min;
    },
    Duracao(saida, chegada) {
      let res = (chegada - saida) / (1000 * 60);
      let hora = 0;
      let min = 0;
      while (res >= 60) {
        res = res - 60;
        hora++;
      }
      min = res;

      this.hora = hora;
      this.min = min;
    },
    ctxTexto(ctx, text, x, y) {
      let grande = false;
      let resultado = [];
      let splited = text.split(" ");
      let join = String;

      if (splited.length >= 2) {
        for (let index = 0; index < splited.length; index++) {
          if (splited[index].length <= 5 && splited[index + 1] != undefined) {
            join = splited[index] + " " + splited[index + 1];

            splited = splited.filter(function(item) {
              return item !== splited[index + 1];
            });
            resultado.push(join);
            y = y - 3;
          } else {
            resultado.push(splited[index]);
          }
        }
        grande = true;
      }
      if (grande) {
        for (let index = 0; index < resultado.length; index++) {
          ctx.fillText(resultado[index], x, y);
          y = y + 12;
        }
      } else {
        ctx.fillText(text, x, y);
      }
    },
    ctxHora(ctx, hora, min, x, y) {
      ctx.font = this.font;
      let resultado = String;
      if (min == 0) {
        if (hora == 1) {
          resultado = hora + " hora";
        } else {
          resultado = hora + " horas";
        }
      } else {
        if (hora == 0) {
          resultado = min + " minutos";
        } else {
          resultado = hora + " horas e " + min + "m";
        }
      }
      ctx.fillText(resultado, x, y);
    }
  },
  mounted() {
    this.provider.context = this.$refs["viagem"].getContext("2d");
    this.width = 300;
    this.height = 150;
    const ctx = this.provider.context;
    ctx.beginPath();
    ctx.font = this.font;
    ctx.textAlign = "center";

    //origin
    this.ctxTexto(ctx, this.origin, this.width * 0.15, this.height * 0.2);
    ctx.fillText(this.horaSaida, this.width * 0.15, this.height * 0.7);

    //destiny
    this.ctxTexto(ctx, this.destiny, this.width * 0.85, this.height * 0.2);
    ctx.fillText(this.horaChegada, this.width * 0.85, this.height * 0.7);

    //Duração
    this.ctxHora(
      ctx,
      this.hora,
      this.min,
      this.width * 0.5,
      this.height * 0.65
    );
    ctx.font = this.font;

    ctx.fillStyle = "gray";
    ctx.fillText(
      "Duração da viagem",
      this.width * 0.5,
      this.height * 0.75,
      250
    );
    ctx.fillStyle = "black";

    //Imagem
    let img = new Image();
    img.onload = function() {
      ctx.drawImage(
        img,
        this.width * 0.4,
        this.height * 0.6,
        this.width / 2,
        this.height / 2
      );
    };
    img.src = this.img;
    //Pontilhada

    ctx.beginPath();
    ctx.moveTo(this.width * 0.15, this.height * 0.5);
    ctx.lineTo(this.width * 0.85, this.height * 0.5);
    ctx.lineWidth = "10";
    ctx.strokeStyle = "#F7F7F7";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(this.width * 0.15, this.height * 0.5);
    ctx.lineTo(this.width * 0.85, this.height * 0.5);
    ctx.lineWidth = "1";
    ctx.strokeStyle = "black";
    ctx.setLineDash([5, 3]);
    ctx.stroke();

    ctx.setLineDash([0, 0]);
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.width * 0.15, this.height * 0.5, 9, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.width * 0.85, this.height * 0.5, 9, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
  }
};
</script>
