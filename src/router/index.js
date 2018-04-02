import Vue from 'vue'
import Router from 'vue-router'
import StartMenu from '@/components/StartMenu'

Vue.use(Router)

/**
 * Роутер vue-router
 *
 * Позволяет настроить маршрутизацию одностраничного приложения. Сопоставляет
 * компонент с множеством путей по указанному шаблону.
 *
 * @author      Роман Мазалов
 * @version     1.0.0
 * @copyright   The GNU General Public Lisense v3.0
 */

export default new Router({
    routes: [
        {
            /**
             * Путь сопоставления
             *
             * Путь, с которым сопоставляется компонент, указанным в
             * свойстве {@link component}.
             *
             * @var     string path
             */
            path: '/',
            /**
             * Имя компонента
             *
             * Имя компонента, который сопоставляется с путем, указанным в
             * свойстве {@link path}.
             *
             * @var     string name
             */
            name: 'StartMenu',
            /**
             * Компонент
             *
             * Экземпляр компонента, который сопоставляется с путем, указанным в
             * свойстве {@link path}.
             *
             * @var     object component
             */
            component: StartMenu
        }
    ]
})
