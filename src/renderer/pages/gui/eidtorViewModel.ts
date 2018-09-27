/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 18-9-19 下午3:41
 */

import Component from "vue-class-component";
import {Vue} from "vue-property-decorator";
import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';

@Component
export class EidtorViewModel extends Vue {

    loading = false;

    created() {
        console.log('created');
    }

    mounted() {
        this.initGui();
    }

    initGui() {
        const editor = grapesjs.init({
            // Indicate where to init the editor. You can also pass an HTMLElement
            container: '#gjs',
            // Get the content for the canvas directly from the element
            // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
            fromElement: true,
            // Size of the editor
            height: '100%',
            width: '70%',
            // Disable the storage manager for the moment
            storageManager: { type: null },
            // Avoid any default panel
            layerManager: {
                appendTo: '.layers-container'
            },
            // We define a default panel as a sidebar to contain layers
            panels: {
                defaults: [{
                    id: 'layers',
                    el: '.panel__right',
                    // Make the panel resizable
                    resizable: {
                        maxDim: 350,
                        minDim: 200,
                        tc: 0, // Top handler
                        cl: 1, // Left handler
                        cr: 0, // Right handler
                        bc: 0, // Bottom handler
                        // Being a flex child we need to change `flex-basis` property
                        // instead of the `width` (default)
                        keyWidth: 'flex-basis',
                    },
                }]
            }

        });
    }

}