<template>
    <div id="pinmu" class="aspectration bg_white covered root_div_container ">
        <exerciseLayout v-bind="exerciseOption">
            <template slot="box" slot-scope="box">
                <div  id="box" style="width: 100%;height: 100%;display: flex">
                    <div class="model_content">
                        <div  id="3dContainer" class="model3d_content transtaion_animation2" >
                        </div>
                    </div>
                </div>
            </template>

        </exerciseLayout>
    </div>
</template>


<script lang="ts">
    import Vue from 'vue';
    import exerciseLayout from '../../../../src/component/layout/exercise_layout.vue';
    import Component from 'vue-class-component';
    import { ViewModel } from './ViewModel';

    @Component({
        components: {
            exerciseLayout,
        },
        mixins: [ViewModel]
    })

    export default class App extends Vue {}

</script>

<style scoped="scoped">
    .transtaion_animation2 {
        transition: all 0.3s  ease-in-out;
    }

    .model_content{
        width: 100%;
        height: 100%;

    }

    .model3d_content{
        position: relative;
    }


</style>
