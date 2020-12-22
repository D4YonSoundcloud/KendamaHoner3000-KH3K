<template>
  <v-sheet class="d-flex flex-column align-center mx-2" id="trick-container" rounded color="grey lighten-2" :height="height" elvation="3" :width="width">
    <v-sheet id="belt-select" color="white" elevation="6" rounded class="d-flex flex-column mt-4 mx-4 mb-2" :width="beltSelectWidth" :height="beltSelectHeight">
      <!-- from belt level select -->
      <v-select item-color="black" color="black"  background-color="white" label="From Belt Level"
                class="ma-2 mt-4" dense outlined :hide-details="true" :errors="false" :items="beltLevelArray" v-model="fromBeltLevel"></v-select>
      <div v-bind:style="{height: beltSelectBeltHeight, backgroundColor: fromBeltLevel }"></div>
      <!-- to belt level select -->
      <v-select item-color="black" color="black"  background-color="white" label="To Belt Level"
                class="ma-2 mt-4" dense outlined :hide-details="true" :errors="false" :items="beltLevelArray" v-model="toBeltLevel"></v-select>
      <div v-bind:style="{height: beltSelectBeltHeight, backgroundColor: toBeltLevel }"></div>
      <!-- trick count select -->
      <v-select item-color="black" :color="`${toBeltLevel} darken-3`" background-color="white" label="Trick Count"
                class="ma-2" dense outlined :hide-details="true" :errors="false" :items="trickCountArray" v-model="trickCount"></v-select>
      <!-- trick count boxes (10 divs) -->
      <div style="display: flex; flex-flow: row; width:100%; justify-content: center; align-content: center">
        <div :style="{marginRight: 1 + '%', height: beltSelectBeltHeight, backgroundColor: toBeltLevel, width: 8.175 + '%'}" v-if="trickCount >= 1"></div>
        <div :style="{marginLeft: 1 + '%', marginRight: 1 + '%', height: beltSelectBeltHeight, backgroundColor: toBeltLevel, width: 8.175 + '%'}" v-if="trickCount >= 2"></div>
        <div :style="{marginLeft: 1 + '%', marginRight: 1 + '%', height: beltSelectBeltHeight, backgroundColor: toBeltLevel, width: 8.175 + '%'}" v-if="trickCount >= 3"></div>
        <div :style="{marginLeft: 1 + '%', marginRight: 1 + '%', height: beltSelectBeltHeight, backgroundColor: toBeltLevel, width: 8.175 + '%'}" v-if="trickCount >= 4"></div>
        <div :style="{marginLeft: 1 + '%', marginRight: 1 + '%', height: beltSelectBeltHeight, backgroundColor: toBeltLevel, width: 8.175 + '%'}" v-if="trickCount >= 5"></div>
        <div :style="{marginLeft: 1 + '%', marginRight: 1 + '%', height: beltSelectBeltHeight, backgroundColor: toBeltLevel, width: 8.175 + '%'}" v-if="trickCount >= 6"></div>
        <div :style="{marginLeft: 1 + '%', marginRight: 1 + '%', height: beltSelectBeltHeight, backgroundColor: toBeltLevel, width: 8.175 + '%'}" v-if="trickCount >= 7"></div>
        <div :style="{marginLeft: 1 + '%', marginRight: 1 + '%', height: beltSelectBeltHeight, backgroundColor: toBeltLevel, width: 8.175 + '%'}" v-if="trickCount >= 8"></div>
        <div :style="{marginLeft: 1 + '%', marginRight: 1 + '%', height: beltSelectBeltHeight, backgroundColor: toBeltLevel, width: 8.175 + '%'}" v-if="trickCount >= 9"></div>
        <div :style="{marginLeft: 1 + '%', height: beltSelectBeltHeight, backgroundColor: toBeltLevel, width: 8.2 + '%'}" v-if="trickCount >= 10"></div>
      </div>
      <!-- warning message for if user tries to pick higher belt level in the fromBeltLevel select -->
      <p style="margin-left: 2%; margin-right: 2%; margin-top: 1%" v-if="beltLevelLookUpTable[fromBeltLevel] > beltLevelLookUpTable[toBeltLevel]">"From Belt-Level" must be lower than the "To Belt-Level"</p>
      <!-- trick me up button select -->
      <v-btn v-else class="ma-2" small :color="`${fromBeltLevel} darken-3`" :dark="fromBeltLevel !== 'white'" @click="generateDamaLine()">Trick Me Up!</v-btn>
    </v-sheet>
    <v-sheet height="90%" width="90%" color="transparent" :class="trickListLayout" rounded>
      <v-sheet rounded :width="trickWidth + '%'" :height="trickHeight + '%'" class="ma-2 d-flex flex-column justify-center align-center trick-list-card"
               elevation="4" v-for="(trick, index) in trickListArray" :key="index">
              <!-- if the belt color is white or yellow make the text black, it would be unreadable -->
        <div v-bind:style="{width: 100 + '%', height: 10 + '%', display: 'flex', flexFlow: 'row'}">
          <div v-bind:style="{width: 80 + '%', height: 100 + '%', backgroundColor: trick.belt }"></div>
          <div v-bind:style="{width: 10 + '%', height: 100 + '%', backgroundColor: trick.senior === true ? 'black' : trick.belt }"></div>
          <div v-bind:style="{width: 10 + '%', height: 100 + '%', backgroundColor: trick.belt }"></div>
        </div>
        <v-sheet width="100%" color="transparent" height="90%" class="d-flex justify-center align-center">
          <p v-bind:style="{ color: 'black', margin: 5 + '%' }" class="text-center">{{trickPrefixLookUpTable[index]}} {{trick.trick}} {{index + 1 === trickCount ? ' to spike' : ''}}</p>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script>

  export default {
    name: "trickGenerator",
    components:{
    },
    props:['openTrickList'],
    data(){
      return{
        trickListArray: [],
        trickCountArray: [1,2,3,4,5,6,7,8,9,10],
        trickCount: 3,
        fromBeltLevel: 'White',
        toBeltLevel: 'White',
        beltLevelArray: ['White','Yellow','Orange','Green','Blue','Purple', 'Brown', 'Red', 'Black'],
        allBeltLevels: true,
        beltColor: 'White',
        beltLevelLookUpTable:{
          'White': 0,
          'Yellow': 1,
          'Orange': 2,
          'Green': 3,
          'Blue': 4,
          'Purple': 5,
          'Brown': 6,
          'Red': 7,
          'Black': 8,
        },
        //changes the flex layout depending on the display size
        trickListClassNameLookUpTable:{
          'xs': 'd-flex flex-column align-center',
          'sm': 'd-flex flex-column align-center',
          'md': 'd-flex flex-wrap justify-center align-center',
          'lg': 'd-flex flex-wrap justify-center align-center',
          'xl': 'd-flex flex-wrap align-content-center',
        },
        beltLevelReverseLookUpTable:{
          0: 'White',
          1: 'Yellow',
          2: 'Orange',
          3: 'Green',
          4: 'Blue',
          5: 'Purple',
          6: 'Brown',
          7: 'Red',
          8: 'Black'
        },
        //changes width of main container  based on the display size
        containerWidthLookUpTable:{
          'xs': '90%',
          'sm': '90%',
          'md': '80%',
          'lg': '80%',
          'xl': '80%',
        },
        //changes height of the main container based on the display size
        containerHeightLookUpTable:{
          'xs': '200vh',
          'sm': '200vh',
          'md': '100%',
          'lg': '100%',
          'xl': '100%',
        },
        //changes the height of the belt select table based on display size
        beltSelectHeightLookUpTable:{
          'xs': '16.5%',
          'sm': '16.5%',
          'md': '39%',
          'lg': '39%',
          'xl': '39%',
        },
        //changes the width of the belt select table based on display size
        beltSelectWidthLookUpTable:{
          'xs': '90%',
          'sm': '90%',
          'md': '50%',
          'lg': '50%',
          'xl': '50%',
        },
        //changes the height of the belt select BELT based on display size
        beltSelectBeltHeightLookUpTable:{
          'xs': '5px',
          'sm': '5px',
          'md': '10px',
          'lg': '10px',
          'xl': '10px',
        },
        //changes the width of the trick width card of the trick based on the display size
        trickWidthLookUpTable:{
          'xs': 90,
          'sm': 90,
          'md': 17.5,
          'lg': 17.5,
          'xl': 17.5,
        },
        //changes the height of the trick width card of the trick based on the display size
        trickHeightLookUpTable:{
          'xs': 3.3,
          'sm': 3.3,
          'md': 21.5,
          'lg': 21.5,
          'xl': 21.5,
        },
        //changes the width of the slide out trick list menu based on display size
        trickListWidthLookUpTable:{
          'xs': 85,
          'sm': 85,
          'md': 55,
          'lg': 55,
          'xl': 55,
        },
        //changes the height of the slide out trick list menu based on display size
        trickListHeightLookUpTable:{
          'xs': 85,
          'sm': 85,
          'md': 85,
          'lg': 85,
          'xl': 85,
        },
        //adds a prefix, based on the index of the trick in the trickList, mainly so the first trick does not have a to
        trickPrefixLookUpTable:{
          0: ' ', 1: 'to ', 2: 'to ', 3: 'to ', 4: 'to ',
          5: 'to ', 6: 'to ', 7: 'to ', 8: 'to ', 9: 'to ',
        },
      }
    },
    computed:{
      trickList(){
        return this.$store.state.trickListData.trickListStore;
      },
      width(){
        return this.containerWidthLookUpTable[this.$vuetify.breakpoint.name]
      },
      height(){
        return this.containerHeightLookUpTable[this.$vuetify.breakpoint.name]
      },
      trickListLayout(){
        return this.trickListClassNameLookUpTable[this.$vuetify.breakpoint.name];
      },
      beltSelectHeight(){
        return this.beltSelectHeightLookUpTable[this.$vuetify.breakpoint.name]
      },
      beltSelectWidth(){
        return this.beltSelectWidthLookUpTable[this.$vuetify.breakpoint.name]
      },
      beltSelectBeltHeight(){
        return this.beltSelectBeltHeightLookUpTable[this.$vuetify.breakpoint.name]
      },
      trickWidth(){
        return this.trickWidthLookUpTable[this.$vuetify.breakpoint.name]
      },
      trickHeight(){
        return this.trickHeightLookUpTable[this.$vuetify.breakpoint.name]
      },
      trickListWidth(){
        return this.trickListWidthLookUpTable[this.$vuetify.breakpoint.name]
      },
      trickListHeight(){
        return this.trickListHeightLookUpTable[this.$vuetify.breakpoint.name]
      }
    },
    methods:{
      //generates the kendama line
      generateDamaLine(){
        //reset trick list array to an empty array
        this.trickListArray = [];
        //get the from and to trick list from using a lookup table from our data object
        let fromTrickListIndex = this.beltLevelLookUpTable[this.fromBeltLevel];
        let toTrickListIndex = this.beltLevelLookUpTable[this.toBeltLevel];
        //set empty variables for our current and past trick, we need to keep past of the past trick so we don't have a line of only one trick
        let currentTrick, pastTrick

        //do a regular for loop to select a random trick FOR each number less than trick count starting from 0 and incrementing by 1
        for(let i = 0; i < this.trickCount; i++){
          //find random belt level
          let randomBeltLevel;
          randomBeltLevel = this.getRandomIndex(fromTrickListIndex, toTrickListIndex + 1);
          //find random belt index within the random belt level
          let randomIndex = this.getRandomIndex(0, this.trickList[randomBeltLevel].length);
          //set current trick using the random index and the random belt level to select a trick from our store trick list
          currentTrick = this.trickList[randomBeltLevel][randomIndex];

          //edge case to create new trick if the same trick gets picked or if the last trick picked is a spike
          if((currentTrick === pastTrick) || (i + 1 === this.trickCount && currentTrick.spike === true)){
            //define a function that we can keep calling if one of our conditions are not met
            let pickAnother = () => {
              //see comments at the beginning of the loop
              randomBeltLevel = this.getRandomIndex(fromTrickListIndex, toTrickListIndex + 1);
              randomIndex = this.getRandomIndex(0, [this.trickList[randomBeltLevel].length - 1]);
              currentTrick = this.trickList[randomBeltLevel][randomIndex];
              //recursively call the function until we get a non spike trick for the last trick
              if((currentTrick === pastTrick) || (i + 1 === this.trickCount && currentTrick.spike === true)) {
                pickAnother();
              }
            }
            //call the pick another function until we pick a new trick
            pickAnother();
          }

          //create trickObject so we can add properties to display when we render the tricks
          let currentTrickObject = {};
          currentTrickObject['belt'] = this.beltLevelReverseLookUpTable[randomBeltLevel];
          currentTrickObject['trick'] = currentTrick.trickName;
          currentTrickObject['senior'] = currentTrick.senior;

          //push trick to trick list to be displayed
          this.trickListArray.push(currentTrickObject);
          //set the past trick to the current trick so we can compare on the next loop iteration
          pastTrick = currentTrick;
        }
      },
      //function for getting a random index
      getRandomIndex(min, max) {
        console.log(min, max)
          return Math.floor(Math.random() * (max - min) ) + min;
        }
    }
  }
</script>

<style scoped>

#belt-select{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpolygon fill='rgb(0,0,0,10%)' points='1600 160 0 460 0 350 1600 50'/%3E%3Cpolygon fill='rgb(0,0,0,10%)' points='1600 260 0 560 0 450 1600 150'/%3E%3Cpolygon fill='%23f0f0f0' points='1600 360 0 660 0 550 1600 250'/%3E%3Cpolygon fill='%23ebebeb' points='1600 460 0 760 0 650 1600 350'/%3E%3Cpolygon fill='%23e6e6e6' points='1600 800 0 800 0 750 1600 450'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}

#trick-container{
  background-color: #dedede;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200%' height='200%' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23c5c5c5' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23d9d7d4'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");
}

.trick-list-card{
  background-image: url(".././assets/paper-texture.jpg")
}

@keyframes trickIntroAnimation{
  0%{opacity: 0; transform: translateY(30%)}
  100%{opacity: 1; transform: translateY(0)}
}
</style>