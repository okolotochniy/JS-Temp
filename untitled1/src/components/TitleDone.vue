<template>
<div>
  <img alt="logo" class="logoDone" src="../assets/pngegg.png">
  <h1>Done JI EST: {{counter}}
    <span>
    <button class="start-count" @click = "donCountRun">Старт Жи есть!</button>
    <button class="stop-count" @click = "donCountStop">Стоп Жи есть!</button>
    </span>
    <span class="donDon" v-bind:style="doneColor">
      {{ doneDisplay }}
    </span>
  </h1>




</div>

</template>

<script>
const {Howl, Howler} = require('howler');
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
          const sound = new Howl({
            src: ['sound.mp3']
          });

          sound.play();


          setTimeout(() => {
                this.counter++;
                this.doneColor.color = 'red'
                this.donCountRun()
              },
              2000);
          setTimeout(() => {
                this.doneColor.color = 'white'
              },
              1000)
        }else {
          this.counter = 0
          this.doneColor.color = 'white'
        }
      },

      donCountStop() {
        this.doneRun = false
      }

    },

    mounted() {



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