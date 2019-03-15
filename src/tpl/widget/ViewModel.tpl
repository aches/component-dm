import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {TemplateViewHandler} from './services/TemplateViewHandler';

@Component
export class ViewModel extends Vue {

  created() {
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
