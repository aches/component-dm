import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {ViewController} from '../../../../src/core/ViewController';
import {TemplateViewHandler} from './services/TemplateViewHandler';

@Component
export class ViewModel extends Vue {
    exerciseOption = {
        exercise: {},
        resizeCall: {},
        analyticArray: ['解法一']
    };

    created() {
        const config = {
            question: {
                title: '<%= form.name %>',
                coverImage: ''
            },
            analyticArray: [{

                title: '解法一',
                stepArray: [{}]
            }],
        };
        this.exerciseOption.exercise = config;

        const viewOption = new ViewOption();
         viewOption.showMobileExpandIco = <%= form.expand%>;
          viewOption.adapterMobilePanel = <%= form.adaptationMobile%>;
          viewOption.mobilePanelAlpha = <%= form.controlPanel%>;
          viewOption.showMobileResetIco = <%= form.resetMobile%>;
          viewOption.controlPanelAnimationDelay = <%= form.animationDelayTime%>;
          viewOption.showReset = <%= form.reset%>;
        ViewController.getInstance(new TemplateViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }

    mounted() {
        ViewController.getInstance().domReady();
    }


    resetEvent() {
    }
}
