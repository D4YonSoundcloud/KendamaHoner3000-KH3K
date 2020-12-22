<template>
  <v-card color="grey lighten-3" v-bind:style="{boxShadow: '0 0 0 0 rgba(0,0,0,0) !important'}" height="100%" class="text-center side-menu-header">
    <v-card-title>
      KH3K TRICK LIST
      <svg style="transform: scale(1.10); margin-left: 2.5%; margin-bottom: 0.25%;" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><g/><g><path d="M21,5c-1.11-0.35-2.33-0.5-3.5-0.5c-1.95,0-4.05,0.4-5.5,1.5c-1.45-1.1-3.55-1.5-5.5-1.5S2.45,4.9,1,6v14.65 c0,0.25,0.25,0.5,0.5,0.5c0.1,0,0.15-0.05,0.25-0.05C3.1,20.45,5.05,20,6.5,20c1.95,0,4.05,0.4,5.5,1.5c1.35-0.85,3.8-1.5,5.5-1.5 c1.65,0,3.35,0.3,4.75,1.05c0.1,0.05,0.15,0.05,0.25,0.05c0.25,0,0.5-0.25,0.5-0.5V6C22.4,5.55,21.75,5.25,21,5z M21,18.5 c-1.1-0.35-2.3-0.5-3.5-0.5c-1.7,0-4.15,0.65-5.5,1.5V8c1.35-0.85,3.8-1.5,5.5-1.5c1.2,0,2.4,0.15,3.5,0.5V18.5z"/><g><path d="M17.5,10.5c0.88,0,1.73,0.09,2.5,0.26V9.24C19.21,9.09,18.36,9,17.5,9c-1.7,0-3.24,0.29-4.5,0.83v1.66 C14.13,10.85,15.7,10.5,17.5,10.5z"/><path d="M13,12.49v1.66c1.13-0.64,2.7-0.99,4.5-0.99c0.88,0,1.73,0.09,2.5,0.26V11.9c-0.79-0.15-1.64-0.24-2.5-0.24 C15.8,11.66,14.26,11.96,13,12.49z"/><path d="M17.5,14.33c-1.7,0-3.24,0.29-4.5,0.83v1.66c1.13-0.64,2.7-0.99,4.5-0.99c0.88,0,1.73,0.09,2.5,0.26v-1.52 C19.21,14.41,18.36,14.33,17.5,14.33z"/></g></g></g></svg>
    </v-card-title>
    <v-card color="grey lighten-4" width="100%" height="91%" v-bind:style="{boxShadow: '0 0 0 0 rgba(0,0,0,0) !important'}">
      <v-expansion-panels tile flat v-bind:style="{boxShadow: '0 0 0 0 rgba(0,0,0,0) !important'}">
        <v-expansion-panel color="grey lighten-5"
            v-for="(belt,i) in beltList" :class="i === 8 ? 'mx-2 mb-0' : 'mx-2 mb-2' "
            :key="i">
          <v-expansion-panel-header color="grey lighten-4">
            <div :style="{width: '25%', height: '100%'}">{{belt}} Belt</div>
            <div :style="{backgroundColor: belt, width: '65%', height: '10px', marginLeft: '1.5%', marginRight: '1.5%'}"></div>
          </v-expansion-panel-header>

          <v-expansion-panel-content v-bind:style="{paddingBottom: '0 !important'}">
            <v-sheet v-for="(trick, index) in trickList[beltLevelLookUpTable[belt]]" class="d-flex flow-row"
                     :key="index">
              <p class="text-left ms-2 my-2">{{trick.trickName}}</p> <div v-if="trick.senior"
                                                                          style="background-color: black; margin-left: 2.5%; margin-top: 5%; width: 10%; height: 5px"></div>
              <v-btn :disabled="trick.link === ''" v-bind:style="trick.link === '' ? {opacity: 0.3, height: '100% !important'} : {opacity: 1, height: '100% !important'}" x-small text @click="goToTrickVideo(trick.link)" class="mt-2 me-1 float-right">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
              </v-btn>
              <v-divider></v-divider>
            </v-sheet>
          </v-expansion-panel-content>

        </v-expansion-panel>
      </v-expansion-panels>
      <p class="text-left mb-0" style="margin-left: 3.5%; margin-top: 2.5%">CREATED BY MATT DAY ig@d4yondama</p>
    </v-card>
  </v-card>
</template>

<script>
  export default {
    name: "TrickList",
    props: ['height', 'beltList'],
    data(){
      return {
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
      }
    },
    methods:{
        goToTrickVideo(link){
          window.location.href = link
        }
    },
    computed:{
      trickList(){
        return this.$store.state.trickListData.trickListStore;
      },
    },
    created(){
      console.log(this.TrickList)
    }
  }
</script>

<style scoped>
.v-expansion-panel-content__wrap {
  padding: 0 24px 0 !important;
  flex: 1 1 auto;
  max-width: 100%;
}

.side-menu-header{
  background-color: #dedede;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200%' height='200%' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23c5c5c5' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23d9d7d4'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");
}

</style>