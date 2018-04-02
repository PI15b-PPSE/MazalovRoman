// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */

/**
 * Экземпляр Vue
 *
 * Каждое приложение написанное на фреймворке Vue.js начинается с создания
 * экземпляра Vue.
 *
 * @author      Роман Мазалов
 * @version     1.0.0
 * @copyright   The GNU General Public Lisense v3.0
 */

new Vue({
    /**
     * Id html-элемента, в который производится рендеринг приложения
     *
     * Приложение Vue.js предстваляет некоторую область на веб-странице. Для
     * определения этой области на веб-странице можно определить какой-либо
     * элемент, указав его id в свойстве el.
     * Используется элемент с id равным app.
     *
     * @var     string el
     */
    el: '#app',
    /**
     * Роутер
     *
     * vue-router позволяет настроить маршрутизацию одностраничного приложения.
     *
     * @var     Router router
     */
    router,
    /**
     * Компоненты, которые отображаются в область
     *
     * В область отображается только один главный компонент приложения App.
     *
     * @var     array components
     */
    components: { App },
    /**
     * Шаблон приложения
     *
     * Используется шаблон компонента App.
     *
     * @var     string template
     */
    template: '<App/>'
})
