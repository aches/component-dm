/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/6/25 17:07
 */

import Vue from 'vue'
import * as Router from 'vue-router'
import indexVue  from '../index.vue';
import updateVue from '../pages/update.vue';
import addVue    from '../pages/add.vue';
import settingVue    from '../pages/setting.vue';
import packageVue    from '../pages/package.vue';
import playcanvasVue    from '../pages/playcanvas.vue';
import editorVue    from '../pages/gui/editor.vue';
import testVue    from '../pages/test/test.vue';

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/index',
            name: 'index',
            component: indexVue,
            children: [
                {
                    path: '/setting-page',
                    name: 'component.setting',
                    alias: '',
                    component:  settingVue,
                },
                {
                    path: '/package-page',
                    name: 'widget.package',
                    alias: '',
                    component:  packageVue,
                },
                {
                    path: '/update-page',
                    name: 'summary.update',
                    alias: '',
                    component: updateVue,
                },
                {
                    path: '/add-page',
                    name: 'summary.add',
                    alias: '',
                    component:  addVue,
                },
                {
                    path: '/3d-page',
                    name: '3d.add',
                    alias: '',
                    component:  playcanvasVue,
                },
                {
                    path: '/gui-editor',
                    name: 'gui.editor',
                    alias: '',
                    component:  editorVue,
                },
                {
                    path: '/test-page',
                    name: 'test.test',
                    alias: '',
                    component:  testVue,
                }

            ]
        },
        {
            path: '*',
            redirect: '/index'
        }
    ]
} as any);

export default router
