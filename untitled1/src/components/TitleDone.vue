<template>
<div>
  <img alt="logo" class="logoDone" src="../assets/pngegg.png">
  <h1>Done JI EST: {{counter}}
    <span>
    <button class="start-count" @click.once = "donCountRun(); salamSound()">Старт Жи есть!</button>
    <button class="stop-count" @click.once = "donCountStop(); stopSound()">Стоп Жи есть!</button>
    </span>
    <span class="donDon" v-bind:style="doneColor">
      {{ doneDisplay }}
    </span>
  </h1>




</div>

</template>

<script>


import {Howl} from "howler";

export default {
  name: "TitleDone",

    data() {
      return {
        counter: 0,
        doneDisplay: 'DONE!',
        doneColor: {
          color: 'white'
        },
        doneRun: true,

      }
    },

    methods: {
      donCountRun() {

        if (this.doneRun) {


          setTimeout(() => {
                this.counter++;
                this.doneColor.color = 'red'
                this.donCountRun()
                this.doneSound()
              },
              2000);
          setTimeout(() => {
                this.doneColor.color = 'white'

              },
              1000)
        }else {
          this.counter = 0
          this.doneColor.color = 'white'
          this.doneRun = true;
        }
      },

      donCountStop() {
        this.doneRun = false

      },

      salamSound() {
        let sound = new Howl({src: ['/cfkfv.mp3']});
        sound.play();
      },

      stopSound() {
        let sound = new Howl({src: ['/stop.mp3']});
        sound.play();
      },

      doneSound() {
        let sound = new Howl({src: ['/done1.mp3']});
        sound.play();
      }

    },
    computed: {



    }




}
</script>

<style scoped>

.logoDone {
  width: 300px;
  height: 300px;
}
div {
  display: inline-flex;
}
span {
  display: block;
}
.start-count {
  margin: 10px;
}
.stop-count {
  margin: 10px;
}
.donDon {
  margin-top: 50px;
  }

</style>